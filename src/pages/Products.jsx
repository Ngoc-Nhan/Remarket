import React from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'

function Products() {
  const params = useParams()
  //   console.log(params.id)
  return (
    <div className='h-full w-full bg-gray-100'>
      {/* Navbar */}
      <Navbar />

      <div className='pt-28 flex mx-auto w-full bg-white'>
        <div className='breadcrumbs text-md mx-auto '>
          <ul>
            <li>
              <a>Home</a>
            </li>
            <li>
              <a>Documents</a>
            </li>
            <li>Add Document</li>
          </ul>
        </div>
      </div>

      <div className='  h-screen mt-2'>
        <div className='container rounded-2xl mx-auto bg-white h-full grid grid-cols-1  md:grid-cols-3 gap-4 p-4'>
          <div className='col-span-1 bg-white p-4'>
            <img
              src='https://www.didongmy.com/vnt_upload/product/09_2025/thumbs/(600x600)_iphone_17_blue_thumb_didongmy_1.jpg'
              alt=''
              className='w-full h-auto rounded-lg shadow-md'
            />
          </div>
          <div className='col-span-2 bg-white p-4'>Xin chao ban yeu</div>
        </div>
      </div>
    </div>
  )
}

export default Products
