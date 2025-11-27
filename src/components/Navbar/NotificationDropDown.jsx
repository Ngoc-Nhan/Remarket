// import { useCurrentApp } from '@/components/context/AppContext'
import { formatTimeAgo } from '@/lib/format-time-ago'
import { cn } from '@/lib/utils'
// import { useReadNotificationMutation } from '@/services/query/notification'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import React from 'react'
import { useAuthStore } from '../../stores/useAuthStore'
export function NotificationDropdown({
  notificationRef,
  onClose,
  notifications
}) {
  const navigate = useNavigate()
  const { user } = useAuthStore()

  // const readNotificationMutation = useReadNotificationMutation()

  const handleClickNotification = async (notification) => {
    try {
      if (!notification.isRead) {
        // await readNotificationMutation.mutateAsync(notification.id)
      }
      onClose()
      navigate(notification.url)
    } catch (error) {
      toast.error('Đã có lỗi xảy ra khi đọc thông báo.')
    }
  }

  return (
    <div
      ref={notificationRef}
      className='absolute right-56 translate-x-1/2 mt-4 w-[350px] sm:w-[400px] bg-[#fafafa] shadow-2xl rounded-lg z-50 flex flex-col'
    >
      <div className='flex px-5 pt-5 pb-3 border-b'>
        <span className='text-lg font-semibold flex-1'>Thông Báo</span>
      </div>
      <div
        className={cn(
          'flex flex-col overflow-y-auto min-h-[100px] h-fit max-h-[450px] p-2',
          !user ? 'justify-center' : 'justify-start'
        )}
      >
        {!user ? (
          <div className='text-center text-gray-400 text-sm py-8'>
            Vui lòng{' '}
            <span
              className='text-orange-600 font-semibold cursor-pointer'
              onClick={() => navigate('/login')}
            >
              đăng nhập
            </span>{' '}
            để xem thông báo.
          </div>
        ) : notifications.length === 0 ? (
          <div className='text-center text-gray-400 text-sm py-8'>
            Không có thông báo
          </div>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              onClick={(e) => {
                e.stopPropagation()
                handleClickNotification(n)
              }}
              className={`cursor-pointer mb-2 last:mb-0 rounded p-3 transition border-l-4 
                  ${
                    n.isRead
                      ? 'bg-gray-200 border-gray-300'
                      : 'bg-orange-50 border-orange-300'
                  } 
                  hover:bg-orange-100 hover:border-orange-300`}
            >
              <div className='space-x-1'>
                <span
                  className={`text-sm font-medium ${
                    n.isRead ? 'text-gray-700' : 'text-orange-600'
                  }`}
                >
                  {n.content}
                </span>
                <span className='text-xs text-gray-400'>
                  {`(${formatTimeAgo(n.createdAt)})`}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
