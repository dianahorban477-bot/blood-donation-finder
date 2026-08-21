import type {
  ChangeEventHandler,
  FocusEventHandler,
} from 'react'
import type {
  ProfileLocationErrors,
  ProfileLocationValues,
} from '../../types/profile'
import { ProfileField } from '../ProfileField/ProfileField'
import styles from './ProfileLocationFields.module.scss'

type Props = {
  errors: ProfileLocationErrors
  onBlur: FocusEventHandler<HTMLInputElement>
  onChange: ChangeEventHandler<HTMLInputElement>
  values: ProfileLocationValues
}

export const ProfileLocationFields = ({
  errors,
  onBlur,
  onChange,
  values,
}: Props) => (
  <div className={styles['location-fields']}>
    <ProfileField
      error={errors.country}
      id='profile-country'
      label='Country'
      name='country'
      onBlur={onBlur}
      onChange={onChange}
      value={values.country}
    />
    <ProfileField
      error={errors.region}
      id='profile-region'
      label='Region'
      name='region'
      onBlur={onBlur}
      onChange={onChange}
      value={values.region}
    />
    <ProfileField
      error={errors.city}
      id='profile-city'
      label='City'
      name='city'
      onBlur={onBlur}
      onChange={onChange}
      value={values.city}
    />
  </div>
)
