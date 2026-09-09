import cn from 'classnames'
import { Link, NavLink, useLocation } from 'react-router'
import { useAppSelector } from '../../app/hooks'
import logo from '../../assets/Logo.webp'
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll'
import { donorRequestPaths, hospitalRequestPaths } from '../../routes/paths'
import { CloseIcon } from '../IconsSVG/CloseIcon'
import styles from './MobileMenu.module.scss'

type Props = {
  isOpen: boolean
  onClose: () => void
}

export const MobileMenu = ({ isOpen, onClose }: Props) => {
  useLockBodyScroll(isOpen)
  const { hash, pathname } = useLocation()
  const { status, user } = useAppSelector(
    (state) => state.auth,
  )
  const isAuthenticated = status === 'authenticated' && Boolean(user)
  const canManageBloodRequests =
    isAuthenticated &&
    user?.role === 'hospital' &&
    user.verificationStatus === 'verified'
  const canBrowseBloodRequests = isAuthenticated && user?.role === 'donor'
  const isProfilePage = pathname.endsWith('/profile')
  const getLinkClass = (isActive: boolean) =>
    cn(styles.menu__link, {
      [styles['menu__link--active']]: isActive,
    })

  return (
    <aside
      className={cn(styles.menu, { [styles['menu--open']]: isOpen })}
      id="mobile-navigation"
      role="dialog"
      aria-label="Mobile navigation"
      aria-hidden={!isOpen}
    >
      <div className={styles.menu__header}>
        <Link
          aria-label="Blood Donation Finder home"
          className={styles.menu__brand}
          onClick={onClose}
          to="/"
        >
          <img
            alt=""
            aria-hidden="true"
            className={styles.menu__logo}
            height="96"
            src={logo}
            width="96"
          />
          <span>Blood Donation Finder</span>
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
        <NavLink
          className={() => getLinkClass(pathname === '/' && !hash)}
          end
          onClick={onClose}
          to="/"
        >
          Home
        </NavLink>
        <Link
          aria-current={pathname === '/' && hash === '#about-us' ? 'page' : undefined}
          className={getLinkClass(pathname === '/' && hash === '#about-us')}
          onClick={onClose}
          to="/#about-us"
        >
          About us
        </Link>
        <Link
          aria-current={pathname === '/' && hash === '#donor-info' ? 'page' : undefined}
          className={getLinkClass(pathname === '/' && hash === '#donor-info')}
          onClick={onClose}
          to="/#donor-info"
        >
          Donor info
        </Link>
        {isAuthenticated && user && (
          <Link
            aria-current={isProfilePage ? 'page' : undefined}
            className={getLinkClass(isProfilePage)}
            onClick={onClose}
            to="/profile"
          >
            My profile
          </Link>
        )}
        {canManageBloodRequests && (
          <NavLink
            className={({ isActive }) => getLinkClass(isActive)}
            onClick={onClose}
            to={hospitalRequestPaths.list}
          >
            My requests
          </NavLink>
        )}
        {canBrowseBloodRequests && (
          <NavLink
            className={({ isActive }) => getLinkClass(isActive)}
            onClick={onClose}
            to={donorRequestPaths.list}
          >
            Blood requests
          </NavLink>
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
