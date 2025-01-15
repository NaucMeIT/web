import { RouterProvider } from '@tanstack/react-router'
import ReactDOM from 'react-dom/client'
import { createRouter } from './router'

const router = createRouter()

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const rootElement = document.getElementById('app')!

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(<RouterProvider router={router} />)
}
