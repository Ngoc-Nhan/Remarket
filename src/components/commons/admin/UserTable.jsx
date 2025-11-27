import { Eye, Loader, Pencil, Trash } from 'lucide-react'
import React, { useState } from 'react'
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
import { useDebounce } from '@/hooks'
// import { useUserMutations, useUserQueryWithPagination } from '@/services/query';
import { toast } from 'sonner'
import { GlobalPopup, useGlobalPopup } from '../popup'

// type Props = {
// 	onView: (user: IUser) => void;
// 	onEdit: (user: IUser) => void;
// };

const ITEMS_PER_PAGE = 10

export function UserTable({ onView, onEdit }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const [deletingUserId, setDeletingUserId] = useState()
  // const { deleteUser } = useUserMutations()

  const search = searchParams.get('search') || ''
  const searchDebounced = useDebounce(search, 300)
  const page = parseInt(searchParams.get('page') || '1', 10)
  const { popupState, confirm, hidePopup } = useGlobalPopup()

  // const { data: users, isFetching } = useUserQueryWithPagination({
  //   page,
  //   limit: ITEMS_PER_PAGE,
  //   search: searchDebounced
  // })
  const users = {}
  const isFetching = false

  const setSearch = (value) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      next.set('search', value)
      next.set('page', '1')
      return next
    })
  }

  const goToPage = (pageNum) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      next.set('page', String(pageNum))
      return next
    })
  }

  const handleDeleteUser = async (user) => {
    confirm(
      'Xóa người dùng',
      `Bạn chắc chắn muốn xóa "${user.name}"?`,
      async () => {
        setDeletingUserId(user.id)
        // deleteUser.mutate(user.id, {
        //   onSuccess: () => {
        //     toast.success('Xóa người dùng thành công')
        //     setDeletingUserId(undefined)
        //   }
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
        placeholder='Tìm kiếm tên, email hoặc số điện thoại...'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className='mb-4'
      />

      <div className='overflow-x-auto -mx-4 sm:mx-0'>
        <div className='inline-block min-w-full align-middle'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className='w-[50px]'>Avatar</TableHead>
                <TableHead className='min-w-[120px]'>Tên</TableHead>
                <TableHead className='min-w-[180px]'>Email</TableHead>
                <TableHead className='min-w-[100px]'>Vai trò</TableHead>
                <TableHead className='min-w-[100px]'>Số dư</TableHead>
                <TableHead className='w-[120px] text-right'>
                  Hành động
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isFetching ? (
                <TableRow>
                  <TableCell colSpan={6}>
                    <div className='flex h-24 justify-center items-center'>
                      <Loader className='animate-spin' />
                    </div>
                  </TableCell>
                </TableRow>
              ) : users?.success ? (
                users.data.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6}>
                      <div className='text-center h-24 flex items-center justify-center'>
                        Không tìm thấy người dùng
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  users.data.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <img
                          src={user.avatar}
                          alt='avatar'
                          className='w-8 h-8 rounded-full object-cover'
                        />
                      </TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell className='capitalize'>{user.role}</TableCell>
                      <TableCell>{user.balance.toLocaleString()}₫</TableCell>
                      <TableCell className='text-right space-x-1'>
                        <Button
                          disabled={deleteUser.isPending}
                          size='icon'
                          variant='outline'
                          onClick={() => onView(user)}
                        >
                          <Eye className='w-4 h-4' />
                        </Button>
                        <Button
                          disabled={deleteUser.isPending}
                          size='icon'
                          variant='outline'
                          onClick={() => onEdit(user)}
                        >
                          <Pencil className='w-4 h-4' />
                        </Button>
                        <Button
                          disabled={deleteUser.isPending}
                          size='icon'
                          variant='destructive'
                          onClick={() => handleDeleteUser(user)}
                        >
                          {deletingUserId === user.id ? (
                            <Loader className='animate-spin' />
                          ) : (
                            <Trash className='w-4 h-4' />
                          )}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )
              ) : (
                <div>
                  <TableRow>
                    <TableCell colSpan={6} className='text-center'>
                      {users?.message || 'Lỗi khi tải người dùng'}
                    </TableCell>
                  </TableRow>
                </div>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {users?.success && users.pagination.totalPages > 1 && (
        <div className='flex flex-col sm:flex-row justify-between items-center gap-4 pt-4'>
          <Button
            onClick={() => goToPage(page - 1)}
            disabled={page === 1}
            className='w-full sm:w-auto'
          >
            Trang trước
          </Button>
          <span className='text-sm text-gray-600'>
            Trang {page} / {users.pagination.totalPages}
          </span>
          <Button
            onClick={() => goToPage(page + 1)}
            disabled={page === users.pagination.totalPages}
            className='w-full sm:w-auto'
          >
            Trang sau
          </Button>
        </div>
      )}
    </div>
  )
}
