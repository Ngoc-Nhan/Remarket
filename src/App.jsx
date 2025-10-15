import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Post from "./pages/PostNews";
import ManagePost from "./pages/ManagePost";
import PostNews from "./pages/PostNews";
import ListSp from "./components/ListSp";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/PostNews" element={<PostNews />} />
      <Route path="/ManagePost" element={<ManagePost />} />
      <Route path="/ListSp" element={<ListSp />} />

    </Routes>
  );
}

export default App;
