import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export function Navbar() {
  const navigate = useNavigate()

  function handleLogout() {
    localStorage.clear()
    navigate('/login')
  }

  return (
    <header className="border-b border-border bg-background">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-8">
        <h1 className="text-lg font-semibold text-foreground">Book Library</h1>
        <Button variant="outline" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </header>
  )
}
