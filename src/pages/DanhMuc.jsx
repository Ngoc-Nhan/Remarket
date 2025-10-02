import React from 'react'
import { Laptop, Shirt, Armchair, NotebookTabs, BoomBox, CarFront } from 'lucide-react';

function DanhMuc() {
    return (
        <div>
            {/* Danh mục chính */}
            <div className="">
                <h1 className='text-lg'>Danh mục</h1>
                <div className="text-gray-500 font-medium mt-2 ">
                    <li className="hover:text-black"><a><Laptop />Điện tử - Công nghệ</a></li>
                    <li className="hover:text-black"><a> <Shirt />Thời trang</a></li>
                    <li className="hover:text-black"><a> <Armchair />Đồ gia dụng</a></li>
                    <li className="hover:text-black"><a><NotebookTabs />Sách & Văn phòng phẩm</a></li>
                    <li className="hover:text-black"><a> <BoomBox />Đồ chơi & Giải trí</a></li>
                    <li className="hover:text-black"><a><CarFront />Xe cộ</a></li>
                </div>
            </div>
        </div>
    )
}

export default DanhMuc