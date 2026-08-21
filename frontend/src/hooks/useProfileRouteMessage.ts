import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { useAutoDismissMessage } from './useAutoDismissMessage'

type ProfileLocationState = {
  message?: string
}

export const useProfileRouteMessage = () => {
  const navigate = useNavigate()
  const { pathname, state } = useLocation()
  const locationState = state as ProfileLocationState | null
  const [routeMessage] = useAutoDismissMessage(locationState?.message ?? '')

  useEffect(() => {
    if (!locationState?.message) return

    navigate(pathname, { replace: true, state: null })
  }, [locationState?.message, navigate, pathname])

  return routeMessage
}
