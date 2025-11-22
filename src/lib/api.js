import axiosInstance from './axios'

export const getAuthMe = async () => {
  const response = await axiosInstance.get('/user/me')
  // console.log('api', response.data)
  return response.data
}
export const loginApi = async (data) => {
  const response = await axiosInstance.post('/user/login', data)
  return response.data
}

export const registerApi = async (data) => {
  const response = await axiosInstance.post('/users/register', data)
  return response.data
}

export const verifyAccountApi = async (data) => {
  const response = await axiosInstance.put('/users/verify', data)
  return response.data
}

export const logoutApi = async () => {
  const response = await axiosInstance.delete('/users/logout')
  return response.data
}

export const refreshTokenApi = async () => {
  const response = await axiosInstance.get('/users/refresh_token')
  return response.data
}

export const getFavoritesApi = async () => {
  const response = await axiosInstance.get('/users/favorites')
  return response.data
}

export const addFavoriteApi = async (data) => {
  const response = await axiosInstance.post('/users/favorites', data)
  return response.data
}

export const removeFavoriteApi = async (listingId) => {
  const response = await axiosInstance.delete(`/users/favorites/${listingId}`)
  return response.data
}

export const updateUserApi = async (data) => {
  const response = await axiosInstance.put('/users/update', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return response.data
}

export const getListingsApi = async (params) => {
  const response = await axiosInstance.get('/listings', { params })
  return response.data
}

export const getListingDetailsApi = async (listingId) => {
  const response = await axiosInstance.get(`/listings/${listingId}`)
  return response.data
}

export const createListingApi = async (data) => {
  const response = await axiosInstance.post('/listings', data)
  return response.data
}

export const updateListingApi = async (listingId, data) => {
  const response = await axiosInstance.put(`/listings/${listingId}`, data)
  return response.data
}

export const deleteListingApi = async (listingId) => {
  const response = await axiosInstance.delete(`/listings/${listingId}`)
  return response.data
}

export const getCategoriesApi = async () => {
  const response = await axiosInstance.get('/categories')
  return response.data
}

// Admin
export const createCategoryApi = async (data) => {
  const response = await axiosInstance.post('/categories', data)
  return response.data
}

export const getReviewsByListingApi = async (listingId) => {
  const response = await axiosInstance.get(`/reviews/listing/${listingId}`)
  return response.data
}

export const createReviewApi = async (data) => {
  const response = await axiosInstance.post('/reviews', data)
  return response.data
}

export const updateReviewApi = async (reviewId, data) => {
  const response = await axiosInstance.put(`/reviews/${reviewId}`, data)
  return response.data
}

export const deleteReviewApi = async (reviewId) => {
  const response = await axiosInstance.delete(`/reviews/${reviewId}`)
  return response.data
}

export const getConversationsApi = async () => {
  const response = await axiosInstance.get('/messages/conversations')
  return response.data
}

export const getMessagesApi = async (otherUserId) => {
  const response = await axiosInstance.get(`/messages/${otherUserId}`)
  return response.data
}

export const sendMessageApi = async (data) => {
  const response = await axiosInstance.post('/messages', data)
  return response.data
}
