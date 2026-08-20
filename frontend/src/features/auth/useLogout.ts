import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useAppDispatch } from '../../app/hooks'
import { logoutUser } from './authSlice'

export const useLogout = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    setIsLoggingOut(true)
    await dispatch(logoutUser())
    navigate('/sign-in', { replace: true })
  }

  return { handleLogout, isLoggingOut }
}
