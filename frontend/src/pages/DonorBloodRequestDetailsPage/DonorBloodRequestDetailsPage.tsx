import { Link } from 'react-router'
import { BloodRequestDetails } from '../../components/BloodRequestDetails/BloodRequestDetails'
import { FeedbackMessage } from '../../components/FeedbackMessage/FeedbackMessage'
import { LoadingIndicator } from '../../components/LoadingIndicator/LoadingIndicator'
import { donorRequestPaths } from '../../routes/paths'
import { bloodRequestStatusLabels } from '../../utils/bloodRequest'
import { useDonorBloodRequestDetails } from './useDonorBloodRequestDetails'
import styles from './DonorBloodRequestDetailsPage.module.scss'

export const DonorBloodRequestDetailsPage = () => {
  const { errorMessage, isLoading, request } = useDonorBloodRequestDetails()

  if (isLoading) {
    return (
      <section className={styles.details}>
        <LoadingIndicator label='Loading blood request...' />
      </section>
    )
  }

  return (
    <section className={styles.details} aria-labelledby='request-details-title'>
      <header className={styles.details__heading}>
        <p className={styles.details__eyebrow}>Donation opportunity</p>
        <h1 className={styles.details__title} id='request-details-title'>
          Blood request details
        </h1>
      </header>

      {errorMessage && (
        <FeedbackMessage message={errorMessage} type='error' />
      )}

      {request && (
        <article className={styles.details__card}>
          <div className={styles.details__cardHeading}>
            <strong className={styles.details__bloodType}>
              {request.blood_type}
            </strong>
            <span className={styles.details__status}>
              {bloodRequestStatusLabels.active}
            </span>
          </div>

          <BloodRequestDetails request={request} showHospitalName />
        </article>
      )}

      <Link className={styles.details__back} to={donorRequestPaths.list}>
        Back to available requests
      </Link>
    </section>
  )
}
