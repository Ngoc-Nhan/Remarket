import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import ManagePost from './pages/ManagePost'
import Products from './pages/Products'
import PostNews from './pages/PostNews'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/home' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/PostNews' element={<PostNews />} />
      <Route path='/ManagePost' element={<ManagePost />} />
      <Route path='/news/:id' element={<Products />} />
    </Routes>
  )
}

export default App
