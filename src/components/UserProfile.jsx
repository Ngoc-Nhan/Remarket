import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  fetchProvinces,
  fetchProvinceDetail,
  fetchWards
} from '../Data/VNProvinces'
import { useAuthStore } from '../stores/useAuthStore'

function UserProfile() {
  const { user, fetchMe } = useAuthStore()
  const [userEdit, setUserEdit] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [showSecurity, setShowSecurity] = useState(false)
  const [showAddressModal, setShowAddressModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [activePosts, setActivePosts] = useState(0)
  const [soldPosts, setSoldPosts] = useState(0)
  const [activeTab, setActiveTab] = useState('active')

  // Lưu trữ danh sách địa lý
  const [provincesList, setProvincesList] = useState([])
  const [districtsList, setDistrictsList] = useState([])
  const [wardsList, setWardsList] = useState([])

  const [formData, setFormData] = useState({
    displayName: '',
    phone: '',
    birthday: '',
    username: '',
    gender: '',

    // Thông tin địa chỉ
    provinceCode: '',
    districtCode: '',
    wardCode: '',
    specificAddress: '',
    provinceName: '',
    districtName: '',
    wardName: '',
    address: ''
  })

  const navigate = useNavigate()
  // ----------------------------------------------------
  // --- LOGIC FETCH DỮ LIỆU ĐỊA LÝ ---
  // ----------------------------------------------------
  // ✅ useEffect 1: Lấy danh sách Tỉnh/Thành phố
  useEffect(() => {
    const loadProvinces = async () => {
      try {
        const data = await fetchProvinces()
        setProvincesList(data || [])
      } catch (error) {
        console.error('Lỗi khi tải Tỉnh/Thành phố:', error)
      }
    }
    loadProvinces()
  }, [])

  // ✅ useEffect 2: Lấy danh sách Quận/Huyện
  useEffect(() => {
    const loadDistrictsAndDetails = async () => {
      if (formData.provinceCode) {
        try {
          const provinceDetail = await fetchProvinceDetail(
            formData.provinceCode
          )

          if (provinceDetail && provinceDetail.districts) {
            setDistrictsList(provinceDetail.districts || [])
          } else {
            setDistrictsList([])
          }
        } catch (error) {
          console.error('Lỗi khi tải chi tiết địa lý:', error)
          setDistrictsList([])
        }
      } else {
        setDistrictsList([])
      }
      setWardsList([])
      setFormData((prev) => ({
        ...prev,
        districtCode: '',
        wardCode: '',
        districtName: '',
        wardName: ''
      }))
    }
    loadDistrictsAndDetails()
  }, [formData.provinceCode])

  // ✅ useEffect 3: Lấy danh sách Phường/Xã
  useEffect(() => {
    const loadWards = async () => {
      if (formData.districtCode) {
        try {
          const selectedDistrict = districtsList.find(
            (d) => String(d.code) === formData.districtCode
          )

          if (selectedDistrict) {
            const data = await fetchWards(selectedDistrict)
            setWardsList(data || [])
            return
          }
        } catch (error) {
          console.error('Lỗi khi tải Phường/Xã:', error)
        }
      }
      setWardsList([])
      setFormData((prev) => ({
        ...prev,
        wardCode: '',
        wardName: ''
      }))
    }
    loadWards()
  }, [formData.districtCode, districtsList])

  // --- LOGIC FIREBASE & UI/MODAL ---
  // ------------------------------------

  // ✅ Khi mở modal thì chặn cuộn body
  useEffect(() => {
    if (isEditing || showSecurity || showAddressModal) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isEditing, showSecurity, showAddressModal])

  useEffect(() => {
    const initializeData = () => {
      if (user) {
        setUserEdit(user)
        // Khởi tạo formData với giá trị từ user store
        setFormData((prev) => ({
          ...prev,
          displayName: user.displayName ?? '',
          phone: user.phoneNumber ?? '',
          address: user.address ?? ''
          // TODO: Load thông tin khác từ database nếu cần
        }))
      } else {
        setUserEdit(null)
      }
      setLoading(false)
    }
    initializeData()
  }, [user]) // Chỉ chạy lại khi đối tượng `user` thay đổi

  const handleLogout = async () => {
    navigate('/login')
  }

  // ✅ Xử lý thay đổi Input & Select (Đã tối ưu logic reset)
  const handleChange = (e) => {
    const { name, value } = e.target

    // Trường hợp không phải địa chỉ
    if (
      name !== 'provinceCode' &&
      name !== 'districtCode' &&
      name !== 'wardCode'
    ) {
      setFormData((prev) => ({ ...prev, [name]: value }))
      return
    }

    // Trường hợp địa chỉ
    let update = { [name]: value }

    if (name === 'provinceCode') {
      const selectedProvince = provincesList.find(
        (p) => String(p.code) === value
      )
      update = {
        ...update,
        provinceName: selectedProvince ? selectedProvince.name : '',
        // Thêm reset district/ward khi tỉnh thay đổi
        districtCode: '',
        wardCode: '',
        districtName: '',
        wardName: ''
      }
    } else if (name === 'districtCode') {
      const selectedDistrict = districtsList.find(
        (d) => String(d.code) === value
      )
      update = {
        ...update,
        districtName: selectedDistrict ? selectedDistrict.name : '',
        // Thêm reset ward khi huyện thay đổi
        wardCode: '',
        wardName: ''
      }
    } else if (name === 'wardCode') {
      const selectedWard = wardsList.find((w) => String(w.code) === value)
      update = {
        ...update,
        wardName: selectedWard ? selectedWard.name : ''
      }
    }

    setFormData((prev) => ({ ...prev, ...update }))
  }

  // ✅ Lưu địa chỉ từ Address Modal
  const handleAddressSave = () => {
    const { specificAddress, wardName, districtName, provinceName } = formData

    const fullAddress =
      wardName && districtName && provinceName
        ? `${
            specificAddress ? specificAddress + ', ' : ''
          }${wardName}, ${districtName}, ${provinceName}`
        : ''

    setFormData((prev) => ({
      ...prev,
      address: fullAddress
    }))
    setShowAddressModal(false)
  }

  const handleSave = () => {
    console.log('Thông tin mới:', formData)
    setIsEditing(false)
    // TODO: Thêm logic cập nhật thông tin người dùng lên Firebase/Server
  }

  const getAvatar = () => {
    if (user?.photoURL) {
      return user.photoURL.includes('googleusercontent')
        ? user.photoURL.replace('s96-c', 's400-c')
        : user.photoURL
    }
    return '/default-avatar.png'
  }

  // ✅ HÀM MỚI: Xử lý chia sẻ và sao chép liên kết
  const handleShareProfile = () => {
    // Giả định: Liên kết hồ sơ công khai sẽ là /user/ + UID (hoặc một ID nào đó)
    // Tùy theo cấu hình routing của ứng dụng bạn.
    const baseUrl = window.location.origin // Ví dụ: http://localhost:3000
    const userIdSegment = user?.uid ? user.uid.substring(0, 10) : 'guest-user' // Dùng 1 phần UID cho ngắn
    const profileLink = `${baseUrl}/user/${userIdSegment}`

    // Sử dụng Clipboard API để sao chép
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard
        .writeText(profileLink)
        .then(() => {
          alert(`✅ Đã sao chép liên kết hồ sơ:\n${profileLink}`)
        })
        .catch((err) => {
          console.error('Không thể sao chép liên kết:', err)
          // Fallback cho môi trường không hỗ trợ (chủ yếu là http)
          alert(
            '❌ Lỗi: Không thể tự động sao chép. Vui lòng sao chép thủ công.'
          )
        })
    } else {
      // Fallback cho HTTP hoặc môi trường cũ
      prompt('Vui lòng sao chép liên kết bên dưới:', profileLink)
    }
  }

  // ----------------------------------------------------
  // --- HIỂN THỊ UI ---
  // ----------------------------------------------------

  if (loading) {
    return (
      <div className='flex justify-center items-center min-h-screen text-gray-600'>
        Đang tải thông tin người dùng...
      </div>
    )
  }

  if (!user) {
    return (
      <div className='flex justify-center items-center min-h-screen text-gray-600'>
        Bạn chưa đăng nhập.{' '}
        <button
          onClick={() => navigate('/login')}
          className='ml-2 text-blue-500 underline'
        >
          Đăng nhập ngay
        </button>
      </div>
    )
  }

  return (
    <div className='bg-[#f8f6f3] min-h-screen flex justify-center py-10 px-4 relative'>
      <div className='w-full max-w-6xl grid md:grid-cols-3 gap-6'>
        {/* --- CỘT TRÁI: Thông tin người dùng --- */}
        <div className='bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center'>
          {/* ... (Phần Avatar và Tên không thay đổi) ... */}
          <div className='relative'>
            <img
              src={
                user?.avatar ||
                'https://i.pinimg.com/736x/7d/0c/6b/7d0c6bc79cfa39153751c56433141483.jpg'
              }
              alt='User Avatar'
              className='rounded-full w-28 h-28 object-cover border-2 border-[#e6d9c8]'
              referrerPolicy='no-referrer'
              onError={(e) => (e.target.src = '/default-avatar.png')}
            />
            {user && (
              <span className='absolute bottom-1 right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-white'></span>
            )}
          </div>

          {/* Tên & Email */}
          <h2 className='text-xl font-semibold mt-3 text-gray-800'>
            {user?.displayName || 'Người dùng'}
          </h2>
          <p className='text-gray-500 text-sm'>
            {user?.email || 'Chưa có email'}
          </p>

          {/* Thông tin chi tiết */}
          <div className='mt-4 w-full text-left text-sm text-gray-700 space-y-2'>
            <p>
              <span className='font-medium'>📍 Địa chỉ:</span>{' '}
              {formData.address || 'Chưa cung cấp'}
            </p>
            <p>
              <span className='font-medium'>📞 Số điện thoại:</span>{' '}
              {formData.phone || 'Chưa cập nhật'}
            </p>
            <p>
              <span className='font-medium'>🎂 Ngày sinh:</span>{' '}
              {formData.birthday || 'Chưa cập nhật'}
            </p>
            <p>
              <span className='font-medium'>📅 Ngày tham gia:</span>{' '}
              {user?.metadata?.creationTime
                ? new Date(user.metadata.creationTime).toLocaleDateString(
                    'vi-VN'
                  )
                : 'Không xác định'}
            </p>
            <p>
              <span className='font-medium'>🔒 Bảo mật:</span>{' '}
              {user?.providerData?.providerId === 'google.com'
                ? 'Đã xác thực Google'
                : 'Chưa xác thực'}
            </p>
          </div>

          {/* Nút chức năng */}
          <div className='mt-6 flex flex-col w-full gap-2'>
            <button
              onClick={() => setIsEditing(true)}
              className='border border-gray-300 py-2 rounded-lg hover:bg-gray-100 font-medium transition'
            >
              Chỉnh sửa thông tin
            </button>
            <button
              onClick={() => setShowSecurity(true)}
              className='border border-gray-300 py-2 rounded-lg hover:bg-gray-100 font-medium transition'
            >
              Bảo mật tài khoản
            </button>

            {/* THÊM NÚT CHIA SẺ HỒ SƠ TẠI ĐÂY */}
            <button
              onClick={handleShareProfile}
              className='border border-green-300 text-green-500 py-2 rounded-lg hover:bg-green-50 font-medium transition flex items-center justify-center gap-2'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path d='M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789L10.02 11.45a3.033 3.033 0 000-2.9l3.874-1.937A3 3 0 0015 8z' />
              </svg>
              Chia sẻ Hồ sơ
            </button>

            <button
              onClick={handleLogout}
              className='border border-red-300 text-red-500 py-2 rounded-lg hover:bg-red-50 font-medium transition'
            >
              Đăng xuất
            </button>
          </div>
        </div>

        {/* --- CỘT PHẢI: Tin đăng (md:col-span-2) --- */}
        <div className='md:col-span-2'>
          {/* ... (Phần Tin Đăng không thay đổi) ... */}
          <div className='bg-white rounded-2xl shadow-md'>
            <div className='flex border-b border-gray-200'>
              <button
                onClick={() => setActiveTab('active')}
                className={`flex-1 py-4 text-center font-semibold transition relative ${
                  activeTab === 'active'
                    ? 'text-orange-500'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Đang hiển thị ({activePosts})
                {activeTab === 'active' && (
                  <span className='absolute bottom-0 left-0 right-0 h-1 bg-orange-500 rounded-t-md'></span>
                )}
              </button>
              <button
                onClick={() => setActiveTab('sold')}
                className={`flex-1 py-4 text-center font-semibold transition relative ${
                  activeTab === 'sold'
                    ? 'text-orange-500'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Đã bán ({soldPosts})
                {activeTab === 'sold' && (
                  <span className='absolute bottom-0 left-0 right-0 h-1 bg-orange-500 rounded-t-md'></span>
                )}
              </button>
            </div>

            <div className='p-8'>
              {activePosts + soldPosts === 0 ? (
                <div className='flex flex-col justify-center items-center text-center py-10'>
                  <img
                    src='no-post.png'
                    alt='no-posts'
                    className='w-40 h-40 object-contain opacity-80 mb-4'
                  />
                  <h3 className='text-xl font-semibold text-gray-800 mb-1'>
                    Bạn chưa có tin đăng nào
                  </h3>
                  <p className='text-gray-500 mb-5'>
                    Bắt đầu đăng tin để tiếp cận người mua ngay!
                  </p>
                  <button
                    onClick={() => navigate('/PostNews')}
                    className='bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-bold transition uppercase shadow-md'
                  >
                    Đăng tin ngay
                  </button>
                </div>
              ) : (
                <div className='min-h-[300px]'>
                  {activeTab === 'active' && activePosts > 0 && (
                    <p className='text-gray-600'>
                      Danh sách {activePosts} tin đang hiển thị... (TODO: Thêm
                      component danh sách tin)
                    </p>
                  )}
                  {activeTab === 'sold' && soldPosts > 0 && (
                    <p className='text-gray-600'>
                      Danh sách {soldPosts} tin đã bán/ẩn... (TODO: Thêm
                      component danh sách tin)
                    </p>
                  )}

                  {activeTab === 'active' && activePosts === 0 && (
                    <p className='text-center text-gray-500 py-10'>
                      Bạn không có tin nào đang hiển thị.
                    </p>
                  )}
                  {activeTab === 'sold' && soldPosts === 0 && (
                    <p className='text-center text-gray-500 py-10'>
                      Bạn không có tin nào đã bán.
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* --- MODAL CHỈNH SỬA THÔNG TIN --- */}
        {isEditing && (
          <div className='fixed inset-0 flex justify-center items-center bg-black/20 backdrop-blur-sm z-50'>
            <div className='relative bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 border border-gray-200 animate-fadeIn'>
              <h3 className='text-xl font-semibold text-gray-800 mb-4 text-center'>
                ✏️ Cập nhật thông tin cá nhân
              </h3>

              <div className='space-y-4'>
                {/* Họ và tên */}
                <div>
                  <label className='block text-sm font-medium mb-1'>
                    Họ và tên *
                  </label>
                  <input
                    type='text'
                    name='displayName'
                    // 🚨 ĐIỀU CHỈNH: Chỉ sử dụng formData.displayName. Giá trị ban đầu
                    // đã được gán trong useEffect. Dùng ?? "" để đảm bảo giá trị luôn là chuỗi.
                    value={formData.displayName ?? ''}
                    onChange={handleChange}
                    placeholder='Nhập họ và tên'
                    required
                    className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-400'
                  />
                </div>

                {/* Số điện thoại */}
                <div>
                  <label className='block text-sm font-medium mb-1'>
                    Số điện thoại *
                  </label>
                  <input
                    type='text'
                    name='phone'
                    // 🚨 ĐIỀU CHỈNH: Chỉ sử dụng formData.phone.
                    value={formData.phone ?? ''}
                    onChange={handleChange}
                    placeholder='Nhập số điện thoại'
                    required
                    className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-400'
                  />
                </div>

                {/* Địa chỉ: Input giả mở Address Modal */}
                <div>
                  <label className='block text-sm font-medium mb-1'>
                    Địa chỉ
                  </label>
                  <div
                    onClick={() => setShowAddressModal(true)}
                    className='w-full border border-gray-300 rounded-lg px-3 py-2 bg-white cursor-pointer flex justify-between items-center hover:border-yellow-500 transition'
                  >
                    <span
                      className={`${
                        formData.address ? 'text-gray-800' : 'text-gray-400'
                      }`}
                    >
                      {formData.address
                        ? formData.address
                        : 'Chọn địa chỉ (Tỉnh, Quận, Phường/Xã)'}
                    </span>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-5 w-5 text-gray-400'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                    >
                      <path
                        fillRule='evenodd'
                        d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </div>
                </div>

                {/* Ngày sinh */}
                <div>
                  <label className='block text-sm font-medium mb-1'>
                    Ngày sinh
                  </label>
                  <input
                    type='date'
                    name='birthday'
                    // 🚨 ĐIỀU CHỈNH: Chỉ sử dụng formData.birthday.
                    value={formData.birthday ?? ''}
                    onChange={handleChange}
                    className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-400'
                  />
                </div>

                {/* Tên gợi nhớ */}
                <div>
                  <label className='block text-sm font-medium mb-1'>
                    Tên gợi nhớ
                  </label>
                  <input
                    type='text'
                    name='nickname'
                    // 🚨 ĐIỀU CHỈNH: Chỉ sử dụng formData.nickname.
                    value={formData.nickname ?? ''}
                    onChange={handleChange}
                    placeholder='Tên gợi nhớ tối đa 60 từ'
                    maxLength={300}
                    className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-400'
                  />
                  <p className='text-xs text-gray-500 mt-1'>
                    Tên gợi nhớ sau khi được cập nhật sẽ không thể thay đổi
                    trong 60 ngày.
                  </p>
                </div>
              </div>

              {/* Nút Save / Cancel */}
              <div className='flex justify-end gap-3 mt-6'>
                <button
                  onClick={() => setIsEditing(false)}
                  className='px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition'
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className='px-4 py-2 rounded-lg bg-yellow-400 text-gray-900 hover:bg-yellow-500 font-medium transition'
                >
                  Lưu thay đổi
                </button>
              </div>

              {/* Nút đóng modal */}
              <button
                onClick={() => setIsEditing(false)}
                className='absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl'
              >
                ×
              </button>
            </div>
          </div>
        )}

        {/* --- MODAL CHỌN ĐỊA CHỈ --- */}
        {showAddressModal && (
          <div className='fixed inset-0 flex justify-center items-center bg-black/40 z-[60]'>
            <div className='relative bg-white rounded-xl shadow-2xl w-full max-w-lg p-6 animate-fadeIn'>
              <h3 className='text-xl font-semibold text-gray-800 mb-6 text-center'>
                Địa chỉ
              </h3>

              <div className='space-y-4'>
                {/* Tỉnh, Thành phố */}
                <div>
                  <label className='block text-sm font-medium mb-1'>
                    Tỉnh, Thành phố *
                  </label>
                  <select
                    name='provinceCode'
                    value={formData.provinceCode || ''}
                    onChange={handleChange}
                    required
                    className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-400'
                  >
                    <option value=''>Chọn tỉnh/thành phố</option>
                    {provincesList.map((p) => (
                      <option key={p.code} value={p.code}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Quận, Huyện, Thị xã */}
                <div>
                  <label className='block text-sm font-medium mb-1'>
                    Quận, Huyện, Thị xã *
                  </label>
                  <select
                    name='districtCode'
                    value={formData.districtCode || ''}
                    onChange={handleChange}
                    required
                    disabled={!formData.provinceCode}
                    className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-400 disabled:bg-gray-100 disabled:text-gray-500'
                  >
                    <option value=''>Chọn quận/huyện</option>
                    {districtsList.map((d) => (
                      <option key={d.code} value={d.code}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Phường, Xã, Thị trấn */}
                <div>
                  <label className='block text-sm font-medium mb-1'>
                    Phường, Xã, Thị trấn *
                  </label>
                  <select
                    name='wardCode'
                    value={formData.wardCode || ''}
                    onChange={handleChange}
                    required
                    disabled={!formData.districtCode}
                    className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-400 disabled:bg-gray-100 disabled:text-gray-500'
                  >
                    <option value=''>Chọn phường/xã</option>
                    {wardsList.map((w) => (
                      <option key={w.code} value={w.code}>
                        {w.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Địa chỉ cụ thể */}
                <div>
                  <label className='block text-sm font-medium mb-1'>
                    Địa chỉ cụ thể
                  </label>
                  <input
                    type='text'
                    name='specificAddress'
                    // 🚨 ĐIỀU CHỈNH: Chỉ sử dụng formData.specificAddress.
                    value={formData.specificAddress ?? ''}
                    onChange={handleChange}
                    placeholder='Nhập địa chỉ cụ thể (số nhà, tên đường...)'
                    className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-400'
                  />
                </div>
              </div>

              {/* Nút XONG */}
              <div className='mt-6'>
                <button
                  onClick={handleAddressSave}
                  disabled={
                    !formData.provinceCode ||
                    !formData.districtCode ||
                    !formData.wardCode
                  }
                  className='w-full bg-orange-500 text-white font-semibold py-3 rounded-lg hover:bg-orange-600 transition disabled:bg-gray-300 disabled:text-gray-500'
                >
                  XONG
                </button>
              </div>

              {/* Nút đóng modal */}
              <button
                onClick={() => setShowAddressModal(false)}
                className='absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl'
              >
                ×
              </button>
            </div>
          </div>
        )}

        {/* --- MODAL BẢO MẬT TÀI KHOẢN --- */}
        {showSecurity && (
          <div className='fixed inset-0 flex justify-center items-center bg-black/20 backdrop-blur-sm z-50'>
            <div className='relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6 border border-gray-200 animate-fadeIn'>
              <h3 className='text-xl font-semibold text-gray-800 mb-4 text-center'>
                🔒 Cài đặt bảo mật tài khoản
              </h3>

              <div className='space-y-5 text-gray-700'>
                <div>
                  <label className='block text-sm font-medium mb-1'>
                    Đổi mật khẩu
                  </label>
                  <input
                    type='password'
                    placeholder='Nhập mật khẩu mới'
                    className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-400'
                  />
                  <button className='mt-2 bg-yellow-400 hover:bg-yellow-500 text-gray-800 px-4 py-1 rounded-lg text-sm font-medium'>
                    Cập nhật mật khẩu
                  </button>
                </div>

                <div className='border-t border-gray-200 pt-3'>
                  <p className='text-sm'>
                    ✅ Trạng thái xác thực:{' '}
                    <span className='font-medium text-green-600'>
                      {user?.providerData[0]?.providerId === 'google.com'
                        ? 'Đã xác thực Google'
                        : 'Chưa xác thực'}
                    </span>
                  </p>
                </div>

                <div className='border-t border-gray-200 pt-3'>
                  <p className='text-sm'>
                    📧 Email xác minh:{' '}
                    <span className='font-medium'>
                      {user?.emailVerified ? 'Đã xác minh' : 'Chưa xác minh'}
                    </span>
                  </p>
                  {!user?.emailVerified && (
                    <button className='mt-2 bg-yellow-400 hover:bg-yellow-500 text-gray-800 px-4 py-1 rounded-lg text-sm font-medium'>
                      Gửi email xác minh
                    </button>
                  )}
                </div>

                <div className='border-t border-gray-200 pt-3'>
                  <button className='text-blue-600 hover:underline text-sm'>
                    Đăng xuất khỏi tất cả thiết bị
                  </button>
                </div>

                <div className='border-t border-gray-200 pt-3'>
                  <button className='text-red-500 font-medium hover:text-red-600 text-sm'>
                    Xóa tài khoản
                  </button>
                </div>
              </div>

              <div className='flex justify-end gap-3 mt-6'>
                <button
                  onClick={() => setShowSecurity(false)}
                  className='px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition'
                >
                  Đóng
                </button>
              </div>

              <button
                onClick={() => setShowSecurity(false)}
                className='absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl'
              >
                ×
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserProfile
