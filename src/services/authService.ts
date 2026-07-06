import { api, ApiError } from './api'
import type { User, AuthResult } from '../types'

interface BackendUser {
  id:         string
  name:       string
  email:      string
  cedula:     string
  created_at: string
}

interface AuthResponse {
  message: string
  token:   string
  user:    BackendUser
}

export interface AuthServiceSuccess {
  ok:    true
  token: string
  user:  User
}
export interface AuthServiceFailure {
  ok:    false
  error: string
}

export type AuthServiceResult = AuthServiceSuccess | AuthServiceFailure

function mapBackendUser(backendUser: BackendUser): User {
  return {
    id:                   backendUser.id,
    name:                 backendUser.name,
    email:                backendUser.email,
    identificationNumber: backendUser.cedula,
    address:              '',
    phone:                '',
    password:             '',   
    profilePicture:       `https://picsum.photos/seed/${encodeURIComponent(backendUser.name)}/600/600`,
    created_at:           new Date(backendUser.created_at).toLocaleDateString('es-CR', {
                            day: 'numeric', month: 'long', year: 'numeric'
                          }),
    updated_at:           new Date(backendUser.created_at).toLocaleDateString('es-CR', {
                            day: 'numeric', month: 'long', year: 'numeric'
                          }),

  }
}

function handleApiError(error: unknown, fallback: string): AuthServiceFailure {
  if (error instanceof ApiError) {
    return { ok: false, error: error.message }

  }

  return { ok: false, error: fallback }
}

export const authService = {

  login: async (cedula: string, password: string): Promise<AuthServiceResult> => {
    try {
      const data = await api.post<AuthResponse>('/auth/login', { cedula, password })
      return {
  ok:    true,
  token: data.token,
  user:  mapBackendUser(data.user),
}
    } catch (error) {
      return handleApiError(error, 'No se pudo conectar con el servidor. Intenta de nuevo.')
    }
  },

  register: async (
    nombre: string,
    correo: string,
    cedula: string,
    password: string
  ): Promise<AuthServiceResult> => {
    try {
      const data = await api.post<AuthResponse>('/auth/register', {
        name:     nombre,
        email:    correo,
        cedula,
        password,
      })
      return {
        ok:    true,
        token: data.token,
        user:  mapBackendUser(data.user),
      }
    } catch (error) {
      return handleApiError(error, 'No se pudo crear la cuenta. Intenta de nuevo.')
    }
  },
}
