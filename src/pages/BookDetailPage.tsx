import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Edit, Trash2, Calendar, User, BookOpen, Clock } from 'lucide-react'
import { deleteBook, getBook } from '@/api/booksApi'
import { AvailabilityBadge } from '@/components/AvailabilityBadge'
import { ErrorMessage } from '@/components/ErrorMessage'
import { AppPageLayout } from '@/components/layouts/AppPageLayout'
import { Spinner } from '@/components/Spinner'
import { Button } from '@/components/ui/button'
import { getApiErrorMessage } from '@/lib/apiError'
import type { Book } from '@/types/book'

export default function BookDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [book, setBook] = useState<Book | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchBook() {
      if (!id) return
      setIsLoading(true)
      setError('')
      try {
        const data = await getBook(Number(id))
        setBook(data)
      } catch (err) {
        setError(getApiErrorMessage(err, 'Failed to load book.'))
      } finally {
        setIsLoading(false)
      }
    }

    fetchBook()
  }, [id])

  async function handleDelete() {
    if (!id) return
    setIsDeleting(true)
    setError('')
    try {
      await deleteBook(Number(id))
      navigate('/books')
    } catch (err) {
      setError(getApiErrorMessage(err, 'Failed to delete book.'))
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <AppPageLayout title="Book details">
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => navigate('/books')}
          className="flex items-center gap-2 pl-0 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to books
        </Button>
      </div>

      {isLoading && (
        <div className="flex justify-center py-16">
          <Spinner />
        </div>
      )}

      {!isLoading && error && !book && <ErrorMessage message={error} />}

      {!isLoading && book && (
        <div className="max-w-2xl mx-auto">
          {error && <ErrorMessage message={error} />}
          
          {/* Header Card */}
          <div className="bg-card rounded-lg border shadow-sm p-6 mb-6">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-foreground mb-2">{book.title}</h2>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <User className="h-4 w-4" />
                  <span>{book.author}</span>
                </div>
              </div>
              <AvailabilityBadge available={book.availability_status} />
            </div>
          </div>

          {/* Details Card */}
          <div className="bg-card rounded-lg border shadow-sm p-6 mb-6">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Book Information
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-24 text-sm text-muted-foreground">Category</div>
                <div className="flex-1">
                  <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                    {book.category}
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-24 text-sm text-muted-foreground flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  Year
                </div>
                <div className="flex-1 text-foreground">{book.published_year}</div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-24 text-sm text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Added
                </div>
                <div className="flex-1 text-foreground">
                  {new Date(book.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Actions Card */}
          <div className="bg-card rounded-lg border shadow-sm p-6">
            <div className="flex gap-3">
              <Button 
                onClick={() => navigate(`/books/${book.id}/edit`)}
                className="flex items-center gap-2"
              >
                <Edit className="h-4 w-4" />
                Edit Book
              </Button>
              <Button 
                variant="destructive" 
                onClick={handleDelete} 
                disabled={isDeleting}
                className="flex items-center gap-2"
              >
                <Trash2 className="h-4 w-4" />
                {isDeleting ? 'Deleting...' : 'Delete Book'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </AppPageLayout>
  )
}