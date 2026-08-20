import type {
  ProfileLocationErrors,
  ProfileLocationValues,
} from '../types/profile'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const internationalPhonePattern = /^\+[1-9]\d{1,14}$/

export const isValidEmail = (email: string) => emailPattern.test(email)

export const normalizePhoneNumber = (phoneNumber: string) =>
  phoneNumber.replace(/[\s()-]/g, '')

export const isValidInternationalPhoneNumber = (phoneNumber: string) =>
  internationalPhonePattern.test(normalizePhoneNumber(phoneNumber))

export const validateProfileLocation = (
  values: ProfileLocationValues,
): ProfileLocationErrors => {
  const errors: ProfileLocationErrors = {}

  if (!values.country.trim()) errors.country = 'Enter the country.'
  if (!values.region.trim()) errors.region = 'Enter the region.'
  if (!values.city.trim()) errors.city = 'Enter the city.'

  return errors
}
