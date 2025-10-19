import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { app } from "../firebaseConfig";

function UserProfile() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showSecurity, setShowSecurity] = useState(false);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    address: "",
    phone: "",
    birthday: "",
  });

  const navigate = useNavigate();

  // ✅ Khi mở modal thì chặn cuộn body
  useEffect(() => {
    if (isEditing || showSecurity) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isEditing, showSecurity]);

  // ✅ Lấy thông tin người dùng Firebase
  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("User info:", currentUser);
      if (currentUser) {
        setUser(currentUser);
        setFormData({
          address: currentUser.address || "",
          phone: currentUser.phoneNumber || "",
          birthday: currentUser.birthday || "",
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    const auth = getAuth(app);
    await signOut(auth);
    navigate("/login");
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = () => {
    console.log("Thông tin mới:", formData);
    setIsEditing(false);
  };

  const getAvatar = () => {
    if (user?.photoURL) {
      return user.photoURL.includes("googleusercontent")
        ? user.photoURL.replace("s96-c", "s400-c")
        : user.photoURL;
    }
    return "/default-avatar.png";
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-600">
        Đang tải thông tin người dùng...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-600">
        Bạn chưa đăng nhập.{" "}
        <button
          onClick={() => navigate("/login")}
          className="ml-2 text-blue-500 underline"
        >
          Đăng nhập ngay
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#f8f6f3] min-h-screen flex justify-center py-10 px-4 relative">
      <div className="w-full max-w-6xl grid md:grid-cols-3 gap-6">
        {/* --- CỘT TRÁI: Thông tin người dùng --- */}
        <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center">
          {/* Avatar */}
          <div className="relative">
            <img
              src={getAvatar()}
              alt="User Avatar"
              className="rounded-full w-28 h-28 object-cover border-2 border-[#e6d9c8]"
              referrerPolicy="no-referrer"
              onError={(e) => (e.target.src = "/default-avatar.png")}
            />
            {user && (
              <span className="absolute bottom-1 right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></span>
            )}
          </div>

          {/* Tên & Email */}
          <h2 className="text-xl font-semibold mt-3 text-gray-800">
            {user?.displayName || "Người dùng"}
          </h2>
          <p className="text-gray-500 text-sm">
            {user?.email || "Chưa có email"}
          </p>

          {/* Thông tin chi tiết */}
          <div className="mt-4 w-full text-left text-sm text-gray-700 space-y-2">
            <p>
              <span className="font-medium">📍 Địa chỉ:</span>{" "}
              {formData.address || "Chưa cung cấp"}
            </p>
            <p>
              <span className="font-medium">📞 Số điện thoại:</span>{" "}
              {formData.phone || "Chưa cập nhật"}
            </p>
            <p>
              <span className="font-medium">🎂 Ngày sinh:</span>{" "}
              {formData.birthday || "Chưa cập nhật"}
            </p>
            <p>
              <span className="font-medium">📅 Ngày tham gia:</span>{" "}
              {user?.metadata?.creationTime
                ? new Date(user.metadata.creationTime).toLocaleDateString(
                    "vi-VN"
                  )
                : "Không xác định"}
            </p>
            <p>
              <span className="font-medium">🔒 Bảo mật:</span>{" "}
              {user?.providerData[0]?.providerId === "google.com"
                ? "Đã xác thực Google"
                : "Chưa xác thực"}
            </p>
          </div>

          {/* Nút chức năng */}
          <div className="mt-6 flex flex-col w-full gap-2">
            <button
              onClick={() => setIsEditing(true)}
              className="border border-gray-300 py-2 rounded-lg hover:bg-gray-100 font-medium transition"
            >
              Chỉnh sửa thông tin
            </button>
            <button
              onClick={() => setShowSecurity(true)}
              className="border border-gray-300 py-2 rounded-lg hover:bg-gray-100 font-medium transition"
            >
              Bảo mật tài khoản
            </button>
            <button
              onClick={handleLogout}
              className="border border-red-300 text-red-500 py-2 rounded-lg hover:bg-red-50 font-medium transition"
            >
              Đăng xuất
            </button>
          </div>
        </div>

        {/* --- CỘT PHẢI: Tin đăng --- */}
        <div className="md:col-span-2 bg-white rounded-2xl shadow-md p-8 flex flex-col justify-center items-center text-center">
          <img
            src="/no-posts.png"
            alt="no-posts"
            className="w-32 h-32 object-contain opacity-80 mb-4"
          />
          <h3 className="text-lg font-semibold text-gray-800 mb-1">
            Bạn chưa có tin đăng nào
          </h3>
          <p className="text-gray-500 mb-5">
            Bắt đầu đăng tin để tiếp cận người mua ngay!
          </p>
          <button className="bg-[#f1e5cf] hover:bg-[#e9dbc0] text-gray-800 px-8 py-2 rounded-lg font-medium transition">
            Đăng tin ngay
          </button>
        </div>
      </div>

      {/* --- MODAL CHỈNH SỬA THÔNG TIN --- */}
      {isEditing && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/20 backdrop-blur-sm z-50">
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[80vh] overflow-y-auto p-6 border border-gray-200 animate-fadeIn">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
              ✏️ Cập nhật thông tin cá nhân
            </h3>

            {/* Các trường thông tin */}
            <div className="space-y-4">
              {/* ... giữ nguyên các input như bạn đã có ... */}
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 rounded-lg bg-yellow-400 text-gray-900 hover:bg-yellow-500 font-medium transition"
              >
                Save
              </button>
            </div>

            <button
              onClick={() => setIsEditing(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* --- MODAL BẢO MẬT TÀI KHOẢN --- */}
      {showSecurity && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/20 backdrop-blur-sm z-50">
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6 border border-gray-200 animate-fadeIn">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
              🔒 Cài đặt bảo mật tài khoản
            </h3>

            <div className="space-y-5 text-gray-700">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Đổi mật khẩu
                </label>
                <input
                  type="password"
                  placeholder="Nhập mật khẩu mới"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-400"
                />
                <button className="mt-2 bg-yellow-400 hover:bg-yellow-500 text-gray-800 px-4 py-1 rounded-lg text-sm font-medium">
                  Cập nhật mật khẩu
                </button>
              </div>

              <div className="border-t border-gray-200 pt-3">
                <p className="text-sm">
                  ✅ Trạng thái xác thực:{" "}
                  <span className="font-medium text-green-600">
                    {user?.providerData[0]?.providerId === "google.com"
                      ? "Đã xác thực Google"
                      : "Chưa xác thực"}
                  </span>
                </p>
              </div>

              <div className="border-t border-gray-200 pt-3">
                <p className="text-sm">
                  📧 Email xác minh:{" "}
                  <span className="font-medium">
                    {user?.emailVerified ? "Đã xác minh" : "Chưa xác minh"}
                  </span>
                </p>
                {!user?.emailVerified && (
                  <button className="mt-2 bg-yellow-400 hover:bg-yellow-500 text-gray-800 px-4 py-1 rounded-lg text-sm font-medium">
                    Gửi email xác minh
                  </button>
                )}
              </div>

              <div className="border-t border-gray-200 pt-3">
                <button className="text-blue-600 hover:underline text-sm">
                  Đăng xuất khỏi tất cả thiết bị
                </button>
              </div>

              <div className="border-t border-gray-200 pt-3">
                <button className="text-red-500 font-medium hover:text-red-600 text-sm">
                  Xóa tài khoản
                </button>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowSecurity(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
              >
                Đóng
              </button>
            </div>

            <button
              onClick={() => setShowSecurity(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
