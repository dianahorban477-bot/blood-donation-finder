import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import {
  fetchCurrentUserRequest,
  loginRequest,
  logoutRequest,
  refreshRequest,
  registerRequest,
} from '../../api/authApi'
import { ApiClientError } from '../../api/client'
import type {
  ApiErrorCode,
  CurrentUserResponse,
  LoginRequest,
  RegisterRequest,
} from '../../types/api'
import type { AuthUser } from '../../types/auth'

export type AuthRejection = {
  code: ApiErrorCode
  message: string
  fields?: Record<string, string>
}

type AuthState = {
  user: AuthUser | null
  accessToken: string | null
  status: 'idle' | 'loading' | 'authenticated' | 'unauthenticated'
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  status: 'idle',
}

const toAuthUser = (response: CurrentUserResponse): AuthUser => ({
  id: response.id,
  email: response.email,
  role: response.role,
  isActive: response.is_active,
  verificationStatus: response.verification_status,
})

function toRejection(error: unknown): AuthRejection {
  if (error instanceof ApiClientError) {
    return { code: error.code, message: error.message, fields: error.fields }
  }
  return { code: 'INTERNAL_SERVER_ERROR', message: 'Something went wrong.' }
}

async function authenticate(login: () => Promise<{ access_token: string }>) {
  const auth = await login()
  const me = await fetchCurrentUserRequest(auth.access_token)
  return { accessToken: auth.access_token, user: toAuthUser(me) }
}

type AuthPayload = { accessToken: string; user: AuthUser }

export const registerUser = createAsyncThunk(
  'auth/register',
  async (payload: RegisterRequest, { rejectWithValue }) => {
    try {
      return await authenticate(() => registerRequest(payload))
    } catch (error) {
      return rejectWithValue(toRejection(error))
    }
  },
)

export const loginUser = createAsyncThunk(
  'auth/login',
  async (payload: LoginRequest, { rejectWithValue }) => {
    try {
      return await authenticate(() => loginRequest(payload))
    } catch (error) {
      return rejectWithValue(toRejection(error))
    }
  },
)

export const restoreSession = createAsyncThunk(
  'auth/restoreSession',
  async (_: void, { rejectWithValue }) => {
    try {
      return await authenticate(refreshRequest)
    } catch (error) {
      return rejectWithValue(toRejection(error))
    }
  },
)

export const logoutUser = createAsyncThunk('auth/logout', async (_: void, { getState }) => {
  const { auth } = getState() as { auth: AuthState }
  if (auth.accessToken) {
    await logoutRequest(auth.accessToken).catch(() => undefined)
  }
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(restoreSession.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.status = 'unauthenticated'
        state.accessToken = null
        state.user = null
      })
      .addMatcher(
        (action): action is PayloadAction<AuthPayload> =>
          ['auth/register', 'auth/login', 'auth/restoreSession'].some(
            (prefix) => action.type === `${prefix}/fulfilled`,
          ),
        (state, action) => {
          state.status = 'authenticated'
          state.accessToken = action.payload.accessToken
          state.user = action.payload.user
        },
      )
      .addMatcher(
        (action) =>
          ['auth/register', 'auth/login', 'auth/restoreSession'].some(
            (prefix) => action.type === `${prefix}/rejected`,
          ),
        (state) => {
          state.status = 'unauthenticated'
          state.accessToken = null
          state.user = null
        },
      )
  },
})

export const authReducer = authSlice.reducer
