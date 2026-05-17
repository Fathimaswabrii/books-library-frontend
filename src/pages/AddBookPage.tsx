import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { createBook } from '@/api/booksApi'
import { BookForm } from '@/components/BookForm'
import { AppPageLayout } from '@/components/layouts/AppPageLayout'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
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
      <div className="mb-4">
        <Button
          variant="ghost"
          onClick={() => navigate('/books')}
          className="flex items-center gap-2 pl-0 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </div>
      <div className="flex justify-center">
        <Card className="w-full max-w-lg">
          <CardContent className="p-6">
            <BookForm
              values={form}
              onChange={setForm}
              onSubmit={handleSubmit}
              error={error}
              isLoading={isLoading}
              submitLabel="Add book"
            />
          </CardContent>
        </Card>
      </div>
    </AppPageLayout>
  )
}
