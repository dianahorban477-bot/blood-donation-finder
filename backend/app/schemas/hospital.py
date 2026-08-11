from pydantic import BaseModel, ConfigDict

from app.models.enums import VerificationStatus
from app.schemas.location import LocationBase, LocationRead


class HospitalRead(BaseModel):
    id: int
    name: str | None
    contact_info: str | None
    location: LocationRead | None
    verification_status: VerificationStatus
    license_document_url: str | None

    model_config = ConfigDict(from_attributes=True)


class HospitalUpdate(BaseModel):
    name: str | None = None
    contact_info: str | None = None
    location: LocationBase | None = None


class LicenseUploadResponse(BaseModel):
    license_document_url: str


class HospitalRejectRequest(BaseModel):
    reason: str | None = None
