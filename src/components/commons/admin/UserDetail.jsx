import dayjs from 'dayjs'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'

// interface Props {
// 	user: IUser | null;
// 	open: boolean;
// 	onClose: () => void;
// }

export function UserDetail({ user, open, onClose }) {
  if (!user) return null

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Chi tiết người dùng</DialogTitle>
        </DialogHeader>

        <div className='space-y-6'>
          <div className='flex justify-center'>
            <img
              src={user.avatar}
              alt={user.name}
              className='w-24 h-24 rounded-full object-cover'
            />
          </div>

          <div className='grid grid-cols-2 gap-4 text-sm'>
            <div>
              <div className='font-medium'>Tên</div>
              <div>{user.name}</div>
            </div>

            <div>
              <div className='font-medium'>Email</div>
              <div>{user.email}</div>
            </div>

            <div>
              <div className='font-medium'>Vai trò</div>
              <div className='capitalize'>{user.role}</div>
            </div>

            <div>
              <div className='font-medium'>Số dư</div>
              <div>{user.balance.toLocaleString()}₫</div>
            </div>

            <div>
              <div className='font-medium'>Điện thoại</div>
              <div>{user.phoneNumber || '--'}</div>
            </div>

            <div>
              <div className='font-medium'>Giới tính</div>
              <div className='capitalize'>
                {user.gender?.toLowerCase() || '--'}
              </div>
            </div>

            <div>
              <div className='font-medium'>Ngày sinh</div>
              <div>{dayjs(user.dob)}</div>
            </div>

            <div>
              <div className='font-medium'>Ngày tạo</div>
              <div>{dayjs(user.createdAt)}</div>
            </div>

            <div className='col-span-2'>
              <div className='font-medium'>Địa chỉ</div>
              <div>{user.address || '--'}</div>
            </div>

            <div className='col-span-2'>
              <div className='font-medium'>Giới thiệu</div>
              <div>{user.bio || '--'}</div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
