import React from 'react'
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import Navbar from './conponents/Navbar'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
  const token = localStorage.getItem('token')
   return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={token ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App