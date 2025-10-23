import React from 'react'

import { useNavigate } from 'react-router-dom'
import { ChevronDown, MapPin } from 'lucide-react'
import { useSelector } from 'react-redux'
import { logout } from '../redux/userSlice'
import logo from '../assets/logo.png'
import DanhMuc from '../pages/DanhMuc'
import { provinces } from '../constant/constant'
import { useDispatch } from 'react-redux'

export default function Navbar({ searchTerm, setSearchTerm }) {
  const user = useSelector((state) => state.user.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  return (
    <div className='navbar h-25 top-0 fixed w-full z-50  bg-base-100 shadow-sm gap-2 justify-center mx-auto'>
      <div className='flex-none'>
        <button className='btn btn-square p-5 btn-ghost'>
          <details className='dropdown '>
            <summary className='btn  bg-base-100 border-none hover:bg-gray-300  '>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                className=' inline-block h-7 w-7  stroke-current '
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M4 6h16M4 12h16M4 18h16'
                ></path>
              </svg>
            </summary>

            <ul className='menu dropdown-content  bg-base-100 rounded-box z-1 w-70 p-2 shadow-sm'>
              <DanhMuc />
            </ul>
          </details>
        </button>
      </div>
      <div>
        <a className='btn btn-ghost text-xl'>
          <img src={logo} className='w-20' alt='logo' />
        </a>
      </div>

      {/* Dropdown chọn khu vực */}
      <div className='dropdown'>
        <div
          tabIndex={0}
          role='button'
          className='btn m-1 justify-center border-none items-center gap-2 rounded-full'
        >
          <MapPin className='w-7 h-7 text-yellow-400' />
          Chọn khu vực
          <ChevronDown className='w-7 h-7' />
        </div>
        <ul
          tabIndex={0}
          className='dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm max-h-64 overflow-y-auto grid grid-flow-row'
        >
          {provinces.map((province, index) => (
            <li key={index}>
              <a>{province}</a>
            </li>
          ))}
        </ul>
      </div>

      {/* Ô tìm kiếm */}
      <label className='input input-bordered rounded-full max-w-3xl flex-1'>
        <svg
          className='h-[1em] opacity-50'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
        >
          <g
            strokeLinejoin='round'
            strokeLinecap='round'
            strokeWidth='2.5'
            fill='none'
            stroke='currentColor'
          >
            <circle cx='11' cy='11' r='8'></circle>
            <path d='m21 21-4.3-4.3'></path>
          </g>
        </svg>
        <input
          type='search'
          required
          placeholder='Tìm sản phẩm...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {/* <ul>
                        {filteredProducts.map((item) => (
                            <li key={item.id}>{item.category}</li>
                        ))}
                    </ul> */}
      </label>

      {/* Icon */}
      <div className='flex gap-2 text-xl'>
        <i className='fa-regular fa-heart'></i>
        <i className='fa-regular fa-comment'></i>
        <i className='fa-regular fa-bell'></i>
      </div>

      {/* Khu vực tài khoản */}
      <div className='flex items-center gap-2 ml-3'>
        {user ? (
          // Nếu đã đăng nhập, hiện avatar + dropdown và button "Đăng tin"
          <>
            <button
              className='btn btn-sm rounded-full bg-green-300 mx-1'
              onClick={() => navigate('/ManagePost')}
            >
              Quản lý tin
            </button>
            <button
              className='btn btn-sm rounded-full bg-yellow-300 mx-1'
              onClick={() => {
                if (!user) {
                  alert('Vui lòng đăng nhập để tiếp tục')
                  navigate('/login')
                } else navigate('/PostNews')
              }}
            >
              Đăng tin
            </button>

            <div className='dropdown'>
              <div
                tabIndex={0}
                role='button'
                className='btn m-1 justify-center items-center gap-2 rounded-full p-1 text-xl'
              >
                <div className='tooltip tooltip-bottom' data-tip={user.name}>
                  <img
                    src={`${user.picture}`}
                    alt='avatar'
                    className='w-8 h-8 rounded-full'
                  />
                </div>
                <ChevronDown className='w-5 h-5' />
              </div>

              <div className='dropdown-content z-50'>
                <ul className='menu bg-base-100 rounded-box w-52 p-2 shadow-sm'>
                  <li>
                    <a>Trang cá nhân</a>
                  </li>
                  <li>
                    <a>Cài đặt</a>
                  </li>
                  <li>
                    <button
                      onClick={() => dispatch(logout())}
                      className='w-full text-left'
                    >
                      Đăng xuất
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </>
        ) : (
          // Nếu chưa đăng nhập, hiện button "Đăng nhập" + "Đăng tin"
          <>
            <button
              className='btn btn-sm rounded-full mx-1'
              onClick={() => navigate('/login')}
            >
              Đăng nhập
            </button>
            <button
              className='btn btn-sm rounded-full bg-yellow-300 mx-1'
              onClick={() => navigate('/post')}
            >
              Đăng tin
            </button>
          </>
        )}
      </div>
    </div>
  )
}
