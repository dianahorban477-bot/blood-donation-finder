from datetime import datetime, timezone

from fastapi import APIRouter, Depends, Request, Response, status
from jose import ExpiredSignatureError, JWTError
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.deps import get_current_user
from app.core.errors import APIError
from app.core.security import (
    clear_refresh_cookie,
    create_access_token,
    create_refresh_token,
    decode_token,
    hash_password,
    set_refresh_cookie,
    verify_password,
)
from app.db.session import get_db
from app.models.donor_profile import DonorProfile
from app.models.enums import UserRole
from app.models.hospital import Hospital
from app.models.refresh_token import RefreshToken
from app.models.user import User
from app.schemas.auth import AuthResponse, LoginRequest, RefreshResponse, RegisterRequest

router = APIRouter(prefix="/auth", tags=["auth"])


def _hospital_verification_status(db: Session, user: User) -> str | None:
    if user.role != UserRole.hospital:
        return None
    hospital = db.query(Hospital).filter(Hospital.user_id == user.id).first()
    return hospital.verification_status.value if hospital else None


def _issue_tokens(db: Session, response: Response, user: User) -> AuthResponse:
    verification_status = _hospital_verification_status(db, user)
    access_token, expires_in = create_access_token(user.id, user.role.value, verification_status)
    refresh_token, jti, expires_at = create_refresh_token(user.id)

    db.add(RefreshToken(id=jti, user_id=user.id, expires_at=expires_at))
    db.commit()

    set_refresh_cookie(response, refresh_token)
    return AuthResponse(id=user.id, role=user.role, access_token=access_token, expires_in=expires_in)


def _decode_refresh_cookie(request: Request) -> dict:
    token = request.cookies.get(settings.refresh_cookie_name)
    if token is None:
        raise APIError(status.HTTP_401_UNAUTHORIZED, "INVALID_REFRESH_TOKEN", "Refresh token is missing.")
    try:
        payload = decode_token(token)
    except (ExpiredSignatureError, JWTError):
        raise APIError(status.HTTP_401_UNAUTHORIZED, "INVALID_REFRESH_TOKEN", "Refresh token is invalid.")
    if payload.get("type") != "refresh" or "jti" not in payload:
        raise APIError(status.HTTP_401_UNAUTHORIZED, "INVALID_REFRESH_TOKEN", "Refresh token is invalid.")
    return payload


def _get_valid_refresh_row(db: Session, jti: str) -> RefreshToken:
    token_row = db.get(RefreshToken, jti)
    if token_row is None or token_row.revoked_at is not None:
        raise APIError(status.HTTP_401_UNAUTHORIZED, "INVALID_REFRESH_TOKEN", "Refresh token is invalid or expired.")

    expires_at = token_row.expires_at
    if expires_at.tzinfo is None:  # some drivers (e.g. SQLite) return naive datetimes
        expires_at = expires_at.replace(tzinfo=timezone.utc)
    if expires_at < datetime.now(timezone.utc):
        raise APIError(status.HTTP_401_UNAUTHORIZED, "INVALID_REFRESH_TOKEN", "Refresh token is invalid or expired.")
    return token_row


@router.post("/register", response_model=AuthResponse, status_code=status.HTTP_201_CREATED)
def register(payload: RegisterRequest, response: Response, db: Session = Depends(get_db)):
    if payload.role == UserRole.donor and not (payload.privacy_policy_accepted and payload.age_confirmed):
        raise APIError(
            status.HTTP_422_UNPROCESSABLE_ENTITY,
            "CONSENT_REQUIRED",
            "Privacy policy acceptance and age confirmation (18+) are required.",
        )
    if payload.role == UserRole.hospital and not payload.privacy_policy_accepted:
        raise APIError(
            status.HTTP_422_UNPROCESSABLE_ENTITY,
            "CONSENT_REQUIRED",
            "Privacy policy acceptance is required.",
        )

    now = datetime.now(timezone.utc)
    user = User(
        email=payload.email,
        password_hash=hash_password(payload.password),
        role=payload.role,
        privacy_policy_accepted_at=now if payload.privacy_policy_accepted else None,
        age_confirmed_at=now if payload.age_confirmed else None,
        marketing_consent=payload.marketing_consent,
        consent_policy_version=settings.consent_policy_version,
    )
    db.add(user)
    try:
        db.flush()
    except IntegrityError:
        db.rollback()
        raise APIError(
            status.HTTP_409_CONFLICT,
            "EMAIL_ALREADY_EXISTS",
            "An account with this email already exists.",
            fields={"email": "This email is already registered."},
        )

    if payload.role == UserRole.donor:
        db.add(DonorProfile(user_id=user.id))
    elif payload.role == UserRole.hospital:
        db.add(Hospital(user_id=user.id))
    db.flush()

    return _issue_tokens(db, response, user)


@router.post("/login", response_model=AuthResponse)
def login(payload: LoginRequest, response: Response, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == payload.email).first()
    if user is None or not verify_password(payload.password, user.password_hash):
        raise APIError(status.HTTP_401_UNAUTHORIZED, "INVALID_CREDENTIALS", "Invalid email or password.")
    if not user.is_active:
        raise APIError(status.HTTP_403_FORBIDDEN, "ACCOUNT_INACTIVE", "This account has been deactivated.")

    return _issue_tokens(db, response, user)


@router.post("/refresh", response_model=RefreshResponse)
def refresh(request: Request, response: Response, db: Session = Depends(get_db)):
    payload = _decode_refresh_cookie(request)
    token_row = _get_valid_refresh_row(db, payload["jti"])

    user = db.get(User, token_row.user_id)
    if user is None or not user.is_active:
        raise APIError(status.HTTP_401_UNAUTHORIZED, "INVALID_REFRESH_TOKEN", "Refresh token is invalid.")

    token_row.revoked_at = datetime.now(timezone.utc)  # rotation: the old refresh token can't be reused

    verification_status = _hospital_verification_status(db, user)
    access_token, expires_in = create_access_token(user.id, user.role.value, verification_status)
    new_refresh_token, new_jti, new_expires_at = create_refresh_token(user.id)
    db.add(RefreshToken(id=new_jti, user_id=user.id, expires_at=new_expires_at))
    db.commit()

    set_refresh_cookie(response, new_refresh_token)
    return RefreshResponse(access_token=access_token, expires_in=expires_in)


@router.post("/logout", status_code=status.HTTP_200_OK)
def logout(
    request: Request,
    response: Response,
    db: Session = Depends(get_db),
    _user: User = Depends(get_current_user),
):
    token = request.cookies.get(settings.refresh_cookie_name)
    if token:
        try:
            payload = decode_token(token)
        except (ExpiredSignatureError, JWTError):
            payload = None
        if payload and payload.get("type") == "refresh" and "jti" in payload:
            token_row = db.get(RefreshToken, payload["jti"])
            if token_row is not None and token_row.revoked_at is None:
                token_row.revoked_at = datetime.now(timezone.utc)
                db.commit()

    clear_refresh_cookie(response)
    return {"detail": "Logged out"}
