import React, { useState } from "react";
import { ChevronDown, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
// Mock data sản phẩm
const products = [
    {
        id: 1,
        title: "iPhone 12 Pro Max",
        price: 18000000,
        category: "Điện thoại",
        condition: "Đã qua sử dụng",
        location: "Hồ Chí Minh",
        image: "/iphone.png"

    },
    {
        id: 2,
        title: "Laptop Dell XPS 13",
        price: 25000000,
        category: "Laptop",
        condition: "Mới",
        location: "Hà Nội",
        image: "/lapto.png"
    },
    {
        id: 3,
        title: "Xe máy Honda SH 150i",
        price: 95000000,
        category: "Xe cộ",
        condition: "Đã qua sử dụng",
        location: "Đà Nẵng",
        image: "/sh.png"
    },
    {
        id: 4,
        title: "Tủ lạnh Samsung Inverter 360L",
        price: 8500000,
        category: "Đồ gia dụng",
        condition: "Mới",
        location: "Cần Thơ",
        image: "/tulanh.png"
    },
    {
        id: 5,
        title: "Áo khoác Uniqlo nam",
        price: 450000,
        category: "Thời trang",
        condition: "Mới",
        location: "Huế",
        image: "/ao.png"
    },
    {
        id: 6,
        title: "Ghế gaming Razer",
        price: 3200000,
        category: "Nội thất",
        condition: "Đã qua sử dụng",
        location: "Hải Phòng",
        image: "ghe.png"
    },
    {
        id: 7,
        title: "Máy ảnh Canon EOS M50",
        price: 10500000,
        category: "Máy ảnh",
        condition: "Đã qua sử dụng",
        location: "Nha Trang",
        image: "/mayanh.png"
    },
    {
        id: 8,
        title: "Loa Bluetooth JBL Charge 4",
        price: 2100000,
        category: "Âm thanh",
        condition: "Mới",
        location: "Hồ Chí Minh",
        image: "/loa.png"
    },
    {
        id: 9,
        title: "Bàn học gỗ thông",
        price: 1500000,
        category: "Nội thất",
        condition: "Mới",
        location: "Đồng Nai",
        image: "/banhoc.png"
    },
    {
        id: 10,
        title: "Đồng hồ Casio G-Shock",
        price: 2200000,
        category: "Phụ kiện",
        condition: "Đã qua sử dụng",
        location: "Hà Nội",
        image: "donghong.png"
    },
    {
        id: 11,
        title: "Tai nghe Sony WH-1000XM4",
        price: 5900000,
        category: "Âm thanh",
        condition: "Mới",
        location: "Hồ Chí Minh",
        image: "/tainghe.png"
    },
    {
        id: 12,
        title: "Máy giặt LG Inverter 9Kg",
        price: 6700000,
        category: "Đồ gia dụng",
        condition: "Mới",
        location: "Đà Nẵng",
        image: "/maygiat.png"
    },
    {
        id: 13,
        title: "Giày Nike Air Force 1",
        price: 2100000,
        category: "Thời trang",
        condition: "Mới",
        location: "Hà Nội",
        image: "/giay.png"
    },
    {
        id: 14,
        title: "Máy tính bảng iPad Air 4",
        price: 14500000,
        category: "Tablet",
        condition: "Đã qua sử dụng",
        location: "Cần Thơ",
        image: "/ipad.png"
    },
    {
        id: 15,
        title: "Smart TV LG OLED 55 inch",
        price: 18500000,
        category: "Điện tử",
        condition: "Mới",
        location: "Huế",
        image: "/tv.png"
    },
    {
        id: 16,
        title: "Bếp điện từ Philips",
        price: 1300000,
        category: "Đồ gia dụng",
        condition: "Mới",
        location: "Đồng Nai",
        image: "/beptu.png"
    }
];

function Home() {

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
        "Tiền Giang"

    ]

    const [activeTab, setActiveTab] = useState("forYou");
    const navigate = useNavigate();

    return (
        <div className="h-full w-full bg-amber-100">
            {/* Navbar */}
            <div className="navbar top-0 fixed w-full z-50  bg-base-100 shadow-sm gap-2 justify-center mx-auto">
                <div className="flex-none">
                    <button className="btn btn-square btn-ghost">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="inline-block h-5 w-5 stroke-current"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            ></path>
                        </svg>
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
                    <input type="search" required placeholder="Tìm sản phẩm..." />
                </label>

                {/* Icon */}
                <div className="flex gap-2 text-xl">
                    <i className="fa-regular fa-heart"></i>
                    <i className="fa-regular fa-comment"></i>
                    <i className="fa-regular fa-bell"></i>
                </div>

                <div className="bg-white">
                    <button
                        className="btn rounded-full"
                        onClick={() => navigate("/Login")}
                    >
                        Đăng nhập
                    </button>
                    <button className="btn rounded-full bg-yellow-300">Đăng tin</button>
                </div>

                {/* Dropdown tài khoản */}
                <div className="dropdown">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn m-1 justify-center items-center gap-2 rounded-full text-xl"
                    >
                        <i className="fa-solid fa-circle-user"></i>
                        <ChevronDown className="w-5 h-5" />
                    </div>
                    <ul
                        tabIndex={0}
                        className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
                    >
                        <li>
                            <a>Trang cá nhân</a>
                        </li>
                        <li>
                            <a>Cài đặt</a>
                        </li>
                    </ul>
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
                <div className="mt-4 bg-white p-6 rounded-2xl">
                    {activeTab === "forYou" && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {products.map((item) => (
                                <div key={item.id} className="card bg-base-100 shadow-md">
                                    <figure>
                                        <img className="h-50 mt-4" src={item.image} alt={item.title} />
                                    </figure>
                                    <div className="card-body">
                                        <h2 className="card-title text-lg font-bold">
                                            {item.title}
                                        </h2>
                                        <p className="text-green-600 font-semibold">
                                            {new Intl.NumberFormat("vi-VN", {
                                                style: "currency",
                                                currency: "VND",
                                            }).format(item.price)}
                                        </p>
                                        <p className="text-sm text-gray-500">{item.location}</p>
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
                            className="fill-current">
                            <path
                                d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
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







        </div >
    );
}

export default Home;
