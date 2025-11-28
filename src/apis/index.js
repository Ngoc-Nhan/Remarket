import authorizedAxiosInstance from '../utils/authorizeAxios'
import { API_ROOT } from '../utils/constants'
import axios from 'axios'

export const getCategoriesAPI = async () => {
  const res = await authorizedAxiosInstance.get(`${API_ROOT}/categories`)
  return res.data
}

export const createCategoryAPI = async (data) => {
  const res = await authorizedAxiosInstance.post(`${API_ROOT}/categories`, data)
  return res.data
}

export const getCategoryDetailsAPI = async (id) => {
  const res = await authorizedAxiosInstance.get(`${API_ROOT}/categories/${id}`)
  return res.data
}

export const updateCategoryAPI = async (id, data) => {
  const res = await authorizedAxiosInstance.put(
    `${API_ROOT}/categories/${id}`,
    data
  )
  return res.data
}

// =================================== Listings API ===================================

export const getListingsAPI = async (params) => {
  // Sử dụng axios thường vì đây là public API
  const res = await axios.get(`${API_ROOT}/listings`, { params })
  return res.data
}

export const getListingDetailsAPI = async (id) => {
  // Sử dụng axios thường vì đây là public API
  const res = await axios.get(`${API_ROOT}/listings/${id}`)
  return res.data
}

export const createListingAPI = async (data) => {
  const res = await authorizedAxiosInstance.post(`${API_ROOT}/listings`, data)
  return res.data
}

export const updateListingAPI = async (id, data) => {
  const res = await authorizedAxiosInstance.put(
    `${API_ROOT}/listings/${id}`,
    data
  )
  return res.data
}

export const deleteListingAPI = async (id) => {
  const res = await authorizedAxiosInstance.delete(`${API_ROOT}/listings/${id}`)
  return res.data
}

// =================================== Reviews API ===================================

export const getReviewsByListingAPI = async (listingId) => {
  // Sử dụng axios thường vì đây là public API
  const res = await axios.get(`${API_ROOT}/reviews/listing/${listingId}`)
  return res.data
}

export const createReviewAPI = async (data) => {
  const res = await authorizedAxiosInstance.post(`${API_ROOT}/reviews`, data)
  return res.data
}

export const updateReviewAPI = async (id, data) => {
  const res = await authorizedAxiosInstance.put(
    `${API_ROOT}/reviews/${id}`,
    data
  )
  return res.data
}

export const deleteReviewAPI = async (id) => {
  const res = await authorizedAxiosInstance.delete(`${API_ROOT}/reviews/${id}`)
  return res.data
}

// =================================== Messages API ===================================

export const getConversationsAPI = async () => {
  const res = await authorizedAxiosInstance.get(
    `${API_ROOT}/messages/conversations`
  )
  return res.data
}

export const getMessagesAPI = async (otherUserId) => {
  const res = await authorizedAxiosInstance.get(
    `${API_ROOT}/messages/${otherUserId}`
  )
  return res.data
}

export const sendMessageAPI = async (data) => {
  const res = await authorizedAxiosInstance.post(`${API_ROOT}/messages`, data)
  return res.data
}

export const deleteCategoryAPI = async (id) => {
  const res = await authorizedAxiosInstance.delete(
    `${API_ROOT}/categories/${id}`
  )
  return res.data
}
