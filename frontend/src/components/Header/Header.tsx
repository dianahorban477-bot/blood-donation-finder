import cn from 'classnames'
import { useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router'
import { useAppSelector } from '../../app/hooks'
import { BurgerIcon } from '../IconsSVG/BurgerIcon'
import { ProfileIcon } from '../IconsSVG/ProfileIcon'
import { MobileMenu } from '../MobileMenu/MobileMenu'
import styles from './Header.module.scss'

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const isAuthenticated = useAppSelector(
    (state) => state.auth.status === 'authenticated' && Boolean(state.auth.user),
  )

  useEffect(() => {
    const desktopMediaQuery = window.matchMedia('(min-width: 900px)')

    function handleViewportChange(event: MediaQueryListEvent) {
      if (event.matches) setIsMenuOpen(false)
    }

    desktopMediaQuery.addEventListener('change', handleViewportChange)

    return () => desktopMediaQuery.removeEventListener('change', handleViewportChange)
  }, [])

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
          <span className={styles.header__logoMark} aria-hidden="true">+</span>
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
              aria-label="Open my profile"
            >
              <ProfileIcon className={styles.header__profileIcon} />
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
              aria-label="Open my profile"
            >
              <ProfileIcon className={styles.header__profileIcon} />
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
