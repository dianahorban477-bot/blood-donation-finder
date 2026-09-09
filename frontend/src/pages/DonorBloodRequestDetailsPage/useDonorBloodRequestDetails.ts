import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { fetchBloodRequestRequest } from '../../api/bloodRequestsApi'
import { ApiClientError } from '../../api/client'
import { useAppSelector } from '../../app/hooks'
import type { BloodRequestResponse } from '../../types/api'

const invalidRequestMessage = 'The requested blood request does not exist.'
const defaultErrorMessage = 'We could not load this blood request.'

export const useDonorBloodRequestDetails = () => {
  const { requestId: requestIdParam } = useParams()
  const accessToken = useAppSelector((state) => state.auth.accessToken)
  const requestId = Number(requestIdParam)
  const isValidRequestId = Number.isInteger(requestId) && requestId > 0
  const canLoadRequest = isValidRequestId && Boolean(accessToken)
  const [request, setRequest] = useState<BloodRequestResponse | null>(null)
  const [errorMessage, setErrorMessage] = useState(
    isValidRequestId ? '' : invalidRequestMessage,
  )
  const [isLoading, setIsLoading] = useState(canLoadRequest)

  useEffect(() => {
    if (!canLoadRequest || !accessToken) return

    let isCurrent = true

    const loadRequest = async () => {
      setErrorMessage('')
      setIsLoading(true)

      try {
        const response = await fetchBloodRequestRequest(
          requestId,
          accessToken,
        )

        if (isCurrent) {
          setRequest(response)
        }
      } catch (error) {
        if (!isCurrent) return

        setRequest(null)
        setErrorMessage(
          error instanceof ApiClientError && error.status === 404
            ? invalidRequestMessage
            : error instanceof ApiClientError
              ? error.message
              : defaultErrorMessage,
        )
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
  }, [accessToken, canLoadRequest, requestId])

  return {
    errorMessage,
    isLoading: canLoadRequest && isLoading,
    request,
  }
}
