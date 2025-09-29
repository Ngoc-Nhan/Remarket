import React, { useState } from "react";

function Login() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Giả lập login (bạn có thể thay bằng API call)
    if (phone === "0901234567" && password === "123456") {
      alert("Đăng nhập thành công!");
      // Ví dụ: chuyển hướng sang trang home
      window.location.href = "/home";
    } else {
      alert("Sai số điện thoại hoặc mật khẩu!");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-[400px] bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Đăng nhập</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium">
              Số điện thoại
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Mật khẩu</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 rounded-lg"
          >
            Đăng nhập
          </button>
        </form>

        <div className="mt-6 text-center space-x-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
            Facebook
          </button>
          <button className="px-4 py-2 bg-red-500 text-white rounded-lg">
            Google
          </button>
          <button className="px-4 py-2 bg-black text-white rounded-lg">
            Apple
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
