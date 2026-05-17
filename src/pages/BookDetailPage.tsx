import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
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
      {isLoading && (
        <div className="flex justify-center py-16">
          <Spinner />
        </div>
      )}

      {!isLoading && error && !book && <ErrorMessage message={error} />}

      {!isLoading && book && (
        <div className="max-w-lg space-y-6">
          {error && <ErrorMessage message={error} />}
          <div className="flex items-start justify-between gap-4">
            <h2 className="text-xl font-semibold text-foreground">{book.title}</h2>
            <AvailabilityBadge available={book.availability_status} />
          </div>
          <dl className="space-y-3 text-sm">
            <div>
              <dt className="text-muted-foreground">Author</dt>
              <dd className="text-foreground">{book.author}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Category</dt>
              <dd className="text-foreground">{book.category}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Published year</dt>
              <dd className="text-foreground">{book.published_year}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Created at</dt>
              <dd className="text-foreground">
                {new Date(book.created_at).toLocaleString()}
              </dd>
            </div>
          </dl>
          <div className="flex gap-3">
            <Button onClick={() => navigate(`/books/${book.id}/edit`)}>Edit</Button>
            <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
              {isDeleting ? 'Deleting...' : 'Delete'}
            </Button>
          </div>
        </div>
      )}
    </AppPageLayout>
  )
}
