import React, { useState, useRef, useEffect } from 'react'
import { toast } from 'sonner'
import { Camera, Info, X as CloseIcon } from 'lucide-react'
import AddressDialog from './AddressDialog'
import { uploadFileToCloudinary } from '@/services/api/cloudinary'
import { updateListingAPI } from '@/apis'
import { categoriesMock } from '@/constant/constant'

export default function EditPostModal({
  isOpen,
  onClose,
  post,
  onPostUpdated
}) {
  if (!isOpen || !post) return null

  // Form states, initialized with post data
  const [title, setTitle] = useState(post.title || '')
  const [description, setDescription] = useState(post.description || '')
  const [price, setPrice] = useState(post.price || '')
  const [category, setCategory] = useState(post.categoryId || '')
  const [address, setAddress] = useState(post.location || '')

  // Image states
  const [imageFiles, setImageFiles] = useState([]) // For new file uploads
  const [imageUrls, setImageUrls] = useState(post.images || []) // For existing and new preview urls
  const fileInputRef = useRef(null)

  // Control states
  const [showAddressDialog, setShowAddressDialog] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}
    if (!title.trim()) newErrors.title = 'Vui lòng điền tiêu đề'
    if (!description.trim()) newErrors.description = 'Vui lòng nhập mô tả'
    if (!category) newErrors.category = 'Vui lòng chọn danh mục'
    if (!price.toString().trim() || isNaN(Number(price)))
      newErrors.price = 'Vui lòng nhập giá bán hợp lệ'
    if (!address) newErrors.address = 'Vui lòng chọn địa chỉ'
    if (imageUrls.length === 0) newErrors.images = 'Bạn cần có ít nhất 1 ảnh'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files)
    const totalImages = imageUrls.length + files.length

    if (totalImages > 6) {
      toast.error('Bạn chỉ có thể đăng tối đa 6 hình ảnh.')
      return
    }

    const newImageFiles = [...imageFiles, ...files]
    const newImageUrls = [
      ...imageUrls,
      ...files.map((file) => URL.createObjectURL(file))
    ]

    setImageFiles(newImageFiles)
    setImageUrls(newImageUrls)
  }

  const handleRemoveImage = (index) => {
    const urlToRemove = imageUrls[index]
    // Check if it's a blob URL (newly uploaded file)
    if (urlToRemove.startsWith('blob:')) {
      const fileIndex = imageUrls
        .slice(0, index)
        .filter((u) => u.startsWith('blob:')).length
      setImageFiles((prev) => prev.filter((_, i) => i !== fileIndex))
    }
    setImageUrls((prev) => prev.filter((_, i) => i !== index))
    URL.revokeObjectURL(urlToRemove)
  }

  const handleSubmit = async () => {
    if (!validateForm()) return

    setIsSubmitting(true)
    try {
      // 1. Upload new images to Cloudinary
      const uploadPromises = imageFiles.map((file) =>
        uploadFileToCloudinary(file, 'image')
      )
      const uploadResults = await Promise.all(uploadPromises)

      const newUploadedUrls = uploadResults.map((res) => {
        if (res.success) return res.data.secure_url
        throw new Error('Tải ảnh lên thất bại.')
      })

      // 2. Combine old and new image URLs
      const finalImageUrls = imageUrls
        .filter((url) => !url.startsWith('blob:'))
        .concat(newUploadedUrls)

      // 3. Construct payload
      const payload = {
        title,
        description,
        price: Number(price),
        location: address,
        categoryId: category,
        images: finalImageUrls
      }

      // 4. Call API to update
      const updatedPost = await updateListingAPI(post._id, payload)

      if (updatedPost) {
        toast.success('Cập nhật tin đăng thành công!')
        onPostUpdated() // Callback to refresh the list
        onClose() // Close modal
      } else {
        throw new Error('Cập nhật thất bại.')
      }
    } catch (error) {
      toast.error(error.message || 'Đã có lỗi xảy ra.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className='fixed inset-0 flex justify-center items-center bg-black/40 z-50 p-4'>
      <div className='relative bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6'>
        <h3 className='text-xl font-semibold text-gray-800 mb-6 text-center'>
          Chỉnh sửa tin đăng
        </h3>
        <button
          onClick={onClose}
          className='absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl'
        >
          <CloseIcon size={24} />
        </button>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {/* Left Column: Images */}
          <div className='space-y-3'>
            <h4 className='font-medium'>Hình ảnh sản phẩm</h4>
            <div className='flex flex-wrap gap-3'>
              {imageUrls.map((url, idx) => (
                <div
                  key={idx}
                  className='relative w-28 h-28 rounded-lg overflow-hidden border'
                >
                  <img
                    src={url}
                    alt={`preview-${idx}`}
                    className='object-cover w-full h-full'
                  />
                  <button
                    type='button'
                    className='absolute top-1 right-1 bg-black bg-opacity-50 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600'
                    onClick={() => handleRemoveImage(idx)}
                  >
                    ×
                  </button>
                </div>
              ))}
              {imageUrls.length < 6 && (
                <div
                  className='w-28 h-28 border-2 border-dashed border-orange-300 rounded-lg flex items-center justify-center cursor-pointer bg-gray-50 hover:bg-gray-100'
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className='text-center'>
                    <Camera className='w-8 h-8 text-orange-400 mx-auto' />
                    <span className='text-xs text-gray-500 mt-1'>Thêm ảnh</span>
                  </div>
                </div>
              )}
            </div>
            <input
              ref={fileInputRef}
              type='file'
              multiple
              accept='image/*'
              onChange={handleImageUpload}
              className='hidden'
            />
            {errors.images && (
              <p className='text-xs text-red-500'>{errors.images}</p>
            )}
          </div>

          {/* Right Column: Info */}
          <div className='space-y-4'>
            <div>
              <label className='label-text font-medium'>Tiêu đề *</label>
              <input
                type='text'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={`input input-bordered w-full mt-1 ${
                  errors.title ? 'input-error' : ''
                }`}
              />
              {errors.title && (
                <p className='text-xs text-red-500 mt-1'>{errors.title}</p>
              )}
            </div>

            <div>
              <label className='label-text font-medium'>Mô tả *</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={`textarea textarea-bordered w-full h-24 mt-1 ${
                  errors.description ? 'textarea-error' : ''
                }`}
              />
              {errors.description && (
                <p className='text-xs text-red-500 mt-1'>
                  {errors.description}
                </p>
              )}
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label className='label-text font-medium'>Giá (VNĐ) *</label>
                <input
                  type='number'
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className={`input input-bordered w-full mt-1 ${
                    errors.price ? 'input-error' : ''
                  }`}
                />
                {errors.price && (
                  <p className='text-xs text-red-500 mt-1'>{errors.price}</p>
                )}
              </div>
              <div>
                <label className='label-text font-medium'>Danh mục *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className={`select select-bordered w-full mt-1 ${
                    errors.category ? 'select-error' : ''
                  }`}
                >
                  <option value=''>Chọn danh mục</option>
                  {categoriesMock.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className='text-xs text-red-500 mt-1'>{errors.category}</p>
                )}
              </div>
            </div>

            <div>
              <label className='label-text font-medium'>Địa chỉ *</label>
              <div
                className={`input input-bordered flex items-center cursor-pointer mt-1 ${
                  errors.address ? 'input-error' : ''
                }`}
                onClick={() => setShowAddressDialog(true)}
              >
                <p className='text-sm truncate'>{address || 'Chọn địa chỉ'}</p>
              </div>
              {errors.address && (
                <p className='text-xs text-red-500 mt-1'>{errors.address}</p>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className='flex justify-end gap-3 pt-6 mt-6 border-t'>
          <button
            className='btn btn-outline'
            onClick={onClose}
            disabled={isSubmitting}
          >
            Hủy
          </button>
          <button
            className='btn btn-warning'
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className='loading loading-spinner loading-sm'></span>
                Đang lưu...
              </>
            ) : (
              'Lưu thay đổi'
            )}
          </button>
        </div>

        {/* Address Dialog */}
        {showAddressDialog && (
          <AddressDialog
            isOpen={showAddressDialog}
            onClose={() => setShowAddressDialog(false)}
            onSave={(value) => {
              const fullAddress = `${value.specificAddress}, ${value.wardLabel}, ${value.provinceLabel}`
              setAddress(fullAddress)
              setShowAddressDialog(false)
            }}
            initialAddress={
              {
                // Cần phân tách chuỗi địa chỉ ra các thành phần để truyền vào
              }
            }
          />
        )}
      </div>
    </div>
  )
}
