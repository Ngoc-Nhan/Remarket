import { PostCard } from '@/components/commons/PostCard'
import { Button } from '@/components/ui/button'
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
// import { useGetAllCategories } from '@/services/query/category'
// import { useInfinitePostQuery } from '@/services/query/post'
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
import { AGE_OPTIONS, SIZE_OPTIONS, SORT_OPTIONS } from './admin/PostManagement'
import { categoriesMock, products } from '@/constant/constant'
import React from 'react'

const ITEMS_PER_PAGE = 10

export default function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams()

  const [viewMode, setViewMode] = useState('grid')
  const [showAdvanced, setShowAdvanced] = useState(false)

  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '')
  const [provinceInput, setProvinceInput] = useState(
    searchParams.get('province') || ''
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

  const debouncedSearch = useDebounce(searchTerm, 500)

  const writeOrDelete = (next, key, val, removeIf = (v) => !v) => {
    const s = (val ?? '').trim()
    if (removeIf(s)) next.delete(key)
    else next.set(key, s)
  }

  const onlyDigits = (s) => s.replace(/[^\d]/g, '')

  useEffect(() => {
    setSearchTerm(searchParams.get('q') || '')
    setProvinceInput(searchParams.get('province') || '')
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

  const handleProvinceChange = (v) => {
    setProvinceInput(v)
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      if (v === 'all') next.delete('province')
      else writeOrDelete(next, 'province', v)
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
      province: searchParams.get('province') || '',
      categoryId: searchParams.get('categoryId') || '',
      minPrice: searchParams.get('minPrice') || '',
      maxPrice: searchParams.get('maxPrice') || '',
      sortBy: searchParams.get('sortBy') || 'createdAt',
      sortOrder: searchParams.get('sortOrder') || 'desc'
    }
  }, [searchParams])

  // ====== Query data ======
  // const {
  //   data,
  //   isFetching,
  //   isFetchingNextPage,
  //   fetchNextPage,
  //   hasNextPage,
  //   status,
  //   error
  // } = useInfinitePostQuery({
  //   limit: ITEMS_PER_PAGE,
  //   search: applied.q || undefined,
  //   province: applied.province || undefined,
  //   categoryId: applied.categoryId || undefined,
  //   minPrice: applied.minPrice ? parseInt(applied.minPrice) : undefined,
  //   maxPrice: applied.maxPrice ? parseInt(applied.maxPrice) : undefined,
  //   age: applied.age || undefined,
  //   size: applied.size || undefined,
  //   sortBy: applied.sortBy,
  //   sortOrder: applied.sortOrder
  // })

  // const { data: catRes, isLoading: catLoading } = useGetAllCategories()

  // const categoryName = useMemo(() => {
  //   if (!applied.categoryId || applied.categoryId === 'all') return ''
  //   const list = catRes?.success ? catRes.data : []
  //   return (
  //     list.find((c) => String(c.id) === String(applied.categoryId))?.name || ''
  //   )
  // }, [applied.categoryId, catRes])
  const data = products
  const isFetching = false
  const catLoading = true
  const catRes = categoriesMock
  const categoryName = ''
  const allPosts = []
  const hasNextPage = false
  const hasFilters = !!(
    applied.q ||
    applied.province ||
    applied.categoryId ||
    applied.minPrice ||
    applied.maxPrice ||
    applied.age ||
    applied.size ||
    applied.sortBy !== 'createdAt' ||
    applied.sortOrder !== 'desc'
  )

  // const allPosts = data?.pages.flatMap((p) => (p?.success ? p.data : [])) || []

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

          {/* Province */}
          <div className='w-full sm:w-64'>
            <Select value={provinceInput} onValueChange={handleProvinceChange}>
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
                {catRes.map((c) => (
                  <SelectItem key={c.id} value={String(c.id)}>
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
            {applied.province && (
              <span className='bg-indigo-100 text-indigo-800 px-2 py-1 rounded'>
                Tỉnh: {applied.province}
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
            {/* Age */}
            <div>
              <label className='block text-sm'>Độ tuổi</label>
              <Select value={ageInput} onValueChange={setAgeInput}>
                <SelectTrigger className='text-sm'>
                  <SelectValue placeholder='Chọn độ tuổi' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all'>Tất cả</SelectItem>
                  {AGE_OPTIONS.map((a) => (
                    <SelectItem key={a.value} value={a.value}>
                      {a.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {/* Size */}
            <div>
              <label className='block text-sm'>Kích thước</label>
              <Select value={sizeInput} onValueChange={setSizeInput}>
                <SelectTrigger className='text-sm'>
                  <SelectValue placeholder='Chọn kích thước' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all'>Tất cả</SelectItem>
                  {SIZE_OPTIONS.map((s) => (
                    <SelectItem key={s.value} value={s.value}>
                      {s.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
        {status === 'error' && (
          <div className='text-red-500'>Có lỗi: {error.message}</div>
        )}

        {/* No results */}
        {status === 'success' && allPosts.length === 0 && (
          <div className='text-center text-gray-500 py-12'>
            Không có kết quả
          </div>
        )}

        {/* Grid/List */}
        <div
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-4'
          }
        >
          {allPosts.map((post) => (
            <PostCard key={post.id} post={post} viewMode={viewMode} />
          ))}

          {isFetching &&
            Array.from({
              length: Math.max(
                0,
                ITEMS_PER_PAGE -
                  (allPosts.length % ITEMS_PER_PAGE || ITEMS_PER_PAGE)
              )
            }).map((_, idx) => (
              <PostCard.Skeleton key={idx} viewMode={viewMode} />
            ))}
        </div>

        {/* Load more */}
        {hasNextPage && (
          <div className='flex justify-center pt-6'>
            <Button
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
            >
              {isFetchingNextPage ? 'Đang tải...' : 'Tải thêm'}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
