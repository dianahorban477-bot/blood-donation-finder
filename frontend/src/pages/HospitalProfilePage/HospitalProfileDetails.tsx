import { HospitalIcon } from '../../components/IconsSVG/HospitalIcon'
import { LocationIcon } from '../../components/IconsSVG/LocationIcon'
import { MailIcon } from '../../components/IconsSVG/MailIcon'
import { PhoneIcon } from '../../components/IconsSVG/PhoneIcon'
import { ProfileIcon } from '../../components/IconsSVG/ProfileIcon'
import { ProfileDetail } from '../../components/ProfileDetail/ProfileDetail'
import { getHospitalOrganizationTypeLabel } from '../../utils/hospitalOrganization'
import type { HospitalProfileFormValues } from './types'
import styles from './HospitalProfileDetails.module.scss'

type Props = {
  values: HospitalProfileFormValues
}

export const HospitalProfileDetails = ({ values }: Props) => (
  <dl className={styles.details}>
    <ProfileDetail
      icon={<HospitalIcon />}
      label='Hospital'
      secondaryValue={getHospitalOrganizationTypeLabel(
        values.organizationType,
        values.organizationTypeOther,
      )}
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
