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
  DonorProfileFormErrors,
  DonorProfileFormValues,
} from './types'
import { bloodTypes } from './validation'
import styles from './DonorProfileForm.module.scss'

type Props = {
  errors: DonorProfileFormErrors
  formError: string
  hasSavedDonationDate: boolean
  isSubmitting: boolean
  onBlur: (
    event: FocusEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void
  onChange: (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void
  onNeverDonatedChange: (event: ChangeEvent<HTMLInputElement>) => void
  onSubmit: (event: SubmitEvent<HTMLFormElement>) => void
  values: DonorProfileFormValues
}

export const DonorProfileForm = ({
  errors,
  formError,
  hasSavedDonationDate,
  isSubmitting,
  onBlur,
  onChange,
  onNeverDonatedChange,
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
      error={errors.fullName}
      id='donor-full-name'
      label='Full name'
      name='fullName'
      onBlur={onBlur}
      onChange={onChange}
      value={values.fullName}
    />

    <fieldset className={styles.form__section}>
      <legend className={styles.form__legend}>Location</legend>
      <ProfileLocationFields
        errors={errors}
        onBlur={onBlur}
        onChange={onChange}
        values={values}
      />
    </fieldset>

    <div className={styles.form__grid}>
      <ProfileSelectField
        error={errors.bloodType}
        id='donor-blood-type'
        label='Blood type'
        name='bloodType'
        onBlur={onBlur}
        onChange={onChange}
        value={values.bloodType}
      >
        <option value=''>Select blood type</option>
        {bloodTypes.map((bloodType) => (
          <option key={bloodType} value={bloodType}>
            {bloodType}
          </option>
        ))}
      </ProfileSelectField>

      <ProfileSelectField
        error={errors.plasmaAvailable}
        id='donor-plasma-availability'
        label='Available for plasma donation'
        name='plasmaAvailable'
        onBlur={onBlur}
        onChange={onChange}
        value={values.plasmaAvailable}
      >
        <option value=''>Select an option</option>
        <option value='true'>Yes</option>
        <option value='false'>No</option>
      </ProfileSelectField>
    </div>

    <div className={styles.form__grid}>
      <div className={styles.form__dateField}>
        <ProfileField
          error={errors.lastDonationDate}
          id='donor-last-donation-date'
          label='Date of last donation'
          name='lastDonationDate'
          onBlur={onBlur}
          onChange={onChange}
          disabled={values.hasNeverDonated}
          required={!values.hasNeverDonated}
          type='date'
          value={values.lastDonationDate}
        />
        <label
          className={styles.form__checkbox}
          htmlFor='donor-never-donated'
        >
          <input
            aria-controls='donor-last-donation-date'
            checked={values.hasNeverDonated}
            disabled={hasSavedDonationDate}
            id='donor-never-donated'
            name='hasNeverDonated'
            onChange={onNeverDonatedChange}
            type='checkbox'
          />
          <span>I have never donated blood.</span>
        </label>
      </div>
      <ProfileField
        autoComplete='tel'
        error={errors.phoneNumber}
        hint='Use international format, for example +380501234567.'
        id='donor-phone-number'
        inputMode='tel'
        label='Phone number'
        name='phoneNumber'
        onBlur={onBlur}
        onChange={onChange}
        placeholder='+380501234567'
        required={false}
        type='tel'
        value={values.phoneNumber}
      />
    </div>

    <p className={styles.form__notice}>
      Medical eligibility is determined by qualified medical professionals.
    </p>

    <button
      className={styles.form__submit}
      disabled={isSubmitting}
      type='submit'
    >
      {isSubmitting ? 'Saving profile...' : 'Save donor profile'}
    </button>
  </form>
)
