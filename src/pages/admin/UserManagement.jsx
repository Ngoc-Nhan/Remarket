import { UserTable } from '@/components/commons/admin'
import CreateOrUpdateUserForm from '@/components/commons/admin/CreateOrUpdateUserForm'
import { UserDetail } from '@/components/commons/admin/UserDetail'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import React from 'react'
export default function UserManagement() {
  const [selectedUser, setSelectedUser] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [formOpen, setFormOpen] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [detailOpen, setDetailOpen] = useState(false)

  const openEditForm = (selectedUser) => {
    setIsEditing(true)
    setFormOpen(true)
    setEditingUser(selectedUser)
  }

  const openCreateForm = () => {
    setIsEditing(false)
    setFormOpen(true)
  }

  const handleViewUser = (user) => {
    setSelectedUser(user)
    setDetailOpen(true)
  }

  return (
    <>
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6'>
        <h1 className='text-xl sm:text-2xl font-bold'>Quản lý người dùng</h1>
        <Button onClick={openCreateForm} className='w-full sm:w-auto'>
          + Thêm người dùng
        </Button>
      </div>

      <div className='bg-white rounded-lg shadow p-4 overflow-x-auto'>
        <UserTable onView={handleViewUser} onEdit={openEditForm} />
      </div>

      <CreateOrUpdateUserForm
        open={formOpen}
        isEditing={isEditing}
        onClose={() => {
          setFormOpen(false)
          setEditingUser(null)
        }}
        initialData={editingUser}
        onSuccess={() => {}}
      />

      <UserDetail
        user={selectedUser}
        open={detailOpen}
        onClose={() => {
          setDetailOpen(false)
          setSelectedUser(null)
        }}
      />
    </>
  )
}
