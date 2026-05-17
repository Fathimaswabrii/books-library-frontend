import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { createBook } from '@/api/booksApi'
import { BookForm } from '@/components/BookForm'
import { AppPageLayout } from '@/components/layouts/AppPageLayout'
import { getApiErrorMessage } from '@/lib/apiError'
import type { BookFormData } from '@/types/book'

const emptyForm: BookFormData = {
  title: '',
  author: '',
  category: '',
  published_year: new Date().getFullYear(),
  availability_status: true,
}

export default function AddBookPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState<BookFormData>(emptyForm)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      await createBook(form)
      navigate('/books')
    } catch (err) {
      setError(getApiErrorMessage(err, 'Failed to create book.'))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AppPageLayout title="Add book">
      <BookForm
        values={form}
        onChange={setForm}
        onSubmit={handleSubmit}
        error={error}
        isLoading={isLoading}
        submitLabel="Add book"
      />
    </AppPageLayout>
  )
}
