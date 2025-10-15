import React from "react";

import moment from "moment";
import "moment/locale/vi"; // để hiển thị tiếng Việt
moment.locale("vi");


function ListSp({ filteredProducts }) {
    if (!filteredProducts) {
        return <p>Không có sản phẩm nào để hiển thị.</p>;
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 cursor-pointer ">
            {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                    <div
                        key={product.id}
                        className=" rounded-xl  p-4 hover:shadow-lg transition-shadow"
                    >
                        <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-40 object-contain mb-3"
                        />

                        <h3 className="font-semibold text-gray-800">{product.title}</h3>
                        <p className="text-gray-500 text-sm">{product.category}</p>
                        <p className="text-amber-600 font-bold mt-2">
                            {product.price.toLocaleString("vi-VN")} ₫
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                            {product.location} • {product.condition}
                        </p>
                        <p className="text-xs text-red-500 mt-2">
                            {moment(product.postedAt).format("MMMM Do YYYY, h:mm:ss a")}
                        </p>


                    </div>
                ))
            ) : (
                <p className="text-center col-span-full text-gray-500">
                    Không tìm thấy sản phẩm nào phù hợp 🔍
                </p>
            )}
        </div>
    );
}

export default ListSp;
