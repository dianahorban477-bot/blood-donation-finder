import { FeedbackMessage } from '../../components/FeedbackMessage/FeedbackMessage'
import { LoadingIndicator } from '../../components/LoadingIndicator/LoadingIndicator'
import { HospitalBloodRequests } from './HospitalBloodRequests'
import { HospitalLicenseUpload } from './HospitalLicenseUpload'
import { HospitalProfileDetails } from './HospitalProfileDetails'
import { HospitalProfileForm } from './HospitalProfileForm'
import { HospitalVerificationStatus } from './HospitalVerificationStatus'
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
    rejectionReason,
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
      className={styles.profile}
      aria-labelledby='hospital-profile-title'
    >
      <div>
        <p className={styles.profile__eyebrow}>Hospital profile</p>
        <h1 className={styles.profile__title} id='hospital-profile-title'>
          {isEditing
            ? 'Complete your hospital profile'
            : 'Your hospital profile'}
        </h1>
      </div>

      <div className={styles.profile__cards}>
        <div
          className={styles.profile__card}
          aria-label='General hospital information'
        >
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

          <HospitalVerificationStatus
            hasLicenseDocument={Boolean(licenseDocumentUrl)}
            rejectionReason={rejectionReason}
            verificationStatus={verificationStatus}
          />

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

        <HospitalBloodRequests
          accessToken={accessToken}
          verificationStatus={verificationStatus}
        />
      </div>

      <HospitalLicenseUpload
        accessToken={accessToken}
        isProfileEditing={isEditing}
        licenseDocumentUrl={licenseDocumentUrl}
        onUploadSuccess={handleLicenseUploadSuccess}
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
