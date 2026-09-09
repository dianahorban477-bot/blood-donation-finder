export const hospitalRequestPaths = {
  profile: '/hospital/profile',
  list: '/hospital/requests',
  create: '/hospital/requests/new',
  detailsPattern: '/hospital/requests/:requestId',
  details: (requestId: number) => `/hospital/requests/${requestId}`,
} as const

export const donorRequestPaths = {
  profile: '/donor/profile',
  list: '/donor/requests',
  detailsPattern: '/donor/requests/:requestId',
  details: (requestId: number) => `/donor/requests/${requestId}`,
} as const
