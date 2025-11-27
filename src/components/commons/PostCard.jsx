import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card' // Assuming CardHeader is not used
import { Badge } from '@/components/ui/badge'
import { MapPin, Calendar, Eye, Heart } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function PostCard({
  post,
  onFavorite,
  isFavorited = false,
  viewMode = 'grid'
}) {
  const navigate = useNavigate()
  const [isImageLoading, setIsImageLoading] = useState(true)

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price)
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('vi-VN')
  }

  const getAgeText = (status) => {
    switch (status) {
      case 'PUPPY':
        return 'Chó con'
      case 'YOUNG_DOG':
        return 'Chó nhỏ'
      case 'ADULT_DOG':
        return 'Chó trưởng thành'
      default:
        return status
    }
  }

  const getSizeText = (status) => {
    switch (status) {
      case 'MINI':
        return 'Mini'
      case 'SMALL':
        return 'Nhỏ'
      case 'MEDIUM':
        return 'Vừa'
      case 'LARGE':
        return 'Lớn'
      default:
        return status
    }
  }

  const handleCardClick = () => {
    navigate(`/post/${post.id}`)
  }

  const handleFavoriteClick = (e) => {
    e.stopPropagation()
    onFavorite?.(post.id)
  }

  return (
    <Card
      className={`cursor-pointer hover:shadow-lg transition-shadow duration-200 ${
        viewMode === 'list' ? 'flex flex-row' : ''
      }`}
      onClick={handleCardClick}
    >
      <div
        className={`relative ${
          viewMode === 'list' ? 'w-48 flex-shrink-0' : ''
        }`}
      >
        {/* Image */}
        <div
          className={`relative overflow-hidden ${
            viewMode === 'list'
              ? 'aspect-square rounded-l-lg'
              : 'aspect-video rounded-t-lg'
          }`}
        >
          {post.postImages && post.postImages.length > 0 ? (
            <>
              {isImageLoading && (
                <div className='absolute inset-0 bg-gray-200 animate-pulse' />
              )}
              <img
                src={post.postImages[0].url}
                alt={post.title}
                className='w-full h-full object-cover'
                onLoad={() => setIsImageLoading(false)}
                onError={() => setIsImageLoading(false)}
              />
            </>
          ) : (
            <div className='w-full h-full bg-gray-200 flex items-center justify-center'>
              <span className='text-gray-400 text-xs'>Không có hình ảnh</span>
            </div>
          )}
        </div>

        {/* Favorite Button */}
        {onFavorite && (
          <Button
            variant='ghost'
            size='sm'
            className='absolute top-2 right-2 p-1 bg-white/80 hover:bg-white'
            onClick={handleFavoriteClick}
          >
            <Heart
              className={`h-4 w-4 ${
                isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-600'
              }`}
            />
          </Button>
        )}

        {/* Image Count */}
        {post.postImages &&
          post.postImages.length > 1 &&
          viewMode === 'grid' && (
            <div className='absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded'>
              {post.postImages.length} ảnh
            </div>
          )}
      </div>

      <div
        className={`${
          viewMode === 'list' ? 'flex-1 flex flex-col' : 'flex flex-col h-full'
        }`}
      >
        <CardContent
          className={`${viewMode === 'list' ? 'p-4 flex-1' : 'p-4'}`}
        >
          {/* Title */}
          <h3
            className={`font-semibold mb-2 ${
              viewMode === 'list'
                ? 'text-lg line-clamp-1'
                : 'text-lg line-clamp-2'
            }`}
          >
            {post.title}
          </h3>

          {/* Price */}
          <div className='text-xl font-bold text-orange-600 mb-3'>
            {formatPrice(post.price)}
          </div>

          {/* Category */}
          {post.category && (
            <Badge variant='outline' className='mb-2'>
              {post.category.name}
            </Badge>
          )}

          {/* Description */}
          <p
            className={`text-gray-600 text-sm mb-3 ${
              viewMode === 'list' ? 'line-clamp-1' : 'line-clamp-2'
            }`}
          >
            {post.description}
          </p>

          {/* Pet Info */}
          <div className='flex flex-wrap gap-2 mb-3'>
            {post.age && (
              <span className='text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded'>
                Tuổi: {getAgeText(post.age)}
              </span>
            )}
            {post.size && (
              <span className='text-xs bg-green-100 text-green-800 px-2 py-1 rounded'>
                Size: {getSizeText(post.size)}
              </span>
            )}
            {post.postImages &&
              post.postImages.length > 1 &&
              viewMode === 'list' && (
                <span className='text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded'>
                  {post.postImages.length} ảnh
                </span>
              )}
          </div>

          {/* Location */}
          <div className='flex items-center text-gray-500 text-sm mb-2'>
            <MapPin className='h-4 w-4 mr-1' />
            <span className='line-clamp-1'>
              {post.address || 'Chưa có địa chỉ'}
            </span>
          </div>

          {/* Date */}
          <div className='flex items-center text-gray-500 text-sm'>
            <Calendar className='h-4 w-4 mr-1' />
            <span>{formatDate(post.createdAt)}</span>
          </div>
        </CardContent>

        <CardFooter
          className={`${viewMode === 'list' ? 'p-4 pt-0' : 'p-4 pt-0'} mt-auto`}
        >
          {/* User Info */}
          <div className='flex items-center justify-between w-full'>
            <div className='flex items-center'>
              <div className='w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-2'>
                {post.user?.avatar ? (
                  <img
                    src={post.user.avatar}
                    alt={post.user.name}
                    className='w-8 h-8 rounded-full object-cover'
                  />
                ) : (
                  <span className='text-xs text-gray-600'>
                    {post.user?.name?.charAt(0)?.toUpperCase() || 'U'}
                  </span>
                )}
              </div>
              <span className='text-sm text-gray-600'>
                {post.user?.name || 'Người dùng'}
              </span>
            </div>

            {/* View count (if available) */}
            <div className='flex items-center text-gray-500 text-sm'>
              <Eye className='h-4 w-4 mr-1' />
              <span>0</span>
            </div>
          </div>
        </CardFooter>
      </div>
    </Card>
  )
}

