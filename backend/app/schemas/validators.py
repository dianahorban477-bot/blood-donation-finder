import re

PHONE_NUMBER_PATTERN = re.compile(r"^\+\d{1,15}$")


def validate_phone_number(value: str | None) -> str | None:
    if value is not None and not PHONE_NUMBER_PATTERN.match(value):
        raise ValueError("Phone number must be in international format, e.g. +380501234567.")
    return value
