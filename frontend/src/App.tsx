import { useEffect, useRef } from 'react'
import { useAppDispatch } from './app/hooks'
import { restoreSession } from './features/auth/authSlice'
import { AppRoutes } from './routes/AppRoutes'

export const App = () => {
  const dispatch = useAppDispatch()
  const hasRestoredSession = useRef(false)

  useEffect(() => {
    if (hasRestoredSession.current) return
    hasRestoredSession.current = true

    dispatch(restoreSession())
  }, [dispatch])

  return <AppRoutes />
}
