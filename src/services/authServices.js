import authorizedAxiosInstance from '../utils/authorizeAxios'
import { API_ROOT } from '../utils/constants'

export const authServices = {
  signUp: async (username, email, password) => {
    const res = await authorizedAxiosInstance.post(
      `${API_ROOT}/users/register`,
      { username, email, password }
    )
    return res.data
  },
  signIn: async (email, password) => {
    const res = await authorizedAxiosInstance.post(`${API_ROOT}/users/login`, {
      email,
      password
    })
    return res.data
  },
  signOut: async () => {
    const res = await authorizedAxiosInstance.delete(`${API_ROOT}/users/logout`)
    return res.data
  },
  fetchMe: async () => {
    const res = await authorizedAxiosInstance.get(`${API_ROOT}/users/me`)
    return res.data
  },
  refresh: async () => {
    const res = await authorizedAxiosInstance.get(
      `${API_ROOT}/users/refresh_token`
    )
    return res.data
  }
}
