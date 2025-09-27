import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { hashPassword, comparePassword } from '../utils/security.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing user in localStorage
    const token = localStorage.getItem('token')
    const savedUser = localStorage.getItem('user')
    
    if (token && savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (err) {
        console.error('Error parsing saved user:', err)
        localStorage.removeItem('token')
        localStorage.removeItem('user')
      }
    }
    
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      const user = users.find(u => u.email === email)
      
      if (!user) {
        throw new Error('User not found')
      }
      
      const isPasswordValid = await comparePassword(password, user.password)
      if (!isPasswordValid) {
        throw new Error('Invalid password')
      }
      
      if (!user.isActive) {
        throw new Error('Account is deactivated')
      }
      
      const token = 'demo-token-' + Date.now()
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
      setUser(user)
      
      return { success: true, user }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const register = async (userData) => {
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      
      // Check if user already exists
      if (users.find(u => u.email === userData.email)) {
        throw new Error('User already exists with this email')
      }
      
      // Hash password
      const hashedPassword = await hashPassword(userData.password)
      
      // Store user with hashed password and active status
      const newUser = {
        id: Date.now().toString(),
        ...userData,
        password: hashedPassword,
        isActive: true, // Account is immediately active
        emailVerified: true, // No email verification required
        createdAt: new Date().toISOString()
      }
      
      users.push(newUser)
      localStorage.setItem('users', JSON.stringify(users))
      
      return { 
        success: true, 
        message: 'Registration successful! You can now log in.'
      }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }

  const value = useMemo(() => ({ 
    user, 
    setUser, 
    loading, 
    login, 
    register, 
    logout 
  }), [user, loading])
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}


