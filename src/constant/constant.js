const provinces = [
  'Hà Nội',
  'TP. Hồ Chí Minh',
  'Đà Nẵng',
  'Hải Phòng',
  'Cần Thơ',
  'Bình Dương',
  'Đồng Nai',
  'Khánh Hòa',
  'Lâm Đồng',
  'Thanh Hóa',
  'Nghệ An',
  'Huế',
  'Quảng Ninh',
  'An Giang',
  'Kiên Giang',
  'Bạc Liêu',
  'Sóc Trăng',
  'Vĩnh Long',
  'Long An',
  'Tiền Giang'
]
// Mock data sản phẩm
const products = [
  {
    id: 1,
    title: 'iPhone 12 Pro Max',
    price: 18000000,
    category: 'Điện thoại',
    condition: 'Đã qua sử dụng',
    location: 'Hồ Chí Minh',
    image: '/iphone.png',
    postedAt: '2023-10-01T10:00:00Z'
  },
  {
    id: 2,
    title: 'Laptop Dell XPS 13',
    price: 25000000,
    category: 'Laptop',
    condition: 'Mới',
    location: 'Hà Nội',
    image: '/lapto.png',
    postedAt: '2025-09-30T14:30:30'
  },
  {
    id: 3,
    title: 'Xe máy Honda SH 150i',
    price: 95000000,
    category: 'Xe cộ',
    condition: 'Đã qua sử dụng',
    location: 'Đà Nẵng',
    image: '/sh.png',
    postedAt: '2025-10-03T07:35:30'
  },
  {
    id: 4,
    title: 'Tủ lạnh Samsung Inverter 360L',
    price: 8500000,
    category: 'Đồ gia dụng',
    condition: 'Mới',
    location: 'Cần Thơ',
    image: '/tulanh.png',
    postedAt: '2025-09-27T09:45:20'
  },
  {
    id: 5,
    title: 'Áo khoác Uniqlo nam',
    price: 450000,
    category: 'Thời trang',
    condition: 'Mới',
    location: 'Huế',
    image: '/ao.png',
    postedAt: '2025-09-29T16:20:10'
  },
  {
    id: 6,
    title: 'Ghế gaming Razer',
    price: 3200000,
    category: 'Nội thất',
    condition: 'Đã qua sử dụng',
    location: 'Hải Phòng',
    image: 'ghe.png',
    postedAt: '2025-09-30T11:05:45'
  },
  {
    id: 7,
    title: 'Máy ảnh Canon EOS M50',
    price: 10500000,
    category: 'Máy ảnh',
    condition: 'Đã qua sử dụng',
    location: 'Nha Trang',
    image: '/mayanh.png',
    postedAt: '2025-09-28T19:40:30'
  },
  {
    id: 8,
    title: 'Loa Bluetooth JBL Charge 4',
    price: 2100000,
    category: 'Âm thanh',
    condition: 'Mới',
    location: 'Hồ Chí Minh',
    image: '/loa.png',
    postedAt: '2025-09-29T08:15:05'
  },
  {
    id: 9,
    title: 'Bàn học gỗ thông',
    price: 1500000,
    category: 'Nội thất',
    condition: 'Mới',
    location: 'Đồng Nai',
    image: '/banhoc.png',
    postedAt: '2025-09-26T13:25:50'
  },
  {
    id: 10,
    title: 'Đồng hồ Casio G-Shock',
    price: 2200000,
    category: 'Phụ kiện',
    condition: 'Đã qua sử dụng',
    location: 'Hà Nội',
    image: 'donghong.png',
    postedAt: '2025-09-30T21:55:15'
  },
  {
    id: 11,
    title: 'Tai nghe Sony WH-1000XM4',
    price: 5900000,
    category: 'Âm thanh',
    condition: 'Mới',
    location: 'Hồ Chí Minh',
    image: '/tainghe.png',
    postedAt: '2025-09-27T10:30:40'
  },
  {
    id: 12,
    title: 'Máy giặt LG Inverter 9Kg',
    price: 6700000,
    category: 'Đồ gia dụng',
    condition: 'Mới',
    location: 'Đà Nẵng',
    image: '/maygiat.png',
    postedAt: '2025-09-29T15:05:25'
  },
  {
    id: 13,
    title: 'Giày Nike Air Force 1',
    price: 2100000,
    category: 'Thời trang',
    condition: 'Mới',
    location: 'Hà Nội',
    image: '/giay.png',
    postedAt: '2025-09-28T20:50:55'
  },
  {
    id: 14,
    title: 'Máy tính bảng iPad Air 4',
    price: 14500000,
    category: 'Tablet',
    condition: 'Đã qua sử dụng',
    location: 'Cần Thơ',
    image: '/ipad.png',
    postedAt: '2025-09-30T17:40:35'
  },
  {
    id: 15,
    title: 'Smart TV LG OLED 55 inch',
    price: 18500000,
    category: 'Điện tử',
    condition: 'Mới',
    location: 'Huế',
    image: '/tv.png',
    postedAt: '2025-09-27T12:10:50'
  },
  {
    id: 16,
    title: 'Bếp điện từ Philips',
    price: 1300000,
    category: 'Đồ gia dụng',
    condition: 'Mới',
    location: 'Đồng Nai',
    image: '/beptu.png',
    postedAt: '2025-09-29T09:35:15'
  }
]

