import { FeedbackMessage } from '../../components/FeedbackMessage/FeedbackMessage'
import { LoadingIndicator } from '../../components/LoadingIndicator/LoadingIndicator'
import { DonorBloodRequests } from './DonorBloodRequests'
import { DonorProfileDetails } from './DonorProfileDetails'
import { DonorProfileForm } from './DonorProfileForm'
import { useDonorProfile } from './useDonorProfile'
import styles from './DonorProfilePage.module.scss'

export const DonorProfilePage = () => {
  const {
    errors,
    formError,
    handleBlur,
    handleChange,
    handleEdit,
    handleLogout,
    handleNeverDonatedChange,
    handleSubmit,
    hasSavedDonationDate,
    isEditing,
    isLoggingOut,
    isProfileLoading,
    isSubmitting,
    routeMessage,
    successMessage,
    values,
  } = useDonorProfile()

  if (isProfileLoading) {
    return (
      <section className={styles.profile}>
        <LoadingIndicator label='Loading donor profile...' />
      </section>
    )
  }

  return (
    <section className={styles.profile} aria-labelledby='donor-profile-title'>
      <div className={styles.profile__sidebar}>
        <div className={styles.profile__intro}>
          <p className={styles.profile__eyebrow}>Donor profile</p>
          <h1 className={styles.profile__title} id='donor-profile-title'>
            {isEditing ? 'Complete your donor profile' : 'Your donor profile'}
          </h1>
          <p className={styles.profile__description}>
            {isEditing
              ? 'Add the information hospitals will use for future donation matching.'
              : 'Review the information connected to your donor account.'}
          </p>
        </div>

        <DonorBloodRequests />
      </div>

      <div className={styles.profile__card}>
        {(routeMessage || successMessage) && (
          <div className={styles.profile__messages}>
            {routeMessage && (
              <FeedbackMessage message={routeMessage} type='success' />
            )}
            {successMessage && (
              <FeedbackMessage message={successMessage} type='success' />
            )}
          </div>
        )}

        {isEditing ? (
          <DonorProfileForm
            errors={errors}
            formError={formError}
            hasSavedDonationDate={hasSavedDonationDate}
            isSubmitting={isSubmitting}
            onBlur={handleBlur}
            onChange={handleChange}
            onNeverDonatedChange={handleNeverDonatedChange}
            onSubmit={handleSubmit}
            values={values}
          />
        ) : (
          <DonorProfileDetails onEdit={handleEdit} values={values} />
        )}

        <div className={styles.profile__actions}>
          <button
            className={styles.profile__logout}
            disabled={isLoggingOut}
            onClick={handleLogout}
            type='button'
          >
            {isLoggingOut ? 'Signing out...' : 'Sign out'}
          </button>
        </div>
      </div>
    </section>
  )
}
