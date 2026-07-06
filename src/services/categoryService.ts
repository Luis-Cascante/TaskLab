import { api, ApiError } from './api'
import type { TaskCategory, TaskAgreement } from '../types'

function handleApiError(error: unknown, fallback: string) {
  if (error instanceof ApiError) return { ok: false as const, error: error.message }
  return { ok: false as const, error: fallback }
}

export const categoryService = {
  getCategories: async () => {
    try {
      const data = await api.get<TaskCategory[]>('/categories')          
      return { ok: true as const, categories: data }
    } catch (error) {
      return handleApiError(error, 'No se pudieron cargar las categorías.')
    }
  },
  getAgreements: async () => {
    try {
      const data = await api.get<TaskAgreement[]>('/categories/agreements')  
      return { ok: true as const, agreements: data }
    } catch (error) {
      return handleApiError(error, 'No se pudieron cargar los tipos de contrato.')
    }
  },
}