import type { ReactNode } from 'react'

interface AppPageLayoutProps {
  title: string
  action?: ReactNode
  children: ReactNode
}

export function AppPageLayout({ title, action, children }: AppPageLayoutProps) {
  return (
    <div className="mx-auto min-h-screen max-w-6xl p-4 md:p-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">{title}</h1>
        {action}
      </div>
      {children}
    </div>
  )
}
