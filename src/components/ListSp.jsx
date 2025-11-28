import React from 'react'

import dayjs from 'dayjs'
import 'dayjs/locale/vi'
// import 'moment/locale/vi' // not needed unless you use moment elsewhere
import { useNavigate } from 'react-router-dom'
import { Heart, MapPin, MoreHorizontal } from 'lucide-react'
// import { getRelativeTime } from '../helper'
import { toast } from 'sonner'
import { useAuthStore } from '@/stores/useAuthStore'
import { addFavoriteAPI, removeFavoriteAPI } from '@/apis'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)
dayjs.locale('vi')
function ListSp({ filteredProducts }) {
  const navigate = useNavigate()
  const { user: infoUs } = useAuthStore()
  const isAuthenticated = !!infoUs

  const [favorites, setFavorites] = React.useState(infoUs?.favorites || [])

  React.useEffect(() => {
    if (infoUs?.favorites) {
      setFavorites(infoUs.favorites)
    }
  }, [infoUs])

  if (!filteredProducts) {
    return <p>Không có sản phẩm nào để hiển thị.</p>
  }
  const saved = async (id) => {
    try {
      await addFavoriteAPI(id)
      setFavorites((prev) => [...prev, id])
      toast.success('Đã thêm vào danh sách yêu thích!')
    } catch (error) {
      console.log(error)
      toast.error('Có lỗi xảy ra, vui lòng thử lại.')
    }
  }

  const remove = async (id) => {
    try {
      await removeFavoriteAPI(id)
      setFavorites((prev) => prev.filter((favId) => favId !== id))
      toast.success('Đã xóa khỏi danh sách yêu thích!')
    } catch (error) {
      console.log(error)
      toast.error('Có lỗi xảy ra, vui lòng thử lại.')
    }
  }

  return (
    <>
      <div className='grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-5 md:gap-4'>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product._id}
              className='rounded-xl h-full bg-white p-2 flex flex-col shadow-sm w-full cursor-pointer'
              onClick={() => navigate(`/product/${product._id}`)}
            >
              <div className='relative flex-col max-w-full flex items-center justify-center overflow-hidden rounded-xl group w-full'>
                <div className='w-full aspect-w-4 flex items-center justify-center aspect-h-3 overflow-hidden rounded-md mb-3'>
                  <img
                    src={
                      Array.isArray(product.images) && product.images.length > 0
                        ? product.images[0]
                        : '/placeholder.svg'
                    }
                    alt={product.title || 'Product image'}
                    className='w-auto h-52 object-cover transition-transform duration-200 group-hover:scale-105 bg-center z-0'
                  />
                </div>
                <button
                  className={`btn btn-circle absolute top-2 right-2 h-8 w-8 rounded-xl border-0 z-0 ${
                    favorites.includes(product._id)
                      ? 'bg-red-500/70 hover:bg-red-600/70'
                      : 'bg-black/20 hover:bg-black/40'
                  }`}
                  onClick={(e) => {
                    e.stopPropagation()
                    if (!isAuthenticated) {
                      navigate('/login')
                      return
                    }
                    if (favorites.includes(product._id)) {
                      remove(product._id)
                    } else {
                      saved(product._id)
                    }
                  }}
                >
                  <Heart
                    className={`h-5 w-5 ${
                      favorites.includes(product._id)
                        ? 'text-white'
                        : 'text-white'
                    }`}
                  />
                </button>
                <button className='btn btn-circle absolute top-2 left-2 h-8 w-fit rounded-xl border-0 z-0 bg-amber-400/30 text-md text-black/70 p-2 flex  items-center justify-center text-nowrap'>
                  🌟 Tin tiêu biểu
                </button>

                <div className='absolute bottom-0 left-0 right-0 flex justify-between items-end to-transparent px-2 py-1 rounded-b-md z-0 pointer-events-none'>
                  <span className='text-white p-1 px-2 bg-black/40 rounded-xl text-md font-semibold'>
                    {dayjs(product.createdAt).fromNow()}
                  </span>
                  <span className='flex p-1 px-2 rounded-xl text-md bg-black/40 items-center gap-1 text-white text-md font-semibold'>
                    {Array.isArray(product.images)
                      ? product.images.length
                      : product.images
                      ? 1
                      : 0}
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='w-5 h-5'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                    >
                      <path d='M4 3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H4zm0 2h12v10H4V5zm2 2a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-1 7 2.5-3 2.5 3h-5zm6 0 2-2.5 2 2.5h-4z' />
                    </svg>
                  </span>
                </div>
              </div>
              <div className='pt-2 flex flex-col flex-1 h-full justify-between'>
                <div>
                  <h3 className='font-light text-xl pt-2 px-2  line-clamp-2 mb-1 text-black leading-tight'>
                    {product.title}
                  </h3>
                  <div className='flex items-center justify-between mb-1'>
                    <span className=' px-2 font-bold text-red-600 text-xl'>
                      {product?.price?.toLocaleString()} đ
                    </span>
                  </div>
                </div>
                <div className='flex items-end text-xs text-gray-500 justify-between px-2 mb-2'>
                  <span className='truncate items-center justify-center flex flex-row text-lg'>
                    {' '}
                    <MapPin className='h-7 w-7 mr-1 shrink-0' />
                    {product.location}
                  </span>
                  <button className='h-7 w-7 p-0 relative flex items-center justify-center rounded-full hover:bg-gray-200'>
                    <MoreHorizontal className='h-7 w-7 text-gray-400' />
                  </button>
                </div>
              </div>

              {/* <h3 className='font-semibold text-gray-800'>{product.title}</h3>
              <p className='text-gray-500 text-sm'>{product.category}</p>
              <p className='text-amber-600 font-bold mt-2'>
                {product.price.toLocaleString('vi-VN')} ₫
              </p>
              <p className='text-xs text-gray-400 mt-1'>
                {product.location} • {product.condition}
              </p>
              <p className='text-xs text-red-500 mt-2'>
                {moment(product.postedAt).format('MMMM Do YYYY, h:mm:ss a')}
              </p> */}
            </div>
          ))
        ) : (
          <p className='text-center col-span-full text-gray-500'>
            Không tìm thấy sản phẩm nào phù hợp 🔍
          </p>
        )}
      </div>
      {/* data?.success && */}
      {/* filteredProducts.length % LIMIT === 0 && */}
      {filteredProducts.length !== 0 && (
        <div className='text-center mt-8'>
          <button
            // onClick={handleLoadMore}
            // variant='outline'
            className='px-8 btn btn-lg bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
            // disabled={isLoading || isLoadMore}
          >
            {/* {(isLoading && postList.length === 0) || isLoadMore
                ? 'Đang tải...' : */}
            Xem thêm
            {/* } */}
          </button>
        </div>
      )}
    </>
  )
}

export default ListSp
