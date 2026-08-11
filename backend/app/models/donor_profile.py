from datetime import date

from sqlalchemy import Boolean, Date, Enum as SAEnum, ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base_class import Base
from app.models.enums import BloodType


class DonorProfile(Base):
    __tablename__ = "donor_profiles"

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), unique=True, nullable=False)
    full_name: Mapped[str | None] = mapped_column(String(255), nullable=True)
    blood_type: Mapped[BloodType | None] = mapped_column(
        SAEnum(BloodType, name="blood_type", values_callable=lambda enum_cls: [e.value for e in enum_cls]),
        nullable=True,
    )
    plasma_available: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    last_donation_date: Mapped[date | None] = mapped_column(Date, nullable=True)
    location_id: Mapped[int | None] = mapped_column(ForeignKey("locations.id"), nullable=True)

    user: Mapped["User"] = relationship(back_populates="donor_profile")
    location: Mapped["Location | None"] = relationship()
