import React, { useState } from "react";

function FormInfo({ selectedChild }) {
    const children = {
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
        }
    };

    const [formValues, setFormValues] = useState({});

    const handleChange = (option, value) => {
        setFormValues(prev => ({
            ...prev,
            [option]: value
        }));
    };

    const handleInputChange = (option, value) => {
        setFormValues(prev => ({
            ...prev,
            [option]: value
        }));
    };

    const handleClear = (option) => {
        setFormValues(prev => {
            const updated = { ...prev };
            delete updated[option];
            return updated;
        });
    };

    const selectedChildrenData = children[selectedChild];

    return (
        <div>
            {selectedChildrenData &&
                Object.entries(selectedChildrenData).map(([option, values]) => (
                    <div key={option} style={{ marginBottom: "16px" }}>
                        <label style={{ fontWeight: "bold", display: "block" }}>{option}:</label>

                        {formValues[option] === "Khác" ? (
                            <div style={{ marginTop: 10 }}>
                                <input
                                    type="text"
                                    placeholder={`Nhập ${option.toLowerCase()} khác ...`}
                                    value={formValues[option] && formValues[option] !== "Khác" ? formValues[option] : ""}
                                    onChange={(e) => handleInputChange(option, e.target.value)}
                                    className="border-1 w-100 p-2"
                                />
                            </div>
                        ) : (
                            <div style={{ position: "relative", marginTop: "8px" }}>
                                <select
                                    value={formValues[option] || ""}
                                    onChange={(e) => handleChange(option, e.target.value)}
                                    style={{
                                        width: "100%",
                                        padding: "8px 32px 8px 8px",
                                        borderRadius: "4px",
                                        outline: "none",
                                        border: "1px solid #ccc",
                                        appearance: "none",
                                        WebkitAppearance: "none",
                                        MozAppearance: "none"
                                    }}
                                >
                                    <option value="">-- Chọn {option} --</option>
                                    {values.map(v => (
                                        <option key={v} value={v}>
                                            {v}
                                        </option>
                                    ))}
                                </select>

                                {formValues[option] && (
                                    <button
                                        type="button"
                                        onClick={() => handleClear(option)}
                                        style={{
                                            position: "absolute",
                                            right: "8px",
                                            top: "50%",
                                            transform: "translateY(-50%)",
                                            background: "transparent",
                                            border: "none",

                                            fontSize: "18px",
                                            cursor: "pointer",
                                            color: "red"
                                        }}
                                        title="Xóa lựa chọn"
                                    >
                                        ×
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                ))}
        </div>
    );
}

export default FormInfo;
