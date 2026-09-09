import { useEffect, useMemo, useState } from 'react'
import {
  fetchActiveBloodRequestsRequest,
  fetchActiveBloodRequestsSearchRequest,
  type DonorBloodRequestSearchFilters,
} from '../../api/bloodRequestsApi'
import { ApiClientError } from '../../api/client'
import { fetchDonorProfileRequest } from '../../api/donorProfileApi'
import { useAppSelector } from '../../app/hooks'
import type { BloodRequestResponse } from '../../types/api'
import { prioritizeBloodRequestsByCity } from '../../utils/bloodRequest'

const defaultErrorMessage = 'We could not load the available blood requests.'

export const useDonorBloodRequests = (
  filters: DonorBloodRequestSearchFilters,
) => {
  const accessToken = useAppSelector((state) => state.auth.accessToken)
  const [donorCity, setDonorCity] = useState('')
  const [requests, setRequests] = useState<BloodRequestResponse[]>([])
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(Boolean(accessToken))

  useEffect(() => {
    if (!accessToken) return

    let isCurrent = true

    fetchDonorProfileRequest(accessToken)
      .then((profile) => {
        if (isCurrent) {
          setDonorCity(profile.location?.city ?? '')
        }
      })
      .catch(() => {
        if (isCurrent) {
          setDonorCity('')
        }
      })

    return () => {
      isCurrent = false
    }
  }, [accessToken])

  useEffect(() => {
    if (!accessToken) return

    let isCurrent = true
    const hasLocationFilters = Object.values(filters).some(
      (value) => Boolean(value?.trim()),
    )

    const loadRequests = async () => {
      setErrorMessage('')
      setIsLoading(true)

      try {
        const response = hasLocationFilters
          ? await fetchActiveBloodRequestsSearchRequest(filters, accessToken)
          : await fetchActiveBloodRequestsRequest(accessToken)

        if (!isCurrent) return

        setRequests(response)
      } catch (error) {
        if (!isCurrent) return

        setRequests([])
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
  }, [accessToken, filters])

  const prioritizedRequests = useMemo(
    () => prioritizeBloodRequestsByCity(requests, donorCity),
    [donorCity, requests],
  )

  return {
    errorMessage,
    isLoading: Boolean(accessToken) && isLoading,
    requests: prioritizedRequests,
  }
}
