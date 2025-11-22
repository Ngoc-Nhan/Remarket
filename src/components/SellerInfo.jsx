import React from 'react'

export default function SellerInfo() {
  return (
    <div className='bg-white p-4 rounded-lg shadow'>
      <h3 className='font-semibold text-lg mb-2'>Người bán</h3>
      <p className='font-medium'>Khánh</p>
      <p className='text-sm text-gray-500'>Thành phố Long Xuyên, An Giang</p>
      <button className='mt-3 w-full bg-yellow-500 text-white py-2 rounded'>
        Gọi ngay
      </button>
    </div>
  )
}
