import { useCallback, useEffect, useState } from 'react'
import {
  approveHospitalApplicationRequest,
  fetchHospitalApplicationsRequest,
  rejectHospitalApplicationRequest,
} from '../../api/adminApi'
import { ApiClientError } from '../../api/client'
import { useAppSelector } from '../../app/hooks'
import { useAutoDismissMessage } from '../../hooks/useAutoDismissMessage'
import type { HospitalApplicationSummary } from '../../types/api'

type ReviewAction = 'approve' | 'reject'

type ProcessingAction = {
  hospitalId: number
  type: ReviewAction
}

type ActionError = {
  hospitalId: number
  message: string
}

type ApplicationGroups = {
  approved: HospitalApplicationSummary[]
  pending: HospitalApplicationSummary[]
  rejected: HospitalApplicationSummary[]
}

const getLoadErrorMessage = (error: unknown) =>
  error instanceof ApiClientError
    ? error.message
    : 'We could not load hospital applications. Please try again.'

export const useAdminHospitalApplications = () => {
  const accessToken = useAppSelector((state) => state.auth.accessToken)
  const [applications, setApplications] = useState<ApplicationGroups>({
    approved: [],
    pending: [],
    rejected: [],
  })
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(Boolean(accessToken))
  const [processingAction, setProcessingAction] =
    useState<ProcessingAction | null>(null)
  const [actionError, setActionError] = useState<ActionError | null>(null)
  const [successMessage, setSuccessMessage] = useAutoDismissMessage()

  const fetchApplications = useCallback(async () => {
    if (!accessToken) {
      return null
    }

    const [pending, approved, rejected] = await Promise.all([
      fetchHospitalApplicationsRequest('pending', accessToken),
      fetchHospitalApplicationsRequest('verified', accessToken),
      fetchHospitalApplicationsRequest('rejected', accessToken),
    ])

    return {
      approved,
      pending: pending.filter(
        (application) => Boolean(application.license_document_url),
      ),
      rejected,
    }
  }, [accessToken])

  useEffect(() => {
    let isCurrent = true
    fetchApplications()
      .then((response) => {
        if (isCurrent && response) {
          setApplications(response)
        }
      })
      .catch((error) => {
        if (isCurrent) {
          setErrorMessage(getLoadErrorMessage(error))
        }
      })
      .finally(() => {
        if (isCurrent) {
          setIsLoading(false)
        }
      })

    return () => {
      isCurrent = false
    }
  }, [fetchApplications])

  const refreshApplications = async () => {
    setErrorMessage('')
    setIsLoading(true)

    try {
      const response = await fetchApplications()

      if (response) setApplications(response)
    } catch (error) {
      setErrorMessage(getLoadErrorMessage(error))
    } finally {
      setIsLoading(false)
    }
  }

  const updateApplication = async (
    hospitalId: number,
    action: ReviewAction,
    reason = '',
  ) => {
    if (!accessToken || processingAction) {
      return false
    }

    setActionError(null)
    setSuccessMessage('')
    setProcessingAction({ hospitalId, type: action })

    try {
      let updatedApplication: HospitalApplicationSummary

      if (action === 'approve') {
        updatedApplication = await approveHospitalApplicationRequest(
          hospitalId,
          accessToken,
        )
      } else {
        updatedApplication = await rejectHospitalApplicationRequest(
          hospitalId,
          reason,
          accessToken,
        )
      }

      const targetGroup = action === 'approve' ? 'approved' : 'rejected'

      setApplications((currentApplications) => ({
        ...currentApplications,
        pending: currentApplications.pending.filter(
          (application) => application.id !== hospitalId,
        ),
        [targetGroup]: [
          updatedApplication,
          ...currentApplications[targetGroup].filter(
            (application) => application.id !== hospitalId,
          ),
        ],
      }))

      setSuccessMessage(
        action === 'approve'
          ? 'The hospital application has been approved.'
          : 'The hospital application has been rejected.',
      )
      return true
    } catch (error) {
      setActionError({
        hospitalId,
        message:
          error instanceof ApiClientError
            ? error.message
            : 'We could not update the hospital application. Please try again.',
      })
      return false
    } finally {
      setProcessingAction(null)
    }
  }

  return {
    actionError,
    applications,
    approveApplication: (hospitalId: number) =>
      updateApplication(hospitalId, 'approve'),
    errorMessage,
    isLoading,
    processingAction,
    refreshApplications,
    rejectApplication: (hospitalId: number, reason: string) =>
      updateApplication(hospitalId, 'reject', reason),
    successMessage,
  }
}
