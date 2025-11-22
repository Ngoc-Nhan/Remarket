import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProductDetailGallery from './ProductDetailGallery'
import ProductDetailInfo from './ProductDetailInfo'
import { products } from '../../constant/constant'
// import api from '../utils/api'

export default function ProductDetail({}) {
  const { id } = useParams()
  const [product, setProduct] = useState(products[id])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  useEffect(() => {
    let mounted = true
    setLoading(false)
    // api
    //   .get(`/products/${id}`)
    //   .then((res) => {
    //     if (!mounted) return
    //     setProduct(res.data || res)
    //   })
    //   .catch((err) => {
    //     if (!mounted) return
    //     setError(err)
    //   })
    //   .finally(() => {
    //     if (!mounted) return
    //     setLoading(false)
    //   })
    // return () => {
    //   mounted = false
    // }
  }, [id])

  if (loading) return <div className='p-6'>Đang tải...</div>
  if (error) return <div className='p-6 text-red-600'>Lỗi khi tải sản phẩm</div>
  if (!product) return <div className='p-6'>Không tìm thấy sản phẩm</div>

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        <div className='lg:col-span-2'>
          <ProductDetailGallery
            images={product.images || product.photos || []}
          />
        </div>
        <div>
          <ProductDetailInfo product={product} />
        </div>
      </div>

      <section className='mt-8'>
        <h3 className='text-lg font-semibold mb-3'>Mô tả</h3>
        <div className='prose max-w-none'>
          {product.description || 'Không có mô tả.'}
        </div>
      </section>
    </div>
  )
}
