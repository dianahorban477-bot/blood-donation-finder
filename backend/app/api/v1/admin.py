from datetime import datetime, timezone

from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.core.deps import get_current_user, require_role
from app.core.errors import APIError
from app.db.session import get_db
from app.models.blood_request import BloodRequest
from app.models.enums import UserRole, VerificationStatus
from app.models.hospital import Hospital
from app.models.user import User
from app.schemas.admin import RoleUpdateRequest
from app.schemas.blood_request import BloodRequestRead
from app.schemas.hospital import HospitalRejectRequest, HospitalRead
from app.schemas.user import UserProfile

router = APIRouter(prefix="/admin", tags=["admin"], dependencies=[Depends(require_role(UserRole.admin))])


def _get_hospital(db: Session, hospital_id: int) -> Hospital:
    hospital = db.get(Hospital, hospital_id)
    if hospital is None:
        raise APIError(status.HTTP_404_NOT_FOUND, "NOT_FOUND", "Hospital not found.")
    return hospital


def _get_user(db: Session, user_id: int) -> User:
    user = db.get(User, user_id)
    if user is None:
        raise APIError(status.HTTP_404_NOT_FOUND, "NOT_FOUND", "User not found.")
    return user


@router.get("/hospitals", response_model=list[HospitalRead])
def list_hospitals(status_filter: VerificationStatus | None = None, db: Session = Depends(get_db)):
    query = db.query(Hospital)
    if status_filter is not None:
        query = query.filter(Hospital.verification_status == status_filter)
    return query.all()


@router.patch("/hospitals/{hospital_id}/approve", response_model=HospitalRead)
def approve_hospital(hospital_id: int, admin: User = Depends(get_current_user), db: Session = Depends(get_db)):
    hospital = _get_hospital(db, hospital_id)
    hospital.verification_status = VerificationStatus.verified
    hospital.verified_at = datetime.now(timezone.utc)
    hospital.verified_by = admin.id
    db.commit()
    db.refresh(hospital)
    return hospital


@router.patch("/hospitals/{hospital_id}/reject", response_model=HospitalRead)
def reject_hospital(
    hospital_id: int,
    payload: HospitalRejectRequest,
    admin: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    hospital = _get_hospital(db, hospital_id)
    hospital.verification_status = VerificationStatus.rejected
    hospital.verified_at = datetime.now(timezone.utc)
    hospital.verified_by = admin.id
    db.commit()
    db.refresh(hospital)
    return hospital


@router.get("/users", response_model=list[UserProfile])
def list_users(db: Session = Depends(get_db)):
    return db.query(User).all()


@router.patch("/users/{user_id}/role", response_model=UserProfile)
def update_user_role(user_id: int, payload: RoleUpdateRequest, db: Session = Depends(get_db)):
    user = _get_user(db, user_id)
    user.role = payload.role
    db.commit()
    db.refresh(user)
    return user


@router.get("/requests", response_model=list[BloodRequestRead])
def list_all_requests(db: Session = Depends(get_db)):
    return db.query(BloodRequest).order_by(BloodRequest.created_at.desc()).all()


@router.delete("/requests/{request_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_request(request_id: int, db: Session = Depends(get_db)):
    blood_request = db.get(BloodRequest, request_id)
    if blood_request is None:
        raise APIError(status.HTTP_404_NOT_FOUND, "NOT_FOUND", "Blood request not found.")
    db.delete(blood_request)
    db.commit()
