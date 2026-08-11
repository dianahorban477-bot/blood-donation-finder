import { useEffect, useRef } from 'react'
import { useAppDispatch } from './app/hooks'
import { restoreSession } from './features/auth/authSlice'
import { AppRoutes } from './routes/AppRoutes'

export const App = () => {
  const dispatch = useAppDispatch()
  const hasRestoredSession = useRef(false)

  useEffect(() => {
    // Guard against React StrictMode's dev-only double-invoke: refresh tokens are
    // single-use (rotated on every call), so a second concurrent call would 401
    // and could clobber the first call's "authenticated" result.
    if (hasRestoredSession.current) return
    hasRestoredSession.current = true

    // Silently restore the session from the HttpOnly refresh cookie on page load/reload.
    dispatch(restoreSession())
  }, [dispatch])

  return <AppRoutes />
}
