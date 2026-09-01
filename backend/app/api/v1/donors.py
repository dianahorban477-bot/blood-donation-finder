from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.core.deps import require_role
from app.core.errors import APIError
from app.crud.location import get_or_create_location
from app.db.session import get_db
from app.models.donor_profile import DonorProfile
from app.models.enums import UserRole
from app.models.user import User
from app.schemas.donor import DonorProfileRead, DonorProfileUpdate

router = APIRouter(prefix="/donors", tags=["donors"])


def _get_donor_profile(db: Session, user: User) -> DonorProfile:
    profile = db.query(DonorProfile).filter(DonorProfile.user_id == user.id).first()
    if profile is None:
        raise APIError(status.HTTP_404_NOT_FOUND, "NOT_FOUND", "Donor profile not found.")
    return profile


@router.get("/me", response_model=DonorProfileRead)
def get_my_profile(user: User = Depends(require_role(UserRole.donor)), db: Session = Depends(get_db)):
    return _get_donor_profile(db, user)


@router.patch("/me", response_model=DonorProfileRead)
def update_my_profile(
    payload: DonorProfileUpdate,
    user: User = Depends(require_role(UserRole.donor)),
    db: Session = Depends(get_db),
):
    profile = _get_donor_profile(db, user)

    setting_never_donated_true = payload.has_never_donated is True
    clearing_date = "last_donation_date" in payload.model_fields_set and payload.last_donation_date is None

    if setting_never_donated_true and clearing_date and profile.last_donation_date is not None:
        raise APIError(
            status.HTTP_409_CONFLICT,
            "DONATION_DATE_LOCKED",
            "A donation date is already on record and cannot be cleared by marking never-donated.",
        )

    if payload.full_name is not None:
        profile.full_name = payload.full_name
    if payload.blood_type is not None:
        profile.blood_type = payload.blood_type
    if payload.plasma_available is not None:
        profile.plasma_available = payload.plasma_available
    if "last_donation_date" in payload.model_fields_set:
        # Explicit null (e.g. "I have never donated blood") must be distinguished from
        # "field omitted" — a plain `is not None` check would silently ignore the null.
        profile.last_donation_date = payload.last_donation_date
    if payload.has_never_donated is not None:
        profile.has_never_donated = payload.has_never_donated
    if payload.phone_number is not None:
        profile.phone_number = payload.phone_number

    if profile.has_never_donated is False and profile.last_donation_date is None and (
        payload.has_never_donated is False or "last_donation_date" in payload.model_fields_set
    ):
        raise APIError(
            status.HTTP_422_UNPROCESSABLE_ENTITY,
            "DONATION_DATE_REQUIRED",
            "A donation date is required when has_never_donated is false.",
        )

    if payload.location is not None:
        location = get_or_create_location(db, payload.location.city, payload.location.region, payload.location.country)
        profile.location_id = location.id

    db.commit()
    db.refresh(profile)
    return profile
