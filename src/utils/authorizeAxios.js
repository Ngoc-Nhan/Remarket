import axios from 'axios'
import { toast } from 'sonner'
import { interceptorLoadingElements } from './fomatters'
// import { refreshTokenAPI } from '@/apis'
import { useAuthStore } from '../stores/useAuthStore'

/**
* Thông thể import { store } from '~/redux/store' theo cách thông thường ở đây
* Giải pháp: Inject store: là kỹ thuật khi cần sử dụng biển redux store ở các file ngoài phạm vi component
nhu file authorizeAxios hiện tại
* Hiều đơn giản: khi ứng dụng bắt đầu chạy lên, code sẽ chạy vào main.jsx đầu tiên, từ bên đó chúng ta gọi
hàm injectStore ngay lập tức để gán biển mainStore vào biển axiosReduxStore cục bộ trong file này.
* https://redux.js.org/faq/code-structure#how-can-i-use-the-redux-store-in-non-component-files
*/

// Khởi tạo một đối tượng Axios
// (authorizedAxiosInstance) mục đích để custom và
// cấu hình chung cho dự án.
let authorizedAxiosInstance = axios.create()
// Thời gian chờ tối đa của 1 reqquest: đế 10 phút
authorizedAxiosInstance.defaults.timeout = 1000 * 60 * 10
// withCredentials: Sẽ cho phép axios tự động gửi
// cookie trong moi request lên BE (phục vụ việc chúng
// ta sẽ lưu JWT tokens (refresh & access) vào trong
// httpOnly Cookie của trình duyệt)
authorizedAxiosInstance.defaults.withCredentials = true

/**
 *Cầu hình Interceptors (Bộ đánh chặn vào giữa mọi Request & Response)
 * https://axios-http.com/docs/interceptors
 */

// interceptor request can thiệp vào giữa các request api
authorizedAxiosInstance.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    // Kỹ thuật chặn spam click (xem kỹ mô tả ở file formater chứa function)
    interceptorLoadingElements(true)
    return config
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error)
  }
)

// KHởi tạo một promise cho việc gọi api refresh_token
// Mực đích tạo promise này để khi nầo gọi api refréh_token xong xuôi thì mới retry lại nhiều api
// bị lỗi trước đó.
// https://www.thedutchlab.com/en/insights/using-axios-interceptors-for-refreshing-your-api-token

let refreshTokenPromise = null
// interceptor response : can thiệp vào giữa cái respone nhận về
authorizedAxiosInstance.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    // Kỹ thuật chặn spam click (xem kỹ mô tả ở file formater chứa function)
    interceptorLoadingElements(false)

    return response
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    // Kỹ thuật chặn spam click (xem kỹ mô tả ở file formater chứa function)
    interceptorLoadingElements(false)

    // Xử lý refresh token tự động
    // Trường hợp 1: Nếu như nhận mã 401 từ BE, gọi action `signOut` từ store.
    if (error.response?.status === 401) {
      // Gọi action `signOut` từ store mà không cần dùng hook
      useAuthStore.getState().signOut()
    }
    // trường hợp 2: Nếu như nhận 410 từ be, thì sẽ gọi api refresh token để làm mới access token
    // Đầu tiên lấy được các request api đang bị lỗi thông qua error.config
    const originalRequests = error.config
    console.log(
      '🚀 ~ authorizeAxios.js:66 ~ authorizedAxiosInstance.interceptors.response.use ~ originalRequests:',
      originalRequests
    )
    // Tạm thời vô hiệu hóa logic refresh token để tập trung vào câu hỏi
    if (error.response?.status === 410 && originalRequests) {
      // Bước 1: Kiểm tra xem nếu chưa có refréh_tokenPromise thì
      // thực hiện việc gọi api refresh_token đồng Thời
      // gán vào cho cái refreshTokenPromise
      // originalRequests._retry = true
      if (!refreshTokenPromise) {
        refreshTokenPromise = useAuthStore
          .getState()
          .refresh()
          .then((data) => {
            // đồng thời accessToken đã nằm trong httpOnly cookie (xử lý từ be)
            return data?.accessToken
          })
          .catch((_error) => {
            // Nếu nhận bất kỳ lỗi nào từ api refresh token thì cứ logout luôn
            useAuthStore.getState().signOut() // Thay thế logic Redux cũ
            return Promise.reject(_error)
          })
          .finally(() => {
            // Dù api ok hay lỗi thì vẫn gán lại cái refréh_tokenPromise về null như ban đầu
            refreshTokenPromise = null
          })
      }

      // cần return trường họp refreshTokenPromise chạy thànhcông và xử lý thêm ở đây:

      // eslint-disable-next-line no-unused-vars
      return refreshTokenPromise.then((accessToken) => {
        /**
      * Bước 1: Đối với Trường hợp nếu dự án cần lưu accessToken vào localstorage hoặc đâu đó thì sẽ viết
      thêm code xử lý ở đây.
      * Hiện tại ở đây không cần bước 1 này vì chúng ta đã đưa accessToken vào cookie (xử lý từ phía BE)
      sau khi api refreshToken được gọi thành công.
      */
        return authorizedAxiosInstance(originalRequests)
      })
    }

    // max http nằm ngoài 2xx thì sẽ lỗi và rơi vào đây

    // xử lý tập trung hiển thị thông báo lỗi trả về từ mọi api ở đây (viết code một lần: Code cleanl)
    // console.log error ra sẽ thấy cấu trúc data dẫn tới message lỗi như dưới đây

    console.log(error)
    let errorMessage = error.response?.data?.message
      ? error.response?.data?.message
      : error?.message

    // dùng toast để hiển thị  bất kể mọi mã lỗi lên màn hình -- ngoại trừ 410 Gone phục vụ việc fresh lại token
    if (error.response?.status !== 410) {
      toast.error(errorMessage, { position: 'bottom-left' })
    }
    return Promise.reject(error)
  }
)

export default authorizedAxiosInstance
