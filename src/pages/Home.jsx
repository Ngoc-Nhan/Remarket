import React, { useState } from "react";
import { ChevronDown, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Laptop } from "lucide-react";
import { Shirt } from "lucide-react";
import { Armchair } from "lucide-react";
import { NotebookTabs } from "lucide-react";
import { BoomBox } from "lucide-react";
import { CarFront } from "lucide-react";
import DanhMuc from "./DanhMuc";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";

// Mock data sản phẩm
const products = [
  {
    id: 1,
    title: "iPhone 12 Pro Max",
    price: 18000000,
    category: "Điện thoại",
    condition: "Đã qua sử dụng",
    location: "Hồ Chí Minh",
    image: "/iphone.png",
    postedAt: "2023-10-01T10:00:00Z",
  },
  {
    id: 2,
    title: "Laptop Dell XPS 13",
    price: 25000000,
    category: "Laptop",
    condition: "Mới",
    location: "Hà Nội",
    image: "/lapto.png",
    postedAt: "2025-09-30T14:30:30",
  },
  {
    id: 3,
    title: "Xe máy Honda SH 150i",
    price: 95000000,
    category: "Xe cộ",
    condition: "Đã qua sử dụng",
    location: "Đà Nẵng",
    image: "/sh.png",
    postedAt: "2025-10-03T07:35:30",
  },
  {
    id: 4,
    title: "Tủ lạnh Samsung Inverter 360L",
    price: 8500000,
    category: "Đồ gia dụng",
    condition: "Mới",
    location: "Cần Thơ",
    image: "/tulanh.png",
    postedAt: "2025-09-27T09:45:20",
  },
  {
    id: 5,
    title: "Áo khoác Uniqlo nam",
    price: 450000,
    category: "Thời trang",
    condition: "Mới",
    location: "Huế",
    image: "/ao.png",
    postedAt: "2025-09-29T16:20:10",
  },
  {
    id: 6,
    title: "Ghế gaming Razer",
    price: 3200000,
    category: "Nội thất",
    condition: "Đã qua sử dụng",
    location: "Hải Phòng",
    image: "ghe.png",
    postedAt: "2025-09-30T11:05:45",
  },
  {
    id: 7,
    title: "Máy ảnh Canon EOS M50",
    price: 10500000,
    category: "Máy ảnh",
    condition: "Đã qua sử dụng",
    location: "Nha Trang",
    image: "/mayanh.png",
    postedAt: "2025-09-28T19:40:30",
  },
  {
    id: 8,
    title: "Loa Bluetooth JBL Charge 4",
    price: 2100000,
    category: "Âm thanh",
    condition: "Mới",
    location: "Hồ Chí Minh",
    image: "/loa.png",
    postedAt: "2025-09-29T08:15:05",
  },
  {
    id: 9,
    title: "Bàn học gỗ thông",
    price: 1500000,
    category: "Nội thất",
    condition: "Mới",
    location: "Đồng Nai",
    image: "/banhoc.png",
    postedAt: "2025-09-26T13:25:50",
  },
  {
    id: 10,
    title: "Đồng hồ Casio G-Shock",
    price: 2200000,
    category: "Phụ kiện",
    condition: "Đã qua sử dụng",
    location: "Hà Nội",
    image: "donghong.png",
    postedAt: "2025-09-30T21:55:15",
  },
  {
    id: 11,
    title: "Tai nghe Sony WH-1000XM4",
    price: 5900000,
    category: "Âm thanh",
    condition: "Mới",
    location: "Hồ Chí Minh",
    image: "/tainghe.png",
    postedAt: "2025-09-27T10:30:40",
  },
  {
    id: 12,
    title: "Máy giặt LG Inverter 9Kg",
    price: 6700000,
    category: "Đồ gia dụng",
    condition: "Mới",
    location: "Đà Nẵng",
    image: "/maygiat.png",
    postedAt: "2025-09-29T15:05:25",
  },
  {
    id: 13,
    title: "Giày Nike Air Force 1",
    price: 2100000,
    category: "Thời trang",
    condition: "Mới",
    location: "Hà Nội",
    image: "/giay.png",
    postedAt: "2025-09-28T20:50:55",
  },
  {
    id: 14,
    title: "Máy tính bảng iPad Air 4",
    price: 14500000,
    category: "Tablet",
    condition: "Đã qua sử dụng",
    location: "Cần Thơ",
    image: "/ipad.png",
    postedAt: "2025-09-30T17:40:35",
  },
  {
    id: 15,
    title: "Smart TV LG OLED 55 inch",
    price: 18500000,
    category: "Điện tử",
    condition: "Mới",
    location: "Huế",
    image: "/tv.png",
    postedAt: "2025-09-27T12:10:50",
  },
  {
    id: 16,
    title: "Bếp điện từ Philips",
    price: 1300000,
    category: "Đồ gia dụng",
    condition: "Mới",
    location: "Đồng Nai",
    image: "/beptu.png",
    postedAt: "2025-09-29T09:35:15",
  },
];

