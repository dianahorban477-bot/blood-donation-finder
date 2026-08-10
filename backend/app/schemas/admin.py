from pydantic import BaseModel

from app.models.enums import UserRole


class RoleUpdateRequest(BaseModel):
    role: UserRole
