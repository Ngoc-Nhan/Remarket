import React from "react";
import { Laptop, Shirt, Armchair, NotebookTabs, BoomBox, CarFront } from "lucide-react";

function DanhMuc({ hideTitle = false, itemClass = "" }) {
    const danhMuc = [
        { icon: <Laptop />, name: "Điện tử - Công nghệ" },
        { icon: <Shirt />, name: "Thời trang" },
        { icon: <Armchair />, name: "Đồ gia dụng" },
        { icon: <NotebookTabs />, name: "Sách & Văn phòng phẩm" },
        { icon: <BoomBox />, name: "Đồ chơi & Giải trí" },
        { icon: <CarFront />, name: "Xe cộ" },
    ];

    return (
        <div>
            {/* Ẩn hoặc hiện tiêu đề tuỳ prop */}
            {!hideTitle && <h1 className="text-lg font-semibold mb-2">Danh mục</h1>}

            <ul className="text-gray-700 font-medium space-y-2 ">
                {danhMuc.map((item, index) => (
                    <li
                        key={index}
                        className={`hover:bg-gray-50 flex items-center gap-2 cursor-pointer transition-all ${itemClass}`}
                    >
                        {item.icon}
                        <span>{item.name}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default DanhMuc;
