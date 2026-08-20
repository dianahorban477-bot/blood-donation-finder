import cn from 'classnames'
import { RequestIcon } from '../../components/IconsSVG/RequestIcon'
import type { HospitalVerificationStatus } from '../../types/auth'
import styles from './HospitalBloodRequests.module.scss'

type Props = {
  className?: string
  verificationStatus: HospitalVerificationStatus
}

export const HospitalBloodRequests = ({
  className,
  verificationStatus,
}: Props) => (
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
          <p className={styles.requests__eyebrow}>Create blood requests</p>
          <h2 className={styles.requests__title} id='blood-requests-title'>
            Requests
          </h2>
        </div>
      </div>
    </div>

    <div className={styles.requests__empty}>
      <h3 className={styles.requests__emptyTitle}>No blood requests yet</h3>
      <p className={styles.requests__description} id='blood-requests-note'>
        {verificationStatus === 'verified'
          ? 'You will be able to create and manage blood donation requests here.'
          : 'After verification, the hospital will be able to create and manage blood donation requests here.'}
      </p>
      <button
        aria-describedby='blood-requests-note'
        className={styles.requests__button}
        disabled
        type='button'
      >
        Create blood request
      </button>
    </div>
  </section>
)
