from pydantic import BaseModel, ConfigDict, EmailStr, field_validator, model_validator

from app.models.enums import OrganizationType, VerificationStatus
from app.schemas.location import LocationBase, LocationRead
from app.schemas.validators import validate_phone_number


class ContactInfo(BaseModel):
    contact_email: EmailStr | None = None
    phone_number: str | None = None

    @field_validator("phone_number")
    @classmethod
    def check_phone_number(cls, value: str | None) -> str | None:
        return validate_phone_number(value)


class HospitalRead(BaseModel):
    id: int
    name: str | None
    organization_type: OrganizationType | None
    organization_type_other: str | None
    address: str | None
    representative_name: str | None
    contact_info: ContactInfo
    location: LocationRead | None
    verification_status: VerificationStatus
    rejection_reason: str | None
    license_document_url: str | None

    model_config = ConfigDict(from_attributes=True)


class HospitalUpdate(BaseModel):
    name: str | None = None
    organization_type: OrganizationType | None = None
    organization_type_other: str | None = None
    address: str | None = None
    representative_name: str | None = None
    contact_info: ContactInfo | None = None
    location: LocationBase | None = None

    @model_validator(mode="after")
    def validate_organization_type_other(self) -> "HospitalUpdate":
        if self.organization_type == OrganizationType.other and not self.organization_type_other:
            raise ValueError("organization_type_other is required when organization_type is 'other'.")
        if self.organization_type is not None and self.organization_type != OrganizationType.other and self.organization_type_other:
            raise ValueError("organization_type_other must be null unless organization_type is 'other'.")
        return self


class LicenseUploadResponse(BaseModel):
    license_document_url: str
    verification_status: VerificationStatus


class HospitalRejectRequest(BaseModel):
    reason: str | None = None
