import { Navigate, useLocation } from 'react-router'
import { useAppSelector } from '../app/hooks'

const profileRoutes = {
  admin: '/admin/profile',
  donor: '/donor/profile',
  hospital: '/hospital/profile',
}

export const ProfileRedirect = () => {
  const { state } = useLocation()
  const user = useAppSelector((state) => state.auth.user)

  if (!user) return <Navigate to='/sign-in' replace />

  return <Navigate to={profileRoutes[user.role]} replace state={state} />
}
