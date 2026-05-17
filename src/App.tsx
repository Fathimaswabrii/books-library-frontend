function App() {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? 'not set'

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-8">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground">
        Books Library
      </h1>
      <p className="max-w-md text-center text-muted-foreground">
        Frontend is running. Pages and API integration will be added next.
      </p>
      <p className="rounded-md border border-border bg-muted px-3 py-2 font-mono text-sm text-muted-foreground">
        API: {apiBaseUrl}
      </p>
    </main>
  )
}

export default App
