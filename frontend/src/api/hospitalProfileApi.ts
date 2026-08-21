import type {
  HospitalProfileResponse,
  HospitalProfileUpdateRequest,
  LicenseUploadResponse,
} from '../types/api'
import { apiRequest } from './client'

const hospitalProfileEndpoint = '/hospitals/me'

export const fetchHospitalProfileRequest = (accessToken: string) =>
  apiRequest<HospitalProfileResponse>(hospitalProfileEndpoint, { accessToken })

export const updateHospitalProfileRequest = (
  payload: HospitalProfileUpdateRequest,
  accessToken: string,
) =>
  apiRequest<HospitalProfileResponse>(hospitalProfileEndpoint, {
    method: 'PATCH',
    body: payload,
    accessToken,
  })

export const uploadHospitalLicenseRequest = (
  file: File,
  accessToken: string,
) => {
  const formData = new FormData()
  formData.append('file', file)

  return apiRequest<LicenseUploadResponse>(`${hospitalProfileEndpoint}/license`, {
    method: 'POST',
    body: formData,
    accessToken,
  })
}
