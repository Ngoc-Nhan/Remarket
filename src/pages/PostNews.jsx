import React, { Children, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { useNavigate } from 'react-router-dom'

import DanhMuc from '../components/DanhMuc'

import {
  Bell,
  Handbag,
  MessagesSquare,
  ChevronDown,
  Camera
} from 'lucide-react'
import FormInfo from '../components/FormInfo'

import GShopping from '../assets/GShopping.jpg'
import Navbar from '../components/Navbar/Navbar'
import MyPosts from './MyPosts'

function PostNews() {
  const navigate = useNavigate()

  const [selectedImages, setSelectedImages] = useState([])

  const handleChangeImage = (event) => {
    const files = Array.from(event.target.files)
    const newImages = []

    files.forEach((file) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        newImages.push(reader.result)
        if (newImages.length === files.length) {
          setSelectedImages((prev) => [...prev, ...newImages])
        }
      }
      reader.readAsDataURL(file)
    })
  }

  const handleRemoveImage = (index) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = () => {
    if (!selectedData) return alert('⚠️ Vui lòng chọn danh mục!')
    if (Object.keys(formValues).length === 0)
      return alert('⚠️ Vui lòng nhập thông tin chi tiết!')
    if (selectedImages.length === 0)
      return alert('⚠️ Vui lòng chọn ít nhất 1 ảnh!')

    const postData = {
      category: selectedData,
      info: formValues,
      images: selectedImages,
      createdAt: new Date().toLocaleString(),
      status: 'Đang hiển thị'
    }
    const existingPosts = JSON.parse(localStorage.getItem('posts')) || []
    const postsArray = Array.isArray(existingPosts) ? existingPosts : []

    postsArray.push(postData)
    localStorage.setItem('posts', JSON.stringify(postsArray))

    // Reset form
    setSelectedData('')
    setFormValues({})
    setSelectedImages([])

    alert('✅ Đăng tin thành công!')
    navigate('/myposts') // 👉 chuyển sang trang MyPosts
  }

  const [formValues, setFormValues] = useState({})

  const handleFormChange = (values) => {
    setFormValues(values)
  }
  const [tounched, setTounched] = useState(false)
  const handleBlur = () => {
    setTounched(true)
  } // khi roi khoi select

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'status') {
      setStatus(value)
    }
    if (name === 'color') {
      setColor(value)
    }

    if (name === 'capacity') {
      setCapacity(value)
    }
    if (name === 'brand') {
      setBrand(value)
    }
  }
  const [status, setStatus] = useState('')
  const [brand, setBrand] = useState('')
  const [color, setColor] = useState('')
  const [capacity, setCapacity] = useState('')
  const [selectedData, setSelectedData] = useState('')
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.user)
  const [showDanhMuc, setShowDanhMuc] = useState(false)
  const localtion = useLocation()

  // const handleChangeImage = (event) => {
  //     const file = event.target.files[0];
  //     if (file) {
  //         // Xử lý file ảnh ở đây
  //         console.log("Selected file:", file);
  //     }
  // }
  return (
    <div className='min-h-screen  bg-gray-50 relative overflow-hidden'>
      {/* Navbar */}
      <Navbar></Navbar>
      {/* Nội dung chính */}
      <div className='p-6 pt-20 transition-all duration-300'>
        <div className='max-w-4xl mx-auto bg-white rounded-2xl shadow-md px-4 py-6 flex flex-col md:flex-row gap-6'>
          {/* Khối hình ảnh */}
          <div className='flex-1 text-center'>
            <h5 className='text-lg font-semibold text-gray-800'>
              Hình ảnh và Video sản phẩm
            </h5>
            <p className='text-sm text-gray-600'>
              Xem thêm{' '}
              <a href='#' className='text-blue-600 hover:underline'>
                Quy định đăng tin của SecondHandShop
              </a>
            </p>

            {/* <div className="bg-white p-6">
                            <button className="btn relative bg-gray-100 btn-dash w-3xs h-50 border-amber-400 cursor-not-allowed hover:bg-gray-100 border-dashed">
                                <Camera size={64} className="text-yellow-200" />
                                <input type="file" disabled={!selectedData} onChange={handleChangeImage} accept="image/png, image/jpeg" className="file-input absolute file-input-ghost w-full h-full opacity-0" />
                            </button>
                        </div> */}
            <div className='bg-white p-6'>
              {/* Nút chọn ảnh */}
              {/* <button className="btn relative bg-gray-100 btn-dash w-3xs h-50 border-amber-400 cursor-not-allowed hover:bg-gray-100 border-dashed">
                                <Camera size={64} className="text-yellow-400 mx-auto" />
                                <input
                                    type="file"
                                    multiple
                                    disabled={!selectedData}
                                    onChange={handleChangeImage}
                                    accept="image/png, image/jpeg"
                                    className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                                />
                            </button> */}
              {selectedImages.length === 0 ? (
                <button className='btn relative bg-gray-100 btn-dash w-3xs h-50 border-amber-400 cursor-not-allowed hover:bg-gray-100 border-dashed'>
                  <Camera size={64} className='text-yellow-200' />
                  <input
                    type='file'
                    multiple
                    disabled={!selectedData}
                    onChange={handleChangeImage}
                    accept='image/png, image/jpeg'
                    className='file-input absolute file-input-ghost w-full h-full opacity-0'
                  />
                </button>
              ) : (
                <div className='flex flex-wrap gap-4 mt-4 justify-center'>
                  {selectedImages.map((img, index) => (
                    <div
                      key={index}
                      className='relative w-28 h-28 border rounded-xl overflow-hidden shadow-md'
                    >
                      <img
                        src={img}
                        alt={`preview-${index}`}
                        className='w-full h-full object-cover'
                      />
                      <button
                        onClick={() => handleRemoveImage(index)}
                        className='absolute top-1 right-1 bg-black bg-opacity-60 text-white rounded-full w-5 h-5 flex items-center justify-center text-sm hover:bg-red-600'
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  <div className='relative w-28 h-28 border-2 border-dashed border-amber-400 flex items-center justify-center rounded-xl cursor-pointer hover:bg-gray-50'>
                    <span className='text-4xl text-amber-400 font-light'>
                      +
                    </span>
                    <input
                      type='file'
                      multiple
                      onChange={handleChangeImage}
                      accept='image/png, image/jpeg'
                      className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
                    />
                  </div>
                </div>
              )}

              {/* Hiển thị ảnh đã chọn */}
              {/* <div className="flex flex-wrap gap-4 mt-4 justify-center">
                                {selectedImages.map((img, index) => (
                                    <div key={index} className="relative w-28 h-28 border rounded-xl overflow-hidden shadow-md">
                                        <img
                                            src={img}
                                            alt={`preview-${index}`}
                                            className="w-full h-full object-cover"
                                        />
                                        <button
                                            onClick={() => handleRemoveImage(index)}
                                            className="absolute top-1 right-1 bg-black bg-opacity-60 text-white rounded-full w-5 h-5 flex items-center justify-center text-sm hover:bg-red-600"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div> */}
            </div>
          </div>

          {/* Khối danh mục */}
          <div className='flex-1'>
            <input
              type='text'
              placeholder='Danh Mục Tin Đăng'
              className='border ml-2 p-2 w-full mt-2 rounded-md'
              onClick={() => setShowDanhMuc(true)}
              value={selectedData}
              readOnly
            />

            {!selectedData ? (
              <div className='flex justify-end mt-4'>
                <img
                  className='w-60 bg-transparent rounded-xl'
                  src={GShopping}
                  alt='shopping'
                />
              </div>
            ) : (
              <div className='flex gap-2 flex-col items-center w-full  h-full mt-4 p-2'>
                <h1 className='font-bold text-lg'>Thông tin chi tiết</h1>

                <FormInfo
                  selectedChild={selectedData}
                  onFormChange={handleFormChange}
                />
                <button
                  onClick={handleSubmit}
                  className='mt-6 bg-yellow-400 text-white font-semibold px-4 py-2 rounded-lg hover:bg-yellow-500 w-full'
                >
                  Đăng tin
                </button>
              </div>
            )}
          </div>

          {/* Popup chọn danh mục */}
          {showDanhMuc && (
            <>
              <div className='fixed inset-0 flex justify-center items-center z-50 bg-black/30 backdrop-blur-sm'>
                <div className='bg-white w-96 rounded-2xl shadow-xl p-6 relative'>
                  <button
                    className='absolute top-2 right-3 text-xl font-bold hover:text-red-500'
                    onClick={() => setShowDanhMuc(false)}
                  >
                    ×
                  </button>
                  <h2 className='text-2xl font-semibold mb-3 text-gray-800'>
                    Đăng tin mới
                  </h2>

                  <form className='space-y-3'>
                    <p className='text-medium'>CHỌN DANH MỤC</p>
                    <DanhMuc
                      selectedData={selectedData}
                      setSelectedData={setSelectedData}
                      setShowDanhMuc={setShowDanhMuc}
                      hideTitle
                      className='m-2'
                      itemClass='p-1'
                    />
                  </form>
                  <button onClick={handleSubmit}></button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default PostNews
