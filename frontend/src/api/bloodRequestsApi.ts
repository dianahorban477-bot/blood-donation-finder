import type {
  BloodRequestCreateRequest,
  BloodRequestResponse,
  BloodRequestStatusUpdateRequest,
  BloodRequestUpdateRequest,
} from '../types/api'
import { apiRequest } from './client'

const bloodRequestsEndpoint = '/requests'
const hospitalBloodRequestsEndpoint = '/hospitals/me/requests'

export type DonorBloodRequestSearchFilters = {
  city?: string
  country?: string
  region?: string
}

export const createBloodRequestRequest = (
  payload: BloodRequestCreateRequest,
  accessToken: string,
) =>
  apiRequest<BloodRequestResponse>(bloodRequestsEndpoint, {
    method: 'POST',
    body: payload,
    accessToken,
  })

export const fetchBloodRequestRequest = (
  requestId: number,
  accessToken: string,
) =>
  apiRequest<BloodRequestResponse>(`${bloodRequestsEndpoint}/${requestId}`, {
    accessToken,
  })

export const fetchHospitalBloodRequestsRequest = (accessToken: string) =>
  apiRequest<BloodRequestResponse[]>(hospitalBloodRequestsEndpoint, {
    accessToken,
  })

export const fetchActiveBloodRequestsRequest = (accessToken: string) =>
  apiRequest<BloodRequestResponse[]>(bloodRequestsEndpoint, { accessToken })

export const fetchActiveBloodRequestsSearchRequest = (
  filters: DonorBloodRequestSearchFilters,
  accessToken: string,
) => {
  const searchParams = new URLSearchParams()

  Object.entries(filters).forEach(([key, value]) => {
    const normalizedValue = value?.trim()

    if (normalizedValue) {
      searchParams.set(key, normalizedValue)
    }
  })

  return apiRequest<BloodRequestResponse[]>(
    `${bloodRequestsEndpoint}/search?${searchParams.toString()}`,
    { accessToken },
  )
}

export const updateBloodRequestRequest = (
  requestId: number,
  payload: BloodRequestUpdateRequest,
  accessToken: string,
) =>
  apiRequest<BloodRequestResponse>(`${bloodRequestsEndpoint}/${requestId}`, {
    method: 'PATCH',
    body: payload,
    accessToken,
  })

export const updateBloodRequestStatusRequest = (
  requestId: number,
  status: BloodRequestStatusUpdateRequest['status'],
  accessToken: string,
) =>
  apiRequest<BloodRequestResponse>(
    `${bloodRequestsEndpoint}/${requestId}/status`,
    {
      method: 'PATCH',
      body: { status },
      accessToken,
    },
  )
