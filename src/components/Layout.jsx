import React from "react";
import Navbar from "./Navbar/Navbar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="min-h-screen bg-[#f9f7f4]">
      <Navbar />
      <main className="pt-16 px-4 md:px-8">
        <Outlet /> {/* render các trang con ở đây */}
      </main>
    </div>
  );
}

export default Layout;
