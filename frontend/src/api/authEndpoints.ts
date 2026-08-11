export const authEndpoints = {
  register: '/auth/register',
  login: '/auth/login',
  currentUser: '/users/me',
  refresh: '/auth/refresh',
  logout: '/auth/logout',
} as const
