import { Link } from 'react-router'
import { BloodRequestForm } from '../../components/BloodRequestForm/BloodRequestForm'
import { LoadingIndicator } from '../../components/LoadingIndicator/LoadingIndicator'
import { hospitalRequestPaths } from '../../routes/paths'
import { useCreateBloodRequest } from './useCreateBloodRequest'
import styles from './CreateBloodRequestPage.module.scss'

export const CreateBloodRequestPage = () => {
  const {
    errors,
    formError,
    handleBlur,
    handleChange,
    handleSubmit,
    isInitializing,
    isSubmitting,
    values,
  } = useCreateBloodRequest()

  if (isInitializing) {
    return (
      <section className={styles.page}>
        <LoadingIndicator label='Preparing blood request form...' />
      </section>
    )
  }

  return (
    <section className={styles.page} aria-labelledby='create-request-title'>
      <div className={styles.page__heading}>
        <p className={styles.page__eyebrow}>Create blood request</p>
        <p className={styles.page__description}>
          Provide the donation requirements and hospital location. The request
          will become active immediately after successful creation.
        </p>
      </div>

      <section className={styles.page__card} aria-label='Request information'>
        <BloodRequestForm
          errors={errors}
          formError={formError}
          isSubmitting={isSubmitting}
          onBlur={handleBlur}
          onChange={handleChange}
          onSubmit={handleSubmit}
          values={values}
        />
      </section>

      <nav className={styles.page__navigation} aria-label='Request navigation'>
        <Link className={styles.page__back} to={hospitalRequestPaths.profile}>
          Back to hospital profile
        </Link>
      </nav>
    </section>
  )
}
