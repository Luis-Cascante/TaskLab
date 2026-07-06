import { api, ApiError } from './api'
import type {
  BackendTask,
  BackendTaskRaw,
  BackendApplication,
  BackendApplicationWithApplicant,
  BackendApplicationWithTask,
} from '../types'

function handleApiError(error: unknown, fallback: string) {
  if (error instanceof ApiError) return { ok: false as const, error: error.message }
  return { ok: false as const, error: fallback }
}

export const taskService = {
  getAll: async (filters?: { category?: string; agreement?: string }) => {
    const params = new URLSearchParams()
    if (filters?.category) params.set('category', filters.category)
    if (filters?.agreement) params.set('agreement', filters.agreement)
    const qs = params.toString() ? `?${params.toString()}` : ''
    try {

      const data = await api.get<BackendTask[]>(`/tasks${qs}`)
      return { ok: true as const, tasks: data }
    } catch (error) {
      return handleApiError(error, 'No se pudieron cargar las tareas.')
    }
  },

  getById: async (id: string) => {
    try {
      const data = await api.get<BackendTask>(`/tasks/${id}`)
      return { ok: true as const, task: data }
    } catch (error) {
      return handleApiError(error, 'No se pudo cargar la tarea.')
    }
  },

  create: async (formData: FormData) => {
    try {

      const data = await api.postForm<{ message: string; task: BackendTask }>('/tasks', formData)
      return { ok: true as const, task: data.task }
    } catch (error) {
      return handleApiError(error, 'No se pudo crear la tarea.')
    }
  },

  update: async (id: string, formData: FormData) => {
  try {
    const data = await api.patchForm<{ message: string; task: BackendTask }>(`/tasks/${id}`, formData)
    return { ok: true as const, task: data.task }
  } catch (error) {
    return handleApiError(error, 'No se pudo actualizar la tarea.')
  }
},

  delete: async (id: string) => {
    try {
      await api.delete(`/tasks/${id}`)
      return { ok: true as const }
    } catch (error) {
      return handleApiError(error, 'No se pudo eliminar la tarea.')
    }
  },

  apply: async (taskId: string) => {
    try {
      const data = await api.post<{ message: string; application: BackendApplication }>(`/tasks/${taskId}/apply`, {})
      return { ok: true as const, application: data.application }
    } catch (error) {
      return handleApiError(error, 'No se pudo aplicar a la tarea.')
    }
  },

  getMyApplications: async () => {
    try {
      const data = await api.get<BackendApplicationWithTask[]>('/tasks/my-applications')
      return { ok: true as const, applications: data }
    } catch (error) {
      return handleApiError(error, 'No se pudieron cargar tus aplicaciones.')
    }
  },

  getTaskApplications: async (taskId: string) => {
    try {
      const data = await api.get<BackendApplicationWithApplicant[]>(`/tasks/${taskId}/applications`)
      return { ok: true as const, applications: data }
    } catch (error) {
      return handleApiError(error, 'No se pudieron cargar los aplicantes.')
    }
  },

  updateApplicationStatus: async (taskId: string, applicationId: string, status: 'accepted' | 'rejected') => {
    try {
      const data = await api.patch<{ message: string; application: BackendApplication }>(
        `/tasks/${taskId}/applications/${applicationId}`,
        { status }
      )
      return { ok: true as const, application: data.application }
    } catch (error) {
      return handleApiError(error, 'No se pudo actualizar la aplicación.')
    }
  },
}