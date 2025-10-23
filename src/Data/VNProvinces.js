// VNProvinces.js (Đã Sửa Lỗi)

const BASE_URL = "https://provinces.open-api.vn/api";

// ✅ Lấy danh sách tỉnh/thành phố (chỉ cần name/code)
export const fetchProvinces = async () => {
  try {
    const res = await fetch(`${BASE_URL}/p/`);
    return await res.json(); // [{name, code, ...}]
  } catch (err) {
    console.error("Lỗi fetch provinces:", err);
    return [];
  }
};

// 🌟 SỬA LỖI: Hàm mới Lấy chi tiết Tỉnh/Thành PHỐ (Bao gồm Quận/Huyện & Phường/Xã)
// Chúng ta gọi API này 1 lần khi chọn Tỉnh/Thành phố
export const fetchProvinceDetail = async (provinceCode) => {
  if (!provinceCode) return null;
  try {
    // ⚠️ Đổi depth=3 để lấy toàn bộ: Tỉnh -> Quận/Huyện -> Phường/Xã (wards)
    const res = await fetch(`${BASE_URL}/p/${provinceCode}?depth=3`);
    const data = await res.json();
    return data; // Trả về đối tượng Tỉnh/Thành phố đầy đủ
  } catch (err) {
    console.error("Lỗi fetch province detail:", err);
    return null;
  }
};

// ❌ Bỏ hàm fetchDistricts cũ đi hoặc không dùng nữa!

// ✅ Hàm lấy danh sách phường/xã theo quận/huyện (Giữ nguyên)
// Hàm này bây giờ sẽ hoạt động vì đối tượng district được trích xuất từ data có depth=3
export const fetchWards = async (district) => {
  if (!district || !district.wards) return [];
  return Array.isArray(district.wards) ? district.wards : [];
};
