from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.core.deps import require_verified_hospital, require_verified_hospital_or_admin
from app.core.errors import APIError
from app.crud.location import get_or_create_location
from app.db.session import get_db
from app.models.blood_request import BloodRequest
from app.models.enums import BloodType, DonationType, RequestStatus, UserRole
from app.models.hospital import Hospital
from app.models.user import User
from app.schemas.blood_request import (
    BloodRequestCreate,
    BloodRequestRead,
    BloodRequestStatusUpdate,
    BloodRequestUpdate,
)

router = APIRouter(prefix="/requests", tags=["requests"])


def _get_request(db: Session, request_id: int) -> BloodRequest:
    blood_request = db.get(BloodRequest, request_id)
    if blood_request is None:
        raise APIError(status.HTTP_404_NOT_FOUND, "NOT_FOUND", "Blood request not found.")
    return blood_request


def _assert_owns_request(db: Session, user: User, blood_request: BloodRequest) -> None:
    if user.role == UserRole.admin:
        return
    hospital = db.query(Hospital).filter(Hospital.user_id == user.id).first()
    if hospital is None or hospital.id != blood_request.hospital_id:
        raise APIError(status.HTTP_403_FORBIDDEN, "FORBIDDEN", "Not enough permissions.")


@router.post("", response_model=BloodRequestRead, status_code=status.HTTP_201_CREATED)
def create_request(
    payload: BloodRequestCreate,
    user: User = Depends(require_verified_hospital),
    db: Session = Depends(get_db),
):
    hospital = db.query(Hospital).filter(Hospital.user_id == user.id).first()
    location = get_or_create_location(db, payload.location.city, payload.location.region, payload.location.country)

    blood_request = BloodRequest(
        hospital_id=hospital.id,
        blood_type=payload.blood_type,
        donation_type=payload.donation_type,
        required_amount=payload.required_amount,
        location_id=location.id,
        urgency=payload.urgency,
        additional_info=payload.additional_info,
    )
    db.add(blood_request)
    db.commit()
    db.refresh(blood_request)
    return blood_request


@router.get("", response_model=list[BloodRequestRead])
def list_requests(db: Session = Depends(get_db)):
    return db.query(BloodRequest).order_by(BloodRequest.created_at.desc()).all()


@router.get("/search", response_model=list[BloodRequestRead])
def search_requests(
    blood_type: BloodType | None = None,
    donation_type: DonationType | None = None,
    city: str | None = None,
    region: str | None = None,
    country: str | None = None,
    db: Session = Depends(get_db),
):
    query = db.query(BloodRequest).join(BloodRequest.location)
    if blood_type is not None:
        query = query.filter(BloodRequest.blood_type == blood_type)
    if donation_type is not None:
        query = query.filter(BloodRequest.donation_type == donation_type)
    if city is not None:
        query = query.filter(BloodRequest.location.has(city=city))
    if region is not None:
        query = query.filter(BloodRequest.location.has(region=region))
    if country is not None:
        query = query.filter(BloodRequest.location.has(country=country))
    return query.order_by(BloodRequest.created_at.desc()).all()


@router.get("/{request_id}", response_model=BloodRequestRead)
def get_request(request_id: int, db: Session = Depends(get_db)):
    return _get_request(db, request_id)


@router.patch("/{request_id}", response_model=BloodRequestRead)
def update_request(
    request_id: int,
    payload: BloodRequestUpdate,
    user: User = Depends(require_verified_hospital_or_admin),
    db: Session = Depends(get_db),
):
    blood_request = _get_request(db, request_id)
    _assert_owns_request(db, user, blood_request)

    if payload.blood_type is not None:
        blood_request.blood_type = payload.blood_type
    if payload.donation_type is not None:
        blood_request.donation_type = payload.donation_type
    if payload.required_amount is not None:
        blood_request.required_amount = payload.required_amount
    if payload.urgency is not None:
        blood_request.urgency = payload.urgency
    if payload.additional_info is not None:
        blood_request.additional_info = payload.additional_info
    if payload.location is not None:
        location = get_or_create_location(db, payload.location.city, payload.location.region, payload.location.country)
        blood_request.location_id = location.id

    db.commit()
    db.refresh(blood_request)
    return blood_request


@router.patch("/{request_id}/status", response_model=BloodRequestRead)
def update_request_status(
    request_id: int,
    payload: BloodRequestStatusUpdate,
    user: User = Depends(require_verified_hospital_or_admin),
    db: Session = Depends(get_db),
):
    blood_request = _get_request(db, request_id)
    _assert_owns_request(db, user, blood_request)

    blood_request.status = payload.status
    db.commit()
    db.refresh(blood_request)
    return blood_request


@router.delete("/{request_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_request(
    request_id: int,
    user: User = Depends(require_verified_hospital_or_admin),
    db: Session = Depends(get_db),
):
    blood_request = _get_request(db, request_id)
    _assert_owns_request(db, user, blood_request)
    db.delete(blood_request)
    db.commit()
