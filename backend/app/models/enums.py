from enum import Enum


class UserRole(str, Enum):
    donor = "donor"
    hospital = "hospital"
    admin = "admin"


class VerificationStatus(str, Enum):
    pending = "pending"
    verified = "verified"
    rejected = "rejected"


class BloodType(str, Enum):
    A_POS = "A+"
    A_NEG = "A-"
    B_POS = "B+"
    B_NEG = "B-"
    AB_POS = "AB+"
    AB_NEG = "AB-"
    O_POS = "O+"
    O_NEG = "O-"


class DonationType(str, Enum):
    blood = "blood"
    plasma = "plasma"


class UrgencyLevel(str, Enum):
    low = "low"
    medium = "medium"
    high = "high"
    critical = "critical"


class RequestStatus(str, Enum):
    active = "active"
    completed = "completed"
    cancelled = "cancelled"
