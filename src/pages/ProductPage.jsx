import { useEffect, useState } from 'react'
import React from 'react'
import { useParams } from 'react-router-dom'
// import { useCurrentApp } from '@/components/context/AppContext'
// import { button, Avatar, AvatarFallback, AvatarImage } from '@/components/ui'
import {
  Heart,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  Share2,
  MoreVertical,
  MapPin,
  Clock
} from 'lucide-react'
import { getRelativeTime } from '@/helper'
import { toast } from 'sonner'
import {
  addFavoriteAPI,
  findOrCreateConversationAPI,
  getListingDetailsAPI,
  removeFavoriteAPI
} from '@/apis'
import { useAuthStore } from '@/stores/useAuthStore'
import { useNavigate } from 'react-router-dom'
// import { QUERY_KEY } from '@/config/key'

// const ageMap = {
//   PUPPY: 'Chó con',
//   YOUNG_DOG: 'Chó nhỏ',
//   ADULT_DOG: 'Chó trưởng thành',
//   OTHER: 'Khác'
// }

// Example product data for development/testing
const EXAMPLE_PRODUCT = {
  id: 'example-1',
  title: 'Chó Poodle trắng 3 tháng tuổi - Khỏe mạnh, thân thiện',
  price: 5500000,
  description: `Chú chó Poodle nhỏ xinh, lông mềm mượt, mắt to đen láy. Con chó này rất thân thiện, dễ tính và vui vẻ.

Thông tin chi tiết:
- Tuổi: 3 tháng
- Giống: Poodle
- Màu lông: Trắng
- Sức khỏe: Khỏe mạnh, đã tiêm phòng đủ
- Tính cách: Vui vẻ, thân thiện, dễ huấn luyện

Lý do bán: Gia đình bận rộn không có thời gian chăm sóc.

Liên hệ ngay để xem thực tế và thương lượng giá!`,
  address: 'Quận 1, TP. Hồ Chí Minh',
  updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
  age: 'PUPPY',
  category: {
    id: 'cat-1',
    name: 'Chó Poodle'
  },
  postImages: [
    {
      id: 'img-1',
      url: 'https://images.unsplash.com/photo-1537151608828-8661f6b1e01f?w=500&h=500&fit=crop'
    },
    {
      id: 'img-2',
      url: 'https://images.unsplash.com/photo-1633722715463-d30628519f91?w=500&h=500&fit=crop'
    },
    {
      id: 'img-3',
      url: 'https://images.unsplash.com/photo-1558788353-f76d92427f16?w=500&h=500&fit=crop'
    },
    {
      id: 'img-4',
      url: 'https://images.unsplash.com/photo-1606214174585-fe31582dc1d5?w=500&h=500&fit=crop'
    }
  ],
  user: {
    id: 'user-1',
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@example.com',
    phoneNumber: '0912345678',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop'
  }
}

