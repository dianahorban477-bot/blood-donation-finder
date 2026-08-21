import type { BloodType } from '../../types/api'
import type { ProfileLocationValues } from '../../types/profile'

export type DonorProfileFormValues = ProfileLocationValues & {
  fullName: string
  bloodType: BloodType | ''
  plasmaAvailable: 'true' | 'false' | ''
  lastDonationDate: string
  hasNeverDonated: boolean
  phoneNumber: string
}

export type DonorProfileFormErrors = Partial<
  Record<keyof DonorProfileFormValues, string>
>
