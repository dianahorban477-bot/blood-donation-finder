import cn from 'classnames'
import { Link } from 'react-router'
import { BloodRequestSummary } from '../../components/BloodRequestSummary/BloodRequestSummary'
import { FeedbackMessage } from '../../components/FeedbackMessage/FeedbackMessage'
import { RequestIcon } from '../../components/IconsSVG/RequestIcon'
import { LoadingIndicator } from '../../components/LoadingIndicator/LoadingIndicator'
import { useHospitalBloodRequests } from '../../hooks/useHospitalBloodRequests'
import { hospitalRequestPaths } from '../../routes/paths'
import type { HospitalVerificationStatus } from '../../types/auth'
import styles from './HospitalBloodRequests.module.scss'

type Props = {
  accessToken: string | null
  className?: string
  verificationStatus: HospitalVerificationStatus
}

const previewRequestCount = 3

export const HospitalBloodRequests = ({
  accessToken,
  className,
  verificationStatus,
}: Props) => {
  const { errorMessage, isLoading, requests } = useHospitalBloodRequests({
    accessToken,
  })
  const activeRequests = requests
    .filter((request) => request.status === 'active')
    .slice(0, previewRequestCount)
  const isVerified = verificationStatus === 'verified'

  return (
    <section
      className={cn(styles.requests, className)}
      aria-labelledby='blood-requests-title'
    >
      <div className={styles.requests__heading}>
        <div className={styles.requests__titleGroup}>
          <span className={styles.requests__icon} aria-hidden='true'>
            <RequestIcon size={28} />
          </span>
          <div>
            <p className={styles.requests__eyebrow}>Blood requests</p>
            <h2 className={styles.requests__title} id='blood-requests-title'>
              Recent active requests
            </h2>
          </div>
        </div>
      </div>

      {isLoading ? (
        <LoadingIndicator label='Loading blood requests...' />
      ) : errorMessage ? (
        <FeedbackMessage message={errorMessage} type='error' />
      ) : activeRequests.length > 0 ? (
        <div className={styles.requests__list}>
          {activeRequests.map((request) => (
            <BloodRequestSummary
              detailsPath={hospitalRequestPaths.details(request.id)}
              key={request.id}
              request={request}
            />
          ))}
        </div>
      ) : (
        <div className={styles.requests__empty}>
          <h3 className={styles.requests__emptyTitle}>
            No active blood requests.
          </h3>
          <p className={styles.requests__description}>
            {isVerified
              ? 'Create a blood request when your hospital needs donations.'
              : 'Verified hospitals can create and manage blood requests.'}
          </p>
        </div>
      )}

      <div className={styles.requests__actions}>
        {isVerified ? (
          <>
            <Link
              className={styles.requests__primaryAction}
              to={hospitalRequestPaths.create}
            >
              Create blood request
            </Link>

            <Link
              className={styles.requests__secondaryAction}
              to={hospitalRequestPaths.list}
            >
              View all requests
            </Link>
          </>
        ) : (
          <button
            className={styles.requests__primaryAction}
            disabled
            type='button'
          >
            Create blood request
          </button>
        )}
      </div>
    </section>
  )
}
