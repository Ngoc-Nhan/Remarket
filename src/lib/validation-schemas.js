import { regex } from './validation'

export const createUserValidationSchema = {
  email: {
    fieldName: 'Email',
    required: true,
    pattern: regex.email,
    errorMessage: 'Email phải hợp lệ và tên trước @ phải có ít nhất 5 ký tự'
  },
  password: {
    fieldName: 'Mật khẩu',
    required: true,
    pattern: regex.password,
    errorMessage:
      'Mật khẩu phải có ít nhất 1 chữ hoa, 1 chữ thường, 1 số, 1 ký tự đặc biệt và tối thiểu 8 ký tự'
  },
  name: {
    fieldName: 'Họ tên',
    required: true,
    errorMessage: 'Họ tên bắt buộc và phải có ít nhất 3 ký tự'
  },
  address: {
    fieldName: 'Địa chỉ',
    errorMessage: 'Vui lòng nhập địa chỉ'
  },
  bio: {
    fieldName: 'Tiểu sử',
    errorMessage: 'Vui lòng nhập tiểu sử'
  },
  dateOfBirth: {
    fieldName: 'Ngày sinh',
    errorMessage: 'Vui lòng chọn ngày sinh'
  },
  gender: {
    fieldName: 'Giới tính',
    errorMessage: 'Vui lòng chọn giới tính'
  },
  phoneNumber: {
    fieldName: 'Số điện thoại',
    errorMessage: 'Vui lòng nhập số điện thoại hợp lệ',
    customValidate: ({ phoneNumber }) => {
      return phoneNumber ? !!Number(phoneNumber) : true
    }
  }
}

export const updateUserValidationSchema = {
  name: {
    fieldName: 'Họ tên',
    errorMessage: 'Họ tên bắt buộc và phải có ít nhất 3 ký tự'
  },
  address: {
    fieldName: 'Địa chỉ',
    errorMessage: 'Vui lòng nhập địa chỉ'
  },
  bio: {
    fieldName: 'Tiểu sử',
    errorMessage: 'Vui lòng nhập tiểu sử'
  },
  dateOfBirth: {
    fieldName: 'Ngày sinh',
    errorMessage: 'Vui lòng chọn ngày sinh'
  },
  gender: {
    fieldName: 'Giới tính',
    errorMessage: 'Vui lòng chọn giới tính'
  },
  avatar: {
    fieldName: 'Avatar',
    errorMessage: 'Vui lòng chọn avatar'
  },
  phoneNumber: {
    fieldName: 'Số điện thoại',
    errorMessage:
      'Vui lòng nhập số điện thoại hợp lệ (chỉ toàn số và 10 kí tự)',
    customValidate: ({ phoneNumber }) => {
      if (!phoneNumber) return true

      return !!Number(phoneNumber) && phoneNumber.length === 10
    }
  }
}
