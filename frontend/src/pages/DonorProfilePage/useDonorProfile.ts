import {
  type ChangeEvent,
  type FocusEvent,
  type SubmitEvent,
  useEffect,
  useState,
} from 'react'
import { ApiClientError } from '../../api/client'
import {
  fetchDonorProfileRequest,
  updateDonorProfileRequest,
} from '../../api/donorProfileApi'
import { useAppSelector } from '../../app/hooks'
import { useLogout } from '../../features/auth/useLogout'
import { useAutoDismissMessage } from '../../hooks/useAutoDismissMessage'
import { useProfileRouteMessage } from '../../hooks/useProfileRouteMessage'
import type { BloodType, DonorProfileUpdateRequest } from '../../types/api'
import { normalizePhoneNumber } from '../../utils/validation'
import type {
  DonorProfileFormErrors,
  DonorProfileFormValues,
} from './types'
import {
  initialDonorProfileValues,
  isDonorProfileComplete,
  toDonorProfileFormValues,
  validateDonorProfileForm,
} from './validation'

export const useDonorProfile = () => {
  const { handleLogout, isLoggingOut } = useLogout()
  const routeMessage = useProfileRouteMessage()
  const accessToken = useAppSelector(
    (currentState) => currentState.auth.accessToken,
  )
  const [values, setValues] = useState(initialDonorProfileValues)
  const [errors, setErrors] = useState<DonorProfileFormErrors>({})
  const [formError, setFormError] = useState('')
  const [successMessage, setSuccessMessage] = useAutoDismissMessage()
  const [isProfileLoading, setIsProfileLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isEditing, setIsEditing] = useState(true)
  const [hasSavedDonationDate, setHasSavedDonationDate] = useState(false)

  useEffect(() => {
    if (!accessToken) return

    let isActive = true

    fetchDonorProfileRequest(accessToken)
      .then((profile) => {
        if (!isActive) return

        setValues(toDonorProfileFormValues(profile))
        setHasSavedDonationDate(Boolean(profile.last_donation_date))
        setIsEditing(!isDonorProfileComplete(profile))
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
  }, [accessToken])

  const getFieldError = (
    nextValues: DonorProfileFormValues,
    fieldName: keyof DonorProfileFormValues,
  ) => validateDonorProfileForm(nextValues)[fieldName]

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const fieldName = event.target.name as keyof DonorProfileFormValues
    const nextValues = { ...values, [fieldName]: event.target.value }

    setValues(nextValues)
    setErrors((currentErrors) => ({
      ...currentErrors,
      [fieldName]: getFieldError(nextValues, fieldName),
    }))
    setFormError('')
    setSuccessMessage('')
  }

  const handleNeverDonatedChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const hasNeverDonated = event.target.checked

    if (hasNeverDonated && hasSavedDonationDate) return

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

  const handleBlur = (
    event: FocusEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const fieldName = event.target.name as keyof DonorProfileFormValues

    setErrors((currentErrors) => ({
      ...currentErrors,
      [fieldName]: getFieldError(values, fieldName),
    }))
  }

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (isSubmitting || !accessToken) return

    const nextErrors = validateDonorProfileForm(values)
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
      has_never_donated: values.hasNeverDonated,
      phone_number: normalizePhoneNumber(values.phoneNumber) || null,
    }

    setFormError('')
    setSuccessMessage('')
    setIsSubmitting(true)

    try {
      const profile = await updateDonorProfileRequest(payload, accessToken)

      setValues(toDonorProfileFormValues(profile))
      setHasSavedDonationDate(Boolean(profile.last_donation_date))
      setSuccessMessage('Your donor profile has been saved.')
      setIsEditing(false)
    } catch (error) {
      const lastDonationDateError =
        error instanceof ApiClientError
          ? error.fields?.last_donation_date
          : undefined

      if (lastDonationDateError) {
        setErrors((currentErrors) => ({
          ...currentErrors,
          lastDonationDate: lastDonationDateError,
        }))
      }

      setFormError(
        error instanceof ApiClientError
          ? error.message
          : 'We could not save your donor profile. Please try again.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEdit = () => {
    setIsEditing(true)
    setSuccessMessage('')
  }

  return {
    errors,
    formError,
    handleBlur,
    handleChange,
    handleEdit,
    handleLogout,
    handleNeverDonatedChange,
    handleSubmit,
    hasSavedDonationDate,
    isEditing,
    isLoggingOut,
    isProfileLoading,
    isSubmitting,
    routeMessage,
    successMessage,
    values,
  }
}
