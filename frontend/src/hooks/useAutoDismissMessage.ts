import { useEffect, useState } from 'react'

const autoDismissDelay = 6000

export const useAutoDismissMessage = (initialMessage = '') => {
  const [message, setMessage] = useState(initialMessage)

  useEffect(() => {
    if (!message) return

    const timeoutId = window.setTimeout(() => {
      setMessage('')
    }, autoDismissDelay)

    return () => window.clearTimeout(timeoutId)
  }, [message])

  return [message, setMessage] as const
}
