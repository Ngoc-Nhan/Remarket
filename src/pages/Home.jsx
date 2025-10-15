import React, { useState, useEffect } from "react";

import { useDispatch } from "react-redux";

import { setUser } from "../redux/userSlice";

import Navbar from "../components/Navbar/Navbar";
import { products } from "../constant/constant";
import ListSp from "../components/ListSp";





function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const filteredProducts = products.filter(
    (p) =>
      p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const [isExpanded, setIsExpanded] = useState(false);
  // Hàm tính thời gian đăng


  const dispatch = useDispatch();

  // ✅ Khi load lại trang, lấy user từ localStorage rồi set vào Redux
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) dispatch(setUser(savedUser));
  }, [dispatch]);



  const [activeTab, setActiveTab] = useState("forYou");


  return (
    <div className="h-full w-full bg-amber-100">
      {/* Navbar */}
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* Tabs */}
      <div className="container mx-auto  pt-20 font-medium ">
        <div className="tabs tabs-bordered">
          <a
            className={`tab ${activeTab === "forYou" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("forYou")}
          >
            Dành cho bạn
          </a>
          <a
            className={`tab ${activeTab === "latest" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("latest")}
          >
            Mới nhất
          </a>
          <a
            className={`tab ${activeTab === "video" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("video")}
          >
            Video
          </a>
        </div>

        {/* Nội dung Tab */}
        <div className="mt-4 bg-white p-6 rounded-2xl ">
          {activeTab === "forYou" && (
            <ListSp filteredProducts={filteredProducts} />

          )}

          {activeTab === "latest" && <p>Danh sách sản phẩm mới nhất 🚀</p>}
          {activeTab === "video" && <p>Danh sách video 🎥</p>}
          <div className="flex justify-center items-center mt-6 rounded-full">
            <button className="btn w-60 h-12 !rounded-full text-lg font-medium">
              Xem thêm
            </button>
          </div>
        </div>
        <div className="bg-white mt-4 p-6  rounded-2xl">
          <h2 className="text-xl">Secondhand Shop – Đồ Cũ, Lối Sống Mới – Tiết Kiệm & Bền Vững</h2>
          <div className="text-gray-500 mt-2 space-y-2">
            <span>
              <strong>Secondhand Shop </strong>
              ra đời với sứ mệnh giúp bạn mua bán, trao đổi đồ cũ một cách
              dễ dàng – nhanh chóng – an toàn – tiết kiệm.
            </span>
            <br />
            <span>
              Chúng tôi tạo ra một không gian trung gian đáng tin cậy, nơi người có đồ không dùng nữa có thể kết nối trực tiếp với người đang cần,
              mang đến những giao dịch tiện lợi và giá trị bền vững.
            </span>
            <br />
            <span>
              <strong>Secondhand Shop </strong> là nền tảng mua bán đồ cũ mới ra mắt, được xây dựng với mong muốn mang đến cho người dùng Việt Nam một không gian trao đổi đồ cũ an toàn,
              tiện lợi và tiết kiệm.
            </span>
            <br />
            <span>
              Tại đây, bạn có thể dễ dàng đăng tin hoặc
              tìm kiếm hàng ngàn sản phẩm thuộc nhiều lĩnh vực:
            </span>
            <br />
            {isExpanded && (
              <div className="mt-3 text-gray-500">
                <ul className="list-disc ml-6 space-y-2">
                  <li>
                    <strong>Đồ điện tử</strong>: Điện thoại, laptop, tivi, tủ lạnh, máy lạnh...
                  </li>
                  <li>
                    <strong>Nội thất & Gia dụng</strong>: Bàn ghế, tủ, giường, quạt, đồ bếp...
                  </li>
                  <li>
                    <strong>Thời trang</strong>: Quần áo, giày dép, túi xách, phụ kiện thời trang...
                  </li>
                  <li>
                    <strong>Phương tiện</strong>: Xe máy, xe đạp, ô tô...
                  </li>
                  <li>
                    <strong>Sách, và nhiều sản phẩm khác.</strong>
                  </li>
                </ul>

                <p className="mt-3">
                  Chúng tôi tin rằng mỗi món đồ cũ đều mang một giá trị riêng – và Secondhand Shop ra đời để giúp bạn tái sử dụng,
                  tiết kiệm chi phí và góp phần bảo vệ môi trường.
                </p>

                <p className="mt-2">
                  Chỉ với vài bước đơn giản – chụp ảnh, viết mô tả ngắn gọn và đăng tin – bạn đã có thể kết nối với hàng ngàn người mua tiềm năng.
                </p>

                <div className="flex justify-center mt-3">
                  <em>
                    <strong>Secondhand Shop – Khởi đầu mới cho những món đồ cũ.</strong>
                  </em>
                </div>
              </div>
            )}
            <button className="border-1 rounded-lg p-1.5 "
              onClick={() => setIsExpanded(!isExpanded)}

            >
              {isExpanded ? "Thu gọn" : "Mở rộng"}

            </button>

          </div>
        </div>

        <div className="bg-white mt-4 p-6 rounded-2xl">
          <h1 className="text-gray-600 text-lg">Các khóa phổ biến</h1>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-gray-500 mt-2   ">
            {/* Cột 1 */}
            <ul className="space-y-2 list-disc list-inside">
              <li>iPhone 12</li>
              <li>iPhone 14 Pro Max</li>
              <li>Điện Thoại iPhone Cũ</li>
              <li>Điện thoại Samsung Cũ</li>
              <li>Máy quay cũ</li>
              <li>Loa Cũ</li>
              <li>Điện Thoại Cũ</li>
            </ul>

            {/* Cột 2 */}
            <ul className="space-y-2 list-disc list-inside">
              <li>iPhone 12 Mini</li>
              <li>iPhone 14 Plus</li>
              <li>Dàn karaoke cũ</li>
              <li>Máy tính để bàn giá rẻ</li>
              <li>Micro cũ</li>
              <li>Máy tính để bàn cũ</li>
              <li>Macbook</li>
            </ul>

            {/* Cột 3 */}
            <ul className="space-y-2 list-disc list-inside">
              <li>iPhone 12 Pro</li>
              <li>iPhone 14 Pro</li>
              <li>Tivi cũ giá rẻ</li>
              <li>Ống kính (lens) cũ</li>
              <li>Tai Nghe Cũ</li>
              <li>Máy Tính Bảng Cũ</li>
            </ul>

            {/* Cột 4 */}
            <ul className="space-y-2 list-disc list-inside">
              <li>iPhone 12 Pro Max</li>
              <li>Samsung S25 Edge</li>
              <li>iPhone 16e</li>
              <li>Máy ảnh cũ</li>
              <li>Amply</li>
              <li>Laptop Cũ</li>
            </ul>
          </div>
        </div>
        {/* Chân trang */}
      </div>
      <div className="">
        <footer className="footer    sm:footer-horizontal bg-base-200 text-base-content p-6 mt-4">
          <aside>
            <svg
              width="50"
              height="50"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fillRule="evenodd"
              clipRule="evenodd"
              className="fill-current"
            >
              <path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
            </svg>
            <p>
              ACME Industries Ltd.
              <br />
              Providing reliable tech since 1992
            </p>
          </aside>
          <nav>
            <h6 className="footer-title">Services</h6>
            <a className="link link-hover">Branding</a>
            <a className="link link-hover">Design</a>
            <a className="link link-hover">Marketing</a>
            <a className="link link-hover">Advertisement</a>
          </nav>
          <nav>
            <h6 className="footer-title">Company</h6>
            <a className="link link-hover">About us</a>
            <a className="link link-hover">Contact</a>
            <a className="link link-hover">Jobs</a>
            <a className="link link-hover">Press kit</a>
          </nav>
          <nav>
            <h6 className="footer-title">Legal</h6>
            <a className="link link-hover">Terms of use</a>
            <a className="link link-hover">Privacy policy</a>
            <a className="link link-hover">Cookie policy</a>
          </nav>
        </footer>
      </div>
    </div >
  );
}

export default Home;
