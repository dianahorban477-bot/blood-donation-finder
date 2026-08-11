import { RegistrationForm } from '../../components/RegistrationForm/RegistrationForm'
import styles from '../RegistrationPage.module.scss'

export const HospitalRegistrationPage = () => {
  return (
    <section className={styles.registration} aria-labelledby="hospital-registration-title">
      <div className={styles.registration__intro}>
        <p className={styles.registration__eyebrow}>Institution registration</p>
        <h1 className={styles.registration__title} id="hospital-registration-title">Register a hospital</h1>
        <p className={styles.registration__description}>
          Create an institutional account with your work email.
        </p>
        <div className={styles.registration__status}>
          <span className={styles.registration__statusDot} aria-hidden="true" />
          <div>
            <strong>Pending Verification</strong>
            <p>New hospital accounts remain limited until the organization review is complete.</p>
          </div>
        </div>
      </div>
      <div className={styles.registration__card}>
        <RegistrationForm role="hospital" />
      </div>
    </section>
  )
}
