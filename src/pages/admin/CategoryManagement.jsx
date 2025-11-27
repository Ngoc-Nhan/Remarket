import {
  CategoryDetail,
  CategoryTable,
  CreateOrUpdateCategoryForm
} from '@/components/commons/admin'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import React from 'react'
export default function CategoryManagement() {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [formOpen, setFormOpen] = useState(false)
  const [detailOpen, setDetailOpen] = useState(false)

  const handleEdit = (category) => {
    setSelectedCategory(category)
    setFormOpen(true)
  }

  const handleView = (category) => {
    setSelectedCategory(category)
    setDetailOpen(true)
  }

  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-bold'>Quản lý danh mục</h1>
        <Button onClick={() => setFormOpen(true)}>
          <Plus className='w-4 h-4 mr-2' />
          Thêm danh mục
        </Button>
      </div>

      <CategoryTable onEdit={handleEdit} onView={handleView} />

      <CreateOrUpdateCategoryForm
        open={formOpen}
        initialData={selectedCategory}
        onClose={() => {
          setFormOpen(false)
          setSelectedCategory(null)
        }}
      />

      <CategoryDetail
        open={detailOpen}
        category={selectedCategory}
        onClose={() => {
          setDetailOpen(false)
          setSelectedCategory(null)
        }}
        onEdit={(category) => {
          setDetailOpen(false)
          handleEdit(category)
        }}
      />
    </div>
  )
}
