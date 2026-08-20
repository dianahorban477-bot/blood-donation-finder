import type { HospitalOrganizationType } from '../../types/api'
import type { ProfileLocationValues } from '../../types/profile'

export type HospitalProfileFormValues = ProfileLocationValues & {
  name: string
  organizationType: HospitalOrganizationType | ''
  organizationTypeOther: string
  address: string
  representativeName: string
  contactEmail: string
  phoneNumber: string
}

export type HospitalProfileFormErrors = Partial<
  Record<keyof HospitalProfileFormValues, string>
>