function PostCardSkeleton({ viewMode }) {
  return (
    <Card
      className={`${viewMode === 'list' ? 'flex flex-row' : ''} animate-pulse`}
    >
      <div className={viewMode === 'list' ? 'w-48 flex-shrink-0' : ''}>
        <div
          className={`bg-gray-200 ${
            viewMode === 'list'
              ? 'aspect-square rounded-l-lg'
              : 'aspect-video rounded-t-lg'
          }`}
        />
      </div>

      <div className={`${viewMode === 'list' ? 'flex-1 flex flex-col' : ''}`}>
        <CardContent
          className={`${viewMode === 'list' ? 'p-4 flex-1' : 'p-4'}`}
        >
          <div className='h-5 bg-gray-200 rounded w-3/4 mb-2' />
          <div className='h-6 bg-gray-200 rounded w-1/2 mb-3' />
          <div className='h-4 bg-gray-200 rounded w-1/4 mb-3' />
          <div className='flex gap-2 mb-3'>
            <div className='h-4 bg-gray-200 rounded w-16' />
            <div className='h-4 bg-gray-200 rounded w-16' />
          </div>
          <div className='h-4 bg-gray-200 rounded w-1/2 mb-2' />
          <div className='h-4 bg-gray-200 rounded w-1/3' />
        </CardContent>
        <CardFooter
          className={`${viewMode === 'list' ? 'p-4 pt-0' : 'p-4 pt-0'}`}
        >
          <div className='flex items-center justify-between'>
            <div className='flex items-center'>
              <div className='w-8 h-8 bg-gray-200 rounded-full mr-2' />
              <div className='h-4 bg-gray-200 rounded w-20' />
            </div>
            <div className='h-4 bg-gray-200 rounded w-8' />
          </div>
        </CardFooter>
      </div>
    </Card>
  )
}

PostCard.Skeleton = PostCardSkeleton
