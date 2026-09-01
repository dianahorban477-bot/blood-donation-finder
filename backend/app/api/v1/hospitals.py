from pathlib import Path

from fastapi import APIRouter, Depends, File, UploadFile, status
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session

from app.core.deps import get_current_user, require_role
from app.core.errors import APIError
from app.crud.location import get_or_create_location
from app.db.session import get_db
from app.models.enums import OrganizationType, UserRole, VerificationStatus
from app.models.hospital import Hospital
from app.models.user import User
from app.schemas.hospital import HospitalRead, HospitalUpdate, LicenseUploadResponse

router = APIRouter(prefix="/hospitals", tags=["hospitals"])

UPLOADS_DIR = Path(__file__).resolve().parents[3] / "uploads" / "licenses"
MAX_LICENSE_SIZE_BYTES = 10 * 1024 * 1024

LICENSE_CONTENT_TYPES = {
    "application/pdf": ".pdf",
    "image/jpeg": ".jpg",
    "image/png": ".png",
}

REQUIRED_PROFILE_FIELDS = (
    "name",
    "organization_type",
    "address",
    "representative_name",
    "location_id",
    "contact_email",
    "phone_number",
)


def _get_hospital(db: Session, user: User) -> Hospital:
    hospital = db.query(Hospital).filter(Hospital.user_id == user.id).first()
    if hospital is None:
        raise APIError(status.HTTP_404_NOT_FOUND, "NOT_FOUND", "Hospital profile not found.")
    return hospital


def _missing_profile_fields(hospital: Hospital) -> dict:
    missing = {field: "Required." for field in REQUIRED_PROFILE_FIELDS if getattr(hospital, field) is None}
    if hospital.organization_type == OrganizationType.other and not hospital.organization_type_other:
        missing["organization_type_other"] = "Required when organization_type is 'other'."
    return missing


def _license_file_path(hospital_id: int) -> Path | None:
    matches = sorted(UPLOADS_DIR.glob(f"hospital-{hospital_id}.*"))
    return matches[0] if matches else None


def _serve_license_file(db: Session, hospital_id: int) -> FileResponse:
    hospital = db.get(Hospital, hospital_id)
    if hospital is None:
        raise APIError(status.HTTP_404_NOT_FOUND, "NOT_FOUND", "Hospital not found.")
    file_path = _license_file_path(hospital_id)
    if file_path is None:
        raise APIError(status.HTTP_404_NOT_FOUND, "NOT_FOUND", "No license document uploaded.")
    return FileResponse(file_path)


@router.get("/me", response_model=HospitalRead)
def get_my_hospital(user: User = Depends(require_role(UserRole.hospital)), db: Session = Depends(get_db)):
    return _get_hospital(db, user)


@router.patch("/me", response_model=HospitalRead)
def update_my_hospital(
    payload: HospitalUpdate,
    user: User = Depends(require_role(UserRole.hospital)),
    db: Session = Depends(get_db),
):
    hospital = _get_hospital(db, user)

    if payload.name is not None:
        hospital.name = payload.name
    if payload.organization_type is not None:
        hospital.organization_type = payload.organization_type
        if payload.organization_type != OrganizationType.other:
            hospital.organization_type_other = None
    if "organization_type_other" in payload.model_fields_set:
        hospital.organization_type_other = payload.organization_type_other
    if payload.address is not None:
        hospital.address = payload.address
    if payload.representative_name is not None:
        hospital.representative_name = payload.representative_name
    if payload.contact_info is not None:
        if payload.contact_info.contact_email is not None:
            hospital.contact_email = payload.contact_info.contact_email
        if payload.contact_info.phone_number is not None:
            hospital.phone_number = payload.contact_info.phone_number
    if payload.location is not None:
        location = get_or_create_location(db, payload.location.city, payload.location.region, payload.location.country)
        hospital.location_id = location.id

    if hospital.organization_type == OrganizationType.other and not hospital.organization_type_other:
        raise APIError(
            status.HTTP_422_UNPROCESSABLE_ENTITY,
            "VALIDATION_ERROR",
            "organization_type_other is required when organization_type is 'other'.",
            fields={"organization_type_other": "Required when organization_type is 'other'."},
        )
    if hospital.organization_type != OrganizationType.other and hospital.organization_type_other:
        raise APIError(
            status.HTTP_422_UNPROCESSABLE_ENTITY,
            "VALIDATION_ERROR",
            "organization_type_other must be null unless organization_type is 'other'.",
            fields={"organization_type_other": "Must be null unless organization_type is 'other'."},
        )

    db.commit()
    db.refresh(hospital)
    return hospital


@router.post("/me/license", response_model=LicenseUploadResponse)
def upload_license(
    file: UploadFile = File(...),
    user: User = Depends(require_role(UserRole.hospital)),
    db: Session = Depends(get_db),
):
    hospital = _get_hospital(db, user)

    missing = _missing_profile_fields(hospital)
    if missing:
        raise APIError(
            status.HTTP_422_UNPROCESSABLE_ENTITY,
            "PROFILE_INCOMPLETE",
            "Complete the hospital profile before submitting a license for verification.",
            fields=missing,
        )

    extension = LICENSE_CONTENT_TYPES.get(file.content_type)
    if extension is None:
        raise APIError(
            status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
            "UNSUPPORTED_FILE_TYPE",
            "Only PDF, JPG, and PNG files are accepted.",
        )

    content = file.file.read()
    if len(content) > MAX_LICENSE_SIZE_BYTES:
        raise APIError(
            status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            "FILE_TOO_LARGE",
            "File exceeds the 10 MB size limit.",
        )

    UPLOADS_DIR.mkdir(parents=True, exist_ok=True)
    for stale in UPLOADS_DIR.glob(f"hospital-{hospital.id}.*"):
        stale.unlink()
    destination = UPLOADS_DIR / f"hospital-{hospital.id}{extension}"
    destination.write_bytes(content)

    hospital.license_document_url = f"/api/v1/hospitals/{hospital.id}/license"
    hospital.verification_status = VerificationStatus.pending
    hospital.rejection_reason = None
    db.commit()
    db.refresh(hospital)
    return LicenseUploadResponse(
        license_document_url=hospital.license_document_url,
        verification_status=hospital.verification_status,
    )


@router.get("/{hospital_id}/license")
def get_license_file(
    hospital_id: int,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    if user.role != UserRole.admin:
        hospital = db.query(Hospital).filter(Hospital.user_id == user.id).first()
        if hospital is None or hospital.id != hospital_id:
            raise APIError(status.HTTP_403_FORBIDDEN, "FORBIDDEN", "Not enough permissions.")
    return _serve_license_file(db, hospital_id)
