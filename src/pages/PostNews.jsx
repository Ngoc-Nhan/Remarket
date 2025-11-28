import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Camera, Info } from 'lucide-react'
// import { uploadFileToCloudinary } from '@/services/api/cloudinary'
// import { useCreatePost } from '@/services/query/post'
// import { useGetCategories } from '@/services/query/category'
// import { AddressDialog } from '@/components/dialog/AddressDialog'
import { toast } from 'sonner'
import React from 'react'
import AddressDialog from '../components/dialog/AddressDialog'
import { uploadFileToCloudinary } from '@/services/api/cloudinary'
import { categoriesMock } from '@/constant/constant'
import { createListingAPI } from '@/apis'

export default function PostNews() {
  const navigate = useNavigate()

  // Image states
  const [selectedImages, setSelectedImages] = useState([])
  const [previewUrls, setPreviewUrls] = useState([])
  const fileInputRef = useRef(null)

  // Form states
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [age, setAge] = useState('')
  const [size, setSize] = useState('')
  const [category, setCategory] = useState('')
  const [address, setAddress] = useState(null)
  const [showAddressDialog, setShowAddressDialog] = useState(false)

  // Loading and error states
  const [isUploading, setIsUploading] = useState(false)
  const [errors, setErrors] = useState({})

  // API calls
  // const { data: categoriesData, isLoading: isCategoriesLoading } =
  //   useGetCategories({
  //     page: 1,
  //     limit: 100
  //   })
  const isCategoriesLoading = false
  const categories = categoriesMock
  const createPostMutation = { isPending: false, mutate: () => {} }
  // const categories =
  //   categoriesData && 'data' in categoriesData && categoriesData.success
  //     ? categoriesData.data
  //     : []

  // const createPostMutation = useCreatePost()

  // Cleanup preview URLs on unmount
  useEffect(() => {
    console.log('console.log(previewUrls)', previewUrls)
    return () => {
      previewUrls.forEach((url) => URL.revokeObjectURL(url))
    }
  }, [previewUrls])

  const handleImageUpload = (event) => {
    const files = event.target.files
    if (files) {
      let fileArr = Array.from(files)
      if (selectedImages.length > 0) {
        fileArr = [...selectedImages, ...fileArr].slice(0, 6)
      } else {
        fileArr = fileArr.slice(0, 6)
      }
      previewUrls.forEach((url) => URL.revokeObjectURL(url))
      setSelectedImages(fileArr)
      setPreviewUrls(fileArr.map((file) => URL.createObjectURL(file)))
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  const handleRemoveImage = (idx) => {
    setSelectedImages((prev) => {
      URL.revokeObjectURL(previewUrls[idx])
      const newArr = prev.filter((_, i) => i !== idx)
      previewUrls.forEach((url, i) => {
        if (i !== idx) URL.revokeObjectURL(url)
      })
      setPreviewUrls(newArr.map((file) => URL.createObjectURL(file)))
      return newArr
    })
  }

  // Drag & drop reorder
  const dragItem = useRef(null)
  const dragOverItem = useRef(null)

  const handleDragStart = (idx) => {
    dragItem.current = idx
  }

  const handleDragEnter = (idx) => {
    dragOverItem.current = idx
  }

  const handleDragEnd = () => {
    const from = dragItem.current
    const to = dragOverItem.current
    if (from === null || to === null || from === to) return

    const newFiles = [...selectedImages]
    const [file] = newFiles.splice(from, 1)
    newFiles.splice(to, 0, file)

    previewUrls.forEach((url) => URL.revokeObjectURL(url))
    setSelectedImages(newFiles)
    setPreviewUrls(newFiles.map((file) => URL.createObjectURL(file)))

    dragItem.current = null
    dragOverItem.current = null
  }

  const validateForm = () => {
    const newErrors = {}

    if (!title.trim()) {
      newErrors.title = 'Vui lòng điền tiêu đề'
    }

    const wordCount = description.trim().split(/\s+/).length
    if (!description.trim() || wordCount < 10) {
      newErrors.description = 'Vui lòng nhập ít nhất 10 từ'
    }

    if (!category) {
      newErrors.category = 'Vui lòng chọn danh mục'
    }

    if (!price.trim() || isNaN(Number(price))) {
      newErrors.price = 'Vui lòng nhập giá bán hợp lệ'
    }

    if (!address || !address.province || !address.ward) {
      newErrors.address = 'Vui lòng chọn đầy đủ địa chỉ'
    }

    if (selectedImages.length === 0) {
      newErrors.images = 'Bạn cần đăng ít nhất 1 ảnh'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (validateForm()) {
      let uploadedImageUrls = []

      if (selectedImages.length > 0) {
        setIsUploading(true)
        const uploadPromises = selectedImages.map((file) =>
          uploadFileToCloudinary(file, 'image')
        )

        try {
          const results = await Promise.all(uploadPromises)
          for (const res of results) {
            if (res.success && res.data && res.data.secure_url) {
              uploadedImageUrls.push(res.data.secure_url)
            } else {
              setIsUploading(false)
              setErrors((prev) => ({
                ...prev,
                images: 'Có ảnh không upload được, hãy thử lại.'
              }))
              return
            }
          }
        } catch (error) {
          setIsUploading(false)
          toast.error('Lỗi upload ảnh, vui lòng thử lại')
          return
        }
      }

      const payload = {
        title,
        description,
        price: Number(price),
        location: address
          ? `${address.specificAddress}, ${address.wardLabel}, ${address.provinceLabel}`
          : '',
        categoryId: category,
        images: uploadedImageUrls.map((url) => url)
      }

      await createListingAPI(payload)
        .then((res) => {
          if (res._id) {
            toast.success('Đăng tin thành công')
            navigate('/ManagePost')
          } else {
            toast.error('Đăng tin thất bại')
          }
        })
        .catch((err) => {
          toast.error('Đăng tin thất bại')
        })
        .finally(() => {
          setIsUploading(false)
        })
    }
  }

  const handleCancel = () => {
    navigate(-1)
  }

  return (
    <div className='min-h-screen bg-gray-100 py-6'>
      <div className='container  mx-auto max-w-7xl px-4'>
        <div className='bg-white p-4 rounded-lg shadow-sm'>
          <div className='grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] px-5 gap-5'>
            {/* Image Upload Section */}
            <div className='space-y-3'>
              <h3 className='text-lg font-semibold mb-10'>
                Hình ảnh và Video sản phẩm
              </h3>
              <p className='text-sm text-gray-600'>
                Xem thêm{' '}
                <a href='#' className='text-blue-600 hover:underline'>
                  Quy định đăng tin của SecondHandShop
                </a>
              </p>

              <div>
                {previewUrls.length === 0 ? (
                  <div
                    className='relative border-2 border-dashed border-orange-300 rounded-lg p-4 bg-gray-50 w-[300px] cursor-pointer hover:bg-gray-100 transition'
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <div
                      className='absolute right-2 top-1 flex items-center gap-1 select-none'
                      style={{ zIndex: 2 }}
                    >
                      <Info className='w-3 h-3 text-blue-500' />
                      <span className='text-xs text-blue-500 font-normal leading-none'>
                        Hình ảnh hợp lệ
                      </span>
                    </div>
                    <div className='flex flex-col items-center space-y-3 justify-center h-full'>
                      <div className='w-20 h-20 border-2 border-dashed border-orange-300 rounded-lg flex items-center justify-center'>
                        <Camera className='w-8 h-8 text-orange-400' />
                      </div>
                      <p className='text-gray-600 text-sm text-center'>
                        ĐĂNG TỪ 01 ĐẾN 06 HÌNH
                      </p>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className='flex flex-wrap gap-3'>
                      {previewUrls.map((url, idx) => (
                        <div
                          key={idx}
                          className='relative w-32 h-24 rounded overflow-hidden border border-orange-300 bg-white flex items-center justify-center'
                          draggable
                          onDragStart={() => handleDragStart(idx)}
                          onDragEnter={() => handleDragEnter(idx)}
                          onDragEnd={handleDragEnd}
                          onDragOver={(e) => e.preventDefault()}
                        >
                          <img
                            src={url}
                            alt={`preview-${idx}`}
                            className='object-cover w-full h-full'
                          />
                          <button
                            type='button'
                            className='absolute top-1 right-1 bg-black bg-opacity-60 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition'
                            onClick={() => handleRemoveImage(idx)}
                            tabIndex={-1}
                          >
                            ×
                          </button>
                          {idx === 0 && (
                            <span className='absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white text-xs text-center py-1'>
                              Hình bìa
                            </span>
                          )}
                        </div>
                      ))}
                      {previewUrls.length < 6 && (
                        <div
                          className='w-32 h-24 border-2 border-dashed border-orange-300 rounded flex items-center justify-center cursor-pointer bg-gray-50 hover:bg-gray-100 transition'
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <span className='text-3xl text-orange-400 font-bold'>
                            +
                          </span>
                        </div>
                      )}
                    </div>
                    <p className='text-xs text-gray-500 mt-2'>
                      Nhấn và giữ để di chuyển hình ảnh
                    </p>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type='file'
                  multiple
                  accept='image/*'
                  onChange={handleImageUpload}
                  className='hidden'
                  id='file-upload'
                />
              </div>
            </div>

            {/* Form Section */}
            <div className='space-y-4 -ml-4'>
              {errors.images && (
                <div className='mb-2'>
                  <div className='alert alert-error'>
                    <svg
                      className='stroke-current shrink-0 h-6 w-6'
                      fill='none'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M10 14l-2-2m0 0l-2-2m2 2l2-2m-2 2l-2 2m8-2l2 2m0 0l2 2m-2-2l-2-2m2 2l2 2M9 19H5a2 2 0 01-2-2V7a2 2 0 012-2h4m0 0h8a2 2 0 012 2v10a2 2 0 01-2 2h-8m-4-2h.01M9 15h.01'
                      />
                    </svg>
                    <span>{errors.images}</span>
                  </div>
                </div>
              )}

              {/* Category */}
              <div>
                <label className='form-control w-full'>
                  <div className='label'>
                    <span className='label-text font-medium'>
                      Danh Mục Tin Đăng *
                    </span>
                  </div>
                  <select
                    id='category'
                    className={`select select-bordered w-full ${
                      errors.category ? 'select-error' : ''
                    }`}
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    disabled={isCategoriesLoading || !categories}
                  >
                    <option value=''>
                      {isCategoriesLoading ? 'Đang tải...' : 'Chọn danh mục'}
                    </option>
                    {categories &&
                      categories.length > 0 &&
                      categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                  </select>
                  {errors.category && (
                    <div className='label'>
                      <span className='label-text-alt text-error'>
                        {errors.category}
                      </span>
                    </div>
                  )}
                </label>
              </div>

              {/* Detailed Info */}
              <div>
                <h3 className='text-lg font-semibold mb-4 mt-8'>
                  Thông tin chi tiết
                </h3>
                <div className='space-y-3'>
                  {/* Price */}
                  <div>
                    <label className='form-control w-full'>
                      <div className='label'>
                        <span className='label-text text-sm'>Giá bán *</span>
                      </div>
                      <input
                        id='price'
                        type='number'
                        placeholder='Nhập giá bán'
                        className={`input input-bordered w-full ${
                          errors.price ? 'input-error' : ''
                        }`}
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                      />
                      {errors.price && (
                        <div className='label'>
                          <span className='label-text-alt text-error'>
                            {errors.price}
                          </span>
                        </div>
                      )}
                    </label>
                  </div>
                </div>
              </div>

              {/* Title & Description */}
              <div>
                <h3 className='text-lg font-semibold mb-4 mt-12'>
                  Tiêu đề tin đăng và Mô tả chi tiết
                </h3>
                <div className='space-y-4'>
                  <div>
                    <label className='form-control w-full'>
                      <div className='label'>
                        <span className='label-text text-sm'>
                          Tiêu đề tin đăng *
                        </span>
                        <span className='label-text-alt text-xs text-gray-500'>
                          {title.length}/50 kí tự
                        </span>
                      </div>
                      <input
                        id='post-title'
                        type='text'
                        placeholder='Nhập tiêu đề...'
                        className={`input input-bordered w-full ${
                          errors.title ? 'input-error' : ''
                        }`}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        maxLength={50}
                      />
                      {errors.title && (
                        <div className='label'>
                          <span className='label-text-alt text-error'>
                            {errors.title}
                          </span>
                        </div>
                      )}
                    </label>
                  </div>

                  <div>
                    <label className='form-control w-full'>
                      <div className='label'>
                        <span className='label-text text-sm'>
                          Mô tả chi tiết *
                        </span>
                        <span className='label-text-alt text-xs text-gray-500'>
                          {description.length}/1500 kí tự
                        </span>
                      </div>
                      <textarea
                        id='detailed-description'
                        placeholder='Mô tả chi tiết về sản phẩm của bạn...'
                        className={`textarea textarea-bordered w-full h-24 ${
                          errors.description ? 'textarea-error' : ''
                        }`}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        maxLength={1500}
                      />
                      {errors.description && (
                        <div className='label'>
                          <span className='label-text-alt text-error'>
                            {errors.description}
                          </span>
                        </div>
                      )}
                    </label>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div>
                <h3 className='text-lg font-semibold mb-4 pb-2 mt-12'>
                  Thông tin người bán
                </h3>
                <div className='space-y-3'>
                  <label className='form-control w-full'>
                    <div className='label'>
                      <span className='label-text text-sm'>Khu vực *</span>
                    </div>
                    <div
                      className={`input input-bordered flex items-center cursor-pointer ${
                        errors.address ? 'input-error' : ''
                      }`}
                      onClick={() => setShowAddressDialog(true)}
                    >
                      {address ? (
                        <p className='text-sm'>
                          {address.specificAddress}
                          {address.specificAddress ? ', ' : ''}
                          {address.wardLabel}
                          {address.wardLabel ? ', ' : ''}
                          {address.provinceLabel}
                        </p>
                      ) : (
                        <p className='text-gray-400 text-sm'>Chọn địa chỉ</p>
                      )}
                    </div>
                    {errors.address && (
                      <div className='label'>
                        <span className='label-text-alt text-error'>
                          {errors.address}
                        </span>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              {/* Action Buttons */}
              <div className='flex justify-end gap-3 pt-4'>
                <button className='btn btn-outline' onClick={handleCancel}>
                  Hủy
                </button>
                <button
                  className='btn btn-warning'
                  onClick={handleSubmit}
                  disabled={createPostMutation.isPending || isUploading}
                >
                  {createPostMutation.isPending || isUploading ? (
                    <>
                      <span className='loading loading-spinner loading-sm'></span>
                      Đang xử lý...
                    </>
                  ) : (
                    'Đăng tin'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Address Dialog */}
        {showAddressDialog && (
          <AddressDialog
            isOpen={showAddressDialog}
            onClose={() => setShowAddressDialog(false)}
            onSave={(value) => {
              setAddress(value)
              setShowAddressDialog(false)
            }}
            initialAddress={address || undefined}
          />
        )}
      </div>
    </div>
  )
}
