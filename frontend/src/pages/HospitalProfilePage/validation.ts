import type {
  HospitalOrganizationType,
  HospitalProfileResponse,
} from '../../types/api'
import {
  isValidEmail,
  isValidInternationalPhoneNumber,
  validateProfileLocation,
} from '../../utils/validation'
import type {
  HospitalProfileFormErrors,
  HospitalProfileFormValues,
} from './types'

export const initialHospitalProfileValues: HospitalProfileFormValues = {
  name: '',
  organizationType: '',
  organizationTypeOther: '',
  address: '',
  representativeName: '',
  contactEmail: '',
  phoneNumber: '',
  country: '',
  region: '',
  city: '',
}

export const hospitalOrganizationTypes: Array<{
  label: string
  value: HospitalOrganizationType
}> = [
  { label: 'Hospital', value: 'hospital' },
  { label: 'Clinic', value: 'clinic' },
  { label: 'Blood centre', value: 'blood_center' },
  { label: 'Medical centre', value: 'medical_center' },
  { label: 'Other healthcare institution', value: 'other' },
]

export function getHospitalOrganizationTypeLabel(
  value: HospitalProfileFormValues['organizationType'],
) {
  return (
    hospitalOrganizationTypes.find((option) => option.value === value)?.label ??
    value
  )
}

export function toHospitalProfileFormValues(
  profile: HospitalProfileResponse,
  fallbackValues = initialHospitalProfileValues,
): HospitalProfileFormValues {
  return {
    name: profile.name ?? '',
    organizationType:
      profile.organization_type ?? fallbackValues.organizationType,
    organizationTypeOther:
      profile.organization_type_other ?? fallbackValues.organizationTypeOther,
    address: profile.address ?? fallbackValues.address,
    representativeName:
      profile.representative_name ?? fallbackValues.representativeName,
    contactEmail:
      profile.contact_info?.contact_email ?? fallbackValues.contactEmail,
    phoneNumber:
      profile.contact_info?.phone_number ?? fallbackValues.phoneNumber,
    country: profile.location?.country ?? '',
    region: profile.location?.region ?? '',
    city: profile.location?.city ?? '',
  }
}

export function isHospitalProfileComplete(profile: HospitalProfileResponse) {
  return Boolean(
    profile.name &&
      profile.organization_type &&
      (profile.organization_type !== 'other' ||
        profile.organization_type_other) &&
      profile.address &&
      profile.representative_name &&
      profile.contact_info?.contact_email &&
      profile.contact_info.phone_number &&
      profile.location?.country &&
      profile.location.region &&
      profile.location.city,
  )
}

export function validateHospitalProfileForm(
  values: HospitalProfileFormValues,
): HospitalProfileFormErrors {
  const errors: HospitalProfileFormErrors = validateProfileLocation(values)

  if (!values.name.trim()) errors.name = 'Enter the hospital name.'
  if (!values.organizationType) {
    errors.organizationType = 'Enter the organization type.'
  }
  if (
    values.organizationType === 'other' &&
    !values.organizationTypeOther.trim()
  ) {
    errors.organizationTypeOther = 'Enter the organization type.'
  }
  if (!values.address.trim()) errors.address = 'Enter the street address.'
  if (!values.representativeName.trim()) {
    errors.representativeName = 'Enter the responsible representative name.'
  }
  if (!values.contactEmail.trim()) {
    errors.contactEmail = 'Enter the contact email.'
  } else if (!isValidEmail(values.contactEmail.trim())) {
    errors.contactEmail = 'Enter a valid contact email.'
  }

  if (!values.phoneNumber.trim()) {
    errors.phoneNumber = 'Enter the contact phone number.'
  } else if (!isValidInternationalPhoneNumber(values.phoneNumber)) {
    errors.phoneNumber =
      'Enter a valid international phone number, for example +380501234567.'
  }
  return errors
}
