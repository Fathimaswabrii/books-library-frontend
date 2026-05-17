import { useNavigate } from 'react-router-dom'
import { AvailabilityBadge } from '@/components/AvailabilityBadge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { Book } from '@/types/book'

interface BookCardProps {
  book: Book
}

export function BookCard({ book }: BookCardProps) {
  const navigate = useNavigate()

  return (
    <Card
      className="cursor-pointer transition-colors hover:bg-accent/50"
      onClick={() => navigate(`/books/${book.id}`)}
    >
      <CardHeader className="flex flex-row items-start justify-between gap-2 space-y-0 pb-2">
        <CardTitle className="text-lg leading-tight">{book.title}</CardTitle>
        <AvailabilityBadge available={book.availability_status} />
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-sm text-muted-foreground">by {book.author}</p>
        <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
          <span className="rounded-md bg-muted px-2 py-0.5">{book.category}</span>
          <span>{book.published_year}</span>
        </div>
      </CardContent>
    </Card>
  )
}