function TimeAgo(date) {
  const now = new Date();
  const seconds = Math.floor((now - new Date(date)) / 1000);
  let interval = Math.floor(seconds / 31536000);
  if (interval > 1) return interval + " năm trước";
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) return interval + " tháng trước";
  interval = Math.floor(seconds / 86400);
  if (interval > 1) return interval + " ngày trước";
  interval = Math.floor(seconds / 3600);
  if (interval > 1) return interval + " giờ trước";
  interval = Math.floor(seconds / 60);
  if (interval > 1) return interval + " phút trước";
  return Math.floor(seconds) + " giây trước";
}
function Home() {
  // Hàm tính thời gian đăng
  const user = useSelector((state) => state.user.user);

  const dispatch = useDispatch();

  const provinces = [
    "Hà Nội",
    "TP. Hồ Chí Minh",
    "Đà Nẵng",
    "Hải Phòng",
    "Cần Thơ",
    "Bình Dương",
    "Đồng Nai",
    "Khánh Hòa",
    "Lâm Đồng",
    "Thanh Hóa",
    "Nghệ An",
    "Huế",
    "Quảng Ninh",
    "An Giang",
    "Kiên Giang",
    "Bạc Liêu",
    "Sóc Trăng",
    "Vĩnh Long",
    "Long An",
    "Tiền Giang",
  ];

  const [activeTab, setActiveTab] = useState("forYou");
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const filteredProducts = products.filter(
    (p) =>
      p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-full w-full bg-amber-100">
      {/* Navbar */}
      <div className="navbar  top-0 fixed w-full z-50  bg-base-100 shadow-sm gap-2 justify-center mx-auto">
        <div className="flex-none">
          <button className="btn btn-square btn-ghost">
            <details className="dropdown ">
              <summary className="btn m-1 bg-base-100 border-none hover:bg-gray-300  ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className=" inline-block h-5 w-5  stroke-current "
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </summary>

              <ul className="menu dropdown-content  bg-base-100 rounded-box z-1 w-70 p-2 shadow-sm">
                <DanhMuc />
              </ul>
            </details>
          </button>
        </div>
        <div>
          <a className="btn btn-ghost text-xl">
            <img src="./logo.png" className="w-15" alt="logo" />
          </a>
        </div>

        {/* Dropdown chọn khu vực */}
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn m-1 justify-center items-center gap-2 rounded-full"
          >
            <MapPin className="w-5 h-5 text-yellow-400" />
            Chọn khu vực
            <ChevronDown className="w-5 h-5" />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm max-h-64 overflow-y-auto grid grid-flow-row"
          >
            {provinces.map((province, index) => (
              <li key={index}>
                <a>{province}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Ô tìm kiếm */}
        <label className="input input-bordered rounded-full max-w-4xl flex-1">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            type="search"
            required
            placeholder="Tìm sản phẩm..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {/* <ul>
                        {filteredProducts.map((item) => (
                            <li key={item.id}>{item.category}</li>
                        ))}
                    </ul> */}
        </label>

        {/* Icon */}
        <div className="flex gap-2 text-xl">
          <i className="fa-regular fa-heart"></i>
          <i className="fa-regular fa-comment"></i>
          <i className="fa-regular fa-bell"></i>
        </div>

        {/* Khu vực tài khoản */}
        <div className="flex items-center gap-2 ml-3">
          {user ? (
            // Nếu đã đăng nhập, hiện avatar + dropdown và button "Đăng tin"
            <>
              <button
                className="btn btn-sm rounded-full bg-yellow-300 mx-1"
                onClick={() => navigate("/post")}
              >
                Đăng tin
              </button>

              <div className="dropdown">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn m-1 justify-center items-center gap-2 rounded-full text-xl"
                >
                  <img
                    src={user.picture}
                    alt="avatar"
                    className="w-8 h-8 rounded-full"
                  />
                  <ChevronDown className="w-5 h-5" />
                </div>

                <div className="dropdown-content z-50">
                  <ul className="menu bg-base-100 rounded-box w-52 p-2 shadow-sm">
                    <li>
                      <a>Trang cá nhân</a>
                    </li>
                    <li>
                      <a>Cài đặt</a>
                    </li>
                    <li>
                      <button
                        onClick={() => dispatch(logout())}
                        className="w-full text-left"
                      >
                        Đăng xuất
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </>
          ) : (
            // Nếu chưa đăng nhập, hiện button "Đăng nhập" + "Đăng tin"
            <>
              <button
                className="btn btn-sm rounded-full mx-1"
                onClick={() => navigate("/login")}
              >
                Đăng nhập
              </button>
              <button
                className="btn btn-sm rounded-full bg-yellow-300 mx-1"
                onClick={() => navigate("/post")}
              >
                Đăng tin
              </button>
            </>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="container mx-auto  pt-20 font-medium ">
        <div className="tabs tabs-bordered">
          <a
            className={`tab ${activeTab === "forYou" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("forYou")}
          >
            Dành cho bạn
          </a>
          <a
            className={`tab ${activeTab === "latest" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("latest")}
          >
            Mới nhất
          </a>
          <a
            className={`tab ${activeTab === "video" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("video")}
          >
            Video
          </a>
        </div>

        {/* Nội dung Tab */}
        <div className="mt-4 bg-white p-6 rounded-2xl ">
          {activeTab === "forYou" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredProducts.map((item) => (
                <div
                  key={item.id}
                  className="card bg-base-100 shadow-md hover:bg-gray-200"
                >
                  <figure>
                    <img
                      className="h-50 mt-4"
                      src={item.image}
                      alt={item.title}
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title text-lg font-bold">
                      {item.title}
                    </h2>
                    <p className="text-green-600 font-semibold flex justify-end">
                      {item.price.toLocaleString()} đ
                    </p>
                    <div className="flex mx-2 space-x-3">
                      <p className="text-sm text-gray-500">{item.category}</p>
                      <p className="text-lg text-red-500 flex justify-end">
                        {item.condition}
                      </p>
                    </div>
                    <div className="flex">
                      <p className="text-sm text-gray-500">
                        📍 {item.location}
                      </p>
                      <p className="text-xs text-gray-400 mt-1 justify-end flex flex-1">
                        {TimeAgo(item.postedAt)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "latest" && <p>Danh sách sản phẩm mới nhất 🚀</p>}
          {activeTab === "video" && <p>Danh sách video 🎥</p>}
          <div className="flex justify-center items-center mt-6 rounded-full">
            <button className="btn w-60 h-12 !rounded-full text-lg font-medium">
              Xem thêm
            </button>
          </div>
        </div>

        <div className="bg-white mt-4 p-6 rounded-2xl">
          <h1 className="text-gray-600 text-lg">Các khóa phổ biến</h1>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-gray-500 mt-2   ">
            {/* Cột 1 */}
            <ul className="space-y-2 list-disc list-inside">
              <li>iPhone 12</li>
              <li>iPhone 14 Pro Max</li>
              <li>Điện Thoại iPhone Cũ</li>
              <li>Điện thoại Samsung Cũ</li>
              <li>Máy quay cũ</li>
              <li>Loa Cũ</li>
              <li>Điện Thoại Cũ</li>
            </ul>

            {/* Cột 2 */}
            <ul className="space-y-2 list-disc list-inside">
              <li>iPhone 12 Mini</li>
              <li>iPhone 14 Plus</li>
              <li>Dàn karaoke cũ</li>
              <li>Máy tính để bàn giá rẻ</li>
              <li>Micro cũ</li>
              <li>Máy tính để bàn cũ</li>
              <li>Macbook</li>
            </ul>

            {/* Cột 3 */}
            <ul className="space-y-2 list-disc list-inside">
              <li>iPhone 12 Pro</li>
              <li>iPhone 14 Pro</li>
              <li>Tivi cũ giá rẻ</li>
              <li>Ống kính (lens) cũ</li>
              <li>Tai Nghe Cũ</li>
              <li>Máy Tính Bảng Cũ</li>
            </ul>

            {/* Cột 4 */}
            <ul className="space-y-2 list-disc list-inside">
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
      <div className="">
        <footer className="footer    sm:footer-horizontal bg-base-200 text-base-content p-6 mt-4">
          <aside>
            <svg
              width="50"
              height="50"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fillRule="evenodd"
              clipRule="evenodd"
              className="fill-current"
            >
              <path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
            </svg>
            <p>
              ACME Industries Ltd.
              <br />
              Providing reliable tech since 1992
            </p>
          </aside>
          <nav>
            <h6 className="footer-title">Services</h6>
            <a className="link link-hover">Branding</a>
            <a className="link link-hover">Design</a>
            <a className="link link-hover">Marketing</a>
            <a className="link link-hover">Advertisement</a>
          </nav>
          <nav>
            <h6 className="footer-title">Company</h6>
            <a className="link link-hover">About us</a>
            <a className="link link-hover">Contact</a>
            <a className="link link-hover">Jobs</a>
            <a className="link link-hover">Press kit</a>
          </nav>
          <nav>
            <h6 className="footer-title">Legal</h6>
            <a className="link link-hover">Terms of use</a>
            <a className="link link-hover">Privacy policy</a>
            <a className="link link-hover">Cookie policy</a>
          </nav>
        </footer>
      </div>
    </div>
  );
}

export default Home;
