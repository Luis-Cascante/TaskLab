import { TOKEN_KEY } from './authStorage'
const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000/api'

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem(TOKEN_KEY)

  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string>),
  }

  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json'
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => null)
    const message = errorData?.message ?? `Error ${response.status}`
    throw new ApiError(response.status, message)
  }

  if (response.status === 204) return undefined as T

  return response.json() as Promise<T>
}

export const api = {
  get:        <T>(endpoint: string)                        => apiFetch<T>(endpoint),
  post:       <T>(endpoint: string, body: unknown)         => apiFetch<T>(endpoint, { method: 'POST',   body: JSON.stringify(body) }),
  postForm:   <T>(endpoint: string, body: FormData)        => apiFetch<T>(endpoint, { method: 'POST',   body }),
  put:        <T>(endpoint: string, body: unknown)         => apiFetch<T>(endpoint, { method: 'PUT',    body: JSON.stringify(body) }),
  patch:      <T>(endpoint: string, body: unknown)         => apiFetch<T>(endpoint, { method: 'PATCH',  body: JSON.stringify(body) }),
  patchForm:  <T>(endpoint: string, body: FormData)        => apiFetch<T>(endpoint, { method: 'PATCH',  body }),
  delete:     <T>(endpoint: string)                        => apiFetch<T>(endpoint, { method: 'DELETE' }),
}
