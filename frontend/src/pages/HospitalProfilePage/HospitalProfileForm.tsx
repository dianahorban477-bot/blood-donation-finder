import type {
  ChangeEvent,
  FocusEvent,
  SubmitEvent,
} from 'react'
import { FeedbackMessage } from '../../components/FeedbackMessage/FeedbackMessage'
import {
  ProfileField,
  ProfileSelectField,
} from '../../components/ProfileField/ProfileField'
import { ProfileLocationFields } from '../../components/ProfileLocationFields/ProfileLocationFields'
import { RequiredFieldsNote } from '../../components/RequiredFieldsNote/RequiredFieldsNote'
import type {
  HospitalProfileFormErrors,
  HospitalProfileFormValues,
} from './types'
import { hospitalOrganizationTypes } from './validation'
import styles from './HospitalProfileForm.module.scss'

type Props = {
  errors: HospitalProfileFormErrors
  formError: string
  isFormValid: boolean
  isSubmitting: boolean
  onBlur: (
    event: FocusEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void
  onChange: (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void
  onSubmit: (event: SubmitEvent<HTMLFormElement>) => void
  values: HospitalProfileFormValues
}

export const HospitalProfileForm = ({
  errors,
  formError,
  isFormValid,
  isSubmitting,
  onBlur,
  onChange,
  onSubmit,
  values,
}: Props) => (
  <form
    className={styles.form}
    onSubmit={onSubmit}
    noValidate
    aria-busy={isSubmitting}
  >
    <RequiredFieldsNote />

    {formError && <FeedbackMessage message={formError} type='error' />}

    <ProfileField
      error={errors.name}
      id='hospital-name'
      label='Hospital name'
      name='name'
      onBlur={onBlur}
      onChange={onChange}
      value={values.name}
    />

    <ProfileSelectField
      error={errors.organizationType}
      id='hospital-organization-type'
      label='Organization type'
      name='organizationType'
      onBlur={onBlur}
      onChange={onChange}
      value={values.organizationType}
    >
      <option value=''>Select organization type</option>
      {hospitalOrganizationTypes.map((organizationType) => (
        <option key={organizationType.value} value={organizationType.value}>
          {organizationType.label}
        </option>
      ))}
    </ProfileSelectField>

    {values.organizationType === 'other' && (
      <ProfileField
        error={errors.organizationTypeOther}
        id='hospital-organization-type-other'
        label='Specify organization type'
        name='organizationTypeOther'
        onBlur={onBlur}
        onChange={onChange}
        value={values.organizationTypeOther}
      />
    )}

    <fieldset className={styles.form__section}>
      <legend className={styles.form__legend}>Location</legend>
      <ProfileLocationFields
        errors={errors}
        onBlur={onBlur}
        onChange={onChange}
        values={values}
      />
      <ProfileField
        error={errors.address}
        id='hospital-address'
        label='Street address'
        name='address'
        onBlur={onBlur}
        onChange={onChange}
        value={values.address}
      />
    </fieldset>

    <fieldset className={styles.form__section}>
      <legend className={styles.form__legend}>Contact information</legend>
      <ProfileField
        autoComplete='name'
        error={errors.representativeName}
        id='hospital-representative-name'
        label='Responsible representative'
        name='representativeName'
        onBlur={onBlur}
        onChange={onChange}
        value={values.representativeName}
      />
      <div className={styles.form__grid}>
        <ProfileField
          autoComplete='email'
          error={errors.contactEmail}
          id='hospital-contact-email'
          label='Contact email'
          name='contactEmail'
          onBlur={onBlur}
          onChange={onChange}
          type='email'
          value={values.contactEmail}
        />
        <ProfileField
          autoComplete='tel'
          error={errors.phoneNumber}
          hint='Use international format, for example +380501234567.'
          id='hospital-phone-number'
          inputMode='tel'
          label='Phone number'
          name='phoneNumber'
          onBlur={onBlur}
          onChange={onChange}
          placeholder='+380501234567'
          type='tel'
          value={values.phoneNumber}
        />
      </div>
    </fieldset>

    <p className={styles.form__notice}>
      A new hospital remains Pending Verification until its information and
      license are reviewed by an administrator.
    </p>

    <button
      className={styles.form__submit}
      disabled={!isFormValid || isSubmitting}
      type='submit'
    >
      {isSubmitting ? 'Saving profile...' : 'Save hospital profile'}
    </button>
  </form>
)
