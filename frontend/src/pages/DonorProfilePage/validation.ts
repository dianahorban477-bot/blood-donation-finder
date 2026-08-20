import type { BloodType, DonorProfileResponse } from '../../types/api'
import {
  isValidInternationalPhoneNumber,
  validateProfileLocation,
} from '../../utils/validation'
import type {
  DonorProfileFormErrors,
  DonorProfileFormValues,
} from './types'

export const bloodTypes: BloodType[] = [
  'A+',
  'A-',
  'B+',
  'B-',
  'AB+',
  'AB-',
  'O+',
  'O-',
]

export const initialDonorProfileValues: DonorProfileFormValues = {
  fullName: '',
  country: '',
  region: '',
  city: '',
  bloodType: '',
  plasmaAvailable: '',
  lastDonationDate: '',
  hasNeverDonated: false,
  phoneNumber: '',
}

export function toDonorProfileFormValues(
  profile: DonorProfileResponse,
): DonorProfileFormValues {
  const hasProfileDetails = Boolean(
    profile.full_name || profile.blood_type || profile.location,
  )

  return {
    fullName: profile.full_name ?? '',
    country: profile.location?.country ?? '',
    region: profile.location?.region ?? '',
    city: profile.location?.city ?? '',
    bloodType: profile.blood_type ?? '',
    plasmaAvailable: hasProfileDetails
      ? String(profile.plasma_available) as 'true' | 'false'
      : '',
    lastDonationDate: profile.last_donation_date ?? '',
    hasNeverDonated: profile.has_never_donated ?? false,
    phoneNumber: profile.phone_number ?? '',
  }
}

export function isDonorProfileComplete(profile: DonorProfileResponse) {
  return Boolean(
    profile.full_name &&
      profile.blood_type &&
      profile.location?.country &&
      profile.location.region &&
      profile.location.city &&
      (profile.has_never_donated || profile.last_donation_date),
  )
}

export function validateDonorProfileForm(
  values: DonorProfileFormValues,
): DonorProfileFormErrors {
  const errors: DonorProfileFormErrors = validateProfileLocation(values)

  if (values.fullName.trim().length < 3) {
    errors.fullName = 'Enter your full name using at least 3 characters.'
  }

  if (!values.bloodType) errors.bloodType = 'Select your blood type.'
  if (!values.plasmaAvailable) {
    errors.plasmaAvailable =
      'Select whether you are available for plasma donation.'
  }

  if (!values.hasNeverDonated) {
    if (!values.lastDonationDate) {
      errors.lastDonationDate = 'Enter the date of your last donation.'
    } else if (
      values.lastDonationDate > new Date().toISOString().slice(0, 10)
    ) {
      errors.lastDonationDate =
        'The last donation date cannot be in the future.'
    }
  }

  if (
    values.phoneNumber.trim() &&
    !isValidInternationalPhoneNumber(values.phoneNumber)
  ) {
    errors.phoneNumber =
      'Enter a valid international phone number, for example +380501234567.'
  }

  return errors
}
