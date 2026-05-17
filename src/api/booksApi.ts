import axiosInstance from '@/api/axiosInstance'
import type { Book, BookFormData } from '@/types/book'

export async function getBooks(): Promise<Book[]> {
  const { data } = await axiosInstance.get<Book[]>('/api/books/')
  return data
}

export async function getBook(id: number): Promise<Book> {
  const { data } = await axiosInstance.get<Book>(`/api/books/${id}/`)
  return data
}

export async function createBook(data: BookFormData): Promise<Book> {
  const { data: book } = await axiosInstance.post<Book>('/api/books/', data)
  return book
}

export async function updateBook(id: number, data: BookFormData): Promise<Book> {
  const { data: book } = await axiosInstance.put<Book>(`/api/books/${id}/`, data)
  return book
}

export async function deleteBook(id: number): Promise<void> {
  await axiosInstance.delete(`/api/books/${id}/`)
}
