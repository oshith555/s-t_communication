import { Link, Outlet, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import Footer from './Footer.jsx'

export default function Layout() {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem('darkMode')
    return saved ? JSON.parse(saved) : false
  })
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false)
  const [notifications, setNotifications] = useState([])
  const location = useLocation()
  const { user } = useAuth()
  
  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/services', label: 'Services' },
    { path: '/about', label: 'About Us' },
    { path: '/shop', label: 'Shop' },
    { path: '/contact', label: 'Contact' }
  ]

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(dark))
    if (dark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [dark])

  useEffect(() => {
    if (user) {
      // Load notifications for the current user
      const userNotifications = JSON.parse(localStorage.getItem(`notifications_${user.id}`) || '[]')
      setNotifications(userNotifications)
    }
  }, [user])

  const handleLogout = async () => {
    try {
      // Clear user data
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/'
    } catch (err) {
      console.error('Logout error:', err)
    }
  }

  return (
    <div className={dark ? 'dark' : ''}>
      <div className="min-h-screen gradient-bg">
        <nav className="fixed top-0 left-0 right-0 z-50 glass-effect">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-8">
                <Link to="/" className="text-xl font-bold text-blue-600">
                  S & T Communication
                </Link>
                <div className="hidden md:flex space-x-6">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 glass-hover ${
                        location.pathname === item.path
                          ? 'text-blue-600 bg-white/30'
                          : 'text-gray-700 hover:text-blue-600'
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="flex items-center space-x-4">
                {user ? (
                  <div className="relative">
                    <button
                      onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                      className="flex items-center space-x-2 px-3 py-2 rounded-md glass-hover"
                    >
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">
                          {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                        </span>
                      </div>
                      <span className="text-sm text-gray-700">{user.name}</span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {user.role}
                      </span>
                    </button>
                    
                    {showProfileDropdown && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setShowProfileDropdown(false)}
                        >
                          View Profile
                        </Link>
                        {user.role === 'admin' && (
                          <Link
                            to="/admin"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => setShowProfileDropdown(false)}
                          >
                            Admin Panel
                          </Link>
                        )}
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex space-x-2">
                    <Link
                      to="/login"
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
                
                {user && (
                  <div className="relative">
                    <button
                      onClick={() => setShowNotificationDropdown(!showNotificationDropdown)}
                      className="relative p-2 rounded-md glass-hover"
                    >
                      🔔
                      {notifications.length > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {notifications.length}
                        </span>
                      )}
                    </button>
                    
                    {showNotificationDropdown && (
                      <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50 max-h-96 overflow-y-auto">
                        <div className="px-4 py-2 border-b border-gray-200">
                          <h3 className="text-sm font-semibold text-gray-800">Notifications</h3>
                        </div>
                        {notifications.length > 0 ? (
                          notifications.slice(0, 5).map((notification, index) => (
                            <div key={index} className="px-4 py-3 border-b border-gray-100 hover:bg-gray-50">
                              <p className="text-sm font-medium text-gray-800">{notification.title}</p>
                              <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                              <p className="text-xs text-gray-500 mt-1">{new Date(notification.timestamp).toLocaleDateString()}</p>
                            </div>
                          ))
                        ) : (
                          <div className="px-4 py-8 text-center">
                            <p className="text-sm text-gray-500">No notifications</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
                
                <button
                  onClick={() => setDark(v => !v)}
                  className="p-2 rounded-md glass-hover"
                >
                  {dark ? '☀️' : '🌙'}
                </button>
              </div>
            </div>
          </div>
        </nav>
        
        <main className="pt-16 min-h-screen">
          <Outlet />
        </main>
        
        <Footer />
      </div>
    </div>
  )
}


