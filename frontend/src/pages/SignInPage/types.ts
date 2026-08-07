export type SignInFormValues = {
  email: string
  password: string
}

export type SignInFormErrors = Partial<Record<keyof SignInFormValues, string>>
