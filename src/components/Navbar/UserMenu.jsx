import React from 'react'
import { ChevronDown } from 'lucide-react'
import { getAuth, signOut } from 'firebase/auth'
import { app } from '../../firebaseConfig'
import { useAuthStore } from '../../stores/useAuthStore'
import { useNavigate } from 'react-router-dom'

export default function UserMenu() {
  const { user, signOut } = useAuthStore()
  const navigate = useNavigate()
  const handleLoginClick = () => {
    navigate('/login')
  }
  // const handleLoginClick = () => {
  //   const width = 420
  //   const height = 680

  //   const dualScreenLeft =
  //     window.screenLeft !== undefined ? window.screenLeft : window.screenX
  //   const dualScreenTop =
  //     window.screenTop !== undefined ? window.screenTop : window.screenY

  //   const screenWidth =
  //     window.innerWidth || document.documentElement.clientWidth || screen.width
  //   const screenHeight =
  //     window.innerHeight ||
  //     document.documentElement.clientHeight ||
  //     screen.height

  //   const left = Math.round(dualScreenLeft + (screenWidth - width) / 2)
  //   const top = Math.round(dualScreenTop + (screenHeight - height) / 2)

  //   window.open(
  //     '/login?popup=1',
  //     '_blank',
  //     `noopener,noreferrer,toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=${width},height=${height},left=${left},top=${top}`
  //   )
  // }
  console.log(user)

  const handleLogout = async () => {
    await signOut()
    // dispatch(logout())
    // navigate('/login')
  }
  return (
    <div className='flex items-center gap-2 ml-3'>
      {user ? (
        <>
          <button
            className='hidden md:inline-flex btn btn-lg text-sm rounded-full bg-white text-black mx-1'
            onClick={() => navigate('/ManagePost')}
          >
            Quản lý tin
          </button>
          <button
            className='btn btn-lg border-0 rounded-full text-sm bg-black text-white mx-1 px-3 sm:px-4'
            onClick={() => {
              if (!user) {
                alert('Vui lòng đăng nhập để tiếp tục')
                navigate('/login')
              } else navigate('/PostNews')
            }}
          >
            <span className='hidden sm:inline'>Đăng tin</span>
            <span className='sm:hidden'>Đăng</span>
          </button>

          <div className='dropdown dropdown-end'>
            <div
              tabIndex={0}
              role='button'
              className='btn btn-lg m-1 justify-center px-1 md:pl-1 items-center gap-2 rounded-full text-xl'
            >
              <img
                alt='User Avatar'
                class='rounded-full w-10 h-10 object-cover border-2 border-[#e6d9c8]'
                referrerpolicy='no-referrer'
                src={
                  user?.avatar ||
                  user?.picture ||
                  'https://i.pinimg.com/736x/7d/0c/6b/7d0c6bc79cfa39153751c56433141483.jpg'
                }
              />
              <ChevronDown className='hidden md:block w-5 h-5' />
            </div>

            <div className='dropdown-content  z-50'>
              <ul className='menu bg-base-100 rounded-box w-52 p-2 shadow-sm'>
                <li>
                  <button
                    className='btn btn-md'
                    onClick={() => navigate('/profile')}
                  >
                    Trang cá nhân
                  </button>
                </li>
                <li>
                  <button>Cài đặt</button>
                </li>
                <li>
                  <button onClick={handleLogout} className='w-full text-left'>
                    Đăng xuất
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </>
      ) : (
        <>
          <button
            className=' md:inline-flex btn btn-md text-sm rounded-full mx-1'
            onClick={handleLoginClick}
          >
            Đăng nhập
          </button>
          <button
            className='btn hidden md:inline border-0 btn-lg rounded-full text-sm bg-black text-white mx-1 px-3 sm:px-4'
            onClick={() => navigate('/PostNews')}
          >
            Đăng tin
          </button>
        </>
      )}
    </div>
  )
}
