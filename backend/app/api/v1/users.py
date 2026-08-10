from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.deps import get_current_user
from app.db.session import get_db
from app.models.enums import UserRole
from app.models.hospital import Hospital
from app.models.user import User
from app.schemas.user import UserProfile, UserUpdate

router = APIRouter(prefix="/users", tags=["users"])


def _to_profile(db: Session, user: User) -> UserProfile:
    verification_status = None
    if user.role == UserRole.hospital:
        hospital = db.query(Hospital).filter(Hospital.user_id == user.id).first()
        verification_status = hospital.verification_status if hospital else None
    profile = UserProfile.model_validate(user, from_attributes=True)
    return profile.model_copy(update={"verification_status": verification_status})


@router.get("/me", response_model=UserProfile)
def get_me(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return _to_profile(db, user)


@router.patch("/me", response_model=UserProfile)
def update_me(payload: UserUpdate, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    if payload.email is not None:
        user.email = payload.email
    db.commit()
    db.refresh(user)
    return _to_profile(db, user)
