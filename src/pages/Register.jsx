import React, { useState } from 'react'
import TypeIt from 'typeit-react'
import bgImage from '../assets/login_sale.jpg'
import { jwtDecode } from 'jwt-decode'
import { useDispatch, useSelector } from 'react-redux'
// import { setUser } from "../redux/userSlice";
import { Navigate, useNavigate } from 'react-router-dom'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'
import { FaFacebook, FaApple, FaGoogle } from 'react-icons/fa'

import {
  getAuth,
  signInWithCredential,
  GoogleAuthProvider
} from 'firebase/auth'
import { app } from '../firebaseConfig'
import {
  selectCurrentUser,
  setUser,
  userReducer
} from '../redux/user/userSlice'

const CLIENT_ID =
  '162064755179-5e475s56kn539ntm1fh6ndmgsvu1k8c8.apps.googleusercontent.com'
// ... bên trong component Login()

function Register() {
  const currentUser = useSelector(selectCurrentUser)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  if (currentUser) {
    return <Navigate to='/' replace={true} />
  }
  const from = location.state?.from?.pathname || '/'
  const isPopup = new URLSearchParams(location.search).get('popup') === '1'

  const handleLogin = (e) => {
    e.preventDefault()

    const trimmedEmail = email.trim()
    const trimmedPassword = password.trim()

    if (!trimmedEmail || !trimmedPassword) {
      setErrorMessage('Vui lòng điền đầy đủ thông tin')
      setSuccessMessage('')
      return
    }

    // login(
    // 	{ email: trimmedEmail, password: trimmedPassword },
    // 	{
    // 		onSuccess: async (res) => {
    // 			if (res.success) {
    // 				setIsAuthenticated(true);
    // 				setSuccessMessage('Đăng nhập thành công!');
    // 				setErrorMessage('');

    // 				if (isPopup) {
    // 					const bc = new BroadcastChannel('auth_channel');
    // 					bc.postMessage('logged_in');
    // 					bc.close();
    // 					window.close();
    // 				} else {
    // 					await refetch();
    // 					navigate(from, { replace: true });
    // 				}
    // 			} else {
    // 				setErrorMessage(res.message || 'Đăng nhập thất bại');
    // 				setSuccessMessage('');
    // 			}
    // 		},
    // 		onError: (err) => {
    // 			setErrorMessage(err?.response?.data?.message || 'Lỗi đăng nhập');
    // 			setSuccessMessage('');
    // 		},
    // 	},
    // );
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
      <div className='relative z-10 w-full max-w-md bg-gradient-to-r from-yellow-300 to-yellow-500 p-8 rounded-2xl shadow-2xl mx-4 sm:mx-auto'>
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
        <form className='flex flex-col gap-4'>
          <div>
            <label className='block text-gray-900 mb-1 font-medium'>
              Họ và Tên
            </label>
            <input
              type='text'
              className='w-full px-3 py-2 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-yellow-500 outline-none'
              placeholder='Nhập họ và tên...'
            />
          </div>
          <div>
            <label className='block text-gray-900 mb-1 font-medium'>
              Số điện thoại
            </label>
            <input
              type='text'
              className='w-full px-3 py-2 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-yellow-500 outline-none'
              placeholder='Nhập số điện thoại...'
            />
          </div>
          <div>
            <label className='block text-gray-900 mb-1 font-medium'>
              Mật khẩu
            </label>
            <input
              type='password'
              className='w-full px-3 py-2 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-yellow-500 outline-none'
              placeholder='••••••••'
            />
          </div>
          <button
            type='submit'
            className='mt-2 w-full bg-gray-900 text-yellow-300 font-semibold py-2 rounded-lg hover:bg-gray-800 transition'
          >
            Đăng nhập
          </button>
        </form>

        {/* Divider */}
        <div className='flex items-center my-6 text-gray-800 text-sm'>
          <hr className='flex-grow border-gray-400' />
          <span className='px-2'>Hoặc đăng nhập bằng</span>
          <hr className='flex-grow border-gray-400' />
        </div>

        {/* Social Login */}
        <div className='flex flex-row justify-between gap-3'>
          <button className='flex-1 flex items-center justify-center gap-2 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition h-11'>
            <FaFacebook size={18} />
            <div className=' font-normal text-xl'>Facebook</div>
          </button>
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
        <p className='text-center text-sm text-gray-900 mt-5'>
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
