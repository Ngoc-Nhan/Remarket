import React from 'react'

export default function ProductInfo() {
  return (
    <div className='bg-white rounded-lg shadow p-4 space-y-3'>
      <h2 className='text-2xl font-semibold'>iPhone 16 white 128G zin keng</h2>
      <p className='text-xl text-yellow-600 font-bold'>9.800.000₫</p>
      <p className='text-gray-600'>
        Bản VN/A pin 100% vừa hết bảo hành, máy zin full chức năng, icloud đã
        chặn xoá từ xa, full ứng dụng.
      </p>
      <button className='bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600'>
        Liên hệ người bán
      </button>
    </div>
  )
}
