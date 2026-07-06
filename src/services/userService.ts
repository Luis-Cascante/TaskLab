import { api, ApiError } from './api'
import type { User, ReviewProfile } from '../types'

const UPLOADS_BASE = (import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000/api')
  .replace('/api', '/uploads')

export function getImageUrl(filename: string | null | undefined): string {
  if (!filename) return ''
  if (filename.startsWith('http')) return filename
  return `${UPLOADS_BASE}/${filename}`
}

interface BackendProfile {
  avatar:       string | null
  address:      string | null
  phone:        string | null
  profession:   string | null
  description:  string | null
  titles:       string | null
  availability: boolean | null
  rating:       number | null
}

interface BackendReview {
  id:          string
  worker_id:   string
  reviewer_id: string
  rating:      number
  review:      string
  created_at:  string
  reviewer:    { id: string; name: string }
}

interface BackendUserDetail {
  id:         string
  name:       string
  email:      string
  created_at: string
  updated_at: string
  profile:    BackendProfile | null
  reviews_received: BackendReview[]
}

function mapBackendUserDetail(bu: BackendUserDetail, currentUser: User): User {
  const p = bu.profile

  return {
    ...currentUser,            
    id:             bu.id,
    name:           bu.name,
    email:          bu.email,
    address:        p?.address      ?? '',
    phone:          p?.phone        ?? '',
    profilePicture: getImageUrl(p?.avatar) || currentUser.profilePicture,
    created_at:     new Date(bu.created_at).toLocaleDateString('es-CR', {
                      day: 'numeric', month: 'long', year: 'numeric'
                    }),
    updated_at:     new Date(bu.updated_at).toLocaleDateString('es-CR', {
                      day: 'numeric', month: 'long', year: 'numeric'
                    }),
    workInfo: {
      profession:   p?.profession    ?? '',
      availability: p?.availability  ?? false,
      rating:       p?.rating        ?? 0,
      reviews:      bu.reviews_received?.length ?? 0,
      generalInfo: {
        aboutMe:  p?.description ?? '',
        degrees:  p?.titles      ?? '',
      },
      portfolio:      currentUser.workInfo?.portfolio      ?? [],
      reviewsProfile: (bu.reviews_received ?? []).map(mapBackendReview),
    },
  }
}

function mapBackendReview(r: BackendReview): ReviewProfile {
  return {
    id:     r.id,
    idUser: r.reviewer.id,
    image:  `https://picsum.photos/seed/${encodeURIComponent(r.reviewer.name)}/200/200`,
    name:   r.reviewer.name,
    rating: r.rating,
    review: r.review,
  }
}

export type UserServiceResult<T = void> =
  | { ok: true;  data: T }
  | { ok: false; error: string }

function handleError(error: unknown, fallback: string): { ok: false; error: string } {
  if (error instanceof ApiError) return { ok: false, error: error.message }
  return { ok: false, error: fallback }
}

export const userService = {

  getUserById: async (id: string, currentUser: User): Promise<UserServiceResult<User>> => {
    try {
      const data = await api.get<BackendUserDetail>(`/users/${id}`)
      return { ok: true, data: mapBackendUserDetail(data, currentUser) }
    } catch (error) {
      return handleError(error, 'No se pudo cargar el perfil del usuario.')
    }
  },

  updateUser: async (
    id: string,
    fields: { name?: string; email?: string; password?: string }
  ): Promise<UserServiceResult> => {
    try {
  
      const body = Object.fromEntries(
        Object.entries(fields).filter(([, v]) => v !== undefined && v !== '')
      )
      await api.put(`/users/${id}`, body)
      return { ok: true, data: undefined }
    } catch (error) {
      return handleError(error, 'No se pudo actualizar la información personal.')
    }
  },

  updateProfile: async (
    id: string,
    fields: {
      description?: string
      address?:     string
      phone?:       string
      profession?:  string
      titles?:      string
      availability?:boolean
    },
    avatarFile?: File | null
  ): Promise<UserServiceResult> => {
    try {
      const formData = new FormData()

      if (fields.description  !== undefined) formData.append('description',  fields.description)
      if (fields.address      !== undefined) formData.append('address',      fields.address)
      if (fields.phone        !== undefined) formData.append('phone',        fields.phone)
      if (fields.profession   !== undefined) formData.append('profession',   fields.profession)
      if (fields.titles       !== undefined) formData.append('titles',       fields.titles)
      if (fields.availability !== undefined) formData.append('availability', String(fields.availability))
      if (avatarFile)                        formData.append('avatar',       avatarFile)

      await api.patchForm(`/users/${id}/profile`, formData)
      return { ok: true, data: undefined }
    } catch (error) {
      return handleError(error, 'No se pudo actualizar el perfil profesional.')
    }
  },

  addReview: async (
    workerId: string,
    rating:   number,
    review:   string
  ): Promise<UserServiceResult<ReviewProfile>> => {
    try {
      const data = await api.post<{ review: BackendReview }>(
        `/users/${workerId}/reviews`,
        { rating, review }
      )
      return { ok: true, data: mapBackendReview(data.review) }
    } catch (error) {
      return handleError(error, 'No se pudo agregar la reseña.')
    }
  },

  deleteReview: async (
    workerId: string,
    reviewId: string
  ): Promise<UserServiceResult> => {
    try {
      await api.delete(`/users/${workerId}/reviews/${reviewId}`)
      return { ok: true, data: undefined }
    } catch (error) {
      return handleError(error, 'No se pudo eliminar la reseña.')
    }
  },

  updateUserBasic: async (
    id: string,
    data: { name?: string; email?: string; password?: string }
  ): Promise<UserServiceResult<void>> => {
    try {
      await api.put(`/users/${id}`, data)
      return { ok: true, data: undefined }
    } catch (error) {
      return handleError(error, 'No se pudo actualizar la información de la cuenta.')
    }
  },

  // 2️⃣ Enlaza con la ruta GET /users/vocations
  getAvailableVocations: async (): Promise<UserServiceResult<Array<{ id: string; name: string }>>> => {
    try {
      const data = await api.get<Array<{ id: string; name: string }>>('/users/vocations')
      return { ok: true, data }
    } catch (error) {
      return handleError(error, 'No se pudo cargar la lista de vocaciones desde el servidor.')
    }
  },
}