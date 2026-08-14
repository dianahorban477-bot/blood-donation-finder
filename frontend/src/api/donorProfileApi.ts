import type {
  DonorProfileResponse,
  DonorProfileUpdateRequest,
} from '../types/api'
import { apiRequest } from './client'

const donorProfileEndpoint = '/donors/me'

export const fetchDonorProfileRequest = (accessToken: string) =>
  apiRequest<DonorProfileResponse>(donorProfileEndpoint, { accessToken })

export const updateDonorProfileRequest = (
  payload: DonorProfileUpdateRequest,
  accessToken: string,
) =>
  apiRequest<DonorProfileResponse>(donorProfileEndpoint, {
    method: 'PATCH',
    body: payload,
    accessToken,
  })
