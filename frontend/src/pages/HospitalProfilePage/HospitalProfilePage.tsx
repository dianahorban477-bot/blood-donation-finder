import cn from 'classnames'
import { FeedbackMessage } from '../../components/FeedbackMessage/FeedbackMessage'
import { LoadingIndicator } from '../../components/LoadingIndicator/LoadingIndicator'
import { HospitalBloodRequests } from './HospitalBloodRequests'
import { HospitalLicenseUpload } from './HospitalLicenseUpload'
import { HospitalProfileDetails } from './HospitalProfileDetails'
import { HospitalProfileForm } from './HospitalProfileForm'
import { useHospitalProfile } from './useHospitalProfile'
import styles from './HospitalProfilePage.module.scss'

export const HospitalProfilePage = () => {
  const {
    accessToken,
    errors,
    formError,
    handleBlur,
    handleChange,
    handleEdit,
    handleLicenseUploadSuccess,
    handleLogout,
    handleSubmit,
    isEditing,
    isFormValid,
    isLoggingOut,
    isProfileLoading,
    isSubmitting,
    licenseDocumentUrl,
    routeMessage,
    successMessage,
    values,
    verificationStatus,
  } = useHospitalProfile()

  if (isProfileLoading) {
    return (
      <section className={styles.profile}>
        <LoadingIndicator label='Loading hospital profile...' />
      </section>
    )
  }

  return (
    <section
      className={cn(styles.profile, {
        [styles['profile--editing']]: isEditing,
      })}
      aria-labelledby='hospital-profile-title'
    >
        <div>
          <p className={styles.profile__eyebrow}>Hospital profile</p>
          <h1 className={styles.profile__title} id='hospital-profile-title'>
            {isEditing
              ? 'Complete your hospital profile'
              : 'Your hospital profile'}
          </h1>
          <p className={styles.profile__description}>
            Add accurate organization information for verification and future
            blood request management.
          </p>
        </div>

        <div className={styles.profile__card}>
          {routeMessage && (
            <div className={styles.profile__message}>
              <FeedbackMessage message={routeMessage} type='success' />
            </div>
          )}

          {successMessage && (
            <div className={styles.profile__message}>
              <FeedbackMessage message={successMessage} type='success' />
            </div>
          )}

          {!isEditing && (
            <h2 className={styles.profile__cardTitle}>
              General hospital information
            </h2>
          )}

          <p
            className={cn(styles.profile__status, {
              [styles['profile__status--pending']]:
                verificationStatus === 'pending',
              [styles['profile__status--verified']]:
                verificationStatus === 'verified',
              [styles['profile__status--rejected']]:
                verificationStatus === 'rejected',
            })}
          >
            Verification status: {verificationStatus}
          </p>

          {isEditing ? (
            <HospitalProfileForm
              errors={errors}
              formError={formError}
              isFormValid={isFormValid}
              isSubmitting={isSubmitting}
              onBlur={handleBlur}
              onChange={handleChange}
              onSubmit={handleSubmit}
              values={values}
            />
          ) : (
            <HospitalProfileDetails values={values} />
          )}
        </div>

        <HospitalLicenseUpload
          accessToken={accessToken}
          className={styles.profile__upload}
          isProfileEditing={isEditing}
          licenseDocumentUrl={licenseDocumentUrl}
          onUploadSuccess={handleLicenseUploadSuccess}
        />

        <HospitalBloodRequests
          className={styles.profile__requests}
          verificationStatus={verificationStatus}
        />

        <div className={styles.profile__actions}>
          {!isEditing && (
            <button
              className={styles.profile__edit}
              onClick={handleEdit}
              type='button'
            >
              Edit profile
            </button>
          )}
          <button
            className={styles.profile__logout}
            disabled={isLoggingOut}
            onClick={handleLogout}
            type='button'
          >
            {isLoggingOut ? 'Signing out...' : 'Sign out'}
          </button>
        </div>
    </section>
  )
}
