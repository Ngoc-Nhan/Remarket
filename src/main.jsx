// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { GoogleOAuthProvider } from '@react-oauth/google' // 🟢 thêm dòng này
import { store } from './redux/store'
import App from './App'
import './App.css'
import { Toaster } from 'sonner'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        {/* 🟢 Bọc App trong GoogleOAuthProvider */}
        <GoogleOAuthProvider clientId='YOUR_GOOGLE_CLIENT_ID'>
          <App />
          <Toaster />
        </GoogleOAuthProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
