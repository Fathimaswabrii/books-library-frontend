import axios from 'axios'

export function getApiErrorMessage(error: unknown, fallback: string): string {
  if (axios.isAxiosError(error) && error.response?.data) {
    const data = error.response.data
    if (typeof data === 'string') return data
    if (typeof data === 'object' && data !== null) {
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
