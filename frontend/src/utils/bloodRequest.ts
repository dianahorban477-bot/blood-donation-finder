import type {
  BloodRequestResponse,
  BloodRequestStatus,
  BloodType,
  DonationType,
  UrgencyLevel,
} from '../types/api'

type SelectOption<T extends string> = {
  label: string
  value: T
}

export const bloodTypes: readonly BloodType[] = [
  'A+',
  'A-',
  'B+',
  'B-',
  'AB+',
  'AB-',
  'O+',
  'O-',
]

export const bloodTypeOptions: ReadonlyArray<SelectOption<BloodType>> =
  bloodTypes.map((bloodType) => ({
    label: bloodType,
    value: bloodType,
  }))

export const donationTypeOptions: ReadonlyArray<
  SelectOption<DonationType>
> = [
  { label: 'Blood', value: 'blood' },
  { label: 'Plasma', value: 'plasma' },
]

export const urgencyOptions: ReadonlyArray<SelectOption<UrgencyLevel>> = [
  { label: 'Low', value: 'low' },
  { label: 'Medium', value: 'medium' },
  { label: 'High', value: 'high' },
  { label: 'Critical', value: 'critical' },
]

export const requestQuantityConstraints = {
  min: 1,
  max: 100_000,
  step: 1,
} as const

export const bloodQuantityUnit = 'ml'

export const bloodRequestStatusLabels: Record<BloodRequestStatus, string> = {
  active: 'Active',
  completed: 'Completed',
  cancelled: 'Cancelled',
}

export const getBloodRequestOptionLabel = <T extends string>(
  options: ReadonlyArray<SelectOption<T>>,
  value: T,
) => options.find((option) => option.value === value)?.label ?? value

export const formatBloodRequestAmount = (amount: number) =>
  `${amount} ${bloodQuantityUnit}`

export const formatBloodRequestLocation = (
  location: BloodRequestResponse['location'],
) => [location.city, location.region, location.country].join(', ')

const normalizeCity = (city: string) => city.trim().toLocaleLowerCase()

export const filterBloodRequestsByCity = (
  requests: BloodRequestResponse[],
  city?: string,
) => {
  const normalizedCity = city ? normalizeCity(city) : ''

  if (!normalizedCity) return []

  return requests.filter(
    (request) => normalizeCity(request.location.city) === normalizedCity,
  )
}

export const prioritizeBloodRequestsByCity = (
  requests: BloodRequestResponse[],
  donorCity?: string,
) => {
  const normalizedDonorCity = donorCity ? normalizeCity(donorCity) : ''

  if (!normalizedDonorCity) return requests

  const nearbyRequests: BloodRequestResponse[] = []
  const otherRequests: BloodRequestResponse[] = []

  requests.forEach((request) => {
    const target =
      normalizeCity(request.location.city) === normalizedDonorCity
        ? nearbyRequests
        : otherRequests

    target.push(request)
  })

  return [...nearbyRequests, ...otherRequests]
}
