import axios from 'axios'

const CLOUD_NAME = 'ddkkkq2pm'
const UPLOAD_ASSET_NAME = 'Remarket'

export const uploadFileToCloudinary = async (file, resourceType = 'image') => {
  const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${resourceType}/upload`

  try {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', UPLOAD_ASSET_NAME)
    const response = await axios.post(url, formData)
    return {
      success: true,
      data: response.data
    }
  } catch (error) {
    console.log(error)
    return {
      success: false,
      message: 'Không thể upload ảnh vì một số lí do, hãy thử lại sau'
    }
  }
}
