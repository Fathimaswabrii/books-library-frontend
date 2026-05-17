import axios from 'axios'
import type { AuthTokens, LoginPayload, RegisterPayload } from '@/types/auth'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

/** Public auth calls — no JWT header (avoids stale token blocking register/login). */
const publicClient = axios.create({
  baseURL: API_BASE_URL,
})

export async function loginUser(payload: LoginPayload): Promise<AuthTokens> {
  const { data } = await publicClient.post<AuthTokens>('/api/auth/login/', payload)
  return data
}

export async function registerUser(payload: RegisterPayload) {
  const { data } = await publicClient.post('/api/auth/register/', payload)
  return data
}
