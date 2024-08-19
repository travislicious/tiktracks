import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.tsx'
import ErrorPage from './ErrorPage.tsx'
import TermsPage from './pages/Terms.tsx'
import DownloadPage from './pages/Download.tsx'
import AboutPage from './pages/About.tsx'
import './index.css'

const router = createBrowserRouter([
  {
  path: '/',
  element: <App />,
  errorElement: <ErrorPage/>
  },
  {
  path: '/terms',
  element: <TermsPage />,
  },
  {
  path: '/about',
  element: <AboutPage />,
  },
  {
  path: '/download/:id',
  element: <DownloadPage />,
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
