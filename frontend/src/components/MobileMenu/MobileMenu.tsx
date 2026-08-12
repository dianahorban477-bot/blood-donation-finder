import cn from 'classnames'
import { Link } from 'react-router'
import { useAppSelector } from '../../app/hooks'
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll'
import { CloseIcon } from '../IconsSVG/CloseIcon'
import styles from './MobileMenu.module.scss'

type Props = {
  isOpen: boolean
  onClose: () => void
}

export const MobileMenu = ({ isOpen, onClose }: Props) => {
  useLockBodyScroll(isOpen)
  const isAuthenticated = useAppSelector(
    (state) => state.auth.status === 'authenticated' && Boolean(state.auth.user),
  )

  return (
    <aside
      className={cn(styles.menu, { [styles['menu--open']]: isOpen })}
      id="mobile-navigation"
      role="dialog"
      aria-label="Mobile navigation"
      aria-hidden={!isOpen}
    >
      <div className={styles.menu__header}>
        <Link className={styles.menu__brand} onClick={onClose} to="/">
          Blood Donation Finder
        </Link>
        <button
          className={styles.menu__close}
          onClick={onClose}
          type="button"
          aria-label="Close navigation menu"
        >
          <CloseIcon className={styles.menu__closeIcon} title={null} />
        </button>
      </div>

      <nav className={styles.menu__nav} aria-label="Mobile navigation links">
        <Link className={styles.menu__link} onClick={onClose} to="/">
          Home
        </Link>
        <Link className={styles.menu__link} onClick={onClose} to="/#about-us">
          About us
        </Link>
        <Link className={styles.menu__link} onClick={onClose} to="/#donor-info">
          Donor info
        </Link>
        {isAuthenticated && (
          <Link className={styles.menu__link} onClick={onClose} to="/profile">
            My profile
          </Link>
        )}
      </nav>

      {!isAuthenticated && (
        <div className={styles.menu__action}>
          <Link
            className={styles.menu__register}
            onClick={onClose}
            to="/register/donor"
          >
            Register
          </Link>
        </div>
      )}
    </aside>
  )
}
