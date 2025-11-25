import React, { useState } from "react";
import {
  Edit,
  Trash2,
  Eye,
  EyeOff,
  PlusCircle,
  Search,
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
// Import các Components

export default function ManagePosts() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Tất cả");

  // XÓA các state liên quan đến việc thêm/chỉnh sửa tin (showForm, showCategoryPopup, newPost, selectedCategory)
  // Logic thêm/chỉnh sửa sẽ được xử lý ở trang PostNEW.jsx

  const [posts, setPosts] = useState([
    {
      id: 1,
      title: " Laptop Dell XPS 13",
      price: "18.000.000₫",
      date: "20/10/2025",
      status: "Đang hiển thị",
      image: "/laptop.jpg",
      category: "Laptop",
    },
    {
      id: 2,
      title: "Điện thoại iPhone 13 Pro 128GB",
      price: "21.500.000₫",
      date: "18/10/2025",
      status: "Chờ duyệt",
      image: "/iphone.jpg",
      category: "Điện thoại",
    },
    {
      id: 3,
      title: "Ghế sofa nỉ xám",
      price: "3.000.000₫",
      date: "15/10/2025",
      status: "Tin nháp",
      image: "/gheni.jpg",
      category: "Nội thất",
    },
  ]);

  // --- Lọc bài đăng ---
  const filteredPosts = posts.filter((post) => {
    const matchSearch = post.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchStatus =
      statusFilter === "Tất cả" ? true : post.status === statusFilter;
    return matchSearch && matchStatus;
  });

  // --- Ẩn/Hiện ---
  const toggleVisibility = (id) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
            ...p,
            status:
              p.status === "Đang hiển thị" ? "Tin nháp" : "Đang hiển thị",
          }
          : p
      )
    );
  };

  // --- Xóa bài ---
  const deletePost = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa tin này không?")) {
      setPosts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  // --- Chỉnh sửa (Đơn giản cho minh họa) ---
  const editPost = (id) => {
    // Trong ứng dụng thực tế, bạn sẽ navigate("/edit-post/" + id)
    const title = prompt("Nhập tiêu đề mới:");
    if (title) {
      setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, title } : p)));
    }
  };

  // XÓA hàm handleSelectCategory và handleAddPost

  // --- Giao diện chính ---
  return (
    <div className="p-6 max-w-6xl mx-auto font-sans">
      {/* Nút quay lại Home */}
      <button
        onClick={() => navigate("/")}
        className="flex items-center text-yellow-600 hover:text-yellow-700 mb-4"
      >
        <ArrowLeft size={20} className="mr-1" /> Quay lại Trang chủ
      </button>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
        <h1 className="text-2xl font-bold text-yellow-600">
          Quản lý tin đăng 🛒
        </h1>
        {/* THAY ĐỔI: Chuyển hướng sang trang PostNEW.JSX */}
        <button
          onClick={() => navigate("/PostNews")} // <-- CHUYỂN HƯỚNG!
          className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-xl shadow transition"
        >
          <PlusCircle size={20} /> Đăng tin mới
        </button>
      </div>

      {/* Tabs lọc trạng thái */}
      <div className="flex flex-wrap gap-2 border-b border-yellow-200 pb-2 mb-4 text-sm font-medium">
        {[
          "Tất cả",
          "Đang hiển thị",
          "Chờ duyệt",
          "Tin nháp",
          "Hết hạn",
          "Bị từ chối",
        ].map((tab) => (
          <button
            key={tab}
            onClick={() => setStatusFilter(tab)}
            className={`px-4 py-2 rounded-full transition ${statusFilter === tab
              ? "bg-yellow-500 text-white"
              : "text-yellow-700 hover:bg-yellow-100"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tìm kiếm */}
      <div className="flex items-center border rounded-xl px-3 py-2 w-full md:w-1/2 shadow-sm bg-white mb-6">
        <Search className="text-gray-400 mr-2" size={18} />
        <input
          type="text"
          placeholder="Tìm theo tiêu đề..."
          className="outline-none w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Danh sách bài đăng */}
      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="flex flex-col sm:flex-row items-center justify-between bg-white shadow rounded-2xl p-4 hover:shadow-md transition border border-yellow-100"
          >
            <div className="flex items-center gap-4 w-full sm:w-2/3">
              <img
                src={post.image}
                alt={post.title}
                className="w-28 h-20 object-cover rounded-xl border"
              />
              <div>
                <h2 className="font-semibold text-lg text-gray-800">
                  {post.title}
                </h2>
                <p className="text-yellow-600 font-medium">{post.price}</p>
                <p className="text-sm text-gray-500">
                  Danh mục: {post.category}
                </p>
                <p className="text-sm text-gray-500">Ngày đăng: {post.date}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-2 mt-3 sm:mt-0">
              <span
                className={`text-sm px-3 py-1 rounded-full ${post.status === "Đang hiển thị"
                  ? "bg-green-100 text-green-700"
                  : post.status === "Chờ duyệt"
                    ? "bg-yellow-100 text-yellow-700"
                    : post.status === "Tin nháp"
                      ? "bg-gray-100 text-gray-700"
                      : "bg-red-100 text-red-700"
                  }`}
              >
                {post.status}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => editPost(post.id)}
                  className="p-2 text-blue-500 hover:bg-blue-100 rounded-lg transition"
                  title="Chỉnh sửa"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => deletePost(post.id)}
                  className="p-2 text-red-500 hover:bg-red-100 rounded-lg transition"
                  title="Xóa tin"
                >
                  <Trash2 size={18} />
                </button>
                <button
                  onClick={() => toggleVisibility(post.id)}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                  title={
                    post.status === "Đang hiển thị" ? "Ẩn tin" : "Hiển thị lại"
                  }
                >
                  {post.status === "Đang hiển thị" ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredPosts.length === 0 && (
          <p className="text-center text-gray-500 py-6">
            Không có tin đăng nào phù hợp.
          </p>
        )}
      </div>

      {/* XÓA: Popup chọn danh mục */}
      {/* XÓA: Form đăng tin mới */}
    </div>
  );
}
