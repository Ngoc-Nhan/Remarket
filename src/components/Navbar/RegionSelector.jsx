import React from 'react'
import { ChevronDown, MapPin } from 'lucide-react'
import { provinces } from '../../constant/constant'

export default function RegionSelector() {
  return (
    <div className='dropdown '>
      <div
        tabIndex={0}
        role='button'
        className=' border w-auto bg-white border-black/10 m-1 px-4 py-2 justify-center text-center items-center gap-2 rounded-full cursor-pointer inline-flex'
      >
        <MapPin className='w-7 h-7 text-yellow-400' />
        <div className='inline-block text-nowrap'>Chọn khu vực</div>
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
  )
}
