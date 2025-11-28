import { PostCard } from '@/components/commons/PostCard'
import { Button } from '@/components/ui/button'
import { searchListingsAPI } from '@/apis'

import ListSp from '@/components/ListSp'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { useDebounce } from '@/hooks/useDebounce'
import provincesData from '@/json/provinces.json'
import {
  ChevronDown,
  ChevronUp,
  Filter,
  Grid,
  List as ListIcon,
  Search,
  SlidersHorizontal,
  X
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SORT_OPTIONS } from '@/pages/admin/PostManagement'
import { categoriesMock, products } from '@/constant/constant'
import React from 'react'

const ITEMS_PER_PAGE = 10

export default function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams()

  const [viewMode, setViewMode] = useState('grid')
  const [showAdvanced, setShowAdvanced] = useState(false)

  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '')
  const [locationInput, setLocationInput] = useState(
    searchParams.get('location') || ''
  )

  const [catInput, setCatInput] = useState(searchParams.get('categoryId') || '')
  const [minInput, setMinInput] = useState(searchParams.get('minPrice') || '')
  const [maxInput, setMaxInput] = useState(searchParams.get('maxPrice') || '')

  const [sortBy, setSortBy] = useState(
    searchParams.get('sortBy') || 'createdAt'
  )
  const [sortOrder, setSortOrder] = useState(
    searchParams.get('sortOrder') || 'desc'
  )

  const [priceError, setPriceError] = useState(null)
  const [searchResults, setSearchResults] = useState([])
  const [isFetching, setIsFetching] = useState(false)
  const [error, setError] = useState(null)

  const debouncedSearch = useDebounce(searchTerm, 500)

  const writeOrDelete = (next, key, val, removeIf = (v) => !v) => {
    const s = (val ?? '').trim()
    if (removeIf(s)) next.delete(key)
    else next.set(key, s)
  }

  const onlyDigits = (s) => s.replace(/[^\d]/g, '')

  useEffect(() => {
    setSearchTerm(searchParams.get('q') || '')
    setLocationInput(searchParams.get('location') || '')
    setCatInput(searchParams.get('categoryId') || '')

    const rawMin = searchParams.get('minPrice') || ''
    const rawMax = searchParams.get('maxPrice') || ''
    setMinInput(/^\d+$/.test(rawMin) ? rawMin : '')
    setMaxInput(/^\d+$/.test(rawMax) ? rawMax : '')
    setSortBy(searchParams.get('sortBy') || 'createdAt')
    setSortOrder(searchParams.get('sortOrder') || 'desc')
  }, [searchParams])

  // ----- Debounce search -> URL -----
  useEffect(() => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      writeOrDelete(next, 'q', debouncedSearch)
      return next
    })
  }, [debouncedSearch, setSearchParams])

  const handleLocationChange = (v) => {
    setLocationInput(v)
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      if (v === 'all') next.delete('location')
      else writeOrDelete(next, 'location', v)
      return next
    })
  }

  useEffect(() => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      writeOrDelete(next, 'sortBy', sortBy)
      writeOrDelete(next, 'sortOrder', sortOrder)
      return next
    })
  }, [sortBy, sortOrder, setSearchParams])

  useEffect(() => {
    const min = minInput === '' ? null : parseInt(minInput, 10)
    const max = maxInput === '' ? null : parseInt(maxInput, 10)

    let err = null
    if (min != null && min < 0) err = 'Giá tối thiểu phải ≥ 0'
    else if (max != null && max < 0) err = 'Giá tối đa phải ≥ 0'
    else if (min != null && max != null && max < min)
      err = 'Giá tối đa phải ≥ giá tối thiểu'

    setPriceError(err)
  }, [minInput, maxInput])

  const handleApply = () => {
    if (priceError) return
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      writeOrDelete(next, 'categoryId', catInput, (v) => !v || v === 'all')
      writeOrDelete(next, 'minPrice', minInput, (v) => !v)
      writeOrDelete(next, 'maxPrice', maxInput, (v) => !v)
      return next
    })
  }

  const handleClear = () => {
    setSearchParams({})
  }

  const applied = useMemo(() => {
    return {
      q: searchParams.get('q') || '',
      location: searchParams.get('location') || '',
      categoryId: searchParams.get('categoryId') || '',
      minPrice: searchParams.get('minPrice') || '',
      maxPrice: searchParams.get('maxPrice') || '',
      sortBy: searchParams.get('sortBy') || 'createdAt',
      sortOrder: searchParams.get('sortOrder') || 'desc'
    }
  }, [searchParams])

  const catLoading = false
  const categories = categoriesMock
  const categoryName = ''
  const hasNextPage = false
  const hasFilters = !!(
    applied.q ||
    applied.location ||
    applied.categoryId ||
    applied.minPrice ||
    applied.maxPrice ||
    applied.sortBy !== 'createdAt' ||
    applied.sortOrder !== 'desc'
  )
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategoriesAPI()
        setCategories(res)
      } catch (error) {
        console.error('Failed to fetch categories', error)
      }
    }
    fetchCategories()
  }, [])

  useEffect(() => {
    const performSearch = async () => {
      setIsFetching(true)
      setError(null)
      try {
        const params = Object.fromEntries(searchParams.entries())
        const results = await searchListingsAPI(params)
        setSearchResults(results)
      } catch (err) {
        setError(err)
        console.error('Failed to search listings:', err)
      } finally {
        setIsFetching(false)
      }
    }

    performSearch()
  }, [searchParams])

  const formatPrice = (price) =>
    price ? Number(price).toLocaleString('vi-VN') : ''

  return (
    <div className='max-w-[990px] mx-auto px-4 py-6 space-y-6'>
      {/* Header */}
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
        <div>
          <h1 className='text-2xl font-bold'>Kết quả tìm kiếm</h1>
        </div>
        <div className='flex items-center gap-2'>
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size='sm'
            onClick={() => setViewMode('grid')}
          >
            <Grid className='w-4 h-4' />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size='sm'
            onClick={() => setViewMode('list')}
          >
            <ListIcon className='w-4 h-4' />
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className='space-y-4'>
        <div className='flex flex-col sm:flex-row gap-4'>
          {/* Search */}
          <div className='relative flex-1'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
            <Input
              placeholder='Tìm kiếm bài đăng...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='pl-10'
            />
            {isFetching && (
              <div className='absolute right-3 top-1/2 -translate-y-1/2 animate-spin w-4 h-4 border-b-2 border-gray-600 rounded-full' />
            )}
          </div>

          {/* location */}
          <div className='w-full sm:w-64'>
            <Select value={locationInput} onValueChange={handleLocationChange}>
              <SelectTrigger>
                <Filter className='w-4 h-4 mr-2' />
                <SelectValue placeholder='Chọn tỉnh/thành' />
              </SelectTrigger>
              <SelectContent className='max-h-60 overflow-y-auto'>
                <SelectItem value='all'>Tất cả</SelectItem>
                {provincesData.map((p) => (
                  <SelectItem key={p.code} value={p.name}>
                    {p.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Category */}
          <div className='w-full sm:w-64'>
            <Select
              value={catInput}
              onValueChange={setCatInput}
              disabled={catLoading}
            >
              <SelectTrigger>
                <Filter className='w-4 h-4 mr-2' />
                <SelectValue
                  placeholder={catLoading ? 'Đang tải...' : 'Danh mục'}
                />
              </SelectTrigger>
              <SelectContent className='max-h-60 overflow-y-auto'>
                <SelectItem value='all'>Tất cả</SelectItem>
                {categories.map((c) => (
                  <SelectItem key={c._id} value={String(c._id)}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Clear */}
          {hasFilters && (
            <Button
              variant='outline'
              onClick={handleClear}
              className='shrink-0'
            >
              <X className='w-4 h-4 mr-2' />
              Xóa bộ lọc
            </Button>
          )}
        </div>

        {/* Advanced Toggle */}
        <div className='flex justify-between'>
          <Button
            variant='outline'
            onClick={() => setShowAdvanced(!showAdvanced)}
            className='flex items-center gap-2'
          >
            <SlidersHorizontal className='w-4 h-4' /> Bộ lọc nâng cao
            {showAdvanced ? (
              <ChevronUp className='w-4 h-4' />
            ) : (
              <ChevronDown className='w-4 h-4' />
            )}
          </Button>
        </div>

        {/* Active filter chips */}
        {hasFilters && (
          <div className='flex flex-wrap items-center gap-2 text-sm text-gray-600 pt-2'>
            <span>Bộ lọc đang áp dụng:</span>
            {applied.q && (
              <span className='bg-blue-100 text-blue-800 px-2 py-1 rounded'>
                Tìm kiếm: "{applied.q}"
              </span>
            )}
            {applied.location && (
              <span className='bg-indigo-100 text-indigo-800 px-2 py-1 rounded'>
                Tỉnh: {applied.location}
              </span>
            )}
            {applied.categoryId && (
              <span className='bg-green-100 text-green-800 px-2 py-1 rounded'>
                Danh mục: {categoryName || 'Đang tải...'}
              </span>
            )}
            {(applied.minPrice || applied.maxPrice) && (
              <span className='bg-purple-100 text-purple-800 px-2 py-1 rounded'>
                Giá: {formatPrice(applied.minPrice) || '0'} -{' '}
                {formatPrice(applied.maxPrice) || '∞'} VNĐ
              </span>
            )}
            {(applied.sortBy !== 'createdAt' ||
              applied.sortOrder !== 'desc') && (
              <span className='bg-gray-100 text-gray-800 px-2 py-1 rounded'>
                Sắp xếp:{' '}
                {SORT_OPTIONS.find((o) => o.value === applied.sortBy)?.label} (
                {applied.sortOrder === 'desc' ? 'Giảm dần' : 'Tăng dần'})
              </span>
            )}
          </div>
        )}

        {/* Advanced */}
        {showAdvanced && (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg'>
            {/* Price */}
            <div>
              <label className='block text-sm'>Khoảng giá</label>
              <div className='flex gap-2'>
                <Input
                  type='number'
                  min={0}
                  step={1}
                  inputMode='numeric'
                  pattern='[0-9]*'
                  placeholder='Từ'
                  value={minInput}
                  onChange={(e) => setMinInput(onlyDigits(e.target.value))}
                  onBlur={(e) =>
                    setMinInput(
                      onlyDigits(e.target.value).replace(/^0+(?=\d)/, '')
                    )
                  }
                  aria-invalid={!!priceError}
                  className='text-sm'
                />
                <Input
                  type='number'
                  min={0}
                  step={1}
                  inputMode='numeric'
                  pattern='[0-9]*'
                  placeholder='Đến'
                  value={maxInput}
                  onChange={(e) => setMaxInput(onlyDigits(e.target.value))}
                  onBlur={(e) =>
                    setMaxInput(
                      onlyDigits(e.target.value).replace(/^0+(?=\d)/, '')
                    )
                  }
                  aria-invalid={!!priceError}
                  className='text-sm'
                />
              </div>
              {priceError && (
                <p className='mt-1 text-xs text-red-600'>{priceError}</p>
              )}
            </div>
            {/* Sort */}
            <div>
              <label className='block text-sm'>Sắp xếp</label>
              <div className='flex gap-2'>
                <Select value={sortBy} onValueChange={(v) => setSortBy(v)}>
                  <SelectTrigger className='text-sm'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {SORT_OPTIONS.map((o) => (
                      <SelectItem key={o.value} value={o.value}>
                        {o.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  value={sortOrder}
                  onValueChange={(v) => setSortOrder(v)}
                >
                  <SelectTrigger className='text-sm w-24'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='desc'>Giảm dần</SelectItem>
                    <SelectItem value='asc'>Tăng dần</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            {/* Apply */}
            <div className='col-span-full flex justify-end'>
              <Button onClick={handleApply} disabled={!!priceError}>
                Áp dụng
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Results */}
      <div className='space-y-4'>
        {error && (
          <div className='text-red-500 text-center'>
            Có lỗi xảy ra khi tải kết quả tìm kiếm.
          </div>
        )}

        {isFetching ? (
          <div className='grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-5 md:gap-4'>
            {Array.from({ length: 10 }).map((_, idx) => (
              <div
                key={idx}
                className='animate-pulse bg-white rounded-md shadow p-2'
              >
                <div className='bg-gray-200 h-40 sm:h-48 w-full rounded-md mb-2' />
                <div className='h-4 bg-gray-200 rounded w-3/4 mb-2' />
                <div className='h-4 bg-gray-200 rounded w-1/2 mb-2' />
                <div className='h-3 bg-gray-100 rounded w-1/3' />
              </div>
            ))}
          </div>
        ) : (
          <ListSp filteredProducts={searchResults} />
        )}

        {/* Load more */}
        {hasNextPage && (
          <div className='flex justify-center pt-6'>
            <Button onClick={() => {}} disabled={isFetching}>
              {isFetching ? 'Đang tải...' : 'Tải thêm'}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
