import React, { useEffect, useState } from 'react'
import { categoriesMock } from '../constant/constant'
import { getAllListingsSimpleAPI } from '@/apis'
import ListSp from '../components/ListSp'
import banner3 from '../assets/herobanner.png'
import { HeroSearch } from '../components/HeroSearch'
import {
  Zap,
  Bike,
  Sofa,
  Microwave,
  Shirt,
  Baby,
  Hammer,
  Grid2x2
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
function Home() {
  const [isExpanded, setIsExpanded] = useState(false)
  const navigate = useNavigate()
  const handleClickDM = (id) => {
    const params = new URLSearchParams()
    params.set('categoryId', id)
    navigate(`/search?${params.toString()}`)
  }
  const [activeTab, setActiveTab] = useState('forYou')
  const [postList, setPostList] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchListings = async () => {
      setIsLoading(true)
      try {
        const listings = await getAllListingsSimpleAPI()
        console.log(listings)
        setPostList(listings)
      } catch (error) {
        console.error('Failed to fetch listings:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchListings()
  }, [])

  return (
    <div className='h-full w-full bg-[#f9fafb]'>
      {/* Header banner với thanh tìm kiếm */}
      <div
        className='relative bg-gradient-to-r from-yellow-600 to-yellow-400 py-12 md:py-16 overflow-visible'
        style={{
          backgroundImage: `url(${banner3})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Hình ảnh trang trí (mô phỏng theo hình ảnh) */}
        <div className='absolute w-full h-full inset-0 bg-gradient-to-r from-yellow-600/60 to-yellow-400/60' />
        {/* <div className='absolute inset-0 bg-gradient-to-r from-hero-from/90 to-hero-to/90' /> */}
        <div className='container relative z-10 mx-auto  pt-[4rem] '>
          <h1 className='text-xl md:text-3xl lg:text-4xl font-bold text-center text-black mb-4'>
            Khám phá và tìm kiếm thứ bạn cần
          </h1>

          {/* Thanh tìm kiếm và bộ lọc */}
          <div className='flex justify-center '>
            {/* <div className='bg-white p-2 rounded-xl shadow-lg flex flex-col md:flex-row w-full max-w-7xl'> */}
            {/* Menu Danh mục (Dropdown) */}
            {/* <div className='px-4 py-2 md:border-r border-gray-300 flex items-center justify-between cursor-pointer hover:bg-gray-100 rounded-lg md:rounded-l-lg md:rounded-r-none mb-2 md:mb-0'>
                <span className='font-medium text-gray-700'>Danh mục</span>
                <svg
                  className='w-4 h-4 ml-2 text-gray-500'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M19 9l-7 7-7-7'
                  ></path>
                </svg>
              </div> */}

            {/* Ô tìm kiếm sản phẩm */}
            {/* <input
                type='text'
                placeholder='Tìm sản phẩm...'
                className='flex-grow px-4 md:py-6 py-2 text-gray-800 focus:outline-none rounded-lg mb-2 md:mb-0 md:rounded-none'
              /> */}
            <HeroSearch />

            {/* Vị trí */}
            {/* <div className='px-4 py-2 md:border-l border-gray-300 flex items-center justify-between cursor-pointer hover:bg-gray-100 rounded-lg md:rounded-none mb-2 md:mb-0'>
                <span className='font-medium text-gray-700'>
                  Tp Hồ Chí Minh
                </span>
                <svg
                  className='w-4 h-4 ml-2 text-gray-500'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M19 9l-7 7-7-7'
                  ></path>
                </svg>
              </div> */}

            {/* Nút Tìm kiếm */}
            {/* <button className='bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded-lg md:rounded-r-lg md:rounded-l-none w-full md:w-auto md:ml-2'>
                Tìm kiếm
              </button> */}
            {/* </div> */}
          </div>
        </div>
      </div>

      {/* Khu vực danh mục chính */}
      <div className='container mx-auto px-10  mt-6'>
        <div className='bg-white pb-6 rounded-2xl shadow-sm '>
          <div className='flex justify-center gap-7 py-6 items-center flex-wrap'>
            {categoriesMock.map((category) => {
              const Icon = category.icon
              return (
                category && (
                  <div
                    key={category.id ?? category.slug}
                    className='flex flex-col w-30 h-30 items-center p-2 hover:scale-105 transition duration-200 cursor-pointer rounded-2xl'
                    onClick={() => handleClickDM(category?.id)}
                  >
                    {/* <div className='w-30 h-30 mx-2  mb-1 flex flex-col items-center justify-center bg-gray-100 rounded-lg'> */}
                    <div
                      className={`${category.color}  flex flex-col items-center justify-centerp-3 rounded-lg  transition-colors relative`}
                    >
                      <Icon className='w-20 h-20' />
                      <span className='text-lg text-center text-gray-700 mt-2'>
                        {category.name}
                      </span>
                    </div>

                    {/* </div> */}
                  </div>
                )
              )
            })}

            {/* Item: Tất cả danh mục */}

            <div className='flex flex-col w-30 h-30 items-center p-2 hover:scale-105 transition duration-200 cursor-pointer rounded-2xl'>
              <div
                className={`text-amber-400  flex flex-col items-center justify-centerp-3 rounded-lg  transition-colors relative`}
              >
                <Grid2x2 className='w-20 h-20' />
                <span className='text-lg text-center text-gray-700 mt-2'>
                  Tất cả danh mục
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Tabs */}
      <div className='container px-4 mx-auto  pt-5  font-medium '>
        <div className='tabs tabs-bordered'>
          <div className='flex space-x-8'></div>
          {/* <a
            className={`tab ${activeTab === 'latest' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('latest')}
          >
            Mới nhất
          </a>
          <a
            className={`tab ${activeTab === 'video' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('video')}
          >
            Video
          </a> */}
        </div>

        {/* Nội dung Tab */}
        <div className=' mx-auto container px-6 rounded-2xl'>
          <div className='flex relative'>
            <div className='mb-7 px-2 border-b-2 border-orange-500 text-orange-500 text-xl font-medium cursor-pointer'>
              Dành cho bạn
            </div>
          </div>
          {isLoading && postList.length === 0 ? (
            <div className='grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-5 md:gap-4'>
              {Array.from({ length: 9 }).map((_, idx) => (
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
          ) : postList.length === 0 ? (
            <p>Không có sản phẩm nào</p>
          ) : (
            <ListSp filteredProducts={postList} />
          )}
        </div>
        <div className='bg-white mt-4 p-6  rounded-2xl'>
          <h2 className='text-xl'>
            Secondhand Shop – Đồ Cũ, Lối Sống Mới – Tiết Kiệm & Bền Vững
          </h2>
          <div className='text-gray-500 mt-2 space-y-2'>
            <span>
              <strong>Secondhand Shop </strong>
              ra đời với sứ mệnh giúp bạn mua bán, trao đổi đồ cũ một cách dễ
              dàng – nhanh chóng – an toàn – tiết kiệm.
            </span>
            <br />
            <span>
              Chúng tôi tạo ra một không gian trung gian đáng tin cậy, nơi người
              có đồ không dùng nữa có thể kết nối trực tiếp với người đang cần,
              mang đến những giao dịch tiện lợi và giá trị bền vững.
            </span>
            <br />
            <span>
              <strong>Secondhand Shop </strong> là nền tảng mua bán đồ cũ mới ra
              mắt, được xây dựng với mong muốn mang đến cho người dùng Việt Nam
              một không gian trao đổi đồ cũ an toàn, tiện lợi và tiết kiệm.
            </span>
            <br />
            <span>
              Tại đây, bạn có thể dễ dàng đăng tin hoặc tìm kiếm hàng ngàn sản
              phẩm thuộc nhiều lĩnh vực:
            </span>
            <br />
            {isExpanded && (
              <div className='mt-3 text-gray-500'>
                <ul className='list-disc ml-6 space-y-2'>
                  <li>
                    <strong>Đồ điện tử</strong>: Điện thoại, laptop, tivi, tủ
                    lạnh, máy lạnh...
                  </li>
                  <li>
                    <strong>Nội thất & Gia dụng</strong>: Bàn ghế, tủ, giường,
                    quạt, đồ bếp...
                  </li>
                  <li>
                    <strong>Thời trang</strong>: Quần áo, giày dép, túi xách,
                    phụ kiện thời trang...
                  </li>
                  <li>
                    <strong>Phương tiện</strong>: Xe máy, xe đạp, ô tô...
                  </li>
                  <li>
                    <strong>Sách, và nhiều sản phẩm khác.</strong>
                  </li>
                </ul>

                <p className='mt-3'>
                  Chúng tôi tin rằng mỗi món đồ cũ đều mang một giá trị riêng –
                  và Secondhand Shop ra đời để giúp bạn tái sử dụng, tiết kiệm
                  chi phí và góp phần bảo vệ môi trường.
                </p>

                <p className='mt-2'>
                  Chỉ với vài bước đơn giản – chụp ảnh, viết mô tả ngắn gọn và
                  đăng tin – bạn đã có thể kết nối với hàng ngàn người mua tiềm
                  năng.
                </p>

                <div className='flex justify-center mt-3'>
                  <em>
                    <strong>
                      Secondhand Shop – Khởi đầu mới cho những món đồ cũ.
                    </strong>
                  </em>
                </div>
              </div>
            )}
            <button
              className='border-1 rounded-lg p-1.5 '
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? 'Thu gọn' : 'Mở rộng'}
            </button>
          </div>
        </div>

        <div className='bg-white mt-4 p-6 rounded-2xl'>
          <h1 className='text-gray-600 text-lg'>Các khóa phổ biến</h1>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4 text-gray-500 mt-2   '>
            {/* Cột 1 */}
            <ul className='space-y-2 list-disc list-inside'>
              <li>iPhone 12</li>
              <li>iPhone 14 Pro Max</li>
              <li>Điện Thoại iPhone Cũ</li>
              <li>Điện thoại Samsung Cũ</li>
              <li>Máy quay cũ</li>
              <li>Loa Cũ</li>
              <li>Điện Thoại Cũ</li>
            </ul>

            {/* Cột 2 */}
            <ul className='space-y-2 list-disc list-inside'>
              <li>iPhone 12 Mini</li>
              <li>iPhone 14 Plus</li>
              <li>Dàn karaoke cũ</li>
              <li>Máy tính để bàn giá rẻ</li>
              <li>Micro cũ</li>
              <li>Máy tính để bàn cũ</li>
              <li>Macbook</li>
            </ul>

            {/* Cột 3 */}
            <ul className='space-y-2 list-disc list-inside'>
              <li>iPhone 12 Pro</li>
              <li>iPhone 14 Pro</li>
              <li>Tivi cũ giá rẻ</li>
              <li>Ống kính (lens) cũ</li>
              <li>Tai Nghe Cũ</li>
              <li>Máy Tính Bảng Cũ</li>
            </ul>

            {/* Cột 4 */}
            <ul className='space-y-2 list-disc list-inside'>
              <li>iPhone 12 Pro Max</li>
              <li>Samsung S25 Edge</li>
              <li>iPhone 16e</li>
              <li>Máy ảnh cũ</li>
              <li>Amply</li>
              <li>Laptop Cũ</li>
            </ul>
          </div>
        </div>
        {/* Chân trang */}
      </div>
      <div className=''>
        <footer className='footer    sm:footer-horizontal bg-base-200 text-base-content p-6 mt-4'>
          <aside>
            <svg
              width='50'
              height='50'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
              fillRule='evenodd'
              clipRule='evenodd'
              className='fill-current'
            >
              <path d='M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z'></path>
            </svg>
            <p>
              ACME Industries Ltd.
              <br />
              Providing reliable tech since 1992
            </p>
          </aside>
          <nav>
            <h6 className='footer-title'>Services</h6>
            <a className='link link-hover'>Branding</a>
            <a className='link link-hover'>Design</a>
            <a className='link link-hover'>Marketing</a>
            <a className='link link-hover'>Advertisement</a>
          </nav>
          <nav>
            <h6 className='footer-title'>Company</h6>
            <a className='link link-hover'>About us</a>
            <a className='link link-hover'>Contact</a>
            <a className='link link-hover'>Jobs</a>
            <a className='link link-hover'>Press kit</a>
          </nav>
          <nav>
            <h6 className='footer-title'>Legal</h6>
            <a className='link link-hover'>Terms of use</a>
            <a className='link link-hover'>Privacy policy</a>
            <a className='link link-hover'>Cookie policy</a>
          </nav>
        </footer>
      </div>
    </div>
  )
}

export default Home
