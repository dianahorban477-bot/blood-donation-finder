import { useEffect, useMemo, useState } from 'react'
import { RequestIcon } from '../../components/IconsSVG/RequestIcon'
import { FeedbackMessage } from '../../components/FeedbackMessage/FeedbackMessage'
import { LoadingIndicator } from '../../components/LoadingIndicator/LoadingIndicator'
import { BloodRequestSummary } from '../../components/BloodRequestSummary/BloodRequestSummary'
import { Link } from 'react-router'
import { fetchActiveBloodRequestsRequest } from '../../api/bloodRequestsApi'
import { ApiClientError } from '../../api/client'
import { useAppSelector } from '../../app/hooks'
import { donorRequestPaths } from '../../routes/paths'
import type { BloodRequestResponse } from '../../types/api'
import { filterBloodRequestsByCity } from '../../utils/bloodRequest'
import styles from './DonorBloodRequests.module.scss'

type Props = {
  donorCity: string
}

const visibleRequestCount = 3
const defaultErrorMessage = 'We could not load nearby blood requests.'

export const DonorBloodRequests = ({ donorCity }: Props) => {
  const accessToken = useAppSelector((state) => state.auth.accessToken)
  const [requests, setRequests] = useState<BloodRequestResponse[]>([])
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(Boolean(accessToken))

  useEffect(() => {
    if (!accessToken) return

    let isCurrent = true

    const loadRequests = async () => {
      setErrorMessage('')
      setIsLoading(true)

      try {
        const response = await fetchActiveBloodRequestsRequest(accessToken)

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
  }, [accessToken])

  const nearbyRequests = useMemo(
    () =>
      filterBloodRequestsByCity(requests, donorCity).slice(
        0,
        visibleRequestCount,
      ),
    [donorCity, requests],
  )

  return (
    <aside
      className={styles.requests}
      aria-labelledby='available-requests-title'
    >
      <div className={styles.requests__header}>
        <span className={styles.requests__icon} aria-hidden='true'>
          <RequestIcon size={28} />
        </span>
        <div>
          <p className={styles.requests__eyebrow}>Donation opportunities</p>
          <h2 className={styles.requests__title} id='available-requests-title'>
            Blood requests near you
          </h2>
        </div>
      </div>

      {isLoading && <LoadingIndicator label='Loading nearby requests...' />}

      {!isLoading && errorMessage && (
        <FeedbackMessage message={errorMessage} type='error' />
      )}

      {!isLoading && !errorMessage && nearbyRequests.length > 0 && (
        <div className={styles.requests__list}>
          {nearbyRequests.map((request) => (
            <BloodRequestSummary
              detailsPath={donorRequestPaths.details(request.id)}
              key={request.id}
              request={request}
              showHospitalDetails
            />
          ))}
        </div>
      )}

      {!isLoading && !errorMessage && nearbyRequests.length === 0 && (
        <p className={styles.requests__description}>
          There are no active blood requests near you right now.
        </p>
      )}

      <Link className={styles.requests__link} to={donorRequestPaths.list}>
        View all blood requests
      </Link>
    </aside>
  )
}
