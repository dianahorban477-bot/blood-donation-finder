import {
  type ChangeEvent,
  type FocusEvent,
  useCallback,
  useState,
} from 'react'
import {
  type BloodRequestFormErrors,
  type BloodRequestFormValues,
  initialBloodRequestFormValues,
  validateBloodRequestForm,
} from './formModel'

type FieldElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement

export const useBloodRequestForm = () => {
  const [values, setValues] = useState(initialBloodRequestFormValues)
  const [errors, setErrors] = useState<BloodRequestFormErrors>({})
  const [formError, setFormError] = useState('')

  const handleChange = useCallback(
    (event: ChangeEvent<FieldElement>) => {
      const fieldName = event.target.name as keyof BloodRequestFormValues
      const nextValues = { ...values, [fieldName]: event.target.value }

      setValues(nextValues)
      setErrors((currentErrors) => ({
        ...currentErrors,
        [fieldName]: validateBloodRequestForm(nextValues)[fieldName],
      }))
      setFormError('')
    },
    [values],
  )

  const handleBlur = useCallback(
    (event: FocusEvent<FieldElement>) => {
      const fieldName = event.target.name as keyof BloodRequestFormValues

      setErrors((currentErrors) => ({
        ...currentErrors,
        [fieldName]: validateBloodRequestForm(values)[fieldName],
      }))
    },
    [values],
  )

  const resetForm = useCallback((nextValues: BloodRequestFormValues) => {
    setValues(nextValues)
    setErrors({})
    setFormError('')
  }, [])

  const validateForm = useCallback(() => {
    const nextErrors = validateBloodRequestForm(values)

    setErrors(nextErrors)

    return Object.keys(nextErrors).length === 0
  }, [values])

  return {
    errors,
    formError,
    handleBlur,
    handleChange,
    resetForm,
    setFormError,
    setValues,
    validateForm,
    values,
  }
}
