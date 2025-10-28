import React, { useState } from "react";
import {
    Laptop,
    Shirt,
    Armchair,
    NotebookTabs,
    BoomBox,
    CarFront,
    ArrowLeft,
} from "lucide-react";

function DanhMuc({ setSelectedData, setShowDanhMuc, hideTitle = false, itemClass = "" }) {
    const [selectedItem, setSelectedItem] = useState(null);
    const [hoveredItem, setHoveredItem] = useState(null);


    const danhMuc = [
        {
            icon: <Laptop />,
            name: "Điện tử - Công nghệ",
            children:
                [
                    "Điện thoại"
                    ,
                    "Laptop",
                    "Máy tính bảng",
                    "Phụ kiện"
                ],
        },
        {
            icon: <Shirt />,
            name: "Thời trang",
            children: ["Quần áo", "Giày dép", "Phụ kiện thời trang", "Túi xách"],
        },
        {
            icon: <Armchair />,
            name: "Đồ gia dụng",
            children: ["Nồi cơm điện", "Máy hút bụi", "Bếp điện", "Máy giặt"],
        },
        {
            icon: <NotebookTabs />,
            name: "Sách & Văn phòng phẩm",
            children: ["Sách học tập", "Sách kỹ năng", "Bút viết", "Tập vở"],
        },
        {
            icon: <BoomBox />,
            name: "Đồ chơi & Giải trí",
            children: ["Đồ chơi trẻ em", "Boardgame", "Đồ chơi mô hình"],
        },
        {
            icon: <CarFront />,
            name: "Xe cộ",
            children: ["Xe máy", "Ô tô", "Phụ tùng", "Đồ bảo hộ"],
        },
    ];
    const handleSelectedData = (item) => {
        setSelectedData(item);
        console.log(item);
        setShowDanhMuc(false);
    }
    return (
        <div>
            {!hideTitle && (
                <h1 className="text-lg font-semibold mb-2">Danh mục sản phẩm</h1>
            )}

            {/* Nếu chưa chọn danh mục → hiển thị danh mục cha */}
            {!selectedItem ? (
                <ul className="text-gray-700 font-medium space-y-2">
                    {danhMuc.map((item, index) => (
                        <li
                            key={index}
                            onClick={() => setSelectedItem(item)}
                            className={`hover:bg-gray-50 flex items-center gap-2 cursor-pointer transition-all p-2 rounded-md ${itemClass}`}
                        >
                            {item.icon}
                            <span>{item.name}</span>
                        </li>
                    ))}
                </ul>
            ) : (
                /* Nếu đã chọn → hiển thị danh mục con */
                <div>
                    {/* Nút quay lại */}
                    <button
                        onClick={() => setSelectedItem(null)}
                        className="flex items-center gap-2 text-blue-600 hover:underline mb-3"
                    >
                        <ArrowLeft size={18} />
                        Quay lại danh mục
                    </button>

                    <h2 className="text-lg font-semibold mb-2">{selectedItem.name}</h2>
                    <ul className="text-gray-700 font-medium space-y-2">
                        {selectedItem.children.map((child, i) => (
                            <li
                                key={i}
                                onClick={() => handleSelectedData(child)}
                                className="hover:bg-gray-50 cursor-pointer p-2 border rounded-md"
                            >
                                {child}
                            </li>
                        ))}
                    </ul>

                </div>
            )}
        </div>
    );
}

export default DanhMuc;
