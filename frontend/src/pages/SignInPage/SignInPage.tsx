import {
  type ChangeEvent,
  type FocusEvent,
  type SubmitEvent,
  useState,
} from 'react'
import { Link, useNavigate } from 'react-router'
import { useAppDispatch } from '../../app/hooks'
import { FeedbackMessage } from '../../components/FeedbackMessage/FeedbackMessage'
import { FormField } from '../../components/FormField/FormField'
import { RequiredFieldsNote } from '../../components/RequiredFieldsNote/RequiredFieldsNote'
import {
  loginUser,
  type AuthRejection,
} from '../../features/auth/authSlice'
import { normalizeEmail } from '../../utils/normalizeEmail'
import styles from './SignInPage.module.scss'
import type { SignInFormErrors, SignInFormValues } from './types'

const apiFieldToFormField: Record<string, keyof SignInFormValues> = {
  email: 'email',
  password: 'password',
}

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
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [values, setValues] = useState<SignInFormValues>(initialValues)
  const [errors, setErrors] = useState<SignInFormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState('')
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
  }

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    const fieldName = event.target.name as keyof SignInFormValues

    setErrors((currentErrors) => ({
      ...currentErrors,
      [fieldName]: getFieldError(values, fieldName),
    }))
  }

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (isSubmitting) return

    const nextErrors = validateForm(normalizedValues)

    setValues(normalizedValues)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      setFormError('Please review the highlighted fields and try again.')
      return
    }

    setFormError('')
    setIsSubmitting(true)

    try {
      const result = await dispatch(loginUser(normalizedValues)).unwrap()
      navigate('/profile', {
        replace: true,
        state: { message: `Signed in as ${result.user.email} (${result.user.role}).` },
      })
    } catch (error) {
      const rejection = error as AuthRejection
      const fieldErrors: SignInFormErrors = {}

      for (const [apiField, message] of Object.entries(rejection.fields ?? {})) {
        const formField = apiFieldToFormField[apiField]
        if (formField) fieldErrors[formField] = message
      }

      setValues((currentValues) => ({
        ...currentValues,
        password: '',
      }))
      setErrors((currentErrors) => ({ ...currentErrors, ...fieldErrors }))
      setFormError(rejection.message)
    } finally {
      setIsSubmitting(false)
    }
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