import {
  Zap,
  Bike,
  Sofa,
  Microwave,
  Shirt,
  Baby,
  Play,
  Hammer,
  MoreHorizontal
} from 'lucide-react'

const categoriesMock = [
  {
    _id: 'cate-1',
    name: 'Điện Thoại - Laptop',
    slug: 'dien-thoai-laptop',
    description: '',
    code: '100',
    parentCode: null,
    imageUrl:
      'https://www.chotot.com/_next/image?url=https%3A%2F%2Fstatic.chotot.com%2Fstorage%2Fchapy-pro%2Fnewcats%2Fv12%2F5000.png&w=256&q=95',
    icon: Zap,
    color: 'text-blue-500',
    createdAt: Date.now(),
    updatedAt: null,
    _destroy: false
  },
  {
    _id: 'cate-2',
    name: 'Xe cộ',
    slug: 'xe-co',
    description: '',
    code: '200',
    parentCode: null,
    imageUrl: 'https://placehold.co/300x200?text=Xe+Co',
    icon: Bike,
    color: 'text-red-500',
    createdAt: Date.now(),
    updatedAt: null,
    _destroy: false
  },
  {
    _id: 'cate-3',
    name: 'Đồ dùng - Nội thất',
    slug: 'do-dung-noi-that',
    description: '',
    code: '300',
    parentCode: null,
    imageUrl: 'https://placehold.co/300x200?text=Noi+That',
    icon: Sofa,
    color: 'text-yellow-600',
    createdAt: Date.now(),
    updatedAt: null,
    _destroy: false
  },
  {
    _id: 'cate-4',
    name: 'Điện gia dụng',
    slug: 'dien-gia-dung',
    description: '',
    code: '400',
    parentCode: null,
    imageUrl: 'https://placehold.co/300x200?text=Dien+Gia+Dung',
    icon: Microwave,
    color: 'text-green-500',
    createdAt: Date.now(),
    updatedAt: null,
    _destroy: false
  },
  {
    _id: 'cate-5',
    name: 'Thời trang',
    slug: 'thoi-trang',
    description: '',
    code: '500',
    parentCode: null,
    imageUrl: 'https://placehold.co/300x200?text=Thoi+Trang',
    icon: Shirt,
    color: 'text-pink-500',
    createdAt: Date.now(),
    updatedAt: null,
    _destroy: false
  },
  {
    _id: 'cate-8',
    name: 'Đồ chơi',
    slug: 'do-choi',
    description: '',
    code: '600',
    parentCode: null,
    imageUrl: 'https://placehold.co/300x200?text=Giai+Tri',
    icon: Play,
    color: 'text-indigo-500',
    createdAt: Date.now(),
    updatedAt: null,
    _destroy: false
  },
  {
    _id: 'cate-9',
    name: 'Công cụ - Dụng cụ',
    slug: 'cong-cu-dung-cu',
    description: '',
    code: '700',
    parentCode: null,
    imageUrl: 'https://placehold.co/300x200?text=Cong+Cu',
    icon: Hammer,
    color: 'text-gray-600',
    createdAt: Date.now(),
    updatedAt: null,
    _destroy: false
  },
  {
    _id: 'cate-10',
    name: 'Khác',
    slug: 'khac',
    description: '',
    code: '999',
    parentCode: null,
    imageUrl: 'https://placehold.co/300x200?text=Khac',
    icon: MoreHorizontal,
    color: 'text-teal-500',
    createdAt: Date.now(),
    updatedAt: null,
    _destroy: false
  }
]

export { provinces, products, categoriesMock }
