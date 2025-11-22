import React from 'react'
import { useLocation } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import bgImage from '../assets/login_sale.jpg'

const Auth = () => {
  const location = useLocation()
  const isLogin = location.pathname === '/login'
  return (
    <section
      className='relative flex items-center justify-center min-h-screen bg-cover bg-center'
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Overlay làm tối nền */}
      <div className='absolute inset-0 bg-black/50' />

      {isLogin ? <Login /> : <Register />}
    </section>
  )
}

export default Auth
