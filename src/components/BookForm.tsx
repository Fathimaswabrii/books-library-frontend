import type { FormEvent } from 'react'
import { ErrorMessage } from '@/components/ErrorMessage'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { BookFormData } from '@/types/book'

interface BookFormProps {
  values: BookFormData
  onChange: (values: BookFormData) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  error: string
  isLoading: boolean
  submitLabel: string
}

export function BookForm({
  values,
  onChange,
  onSubmit,
  error,
  isLoading,
  submitLabel,
}: BookFormProps) {
  function updateField<K extends keyof BookFormData>(key: K, value: BookFormData[K]) {
    onChange({ ...values, [key]: value })
  }

  return (
    <form onSubmit={onSubmit} className="max-w-md space-y-4">
      {error && <ErrorMessage message={error} />}
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={values.title}
          onChange={(e) => updateField('title', e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="author">Author</Label>
        <Input
          id="author"
          value={values.author}
          onChange={(e) => updateField('author', e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Input
          id="category"
          value={values.category}
          onChange={(e) => updateField('category', e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="published_year">Published year</Label>
        <Input
          id="published_year"
          type="number"
          value={values.published_year || ''}
          onChange={(e) => updateField('published_year', Number(e.target.value))}
          required
        />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox
          id="availability_status"
          checked={values.availability_status}
          onCheckedChange={(checked) => updateField('availability_status', checked === true)}
        />
        <Label htmlFor="availability_status">Available</Label>
      </div>
      <Button type="submit" size="sm" className="w-auto" disabled={isLoading}>
        {isLoading ? 'Saving...' : submitLabel}
      </Button>
    </form>
  )
}
