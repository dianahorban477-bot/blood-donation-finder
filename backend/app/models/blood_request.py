from datetime import datetime

from sqlalchemy import DateTime, Enum as SAEnum, ForeignKey, Numeric, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.sql import func

from app.db.base_class import Base
from app.models.enums import BloodType, DonationType, RequestStatus, UrgencyLevel


class BloodRequest(Base):
    __tablename__ = "blood_requests"

    id: Mapped[int] = mapped_column(primary_key=True)
    hospital_id: Mapped[int] = mapped_column(ForeignKey("hospitals.id"), nullable=False)
    blood_type: Mapped[BloodType] = mapped_column(SAEnum(BloodType, name="blood_type"), nullable=False)
    donation_type: Mapped[DonationType] = mapped_column(
        SAEnum(DonationType, name="donation_type"), nullable=False
    )
    required_amount: Mapped[float] = mapped_column(Numeric(10, 2), nullable=False)
    location_id: Mapped[int] = mapped_column(ForeignKey("locations.id"), nullable=False)
    urgency: Mapped[UrgencyLevel] = mapped_column(SAEnum(UrgencyLevel, name="urgency_level"), nullable=False)
    additional_info: Mapped[str | None] = mapped_column(Text, nullable=True)
    status: Mapped[RequestStatus] = mapped_column(
        SAEnum(RequestStatus, name="request_status"), default=RequestStatus.active, nullable=False
    )
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )

    hospital: Mapped["Hospital"] = relationship()
    location: Mapped["Location"] = relationship()
