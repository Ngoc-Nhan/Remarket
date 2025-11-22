import React from 'react'
import DanhMuc from '../DanhMuc'

export default function MenuDropdown() {
  return (
    <div className='flex-none'>
      <button className='btn btn-square btn-ghost'>
        <details className='dropdown'>
          <summary className='btn flex m-1 bg-base-100 border-none hover:bg-gray-300'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              className='inline-block h-7 w-7 stroke-current'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4 6h16M4 12h16M4 18h16'
              />
            </svg>
          </summary>
          <div className='dropdown-content bg-base-100 rounded-box w-[350px] p-4 shadow-sm'>
            <DanhMuc />
          </div>
        </details>
      </button>
    </div>
  )
}
