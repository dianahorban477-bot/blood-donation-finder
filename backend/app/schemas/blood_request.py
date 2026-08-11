from pydantic import BaseModel, ConfigDict

from app.models.enums import BloodType, DonationType, RequestStatus, UrgencyLevel
from app.schemas.location import LocationBase, LocationRead


class BloodRequestCreate(BaseModel):
    blood_type: BloodType
    donation_type: DonationType
    required_amount: float
    location: LocationBase
    urgency: UrgencyLevel
    additional_info: str | None = None


class BloodRequestUpdate(BaseModel):
    blood_type: BloodType | None = None
    donation_type: DonationType | None = None
    required_amount: float | None = None
    location: LocationBase | None = None
    urgency: UrgencyLevel | None = None
    additional_info: str | None = None


class BloodRequestStatusUpdate(BaseModel):
    status: RequestStatus


class BloodRequestRead(BaseModel):
    id: int
    hospital_id: int
    blood_type: BloodType
    donation_type: DonationType
    required_amount: float
    location: LocationRead
    urgency: UrgencyLevel
    additional_info: str | None
    status: RequestStatus

    model_config = ConfigDict(from_attributes=True)
