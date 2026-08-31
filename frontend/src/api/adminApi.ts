import type { HospitalApplicationSummary } from '../types/api'
import type { HospitalVerificationStatus } from '../types/auth'
import { apiRequest } from './client'

const adminHospitalsEndpoint = '/admin/hospitals'

export const fetchHospitalApplicationsRequest = (
  statusFilter: HospitalVerificationStatus,
  accessToken: string,
) =>
  apiRequest<HospitalApplicationSummary[]>(
    `${adminHospitalsEndpoint}?status_filter=${statusFilter}`,
    { accessToken },
  )

export const approveHospitalApplicationRequest = (
  hospitalId: number,
  accessToken: string,
) =>
  apiRequest<HospitalApplicationSummary>(
    `${adminHospitalsEndpoint}/${hospitalId}/approve`,
    { method: 'PATCH', accessToken },
  )

export const rejectHospitalApplicationRequest = (
  hospitalId: number,
  reason: string,
  accessToken: string,
) =>
  apiRequest<HospitalApplicationSummary>(
    `${adminHospitalsEndpoint}/${hospitalId}/reject`,
    {
      method: 'PATCH',
      body: { reason: reason.trim() || null },
      accessToken,
    },
  )
