import cn from 'classnames'
import {
  type MouseEvent,
  type ReactNode,
  type SyntheticEvent,
  useEffect,
  useId,
  useRef,
} from 'react'
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll'
import styles from './ConfirmModal.module.scss'

type Props = {
  cancelLabel: string
  children?: ReactNode
  confirmLabel: string
  description: string
  isOpen: boolean
  isProcessing?: boolean
  onCancel: () => void
  onConfirm: () => void
  processingLabel?: string
  title: string
  variant?: 'default' | 'danger'
}

export const ConfirmModal = ({
  cancelLabel,
  children,
  confirmLabel,
  description,
  isOpen,
  isProcessing = false,
  onCancel,
  onConfirm,
  processingLabel,
  title,
  variant = 'default',
}: Props) => {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const titleId = useId()
  const descriptionId = useId()

  useLockBodyScroll(isOpen)

  useEffect(() => {
    const dialog = dialogRef.current

    if (!dialog) return

    if (isOpen && !dialog.open) {
      dialog.showModal()
    } else if (!isOpen && dialog.open) {
      dialog.close()
    }
  }, [isOpen])

  const handleCancel = (event: SyntheticEvent<HTMLDialogElement>) => {
    event.preventDefault()
    if (!isProcessing) {
      onCancel()
    }
  }

  const handleBackdropMouseDown = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget && !isProcessing) {
      onCancel()
    }
  }

  return (
    <dialog
      ref={dialogRef}
      aria-describedby={descriptionId}
      aria-labelledby={titleId}
      className={styles.modal}
      onCancel={handleCancel}
      onMouseDown={handleBackdropMouseDown}
    >
      <section className={styles.modal__dialog}>
        <h2 className={styles.modal__title} id={titleId}>
          {title}
        </h2>
        <p className={styles.modal__description} id={descriptionId}>
          {description}
        </p>

        {children}

        <div className={styles.modal__actions}>
          <button
            className={styles.modal__cancel}
            disabled={isProcessing}
            onClick={onCancel}
            type='button'
          >
            {cancelLabel}
          </button>
          <button
            className={cn(styles.modal__confirm, {
              [styles['modal__confirm--danger']]: variant === 'danger',
            })}
            disabled={isProcessing}
            onClick={onConfirm}
            type='button'
          >
            {isProcessing && processingLabel
              ? processingLabel
              : confirmLabel}
          </button>
        </div>
      </section>
    </dialog>
  )
}
