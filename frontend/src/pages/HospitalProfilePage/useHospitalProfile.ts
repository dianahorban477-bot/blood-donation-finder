import {
  type ChangeEvent,
  type FocusEvent,
  type SubmitEvent,
  useEffect,
  useState,
} from 'react'
import {
  fetchHospitalProfileRequest,
  updateHospitalProfileRequest,
} from '../../api/hospitalProfileApi'
import { ApiClientError } from '../../api/client'
import { useAppSelector } from '../../app/hooks'
import { useLogout } from '../../features/auth/useLogout'
import { useAutoDismissMessage } from '../../hooks/useAutoDismissMessage'
import { useProfileRouteMessage } from '../../hooks/useProfileRouteMessage'
import type {
  HospitalOrganizationType,
  HospitalProfileResponse,
  HospitalProfileUpdateRequest,
  LicenseUploadResponse,
} from '../../types/api'
import { normalizeEmail } from '../../utils/normalizeEmail'
import { normalizePhoneNumber } from '../../utils/validation'
import type {
  HospitalProfileFormErrors,
  HospitalProfileFormValues,
} from './types'
import {
  initialHospitalProfileValues,
  isHospitalProfileComplete,
  toHospitalProfileFormValues,
  validateHospitalProfileForm,
} from './validation'

export const useHospitalProfile = () => {
  const { handleLogout, isLoggingOut } = useLogout()
  const routeMessage = useProfileRouteMessage()
  const accessToken = useAppSelector(
    (currentState) => currentState.auth.accessToken,
  )
  const [values, setValues] = useState(initialHospitalProfileValues)
  const [errors, setErrors] = useState<HospitalProfileFormErrors>({})
  const [formError, setFormError] = useState('')
  const [successMessage, setSuccessMessage] = useAutoDismissMessage()
  const [verificationStatus, setVerificationStatus] = useState<
    HospitalProfileResponse['verification_status']
  >('pending')
  const [licenseDocumentUrl, setLicenseDocumentUrl] = useState<string | null>(
    null,
  )
  const [rejectionReason, setRejectionReason] = useState<string | null>(null)
  const [isProfileLoading, setIsProfileLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isEditing, setIsEditing] = useState(true)
  const isFormValid =
    Object.keys(validateHospitalProfileForm(values)).length === 0

  useEffect(() => {
    if (!accessToken) return

    let isActive = true

    fetchHospitalProfileRequest(accessToken)
      .then((profile) => {
        if (!isActive) return

        setValues(toHospitalProfileFormValues(profile))
        setVerificationStatus(profile.verification_status)
        setLicenseDocumentUrl(profile.license_document_url)
        setRejectionReason(profile.rejection_reason)
        setIsEditing(!isHospitalProfileComplete(profile))
      })
      .catch((error: unknown) => {
        if (!isActive) return

        setFormError(
          error instanceof ApiClientError
            ? error.message
            : 'We could not load your hospital profile.',
        )
      })
      .finally(() => {
        if (isActive) setIsProfileLoading(false)
      })

    return () => {
      isActive = false
    }
  }, [accessToken])

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const fieldName = event.target.name as keyof HospitalProfileFormValues
    const nextValues = {
      ...values,
      [fieldName]: event.target.value,
      ...(fieldName === 'organizationType' && event.target.value !== 'other'
        ? { organizationTypeOther: '' }
        : {}),
    }

    setValues(nextValues)
    setErrors((currentErrors) => ({
      ...currentErrors,
      [fieldName]: validateHospitalProfileForm(nextValues)[fieldName],
    }))
    setFormError('')
    setSuccessMessage('')
  }

  const handleBlur = (
    event: FocusEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const fieldName = event.target.name as keyof HospitalProfileFormValues

    setErrors((currentErrors) => ({
      ...currentErrors,
      [fieldName]: validateHospitalProfileForm(values)[fieldName],
    }))
  }

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (isSubmitting || !accessToken) return

    const nextErrors = validateHospitalProfileForm(values)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      setFormError('Please review the highlighted fields and try again.')
      return
    }

    const normalizedEmail = normalizeEmail(values.contactEmail)
    const normalizedPhone = normalizePhoneNumber(values.phoneNumber)
    const payload: HospitalProfileUpdateRequest = {
      name: values.name.trim(),
      organization_type: values.organizationType as HospitalOrganizationType,
      organization_type_other:
        values.organizationType === 'other'
          ? values.organizationTypeOther.trim()
          : null,
      address: values.address.trim(),
      representative_name: values.representativeName.trim(),
      contact_info: {
        contact_email: normalizedEmail,
        phone_number: normalizedPhone,
      },
      location: {
        country: values.country.trim(),
        region: values.region.trim(),
        city: values.city.trim(),
      },
    }

    setFormError('')
    setSuccessMessage('')
    setIsSubmitting(true)

    try {
      const profile = await updateHospitalProfileRequest(payload, accessToken)

      setValues(toHospitalProfileFormValues(profile, values))
      setVerificationStatus(profile.verification_status)
      setRejectionReason(profile.rejection_reason)
      setSuccessMessage('Your hospital profile has been saved.')
      setIsEditing(false)
    } catch (error) {
      setFormError(
        error instanceof ApiClientError
          ? error.message
          : 'We could not save your hospital profile. Please try again.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEdit = () => {
    setIsEditing(true)
    setSuccessMessage('')
  }

  const handleLicenseUploadSuccess = (response: LicenseUploadResponse) => {
    setLicenseDocumentUrl(response.license_document_url)
    setVerificationStatus(response.verification_status)
    setRejectionReason(null)
  }

  return {
    accessToken,
    errors,
    formError,
    handleBlur,
    handleChange,
    handleEdit,
    handleLicenseUploadSuccess,
    handleLogout,
    handleSubmit,
    isEditing,
    isFormValid,
    isLoggingOut,
    isProfileLoading,
    isSubmitting,
    licenseDocumentUrl,
    rejectionReason,
    routeMessage,
    successMessage,
    values,
    verificationStatus,
  }
}
