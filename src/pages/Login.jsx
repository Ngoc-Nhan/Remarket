// src/pages/Login.jsx
import React from "react";
import TypeIt from "typeit-react";
import bgImage from "../assets/login_sale.jpg";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";

import { setUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { FaFacebook, FaApple, FaGoogle } from "react-icons/fa";

const CLIENT_ID =
  "162064755179-6ubjagcdi9nrq3o3kn0mab3tb14vv27a.apps.googleusercontent.com";
// ... bên trong component Login()

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <div
        className="min-h-screen bg-cover bg-center relative"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Login box */}
        <div className="absolute top-32 right-8 w-full max-w-md bg-gradient-to-r from-yellow-300 to-yellow-500 p-8 rounded-2xl shadow-2xl z-10">
          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            <TypeIt
              options={{
                strings: ["LOGIN TO YOUR ACCOUNT"],
                speed: 50,
                waitUntilVisible: true,
              }}
            />
          </h2>

          {/* Form login */}
          <form className="flex flex-col gap-4">
            <div>
              <label className="block text-gray-900 mb-1 font-medium">
                Số điện thoại
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-yellow-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-900 mb-1 font-medium">
                Mật khẩu
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-yellow-500 outline-none"
              />
            </div>
            <button
              type="submit"
              className="mt-2 w-full bg-gray-900 text-yellow-300 font-semibold py-2 rounded-lg hover:bg-gray-800 transition"
            >
              Đăng nhập
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-700" />
            <span className="px-2 text-gray-800 text-sm">
              Hoặc đăng nhập bằng
            </span>
            <hr className="flex-grow border-gray-700" />
          </div>

          {/* Social buttons */}
          <div className="flex flex-wrap justify-between gap-3 mt-2">
            {/* Facebook */}
            <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition h-11">
              <FaFacebook size={20} /> Facebook
            </button>

            {/* Google */}
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                const decoded = jwtDecode(credentialResponse.credential);

                console.log("Thông tin người dùng:", decoded);

                const newUser = {
                  name: decoded.name,
                  email: decoded.email,
                  picture: decoded.picture,
                };

                // Cập nhật Redux
                dispatch(setUser(newUser));

                // Lưu user vào localStorage
                localStorage.setItem("user", JSON.stringify(newUser));

                // Điều hướng
                navigate("/home");
              }}
              onError={() => {
                console.log("Google login failed");
              }}
            />

            {/* Apple */}
            <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition h-11">
              <FaApple size={20} /> Apple
            </button>
          </div>

          {/* Sign up */}
          <p className="text-center text-sm text-gray-900 mt-4">
            Chưa có tài khoản?{" "}
            <a href="#" className="text-blue-800 font-medium hover:underline">
              Đăng ký ngay
            </a>
          </p>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

export default Login;
