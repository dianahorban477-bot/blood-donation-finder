import { RegistrationForm } from '../../components/RegistrationForm/RegistrationForm'
import styles from '../RegistrationPage.module.scss'

export const DonorRegistrationPage = () => {
  return (
    <section
      className={styles.registration}
      aria-labelledby="donor-registration-title"
    >
      <div className={styles.registration__intro}>
        <p className={styles.registration__eyebrow}>Donor registration</p>
        <h1 className={styles.registration__title} id="donor-registration-title">
          Create a donor account
        </h1>
        <div className={styles.registration__assurance}>
          <span aria-hidden="true">✓</span>
          <p>Creating an account does not determine medical eligibility to donate.</p>
        </div>
      </div>
      <div className={styles.registration__card}>
        <RegistrationForm role="donor" />
      </div>
    </section>
  )
}
