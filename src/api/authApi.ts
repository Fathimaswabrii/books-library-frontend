import axiosInstance from '@/api/axiosInstance'
import type { AuthTokens, LoginPayload, RegisterPayload } from '@/types/auth'

export async function loginUser(payload: LoginPayload): Promise<AuthTokens> {
  const { data } = await axiosInstance.post<AuthTokens>('/api/auth/login/', payload)
  return data
}

export async function registerUser(payload: RegisterPayload) {
  const { data } = await axiosInstance.post('/api/auth/register/', payload)
  return data
}
