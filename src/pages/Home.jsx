import React, { useState } from "react";
import { ChevronDown, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
// Mock data sản phẩm
const products = [
    {
        id: 1,
        title: "iPhone 12 Pro Max 128GB",
        price: 13500000,
        category: "Điện thoại",
        condition: "Like New",
        location: "Hà Nội",
        image: "https://picsum.photos/200/200?random=1",
    },
    {
        id: 2,
        title: "Laptop Dell XPS 13 9360",
        price: 9500000,
        category: "Laptop",
        condition: "Used",
        location: "TP. Hồ Chí Minh",
        image: "https://picsum.photos/200/200?random=2",
    },
    {
        id: 3,
        title: "Xe máy Honda Vision 2020",
        price: 23000000,
        category: "Phương tiện",
        condition: "Used",
        location: "Đà Nẵng",
        image: "https://picsum.photos/200/200?random=3",
    },
    {
        id: 4,
        title: "Tủ lạnh Samsung 250L",
        price: 3500000,
        category: "Đồ gia dụng",
        condition: "Used",
        location: "Hải Phòng",
        image: "https://picsum.photos/200/200?random=4",
    },
    {
        id: 5,
        title: "Máy ảnh Canon EOS 700D",
        price: 4800000,
        category: "Máy ảnh",
        condition: "Like New",
        location: "Cần Thơ",
        image: "https://picsum.photos/200/200?random=5",
    },
    {
        id: 6,
        title: "Bàn học gỗ sồi",
        price: 1200000,
        category: "Nội thất",
        condition: "Used",
        location: "Huế",
        image: "https://picsum.photos/200/200?random=6",
    },
    {
        id: 7,
        title: "Ghế công thái học",
        price: 1500000,
        category: "Nội thất",
        condition: "Like New",
        location: "Nha Trang",
        image: "https://picsum.photos/200/200?random=7",
    },
    {
        id: 8,
        title: "AirPods Pro 2",
        price: 4200000,
        category: "Phụ kiện",
        condition: "Like New",
        location: "Biên Hòa",
        image: "https://picsum.photos/200/200?random=8",
    },
    {
        id: 9,
        title: "Đồng hồ Casio G-Shock",
        price: 1700000,
        category: "Thời trang",
        condition: "Used",
        location: "Bình Dương",
        image: "https://picsum.photos/200/200?random=9",
    },
    {
        id: 10,
        title: "Xe đạp thể thao Giant",
        price: 5500000,
        category: "Thể thao",
        condition: "Used",
        location: "Hà Nội",
        image: "https://picsum.photos/200/200?random=10",
    },
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
        <div>
            {/* Navbar */}
            <div className="navbar bg-base-100 shadow-sm gap-2 justify-center mx-auto">
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
            <div className="container mx-auto mt-5 font-medium">
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
                <div className="mt-4">
                    {activeTab === "forYou" && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {products.map((item) => (
                                <div key={item.id} className="card bg-base-100 shadow-md">
                                    <figure>
                                        <img src={item.image} alt={item.title} />
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
                </div>
            </div>
        </div>
    );
}

export default Home;
