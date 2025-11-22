import React from 'react'

import moment from 'moment'
import 'moment/locale/vi' // để hiển thị tiếng Việt
import { useNavigate } from 'react-router-dom'
import { Heart, MapPin, MoreHorizontal } from 'lucide-react'
import { getRelativeTime } from '../helper'
import { toast } from 'sonner'
moment.locale('vi')

function ListSp({ filteredProducts }) {
  if (!filteredProducts) {
    return <p>Không có sản phẩm nào để hiển thị.</p>
  }
  const navigate = useNavigate()

  const [archivedIds, setArchivedIds] = React.useState([])

  const toggleArchive = (id, e) => {
    e.stopPropagation() // tránh click nút cũng kích hoạt navigate của parent
    setArchivedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  return (
    <>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-10'>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className=' rounded-xl  '
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <div className='relative group overflow-hidden'>
                <img
                  src={product.image || '/placeholder.svg'}
                  alt={product.title}
                  className='w-full h-50 object-cover mb-3 transition-transform duration-200 group-hover:scale-105 rounded-md z-0'
                />
                <button
                  className={`btn btn-circle absolute top-2 right-2 h-8 w-8 rounded-full border-0 z-10 ${
                    archivedIds.includes(product.id)
                      ? 'bg-red-500 hover:bg-red-600'
                      : 'bg-black/20 hover:bg-black/40'
                  }`}
                  onClick={(e) => {
                    // e.stopPropagation()
                    // if (false) {
                    //   navigate('/login')
                    //   return
                    // }
                    toggleArchive(product.id, e)
                    toast.success('Cập nhật trạng thái lưu trữ thành công!')
                    // toggleArchiveMutation.mutate(post.id, {
                    // 	onSuccess: (res) => {
                    // 		if (res.success) {
                    // 			queryClient.invalidateQueries({
                    // 				queryKey: QUERY_KEY.getArchivedPosts({
                    // 					page: 1,
                    // 					limit: 100,
                    // 				}),
                    // 			});
                    // 			toast.success('Cập nhật trạng thái lưu trữ thành công!');
                    // 		} else {
                    // 			toast.error(res.message || 'Cập nhật thất bại');
                    // 		}
                    // 	},
                    // 	onError: (err) => {
                    // 		const error: any = err;
                    // 		toast.error(error?.response?.data?.message || 'Có lỗi xảy ra');
                    // 	},
                    // });
                  }}
                >
                  <Heart
                    className={`h-5 w-5 ${
                      archivedIds.includes(product.id)
                        ? 'text-white'
                        : 'text-white'
                    }`}
                  />
                </button>

                <div className='absolute bottom-0 left-0 right-0 flex justify-between items-end bg-black/15  from-black/70 to-transparent px-2 py-1 rounded-b-md z-10 pointer-events-none transition-colors duration-200 group-hover:bg-gradient-to-t'>
                  <span className='text-white text-xs font-semibold'>
                    {getRelativeTime(product.postedAt)}
                  </span>
                  <span className='flex items-center gap-1 text-white text-xs font-semibold'>
                    {product.image.length}
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='w-4 h-4'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                    >
                      <path d='M4 3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H4zm0 2h12v10H4V5zm2 2a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-1 7 2.5-3 2.5 3h-5zm6 0 2-2.5 2 2.5h-4z' />
                    </svg>
                  </span>
                </div>
              </div>
              <div className='pt-2'>
                <h3 className='font-normal text-sm line-clamp-2 mb-1 text-black leading-tight'>
                  {product.title}
                </h3>
                <div className='flex items-center justify-between mb-1'>
                  <span className='font-bold text-red-600 text-sm'>
                    {product.price.toLocaleString()} đ
                  </span>
                  <button className='h-5 w-5 p-0'>
                    <MoreHorizontal className='h-4 w-4 text-gray-400' />
                  </button>
                </div>
                <div className='flex items-center text-xs text-gray-500'>
                  <MapPin className='h-3 w-3 mr-1 flex-shrink-0' />
                  <span className='truncate'>{product.location}</span>
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
            'Xem thêm'
            {/* } */}
          </button>
        </div>
      )}
    </>
  )
}

export default ListSp
