from pydantic import BaseModel, ConfigDict, Field

from app.models.enums import BloodType, DonationType, RequestStatus, UrgencyLevel
from app.schemas.location import LocationBase, LocationRead


class BloodRequestCreate(BaseModel):
    blood_type: BloodType
    donation_type: DonationType
    required_amount: int = Field(gt=0)
    location: LocationBase
    urgency: UrgencyLevel
    additional_info: str | None = None


class BloodRequestUpdate(BaseModel):
    blood_type: BloodType | None = None
    donation_type: DonationType | None = None
    required_amount: int | None = Field(default=None, gt=0)
    location: LocationBase | None = None
    urgency: UrgencyLevel | None = None
    additional_info: str | None = None


class BloodRequestStatusUpdate(BaseModel):
    status: RequestStatus


class BloodRequestRead(BaseModel):
    id: int
    hospital_id: int
    hospital_name: str | None
    blood_type: BloodType
    donation_type: DonationType
    required_amount: int
    location: LocationRead
    urgency: UrgencyLevel
    additional_info: str | None
    status: RequestStatus

    model_config = ConfigDict(from_attributes=True)
