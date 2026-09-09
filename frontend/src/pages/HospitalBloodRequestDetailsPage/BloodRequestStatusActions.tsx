import { ConfirmModal } from '../../components/ConfirmModal/ConfirmModal'
import { FeedbackMessage } from '../../components/FeedbackMessage/FeedbackMessage'
import { CheckIcon } from '../../components/IconsSVG/CheckIcon'
import { CloseIcon } from '../../components/IconsSVG/CloseIcon'
import type { RequestConfirmationAction } from './useBloodRequestDetails'
import styles from './BloodRequestStatusActions.module.scss'

type StatusAction = Exclude<RequestConfirmationAction, null>

type Props = {
  actionError: string
  confirmationAction: RequestConfirmationAction
  isProcessing: boolean
  onClose: () => void
  onConfirm: () => Promise<void>
  onOpen: (action: StatusAction) => void
}

const confirmationContent: Record<
  StatusAction,
  {
    confirmLabel: string
    description: string
    processingLabel: string
    title: string
    variant: 'default' | 'danger'
  }
> = {
  complete: {
    confirmLabel: 'Confirm completion',
    description:
      'The request will be marked as completed and moved to Closed requests.',
    processingLabel: 'Completing...',
    title: 'Mark request as completed?',
    variant: 'default',
  },
  cancel: {
    confirmLabel: 'Confirm cancellation',
    description:
      'The request will be cancelled and removed from active request listings.',
    processingLabel: 'Cancelling...',
    title: 'Cancel blood request?',
    variant: 'danger',
  },
}

export const BloodRequestStatusActions = ({
  actionError,
  confirmationAction,
  isProcessing,
  onClose,
  onConfirm,
  onOpen,
}: Props) => {
  const modalContent = confirmationAction
    ? confirmationContent[confirmationAction]
    : confirmationContent.complete

  return (
    <div className={styles.actions}>
      <button
        className={styles.actions__complete}
        disabled={isProcessing}
        onClick={() => onOpen('complete')}
        type='button'
      >
        <CheckIcon size={19} />
        Mark as completed
      </button>
      <button
        className={styles.actions__cancel}
        disabled={isProcessing}
        onClick={() => onOpen('cancel')}
        type='button'
      >
        <CloseIcon size={19} title={null} />
        Cancel request
      </button>

      <ConfirmModal
        cancelLabel='Back'
        confirmLabel={modalContent.confirmLabel}
        description={modalContent.description}
        isOpen={confirmationAction !== null}
        isProcessing={isProcessing}
        onCancel={onClose}
        onConfirm={() => void onConfirm()}
        processingLabel={modalContent.processingLabel}
        title={modalContent.title}
        variant={modalContent.variant}
      >
        {actionError && (
          <FeedbackMessage message={actionError} type='error' />
        )}
      </ConfirmModal>
    </div>
  )
}
