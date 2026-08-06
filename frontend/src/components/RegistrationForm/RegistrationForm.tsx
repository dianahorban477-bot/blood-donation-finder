import cn from 'classnames'
import {
  type ChangeEvent,
  type ChangeEventHandler,
  type ReactNode,
  type SubmitEvent,
  useState,
} from 'react'
import { Link } from 'react-router'
import type { RegistrationRole } from '../../types/auth'
import { normalizeEmail } from '../../utils/normalizeEmail'
import { FormField } from '../FormField/FormField'
import styles from './RegistrationForm.module.scss'

type FormValues = {
  email: string
  password: string
  confirmPassword: string
  authorityConfirmed: boolean
  termsAccepted: boolean
}

type FormErrors = Partial<Record<keyof FormValues, string>>

type Props = {
  role: RegistrationRole
}

type CheckboxProps = {
  checked: boolean
  children: ReactNode
  error?: string
  id: string
  name: string
  onChange: ChangeEventHandler<HTMLInputElement>
}

const initialValues: FormValues = {
  email: '',
  password: '',
  confirmPassword: '',
  authorityConfirmed: false,
  termsAccepted: false,
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validatePassword(password: string) {
  if (!password) return 'Enter a password.'
  if (password.length < 8) return 'Password must contain at least 8 characters.'
  if (!/[a-z]/.test(password)) return 'Add at least one lowercase English letter.'
  if (!/[A-Z]/.test(password)) return 'Add at least one uppercase English letter.'
  if (!/[0-9]/.test(password)) return 'Add at least one number.'

  return ''
}

function validateForm(values: FormValues, role: RegistrationRole): FormErrors {
  const errors: FormErrors = {}

  if (!values.email) {
    errors.email = role === 'hospital' ? 'Enter your work email.' : 'Enter your email.'
  } else if (!emailPattern.test(values.email)) {
    errors.email = 'Enter a valid email address.'
  }

  const passwordError = validatePassword(values.password)
  if (passwordError) errors.password = passwordError

  if (!values.confirmPassword) {
    errors.confirmPassword = 'Confirm your password.'
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match.'
  }

  if (role === 'hospital' && !values.authorityConfirmed) {
    errors.authorityConfirmed = 'Confirm that you are authorized to represent this organization.'
  }

  if (!values.termsAccepted) {
    errors.termsAccepted = 'Accept the Terms and Privacy Policy to continue.'
  }

  return errors
}

export const RegistrationForm = ({ role }: Props) => {
  const isHospital = role === 'hospital'
  const [values, setValues] = useState<FormValues>(initialValues)
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState('')
  const [statusMessage, setStatusMessage] = useState('')

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target

    setValues((currentValues) => ({ ...currentValues, [name]: value }))
    setErrors((currentErrors) => ({ ...currentErrors, [name]: undefined }))
    setFormError('')
    setStatusMessage('')
  }

  function handleCheckboxChange(event: ChangeEvent<HTMLInputElement>) {
    const { checked, name } = event.target

    setValues((currentValues) => ({ ...currentValues, [name]: checked }))
    setErrors((currentErrors) => ({ ...currentErrors, [name]: undefined }))
    setFormError('')
    setStatusMessage('')
  }

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()

    const normalizedValues = {
      ...values,
      email: normalizeEmail(values.email),
    }
    const nextErrors = validateForm(normalizedValues, role)

    setValues(normalizedValues)
    setErrors(nextErrors)
    setStatusMessage('')

    if (Object.keys(nextErrors).length > 0) {
      setFormError('Please review the highlighted fields and try again.')
      return
    }

    setFormError('')
    setIsSubmitting(true)

    window.setTimeout(() => {
      setIsSubmitting(false)
      setStatusMessage(
        'Your details are valid. Registration will become available when the backend is connected.',
      )
    }, 350)
  }

  const otherRolePath = isHospital ? '/register/donor' : '/register/hospital'
  const otherRoleLabel = isHospital ? 'Register as a donor' : 'Register a hospital'

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      {formError && (
        <div
          className={cn(
            styles.form__message,
            styles['form__message--error'],
          )}
          role="alert"
        >
          <strong>We could not validate the form.</strong>
          <span>{formError}</span>
        </div>
      )}

      {statusMessage && (
        <div
          className={cn(
            styles.form__message,
            styles['form__message--success'],
          )}
          role="status"
        >
          <strong>Details checked.</strong>
          <span>{statusMessage}</span>
        </div>
      )}

      <FormField
        autoComplete="email"
        error={errors.email}
        id={`${role}-email`}
        label={isHospital ? 'Work email' : 'Email'}
        name="email"
        onChange={handleInputChange}
        type="email"
        value={values.email}
      />
      <FormField
        autoComplete="new-password"
        error={errors.password}
        hint="At least 8 characters with an uppercase letter, a lowercase letter, and a number. Special characters are allowed."
        id={`${role}-password`}
        label="Password"
        name="password"
        onChange={handleInputChange}
        type="password"
        value={values.password}
      />
      <FormField
        autoComplete="new-password"
        error={errors.confirmPassword}
        id={`${role}-confirm-password`}
        label="Confirm password"
        name="confirmPassword"
        onChange={handleInputChange}
        type="password"
        value={values.confirmPassword}
      />

      {isHospital && (
        <CheckboxField
          checked={values.authorityConfirmed}
          error={errors.authorityConfirmed}
          id="hospital-authority"
          name="authorityConfirmed"
          onChange={handleCheckboxChange}
        >
          I confirm that I am authorized to represent this organization.
        </CheckboxField>
      )}

      <CheckboxField
        checked={values.termsAccepted}
        error={errors.termsAccepted}
        id={`${role}-terms`}
        name="termsAccepted"
        onChange={handleCheckboxChange}
      >
        I accept the <a href="#terms">Terms</a> and <a href="#privacy">Privacy Policy</a>.
      </CheckboxField>

      <button
        className={styles.form__submit}
        disabled={isSubmitting}
        type="submit"
      >
        {isSubmitting
          ? 'Checking details...'
          : isHospital
            ? 'Register hospital'
            : 'Create donor account'}
      </button>

      <div className={styles.form__links}>
        <p>Already have an account? <Link to="/sign-in">Sign in</Link></p>
        <p>Need a different account? <Link to={otherRolePath}>{otherRoleLabel}</Link></p>
      </div>
    </form>
  )
}

const CheckboxField = ({
  checked,
  children,
  error,
  id,
  name,
  onChange,
}: CheckboxProps) => {
  const errorId = `${id}-error`
  const hasError = Boolean(error)

  return (
    <div className={styles.form__checkboxGroup}>
      <label className={styles.form__checkboxLabel} htmlFor={id}>
        <input
          aria-describedby={error ? errorId : undefined}
          aria-invalid={hasError}
          checked={checked}
          className={cn(styles.form__checkbox, {
            [styles['form__checkbox--error']]: hasError,
          })}
          id={id}
          name={name}
          onChange={onChange}
          type="checkbox"
        />
        <span>{children}</span>
      </label>
      {error && (
        <p className={styles.form__checkboxError} id={errorId}>
          ! {error}
        </p>
      )}
    </div>
  )
}
