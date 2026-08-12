import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { logoutUser } from '../../features/auth/authSlice'
import type { UserRole } from '../../types/auth'
import styles from './ProfilePage.module.scss'

type LocationState = {
  message?: string
}

const profileTitles: Record<UserRole, string> = {
  donor: 'Donor profile',
  hospital: 'Hospital profile',
  admin: 'Admin profile',
}

export const ProfilePage = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { state } = useLocation()
  const { status, user } = useAppSelector((currentState) => currentState.auth)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const locationState = state as LocationState | null

  if (status === 'idle' || status === 'loading') {
    return (
      <section className={styles.profile} aria-live="polite">
        <p className={styles.profile__status}>Loading profile...</p>
      </section>
    )
  }

  if (!user) {
    return <Navigate to="/sign-in" replace />
  }

  async function handleLogout() {
    setIsLoggingOut(true)
    await dispatch(logoutUser())
    navigate('/sign-in', { replace: true })
  }

  return (
    <section className={styles.profile} aria-labelledby="profile-title">
      <div className={styles.profile__card}>
        <p className={styles.profile__eyebrow}>Authentication test page</p>
        <h1 className={styles.profile__title} id="profile-title">
          {profileTitles[user.role]}
        </h1>

        {locationState?.message && (
          <p className={styles.profile__message} role="status">
            {locationState.message}
          </p>
        )}

        <dl className={styles.profile__details}>
          <div className={styles.profile__detail}>
            <dt>Email</dt>
            <dd>{user.email}</dd>
          </div>
          <div className={styles.profile__detail}>
            <dt>Role</dt>
            <dd>{user.role}</dd>
          </div>
          {user.role === 'hospital' && (
            <div className={styles.profile__detail}>
              <dt>Verification status</dt>
              <dd>{user.verificationStatus}</dd>
            </div>
          )}
        </dl>

        <button
          className={styles.profile__logout}
          disabled={isLoggingOut}
          onClick={handleLogout}
          type="button"
        >
          {isLoggingOut ? 'Signing out...' : 'Sign out'}
        </button>
      </div>
    </section>
  )
}
