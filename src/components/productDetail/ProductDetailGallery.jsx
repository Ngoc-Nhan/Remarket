import React, { useState } from 'react'

export default function ProductDetailGallery({ images = [] }) {
  const [mainIdx, setMainIdx] = useState(0)
  const main = images.length ? images[mainIdx] : null

  return (
    <div>
      <div className='bg-gray-100 rounded-lg overflow-hidden h-96 flex items-center justify-center'>
        {main ? (
          <img
            src={main}
            alt={`Ảnh ${mainIdx + 1}`}
            className='object-contain h-full w-full'
          />
        ) : (
          <div className='text-gray-400'>Không có ảnh</div>
        )}
      </div>

      {images.length > 1 && (
        <div className='mt-3 grid grid-cols-5 gap-2'>
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setMainIdx(i)}
              className={`border rounded overflow-hidden focus:outline-none ${
                i === mainIdx ? 'ring-2 ring-blue-400' : ''
              }`}
            >
              <img
                src={src}
                alt={`thumb-${i}`}
                className='object-cover h-16 w-full'
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
