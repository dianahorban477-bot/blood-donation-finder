import { Link, useLocation } from 'react-router'
import { useAppSelector } from '../../app/hooks'
import styles from './AccessDeniedPage.module.scss'

type LocationState = {
  reason?: 'inactive' | 'role' | 'unavailable'
}

export const AccessDeniedPage = () => {
  const { state } = useLocation()
  const user = useAppSelector((currentState) => currentState.auth.user)
  const locationState = state as LocationState | null
  const isInactive = locationState?.reason === 'inactive'
  const isUnavailable = locationState?.reason === 'unavailable'

  return (
    <section className={styles.denied} aria-labelledby='access-denied-title'>
      <div className={styles.denied__card}>
        <h1 className={styles.denied__title} id='access-denied-title'>
          Access denied
        </h1>
        <p className={styles.denied__description}>
          {isInactive
            ? 'This account is not active. Please contact platform support if you believe this is an error.'
            : isUnavailable
              ? 'This profile area is not available yet.'
              : 'Your account does not have permission to open this page.'}
        </p>

        <div className={styles.denied__actions}>
          {user && !isInactive && !isUnavailable && (
            <Link className={styles.denied__primary} to='/profile'>
              Go to my profile
            </Link>
          )}
          <Link className={styles.denied__secondary} to='/'>
            Return home
          </Link>
        </div>
      </div>
    </section>
  )
}
