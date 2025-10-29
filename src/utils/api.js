// api.js
import axios from 'axios'
import { API_ROOT } from './constants'

const axiosApi = axios.create({
  baseURL: API_ROOT,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

axiosApi.interceptors.response.use(
  (response) => {
    // Nếu thành công, trả về response như bình thường
    return response
  },
  (error) => {
    if (!error.response) {
      // Lỗi mạng hoặc server không phản hồi
      alert('Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng.')
    } else {
      const { status, data } = error.response

      switch (status) {
        case 400:
          alert(data.message || 'Yêu cầu không hợp lệ.')
          break
        case 401:
          alert('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.')
          // Redirect hoặc xóa token nếu cần
          break
        case 403:
          alert('Bạn không có quyền thực hiện hành động này.')
          break
        case 404:
          alert('Không tìm thấy dữ liệu yêu cầu.')
          break
        case 500:
          alert('Lỗi máy chủ. Vui lòng thử lại sau.')
          break
        default:
          alert(data.message || 'Đã xảy ra lỗi không xác định.')
      }
    }

    // Có thể log lỗi vào hệ thống hoặc trả lỗi để xử lý riêng (nếu cần)
    return Promise.reject(error)
  }
)

export default axiosApi
