import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PostNews from "./pages/PostNews";
import ManagePost from "./pages/ManagePost";
import ListSp from "./components/ListSp";
import UserProfile from "./components/UserProfile";
import Layout from "./components/Layout";

function App() {
  return (
    <Routes>
      {/* Layout chung có Navbar */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/PostNews" element={<PostNews />} />
        <Route path="/ManagePost" element={<ManagePost />} />
        <Route path="/ListSp" element={<ListSp />} />
        <Route path="/profile" element={<UserProfile />} />
      </Route>

      {/* Trang không dùng Navbar */}
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
