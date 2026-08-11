from pydantic import BaseModel, ConfigDict, EmailStr

from app.models.enums import UserRole, VerificationStatus


class UserProfile(BaseModel):
    id: int
    email: EmailStr
    role: UserRole
    is_active: bool
    verification_status: VerificationStatus | None = None

    model_config = ConfigDict(from_attributes=True)


class UserUpdate(BaseModel):
    email: EmailStr | None = None
