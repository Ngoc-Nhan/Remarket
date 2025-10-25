import React from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import "moment/locale/vi";
moment.locale("vi");

function ListSp({ filteredProducts }) {
  const navigate = useNavigate();

  if (!filteredProducts || filteredProducts.length === 0) {
    return (
      <p className="text-center col-span-full text-gray-500 py-10">
        Không tìm thấy sản phẩm nào phù hợp 🔍
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
      {filteredProducts.map((product) => (
        <div
          key={product.id}
          onClick={() => navigate(`/product/${product.id}`)}
          className="bg-white rounded-xl border hover:shadow-md transition cursor-pointer overflow-hidden group"
        >
          {/* Ảnh sản phẩm */}
          <div className="relative w-full aspect-[1/1] bg-gray-100">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Nội dung */}
          <div className="p-3">
            <h3 className="font-medium text-gray-800 line-clamp-2 text-sm leading-tight min-h-[36px]">
              {product.title}
            </h3>

            <p className="text-amber-600 font-bold text-base mt-1">
              {product.price.toLocaleString("vi-VN")} ₫
            </p>

            <div className="flex justify-between items-center text-xs text-gray-500 mt-1">
              <span className="truncate">{product.location}</span>
              <span className="text-gray-400">
                {moment(product.postedAt).fromNow()}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ListSp;

