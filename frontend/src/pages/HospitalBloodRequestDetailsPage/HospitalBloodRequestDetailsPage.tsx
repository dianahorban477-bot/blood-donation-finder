import cn from 'classnames'
import { Link } from 'react-router'
import { BloodRequestDetails } from '../../components/BloodRequestDetails/BloodRequestDetails'
import { BloodRequestForm } from '../../components/BloodRequestForm/BloodRequestForm'
import { FeedbackMessage } from '../../components/FeedbackMessage/FeedbackMessage'
import { CloseIcon } from '../../components/IconsSVG/CloseIcon'
import { DonationCalendarIcon } from '../../components/IconsSVG/DonationCalendarIcon'
import { DocumentIcon } from '../../components/IconsSVG/DocumentIcon'
import { HospitalIcon } from '../../components/IconsSVG/HospitalIcon'
import { LoadingIndicator } from '../../components/LoadingIndicator/LoadingIndicator'
import { useProfileRouteMessage } from '../../hooks/useProfileRouteMessage'
import { hospitalRequestPaths } from '../../routes/paths'
import { bloodRequestStatusLabels } from '../../utils/bloodRequest'
import { BloodRequestStatusActions } from './BloodRequestStatusActions'
import { useBloodRequestDetails } from './useBloodRequestDetails'
import styles from './HospitalBloodRequestDetailsPage.module.scss'

export const HospitalBloodRequestDetailsPage = () => {
  const routeMessage = useProfileRouteMessage()
  const {
    actionError,
    cancelEditing,
    closeConfirmation,
    confirmationAction,
    confirmStatusUpdate,
    errorMessage,
    errors,
    formError,
    handleBlur,
    handleChange,
    isEditing,
    isLoading,
    isStatusUpdating,
    isSubmitting,
    openConfirmation,
    request,
    startEditing,
    submitUpdate,
    successMessage,
    values,
  } = useBloodRequestDetails()

  if (isLoading) {
    return (
      <section className={styles.details}>
        <LoadingIndicator label='Loading blood request...' />
      </section>
    )
  }

  return (
    <section className={styles.details} aria-labelledby='request-details-title'>
      <div className={styles.details__heading}>
        <p className={styles.details__eyebrow}>Blood request management</p>
        <h1 className={styles.details__title} id='request-details-title'>
          {isEditing ? 'Edit blood request' : 'Blood request details'}
        </h1>
      </div>

      {routeMessage && (
        <FeedbackMessage message={routeMessage} type='success' />
      )}
      {successMessage && (
        <FeedbackMessage message={successMessage} type='success' />
      )}

      {errorMessage && (
        <FeedbackMessage message={errorMessage} type='error' />
      )}

      {request && (
        <div className={styles.details__layout}>
          <section
            className={styles.details__card}
            aria-label={isEditing ? 'Edit request' : 'Request details'}
          >
            {isEditing ? (
              <BloodRequestForm
                errors={errors}
                formError={formError}
                isSubmitting={isSubmitting}
                onBlur={handleBlur}
                onCancel={cancelEditing}
                onChange={handleChange}
                onSubmit={submitUpdate}
                submitLabel='Save changes'
                submittingLabel='Saving changes...'
                values={values}
              />
            ) : (
              <>
                <div className={styles.details__cardHeading}>
                  <h2>Request #{request.id}</h2>
                  <span
                    className={cn(
                      styles.details__status,
                      styles[`details__status--${request.status}`],
                    )}
                  >
                    {bloodRequestStatusLabels[request.status]}
                  </span>
                </div>

                <BloodRequestDetails request={request} />
              </>
            )}
          </section>

          <aside
            className={styles.details__actionCard}
            aria-labelledby='request-actions-title'
          >
            <h2 className={styles.details__actionTitle} id='request-actions-title'>
              Actions
            </h2>

            {request.status === 'active' && !isEditing ? (
              <div className={styles.details__management}>
                <button
                  className={styles.details__edit}
                  onClick={startEditing}
                  type='button'
                >
                  <DocumentIcon size={19} />
                  Edit request
                </button>
                <BloodRequestStatusActions
                  actionError={actionError}
                  confirmationAction={confirmationAction}
                  isProcessing={isStatusUpdating}
                  onClose={closeConfirmation}
                  onConfirm={confirmStatusUpdate}
                  onOpen={openConfirmation}
                />
              </div>
            ) : (
              <p className={styles.details__actionNote}>
                {isEditing
                  ? 'Save or cancel your changes before choosing another action.'
                  : 'This request is closed and can no longer be changed.'}
              </p>
            )}

            <div className={styles.details__moreActions}>
              <p className={styles.details__moreTitle}>More options</p>
              <nav
                className={styles.details__navigation}
                aria-label='Request navigation'
              >
                <Link
                  className={styles.details__actionLink}
                  to={hospitalRequestPaths.create}
                >
                  <CloseIcon
                    className={styles.details__plusIcon}
                    size={19}
                    title={null}
                  />
                  Create another request
                </Link>
                <Link
                  className={styles.details__actionLink}
                  to={hospitalRequestPaths.list}
                >
                  <DonationCalendarIcon size={19} />
                  Back to all requests
                </Link>
                <Link
                  className={styles.details__actionLink}
                  to={hospitalRequestPaths.profile}
                >
                  <HospitalIcon size={19} />
                  Back to hospital profile
                </Link>
              </nav>
            </div>
          </aside>
        </div>
      )}

      {!request && (
        <Link className={styles.details__fallbackLink} to={hospitalRequestPaths.list}>
          Back to all requests
        </Link>
      )}
    </section>
  )
}
