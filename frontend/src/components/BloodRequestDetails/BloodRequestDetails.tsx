import cn from 'classnames'
import type { BloodRequestResponse } from '../../types/api'
import {
  donationTypeOptions,
  formatBloodRequestAmount,
  formatBloodRequestLocation,
  getBloodRequestOptionLabel,
  urgencyOptions,
} from '../../utils/bloodRequest'
import { ProfileDetail } from '../ProfileDetail/ProfileDetail'
import { BloodDropIcon } from '../IconsSVG/BloodDropIcon'
import { DocumentIcon } from '../IconsSVG/DocumentIcon'
import { HospitalIcon } from '../IconsSVG/HospitalIcon'
import { LocationIcon } from '../IconsSVG/LocationIcon'
import { PlasmaIcon } from '../IconsSVG/PlasmaIcon'
import { UrgencyIcon } from '../IconsSVG/UrgencyIcon'
import styles from './BloodRequestDetails.module.scss'

type Props = {
  request: BloodRequestResponse
  showHospitalName?: boolean
}

const unavailableHospitalName = 'Hospital name unavailable'

export const BloodRequestDetails = ({
  request,
  showHospitalName = false,
}: Props) => {
  const locationDetails = (
    <ProfileDetail
      className={cn(styles.details__item, {
        [styles['details__item--fullWidth']]:
          !showHospitalName && !request.additional_info,
      })}
      icon={<LocationIcon size={22} />}
      label='Hospital location'
      value={formatBloodRequestLocation(request.location)}
    />
  )

  return (
    <dl className={styles.details}>
      {showHospitalName && (
        <ProfileDetail
          className={styles.details__item}
          icon={<HospitalIcon size={22} />}
          label='Hospital name'
          value={request.hospital_name || unavailableHospitalName}
        />
      )}
      {showHospitalName && locationDetails}
      <ProfileDetail
        className={styles.details__item}
        icon={<BloodDropIcon size={22} />}
        label='Blood type'
        value={request.blood_type}
      />
      <ProfileDetail
        className={styles.details__item}
        icon={<PlasmaIcon size={22} />}
        label='Donation type'
        value={getBloodRequestOptionLabel(
          donationTypeOptions,
          request.donation_type,
        )}
      />
      <ProfileDetail
        className={styles.details__item}
        icon={<BloodDropIcon fill='currentColor' size={22} />}
        label='Required quantity'
        value={formatBloodRequestAmount(request.required_amount)}
      />
      <ProfileDetail
        className={cn(styles.details__item, {
          [styles['details__item--critical']]: request.urgency === 'critical',
        })}
        icon={<UrgencyIcon size={22} />}
        label='Urgency level'
        value={getBloodRequestOptionLabel(urgencyOptions, request.urgency)}
      />
      {!showHospitalName && locationDetails}
      {request.additional_info && (
        <ProfileDetail
          className={cn(
            styles.details__item,
            showHospitalName && styles['details__item--fullWidth'],
          )}
          icon={<DocumentIcon size={22} />}
          label='Additional notes'
          value={request.additional_info}
        />
      )}
    </dl>
  )
}
