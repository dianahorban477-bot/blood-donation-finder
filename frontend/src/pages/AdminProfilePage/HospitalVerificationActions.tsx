import { useState } from 'react'
import { FeedbackMessage } from '../../components/FeedbackMessage/FeedbackMessage'
import { LoadingIndicator } from '../../components/LoadingIndicator/LoadingIndicator'
import styles from './HospitalVerificationActions.module.scss'

type Props = {
  actionError: string
  hospitalId: number
  isProcessing: boolean
  onApprove: (hospitalId: number) => void
  onReject: (hospitalId: number, reason: string) => void
  processingAction: 'approve' | 'reject' | null
}

export const HospitalVerificationActions = ({
  actionError,
  hospitalId,
  isProcessing,
  onApprove,
  onReject,
  processingAction,
}: Props) => {
  const [rejectionReason, setRejectionReason] = useState('')

  return (
    <div className={styles.verification}>
      <label className={styles.verification__reason}>
        <span>Rejection reason (optional)</span>
        <textarea
          disabled={isProcessing}
          onChange={(event) => setRejectionReason(event.target.value)}
          rows={1}
          value={rejectionReason}
        />
      </label>

      {actionError && (
        <FeedbackMessage message={actionError} type='error' />
      )}

      {isProcessing && processingAction && (
        <LoadingIndicator
          label={
            processingAction === 'approve' ? 'Approving...' : 'Rejecting...'
          }
        />
      )}

      <div className={styles.verification__buttons}>
        <button
          className={styles.verification__reject}
          disabled={isProcessing}
          onClick={() => onReject(hospitalId, rejectionReason)}
          type='button'
        >
          Reject
        </button>
        <button
          className={styles.verification__approve}
          disabled={isProcessing}
          onClick={() => onApprove(hospitalId)}
          type='button'
        >
          Approve
        </button>
      </div>
    </div>
  )
}
