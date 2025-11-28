import { findOrCreateConversationAPI, getFavoritesAPI } from '@/apis'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

// const mockFavourites = [
//   {
//     id: '1',
//     img: 'https://i.pinimg.com/736x/7d/0c/6b/7d0c6bc79cfa39153751c56433141483.jpg',
//     title: 'Mua Bán cỏ nhân tạo thanh lý giá sốc 19k/ m vuông',
//     price: 19000,
//     oldPrice: 20000,
//     type: 'Cá Nhân',
//     priority: 'Tin Ưu Tiên',
//     location: 'Quận Tân Bình'
//   },
//   {
//     id: '2',
//     img: 'https://i.pinimg.com/736x/7d/0c/6b/7d0c6bc79cfa39153751c56433141483.jpg',
//     title: 'Mua Bán cỏ nhân tạo thanh lý giá sốc 19k/ m vuông',
//     price: 19000,
//     oldPrice: 20000,
//     type: 'Cá Nhân',
//     priority: 'Tin Ưu Tiên',
//     location: 'Quận Tân Bình'
//   }
// ]

const FavouritesPage = () => {
  const [items, setItems] = useState([])
  const [favourited, setFavourited] = useState(new Set())
  const [selected, setSelected] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const getFavourites = async () => {
    setIsLoading(true)
    try {
      // Thay bằng fetch API nếu cần
      const res = await getFavoritesAPI()
      setItems(res || mockFavourites)
      setFavourited(new Set(res.map((i) => i.id)))
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    // Thay bằng fetch API nếu cần
    getFavourites()
  }, [])

  const formatPrice = (v) =>
    v == null ? '' : v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' đ'

  const onToggleHeart = (id) => {
    setFavourited((prev) => {
      const s = new Set(prev)
      if (s.has(id)) s.delete(id)
      else s.add(id)
      return s
    })
  }

  const onSelect = (id) => {
    setSelected(id)
  }

  return (
    <div className='p-6 container  mx-auto'>
      <h2 className='text-2xl font-semibold mb-4'>
        Tin đăng đã lưu ({items.length}/100)
      </h2>

      <div className='space-y-4'>
        {items.length === 0 && (
          <div className='text-gray-500'>
            Không có mục nào trong danh sách yêu thích.
          </div>
        )}

        {items.map((item) => {
          const isSelected = selected === item._id
          const isFavorited = favourited.has(item._id)

          return (
            <div
              key={item._id}
              className={`w-full bg-white rounded-md border p-4 flex gap-4 items-start transition-shadow hover:shadow-md ${
                isSelected ? 'ring-2 ring-green-200' : ''
              }`}
              onClick={() => onSelect(item?._id)}
              role='button'
              tabIndex={0}
              onKeyDown={() => {}}
            >
              <div className='w-28 h-28 flex-shrink-0 rounded-md overflow-hidden bg-gray-100'>
                <img
                  src={item?.images[0] || '/placeholder.svg'}
                  alt={item?.title}
                  className='object-cover w-full h-full'
                />
              </div>

              <div className='flex-1 min-w-0'>
                <h3
                  className='text-gray-800 font-medium truncate'
                  title={item.title}
                >
                  {item.title}
                </h3>

                <div className='mt-1 flex items-baseline gap-3'>
                  <span className='text-red-600 font-semibold text-lg'>
                    {formatPrice(item.price)}
                  </span>
                  {item.oldPrice != null && (
                    <span className='line-through text-gray-400 text-sm'>
                      {formatPrice(item.oldPrice)}
                    </span>
                  )}
                </div>

                <div className='mt-2 flex flex-wrap items-center gap-3 text-sm text-gray-600'>
                  <div className='flex items-center gap-2'>
                    <svg
                      className='w-4 h-4 text-green-600'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                    >
                      <path d='M10 18a8 8 0 100-16 8 8 0 000 16z' />
                    </svg>
                    <span>{item.type}</span>
                  </div>

                  {item.priority && (
                    <div className='flex items-center gap-2 bg-yellow-50 text-yellow-800 px-2 py-0.5 rounded'>
                      <svg
                        className='w-3 h-3'
                        fill='currentColor'
                        viewBox='0 0 20 20'
                      >
                        <path d='M10 2l2 5 5 .5-4 3 1.2 5L10 13l-4.2 2.5L7 10 3 7l5-.5L10 2z' />
                      </svg>
                      <span className='text-xs'>{item.priority}</span>
                    </div>
                  )}

                  <div>{item.location}</div>
                </div>
              </div>

              <div className='flex flex-col items-center gap-2'>
                <button
                  className='border border-green-600 text-green-600 px-4 py-1 rounded-full text-sm hover:bg-green-50'
                  onClick={(e) => {
                    const handleChat = async () => {
                      if (!item?.seller?._id)
                        return toast.error(
                          'Không tìm thấy thông tin người bán.'
                        )
                      await findOrCreateConversationAPI(item.seller._id)
                      navigate(`/messages?user=${item.seller._id}`)
                    }
                    handleChat()
                  }}
                >
                  Chat
                </button>

                <button
                  className={`p-1 rounded-full text-xl ${
                    isFavorited ? 'text-red-600' : 'text-gray-300'
                  }`}
                  onClick={(e) => {
                    e.stopPropagation()
                    onToggleHeart(item.id)
                  }}
                  aria-label='Toggle favorite'
                >
                  {isFavorited ? '♥' : '♡'}
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default FavouritesPage
