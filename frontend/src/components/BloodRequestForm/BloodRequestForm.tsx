import type { ChangeEvent, FocusEvent, SubmitEvent } from 'react'
import { FeedbackMessage } from '../FeedbackMessage/FeedbackMessage'
import {
  ProfileField,
  ProfileSelectField,
} from '../ProfileField/ProfileField'
import { ProfileLocationFields } from '../ProfileLocationFields/ProfileLocationFields'
import { RequiredFieldsNote } from '../RequiredFieldsNote/RequiredFieldsNote'
import {
  bloodQuantityUnit,
  bloodTypeOptions,
  donationTypeOptions,
  requestQuantityConstraints,
  urgencyOptions,
} from '../../utils/bloodRequest'
import type {
  BloodRequestFormErrors,
  BloodRequestFormValues,
} from './formModel'
import styles from './BloodRequestForm.module.scss'

type FieldElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement

type Props = {
  cancelLabel?: string
  errors: BloodRequestFormErrors
  formError: string
  isSubmitting: boolean
  onCancel?: () => void
  onBlur: (event: FocusEvent<FieldElement>) => void
  onChange: (event: ChangeEvent<FieldElement>) => void
  onSubmit: (event: SubmitEvent<HTMLFormElement>) => void
  submitLabel?: string
  submittingLabel?: string
  values: BloodRequestFormValues
}

export const BloodRequestForm = ({
  cancelLabel = 'Cancel',
  errors,
  formError,
  isSubmitting,
  onCancel,
  onBlur,
  onChange,
  onSubmit,
  submitLabel = 'Create blood request',
  submittingLabel = 'Creating request...',
  values,
}: Props) => (
  <form
    aria-busy={isSubmitting}
    className={styles.form}
    noValidate
    onSubmit={onSubmit}
  >
    <RequiredFieldsNote />

    {formError && <FeedbackMessage message={formError} type='error' />}

    <div className={styles.form__grid}>
      <ProfileSelectField
        error={errors.bloodType}
        id='request-blood-type'
        label='Blood type'
        name='bloodType'
        onBlur={onBlur}
        onChange={onChange}
        value={values.bloodType}
      >
        <option value=''>Select blood type</option>
        {bloodTypeOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </ProfileSelectField>

      <ProfileSelectField
        error={errors.donationType}
        id='request-donation-type'
        label='Donation type'
        name='donationType'
        onBlur={onBlur}
        onChange={onChange}
        value={values.donationType}
      >
        <option value=''>Select donation type</option>
        {donationTypeOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </ProfileSelectField>
    </div>

    <div className={styles.form__grid}>
      <ProfileField
        error={errors.requiredAmount}
        hint='Enter the quantity requested by the hospital.'
        id='request-required-amount'
        inputMode='numeric'
        label={`Required quantity (${bloodQuantityUnit})`}
        max={requestQuantityConstraints.max}
        min={requestQuantityConstraints.min}
        name='requiredAmount'
        onBlur={onBlur}
        onChange={onChange}
        step={requestQuantityConstraints.step}
        type='number'
        value={values.requiredAmount}
      />

      <ProfileSelectField
        error={errors.urgency}
        id='request-urgency'
        label='Urgency level'
        name='urgency'
        onBlur={onBlur}
        onChange={onChange}
        value={values.urgency}
      >
        <option value=''>Select urgency level</option>
        {urgencyOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </ProfileSelectField>
    </div>

    <fieldset className={styles.form__section}>
      <legend className={styles.form__legend}>Hospital location</legend>
      <ProfileLocationFields
        errors={errors}
        onBlur={onBlur}
        onChange={onChange}
        values={values}
      />
    </fieldset>

    <div className={styles.form__field}>
      <label className={styles.form__label} htmlFor='request-additional-notes'>
        Additional notes <span>(optional)</span>
      </label>
      <textarea
        className={styles.form__textarea}
        id='request-additional-notes'
        name='additionalNotes'
        onBlur={onBlur}
        onChange={onChange}
        rows={1}
        value={values.additionalNotes}
      />
    </div>

    <div className={styles.form__actions}>
      {onCancel && (
        <button
          className={styles.form__cancel}
          disabled={isSubmitting}
          onClick={onCancel}
          type='button'
        >
          {cancelLabel}
        </button>
      )}
      <button
        className={styles.form__submit}
        disabled={isSubmitting}
        type='submit'
      >
        {isSubmitting ? submittingLabel : submitLabel}
      </button>
    </div>
  </form>
)
