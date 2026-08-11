from fastapi import Depends, status
from fastapi.security import OAuth2PasswordBearer
from jose import ExpiredSignatureError, JWTError
from sqlalchemy.orm import Session

from app.core.errors import APIError
from app.core.security import decode_token
from app.db.session import get_db
from app.models.enums import UserRole, VerificationStatus
from app.models.hospital import Hospital
from app.models.user import User

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/login")


def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)) -> User:
    try:
        payload = decode_token(token)
    except ExpiredSignatureError:
        raise APIError(status.HTTP_401_UNAUTHORIZED, "ACCESS_TOKEN_EXPIRED", "Access token has expired.")
    except JWTError:
        raise APIError(status.HTTP_401_UNAUTHORIZED, "UNAUTHORIZED", "Could not validate credentials.")

    if payload.get("type") != "access" or payload.get("sub") is None:
        raise APIError(status.HTTP_401_UNAUTHORIZED, "UNAUTHORIZED", "Could not validate credentials.")

    user = db.get(User, int(payload["sub"]))
    if user is None:
        raise APIError(status.HTTP_401_UNAUTHORIZED, "UNAUTHORIZED", "Could not validate credentials.")
    if not user.is_active:
        raise APIError(status.HTTP_403_FORBIDDEN, "ACCOUNT_INACTIVE", "This account has been deactivated.")
    return user


def require_role(*roles: UserRole):
    def checker(user: User = Depends(get_current_user)) -> User:
        if user.role not in roles:
            raise APIError(status.HTTP_403_FORBIDDEN, "FORBIDDEN", "Not enough permissions.")
        return user

    return checker


def require_verified_hospital(user: User = Depends(get_current_user), db: Session = Depends(get_db)) -> User:
    if user.role != UserRole.hospital:
        raise APIError(status.HTTP_403_FORBIDDEN, "FORBIDDEN", "Hospital role required.")
    hospital = db.query(Hospital).filter(Hospital.user_id == user.id).first()
    if hospital is None or hospital.verification_status != VerificationStatus.verified:
        raise APIError(status.HTTP_403_FORBIDDEN, "HOSPITAL_NOT_VERIFIED", "Hospital is not verified.")
    return user


def require_verified_hospital_or_admin(
    user: User = Depends(get_current_user), db: Session = Depends(get_db)
) -> User:
    if user.role == UserRole.admin:
        return user
    if user.role == UserRole.hospital:
        hospital = db.query(Hospital).filter(Hospital.user_id == user.id).first()
        if hospital is not None and hospital.verification_status == VerificationStatus.verified:
            return user
    raise APIError(status.HTTP_403_FORBIDDEN, "HOSPITAL_NOT_VERIFIED", "Verified hospital or admin required.")
