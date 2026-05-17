import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ProtectedLayout } from '@/components/layouts/ProtectedLayout'
import AddBookPage from '@/pages/AddBookPage'
import BookDetailPage from '@/pages/BookDetailPage'
import BooksPage from '@/pages/BooksPage'
import EditBookPage from '@/pages/EditBookPage'
import LoginPage from '@/pages/LoginPage'
import RegisterPage from '@/pages/RegisterPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<ProtectedLayout />}>
          <Route path="/books" element={<BooksPage />} />
          <Route path="/books/add" element={<AddBookPage />} />
          <Route path="/books/:id/edit" element={<EditBookPage />} />
          <Route path="/books/:id" element={<BookDetailPage />} />
        </Route>
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
