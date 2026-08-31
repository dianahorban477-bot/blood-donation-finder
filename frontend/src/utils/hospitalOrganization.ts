import type { HospitalOrganizationType } from '../types/api'

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

export const getHospitalOrganizationTypeLabel = (
  value: HospitalOrganizationType | '',
  otherValue = '',
) => {
  if (value === 'other') return otherValue || 'Other healthcare institution'

  return (
    hospitalOrganizationTypes.find((option) => option.value === value)?.label ??
    value
  )
}
