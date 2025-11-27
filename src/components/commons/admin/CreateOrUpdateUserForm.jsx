import { uploadFileToCloudinary } from '@/services/api/cloudinary'
// import { useUserMutations } from '@/services/query'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { trimData } from '@/helper'
import { useLoading } from '@/hooks'
import { validate } from '@/lib/validation'
import {
  createUserValidationSchema,
  updateUserValidationSchema
} from '@/lib/validation-schemas'

// type Props = {
// 	open: boolean;
// 	isEditing: boolean;
// 	onClose: () => void;
// 	initialData?: IUser | null;
// 	onSuccess: () => void;
// };

export default function CreateOrUpdateUserForm({
  open,
  onClose,
  isEditing,
  initialData
}) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    avatar: '',
    address: '',
    phoneNumber: '',
    bio: '',
    dateOfBirth: '',
    gender: 'MALE',
    role: 'USER'
  })
  const [file, setFile] = useState()
  const [errors, setErrors] = useState({
    address: '',
    bio: '',
    dateOfBirth: '',
    email: '',
    name: '',
    password: '',
    phoneNumber: '',
    gender: ''
  })

  const { loading: isUploadingImage, execute: uploadImage } = useLoading()
  // const { updateUser, createUser } = useUserMutations()
  const updateUser = {}
  const createUser = {}

  const resetFormData = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      avatar: '',
      address: '',
      phoneNumber: '',
      bio: '',
      dateOfBirth: '',
      gender: 'MALE',
      role: 'USER'
    })
  }

  const resetErrors = () => {
    setErrors({
      address: '',
      bio: '',
      dateOfBirth: '',
      email: '',
      name: '',
      password: '',
      phoneNumber: '',
      gender: ''
    })
  }

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        email: initialData.email,
        password: '',
        avatar: initialData.avatar,
        address: initialData.address || '',
        phoneNumber: initialData.phoneNumber || '',
        bio: initialData.bio || '',
        dateOfBirth: initialData.dob || '',
        gender: initialData.gender || 'MALE',
        role: initialData.role
      })
    } else {
      resetFormData()
    }
  }, [initialData])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleValidateForm = (validationSchema) => {
    const { isValid, errors } = validate(formData, validationSchema)

    setErrors(errors)
    return isValid
  }

  const handleUploadImage = async () => {
    if (file) {
      const res = await uploadFileToCloudinary(file)
      if (res.success) {
        return res.data.secure_url
      } else {
        toast.error(res.message)
        return ''
      }
    }
  }

  const handleSubmit = async () => {
    await uploadImage(async () => {
      if (isEditing) {
        await handleUpdateUser()
      } else {
        handleCreateUser()
      }
    })
  }

  // const handleUpdateUser = async () => {
  //   const isValid = handleValidateForm(updateUserValidationSchema)
  //   if (!initialData?.id || !isValid) return

  //   const avatar = (await handleUploadImage()) || formData.avatar
  //   // const { email, password, role, ...trimmedFormData } =
  //   //   trimData < typeof formData > formData
  //   // updateUser.mutate(
  //   //   {
  //   //     id: initialData.id,
  //   //     data: {
  //   //       ...trimmedFormData,
  //   //       avatar,
  //   //       ...(trimmedFormData.dateOfBirth && {
  //   //         dateOfBirth: trimmedFormData.dateOfBirth
  //   //           ? new Date(trimmedFormData.dateOfBirth).toISOString()
  //   //           : ''
  //   //       })
  //   //     }
  //   //   },
  //   //   {
  //   //     onSuccess: (res) => {
  //   //       if (res.data.success) {
  //   //         onClose()
  //   //         resetErrors()
  //   //         setFile(undefined)
  //   //       }
  //   //     }
  //   //   }
  //   // )
  // }
  const handleUpdateUser = async () => {}

  // const handleCreateUser = () => {
  //   const isValid = handleValidateForm(createUserValidationSchema)
  //   if (!isValid) return

  //   const { avatar, ...trimmedFormData } = trimData < typeof formData > formData
  //   if (trimmedFormData.dateOfBirth) {
  //     trimmedFormData.dateOfBirth = new Date(
  //       trimmedFormData.dateOfBirth
  //     ).toISOString()
  //   }

  //   createUser.mutate(
  //     {
  //       ...trimmedFormData
  //     },
  //     {
  //       onSuccess: (res) => {
  //         if (!res.data.success) return

  //         onClose()
  //         resetFormData()
  //       }
  //     }
  //   )
  // }
  const handleCreateUser = () => {}

  const handleAvatarChange = async (file) => {
    const imageURL = URL.createObjectURL(file)
    setFormData({ ...formData, avatar: imageURL })
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className='max-w-lg'>
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Chỉnh sửa người dùng' : 'Tạo người dùng mới'}
          </DialogTitle>
        </DialogHeader>

        <div className='space-y-3'>
          {isEditing && (
            <div className='space-y-1 flex flex-col items-center'>
              <label className='block text-sm font-medium'>Avatar</label>
              {formData.avatar && (
                <img
                  src={formData.avatar}
                  alt='Avatar'
                  className='w-16 h-16 rounded-full object-cover'
                />
              )}
              <Button>
                <label htmlFor='avatar' className='cursor-pointer'>
                  Chọn avatar
                  <Input
                    type='file'
                    accept='image/*'
                    id='avatar'
                    hidden
                    disabled={updateUser.isPending || isUploadingImage}
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      setFile(file)
                      if (file) handleAvatarChange(file)
                    }}
                  />
                </label>
              </Button>
            </div>
          )}
          <Input
            placeholder='Tên'
            name='name'
            disabled={updateUser.isPending || isUploadingImage}
            value={formData.name}
            onChange={handleChange}
          />
          {errors['name'] && (
            <p className='text-xs text-red-500'>{errors['name']}</p>
          )}
          <Input
            placeholder='Email'
            name='email'
            disabled={isEditing}
            value={formData.email}
            onChange={handleChange}
          />
          {errors['email'] && (
            <p className='text-xs text-red-500'>{errors['email']}</p>
          )}
          {!isEditing && (
            <>
              <Input
                placeholder='Mật khẩu'
                name='password'
                disabled={updateUser.isPending || isUploadingImage}
                value={formData.password}
                onChange={handleChange}
              />
              {errors['password'] && (
                <p className='text-xs text-red-500'>{errors['password']}</p>
              )}
            </>
          )}

          <Input
            placeholder='Địa chỉ'
            name='address'
            disabled={updateUser.isPending || isUploadingImage}
            value={formData.address}
            onChange={handleChange}
          />
          {errors['address'] && (
            <p className='text-xs text-red-500'>{errors['address']}</p>
          )}
          <Input
            type='number'
            placeholder='SĐT'
            name='phoneNumber'
            disabled={updateUser.isPending || isUploadingImage}
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          {errors['phoneNumber'] && (
            <p className='text-xs text-red-500'>{errors['phoneNumber']}</p>
          )}
          <Input
            placeholder='Tiểu sử'
            name='bio'
            disabled={updateUser.isPending || isUploadingImage}
            value={formData.bio}
            onChange={handleChange}
          />
          {errors['bio'] && (
            <p className='text-xs text-red-500'>{errors['bio']}</p>
          )}
          <Input
            placeholder='Ngày sinh'
            name='dateOfBirth'
            type='date'
            disabled={updateUser.isPending || isUploadingImage}
            value={formData.dateOfBirth}
            onChange={handleChange}
          />
          {errors['dateOfBirth'] && (
            <p className='text-xs text-red-500'>{errors['dateOfBirth']}</p>
          )}

          <Select
            disabled={updateUser.isPending || isUploadingImage}
            value={formData.gender}
            onValueChange={(val) => setFormData({ ...formData, gender: val })}
          >
            <SelectTrigger>
              <SelectValue placeholder='Chọn giới tính' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='MALE'>Nam</SelectItem>
              <SelectItem value='FEMALE'>Nữ</SelectItem>
              <SelectItem value='OTHER'>Khác</SelectItem>
            </SelectContent>
          </Select>
          {errors['gender'] && (
            <p className='text-xs text-red-500'>{errors['gender']}</p>
          )}

          <Select
            disabled={isEditing}
            value={formData.role}
            onValueChange={(val) => setFormData({ ...formData, role: val })}
          >
            <SelectTrigger>
              <SelectValue placeholder='Chọn vai trò' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='USER'>User</SelectItem>
              <SelectItem value='ADMIN'>Admin</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className='pt-4 flex justify-end gap-2'>
          <Button
            variant='outline'
            onClick={onClose}
            disabled={updateUser.isPending || isUploadingImage}
          >
            Hủy
          </Button>
          <Button
            disabled={updateUser.isPending || isUploadingImage}
            onClick={handleSubmit}
          >
            {updateUser.isPending || isUploadingImage
              ? 'Đang lưu...'
              : isEditing
              ? 'Cập nhật'
              : 'Tạo mới'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
