import cn from 'classnames'
import type { HospitalVerificationStatus as VerificationStatus } from '../../types/auth'
import styles from './HospitalVerificationStatus.module.scss'

type Props = {
  verificationStatus: VerificationStatus
  hasLicenseDocument: boolean
  rejectionReason: string | null
}

type StatusContent = {
  label: string
  message: string
  state: 'not-submitted' | VerificationStatus
}

const getStatusContent = (
  verificationStatus: VerificationStatus,
  hasLicenseDocument: boolean,
): StatusContent => {
  if (!hasLicenseDocument) {
    return {
      label: 'Not submitted',
      message:
        'Complete your profile and upload a license to submit the hospital for verification.',
      state: 'not-submitted',
    }
  }

  if (verificationStatus === 'verified') {
    return {
      label: 'Verified',
      message:
        'Your hospital has been verified. You can now create and manage blood requests.',
      state: 'verified',
    }
  }

  if (verificationStatus === 'rejected') {
    return {
      label: 'Rejected',
      message:
        'Your application was rejected. Review the reason below and upload a new license to submit it again.',
      state: 'rejected',
    }
  }

  return {
    label: 'Pending verification',
    message:
      'Your application is currently under review. You can replace the license, but this will restart the verification process.',
    state: 'pending',
  }
}

export const HospitalVerificationStatus = ({
  verificationStatus,
  hasLicenseDocument,
  rejectionReason,
}: Props) => {
  const status = getStatusContent(verificationStatus, hasLicenseDocument)

  return (
    <section
      className={cn(styles.status, {
        [styles['status--pending']]: status.state === 'pending',
        [styles['status--verified']]: status.state === 'verified',
        [styles['status--rejected']]: status.state === 'rejected',
      })}
      aria-labelledby='hospital-verification-status-title'
    >
      <p className={styles.status__eyebrow}>Verification status</p>
      <h2
        className={styles.status__label}
        id='hospital-verification-status-title'
      >
        {status.label}
      </h2>
      <p className={styles.status__message}>{status.message}</p>

      {status.state === 'rejected' && rejectionReason && (
        <p className={styles.status__reason}>
          Reason: <strong>{rejectionReason}</strong>
        </p>
      )}
    </section>
  )
}
