import { useState } from 'react'
import { ConfirmModal } from '../../components/ConfirmModal/ConfirmModal'
import { FeedbackMessage } from '../../components/FeedbackMessage/FeedbackMessage'
import styles from './HospitalVerificationActions.module.scss'

type ConfirmationAction = 'approve' | 'reject' | null

type Props = {
  actionError: string
  hospitalId: number
  isProcessing: boolean
  onApprove: (hospitalId: number) => Promise<boolean>
  onReject: (hospitalId: number, reason: string) => Promise<boolean>
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
  const [confirmationAction, setConfirmationAction] = useState<ConfirmationAction>(null)
  const [rejectionReason, setRejectionReason] = useState('')
  const isApproveConfirmation = confirmationAction === 'approve'
  const isConfirmationProcessing = isProcessing && processingAction === confirmationAction

  const closeConfirmation = () => {
    if (!isProcessing) {
      setConfirmationAction(null)
    }
  }

  const confirmAction = async () => {
    if (!confirmationAction || isProcessing) {
      return
    }

    const wasSuccessful =
      confirmationAction === 'approve'
        ? await onApprove(hospitalId)
        : await onReject(hospitalId, rejectionReason)

    if (wasSuccessful) {
      if (confirmationAction === 'reject') {
        setRejectionReason('')
      }
      setConfirmationAction(null)
    }
  }

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

      {actionError && confirmationAction === null && (
        <FeedbackMessage message={actionError} type='error' />
      )}

      <div className={styles.verification__buttons}>
        <button
          className={styles.verification__reject}
          disabled={isProcessing}
          onClick={() => setConfirmationAction('reject')}
          type='button'
        >
          Reject
        </button>
        <button
          className={styles.verification__approve}
          disabled={isProcessing}
          onClick={() => setConfirmationAction('approve')}
          type='button'
        >
          Approve
        </button>
      </div>

      <ConfirmModal
        cancelLabel='Cancel'
        confirmLabel={
          isApproveConfirmation ? 'Confirm approval' : 'Confirm rejection'
        }
        description={
          isApproveConfirmation
            ? 'The hospital will receive verified status and will be able to create blood requests.'
            : 'The hospital will receive rejected status and will not be able to create blood requests.'
        }
        isOpen={confirmationAction !== null}
        isProcessing={isConfirmationProcessing}
        onCancel={closeConfirmation}
        onConfirm={() => void confirmAction()}
        processingLabel={
          processingAction === 'approve' ? 'Approving...' : 'Rejecting...'
        }
        title={
          isApproveConfirmation
            ? 'Approve hospital application?'
            : 'Reject hospital application?'
        }
        variant={isApproveConfirmation ? 'default' : 'danger'}
      >
        {confirmationAction === 'reject' && rejectionReason && (
          <p className={styles.verification__confirmationReason}>
            Reason: <strong>{rejectionReason}</strong>
          </p>
        )}
        {actionError && (
          <FeedbackMessage message={actionError} type='error' />
        )}
      </ConfirmModal>
    </div>
  )
}
