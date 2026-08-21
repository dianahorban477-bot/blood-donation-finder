export type ProfileLocationValues = {
  country: string
  region: string
  city: string
}

export type ProfileLocationErrors = Partial<
  Record<keyof ProfileLocationValues, string>
>
