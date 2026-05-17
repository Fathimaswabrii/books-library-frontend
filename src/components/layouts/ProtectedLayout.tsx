import { Outlet } from 'react-router-dom'
import { Navbar } from '@/components/Navbar'
import { ProtectedRoute } from '@/components/ProtectedRoute'

export function ProtectedLayout() {
  return (
    <ProtectedRoute>
      <Navbar />
      <Outlet />
    </ProtectedRoute>
  )
}
