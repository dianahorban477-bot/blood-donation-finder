import { RequestIcon } from '../../components/IconsSVG/RequestIcon'
import styles from './DonorBloodRequests.module.scss'

export const DonorBloodRequests = () => (
  <aside
    className={styles.requests}
    aria-labelledby='available-requests-title'
  >
    <span className={styles.requests__icon} aria-hidden='true'>
      <RequestIcon size={28} />
    </span>
    <div className={styles.requests__content}>
      <p className={styles.requests__eyebrow}>Donation opportunities</p>
      <h2 className={styles.requests__title} id='available-requests-title'>
        Available blood requests
      </h2>
      <p className={styles.requests__description}>
        Find active donation requests published by verified hospitals.
      </p>
      <span className={styles.requests__link} aria-disabled='true'>
        Browse blood requests
      </span>
    </div>
  </aside>
)
