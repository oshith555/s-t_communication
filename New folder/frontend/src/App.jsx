import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Home from './pages/Home.jsx'
import UserHome from './pages/UserHome.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Services from './pages/Services.jsx'
import AboutUs from './pages/AboutUs.jsx'
import Shop from './pages/Shop.jsx'
import Contact from './pages/Contact.jsx'
import Profile from './pages/Profile.jsx'
import AdminPanel from './pages/AdminPanel.jsx'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/user-home" element={<UserHome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/shop" element={<Shop />} />
          <Route element={<ProtectedRoute roles={["admin"]} />}>
            <Route path="/admin" element={<AdminPanel />} />
          </Route>
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
