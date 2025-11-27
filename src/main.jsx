// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google' // 🟢 thêm dòng này=
import App from './App'
import './App.css'
import { Toaster } from 'sonner'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* 🟢 Bọc App trong GoogleOAuthProvider */}
      <GoogleOAuthProvider clientId='YOUR_GOOGLE_CLIENT_ID'>
        <App />
        <Toaster />
      </GoogleOAuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)
