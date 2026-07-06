const API_ORIGIN = (import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000/api').replace(/\/api\/?$/, '')

export function getTaskImageUrl(filename: string | null): string {
  if (!filename) {
    return 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=400&auto=format&fit=crop'
  }
  return `${API_ORIGIN}/uploads/${filename}`
}