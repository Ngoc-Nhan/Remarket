import React, { useEffect, useState } from "react";
import { Trash, ChevronLeft, ChevronRight } from "lucide-react";

function MyPosts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
        setPosts(savedPosts.reverse());
    }, []);

    // Xóa tin
    const handleDelete = (index) => {
        if (window.confirm("🗑️ Bạn có chắc muốn xóa tin này không?")) {
            const updatedPosts = posts.filter((_, i) => i !== index);
            setPosts(updatedPosts);
            localStorage.setItem("posts", JSON.stringify(updatedPosts.reverse()));
            alert("✅ Xóa tin thành công!");
        }
    };

    // Component hiển thị ảnh có thể trượt
    const ImageCarousel = ({ images }) => {
        const [currentIndex, setCurrentIndex] = useState(0);

        const handlePrev = () => {
            setCurrentIndex((prev) =>
                prev === 0 ? images.length - 1 : prev - 1
            );
        };

        const handleNext = () => {
            setCurrentIndex((prev) =>
                prev === images.length - 1 ? 0 : prev + 1
            );
        };

        if (!images || images.length === 0) {
            return (
                <div className="w-full h-60 bg-gray-100 flex items-center justify-center rounded-xl">
                    <p className="text-gray-400">Chưa có hình ảnh</p>
                </div>
            );
        }

        return (
            <div className="relative w-full h-60 overflow-hidden rounded-xl group">
                <img
                    src={images[currentIndex]}
                    alt="Ảnh sản phẩm"
                    className="w-full h-full object-cover transition-all duration-300"
                />

                {/* Nút chuyển ảnh */}
                {images.length > 1 && (
                    <>
                        <button
                            onClick={handlePrev}
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <button
                            onClick={handleNext}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </>
                )}

                {/* Chỉ báo vị trí ảnh */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                    {images.map((_, i) => (
                        <div
                            key={i}
                            className={`w-2 h-2 rounded-full ${i === currentIndex ? "bg-white" : "bg-gray-400"
                                }`}
                        ></div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <h1 className="text-2xl font-bold mb-6">Danh sách tin đã đăng</h1>

            {posts.length === 0 ? (
                <p className="text-gray-600">Bạn chưa đăng tin nào.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.map((post, index) => (
                        <div
                            key={index}
                            className="bg-white shadow-md rounded-xl p-4 relative max-w-sm mx-auto"
                        >
                            <button
                                onClick={() => handleDelete(index)}
                                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full"
                            >
                                <Trash size={16} />
                            </button>

                            <h2 className="font-semibold text-lg mb-2">{post.category}</h2>
                            <p className="text-sm text-gray-600 mb-2">
                                Ngày đăng: {post.createdAt}
                            </p>

                            {/* Hiển thị carousel hình ảnh */}
                            <ImageCarousel images={post.images} />

                            {/* Thông tin chi tiết */}
                            {post.info && (
                                <div className="text-sm text-gray-800 mt-3">
                                    {Object.entries(post.info).map(([key, value]) => (
                                        <p key={key}>
                                            <strong>{key}: </strong> {value}
                                        </p>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default MyPosts;
