import { useEffect, useState, type FormEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getBook, updateBook } from '@/api/booksApi'
import { BookForm } from '@/components/BookForm'
import { ErrorMessage } from '@/components/ErrorMessage'
import { AppPageLayout } from '@/components/layouts/AppPageLayout'
import { Spinner } from '@/components/Spinner'
import { getApiErrorMessage } from '@/lib/apiError'
import type { BookFormData } from '@/types/book'

export default function EditBookPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState<BookFormData | null>(null)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(true)

  useEffect(() => {
    async function fetchBook() {
      if (!id) return
      setIsFetching(true)
      setError('')
      try {
        const book = await getBook(Number(id))
        setForm({
          title: book.title,
          author: book.author,
          category: book.category,
          published_year: book.published_year,
          availability_status: book.availability_status,
        })
      } catch (err) {
        setError(getApiErrorMessage(err, 'Failed to load book.'))
      } finally {
        setIsFetching(false)
      }
    }

    fetchBook()
  }, [id])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!id || !form) return
    setError('')
    setIsLoading(true)

    try {
      await updateBook(Number(id), form)
      navigate(`/books/${id}`)
    } catch (err) {
      setError(getApiErrorMessage(err, 'Failed to update book.'))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AppPageLayout title="Edit book">
      {isFetching && (
        <div className="flex justify-center py-16">
          <Spinner />
        </div>
      )}

      {!isFetching && error && !form && <ErrorMessage message={error} />}

      {!isFetching && form && (
        <BookForm
          values={form}
          onChange={setForm}
          onSubmit={handleSubmit}
          error={error}
          isLoading={isLoading}
          submitLabel="Save changes"
        />
      )}
    </AppPageLayout>
  )
}
