import {
  type SubmitEvent,
  useEffect,
  useState,
} from 'react'
import { useNavigate } from 'react-router'
import { createBloodRequestRequest } from '../../api/bloodRequestsApi'
import { ApiClientError } from '../../api/client'
import { fetchHospitalProfileRequest } from '../../api/hospitalProfileApi'
import { useAppSelector } from '../../app/hooks'
import {
  toBloodRequestPayload,
  withHospitalLocation,
} from '../../components/BloodRequestForm/formModel'
import { useBloodRequestForm } from '../../components/BloodRequestForm/useBloodRequestForm'
import { hospitalRequestPaths } from '../../routes/paths'
import { bloodRequestCreationSuccessMessage } from './constants'

const defaultSubmitError =
  'We could not create the blood request. Please try again.'

export const useCreateBloodRequest = () => {
  const navigate = useNavigate()
  const accessToken = useAppSelector((state) => state.auth.accessToken)
  const {
    errors,
    formError,
    handleBlur,
    handleChange,
    setFormError,
    setValues,
    validateForm,
    values,
  } = useBloodRequestForm()
  const [isInitializing, setIsInitializing] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!accessToken) return

    let isCurrent = true

    fetchHospitalProfileRequest(accessToken)
      .then((profile) => {
        if (!isCurrent) return

        setValues(withHospitalLocation(profile))
      })
      .catch((error: unknown) => {
        if (!isCurrent) return

        setFormError(
          error instanceof ApiClientError
            ? error.message
            : 'We could not load the hospital location.',
        )
      })
      .finally(() => {
        if (isCurrent) {
          setIsInitializing(false)
        }
      })

    return () => {
      isCurrent = false
    }
  }, [accessToken, setFormError, setValues])

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!accessToken || isSubmitting) return

    if (!validateForm()) {
      setFormError('Complete the required fields before submitting.')
      return
    }

    setFormError('')
    setIsSubmitting(true)

    try {
      const request = await createBloodRequestRequest(
        toBloodRequestPayload(values),
        accessToken,
      )

      navigate(hospitalRequestPaths.details(request.id), {
        state: { message: bloodRequestCreationSuccessMessage },
      })
    } catch (error) {
      setFormError(
        error instanceof ApiClientError ? error.message : defaultSubmitError,
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    errors,
    formError,
    handleBlur,
    handleChange,
    handleSubmit,
    isInitializing,
    isSubmitting,
    values,
  }
}
