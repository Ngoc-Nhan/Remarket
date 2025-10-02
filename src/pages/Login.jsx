// src/pages/Login.jsx
import React from "react";
import TypeIt from "typeit-react";
import bgImage from "../assets/login_sale.jpg"; // ảnh nền

function Login() {
  return (
    <div
      className="min-h-screen flex items-center justify-end bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Overlay làm tối nền */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Login box bên phải */}
      <div className="relative z-10 w-[400px] mr-10 bg-gradient-to-r from-orange-300 to-yellow-400 p-8 rounded-2xl shadow-2xl">
        {/* Chữ có animation */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          <TypeIt
            options={{
              strings: ["LOGIN TO YOUR ACCOUNT"],
              speed: 70,
              waitUntilVisible: true,
            }}
          />
        </h2>

        <form className="flex flex-col gap-4">
          <div>
            <label className="block text-gray-800 mb-1 font-medium">
              Username :
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-orange-400 outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-800 mb-1 font-medium">
              Email Address :
            </label>
            <input
              type="email"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-orange-400 outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-800 mb-1 font-medium">
              Password :
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-orange-400 outline-none"
            />
          </div>
          <button
            type="submit"
            className="mt-4 w-full bg-blue-800 text-white font-semibold py-2 rounded-full hover:bg-blue-900 transition"
          >
            LOGIN
          </button>
        </form>
        <p className="text-center text-sm text-gray-800 mt-4">
          Don’t have an account?{" "}
          <a href="#" className="text-blue-800 font-medium hover:underline">
            Sign Up now
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
