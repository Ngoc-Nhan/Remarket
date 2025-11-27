import { cn } from '@/lib/utils'
import { Home, List, LogOut, Newspaper, Users } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import React from 'react'

const links = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: Home },
  { to: '/admin/users-management', label: 'Người dùng', icon: Users },
  { to: '/admin/categories-management', label: 'Danh mục', icon: List },
  { to: '/admin/posts-management', label: 'Bài đăng', icon: Newspaper }
]

export function Sidebar() {
  return (
    <aside className='w-64 h-full border-r bg-app-primary p-4 flex flex-col justify-between'>
      <div>
        <h2 className='text-xl font-bold mb-6 text-center'>Admin Panel</h2>
        <nav className='space-y-2'>
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-2 px-3 py-2 rounded-md bg-app-primary hover:bg-app-secondary transition',
                  isActive && 'bg-app-secondary font-semibold'
                )
              }
            >
              <Icon className='w-4 h-4' />
              {label}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className='flex items-center gap-1 mt-auto px-3 py-2 rounded-md hover:bg-app-secondary cursor-pointer duration-200'>
        <LogOut />
        <span>Logout</span>
      </div>
    </aside>
  )
}
