import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Post from "./pages/PostNews";
import ManagePost from "./pages/ManagePost";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/PostNews" element={<Post />} />
      <Route path="/ManagePost" element={<ManagePost />} />

    </Routes>
  );
}

export default App;
