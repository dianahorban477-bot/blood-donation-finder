import type {
  AuthUser,
  HospitalVerificationStatus,
  RegistrationRole,
  UserRole,
} from './auth'

type BaseRegisterRequest = {
  email: string
  password: string
  role: RegistrationRole
}

type DonorRegisterRequest = BaseRegisterRequest & {
  role: 'donor'
  privacy_policy_accepted: boolean
  age_confirmed: boolean
  marketing_consent: boolean
}

type HospitalRegisterRequest = BaseRegisterRequest & {
  role: 'hospital'
  privacy_policy_accepted: boolean
}

export type RegisterRequest =
  | DonorRegisterRequest
  | HospitalRegisterRequest

export type LoginRequest = {
  email: string
  password: string
}

export type AuthResponse = {
  id: number
  role: UserRole
  access_token: string
  token_type: string
  expires_in: number
}

export type RefreshResponse = {
  access_token: string
  token_type: string
  expires_in: number
}

export type CurrentUserResponse = {
  id: number
  email: string
  role: AuthUser['role']
  is_active: boolean
  verification_status: AuthUser['verificationStatus']
}

export type BloodType =
  | 'A+'
  | 'A-'
  | 'B+'
  | 'B-'
  | 'AB+'
  | 'AB-'
  | 'O+'
  | 'O-'

export type HospitalOrganizationType =
  | 'hospital'
  | 'clinic'
  | 'blood_center'
  | 'medical_center'
  | 'other'

type LocationRequest = {
  city: string
  region: string
  country: string
}

type LocationResponse = LocationRequest & {
  id: number
}

export type DonorProfileResponse = {
  id: number
  full_name: string | null
  blood_type: BloodType | null
  location: LocationResponse | null
  plasma_available: boolean
  last_donation_date: string | null
  has_never_donated: boolean
  phone_number: string | null
}

export type DonorProfileUpdateRequest = {
  full_name: string
  blood_type: BloodType
  location: LocationRequest
  plasma_available: boolean
  last_donation_date: string | null
  has_never_donated: boolean
  phone_number: string | null
}

export type HospitalContactInfo = {
  contact_email: string
  phone_number: string
}

export type HospitalProfileResponse = {
  id: number
  name: string | null
  organization_type: HospitalOrganizationType | null
  organization_type_other: string | null
  address: string | null
  representative_name: string | null
  contact_info: HospitalContactInfo | null
  location: LocationResponse | null
  verification_status: HospitalVerificationStatus
  license_document_url: string | null
}

export type HospitalProfileUpdateRequest = {
  name: string
  organization_type: HospitalOrganizationType
  organization_type_other: string | null
  address: string
  representative_name: string
  contact_info: HospitalContactInfo
  location: LocationRequest
}

export type HospitalApplicationSummary = {
  id: number
  name: string | null
  organization_type?: HospitalOrganizationType | null
  organization_type_other?: string | null
  address?: string | null
  representative_name?: string | null
  contact_info: HospitalContactInfo | string | null
  location: LocationResponse | null
  verification_status: HospitalVerificationStatus
  license_document_url: string | null
}

export type LicenseUploadResponse = {
  license_document_url: string
  verification_status: HospitalVerificationStatus
}

export type ApiErrorCode =
  | 'VALIDATION_ERROR'
  | 'EMAIL_ALREADY_EXISTS'
  | 'INVALID_CREDENTIALS'
  | 'UNAUTHORIZED'
  | 'ACCESS_TOKEN_EXPIRED'
  | 'INVALID_REFRESH_TOKEN'
  | 'ACCOUNT_INACTIVE'
  | 'FORBIDDEN'
  | 'HOSPITAL_NOT_VERIFIED'
  | 'CONSENT_REQUIRED'
  | 'NOT_FOUND'
  | 'RATE_LIMITED'
  | 'INTERNAL_SERVER_ERROR'

export type ApiErrorResponse = {
  error: {
    code: ApiErrorCode
    message: string
    fields?: Record<string, string>
  }
}
