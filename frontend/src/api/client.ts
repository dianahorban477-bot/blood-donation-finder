import type { ApiErrorCode, ApiErrorResponse } from '../types/api'

const API_BASE_URL = (import.meta.env.VITE_API_URL || '/api/v1').replace(/\/$/, '')

export const getApiResourceUrl = (path: string) => {
  if (/^https?:\/\//.test(path)) return path

  const apiUrl = new URL(API_BASE_URL, window.location.origin)
  return new URL(path, apiUrl.origin).toString()
}

export class ApiClientError extends Error {
  code: ApiErrorCode
  fields?: Record<string, string>
  status: number

  constructor(status: number, code: ApiErrorCode, message: string, fields?: Record<string, string>) {
    super(message)
    this.name = 'ApiClientError'
    this.status = status
    this.code = code
    this.fields = fields
  }
}

type RequestOptions = {
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE'
  body?: unknown
  accessToken?: string
}

export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const headers: Record<string, string> = {}
  const isFormData = options.body instanceof FormData

  if (options.body && !isFormData) headers['Content-Type'] = 'application/json'
  if (options.accessToken) headers['Authorization'] = `Bearer ${options.accessToken}`

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: options.method ?? 'GET',
    headers,
    credentials: 'include',
    body: options.body instanceof FormData
      ? options.body
      : options.body
        ? JSON.stringify(options.body)
        : undefined,
  })

  if (response.status === 204) {
    return undefined as T
  }

  const data = await response.json().catch(() => null)

  if (!response.ok) {
    const errorBody = data as ApiErrorResponse | null
    throw new ApiClientError(
      response.status,
      errorBody?.error.code ?? 'INTERNAL_SERVER_ERROR',
      errorBody?.error.message ?? 'Something went wrong.',
      errorBody?.error.fields,
    )
  }

  return data as T
}
