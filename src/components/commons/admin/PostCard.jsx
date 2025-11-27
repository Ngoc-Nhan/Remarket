import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Loader } from 'lucide-react'
import { postStatusToText } from '@/helper'

export function PostCard({ post, onApprove, isApproving, isApprovingPostId }) {
  return (
    <Card className='flex flex-col overflow-hidden shadow-md hover:shadow-lg transition-shadow'>
      <CardHeader className='p-0 relative'>
        {post.postImages.length > 0 && (
          <img
            src={post.postImages[0]?.url}
            alt={post.title}
            className='w-full h-48 object-cover'
          />
        )}
        <Badge className='absolute top-2 right-2 text-xs'>
          {postStatusToText(post.status)}
        </Badge>
      </CardHeader>

      <CardContent className='p-4 space-y-2'>
        <h3 className='text-lg font-semibold line-clamp-1'>{post.title}</h3>
        <p className='text-sm text-muted-foreground line-clamp-2'>
          {post.description}
        </p>
        <div className='text-sm text-gray-500 space-y-1'>
          <p>
            Danh mục: <span className='font-medium'>{post.category.name}</span>
          </p>
          <p>
            Người đăng: <span className='font-medium'>{post.user.name}</span>
          </p>
          <p>
            Giá:{' '}
            <span className='text-primary font-bold'>
              {post.price.toLocaleString()}₫
            </span>
          </p>
        </div>
      </CardContent>

      <CardFooter className='p-4 flex justify-between items-center'>
        <span className='text-xs text-gray-400'>
          {new Date(post.createdAt).toLocaleDateString()}
        </span>
        {post.status === 'PENDING' && (
          <Button
            disabled={isApproving || isApprovingPostId === post.id}
            size='sm'
            onClick={() => onApprove(post.id)}
          >
            {isApprovingPostId === post.id && (
              <Loader className='animate-spin' />
            )}
            Duyệt
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
