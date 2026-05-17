import axios from 'axios'

export function getApiErrorMessage(error: unknown, fallback: string): string {
  if (axios.isAxiosError(error)) {
    if (!error.response) {
      const baseUrl = import.meta.env.VITE_API_BASE_URL ?? 'the API'
      return `Cannot reach the server at ${baseUrl}. Make sure the Django backend is running.`
    }

    const data = error.response.data
    if (typeof data === 'string') return data
    if (typeof data === 'object' && data !== null) {
      if ('detail' in data && typeof data.detail === 'string') {
        return data.detail
      }
      const messages = Object.values(data).flatMap((value) => {
        if (Array.isArray(value)) return value.map(String)
        if (typeof value === 'string') return [value]
        return []
      })
      if (messages.length > 0) return messages.join(' ')
    }
  }
  return fallback
}
