from pathlib import Path

from fastapi import APIRouter, Depends, File, UploadFile, status
from sqlalchemy.orm import Session

from app.core.deps import require_role
from app.core.errors import APIError
from app.crud.location import get_or_create_location
from app.db.session import get_db
from app.models.enums import UserRole
from app.models.hospital import Hospital
from app.models.user import User
from app.schemas.hospital import HospitalRead, HospitalUpdate, LicenseUploadResponse

router = APIRouter(prefix="/hospitals", tags=["hospitals"])

UPLOADS_DIR = Path(__file__).resolve().parents[3] / "uploads" / "licenses"


def _get_hospital(db: Session, user: User) -> Hospital:
    hospital = db.query(Hospital).filter(Hospital.user_id == user.id).first()
    if hospital is None:
        raise APIError(status.HTTP_404_NOT_FOUND, "NOT_FOUND", "Hospital profile not found.")
    return hospital


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
    if payload.contact_info is not None:
        hospital.contact_info = payload.contact_info
    if payload.location is not None:
        location = get_or_create_location(db, payload.location.city, payload.location.region, payload.location.country)
        hospital.location_id = location.id

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

    UPLOADS_DIR.mkdir(parents=True, exist_ok=True)
    extension = Path(file.filename or "").suffix
    filename = f"hospital-{hospital.id}{extension}"
    destination = UPLOADS_DIR / filename
    with destination.open("wb") as out_file:
        out_file.write(file.file.read())

    hospital.license_document_url = f"/uploads/licenses/{filename}"
    db.commit()
    db.refresh(hospital)
    return LicenseUploadResponse(license_document_url=hospital.license_document_url)
