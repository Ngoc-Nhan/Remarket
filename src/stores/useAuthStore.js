import { create } from 'zustand'
import { toast } from 'sonner'
import { authServices } from '../services/authServices'

export const useAuthStore = create((set, get) => ({
  accessToken: null,
  user: null,
  loading: false,

  clearState: () => {
    set({ accessToken: null, user: null, loading: false })
  },

  signUp: async (username, email, password) => {
    try {
      set({ loading: true })
      // gọi api
      await authServices.signUp(username, email, password)
      toast.success('Đăng kí thành công')
    } catch (error) {
      console.log(error)
      toast.error('Đăng kí không thành công')
    } finally {
      set({ loading: false })
    }
  },
  signIn: async (email, password) => {
    try {
      set({ loading: true })
      // gọi api
      const { accessToken } = await authServices.signIn(email, password)
      set({ accessToken })
      await get().fetchMe()
      toast.success('Đăng nhập thành công')
    } catch (error) {
      console.log(error)
      toast.error('Đăng nhập không thành công')
    } finally {
      set({ loading: false })
    }
  },
  signOut: async () => {
    try {
      get().clearState()
      // gọi api
      await authServices.signOut()
      toast.success('Đã đăng xuất')
    } catch (error) {
      console.log(error)
      toast.error('Lỗi khi đăng xuất')
    }
  },
  fetchMe: async () => {
    try {
      set({ loading: true })
      // gọi api
      const user = await authServices.fetchMe()
      set({ user })
    } catch (error) {
      console.log(error)
      set({ accessToken: null, user: null })
      toast.error('Lỗi khi lấy thông tin người dùng')
    } finally {
      set({ loading: false })
    }
  },
  refresh: async () => {
    try {
      set({ loading: true })
      // gọi api
      const { user, fetchMe } = get()
      const { accessToken } = await authServices.refresh()
      set({ accessToken })

      if (!user) {
        await fetchMe()
      }
    } catch (error) {
      console.log(error)
      get().clearState()
      toast.error('Lỗi khi đăng nhập')
    } finally {
      set({ loading: false })
    }
  }
}))
