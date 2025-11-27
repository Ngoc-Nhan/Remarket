import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'

// interface CategoryDetailProps {
// 	open: boolean;
// 	category: Category | null;
// 	onClose: () => void;
// 	onEdit: (category: Category) => void;
// }

export function CategoryDetail({ open, category, onClose, onEdit }) {
  if (!category) return null

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader className='relative'>
          <DialogTitle className='text-center text-xl'>
            Chi tiết danh mục
          </DialogTitle>
        </DialogHeader>

        <div className='space-y-4 pt-4'>
          <div className='grid grid-cols-3 gap-2 items-center'>
            <span className='font-medium'>ID:</span>
            <span className='col-span-2 break-all'>{category.id}</span>
          </div>
          <div className='grid grid-cols-3 gap-2 items-center'>
            <span className='font-medium'>Tên:</span>
            <span className='col-span-2'>{category.name}</span>
          </div>
          <div className='grid grid-cols-3 gap-2 items-center'>
            <span className='font-medium'>Ngày tạo:</span>
            <span className='col-span-2'>
              {new Date(category.createdAt).toLocaleString()}
            </span>
          </div>
          <div className='grid grid-cols-3 gap-2 items-center'>
            <span className='font-medium'>Cập nhật:</span>
            <span className='col-span-2'>
              {new Date(category.updatedAt).toLocaleString()}
            </span>
          </div>
          {category.deletedAt && (
            <div className='grid grid-cols-3 gap-2 items-center text-red-500'>
              <span className='font-medium'>Đã xóa:</span>
              <span className='col-span-2'>
                {new Date(category.deletedAt).toLocaleString()}
              </span>
            </div>
          )}
        </div>

        <div className='flex justify-end gap-2 pt-4'>
          <Button variant='outline' onClick={onClose}>
            Đóng
          </Button>
          <Button onClick={() => onEdit(category)}>Chỉnh sửa</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
