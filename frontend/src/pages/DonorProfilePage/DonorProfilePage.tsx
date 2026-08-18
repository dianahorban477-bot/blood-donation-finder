import cn from 'classnames'
import {
  type ChangeEvent,
  type FocusEvent,
  type ReactNode,
  type SubmitEvent,
  useEffect,
  useState,
} from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  fetchDonorProfileRequest,
  updateDonorProfileRequest,
} from '../../api/donorProfileApi'
import { ApiClientError } from '../../api/client'
import { FeedbackMessage } from '../../components/FeedbackMessage/FeedbackMessage'
import { LoadingIndicator } from '../../components/LoadingIndicator/LoadingIndicator'
import { RequiredFieldsNote } from '../../components/RequiredFieldsNote/RequiredFieldsNote'
import { ValidationMessage } from '../../components/ValidationMessage/ValidationMessage'
import { logoutUser } from '../../features/auth/authSlice'
import type {
  BloodType,
  DonorProfileResponse,
  DonorProfileUpdateRequest,
} from '../../types/api'
import styles from './DonorProfilePage.module.scss'

const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] as const
const internationalPhonePattern = /^\+[1-9]\d{6,14}$/

function normalizePhoneNumber(phoneNumber: string) {
  return phoneNumber.replace(/[\s()-]/g, '')
}

type FormValues = {
  fullName: string
  country: string
  region: string
  city: string
  bloodType: string
  plasmaAvailable: string
  lastDonationDate: string
  hasNeverDonated: boolean
  phoneNumber: string
}

type FormErrors = Partial<Record<keyof FormValues, string>>

type LocationState = {
  message?: string
}

const initialValues: FormValues = {
  fullName: '',
  country: '',
  region: '',
  city: '',
  bloodType: '',
  plasmaAvailable: '',
  lastDonationDate: '',
  hasNeverDonated: false,
  phoneNumber: '',
}

function toFormValues(profile: DonorProfileResponse): FormValues {
  const hasProfileDetails = Boolean(
    profile.full_name || profile.blood_type || profile.location,
  )

  return {
    fullName: profile.full_name ?? '',
    country: profile.location?.country ?? '',
    region: profile.location?.region ?? '',
    city: profile.location?.city ?? '',
    bloodType: profile.blood_type ?? '',
    plasmaAvailable: hasProfileDetails
      ? String(profile.plasma_available)
      : '',
    lastDonationDate: profile.last_donation_date ?? '',
    hasNeverDonated: hasProfileDetails && !profile.last_donation_date,
    phoneNumber: profile.phone_number ?? '',
  }
}

function isProfileComplete(profile: DonorProfileResponse) {
  return Boolean(
    profile.full_name &&
    profile.blood_type &&
    profile.location?.country &&
    profile.location.region &&
    profile.location.city,
  )
}

function validateForm(values: FormValues): FormErrors {
  const errors: FormErrors = {}

  if (values.fullName.trim().length < 3) {
    errors.fullName = 'Enter your full name using at least 3 characters.'
  }

  if (!values.country.trim()) errors.country = 'Enter your country.'
  if (!values.region.trim()) errors.region = 'Enter your region.'
  if (!values.city.trim()) errors.city = 'Enter your city.'
  if (!values.bloodType) errors.bloodType = 'Select your blood type.'
  if (!values.plasmaAvailable) {
    errors.plasmaAvailable = 'Select whether you are available for plasma donation.'
  }

  if (!values.hasNeverDonated) {
    if (!values.lastDonationDate) {
      errors.lastDonationDate = 'Enter the date of your last donation.'
    } else if (values.lastDonationDate > new Date().toISOString().slice(0, 10)) {
      errors.lastDonationDate = 'The last donation date cannot be in the future.'
    }
  }

  const normalizedPhoneNumber = normalizePhoneNumber(values.phoneNumber)

  if (
    values.phoneNumber.trim() &&
    !internationalPhonePattern.test(normalizedPhoneNumber)
  ) {
    errors.phoneNumber =
      'Enter a valid international phone number, for example +380501234567.'
  }

  return errors
}

