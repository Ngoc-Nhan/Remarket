import { Eye, Loader, Pencil, Trash } from 'lucide-react'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
// import { QUERY_KEY } from '@/config/key'
import { useDebounce } from '@/hooks/useDebounce'
// import { useCategoryMutations, useGetCategories } from '@/services/query/category';
// import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { GlobalPopup, useGlobalPopup } from '../popup'
import React from 'react'
import { categoriesMock } from '@/constant/constant'

const ITEMS_PER_PAGE = 10

export function CategoryTable({ onView, onEdit }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const [deletingCategoryId, setDeletingCategoryId] = useState()
  // const { deleteCategory } = useCategoryMutations()
  const { popupState, confirm, hidePopup } = useGlobalPopup()

  // const queryClient = useQueryClient()
  const search = searchParams.get('search') || ''
  const searchDebounced = useDebounce(search, 300)
  const isFetching = false
  const categories = categoriesMock
  const page = parseInt(searchParams.get('page') || '1', 10)
  // const { data: categories, isFetching } = useGetCategories({
  //   page,
  //   limit: ITEMS_PER_PAGE,
  //   search: searchDebounced
  // })

  const setSearch = (value) => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        next.set('search', value)
        next.set('page', '1')
        return next
      },
      { replace: true }
    )
  }

  const goToPage = (pageNum) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      next.set('page', String(pageNum))
      return next
    })
  }

  const handleDelete = (category) => {
    confirm(
      'Xóa danh mục',
      `Bạn chắc chắn muốn xóa "${category.name}"?`,
      async () => {
        setDeletingCategoryId(category.id)
        // deleteCategory.mutate(category.id, {
        //   onSuccess: (res) => {
        //     if (!categories?.success) return
        //     if (!res.success) {
        //       toast.error(res.message || 'Xóa danh mục thất bại')
        //       return
        //     }

        //     toast.success('Xóa danh mục thành công')
        //     // If this is the last item on the page (except page 1), go to previous page
        //     if (categories.data.length === 1 && page > 1) {
        //       goToPage(page - 1)
        //     }
        //     queryClient.invalidateQueries({
        //       queryKey: QUERY_KEY.getAllCategories()
        //     })
        // }
        // })
      }
    )
  }

  return (
    <div className='space-y-4'>
      <GlobalPopup
        {...popupState.config}
        isOpen={popupState.isOpen}
        onClose={hidePopup}
      />
      <Input
        placeholder='Tìm kiếm tên danh mục...'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className='mb-4'
      />

      <div className='overflow-x-auto -mx-4 sm:mx-0'>
        <div className='inline-block min-w-full align-middle'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className='min-w-[200px]'>Tên danh mục</TableHead>
                <TableHead className='min-w-[180px]'>Ngày tạo</TableHead>
                <TableHead className='text-right w-[120px]'>
                  Hành động
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isFetching ? (
                <TableRow>
                  <TableCell colSpan={3}>
                    <div className='flex h-24 justify-center items-center'>
                      <Loader className='animate-spin' />
                    </div>
                  </TableCell>
                </TableRow>
              ) : categories?.success ? (
                categories.data.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3}>
                      <div className='text-center h-24 flex items-center justify-center'>
                        Không tìm thấy danh mục nào
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  categories.data.map((category) => (
                    <TableRow key={category.id}>
                      <TableCell>{category.name}</TableCell>
                      <TableCell>
                        {new Date(category.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className='text-right space-x-1'>
                        <Button
                          disabled={deleteCategory.isPending}
                          size='icon'
                          variant='outline'
                          onClick={() => onView(category)}
                        >
                          <Eye className='w-4 h-4' />
                        </Button>
                        <Button
                          disabled={deleteCategory.isPending}
                          size='icon'
                          variant='outline'
                          onClick={() => onEdit(category)}
                        >
                          <Pencil className='w-4 h-4' />
                        </Button>
                        <Button
                          disabled={deleteCategory.isPending}
                          size='icon'
                          variant='destructive'
                          onClick={() => handleDelete(category)}
                        >
                          {deletingCategoryId === category.id ? (
                            <Loader className='animate-spin w-4 h-4' />
                          ) : (
                            <Trash className='w-4 h-4' />
                          )}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )
              ) : (
                <TableRow>
                  <TableCell colSpan={3}>
                    <div className='text-center h-24 flex items-center justify-center'>
                      {categories?.message || 'Lỗi khi tải danh mục'}
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {categories?.success && categories.pagination.totalPages > 1 && (
        <div className='flex flex-col sm:flex-row justify-between items-center gap-4 pt-4'>
          <Button
            onClick={() => goToPage(page - 1)}
            disabled={page === 1}
            className='w-full sm:w-auto'
          >
            Trang trước
          </Button>
          <span className='text-sm text-gray-600'>
            Trang {page} / {categories.pagination.totalPages}
          </span>
          <Button
            onClick={() => goToPage(page + 1)}
            disabled={page === categories.pagination.totalPages}
            className='w-full sm:w-auto'
          >
            Trang sau
          </Button>
        </div>
      )}
    </div>
  )
}
