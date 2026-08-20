import { HospitalIcon } from '../../components/IconsSVG/HospitalIcon'
import { LocationIcon } from '../../components/IconsSVG/LocationIcon'
import { MailIcon } from '../../components/IconsSVG/MailIcon'
import { PhoneIcon } from '../../components/IconsSVG/PhoneIcon'
import { ProfileIcon } from '../../components/IconsSVG/ProfileIcon'
import { ProfileDetail } from '../../components/ProfileDetail/ProfileDetail'
import type { HospitalProfileFormValues } from './types'
import { getHospitalOrganizationTypeLabel } from './validation'
import styles from './HospitalProfileDetails.module.scss'

type Props = {
  values: HospitalProfileFormValues
}

export const HospitalProfileDetails = ({ values }: Props) => (
  <dl className={styles.details}>
    <ProfileDetail
      icon={<HospitalIcon />}
      label='Hospital'
      secondaryValue={
        values.organizationType === 'other'
          ? values.organizationTypeOther
          : getHospitalOrganizationTypeLabel(values.organizationType)
      }
      value={values.name}
    />
    <ProfileDetail
      icon={<LocationIcon />}
      label='Location'
      secondaryValue={values.address}
      value={`${values.city}, ${values.region}, ${values.country}`}
    />
    <ProfileDetail
      icon={<ProfileIcon />}
      label='Responsible representative'
      value={values.representativeName}
    />
    <ProfileDetail
      icon={<MailIcon />}
      label='Contact email'
      value={values.contactEmail}
    />
    <ProfileDetail
      icon={<PhoneIcon />}
      label='Phone number'
      value={values.phoneNumber}
    />
  </dl>
)
