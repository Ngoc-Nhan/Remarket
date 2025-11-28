// import { button, Input } from '@/components/ui'
import { useClickOutside } from '../hooks/useClickOutside'
import { useRecentSearches } from '../hooks/useRecentSearches'
import provinceData from '../json/tree.json'
import { ChevronDown, MapPin, Search, X, Clock, Trash2 } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import React from 'react'

export function HeroSearch() {
  const [isProvinceChooserShown, setIsProvinceChooserShown] = useState(false)
  const [provinceSearchText, setProvinceSearchText] = useState('')
  const [searchParams] = useSearchParams()
  const [selectedProvince, setSelectedProvince] = useState(
    searchParams.get('province') || ''
  )
  const [searchText, setSearchText] = useState(searchParams.get('q') || '')
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const navigate = useNavigate()

  const {
    recentSearches,
    addRecentSearch,
    removeRecentSearch,
    clearRecentSearches,
    getFilteredRecentSearches
  } = useRecentSearches()

  const ref = useRef(null)
  const searchInputRef = useRef(null)
  const recentContainerRef = useRef(null)

  // Extract URL params for effect dependencies
  const urlSearchText = searchParams.get('q') || ''
  const urlProvince = searchParams.get('province') || ''

  // Sync component state with URL parameters when they change
  useEffect(() => {
    setSearchText(urlSearchText)
    setSelectedProvince(urlProvince)
  }, [urlSearchText, urlProvince])

  useClickOutside(ref, () => {
    setIsProvinceChooserShown(false)
  })

  useClickOutside(recentContainerRef, () => {
    setIsSearchFocused(false)
  })

  // Get filtered recent searches for dropdown
  const filteredRecentSearches = useMemo(() => {
    return getFilteredRecentSearches(searchText)
  }, [searchText, getFilteredRecentSearches])

  const filteredProvinces = useMemo(() => {
    return provinceData.filter((province) =>
      province.name.toLowerCase().includes(provinceSearchText.toLowerCase())
    )
  }, [provinceSearchText])

  const handleToggleProvinceChooser = (e, isShown) => {
    e.stopPropagation()
    setIsProvinceChooserShown(isShown)
  }

  const handleConfirmProvince = () => {
    if (selectedProvince) {
      const params = new URLSearchParams()
      const currentQ = searchParams.get('q')
      if (currentQ) {
        params.set('q', currentQ)
      }
      params.set('province', selectedProvince)

      if (currentQ) {
        navigate(`/search?${params.toString()}`)
      } else {
        navigate(`/?${params.toString()}`)
      }
      setIsProvinceChooserShown(false)
    }
  }

  const handleSearch = () => {
    const newQ = searchText.trim()
    if (!newQ) return

    addRecentSearch(newQ, selectedProvince || undefined)

    const params = new URLSearchParams()
    params.set('q', newQ)
    if (selectedProvince) {
      params.set('province', selectedProvince)
    }

    setIsSearchFocused(false)
    navigate(`/search?${params.toString()}`)
  }

  const handleRecentSearchClick = (query, province) => {
    setSearchText(query)
    if (province) {
      setSelectedProvince(province)
    }

    const params = new URLSearchParams()
    params.set('q', query)
    if (province) {
      params.set('province', province)
    }

    setIsSearchFocused(false)
    navigate(`/search?${params.toString()}`)
  }

  const handleSearchInputFocus = () => {
    setIsSearchFocused(true)
  }
  // const navigate = useNavigate()
  const handleClickDM = (id) => {
    const params = new URLSearchParams()
    params.set('categoryId', id)
    navigate(`/search?${params.toString()}`)
  }
  return (
    <div className='bg-white p-2 rounded-xl shadow-lg flex flex-col md:flex-row w-full max-w-7xl'>
      <div
        className={`flex-1 py-2 px-2  transition-opacity duration-300 sm:py-2.5 sm:pl-6 sm:pr-8 w-full`}
      >
        <div className='flex items-center bg-white rounded-sm'>
          <div
            ref={recentContainerRef}
            className='pl-2 sm:pl-5 flex-1 relative'
          >
            <input
              ref={searchInputRef}
              type='text'
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onFocus={handleSearchInputFocus}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  handleSearch()
                }
                if (e.key === 'Escape') {
                  setIsSearchFocused(false)
                }
              }}
              placeholder='Tìm kiếm sản phẩm'
              className='outline-none text-md sm:text-lg w-full border-r border-gray-300'
            />

            {isSearchFocused && filteredRecentSearches.length > 0 && (
              <div className='absolute top-full left-0 min-w-2xs right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-64 overflow-y-auto divide-y divide-gray-100'>
                <div className='flex items-center justify-between px-4 py-2 bg-gray-50 rounded-t-md'>
                  <div className='flex items-center gap-1 text-md text-gray-600'>
                    <Clock className='w-4 h-4' />
                    <span>Gần đây</span>
                  </div>
                  {recentSearches.length > 0 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        clearRecentSearches()
                      }}
                      className='text-gray-400 hover:text-red-500 transition-colors cursor-pointer'
                    >
                      <Trash2 className='w-4 h-4' />
                    </button>
                  )}
                </div>

                {filteredRecentSearches.map((item) => (
                  <div
                    key={item.id}
                    onClick={() =>
                      handleRecentSearchClick(item.query, item.province)
                    }
                    className='flex items-center  justify-between px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors'
                  >
                    <div className='flex flex-col flex-1 min-w-0'>
                      <span className='text-md text-gray-800 truncate'>
                        {item.query}
                      </span>
                      {item.province && (
                        <span className='text-lg text-gray-500 truncate'>
                          {item.province}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        removeRecentSearch(item.id)
                      }}
                      className='ml-3 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity'
                    >
                      <X className='w-4 h-4' />
                    </button>
                  </div>
                ))}

                <div className='px-4 py-2 text-md text-center text-gray-500'>
                  Chọn để tìm lại hoặc tiếp tục tìm kiếm mới
                </div>
              </div>
            )}
          </div>
          <div
            onClick={(e) => handleToggleProvinceChooser(e, true)}
            className='flex h-full pl-2 items-center sm:justify-between sm:w-[120px]  cursor-pointer w-auto pr-2 sm:pr-3 border-gray-300 rounded-lg md:rounded-l-none md:rounded-r-lg ml-2 md:ml-4'
          >
            <span className='inline-flex items-center gap-1 text-sm sm:text-md font-normal'>
              <span className=''>
                <span className='sm:flex hidden'>
                  {selectedProvince || 'Chọn vị trí'}
                </span>
                <span className='sm:hidden block'>📌</span>
              </span>
            </span>
            <ChevronDown className='w-4 h-4 sm:w-5 sm:h-5' />
          </div>
          <button
            className='bg-yellow-500 hover:bg-yellow-600 text-white font-bold md:py-2 py-1 px-2 md:px-6 rounded-lg md:rounded-lg md:rounded-l-none  md:w-auto md:ml-2 cursor-pointer'
            onClick={handleSearch}
          >
            Tìm kiếm
          </button>
        </div>

        {isProvinceChooserShown && (
          <div className='fixed z-9999 inset-0 flex justify-center items-center bg-black/30 p-2'>
            <div
              ref={ref}
              className='max-w-[480px] max-h-[700px] h-full w-full bg-white p-4 shadow-lg rounded-sm'
            >
              <div className='h-full flex flex-col'>
                <div className='flex items-center'>
                  <X
                    className='cursor-pointer'
                    onClick={(e) => handleToggleProvinceChooser(e, false)}
                  />
                  <span className='flex-1 text-center'>Chọn khu vực</span>
                </div>

                <div className='py-4'>
                  <input
                    className='w-full border border-gray-300 rounded-sm px-3 py-2 outline-none'
                    type='text'
                    value={provinceSearchText}
                    onChange={(e) => setProvinceSearchText(e.target.value)}
                    placeholder='Tìm tỉnh, thành phố'
                  />
                </div>

                <div className='flex flex-1 flex-col overflow-y-auto pb-2'>
                  {/* <label
                  key='all'
                  htmlFor='all'
                  className='px-4 py-3 hover:bg-gray-200 cursor-pointer inline-flex items-center'
                >
                  <span className='flex-1 text-sm'>Chọn vị trí</span>
                  <input
                    type='radio'
                    className='accent-app-secondary'
                    checked={selectedProvince === ''}
                    value=''
                    onChange={() => setSelectedProvince('')}
                    id='all'
                    name='province'
                  />
                </label> */}
                  {filteredProvinces.map((province) => (
                    <label
                      key={province.code}
                      htmlFor={province.name}
                      className='px-4 py-3 hover:bg-gray-200 cursor-pointer inline-flex items-center'
                    >
                      <span className='flex-1 text-sm'>{province.name}</span>
                      <input
                        type='radio'
                        className='accent-app-secondary'
                        checked={selectedProvince === province.name}
                        value={province.name}
                        onChange={() => setSelectedProvince(province.name)}
                        id={province.name}
                        name='province'
                      />
                    </label>
                  ))}
                </div>

                <button
                  onClick={handleConfirmProvince}
                  variant={'app-secondary'}
                  size={'lg'}
                >
                  Xác nhận
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
