from sqlalchemy.orm import Session

from app.models.location import Location


def get_or_create_location(db: Session, city: str, region: str, country: str) -> Location:
    location = (
        db.query(Location)
        .filter(Location.city == city, Location.region == region, Location.country == country)
        .first()
    )
    if location is not None:
        return location

    location = Location(city=city, region=region, country=country)
    db.add(location)
    db.flush()
    return location
