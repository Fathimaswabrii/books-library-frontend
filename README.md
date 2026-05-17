# Book Library System — Frontend

React + TypeScript frontend for managing a book library. Connects to a Django REST API for authentication and book CRUD.

## Tech stack

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- Axios
- React Router v6

## Prerequisites

- Node.js 18+

## Setup

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

## Environment variables

| Variable | Description |
|----------|-------------|
| `VITE_API_BASE_URL` | Base URL of the Django backend API (e.g. `http://localhost:8000`) |

## Pages

| Route | Description |
|-------|-------------|
| `/login` | Login page |
| `/register` | Register page |
| `/books` | Books list with search |
| `/books/add` | Add new book |
| `/books/:id` | Book detail |
| `/books/:id/edit` | Edit book |

## Backend connection

The frontend expects the Django API at `VITE_API_BASE_URL` (default `http://localhost:8000`).

1. Start the backend from the `backend` folder: `python manage.py runserver`
2. Start the frontend from the `frontend` folder: `npm run dev`


## Production build

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```
