import {
  type SubmitEvent,
  useEffect,
  useState,
} from 'react'
import { useParams } from 'react-router'
import {
  fetchBloodRequestRequest,
  updateBloodRequestRequest,
  updateBloodRequestStatusRequest,
} from '../../api/bloodRequestsApi'
import { ApiClientError } from '../../api/client'
import { fetchHospitalProfileRequest } from '../../api/hospitalProfileApi'
import { useAppSelector } from '../../app/hooks'
import {
  fromBloodRequestResponse,
  toBloodRequestUpdatePayload,
} from '../../components/BloodRequestForm/formModel'
import { useBloodRequestForm } from '../../components/BloodRequestForm/useBloodRequestForm'
import { useAutoDismissMessage } from '../../hooks/useAutoDismissMessage'
import type {
  BloodRequestFinalStatus,
  BloodRequestResponse,
} from '../../types/api'

export type RequestConfirmationAction =
  | 'complete'
  | 'cancel'
  | null

const invalidRequestMessage = 'The requested blood request does not exist.'
const unauthorizedRequestMessage = 'You do not have permission to manage this blood request.'
const defaultLoadErrorMessage = 'We could not load the blood request.'
const defaultUpdateErrorMessage = 'We could not update the blood request.'
const defaultStatusErrorMessage = 'We could not update the blood request status.'

const getErrorMessage = (error: unknown, fallback: string) =>
  error instanceof ApiClientError ? error.message : fallback

export const useBloodRequestDetails = () => {
  const { requestId: requestIdParam } = useParams()
  const accessToken = useAppSelector((state) => state.auth.accessToken)
  const requestId = Number(requestIdParam)
  const isValidRequestId = Number.isInteger(requestId) && requestId > 0
  const canLoadRequest = isValidRequestId && Boolean(accessToken)
  const [request, setRequest] = useState<BloodRequestResponse | null>(null)
  const {
    errors,
    formError,
    handleBlur,
    handleChange,
    resetForm,
    setFormError,
    validateForm,
    values,
  } = useBloodRequestForm()
  const [errorMessage, setErrorMessage] = useState(
    isValidRequestId ? '' : invalidRequestMessage,
  )
  const [actionError, setActionError] = useState('')
  const [successMessage, setSuccessMessage] = useAutoDismissMessage()
  const [confirmationAction, setConfirmationAction] =
    useState<RequestConfirmationAction>(null)
  const [isLoading, setIsLoading] = useState(canLoadRequest)
  const [isEditing, setIsEditing] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isStatusUpdating, setIsStatusUpdating] = useState(false)

  useEffect(() => {
    if (!canLoadRequest || !accessToken) return

    let isCurrent = true

    const loadRequest = async () => {
      setIsLoading(true)

      try {
        const [requestResponse, profile] = await Promise.all([
          fetchBloodRequestRequest(requestId, accessToken),
          fetchHospitalProfileRequest(accessToken),
        ])

        if (!isCurrent) return

        if (requestResponse.hospital_id !== profile.id) {
          setErrorMessage(unauthorizedRequestMessage)
          return
        }

        setRequest(requestResponse)
        resetForm(fromBloodRequestResponse(requestResponse))
      } catch (error) {
        if (!isCurrent) return

        setErrorMessage(getErrorMessage(error, defaultLoadErrorMessage))
      } finally {
        if (isCurrent) {
          setIsLoading(false)
        }
      }
    }

    void loadRequest()

    return () => {
      isCurrent = false
    }
  }, [accessToken, canLoadRequest, requestId, resetForm])

  const startEditing = () => {
    if (!request || request.status !== 'active') return

    resetForm(fromBloodRequestResponse(request))
    setSuccessMessage('')
    setIsEditing(true)
  }

  const cancelEditing = () => {
    if (isSubmitting) return

    if (request) {
      resetForm(fromBloodRequestResponse(request))
    }

    setIsEditing(false)
  }

  const submitUpdate = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!request || !accessToken || isSubmitting) return

    if (!validateForm()) {
      setFormError('Complete the required fields before saving.')
      return
    }

    setFormError('')
    setIsSubmitting(true)

    try {
      const updatedRequest = await updateBloodRequestRequest(
        request.id,
        toBloodRequestUpdatePayload(values),
        accessToken,
      )

      setRequest(updatedRequest)
      resetForm(fromBloodRequestResponse(updatedRequest))
      setIsEditing(false)
      setSuccessMessage('Blood request updated successfully.')
    } catch (error) {
      setFormError(getErrorMessage(error, defaultUpdateErrorMessage))
    } finally {
      setIsSubmitting(false)
    }
  }

  const openConfirmation = (
    action: Exclude<RequestConfirmationAction, null>,
  ) => {
    if (!request || request.status !== 'active' || isStatusUpdating) return

    setActionError('')
    setConfirmationAction(action)
  }

  const closeConfirmation = () => {
    if (isStatusUpdating) return

    setActionError('')
    setConfirmationAction(null)
  }

  const confirmStatusUpdate = async () => {
    if (!confirmationAction || !request || !accessToken || isStatusUpdating) {
      return
    }

    const nextStatus: BloodRequestFinalStatus =
      confirmationAction === 'complete' ? 'completed' : 'cancelled'

    setActionError('')
    setIsStatusUpdating(true)

    try {
      const updatedRequest = await updateBloodRequestStatusRequest(
        request.id,
        nextStatus,
        accessToken,
      )

      setRequest(updatedRequest)
      resetForm(fromBloodRequestResponse(updatedRequest))
      setConfirmationAction(null)
      setSuccessMessage(
        nextStatus === 'completed'
          ? 'Blood request marked as completed.'
          : 'Blood request cancelled.',
      )
    } catch (error) {
      setActionError(getErrorMessage(error, defaultStatusErrorMessage))
    } finally {
      setIsStatusUpdating(false)
    }
  }

  return {
    actionError,
    cancelEditing,
    closeConfirmation,
    confirmationAction,
    confirmStatusUpdate,
    errorMessage,
    errors,
    formError,
    handleBlur,
    handleChange,
    isEditing,
    isLoading: canLoadRequest && isLoading,
    isStatusUpdating,
    isSubmitting,
    openConfirmation,
    request,
    startEditing,
    submitUpdate,
    successMessage,
    values,
  }
}
