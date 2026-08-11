import { useEffect } from 'react'

export const useLockBodyScroll = (shouldLock: boolean) => {
  useEffect(() => {
    if (!shouldLock) return

    document.body.classList.add('no-scroll')

    return () => {
      document.body.classList.remove('no-scroll')
    }
  }, [shouldLock])
}
