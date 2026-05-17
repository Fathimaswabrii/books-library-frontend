export interface Book {
  id: number
  title: string
  author: string
  category: string
  published_year: number
  availability_status: boolean
  added_by: number
  created_at: string
}

export interface BookFormData {
  title: string
  author: string
  category: string
  published_year: number
  availability_status: boolean
}
