import cn from 'classnames'
import { Link } from 'react-router'
import type { BloodRequestResponse } from '../../types/api'
import {
  bloodRequestStatusLabels,
  donationTypeOptions,
  formatBloodRequestAmount,
  formatBloodRequestLocation,
  getBloodRequestOptionLabel,
  urgencyOptions,
} from '../../utils/bloodRequest'
import styles from './BloodRequestSummary.module.scss'

type Props = {
  detailsPath: string
  request: BloodRequestResponse
  showHospitalDetails?: boolean
}

const unavailableHospitalName = 'Hospital name unavailable'

export const BloodRequestSummary = ({
  detailsPath,
  request,
  showHospitalDetails = false,
}: Props) => (
  <Link
    aria-label={`View details for request ${request.id}`}
    className={styles.summary}
    to={detailsPath}
  >
    <div className={styles.summary__heading}>
      <h3 className={styles.summary__title}>
        {showHospitalDetails
          ? request.hospital_name || unavailableHospitalName
          : `Request #${request.id}`}
      </h3>

      <div className={styles.summary__overview}>
        <strong className={styles.summary__bloodType}>
          {request.blood_type}
        </strong>
        <span>
          {getBloodRequestOptionLabel(
            donationTypeOptions,
            request.donation_type,
          )}
        </span>
        <span className={styles.summary__amount}>{formatBloodRequestAmount(request.required_amount)}</span>
      </div>

      {showHospitalDetails && (
        <div className={styles.summary__details}>
          <span>{formatBloodRequestLocation(request.location)}</span>
          <span>
            Urgency: {getBloodRequestOptionLabel(urgencyOptions, request.urgency)}
          </span>
        </div>
      )}
    </div>

    <div className={styles.summary__side}>
      <span
        className={cn(
          styles.summary__status,
          styles[`summary__status--${request.status}`],
        )}
      >
        {bloodRequestStatusLabels[request.status]}
      </span>

      <span className={styles.summary__action}>View details</span>
    </div>
  </Link>
)
