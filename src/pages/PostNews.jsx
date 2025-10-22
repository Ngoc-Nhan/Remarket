import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";

import MenuDropdown from "../components/Navbar/MenuDropdown";
import SearchBar from "../components/Navbar/SearchBar";
import DanhMuc from "./DanhMuc";
import { SquarePen } from 'lucide-react';

import {
    Bell,
    Handbag,
    MessagesSquare,
    ChevronDown,
    Camera,
} from "lucide-react";

import GShopping from "../assets/GShopping.jpg";

function PostNews() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const [showDanhMuc, setShowDanhMuc] = useState(false);

    return (
        <div className="min-h-screen  bg-gray-50 relative overflow-hidden">
            {/* Navbar */}
            <div className="navbar  top-0 fixed w-full z-50 bg-base-100 shadow-sm gap-5  justify-around ">
                {/* Logo */}
                <div className="flex items-center gap-5">
                    <Link className="btn btn-ghost text-xl" to="/">
                        <img src="./logo.png" className="w-15" alt="logo" />
                    </Link>
                    <div className="flex text-xl items-center gap-1 cursor-pointer">
                        <MenuDropdown />
                        <p>Danh Mục</p>
                    </div>
                </div>

                <SearchBar />

                {/* Icon Section */}
                <div className="flex gap-6 text-xl items-center">
                    <Bell />
                    <MessagesSquare />
                    <Handbag />

                    {/* User Menu */}
                    <div className="dropdown dropdown-end">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn m-1 justify-center items-center gap-2 rounded-full text-xl"
                        >
                            {user && user.picture ? (
                                <img
                                    src={user.picture}
                                    alt="avatar"
                                    className="w-8 h-8 rounded-full"
                                />
                            ) : (
                                <div className="w-8 h-8 bg-gray-300 rounded-full" />
                            )}
                            <span className="max-w-[100px] truncate text-sm">
                                {user?.name?.length > 10 ? user.name.slice(0, 12) + "..." : user?.name}
                            </span>
                            <ChevronDown className="w-5 h-5" />
                        </div>

                        <ul
                            tabIndex={0}
                            className="dropdown-content menu bg-base-100 rounded-box w-52 p-2 shadow-md"
                        >
                            {user ? (
                                <>
                                    <li>
                                        <Link to="/profile">Trang cá nhân</Link>
                                    </li>
                                    <li>
                                        <Link to="/settings">Cài đặt</Link>
                                    </li>
                                    <li>
                                        <button
                                            onClick={() => dispatch(logout())}
                                            className="w-full text-left"
                                        >
                                            Đăng xuất
                                        </button>
                                    </li>
                                </>
                            ) : (
                                <li>
                                    <Link to="/login">Đăng nhập</Link>
                                </li>
                            )}
                        </ul>

                    </div>
                    <div className="bg-orange-400 text-white btn btn-sm  mx-1 cursor-pointer hover:bg-orange-500 px-4 py-5 text-lg font-medium flex items-center gap-2 ">
                        <SquarePen size={20} /> Đăng tin
                    </div>
                </div>
            </div>

            {/* Nội dung chính */}
            <div className="p-6 pt-20 transition-all duration-300">
                <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md px-4 py-6 flex flex-col md:flex-row gap-6">
                    {/* Khối hình ảnh */}
                    <div className="flex-1 text-center">
                        <h5 className="text-lg font-semibold text-gray-800">
                            Hình ảnh và Video sản phẩm
                        </h5>
                        <p className="text-sm text-gray-600">
                            Xem thêm{" "}
                            <a href="#" className="text-blue-600 hover:underline">
                                Quy định đăng tin của SecondHandShop
                            </a>
                        </p>

                        <div className="bg-white p-6">
                            <button className="btn bg-gray-100 btn-dash w-3xs h-50 border-amber-400 cursor-not-allowed hover:bg-gray-100 border-dashed">
                                <Camera size={64} className="text-yellow-200" />
                            </button>
                        </div>
                    </div>

                    {/* Khối danh mục */}
                    <div className="flex-1">
                        <input
                            type="text"
                            placeholder="Danh Mục Tin Đăng"
                            className="border ml-2 p-2 w-full mt-2 rounded-md"
                            onClick={() => setShowDanhMuc(true)}
                            readOnly
                        />

                        <div className="flex justify-end mt-4">
                            <img
                                className="w-60 bg-transparent rounded-xl"
                                src={GShopping}
                                alt="shopping"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Popup chọn danh mục */}
            {showDanhMuc && (
                <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/30 backdrop-blur-sm">
                    <div className="bg-white w-96 rounded-2xl shadow-xl p-6 relative">
                        <button
                            className="absolute top-2 right-3 text-xl font-bold hover:text-red-500"
                            onClick={() => setShowDanhMuc(false)}
                        >
                            ×
                        </button>
                        <h2 className="text-2xl font-semibold mb-3 text-gray-800">
                            Đăng tin mới
                        </h2>

                        <form className="space-y-3">
                            <p className="text-medium">CHỌN DANH MỤC</p>
                            <DanhMuc hideTitle className="m-2" itemClass="p-1" />
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PostNews;
