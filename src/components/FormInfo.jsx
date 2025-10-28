import React, { useState } from "react";
import categories from "../constant/categories";

function FormInfo({ selectedChild, onFormChange }) {
    const [formValues, setFormValues] = useState({});
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);

    const handleChange = (option, value) => {
        const updated = { ...formValues, [option]: value };
        setFormValues(updated);
        onFormChange(updated);

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
            delete updated[option + "_custom"];
            return updated;
        });
        if (option === "Loại phụ kiện") setSelectedSubCategory(null);
    };

    const selectedChildrenData = categories[selectedChild];
    if (!selectedChildrenData) return null;

    const renderField = (option, values) => {
        const isOther = formValues[option] === "Khác";

        return (
            <div key={option} style={{ marginBottom: "16px", position: "relative" }}>
                <label style={{ fontWeight: "bold", display: "block" }}>{option}:</label>

                {/* Nếu chọn “Khác” → hiện input */}
                {isOther ? (
                    <input
                        type="text"
                        required
                        placeholder={`Nhập ${option.toLowerCase()} `}
                        value={formValues[option + "_custom"] || ""}
                        onChange={(e) => handleInputChange(option + "_custom", e.target.value)}
                        style={{
                            width: "100%",
                            padding: "8px 36px 8px 8px",
                            borderRadius: "4px",
                            border: "1px solid #ccc",
                            outline: "none",
                        }}
                    />
                ) : (
                    <select
                        value={formValues[option] || ""}
                        onChange={(e) => handleChange(option, e.target.value)}
                        style={{
                            width: "100%",
                            padding: "8px 36px 8px 8px",
                            borderRadius: "4px",
                            border: "1px solid #ccc",
                            outline: "none",
                            appearance: "none",
                            WebkitAppearance: "none",
                            MozAppearance: "none",
                        }}
                    >
                        <option value="">-- Chọn {option} --</option>
                        {values.map((v) => (
                            <option key={v} value={v}>
                                {v}
                            </option>
                        ))}
                    </select>
                )}

                {/* Nút xóa luôn hiển thị rõ ràng */}
                {(formValues[option] || formValues[option + "_custom"]) && (
                    <button
                        type="button"
                        onClick={() => handleClear(option)}
                        style={{
                            position: "absolute",
                            right: "10px",
                            top: "50%",
                            transform: "translateY(-10%)",
                            background: "transparent",
                            border: "none",
                            color: "red",
                            fontSize: "20px",
                            cursor: "pointer",
                            zIndex: 2,
                        }}
                        title="Xóa lựa chọn"
                    >
                        ×
                    </button>
                )}
            </div>
        );
    };

    return (
        <div>
            {/* Cấp đầu tiên */}
            {Object.entries(selectedChildrenData).map(([option, values]) => {
                if (option === "Loại phụ kiện") {
                    return renderField(option, Object.keys(values));
                }
                if (Array.isArray(values)) {
                    return renderField(option, values);
                }
                return null;
            })}

            {/* Hiển thị các thuộc tính con nếu có */}
            {selectedChildrenData["Loại phụ kiện"] &&
                selectedSubCategory &&
                Object.entries(selectedChildrenData["Loại phụ kiện"][selectedSubCategory]).map(([option, values]) =>
                    renderField(option, values)
                )}
        </div>
    );
}

export default FormInfo;
