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
    id: 'cate-1',
    name: 'Điện Thoại - Laptop',
    slug: 'dien-tu',
    image: 'https://placehold.co/300x200?text=Dien+Tu',
    parentId: null,
    icon: Zap,
    color: 'text-blue-500'
  },
  {
    id: 'cate-1-1',
    name: 'Điện thoại',
    slug: 'dien-thoai',
    image: 'https://placehold.co/300x200?text=Dien+Thoai',
    parentId: 'cate-1'
  },
  {
    id: 'cate-1-2',
    name: 'Laptop',
    slug: 'laptop',
    image: 'https://placehold.co/300x200?text=Laptop',
    parentId: 'cate-1'
  },
  {
    id: 'cate-1-3',
    name: 'Máy tính bảng',
    slug: 'may-tinh-bang',
    image: 'https://placehold.co/300x200?text=Tablet',
    parentId: 'cate-1'
  },
  {
    id: 'cate-1-4',
    name: 'Màn hình',
    slug: 'man-hinh',
    image: 'https://placehold.co/300x200?text=Monitor',
    parentId: 'cate-1'
  },
  {
    id: 'cate-1-5',
    name: 'Phụ kiện công nghệ',
    slug: 'phu-kien-cong-nghe',
    image: 'https://placehold.co/300x200?text=Accessory',
    parentId: 'cate-1'
  },

  {
    id: 'cate-2',
    name: 'Xe cộ',
    slug: 'xe-co',
    image: 'https://placehold.co/300x200?text=Xe+Co',
    parentId: null,
    icon: Bike,
    color: 'text-red-500'
  },
  {
    id: 'cate-2-1',
    name: 'Xe máy',
    slug: 'xe-may',
    image: 'https://placehold.co/300x200?text=Xe+May',
    parentId: 'cate-2'
  },
  {
    id: 'cate-2-2',
    name: 'Ô tô',
    slug: 'o-to',
    image: 'https://placehold.co/300x200?text=O+To',
    parentId: 'cate-2'
  },
  {
    id: 'cate-2-3',
    name: 'Xe đạp',
    slug: 'xe-dap',
    image: 'https://placehold.co/300x200?text=Xe+DAP',
    parentId: 'cate-2'
  },
  {
    id: 'cate-2-4',
    name: 'Xe điện',
    slug: 'xe-dien',
    image: 'https://placehold.co/300x200?text=Xe+Dien',
    parentId: 'cate-2'
  },

  {
    id: 'cate-3',
    name: 'Đồ dùng - Nội thất',
    slug: 'do-dung-noi-that',
    image: 'https://placehold.co/300x200?text=Noi+That',
    parentId: null,
    icon: Sofa,
    color: 'text-yellow-600'
  },
  {
    id: 'cate-3-1',
    name: 'Bàn ghế',
    slug: 'ban-ghe',
    image: 'https://placehold.co/300x200?text=Ban+Ghe',
    parentId: 'cate-3'
  },
  {
    id: 'cate-3-2',
    name: 'Giường nệm',
    slug: 'giuong-nem',
    image: 'https://placehold.co/300x200?text=Giuong+Nem',
    parentId: 'cate-3'
  },
  {
    id: 'cate-3-3',
    name: 'Tủ kệ',
    slug: 'tu-ke',
    image: 'https://placehold.co/300x200?text=Tu+Ke',
    parentId: 'cate-3'
  },
  {
    id: 'cate-3-4',
    name: 'Đồ trang trí',
    slug: 'do-trang-tri',
    image: 'https://placehold.co/300x200?text=Decor',
    parentId: 'cate-3'
  },

  {
    id: 'cate-4',
    name: 'Điện gia dụng',
    slug: 'dien-gia-dung',
    image: 'https://placehold.co/300x200?text=Dien+Gia+Dung',
    parentId: null,
    icon: Microwave,
    color: 'text-green-500'
  },
  {
    id: 'cate-4-1',
    name: 'Tủ lạnh',
    slug: 'tu-lanh',
    image: 'https://placehold.co/300x200?text=Tu+Lanh',
    parentId: 'cate-4'
  },
  {
    id: 'cate-4-2',
    name: 'Máy giặt',
    slug: 'may-giat',
    image: 'https://placehold.co/300x200?text=May+Giat',
    parentId: 'cate-4'
  },
  {
    id: 'cate-4-3',
    name: 'Máy lạnh',
    slug: 'may-lanh',
    image: 'https://placehold.co/300x200?text=May+Lanh',
    parentId: 'cate-4'
  },
  {
    id: 'cate-4-4',
    name: 'Đồ bếp',
    slug: 'do-bep',
    image: 'https://placehold.co/300x200?text=Do+Bep',
    parentId: 'cate-4'
  },

  {
    id: 'cate-5',
    name: 'Thời trang',
    slug: 'thoi-trang',
    image: 'https://placehold.co/300x200?text=Thoi+Trang',
    parentId: null,
    icon: Shirt,
    color: 'text-pink-500'
  },
  {
    id: 'cate-5-1',
    name: 'Quần áo',
    slug: 'quan-ao',
    image: 'https://placehold.co/300x200?text=Quan+Ao',
    parentId: 'cate-5'
  },
  {
    id: 'cate-5-2',
    name: 'Giày dép',
    slug: 'giay-dep',
    image: 'https://placehold.co/300x200?text=Giay+Dep',
    parentId: 'cate-5'
  },
  {
    id: 'cate-5-3',
    name: 'Túi xách',
    slug: 'tui-xach',
    image: 'https://placehold.co/300x200?text=Tui+Xach',
    parentId: 'cate-5'
  },
  {
    id: 'cate-6-1',
    name: 'Xe đẩy',
    slug: 'xe-day',
    image: 'https://placehold.co/300x200?text=Xe+Day',
    parentId: 'cate-6'
  },
  {
    id: 'cate-6-2',
    name: 'Đồ chơi trẻ em',
    slug: 'do-choi-tre-em',
    image: 'https://placehold.co/300x200?text=Do+Choi',
    parentId: 'cate-6'
  },
  {
    id: 'cate-6-3',
    name: 'Quần áo trẻ em',
    slug: 'quan-ao-tre-em',
    image: 'https://placehold.co/300x200?text=Quan+Ao+Tre+Em',
    parentId: 'cate-6'
  },
  {
    id: 'cate-8',
    name: 'Đồ chơi',
    slug: 'giai-tri-the-thao',
    image: 'https://placehold.co/300x200?text=Giai+Tri',
    parentId: null,
    icon: Play,
    color: 'text-indigo-500'
  },
  {
    id: 'cate-8-1',
    name: 'Nhạc cụ',
    slug: 'nhac-cu',
    image: 'https://placehold.co/300x200?text=Nhac+Cu',
    parentId: 'cate-8'
  },
  {
    id: 'cate-8-2',
    name: 'Thiết bị chơi game',
    slug: 'game',
    image: 'https://placehold.co/300x200?text=Game',
    parentId: 'cate-8'
  },
  {
    id: 'cate-8-3',
    name: 'Dụng cụ thể thao',
    slug: 'the-thao',
    image: 'https://placehold.co/300x200?text=Sport',
    parentId: 'cate-8'
  },

  {
    id: 'cate-9',
    name: 'Công cụ - Dụng cụ',
    slug: 'cong-cu-dung-cu',
    image: 'https://placehold.co/300x200?text=Cong+Cu',
    parentId: null,
    icon: Hammer,
    color: 'text-gray-600'
  },
  {
    id: 'cate-9-1',
    name: 'Máy khoan',
    slug: 'may-khoan',
    image: 'https://placehold.co/300x200?text=May+Khoan',
    parentId: 'cate-9'
  },
  {
    id: 'cate-9-2',
    name: 'Máy hàn',
    slug: 'may-han',
    image: 'https://placehold.co/300x200?text=May+Han',
    parentId: 'cate-9'
  },
  {
    id: 'cate-9-3',
    name: 'Bộ dụng cụ',
    slug: 'bo-dung-cu',
    image: 'https://placehold.co/300x200?text=Dung+Cu',
    parentId: 'cate-9'
  },

  {
    id: 'cate-10',
    name: 'Khác',
    slug: 'khac',
    image: 'https://placehold.co/300x200?text=Khac',
    parentId: null,
    icon: MoreHorizontal,
    color: 'text-teal-500'
  },
  {
    id: 'cate-10-1',
    name: 'Đồ sưu tầm',
    slug: 'do-suu-tam',
    image: 'https://placehold.co/300x200?text=Suu+Tam',
    parentId: 'cate-10'
  },
  {
    id: 'cate-10-2',
    name: 'Voucher',
    slug: 'voucher',
    image: 'https://placehold.co/300x200?text=Voucher',
    parentId: 'cate-10'
  },
  {
    id: 'cate-10-3',
    name: 'Đồ handmade',
    slug: 'do-handmade',
    image: 'https://placehold.co/300x200?text=Handmade',
    parentId: 'cate-10'
  }
]

export { provinces, products, categoriesMock }
