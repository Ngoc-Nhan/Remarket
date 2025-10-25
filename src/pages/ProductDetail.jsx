import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { products } from "../constant/constant";
import Navbar from "../components/Navbar/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MapPin } from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === parseInt(id));

  // Nếu không tìm thấy sản phẩm
  if (!product) {
    return (
      <div className="text-center mt-40 text-lg text-gray-600">
        Sản phẩm không tồn tại
      </div>
    );
  }

  // Ảnh đang được hiển thị
  const [selectedImg, setSelectedImg] = useState(
    product.images?.[0] || product.image
  );

  return (
    <div className="bg-amber-50 min-h-screen">
      <Navbar />

      {/* === Nội dung chính === */}
      <div className="max-w-6xl mx-auto pt-24 p-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* ==== Cột trái: ảnh + mô tả ==== */}
        <div className="md:col-span-2 bg-white p-5 rounded-2xl shadow-sm">
          {/* Ảnh lớn */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.img
                key={selectedImg}
                src={selectedImg}
                alt={product.title}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="w-full h-[420px] object-contain rounded-xl border"
              />
            </AnimatePresence>
          </div>

          {/* Ảnh nhỏ */}
          <div className="flex gap-2 mt-3 overflow-x-auto">
            {(product.images || [product.image]).map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`img-${i}`}
                onClick={() => setSelectedImg(img)}
                className={`w-20 h-20 object-cover rounded-lg border cursor-pointer transition-all duration-200 ${
                  selectedImg === img
                    ? "border-amber-500 scale-105"
                    : "border-gray-200 hover:scale-105"
                }`}
              />
            ))}
          </div>

          {/* Tiêu đề + giá */}
          <div className="mt-4 border-b pb-3">
            <h1 className="text-2xl font-bold">{product.title}</h1>
            <p className="text-3xl text-red-500 font-semibold mt-2">
              {product.price.toLocaleString()} ₫
            </p>
            <p className="text-gray-500 text-sm mt-1 flex items-center gap-1">
              <MapPin size={16} /> {product.location || "TP. Hồ Chí Minh"}
            </p>
          </div>

          {/* Mô tả */}
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-2">Mô tả chi tiết</h2>
            <p className="text-gray-700 leading-relaxed">
              {product.description ||
                "Sản phẩm còn mới 95%, hoạt động tốt, giá tốt cho người cần."}
            </p>
          </div>
        </div>

        {/* ==== Cột phải: người bán ==== */}
        <div className="space-y-4">
          {/* Thông tin người bán */}
          <div className="bg-white p-5 rounded-2xl shadow-sm">
            <h2 className="text-lg font-semibold mb-3">Thông tin người bán</h2>
            <div className="flex items-center gap-3">
              <img
                src={product.seller?.avatar || "https://i.pravatar.cc/100"}
                alt="avatar"
                className="w-14 h-14 rounded-full border"
              />
              <div>
                <p className="font-medium">
                  {product.seller?.name || "Nguyễn Văn A"}
                </p>
                <p className="text-gray-500 text-sm">Thành viên 3 năm</p>
              </div>
            </div>
            <button className="btn btn-warning w-full mt-4 rounded-full text-white text-lg flex items-center justify-center gap-2">
              <Phone size={18} /> Gọi người bán
            </button>
          </div>

          {/* Vị trí */}
          <div className="bg-white p-5 rounded-2xl shadow-sm">
            <h2 className="text-lg font-semibold mb-2">Vị trí</h2>
            <p className="text-gray-600">{product.location}</p>
            <img
              src="https://developers.google.com/static/maps/images/landing/hero_maps_static_api.png"
              alt="map"
              className="rounded-xl mt-3"
            />
          </div>

          {/* Tin khác của người bán */}
          {product.seller?.otherPosts && (
            <div className="bg-white p-5 rounded-2xl shadow-sm">
              <h2 className="text-lg font-semibold mb-3">
                Tin khác của người bán
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {product.seller.otherPosts.map((item, i) => (
                  <div
                    key={i}
                    onClick={() => navigate(`/product/${item.id}`)}
                    className="cursor-pointer hover:shadow-md border rounded-lg p-2 transition-all"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-24 object-cover rounded-md"
                    />
                    <p className="text-sm font-medium mt-2 line-clamp-1">
                      {item.title}
                    </p>
                    <p className="text-red-500 text-sm font-semibold">
                      {item.price.toLocaleString()} ₫
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ==== Sản phẩm tương tự ==== */}
      <div className="max-w-6xl mx-auto mt-10 p-5 bg-white rounded-2xl shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Sản phẩm tương tự</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products
            .filter((p) => p.category === product.category && p.id !== product.id)
            .slice(0, 4)
            .map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(`/product/${item.id}`)}
                className="cursor-pointer hover:shadow-lg transition rounded-xl border p-2"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-40 object-cover rounded-lg"
                />
                <p className="mt-2 font-medium truncate">{item.title}</p>
                <p className="text-red-500 font-semibold text-sm">
                  {item.price.toLocaleString()} ₫
                </p>
              </div>
            ))}
        </div>
      </div>

      <footer className="text-center text-gray-500 py-6 text-sm">
        © 2025 Secondhand Shop — Mua bán đồ cũ an toàn & tiết kiệm
      </footer>
    </div>
  );
};

export default ProductDetail;

