import styles from './Footer.module.scss'

export const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <div>
          <p className={styles.footer__brand}>Blood Donation Finder</p>
          <p className={styles.footer__description}>
            Helping donors and trusted medical institutions connect.
          </p>
        </div>
        <nav className={styles.footer__links} aria-label="Footer navigation">
          <a href="#privacy">Privacy Policy</a>
          <a href="#contact">Contact</a>
        </nav>
        <p className={styles.footer__year}>
          © {currentYear} Blood Donation Finder
        </p>
      </div>
    </footer>
  )
}