export default function ProductDetailPage() {
  // const { isAuthenticated } = useCurrentApp()
  const { id } = useParams()
  const { user: infoUs, fetchMe } = useAuthStore()
  // const { data, isLoading, isError, refetch } = usePostById(id || '')
  const navigate = useNavigate()
  const [currentImageIdx, setCurrentImageIdx] = useState(0)
  const [showPhone, setShowPhone] = useState(false)
  const isAuthenticated = Boolean(infoUs)

  const archivedIds = infoUs?.favorites || []
  const [isArchived, setIsArchived] = useState(archivedIds.includes(id))

  const [isLoading, setIsLoading] = useState(true)
  const isError = false
  const data = null
  // const queryClient = useQueryClient()
  // const toggleArchiveMutation = useToggleArchivePost()
  // const { data: archivedData } = useArchivedPosts({ page: 1, limit: 100 })
  // const archivedIds =
  //   archivedData && archivedData.success && Array.isArray(archivedData.data)
  //     ? archivedData.data.map((p) => p.id)
  //     : []

  // useEffect(() => {
  //   if (id) refetch()
  // }, [id])
  const [listingDetail, setListingDetail] = useState(null)

  const getListingDetails = async () => {
    try {
      setIsLoading(true)
      const res = await getListingDetailsAPI(id)
      if (res) console.log(res)
      // const isError = false
      setListingDetail(res)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    getListingDetails()
  }, [])

  if (isLoading)
    return (
      <main className='pt-6 bg-gray-100 min-h-screen'>
        <div className='mx-auto max-w-[1200px] px-4 md:px-6 lg:px-6'>
          <div className='grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white rounded-lg shadow p-6 animate-pulse'>
            {/* Gallery skeleton */}
            <div className='lg:col-span-5'>
              <div className='relative h-[420px] flex items-center justify-center rounded overflow-hidden bg-gray-200' />
              <div className='flex mt-3 gap-2 justify-center'>
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className='w-14 h-14 rounded bg-gray-200' />
                ))}
              </div>
            </div>
            {/* Info skeleton */}
            <div className='lg:col-span-7 space-y-4'>
              <div className='flex justify-between items-start'>
                <div className='h-8 bg-gray-200 rounded w-2/3 mb-2' />
                <div className='h-10 w-10 rounded-full bg-gray-200' />
              </div>
              <div className='h-5 bg-gray-100 rounded w-1/3 mb-2' />
              <div className='h-8 bg-gray-200 rounded w-1/4 mb-2' />
              <div className='h-4 bg-gray-100 rounded w-1/2 mb-2' />
              <div className='h-4 bg-gray-100 rounded w-1/4 mb-2' />
              <div className='grid grid-cols-2 gap-3 mt-4'>
                <div className='h-10 bg-gray-200 rounded w-full' />
                <div className='h-10 bg-gray-200 rounded w-full' />
              </div>
              <div className='flex items-center gap-4 mt-5'>
                <div className='w-10 h-10 rounded-full bg-gray-200' />
                <div className='h-4 bg-gray-100 rounded w-24' />
              </div>
              <div className='pt-4 mt-4 border-t'>
                <div className='h-4 bg-gray-100 rounded w-1/2 mb-2' />
                <div className='flex gap-2'>
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div
                      key={i}
                      className='h-8 w-24 bg-gray-200 rounded-full'
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* Description + Comment skeleton */}
          <div className='mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6'>
            <div className='lg:col-span-7 bg-white rounded-lg shadow p-6 animate-pulse'>
              <div className='h-6 bg-gray-200 rounded w-1/3 mb-4' />
              <div className='h-4 bg-gray-100 rounded w-full mb-2' />
              <div className='h-4 bg-gray-100 rounded w-2/3 mb-2' />
              <div className='h-4 bg-gray-100 rounded w-1/2 mb-2' />
              <div className='h-8 bg-gray-200 rounded w-1/3 mt-4' />
            </div>
            <div className='lg:col-span-5 bg-white rounded-lg shadow p-6 animate-pulse'>
              <div className='h-6 bg-gray-200 rounded w-1/3 mb-4' />
              <div className='h-4 bg-gray-100 rounded w-1/2' />
            </div>
          </div>
        </div>
      </main>
    )

  // Use example data if API data is not available
  const post = listingDetail || EXAMPLE_PRODUCT

  if (isError && !data)
    return <div className='p-6'>Không tìm thấy bài đăng</div>

  const mainImage = post.images?.[currentImageIdx] || '/placeholder.svg'
  const thumbnails = post.images?.map((img) => img) || []
  const user = post.seller || {}
  const userAvatar = user.avatar || '/placeholder.svg'
  const userName = user.name || 'Người dùng'
  const userPhone = user.phoneNumber || ''
  const phoneMasked = userPhone
    ? userPhone.replace(/(\d{4})\d{3}(\d{3})/, '$1***$2')
    : ''

  const handlePrev = () => {
    setCurrentImageIdx((prev) =>
      prev === 0 ? thumbnails.length - 1 : prev - 1
    )
  }
  const handleNext = () => {
    setCurrentImageIdx((prev) =>
      prev === thumbnails.length - 1 ? 0 : prev + 1
    )
  }
  const saved = async () => {
    try {
      const res = await addFavoriteAPI(post._id)
      archivedIds.push(post._id)
      setIsArchived(true)
      toast.success('Đã thêm vào danh sách yêu thích!')
    } catch (error) {
      console.log(error)
      toast.error('Có lỗi xảy ra, vui lòng thử lại.')
    }
  }
  const remove = async () => {
    try {
      const res = await removeFavoriteAPI(post._id)
      archivedIds.splice(archivedIds.indexOf(post._id), 1)
      setIsArchived(false)
      toast.success('Đã xóa khỏi danh sách yêu thích!')
    } catch (error) {
      console.log(error)
      toast.error('Có lỗi xảy ra, vui lòng thử lại.')
    }
  }
  return (
    <main className='pt-6 bg-gray-100 min-h-screen'>
      <div className='mx-auto max-w-[1200px] px-4 md:px-6 lg:px-6 pb-8'>
        {/* Gallery + Info */}
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white rounded-lg shadow p-6'>
          {/* Gallery */}
          <div className='lg:col-span-5'>
            <div className='relative h-[420px] flex items-center justify-center rounded overflow-hidden bg-gray-100'>
              <img
                src={mainImage}
                alt={post.title}
                className='object-cover w-full h-full'
              />
              <button
                size='icon'
                variant='ghost'
                className='absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 rounded-full'
                onClick={handlePrev}
                tabIndex={0}
              >
                <ChevronLeft className='h-6 w-6' />
              </button>
              <button
                size='icon'
                variant='ghost'
                className='absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 rounded-full'
                onClick={handleNext}
                tabIndex={0}
              >
                <ChevronRight className='h-6 w-6' />
              </button>
              <div className='absolute top-4 right-4 flex space-x-2'>
                <button
                  size='icon'
                  variant='ghost'
                  className='bg-white/70 rounded-full'
                >
                  <Share2 className='h-5 w-5' />
                </button>
                <button
                  size='icon'
                  variant='ghost'
                  className='bg-white/70 rounded-full'
                >
                  <MoreVertical className='h-5 w-5' />
                </button>
              </div>
              <div className='absolute bottom-4 right-4 bg-black/60 text-white text-xs px-2 py-1 rounded-full'>
                {thumbnails.length > 0
                  ? `${currentImageIdx + 1}/${thumbnails.length}`
                  : ''}
              </div>
            </div>
            <div className='flex mt-3 gap-2 justify-center'>
              {thumbnails.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`thumb ${index}`}
                  className={`w-14 h-14 rounded object-cover border cursor-pointer ${
                    index === currentImageIdx
                      ? 'border-yellow-400'
                      : 'border-transparent'
                  }`}
                  onClick={() => setCurrentImageIdx(index)}
                />
              ))}
            </div>
          </div>

          {/* Info */}
          <div className='lg:col-span-7 space-y-4'>
            <div className='flex justify-between items-start'>
              <h1 className='text-2xl font-bold leading-tight'>{post.title}</h1>
              <button
                variant='ghost'
                size='icon'
                className={
                  isArchived
                    ? 'bg-red-500 rounded-full hover:bg-red-600'
                    : 'rounded-full'
                }
                onClick={() => {
                  if (!isAuthenticated) {
                    navigate('/login')
                    return
                  }
                  // Sửa lỗi logic: Nếu đã yêu thích thì xóa, chưa thì thêm
                  if (archivedIds.includes(post._id)) {
                    remove()
                  } else {
                    saved()
                  }
                }}
              >
                <Heart
                  className={`w-5 h-5 ${
                    archivedIds.includes(post._id)
                      ? 'text-white'
                      : 'text-gray-500'
                  }`}
                />
              </button>
            </div>
            <p className='text-base text-muted-foreground'>
              {post?.categoryId}
            </p>
            <p className='text-red-600 text-2xl font-bold'>
              {post.price.toLocaleString()} đ
            </p>
            <div className='flex items-center gap-2 text-sm text-muted-foreground'>
              <MapPin className='w-4 h-4' />
              {post?.loation}
            </div>
            <div className='flex items-center gap-2 text-sm text-muted-foreground'>
              <Clock className='w-4 h-4' />
              Cập nhật {getRelativeTime(post.updatedAt)}
            </div>

            <div className='grid grid-cols-2 gap-3 mt-4'>
              {userPhone && (
                <button
                  className='bg-gray-200 text-gray-800 text-sm'
                  onClick={() => {
                    if (!isAuthenticated) {
                      window.open(
                        '/login?popup=1',
                        '_blank',
                        'noopener,noreferrer,toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=420,height=680'
                      )
                      return
                    }
                    if (!showPhone) setShowPhone(true)
                  }}
                >
                  {showPhone ? userPhone : `Hiện số ${phoneMasked}`}
                </button>
              )}
              <button
                className='bg-yellow-400 text-black  hover:bg-yellow-500 text-sm'
                onClick={() => {
                  // 1. Check authentication
                  if (!isAuthenticated) {
                    navigate('/login')
                    return
                  }
                  // 2. Find or create conversation and then navigate
                  const handleChat = async () => {
                    if (!post?.seller?._id)
                      return toast.error('Không tìm thấy thông tin người bán.')
                    await findOrCreateConversationAPI(post.seller._id)
                    navigate(`/messages?user=${post.seller._id}`)
                  }
                  handleChat()
                }}
              >
                <MessageSquare className='w-4 h-4 mr-2' /> Chat
              </button>
            </div>

            {/* Buyer info */}
            <div className='flex items-center gap-4 mt-5'>
              <div className='w-10 h-10'>
                {userAvatar ? (
                  <img src={userAvatar} />
                ) : (
                  <div>{userName?.[0]?.toUpperCase?.() || 'U'}</div>
                )}
              </div>
              <div>
                <p className='font-semibold text-sm'>{userName}</p>
              </div>
            </div>

            <div className='pt-4 mt-4 border-t'>
              <h3 className='text-sm font-semibold mb-2'>Chat nhanh:</h3>
              <div className='flex flex-wrap gap-2'>
                {[
                  'Thú cưng này còn không bạn?',
                  'Bạn có ship thú cưng không?',
                  'Thú cưng có được tiêm chưa?'
                ].map((text, i) => (
                  <button
                    key={i}
                    variant='outline'
                    className='rounded-full text-xs px-3'
                  >
                    {text}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Description + Comment */}
        <div className='mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6'>
          <div className='lg:col-span-7 flex flex-col gap-6'>
            <div className='bg-white rounded-lg shadow p-6'>
              <h2 className='text-xl font-bold mb-4'>Mô tả chi tiết</h2>
              <p className='text-base text-muted-foreground whitespace-pre-line leading-relaxed'>
                {post.description}
              </p>
              {userPhone && (
                <div className='inline-flex items-center bg-gray-100 rounded-full px-4 py-2 mt-4'>
                  <span className='font-semibold mr-2'>SĐT liên hệ:</span>
                  <span className='font-semibold'>
                    {showPhone ? userPhone : phoneMasked}
                  </span>
                  {!showPhone && (
                    <button
                      className='ml-3 text-blue-600 font-semibold hover:underline focus:outline-none cursor-pointer'
                      type='button'
                      onClick={() => {
                        if (!isAuthenticated) {
                          window.open(
                            '/login?popup=1',
                            '_blank',
                            'noopener,noreferrer,toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=420,height=680'
                          )
                          return
                        }
                        setShowPhone(true)
                      }}
                    >
                      Hiện số
                    </button>
                  )}
                </div>
              )}
            </div>

            <div className='bg-white rounded-lg shadow p-6'>
              <h2 className='text-xl font-bold mb-4'>Thông tin chi tiết</h2>
              <div className='divide-y divide-gray-200'>
                <div className='flex justify-between py-2 border-b border-gray-200'>
                  {/* <span className='text-gray-600'>Giống thú cưng:</span> */}
                  <span className='font-medium'>
                    {post?.categoryId || 'Không rõ'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className='lg:col-span-5 bg-white rounded-lg shadow p-3 text-sm flex flex-col justify-start min-h-0 max-h-[120px]'>
            <h2 className='text-xl font-bold mb-4'>Bình luận</h2>
            <p className='text-muted-foreground'>Chưa có bình luận nào.</p>
          </div>
        </div>
      </div>
    </main>
  )
}
