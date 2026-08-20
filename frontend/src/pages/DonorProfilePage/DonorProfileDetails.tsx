import { BloodDropIcon } from '../../components/IconsSVG/BloodDropIcon'
import { DonationCalendarIcon } from '../../components/IconsSVG/DonationCalendarIcon'
import { LocationIcon } from '../../components/IconsSVG/LocationIcon'
import { PhoneIcon } from '../../components/IconsSVG/PhoneIcon'
import { PlasmaIcon } from '../../components/IconsSVG/PlasmaIcon'
import { ProfileIcon } from '../../components/IconsSVG/ProfileIcon'
import { ProfileDetail } from '../../components/ProfileDetail/ProfileDetail'
import type { DonorProfileFormValues } from './types'
import styles from './DonorProfileDetails.module.scss'

type Props = {
  onEdit: () => void
  values: DonorProfileFormValues
}

export const DonorProfileDetails = ({ onEdit, values }: Props) => (
  <div className={styles.details}>
    <dl className={styles.details__list}>
      <ProfileDetail
        icon={<ProfileIcon />}
        isSeparated
        label='Full name'
        value={values.fullName}
      />
      <ProfileDetail
        icon={<BloodDropIcon />}
        isSeparated
        label='Blood type'
        value={values.bloodType}
      />
      <ProfileDetail
        icon={<LocationIcon />}
        isSeparated
        label='Location'
        value={`${values.city}, ${values.region}, ${values.country}`}
      />
      <ProfileDetail
        icon={<PlasmaIcon />}
        isSeparated
        label='Available for plasma donation'
        value={values.plasmaAvailable === 'true' ? 'Yes' : 'No'}
      />
      <ProfileDetail
        icon={<DonationCalendarIcon />}
        isSeparated
        label='Date of last donation'
        value={
          values.hasNeverDonated
            ? 'No previous donations'
            : values.lastDonationDate
        }
      />
      <ProfileDetail
        icon={<PhoneIcon />}
        isSeparated
        label='Phone number'
        value={values.phoneNumber || 'Not provided'}
      />
    </dl>
    <button className={styles.details__edit} onClick={onEdit} type='button'>
      Edit profile
    </button>
  </div>
)
