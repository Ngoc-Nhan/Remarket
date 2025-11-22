import React from 'react'

export default function Breadcrumb() {
  const links = [
    { name: 'Chợ Tốt', href: '#' },
    { name: 'Điện thoại', href: '#' },
    { name: 'An Giang', href: '#' },
    { name: 'Thành phố Long Xuyên', href: '#' },
    { name: 'iPhone 16 white 128G zin keng' }
  ]

  return (
    <nav className='text-sm text-gray-600'>
      <ol className='flex flex-wrap gap-1'>
        {links.map((link, i) => (
          <li key={i} className='flex items-center'>
            {i > 0 && <span className='mx-1'>/</span>}
            {link.href ? (
              <a href={link.href} className='hover:underline'>
                {link.name}
              </a>
            ) : (
              <span className='font-medium text-gray-800'>{link.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
