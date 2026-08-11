from datetime import date

from pydantic import BaseModel, ConfigDict

from app.models.enums import BloodType
from app.schemas.location import LocationBase, LocationRead


class DonorProfileRead(BaseModel):
    id: int
    full_name: str | None
    blood_type: BloodType | None
    plasma_available: bool
    last_donation_date: date | None
    location: LocationRead | None

    model_config = ConfigDict(from_attributes=True)


class DonorProfileUpdate(BaseModel):
    full_name: str | None = None
    blood_type: BloodType | None = None
    location: LocationBase | None = None
    plasma_available: bool | None = None
    last_donation_date: date | None = None
