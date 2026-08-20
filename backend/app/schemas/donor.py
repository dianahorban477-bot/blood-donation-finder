import re
from datetime import date

from pydantic import BaseModel, ConfigDict, field_validator

from app.models.enums import BloodType
from app.schemas.location import LocationBase, LocationRead

PHONE_NUMBER_PATTERN = re.compile(r"^\+\d{1,15}$")


class DonorProfileRead(BaseModel):
    id: int
    full_name: str | None
    blood_type: BloodType | None
    plasma_available: bool
    last_donation_date: date | None
    has_never_donated: bool
    phone_number: str | None
    location: LocationRead | None

    model_config = ConfigDict(from_attributes=True)


class DonorProfileUpdate(BaseModel):
    full_name: str | None = None
    blood_type: BloodType | None = None
    location: LocationBase | None = None
    plasma_available: bool | None = None
    last_donation_date: date | None = None
    has_never_donated: bool | None = None
    phone_number: str | None = None

    @field_validator("phone_number")
    @classmethod
    def validate_phone_number(cls, value: str | None) -> str | None:
        if value is not None and not PHONE_NUMBER_PATTERN.match(value):
            raise ValueError("Phone number must be in international format, e.g. +380501234567.")
        return value
