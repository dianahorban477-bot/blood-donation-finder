import { Navigate, Outlet, useLocation } from 'react-router'
import { useAppSelector } from '../app/hooks'
import { LoadingIndicator } from '../components/LoadingIndicator/LoadingIndicator'
import type { UserRole } from '../types/auth'
import styles from './ProtectedRoute.module.scss'

type Props = {
  allowedRoles?: UserRole[]
  requireVerifiedHospital?: boolean
}

export const ProtectedRoute = ({
  allowedRoles,
  requireVerifiedHospital = false,
}: Props) => {
  const location = useLocation()
  const { status, user } = useAppSelector((state) => state.auth)

  if (status === 'idle' || status === 'loading') {
    return (
      <div className={styles.guard}>
        <LoadingIndicator label='Checking access...' />
      </div>
    )
  }

  if (status !== 'authenticated' || !user) {
    return (
      <Navigate
        to='/sign-in'
        replace
        state={{ from: location.pathname }}
      />
    )
  }

  if (!user.isActive) {
    return (
      <Navigate
        to='/access-denied'
        replace
        state={{ reason: 'inactive' }}
      />
    )
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return (
      <Navigate
        to='/access-denied'
        replace
        state={{ reason: 'role' }}
      />
    )
  }

  if (
    requireVerifiedHospital &&
    (user.role !== 'hospital' || user.verificationStatus !== 'verified')
  ) {
    return (
      <Navigate
        to='/access-denied'
        replace
        state={{ reason: 'verification' }}
      />
    )
  }

  return <Outlet />
}
