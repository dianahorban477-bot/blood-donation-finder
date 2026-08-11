import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router'
import { Footer } from '../../components/Footer/Footer'
import { Header } from '../../components/Header/Header'
import styles from './PublicLayout.module.scss'

export const PublicLayout = () => {
  const { hash, pathname } = useLocation()

  useEffect(() => {
    if (hash) {
      document.querySelector(hash)?.scrollIntoView({ behavior: 'auto', block: 'start' })
      return
    }

    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [hash, pathname])

  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.layout__main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
