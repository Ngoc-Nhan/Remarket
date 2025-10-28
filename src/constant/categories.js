const categories = {
    "Điện thoại": {
        "Tình trạng": ["Mới", "Đã sử dụng(qua sửa chữa)", "Đã sử dụng(chưa sửa chữa)"],
        "Hãng sản xuất": ["Apple", "Samsung", "Xiaomi", "Oppo", "Khác"],
        "Màu sắc": ["Đen", "Trắng", "Xanh dương", "Đỏ", "Vàng", "Khác"],
        "Dung lượng bộ nhớ": ["32 GB", "64 GB", "128 GB", "256 GB", "512 GB", "1 TB", "Khác"],
        "Chính sách bảo hành": ["Bảo hành chính hãng", "Bảo hành cửa hàng", "Không bảo hành"],
        "Xuất xứ": ["Việt Nam", "Trung Quốc", "Mỹ", "Hàn Quốc", "Nhật Bản", "Khác"]
    },
    "Laptop": {
        "Tình trạng": ["Mới", "Đã sử dụng (qua sửa chữa)", "Đã sử dụng (chưa qua sửa chữa)"],
        "Hãng sản xuất": ["Dell", "HP", "Lenovo", "Asus", "Acer", "Apple", "MSI", "Razer"],
        "Bộ vi xử lý": ["Intel Core i3", "Intel Core i5", "Intel Core i7", "Intel Core i9", "AMD Ryzen 3", "AMD Ryzen 5", "AMD Ryzen 7"],
        "RAM": ["4GB", "8GB", "16GB", "32GB"],
        "Ổ cứng": ["256GB", "512GB", "1TB", "2TB"],
        "Loại ổ cứng": ["SSD", "HDD"],
        "Card màn hình": ["Intel UHD", "NVIDIA GTX", "NVIDIA RTX", "AMD Radeon", "Khác "],
        "Kích cỡ màn hình": ["13.3 inch", "14 inch", "15.6 inch", "17 inch"],
        "Chính sách bảo hành": ["12 tháng", "24 tháng", "36 tháng"],
        "Xuất xứ": ["Việt Nam", "Trung Quốc", "Mỹ", "Nhật Bản", "Hàn Quốc", "Khác"]
    },
    "Máy tính bảng": {
        "Tình trạng": ["Mới", "Đã sử dụng (qua sửa chữa)", "Đã sử dụng (chưa sửa chữa)"],
        "Hãng": ["Apple", "Samsung", "Xiaomi", "Lenovo", "Huawei", "Amazon", "Khác"],
        "Dòng máy": ["iPad Pro", "iPad Air", "iPad Mini", "Galaxy Tab", "Xiaomi Pad", "Lenovo Tab", "Huawei MatePad", "Kindle Touch", "Khác"],
        "Phiên bản": ["Quốc tế", "Khoá mạng (lock)"],
        "Sử dụng simcard 3G/4G": ["Có", "Không"],
        "Dung lượng": ["32 GB", "64 GB", "128 GB", "256 GB", "512 GB", "1 TB", "Khác"],
        "Kích cỡ màn hình": ["7 inch", "8 inch", "10 inch", "12 inch", "Khác"],
        "Chính sách bảo hành": ["Bảo hành chính hãng", "Bảo hành cửa hàng", "Không bảo hành"],
        "Xuất xứ": ["Việt Nam", "Trung Quốc", "Mỹ", "Nhật Bản", "Hàn Quốc", "Khác"]


    },
    "Phụ kiện": {
        "Tình trạng": ["Mới", "Đã sử dụng (qua sửa chữa)", "Đã sử dụng (chưa qua sửa chữa)"],
        "Loại phụ kiện": {
            "Phụ kiện máy tính": {
                "Thiết bị": ["Cáp chuyển, cáp nối", "Chuột", "Bàn phím", "Tai nghe", "Webcam", "Khác"],
                "Chính sách bảo hành": ["Hết bảo hành", "1-3 tháng", "4-6 tháng", "7-12 tháng", ">12 tháng", "Còn bảo hành"],
                "Xuất xứ": ["Việt Nam", "Trung Quốc", "Mỹ", "Nhật Bản", "Hàn Quốc", "Khác"]
            },
            "Phụ kiện điện thoại": {
                "Thiết bị": ["Sạc, cáp sạc", "Tai nghe", "Ốp lưng", "Miếng dán màn hình", "Pin dự phòng", "Khác"],
                "Chính sách bảo hành": ["Hết bảo hành", "1-3 tháng", "4-6 tháng", "7-12 tháng", ">12 tháng", "Còn bảo hành"],
                "Xuất xứ": ["Việt Nam", "Trung Quốc", "Mỹ", "Hàn Quốc", "Khác"]
            },
            "Khác": {
                "Thiết bị": ["Khác"],
                "Chính sách bảo hành": ["Hết bảo hành", "1-3 tháng", "4-6 tháng", "7-12 tháng", ">12 tháng", "Còn bảo hành"],
                "Xuất xứ": ["Việt Nam", "Trung Quốc", "Mỹ", "Hàn Quốc", "Khác"]

            }
        }


    },
    "Quần áo": {
        "Tình trạng ": ["Đã sử dụng", "Mới"],
        "Loại sản phẩm": ["Đồ cho nam", "Đồ cho nữ", "Cả nam và nữ"]
    },
    "Giày dép": {
        "Tình trạng ": ["Đã sử dụng", "Mới"],
        "Loại sản phẩm": ["Đồ cho nam", "Đồ cho nữ", "Cả nam và nữ"]
    }
}

export default categories;