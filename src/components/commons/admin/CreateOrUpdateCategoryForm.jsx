import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
// import { createCategoryAPI, updateCategoryAPI } from '@/services/api/category';
// import { useQueryClient } from '@tanstack/react-query';
// import { QUERY_KEY } from '@/config/key'

export function CreateOrUpdateCategoryForm({ open, onClose, initialData }) {
  const isEditing = !!initialData
  const [name, setName] = useState('')
  const [errors, setErrors] = useState({ name: '' })
  const [loading, setLoading] = useState(false)
  // const queryClient = useQueryClient()

  useEffect(() => {
    if (initialData) {
      setName(initialData.name)
    } else {
      setName('')
    }
  }, [initialData])

  useEffect(() => {
    setErrors({ name: '' })
  }, [open])

  const handleSubmit = async () => {
    if (!name.trim()) {
      setErrors({ name: 'Tên không được bỏ trống' })
      return
    } else {
      setErrors({ name: '' })
    }
    try {
      setLoading(true)
      // if (isEditing && initialData) {
      //   await updateCategoryAPI(initialData.id, { name: name.trim() })
      //   toast.success('Cập nhật danh mục thành công')
      // } else {
      //   await createCategoryAPI({ name: name.trim() })
      //   toast.success('Tạo danh mục mới thành công')
      // }
      // queryClient.invalidateQueries({ queryKey: QUERY_KEY.getAllCategories() })
      onClose()
    } catch (err) {
      toast.error('Có lỗi xảy ra: ' + err.message)
    } finally {
      setLoading(false)
      setName('')
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Sửa danh mục' : 'Thêm danh mục mới'}
          </DialogTitle>
        </DialogHeader>
        <div className='space-y-4'>
          <Input
            placeholder='Tên danh mục'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <p className='text-red-500 text-xs'>{errors.name}</p>
          <div className='flex justify-end gap-2 pt-4'>
            <Button variant='outline' onClick={onClose}>
              Hủy
            </Button>
            <Button disabled={loading} onClick={handleSubmit}>
              {loading ? 'Đang lưu...' : isEditing ? 'Cập nhật' : 'Tạo mới'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