export const DonorProfilePage = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { state } = useLocation()
  const { accessToken, status, user } = useAppSelector(
    (currentState) => currentState.auth,
  )
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState<FormErrors>({})
  const [formError, setFormError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [isProfileLoading, setIsProfileLoading] = useState(true)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isEditing, setIsEditing] = useState(true)
  const locationState = state as LocationState | null

  useEffect(() => {
    if (status !== 'authenticated' || user?.role !== 'donor' || !accessToken) {
      return
    }

    let isActive = true

    fetchDonorProfileRequest(accessToken)
      .then((profile) => {
        if (isActive) {
          setValues(toFormValues(profile))
          setIsEditing(!isProfileComplete(profile))
        }
      })
      .catch((error: unknown) => {
        if (!isActive) return
        setFormError(
          error instanceof ApiClientError
            ? error.message
            : 'We could not load your donor profile.',
        )
      })
      .finally(() => {
        if (isActive) setIsProfileLoading(false)
      })

    return () => {
      isActive = false
    }
  }, [accessToken, status, user?.role])

  if (
    status === 'idle' ||
    status === 'loading' ||
    (status === 'authenticated' && user?.role === 'donor' && isProfileLoading)
  ) {
    return (
      <section className={styles.profile}>
        <LoadingIndicator label="Loading donor profile..." />
      </section>
    )
  }

  if (!user) return <Navigate to="/sign-in" replace />
  if (user.role !== 'donor') return <Navigate to="/profile" replace />

  function getFieldError(
    nextValues: FormValues,
    fieldName: keyof FormValues,
  ) {
    return validateForm(nextValues)[fieldName]
  }

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const { name, value } = event.target
    const fieldName = name as keyof FormValues
    const nextValues = { ...values, [fieldName]: value }

    setValues(nextValues)
    setErrors((currentErrors) => ({
      ...currentErrors,
      [fieldName]: getFieldError(nextValues, fieldName),
    }))
    setFormError('')
    setSuccessMessage('')
  }

  function handleNeverDonatedChange(event: ChangeEvent<HTMLInputElement>) {
    const hasNeverDonated = event.target.checked
    const nextValues = {
      ...values,
      hasNeverDonated,
      lastDonationDate: hasNeverDonated ? '' : values.lastDonationDate,
    }

    setValues(nextValues)
    setErrors((currentErrors) => ({
      ...currentErrors,
      lastDonationDate: getFieldError(nextValues, 'lastDonationDate'),
    }))
    setFormError('')
    setSuccessMessage('')
  }

  function handleBlur(
    event: FocusEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const fieldName = event.target.name as keyof FormValues

    setErrors((currentErrors) => ({
      ...currentErrors,
      [fieldName]: getFieldError(values, fieldName),
    }))
  }

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()

    if (isSubmitting || !accessToken) return

    const nextErrors = validateForm(values)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      setFormError('Please review the highlighted fields and try again.')
      setSuccessMessage('')
      return
    }

    const payload: DonorProfileUpdateRequest = {
      full_name: values.fullName.trim(),
      blood_type: values.bloodType as BloodType,
      location: {
        country: values.country.trim(),
        region: values.region.trim(),
        city: values.city.trim(),
      },
      plasma_available: values.plasmaAvailable === 'true',
      last_donation_date: values.hasNeverDonated
        ? null
        : values.lastDonationDate,
      phone_number: normalizePhoneNumber(values.phoneNumber) || null,
    }

    setFormError('')
    setSuccessMessage('')
    setIsSubmitting(true)

    try {
      const profile = await updateDonorProfileRequest(payload, accessToken)
      setValues(toFormValues(profile))
      setSuccessMessage('Your donor profile has been saved.')
      setIsEditing(false)
    } catch (error) {
      setFormError(
        error instanceof ApiClientError
          ? error.message
          : 'We could not save your donor profile. Please try again.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleLogout() {
    setIsLoggingOut(true)
    await dispatch(logoutUser())
    navigate('/sign-in', { replace: true })
  }

  return (
    <section className={styles.profile} aria-labelledby="donor-profile-title">
      <div className={styles.profile__intro}>
        <p className={styles.profile__eyebrow}>Donor profile</p>
        <h1 className={styles.profile__title} id="donor-profile-title">
          {isEditing ? 'Complete your donor profile' : 'Your donor profile'}
        </h1>
        <p className={styles.profile__description}>
          {isEditing
            ? 'Add the information hospitals will use for future donation matching.'
            : 'Review the information connected to your donor account.'}
        </p>
      </div>

      <div className={styles.profile__card}>
        {locationState?.message && (
          <FeedbackMessage message={locationState.message} type="success" />
        )}

        {successMessage && (
          <div className={styles.profile__message}>
            <FeedbackMessage message={successMessage} type="success" />
          </div>
        )}

        {isEditing ? (
          <form
            className={styles.form}
            onSubmit={handleSubmit}
            noValidate
            aria-busy={isSubmitting}
          >
          <RequiredFieldsNote />

          {formError && (
            <FeedbackMessage message={formError} type="error" />
          )}

          <ProfileField
            error={errors.fullName}
            id="donor-full-name"
            label="Full name"
            name="fullName"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.fullName}
          />

          <fieldset className={styles.form__section}>
            <legend className={styles.form__legend}>Location</legend>
            <div className={styles.form__grid}>
              <ProfileField
                error={errors.country}
                id="donor-country"
                label="Country"
                name="country"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.country}
              />
              <ProfileField
                error={errors.region}
                id="donor-region"
                label="Region"
                name="region"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.region}
              />
              <ProfileField
                error={errors.city}
                id="donor-city"
                label="City"
                name="city"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.city}
              />
            </div>
          </fieldset>

          <div className={styles.form__grid}>
            <SelectField
              error={errors.bloodType}
              id="donor-blood-type"
              label="Blood type"
              name="bloodType"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.bloodType}
            >
              <option value="">Select blood type</option>
              {bloodTypes.map((bloodType) => (
                <option key={bloodType} value={bloodType}>
                  {bloodType}
                </option>
              ))}
            </SelectField>

            <SelectField
              error={errors.plasmaAvailable}
              id="donor-plasma-availability"
              label="Available for plasma donation"
              name="plasmaAvailable"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.plasmaAvailable}
            >
              <option value="">Select an option</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </SelectField>
          </div>

          <div className={styles.form__grid}>
            <div className={styles.form__dateField}>
              <ProfileField
                error={errors.lastDonationDate}
                id="donor-last-donation-date"
                label="Date of last donation"
                name="lastDonationDate"
                onBlur={handleBlur}
                onChange={handleChange}
                disabled={values.hasNeverDonated}
                required={!values.hasNeverDonated}
                type="date"
                value={values.lastDonationDate}
              />
              <label className={styles.form__checkbox} htmlFor="donor-never-donated">
                <input
                  aria-controls="donor-last-donation-date"
                  checked={values.hasNeverDonated}
                  id="donor-never-donated"
                  name="hasNeverDonated"
                  onChange={handleNeverDonatedChange}
                  type="checkbox"
                />
                <span>I have never donated blood.</span>
              </label>
            </div>
            <ProfileField
              autoComplete="tel"
              error={errors.phoneNumber}
              hint="Use international format, for example +380501234567."
              id="donor-phone-number"
              inputMode="tel"
              label="Phone number"
              name="phoneNumber"
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder="+380501234567"
              required={false}
              type="tel"
              value={values.phoneNumber}
            />
          </div>

          <p className={styles.form__notice}>
            Medical eligibility is determined by qualified medical professionals.
          </p>

          <button
            className={styles.form__submit}
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting ? 'Saving profile...' : 'Save donor profile'}
          </button>
          </form>
        ) : (
          <div className={styles.details}>
            <dl className={styles.details__list}>
              <ProfileDetail label="Full name" value={values.fullName} />
              <ProfileDetail label="Blood type" value={values.bloodType} />
              <ProfileDetail
                label="Location"
                value={`${values.city}, ${values.region}, ${values.country}`}
              />
              <ProfileDetail
                label="Available for plasma donation"
                value={values.plasmaAvailable === 'true' ? 'Yes' : 'No'}
              />
              <ProfileDetail
                label="Date of last donation"
                value={
                  values.hasNeverDonated
                    ? 'No previous donations'
                    : values.lastDonationDate
                }
              />
              <ProfileDetail
                label="Phone number"
                value={values.phoneNumber || 'Not provided'}
              />
            </dl>
            <button
              className={styles.details__edit}
              onClick={() => {
                setIsEditing(true)
                setSuccessMessage('')
              }}
              type="button"
            >
              Edit profile
            </button>
          </div>
        )}

        <div className={styles.profile__actions}>
          <button
            className={styles.profile__logout}
            disabled={isLoggingOut}
            onClick={handleLogout}
            type="button"
          >
            {isLoggingOut ? 'Signing out...' : 'Sign out'}
          </button>
        </div>
      </div>
    </section>
  )
}

