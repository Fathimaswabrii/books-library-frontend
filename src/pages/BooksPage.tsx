import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getBooks } from '@/api/booksApi'
import { BookCard } from '@/components/BookCard'
import { ErrorMessage } from '@/components/ErrorMessage'
import { AppPageLayout } from '@/components/layouts/AppPageLayout'
import { Spinner } from '@/components/Spinner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { getApiErrorMessage } from '@/lib/apiError'
import type { Book } from '@/types/book'

export default function BooksPage() {
  const navigate = useNavigate()
  const [books, setBooks] = useState<Book[]>([])
  const [search, setSearch] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchBooks() {
      setIsLoading(true)
      setError('')
      try {
        const data = await getBooks()
        setBooks(data)
      } catch (err) {
        setError(getApiErrorMessage(err, 'Failed to load books. Please try again.'))
      } finally {
        setIsLoading(false)
      }
    }

    fetchBooks()
  }, [])

  const filteredBooks = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) return books
    return books.filter(
      (book) =>
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query),
    )
  }, [books, search])

  return (
    <AppPageLayout
      title="Books"
      action={<Button onClick={() => navigate('/books/add')}>Add Book</Button>}
    >
      <div className="mb-6">
        <Input
          type="search"
          placeholder="Search by title or author..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-md"
        />
      </div>

      {isLoading && (
        <div className="flex justify-center py-16">
          <Spinner />
        </div>
      )}

      {!isLoading && error && <ErrorMessage message={error} />}

      {!isLoading && !error && filteredBooks.length === 0 && (
        <p className="py-16 text-center text-muted-foreground">No books found</p>
      )}

      {!isLoading && !error && filteredBooks.length > 0 && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </AppPageLayout>
  )
}
