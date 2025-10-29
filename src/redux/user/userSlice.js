import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import authorizedAxiosInstance from '@utils/authorizeAxios'
import { API_ROOT } from '@utils/constants'

//createAsyncThunk là một hàm
// được cung cấp bởi thư viện Redux
// Toolkit (RTK), dùng để xử lý
//  logic bất đồng bộ (async) trong Redux — ví dụ
// như gọi API. Nó giúp đơn giản hóa việc tạo ra thunk
// (một hàm trả về một hàm khác) và tự động tạo ra các action
// tương ứng với từng trạng thái của quá trình
//  bất đồng bộ: pending, fulfilled, và rejected.

export const loginAPI = createAsyncThunk('user/loginAPI', async (data) => {
  const request = await authorizedAxiosInstance.post(
    `${API_ROOT}/v1/users/login`,
    data
  )
  // toast.success('Account login successfully!', { theme: 'colored' })
  // console.log('🚀 ~ userSlice.js:21 ~ user/loginAPI, ~ request.data:', request.data)
  return request.data
})
const initialState = {
  currentUser: null
}

export const logoutUserAPI = createAsyncThunk(
  'user/logoutUserAPI',
  async (showSuccessMessage = true) => {
    const response = await authorizedAxiosInstance.delete(
      `${API_ROOT}/v1/users/logout`
    )
    if (showSuccessMessage) {
      toast.success('Logged out successfully!')
      return response.data
    }
  }
)

export const updateUserAPI = createAsyncThunk(
  'user/updateUserAPI',
  async (data, showSuccessMessage = false) => {
    // console.log('🚀 ~ userSlice.js:44 ~ updateUserAPI, ~ data:', data)
    const response = await authorizedAxiosInstance.put(
      `${API_ROOT}/v1/users/update`,
      data
    )
    if (showSuccessMessage) {
      // toast.success('Change successfully!')
      // console.log('🚀 ~ userSlice.js:45 ~ updateUserAPI, ~ response.data:', response.data)
      return response.data
    }
  }
)
// khởi tạo slice trong kho lưu trữ redux
export const userSlice = createSlice({
  name: 'user',
  // khoi tao gia tri slice trong redex
  initialState,
  // Nơi xử lý dữ liệu đồng bộ  ở reducers
  reducers: {},
  // extraReducer nơi xử lý dữ liệu bất đồng bộ
  extraReducers: (builder) => {
    builder.addCase(loginAPI.fulfilled, (state, action) => {
      state.currentUser = action.payload
    })
    builder.addCase(logoutUserAPI.fulfilled, (state) => {
      // api loutout sau khi goi thanh công thì sẽ clear thông tin current user về null
      // kết hợp protectRoute đã làm ở App.js => code sẽ điều hướng chuẩn về trang login
      state.currentUser = null
    })
    builder.addCase(updateUserAPI.fulfilled, (state, action) => {
      state.currentUser = action.payload
    })
  }
})

// Action creators are generated for each case reducer function
// Actions: Là nơi dành cho các components bên dưới gọi bằng dispa ch() tới nó để cập nhật lại dữ liệu
// thông qua reducer (chạy đồng bộ)
// Để ý ở trên thì không thấy properties actions đâu cả, bởi vì những cái actions này đơn giản là được
//thang redux tạo tự động theo tên cua reducer nhé.
// export const {} = userSlice.actions
// Selectors: Là nơi dành cho các components bên dưới gọi bằng hook useselector() để lấy dữ liệu từ trong
// kho redux store ra sử dụng
export const selectCurrentUser = (state) => {
  return state.user.currentUser
}
export const userReducer = userSlice.reducer
