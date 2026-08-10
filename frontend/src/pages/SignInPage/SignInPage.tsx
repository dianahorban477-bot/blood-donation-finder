import cn from 'classnames'
import {
  type ChangeEvent,
  type FocusEvent,
  type SubmitEvent,
  useState,
} from 'react'
import { Link } from 'react-router'
import { FormField } from '../../components/FormField/FormField'
import { normalizeEmail } from '../../utils/normalizeEmail'
import styles from './SignInPage.module.scss'
import type { SignInFormErrors, SignInFormValues } from './types'

const initialValues: SignInFormValues = {
  email: '',
  password: '',
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const validateForm = (values: SignInFormValues): SignInFormErrors => {
  const errors: SignInFormErrors = {}

  if (!values.email) {
    errors.email = 'Enter your email.'
  } else if (!emailPattern.test(values.email)) {
    errors.email = 'Enter a valid email address.'
  }

  if (!values.password) {
    errors.password = 'Enter your password.'
  }

  return errors
}

export const SignInPage = () => {
  const [values, setValues] = useState<SignInFormValues>(initialValues)
  const [errors, setErrors] = useState<SignInFormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState('')
  const [statusMessage, setStatusMessage] = useState('')
  const normalizedValues = {
    ...values,
    email: normalizeEmail(values.email),
  }
  const isFormValid = Object.keys(validateForm(normalizedValues)).length === 0

  const getFieldError = (
    nextValues: SignInFormValues,
    fieldName: keyof SignInFormValues,
  ) => {
    return validateForm({
      ...nextValues,
      email: normalizeEmail(nextValues.email),
    })[fieldName]
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    const fieldName = name as keyof SignInFormValues
    const nextValues = { ...values, [fieldName]: value }

    setValues(nextValues)
    setErrors((currentErrors) => ({
      ...currentErrors,
      [fieldName]: getFieldError(nextValues, fieldName),
    }))
    setFormError('')
    setStatusMessage('')
  }

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    const fieldName = event.target.name as keyof SignInFormValues

    setErrors((currentErrors) => ({
      ...currentErrors,
      [fieldName]: getFieldError(values, fieldName),
    }))
  }

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()

    const nextErrors = validateForm(normalizedValues)

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
      setStatusMessage('Your details are valid')
    }, 350)
  }

  return (
    <section className={styles.page} aria-labelledby="sign-in-title">
      <div className={styles.page__intro}>
        <p className={styles.page__eyebrow}>Welcome back</p>
        <h1 className={styles.page__title} id="sign-in-title">
          Sign in to your account
        </h1>
        <p className={styles.page__description}>
          Access your profile and continue.
        </p>
      </div>

      <div className={styles.page__card}>
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          {formError && (
            <div
              className={cn(styles.form__message, styles['form__message--error'])}
              role="alert"
            >
              {formError}
            </div>
          )}

          {statusMessage && (
            <div
              className={cn(styles.form__message, styles['form__message--status'])}
              role="status"
            >
              {statusMessage}
            </div>
          )}

          <FormField
            autoComplete="email"
            error={errors.email}
            id="sign-in-email"
            label="Email"
            name="email"
            onBlur={handleBlur}
            onChange={handleChange}
            type="email"
            value={values.email}
          />
          <FormField
            autoComplete="current-password"
            error={errors.password}
            id="sign-in-password"
            label="Password"
            name="password"
            onBlur={handleBlur}
            onChange={handleChange}
            type="password"
            value={values.password}
          />

          <button
            className={styles.form__submit}
            disabled={!isFormValid || isSubmitting}
            type="submit"
          >
            {isSubmitting ? 'Checking details...' : 'Sign in'}
          </button>

          <div className={styles.form__links}>
            <p>New to Blood Donation Finder? <Link to="/register/donor">Register as a donor</Link></p>
            <p>Represent a medical institution? <Link to="/register/hospital">Register a hospital</Link></p>
          </div>
        </form>
      </div>
    </section>
  )
}
