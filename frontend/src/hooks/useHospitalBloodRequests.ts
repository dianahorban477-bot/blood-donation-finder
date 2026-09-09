import { useEffect, useState } from 'react'
import { fetchHospitalBloodRequestsRequest } from '../api/bloodRequestsApi'
import { ApiClientError } from '../api/client'
import type { BloodRequestResponse } from '../types/api'

type Options = {
  accessToken: string | null
}

const defaultErrorMessage =
  'We could not load the hospital blood requests.'

export const useHospitalBloodRequests = ({ accessToken }: Options) => {
  const canLoadRequests = Boolean(accessToken)
  const [requests, setRequests] = useState<BloodRequestResponse[]>([])
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(canLoadRequests)

  useEffect(() => {
    if (!accessToken) return

    let isCurrent = true

    const loadRequests = async () => {
      setErrorMessage('')
      setIsLoading(true)

      try {
        const response = await fetchHospitalBloodRequestsRequest(accessToken)

        if (!isCurrent) return

        setRequests(response)
      } catch (error) {
        if (!isCurrent) return

        setErrorMessage(
          error instanceof ApiClientError
            ? error.message
            : defaultErrorMessage,
        )
      } finally {
        if (isCurrent) {
          setIsLoading(false)
        }
      }
    }

    void loadRequests()

    return () => {
      isCurrent = false
    }
  }, [accessToken])

  return {
    errorMessage,
    isLoading: canLoadRequests && isLoading,
    requests,
  }
}
