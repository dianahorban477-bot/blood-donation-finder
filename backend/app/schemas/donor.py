from datetime import date

from pydantic import BaseModel, ConfigDict, field_validator, model_validator

from app.models.enums import BloodType
from app.schemas.location import LocationBase, LocationRead
from app.schemas.validators import validate_phone_number


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
    def check_phone_number(cls, value: str | None) -> str | None:
        return validate_phone_number(value)

    @field_validator("last_donation_date")
    @classmethod
    def validate_not_in_future(cls, value: date | None) -> date | None:
        if value is not None and value > date.today():
            raise ValueError("Last donation date cannot be in the future.")
        return value

    @model_validator(mode="after")
    def validate_never_donated_consistency(self) -> "DonorProfileUpdate":
        if (
            self.has_never_donated is True
            and "last_donation_date" in self.model_fields_set
            and self.last_donation_date is not None
        ):
            raise ValueError("last_donation_date must be null when has_never_donated is true.")
        return self
