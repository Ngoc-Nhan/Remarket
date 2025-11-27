import React, { useState } from 'react'
import TypeIt from 'typeit-react'
import { jwtDecode } from 'jwt-decode'
import { Navigate, useNavigate } from 'react-router-dom'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'

import {
  getAuth,
  signInWithCredential,
  GoogleAuthProvider
} from 'firebase/auth'
import { app } from '../firebaseConfig'
import { useAuthStore } from '../stores/useAuthStore'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'

const CLIENT_ID =
  '162064755179-5e475s56kn539ntm1fh6ndmgsvu1k8c8.apps.googleusercontent.com'
// ... bên trong component Login()

function Register() {
  const { signUp } = useAuthStore()
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const from = location.state?.from?.pathname || '/'
  const isPopup = new URLSearchParams(location.search).get('popup') === '1'

  const signUpSchema = z.object({
    username: z
      .string()
      .min(1, { message: 'Vui lòng nhập tên người dùng' })
      .max(20, { message: 'Tên người dùng không được quá 20 ký tự' }),
    email: z
      .string()
      .min(1, { message: 'Vui lòng nhập email' })
      .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: 'Email không hợp lệ' }),
    password: z
      .string()
      .min(1, { message: 'Vui lòng nhập mật khẩu' })
      .min(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' })
      .max(20, { message: 'Mật khẩu không được quá 20 ký tự' })
      .regex(/^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d\W]{8,256}$/, {
        message:
          'Mật khẩu phải có ít nhất 1 chữ cái và 1 số, và ít nhất 8 kí tự'
      })
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(signUpSchema)
  })
  const handleRegister = async (data) => {
    const { username, email, password } = data
    await signUp(username, email, password)
    navigate('/login')
  }
  const handleSuccess = async (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential)

    console.log('Thông tin người dùng:', decoded)

    // ✅ Bước 1: Đồng bộ token Google với Firebase

    const auth = getAuth(app)
    const credential = GoogleAuthProvider.credential(
      credentialResponse.credential
    )
    const result = await signInWithCredential(auth, credential) // Đăng nhập Firebase)
    // ✅ Bước 2: Lấy thông tin user từ Firebase
    const firebaseUser = result.user

    // ✅ Bước 3: Cập nhật Redux & localStorage (vẫn giữ như cũ)
    const newUser = {
      name: firebaseUser.displayName,
      email: firebaseUser.email,
      picture: firebaseUser.photoURL
    }

    dispatch(setUser(newUser))
    // localStorage.setItem('user', JSON.stringify(newUser))

    // ✅ Điều hướng
    // navigate('/home')
    if (result) {
      // setIsAuthenticated(true);
      setSuccessMessage('Đăng nhập thành công!')
      setErrorMessage('')

      if (isPopup) {
        // const bc = new BroadcastChannel('auth_channel')
        // bc.postMessage('logged_in')
        // bc.close()
        window.close()
      } else {
        navigate(from, { replace: true })
      }
    } else {
      setErrorMessage(result.message || 'Đăng nhập thất bại')
      setSuccessMessage('')
    }
  }
  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      {/* Form Container */}
      <div className='relative z-10 w-full max-w-lg bg-gradient-to-r from-yellow-300 to-yellow-500 p-8 rounded-2xl shadow-2xl mx-4 sm:mx-auto'>
        {/* Tiêu đề */}
        <h2 className='text-2xl font-bold text-gray-900 mb-6 text-center tracking-wide'>
          <TypeIt
            options={{
              strings: ['LOGIN TO YOUR ACCOUNT'],
              speed: 50,
              waitUntilVisible: true
            }}
          />
        </h2>
        {/* Success message */}
        {successMessage && (
          <div className='bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded'>
            {successMessage}
          </div>
        )}

        {/* Error message */}
        {errorMessage && (
          <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded'>
            {errorMessage}
          </div>
        )}
        {/* Form đăng nhập */}
        <form
          className='flex flex-col gap-4'
          onSubmit={handleSubmit(handleRegister)}
        >
          <div>
            <label className='block text-lg text-gray-900 mb-1 font-medium'>
              Họ và Tên
            </label>
            <input
              type='text'
              className='w-full text-lg px-3 py-2 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-yellow-500 outline-none'
              placeholder='Nhập họ và tên...'
              {...register('username', { required: true })}
            />
            {errors.username && (
              <p className='text-red-400 text-md'>{errors.username.message}</p>
            )}
          </div>
          <div>
            <label className='block text-lg text-gray-900 mb-1 font-medium'>
              Email
            </label>
            <input
              type='text'
              className='w-full text-lg px-3 py-2 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-yellow-500 outline-none'
              placeholder='Nhập email của bạn...'
              {...register('email', { required: true })}
            />
            {errors.email && (
              <p className='text-red-400 text-md'>{errors.email.message}</p>
            )}
          </div>
          <div>
            <label className='block text-lg text-gray-900 mb-1 font-medium'>
              Mật khẩu
            </label>
            <input
              type='password'
              className='w-full text-lg px-3 py-2 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-yellow-500 outline-none'
              placeholder='••••••••'
              {...register('password', { required: true })}
            />
            {errors.password && (
              <p className='text-red-400 text-md'>{errors.password.message}</p>
            )}
          </div>
          <button
            type='submit'
            className='mt-2 text-lg w-full bg-gray-900 text-yellow-300 font-semibold py-2 rounded-lg hover:bg-gray-800 transition'
            disabled={isSubmitting}
          >
            Đăng nhập
          </button>
        </form>

        {/* Divider */}
        <div className='flex items-center my-6 text-gray-800 text-lg'>
          <hr className='flex-grow border-gray-400' />
          <span className='px-2'>Hoặc đăng nhập bằng</span>
          <hr className='flex-grow border-gray-400' />
        </div>

        {/* Social Login */}
        <div className='flex flex-row justify-between gap-3'>
          <div className='flex-1' style={{ transformOrigin: 'center' }}>
            <GoogleLogin
              text={'signin'}
              type={'standard'}
              logo_alignment='center'
              locale='vi'
              size='medium'
              width='100%'
              shape='rectangular'
              onSuccess={handleSuccess}
              onError={() => console.error('Đăng nhập Google thất bại')}
            />
          </div>

          {/* <div className='flex-1 flex justify-center'> */}
          {/* <div className='w-full flex justify-center'></div> */}
          {/* </div> */}

          {/* <button className='flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition h-11'>
              <FaApple size={20} className='flex items-start' />
              <div className='flex-1 font-normal text-xl'>Apple</div>
            </button> */}
        </div>

        {/* Đăng ký */}
        <p className='text-center text-md text-gray-900 mt-5'>
          Đã có tài khoản?{' '}
          <a
            href='/login'
            className='text-blue-800 font-medium hover:underline'
          >
            Đăng nhập ngay
          </a>
        </p>
      </div>
    </GoogleOAuthProvider>
  )
}

export default Register
