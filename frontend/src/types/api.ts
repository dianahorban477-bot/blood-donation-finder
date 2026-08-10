import type { RegistrationRole } from './auth'

type BaseRegisterRequest = {
  email: string
  password: string
  role: RegistrationRole
}

export type DonorRegisterRequest = BaseRegisterRequest & {
  role: 'donor'
  privacy_policy_accepted: boolean
  age_confirmed: boolean
  marketing_consent: boolean
}

export type HospitalRegisterRequest = BaseRegisterRequest & {
  role: 'hospital'
}

export type RegisterRequest =
  | DonorRegisterRequest
  | HospitalRegisterRequest

export type LoginRequest = {
  email: string
  password: string
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
  | 'INTERNAL_SERVER_ERROR'

export type ApiErrorResponse = {
  error: {
    code: ApiErrorCode
    message: string
    fields?: Record<string, string>
  }
}
