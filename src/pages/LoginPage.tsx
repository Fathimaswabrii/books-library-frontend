import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '@/api/authApi'
import { ErrorMessage } from '@/components/ErrorMessage'
import { AuthPageLayout } from '@/components/layouts/AuthPageLayout'
import { Button } from '@/components/ui/button'
import { CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { setToken } from '@/hooks/useAuth'
import { getApiErrorMessage } from '@/lib/apiError'

export default function LoginPage() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const tokens = await loginUser({ username, password })
      setToken(tokens.access)
      navigate('/books')
    } catch (err) {
      setError(getApiErrorMessage(err, 'Login failed. Please check your credentials.'))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthPageLayout
      title="Login"
      description="Sign in to manage your books library"
    >
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {error && <ErrorMessage message={error} />}
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Sign in'}
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{' '}
            <Link to="/register" className="text-primary underline-offset-4 hover:underline">
              Register
            </Link>
          </p>
        </CardFooter>
      </form>
    </AuthPageLayout>
  )
}
