import React from 'react'

export default function ProductGallery() {
  const images = [
    'https://cdn.chotot.com/EhOhXRSt-2GKpYlG8P9T31DMkwzx-txJFrzU4sQ3IYI/preset:view/plain/00175b56cbf53e61ec75573f246fa0ae-2956250685204446407.jpg',
    'https://cdn.chotot.com/FPQu3vvk8QH4W9yT06r1y4FBUWiA2E4qJBT4z2B7iCY/preset:view/plain/3025e008112754c5b9b821188297903a-2956250685845585203.jpg',
    'https://cdn.chotot.com/ovBO2cfwv0SsFwx5jYZ2wVANxmWwuJfLius1eq1Or1U/preset:view/plain/1a705e21238716bc7422433738eda912-2956250689132136363.jpg'
  ]

  return (
    <div>
      <img
        src={images[0]}
        alt='main'
        className='w-full h-96 object-cover rounded-lg shadow'
      />
      <div className='flex gap-2 mt-3'>
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`thumbnail ${i}`}
            className='w-24 h-24 object-cover rounded cursor-pointer hover:ring-2 ring-yellow-400'
          />
        ))}
      </div>
    </div>
  )
}
