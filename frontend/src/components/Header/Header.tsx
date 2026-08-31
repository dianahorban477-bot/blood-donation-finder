import cn from 'classnames'
import { useRef, useState } from 'react'
import { Link, NavLink } from 'react-router'
import { useAppSelector } from '../../app/hooks'
import logo from '../../assets/Logo.webp'
import { BurgerIcon } from '../IconsSVG/BurgerIcon'
import { ProfileIcon } from '../IconsSVG/ProfileIcon'
import { MobileMenu } from '../MobileMenu/MobileMenu'
import styles from './Header.module.scss'

const profileLabels = {
  admin: 'Admin',
  donor: 'Donor',
  hospital: 'Hospital',
}

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const { status, user } = useAppSelector(
    (state) => state.auth,
  )
  const isAuthenticated = status === 'authenticated' && Boolean(user)

  function handleOpenMenu() {
    setIsMenuOpen(true)
  }

  function handleCloseMenu() {
    setIsMenuOpen(false)
    window.requestAnimationFrame(() => menuButtonRef.current?.focus())
  }

  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <Link className={styles.header__logo} to="/" aria-label="Blood Donation Finder home">
          <img
            className={styles.header__logoImage}
            src={logo}
            alt=""
            aria-hidden="true"
            width="96"
            height="96"
          />
          <span>Blood Donation Finder</span>
        </Link>
        <nav className={styles.header__nav} aria-label="Main navigation">
          <NavLink
            className={({ isActive }) =>
              cn(styles.header__link, {
                [styles['header__link--active']]: isActive,
              })
            }
            to="/"
          >
            Home
          </NavLink>
          <Link className={styles.header__link} to="/#about-us">
            About us
          </Link>
          <Link className={styles.header__link} to="/#donor-info">
            Donor info
          </Link>
          {isAuthenticated ? (
            <Link
              className={styles.header__profile}
              to="/profile"
              aria-label={user ? `Open ${profileLabels[user.role]}` : 'Open profile'}
            >
              <ProfileIcon className={styles.header__profileIcon} />
              {user && (
                <span className={styles.header__profileLabel}>
                  {profileLabels[user.role]}
                </span>
              )}
            </Link>
          ) : (
            <>
              <Link className={styles.header__link} to="/sign-in">
                Sign in
              </Link>
              <Link className={styles.header__register} to="/register/donor">
                Register
              </Link>
            </>
          )}
        </nav>
        <div className={styles.header__mobileActions}>
          {isAuthenticated ? (
            <Link
              className={styles.header__profile}
              to="/profile"
              aria-label={user ? `Open ${profileLabels[user.role]}` : 'Open profile'}
            >
              <ProfileIcon className={styles.header__profileIcon} />
              {user && (
                <span className={styles.header__profileLabel}>
                  {profileLabels[user.role]}
                </span>
              )}
            </Link>
          ) : (
            <Link className={styles.header__signIn} to="/sign-in">
              Sign in
            </Link>
          )}
          <button
            className={styles.header__menuButton}
            onClick={handleOpenMenu}
            ref={menuButtonRef}
            type="button"
            aria-controls="mobile-navigation"
            aria-expanded={isMenuOpen}
            aria-label="Open navigation menu"
          >
            <BurgerIcon className={styles.header__menuIcon} />
          </button>
        </div>
      </div>
      <MobileMenu isOpen={isMenuOpen} onClose={handleCloseMenu} />
    </header>
  )
}
