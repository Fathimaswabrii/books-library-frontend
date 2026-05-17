import type { ReactNode } from 'react'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

interface AuthPageLayoutProps {
  title: string
  description: string
  children: ReactNode
}

export function AuthPageLayout({ title, description, children }: AuthPageLayoutProps) {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        {children}
      </Card>
    </div>
  )
}
