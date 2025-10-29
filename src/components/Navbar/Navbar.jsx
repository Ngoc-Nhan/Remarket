import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logoutUserAPI } from '@redux/user/userSlice'

import MenuDropdown from './MenuDropdown'
import RegionSelector from './RegionSelector'
import SearchBar from './SearchBar'
import IconsGroup from './IconsGroup'
import UserMenu from './UserMenu'
import {
  Bell,
  ChevronDown,
  Handbag,
  MessagesSquare,
  SquarePen
} from 'lucide-react'

export default function Navbar({ searchTerm, setSearchTerm }) {
  const user = useSelector((state) => state.user.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [selectedData, setSelectedData] = useState('')
  const [showDanhMuc, setShowDanhMuc] = useState(false)
  const localtion = useLocation()
  const isPostNewsPage = localtion.pathname === '/PostNews'

  const logout = () => {
    dispatch(logoutUserAPI())
    navigate('/')
  }
  return (
    <div className='navbar  top-0 fixed w-full z-50 bg-base-100 shadow-sm gap-5  justify-around '>
      {/* Logo */}
      <div className='flex items-center gap-5'>
        <Link className='btn btn-ghost text-xl' to='/'>
          <img src='./logo.png' className='w-15' alt='logo' />
        </Link>
        {isPostNewsPage ? null : (
          <div className='flex text-xl items-center gap-1 cursor-pointer'>
            <MenuDropdown />
            <p>Danh Mục</p>
          </div>
        )}
      </div>

      <SearchBar />

      {/* Icon Section */}
      <div className='flex gap-6 text-xl items-center'>
        <Bell />
        <MessagesSquare />
        <Handbag />

        {/* User Menu */}

        <UserMenu
          user={user}
          navigate={navigate}
          dispatch={dispatch}
          logout={logout}
        ></UserMenu>
      </div>
    </div>
  )
}
