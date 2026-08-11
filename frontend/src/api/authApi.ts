import { apiRequest } from './client'
import { authEndpoints } from './authEndpoints'
import type {
  AuthResponse,
  CurrentUserResponse,
  LoginRequest,
  RefreshResponse,
  RegisterRequest,
} from '../types/api'

export const registerRequest = (payload: RegisterRequest) =>
  apiRequest<AuthResponse>(authEndpoints.register, { method: 'POST', body: payload })

export const loginRequest = (payload: LoginRequest) =>
  apiRequest<AuthResponse>(authEndpoints.login, { method: 'POST', body: payload })

export const refreshRequest = () =>
  apiRequest<RefreshResponse>(authEndpoints.refresh, { method: 'POST' })

export const logoutRequest = (accessToken: string) =>
  apiRequest<void>(authEndpoints.logout, { method: 'POST', accessToken })

export const fetchCurrentUserRequest = (accessToken: string) =>
  apiRequest<CurrentUserResponse>(authEndpoints.currentUser, { accessToken })
