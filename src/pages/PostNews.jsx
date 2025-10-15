import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ListSp from "../components/ListSp";
import { products } from "../constant/constant";
import DanhMuc from "./DanhMuc";
import {
    Laptop,
    Shirt,
    Armchair,
    NotebookTabs,
    BoomBox,
    CarFront,
} from 'lucide-react';
function PostNews() {
    const [showPopup, setShowPopup] = useState(false);
    // const [filteredProducts, setFilteredProducts] = useState(products);

    useEffect(() => {
        // Hiển popup sau 1 giây khi vào trang
        const timer = setTimeout(() => {
            setShowPopup(true);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 relative overflow-hidden">
            {/* Navbar */}
            <Navbar />

            {/* Nội dung chính */}
            <div className={`p-6 transition-all duration-300 ${showPopup ? "blur-sm" : ""}`}>
                {/* <h1 className="text-2xl font-bold mb-4 text-gray-800">
                    Danh sách sản phẩm
                </h1>
                <ListSp filteredProducts={filteredProducts} /> */}
                <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md px-4 py-6 mt-12 flex">
                    <div className="PostImg text-center  flex-1">
                        <p className="text-lg font-semibold text-gray-800 ml-2">
                            Hình ảnh và Video sản phẩm
                        </p>
                        <span className="text-sm text-gray-600 ">
                            Xem thêm{" "}
                            <a
                                className="text-blue-600 hover:underline"
                                href="#"
                            >
                                Quy định đăng tin của SecondHandShop
                            </a>
                        </span>
                    </div>
                    <div className="flex-2">

                    </div>
                </div>
            </div>

            {/* Popup nổi lên */}
            {
                showPopup && (
                    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/30 backdrop-blur-sm">
                        <div className="bg-white w-96 rounded-2xl shadow-xl p-6 relative pointer-events-auto">
                            <button
                                className="absolute top-2 right-3 text-xl font-bold hover:text-red-500"
                                onClick={() => setShowPopup(false)}
                            >
                                ×
                            </button>
                            <h2 className="text-2xl font-semibold mb-3 text-gray-800">
                                Đăng tin mới
                            </h2>

                            {/* Form trong popup */}
                            <form className="space-y-3">
                                <p className="text-medium">CHỌN DANH MỤC</p>
                                <DanhMuc hideTitle className="m-2" itemClass="p-1" />


                            </form>
                        </div>
                    </div>
                )
            }
        </div >
    );
}

export default PostNews;
