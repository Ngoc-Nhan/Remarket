// ...existing code...
import React, { useState } from 'react'


export default function ProductDetailInfo({ product }) {
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  const {
    title,
    price,
    location,
    phone,
    sellerName,
    attributes = {},
    createdAt
  } = product || {}

  const formatPrice = (p) =>
    typeof p === 'number'
      ? new Intl.NumberFormat('vi-VN', {
          style: 'currency',
          currency: 'VND'
        }).format(p)
      : p

  function handleAdd() {
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <aside className='sticky top-20'>
      <div className='bg-white shadow-lg rounded-lg p-6'>
        <h1 className='text-2xl font-semibold mb-2'>
          {title || 'Không có tiêu đề'}
        </h1>

        <div className='flex items-baseline gap-3 mb-4'>
          <div className='text-3xl text-rose-600 font-extrabold'>
            {price ? formatPrice(price) : 'Liên hệ'}
          </div>
          {product?.isNew && (
            <span className='text-xs bg-green-100 text-green-800 px-2 py-1 rounded'>
              Mới
            </span>
          )}
        </div>

        <div className='text-sm text-gray-600 mb-4'>
          <div>
            Đăng bởi:{' '}
            <span className='font-medium'>{sellerName || 'Người bán'}</span>
          </div>
          {location && <div>Vị trí: {location}</div>}
          {createdAt && (
            <div>Đăng: {new Date(createdAt).toLocaleDateString()}</div>
          )}
        </div>

        <div className='mb-4'>
          <div className='text-sm text-gray-500 mb-2'>Số lượng</div>
          <div className='flex items-center gap-2'>
            <button
              onClick={() => setQty((s) => Math.max(1, s - 1))}
              className='w-9 h-9 rounded border flex items-center justify-center'
            >
              -
            </button>
            <div className='w-12 text-center'>{qty}</div>
            <button
              onClick={() => setQty((s) => s + 1)}
              className='w-9 h-9 rounded border flex items-center justify-center'
            >
              +
            </button>
            <div className='ml-auto text-sm text-gray-500'>
              {/* stock info could go here */}
            </div>
          </div>
        </div>

        <div className='flex flex-col gap-3'>
          <button
            onClick={handleAdd}
            className={`w-full py-3 rounded text-white font-medium ${
              added ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
            }`}
            aria-pressed={added}
          >
            {added ? 'Đã thêm' : 'Thêm vào giỏ'}
          </button>

          {phone && (
            <a
              href={`tel:${phone}`}
              className='w-full text-center py-3 rounded border border-green-500 text-green-600'
            >
              Gọi: {phone}
            </a>
          )}

          <button className='w-full py-3 rounded border text-gray-700'>
            Nhắn tin người bán
          </button>
        </div>

        <div className='mt-5 text-sm text-gray-600'>
          <h4 className='font-medium mb-2'>Thông số</h4>
          <div className='space-y-2'>
            {Object.entries(attributes).length === 0 && (
              <div className='text-gray-400'>Không có thông số</div>
            )}
            {Object.entries(attributes).map(([k, v]) => (
              <div key={k} className='flex justify-between'>
                <span className='text-gray-500'>{k}</span>
                <span className='font-medium'>{String(v)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className='mt-4'>
        <div className='bg-white shadow rounded-lg p-4'>
          <h5 className='text-sm font-medium mb-2'>Người bán</h5>
          <div className='flex items-center gap-3'>
            <div className='w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-xl'>
              👤
            </div>
            <div>
              <div className='font-medium'>{sellerName || 'Người bán'}</div>
              <div className='text-sm text-gray-500'>Tham gia: —</div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
// ...existing code...
