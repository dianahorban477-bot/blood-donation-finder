from pydantic import BaseModel, ConfigDict


class LocationBase(BaseModel):
    city: str
    region: str
    country: str


class LocationRead(LocationBase):
    id: int

    model_config = ConfigDict(from_attributes=True)
