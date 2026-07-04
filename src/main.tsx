import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from '@tanstack/react-router'
import { AuthProvider } from './context/AuthContext'
import { router } from './router'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
)