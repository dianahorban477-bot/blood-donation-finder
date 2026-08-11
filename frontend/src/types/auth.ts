export type UserRole = 'donor' | 'hospital' | 'admin'

export type RegistrationRole = Exclude<UserRole, 'admin'>

export type HospitalVerificationStatus =
  | 'pending'
  | 'verified'
  | 'rejected'

export type AuthUser = {
  id: number
  email: string
  role: UserRole
  isActive: boolean
  verificationStatus: HospitalVerificationStatus | null
}
