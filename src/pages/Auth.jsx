import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import bgImage from '../assets/login_sale.jpg'
import { useAuthStore } from '../stores/useAuthStore'

const Auth = () => {
  const currentUser = useAuthStore((state) => state.user)

  const location = useLocation()
  const isLogin = location.pathname === '/login'
  if (currentUser) {
    return <Navigate to='/' replace={true} />
  }
  return (
    <section
      className='relative flex items-center justify-center min-h-screen bg-cover bg-center'
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Overlay làm tối nền */}
      <div className='absolute inset-0 bg-black/50' />
      {/* Bg khác */}
      {/* <div
        className='absolute inset-0 z-0'
        style={{
          backgroundImage: `
        radial-gradient(125% 125% at 50% 10%, #ffffff 40%, #f59e0b 100%)
      `,
          backgroundSize: '100% 100%'
        }}
      /> */}

      {isLogin ? <Login /> : <Register />}
    </section>
  )
}

export default Auth
