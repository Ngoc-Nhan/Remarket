import React, { useEffect, useState } from 'react'
import Navbar from './Navbar/Navbar'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../stores/useAuthStore'
import { useLocation } from 'react-router-dom'

function Layout() {
  const { accessToken, user, loading, refresh, fetchMe } = useAuthStore()
  const location = useLocation()
  const [starting, setStarting] = useState(true)
  const init = async () => {
    if (!accessToken) {
      await refresh()
    }
    setStarting(false)
  }
  useEffect(() => {
    init()
  }, [])
  if (starting || loading) {
    return (
      <div className='flex h-screen items-center justify-center text-red text-lg '>
        {' '}
        <span className='border-2 border-b-0 animate-spin duration-300 border-amber-800 infinity '></span>{' '}
        Đang tải trang nè...
      </div>
    )
  }
  if (!accessToken && user) {
    return location.pathname != '/' && <Navigate to='/login' replace={true} />
  }
  return (
    <div className='scroll-smooth '>
      <Navbar />
      <Outlet /> {/* render các trang con ở đây */}
    </div>
  )
}

export default Layout
