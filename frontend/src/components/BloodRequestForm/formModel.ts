import type {
  BloodRequestCreateRequest,
  BloodRequestResponse,
  BloodRequestUpdateRequest,
  BloodType,
  DonationType,
  HospitalProfileResponse,
  UrgencyLevel,
} from '../../types/api'
import { requestQuantityConstraints } from '../../utils/bloodRequest'
import { validateProfileLocation } from '../../utils/validation'

export type BloodRequestFormValues = {
  bloodType: BloodType | ''
  donationType: DonationType | ''
  requiredAmount: string
  country: string
  region: string
  city: string
  urgency: UrgencyLevel | ''
  additionalNotes: string
}

export type BloodRequestFormErrors = Partial<
  Record<keyof BloodRequestFormValues, string>
>

export const initialBloodRequestFormValues: BloodRequestFormValues = {
  bloodType: '',
  donationType: '',
  requiredAmount: '',
  country: '',
  region: '',
  city: '',
  urgency: '',
  additionalNotes: '',
}

export const withHospitalLocation = (
  profile: HospitalProfileResponse,
): BloodRequestFormValues => ({
  ...initialBloodRequestFormValues,
  country: profile.location?.country ?? '',
  region: profile.location?.region ?? '',
  city: profile.location?.city ?? '',
})

export const fromBloodRequestResponse = (
  request: BloodRequestResponse,
): BloodRequestFormValues => ({
  bloodType: request.blood_type,
  donationType: request.donation_type,
  requiredAmount: String(request.required_amount),
  country: request.location.country,
  region: request.location.region,
  city: request.location.city,
  urgency: request.urgency,
  additionalNotes: request.additional_info ?? '',
})

export const validateBloodRequestForm = (
  values: BloodRequestFormValues,
): BloodRequestFormErrors => {
  const errors: BloodRequestFormErrors = validateProfileLocation(values)
  const requiredAmount = Number(values.requiredAmount)

  if (!values.bloodType) {
    errors.bloodType = 'Select a blood type.'
  }

  if (!values.donationType) {
    errors.donationType = 'Select a donation type.'
  }

  if (!values.requiredAmount.trim()) {
    errors.requiredAmount = 'Enter the required quantity.'
  } else if (
    !Number.isFinite(requiredAmount) ||
    requiredAmount < requestQuantityConstraints.min
  ) {
    errors.requiredAmount = 'Enter a quantity of at least 1 ml.'
  } else if (!Number.isInteger(requiredAmount)) {
    errors.requiredAmount =
      'Enter the quantity as a whole number of milliliters.'
  } else if (requiredAmount > requestQuantityConstraints.max) {
    errors.requiredAmount = 'Enter a smaller quantity.'
  }

  if (!values.urgency) {
    errors.urgency = 'Select an urgency level.'
  }

  return errors
}

export const toBloodRequestPayload = (
  values: BloodRequestFormValues,
): BloodRequestCreateRequest => ({
  blood_type: values.bloodType as BloodRequestCreateRequest['blood_type'],
  donation_type:
    values.donationType as BloodRequestCreateRequest['donation_type'],
  required_amount: Number(values.requiredAmount),
  location: {
    country: values.country.trim(),
    region: values.region.trim(),
    city: values.city.trim(),
  },
  urgency: values.urgency as BloodRequestCreateRequest['urgency'],
  additional_info: values.additionalNotes.trim() || null,
})

export const toBloodRequestUpdatePayload = (
  values: BloodRequestFormValues,
): BloodRequestUpdateRequest => toBloodRequestPayload(values)
