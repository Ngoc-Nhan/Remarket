import { useState, useEffect } from 'react'
import React from 'react'
export function AddressDialog({ isOpen, onClose, onSave, initialAddress }) {
  const [province, setProvince] = useState('')
  const [provinceLabel, setProvinceLabel] = useState('')
  const [ward, setWard] = useState('')
  const [wardLabel, setWardLabel] = useState('')
  const [specificAddress, setSpecificAddress] = useState('')

  // Mock data - replace with your actual API calls
  const provinces = [
    { id: '01', name: 'Hà Nội' },
    { id: '02', name: 'Hồ Chí Minh' },
    { id: '03', name: 'Đà Nẵng' },
    { id: '04', name: 'Hải Phòng' },
    { id: '05', name: 'Cần Thơ' },
    { id: '06', name: 'Quảng Trị' }
  ]

  const wardsByProvince = {
    '01': [
      { id: '001', name: 'Ba Đình' },
      { id: '002', name: 'Hoàn Kiếm' },
      { id: '003', name: 'Tây Hồ' },
      { id: '004', name: 'Cầu Giấy' }
    ],
    '02': [
      { id: '101', name: 'Quận 1' },
      { id: '102', name: 'Quận 2' },
      { id: '103', name: 'Quận 3' },
      { id: '104', name: 'Quận 4' }
    ],
    '03': [
      { id: '201', name: 'Hải Châu' },
      { id: '202', name: 'Thanh Khê' },
      { id: '203', name: 'Sơn Trà' },
      { id: '204', name: 'Ngũ Hành Sơn' }
    ],
    '04': [
      { id: '301', name: 'Hồng Bàng' },
      { id: '302', name: 'Ngô Quyền' },
      { id: '303', name: 'Lê Chân' },
      { id: '304', name: 'Kiến An' }
    ],
    '05': [
      { id: '401', name: 'Ninh Kiều' },
      { id: '402', name: 'Bình Thủy' },
      { id: '403', name: 'Cái Răng' },
      { id: '404', name: 'Ô Môn' }
    ],
    '06': [
      { id: '501', name: 'Bắc Trạch' },
      { id: '502', name: 'Vĩnh Linh' },
      { id: '503', name: 'Đakrông' },
      { id: '504', name: 'Gio Linh' }
    ]
  }

  useEffect(() => {
    if (initialAddress) {
      setProvince(initialAddress.province || '')
      setProvinceLabel(initialAddress.provinceLabel || '')
      setWard(initialAddress.ward || '')
      setWardLabel(initialAddress.wardLabel || '')
      setSpecificAddress(initialAddress.specificAddress || '')
    }
  }, [initialAddress, isOpen])

  const handleProvinceChange = (e) => {
    const selectedId = e.target.value
    const selectedProvince = provinces.find((p) => p.id === selectedId)
    setProvince(selectedId)
    setProvinceLabel(selectedProvince?.name || '')
    setWard('')
    setWardLabel('')
  }

  const handleWardChange = (e) => {
    const selectedId = e.target.value
    const wards = wardsByProvince[province] || []
    const selectedWard = wards.find((w) => w.id === selectedId)
    setWard(selectedId)
    setWardLabel(selectedWard?.name || '')
  }

  const handleSave = () => {
    if (!province || !ward || !specificAddress.trim()) {
      alert('Vui lòng điền đầy đủ thông tin địa chỉ')
      return
    }

    onSave({
      province,
      provinceLabel,
      ward,
      wardLabel,
      specificAddress
    })
  }

  const currentWards = wardsByProvince[province] || []

  if (!isOpen) return null

  return (
    <>
      {/* Modal Backdrop */}
      <div
        className='fixed inset-0 bg-black bg-opacity-50 z-40'
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className='fixed inset-0 flex items-center justify-center z-50 p-4'>
        <div className='bg-white rounded-lg shadow-2xl w-full max-w-md'>
          {/* Modal Header */}
          <div className='flex items-center justify-between p-6 border-b-2 border-gray-200'>
            <h2 className='text-xl font-bold text-gray-900'>Địa chỉ</h2>
            <button
              onClick={onClose}
              className='text-gray-400 hover:text-gray-600 text-3xl leading-none font-light'
            >
              ×
            </button>
          </div>

          {/* Modal Body */}
          <div className='p-6 space-y-5'>
            {/* Province Select */}
            <div>
              <label className='form-control w-full'>
                <div className='label pb-2'>
                  <span className='label-text font-semibold text-gray-700'>
                    Tỉnh, Thành phố <span className='text-red-500'>*</span>
                  </span>
                </div>
                <select
                  value={province}
                  onChange={handleProvinceChange}
                  className='select select-bordered w-full bg-white border-gray-300 focus:border-blue-500'
                >
                  <option value=''>Chọn tỉnh, thành phố</option>
                  {provinces.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {/* Ward Select */}
            <div>
              <label className='form-control w-full'>
                <div className='label pb-2'>
                  <span className='label-text font-semibold text-gray-700'>
                    Phường, Xã, Thị trấn <span className='text-red-500'>*</span>
                  </span>
                </div>
                <select
                  value={ward}
                  onChange={handleWardChange}
                  className='select select-bordered w-full bg-white border-gray-300 focus:border-blue-500'
                  disabled={!province}
                >
                  <option value=''>
                    {province ? 'Chọn phường, xã, thị trấn' : 'Chọn tỉnh trước'}
                  </option>
                  {currentWards.map((w) => (
                    <option key={w.id} value={w.id}>
                      {w.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {/* Specific Address */}
            <div>
              <label className='form-control w-full'>
                <div className='label pb-2'>
                  <span className='label-text font-semibold text-gray-700'>
                    Địa chỉ cụ thể <span className='text-red-500'>*</span>
                  </span>
                </div>
                <input
                  type='text'
                  placeholder='Địa chỉ cụ thể'
                  className='input input-bordered w-full bg-white border-gray-300 focus:border-blue-500'
                  value={specificAddress}
                  onChange={(e) => setSpecificAddress(e.target.value)}
                />
              </label>
            </div>
          </div>

          {/* Modal Footer */}
          <div className='p-6 border-t-2 border-gray-200'>
            <button
              onClick={handleSave}
              className='btn w-full bg-orange-500 hover:bg-orange-600 border-0 text-white font-bold text-lg rounded-md'
            >
              XONG
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddressDialog
