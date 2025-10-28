import React, { useState } from "react";
import categories from "../constant/categories";

function FormInfo({ selectedChild, onFormChange }) {
    const [formValues, setFormValues] = useState({});
    const [selectedSubCategory, setSelectedSubCategory] = useState(null); // để lưu lựa chọn con (ví dụ: "Phụ kiện máy tính")

    const handleChange = (option, value) => {
        const updated = { ...formValues, [option]: value };
        setFormValues(updated);
        onFormChange(updated);

        // Nếu chọn "Loại phụ kiện" → cập nhật loại con
        if (option === "Loại phụ kiện") {
            setSelectedSubCategory(value);
        }
    };

    const handleInputChange = (option, value) => {
        setFormValues((prev) => ({
            ...prev,
            [option]: value,
        }));
    };

    const handleClear = (option) => {
        setFormValues((prev) => {
            const updated = { ...prev };
            delete updated[option];
            return updated;
        });
        if (option === "Loại phụ kiện") setSelectedSubCategory(null);
    };

    const selectedChildrenData = categories[selectedChild];

    if (!selectedChildrenData) return null;

    return (
        <div>
            {Object.entries(selectedChildrenData).map(([option, values]) => {
                // Nếu option là "Loại phụ kiện" (object lồng nhau)
                if (option === "Loại phụ kiện") {
                    return (
                        <div key={option} style={{ marginBottom: "16px" }}>
                            <label style={{ fontWeight: "bold", display: "block" }}>{option}:</label>
                            <select
                                value={formValues[option] || ""}
                                onChange={(e) => handleChange(option, e.target.value)}
                                style={{
                                    width: "100%",
                                    padding: "8px 32px 8px 8px",
                                    borderRadius: "4px",
                                    border: "1px solid #ccc",
                                }}
                            >
                                <option value="">-- Chọn {option} --</option>
                                {Object.keys(values).map((key) => (
                                    <option key={key} value={key}>
                                        {key}
                                    </option>
                                ))}
                            </select>
                        </div>
                    );
                }

                // Nếu là mảng bình thường
                if (Array.isArray(values)) {
                    return (
                        <div key={option} style={{ marginBottom: "16px" }}>
                            <label style={{ fontWeight: "bold", display: "block" }}>{option}:</label>
                            <select
                                value={formValues[option] || ""}
                                onChange={(e) => handleChange(option, e.target.value)}
                                style={{
                                    width: "100%",
                                    padding: "8px 32px 8px 8px",
                                    borderRadius: "4px",
                                    border: "1px solid #ccc",
                                }}
                            >
                                <option value="">-- Chọn {option} --</option>
                                {values.map((v) => (
                                    <option key={v} value={v}>
                                        {v}
                                    </option>
                                ))}
                            </select>
                        </div>
                    );
                }

                return null;
            })}

            {/* Nếu người dùng đã chọn loại phụ kiện thì hiển thị thêm các thuộc tính con */}
            {selectedChildrenData["Loại phụ kiện"] &&
                selectedSubCategory &&
                Object.entries(selectedChildrenData["Loại phụ kiện"][selectedSubCategory]).map(([option, values]) => (
                    <div key={option} style={{ marginBottom: "16px" }}>
                        <label style={{ fontWeight: "bold", display: "block" }}>{option}:</label>
                        <select
                            value={formValues[option] || ""}
                            onChange={(e) => handleChange(option, e.target.value)}
                            style={{
                                width: "100%",
                                padding: "8px 32px 8px 8px",
                                borderRadius: "4px",
                                border: "1px solid #ccc",
                            }}
                        >
                            <option value="">-- Chọn {option} --</option>
                            {values.map((v) => (
                                <option key={v} value={v}>
                                    {v}
                                </option>
                            ))}
                        </select>
                    </div>
                ))}
        </div>
    );
}

export default FormInfo;
