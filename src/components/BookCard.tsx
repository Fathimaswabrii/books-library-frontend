import type { Book } from '@/types/book'

interface BookCardProps {
  book: Book
  onClick: () => void
}

export function BookCard({ book, onClick }: BookCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full flex-col gap-3 rounded-lg border border-border bg-card p-4 text-left shadow-sm transition-colors hover:bg-accent/50"
    >
      <div className="flex items-start justify-between gap-2">
        <h2 className="text-lg font-semibold leading-tight text-foreground">{book.title}</h2>
        <span
          className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${
            book.availability_status
              ? 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300'
              : 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300'
          }`}
        >
          {book.availability_status ? 'Available' : 'Unavailable'}
        </span>
      </div>
      <p className="text-sm text-muted-foreground">by {book.author}</p>
      <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
        <span className="rounded-md bg-muted px-2 py-0.5">{book.category}</span>
        <span>{book.published_year}</span>
      </div>
    </button>
  )
}
