export function getToken(): string | null {
  return localStorage.getItem('access')
}

export function setToken(access: string): void {
  localStorage.setItem('access', access)
}

export function clearToken(): void {
  localStorage.removeItem('access')
}

export function isAuthenticated(): boolean {
  return !!getToken()
}