type ProfileDetailProps = {
  label: string
  value: string
}

const ProfileDetail = ({ label, value }: ProfileDetailProps) => (
  <div className={styles.details__item}>
    <dt>{label}</dt>
    <dd>{value}</dd>
  </div>
)

type ProfileFieldProps = {
  autoComplete?: string
  disabled?: boolean
  error?: string
  hint?: string
  id: string
  inputMode?: 'tel'
  label: string
  name: keyof FormValues
  onBlur: (event: FocusEvent<HTMLInputElement>) => void
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  required?: boolean
  type?: 'text' | 'date' | 'tel'
  value: string
}

const ProfileField = ({
  autoComplete,
  disabled = false,
  error,
  hint,
  id,
  inputMode,
  label,
  name,
  onBlur,
  onChange,
  placeholder,
  required = true,
  type = 'text',
  value,
}: ProfileFieldProps) => {
  const errorId = `${id}-error`
  const hintId = `${id}-hint`
  const describedBy = [hint && hintId, error && errorId]
    .filter(Boolean)
    .join(' ') || undefined

  return (
    <div className={styles.field}>
      <label className={styles.field__label} htmlFor={id}>
        {label}
        {required && <span className={styles.field__required}> *</span>}
      </label>
      <input
        aria-describedby={describedBy}
        aria-invalid={Boolean(error)}
        autoComplete={autoComplete}
        className={cn(styles.field__control, {
          [styles['field__control--error']]: Boolean(error),
        })}
        disabled={disabled}
        id={id}
        inputMode={inputMode}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        type={type}
        value={value}
      />
      {hint && (
        <p className={styles.field__hint} id={hintId}>
          {hint}
        </p>
      )}
      {error && <ValidationMessage id={errorId} message={error} />}
    </div>
  )
}

type SelectFieldProps = {
  children: ReactNode
  error?: string
  id: string
  label: string
  name: keyof FormValues
  onBlur: (event: FocusEvent<HTMLSelectElement>) => void
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void
  value: string
}

const SelectField = ({
  children,
  error,
  id,
  label,
  name,
  onBlur,
  onChange,
  value,
}: SelectFieldProps) => {
  const errorId = `${id}-error`

  return (
    <div className={styles.field}>
      <label className={styles.field__label} htmlFor={id}>
        {label}
        <span className={styles.field__required} aria-hidden="true"> *</span>
      </label>
      <select
        aria-describedby={error ? errorId : undefined}
        aria-invalid={Boolean(error)}
        className={cn(styles.field__control, {
          [styles['field__control--error']]: Boolean(error),
        })}
        id={id}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        required
        value={value}
      >
        {children}
      </select>
      {error && <ValidationMessage id={errorId} message={error} />}
    </div>
  )
}
