import { useState, useEffect } from 'react'

export default function AdminPanel() {
  const [users, setUsers] = useState([])
  const [messages, setMessages] = useState([])
  const [orders, setOrders] = useState([])
  const [products, setProducts] = useState([])
  const [showAddUser, setShowAddUser] = useState(false)
  const [showAddProduct, setShowAddProduct] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [editingProduct, setEditingProduct] = useState(null)
  const [activeTab, setActiveTab] = useState('users')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    role: 'employee'
  })
  const [productForm, setProductForm] = useState({
    name: '',
    category: '',
    price: '',
    description: '',
    features: ''
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    // Load data from localStorage
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]')
    const existingMessages = JSON.parse(localStorage.getItem('messages') || '[]')
    const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]')
    const existingProducts = JSON.parse(localStorage.getItem('products') || '[]')
    
    setUsers(existingUsers)
    setMessages(existingMessages)
    setOrders(existingOrders)
    setProducts(existingProducts)
  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleAddUser = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const newUser = {
        id: Date.now().toString(),
        ...formData,
        isActive: true
      }
      
      const updatedUsers = [...users, newUser]
      setUsers(updatedUsers)
      localStorage.setItem('users', JSON.stringify(updatedUsers))
      
      setSuccess('User added successfully!')
      setFormData({ name: '', email: '', mobile: '', password: '', role: 'employee' })
      setShowAddUser(false)
    } catch (err) {
      setError('Failed to add user')
    } finally {
      setLoading(false)
    }
  }

  const handleEditUser = (user) => {
    setEditingUser(user)
    setFormData({
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      password: '',
      role: user.role
    })
  }

  const handleUpdateUser = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const updatedUsers = users.map(user => 
        user.id === editingUser.id 
          ? { ...user, ...formData }
          : user
      )
      setUsers(updatedUsers)
      localStorage.setItem('users', JSON.stringify(updatedUsers))
      
      setSuccess('User updated successfully!')
      setEditingUser(null)
      setFormData({ name: '', email: '', mobile: '', password: '', role: 'employee' })
    } catch (err) {
      setError('Failed to update user')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      const updatedUsers = users.filter(user => user.id !== userId)
      setUsers(updatedUsers)
      localStorage.setItem('users', JSON.stringify(updatedUsers))
      setSuccess('User deleted successfully!')
    }
  }

  const handleToggleUserStatus = (userId) => {
    const updatedUsers = users.map(user => 
      user.id === userId 
        ? { ...user, isActive: !user.isActive }
        : user
    )
    setUsers(updatedUsers)
    localStorage.setItem('users', JSON.stringify(updatedUsers))
  }

  const handleProductChange = (e) => {
    setProductForm({
      ...productForm,
      [e.target.name]: e.target.value
    })
  }

  const handleAddProduct = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const newProduct = {
        id: Date.now().toString(),
        ...productForm,
        price: parseFloat(productForm.price),
        features: productForm.features.split(',').map(f => f.trim())
      }
      
      const updatedProducts = [...products, newProduct]
      setProducts(updatedProducts)
      localStorage.setItem('products', JSON.stringify(updatedProducts))
      
      setSuccess('Product added successfully!')
      setProductForm({ name: '', category: '', price: '', description: '', features: '' })
      setShowAddProduct(false)
    } catch (err) {
      setError('Failed to add product')
    } finally {
      setLoading(false)
    }
  }

  const handleEditProduct = (product) => {
    setEditingProduct(product)
    setProductForm({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      description: product.description,
      features: product.features.join(', ')
    })
    setShowAddProduct(true)
  }

  const handleUpdateProduct = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const updatedProduct = {
        ...editingProduct,
        ...productForm,
        price: parseFloat(productForm.price),
        features: productForm.features.split(',').map(f => f.trim())
      }
      
      const updatedProducts = products.map(product => 
        product.id === editingProduct.id ? updatedProduct : product
      )
      setProducts(updatedProducts)
      localStorage.setItem('products', JSON.stringify(updatedProducts))
      
      setSuccess('Product updated successfully!')
      setProductForm({ name: '', category: '', price: '', description: '', features: '' })
      setShowAddProduct(false)
      setEditingProduct(null)
    } catch (err) {
      setError('Failed to update product')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteProduct = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      const updatedProducts = products.filter(product => product.id !== productId)
      setProducts(updatedProducts)
      localStorage.setItem('products', JSON.stringify(updatedProducts))
      setSuccess('Product deleted successfully!')
    }
  }

  const handleOrderStatusChange = (orderId, status) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId 
        ? { ...order, status }
        : order
    )
    setOrders(updatedOrders)
    localStorage.setItem('orders', JSON.stringify(updatedOrders))

    // Create notification for user
    const order = orders.find(o => o.id === orderId)
    if (order) {
      const notification = {
        id: Date.now().toString(),
        title: `Order ${status === 'confirmed' ? 'Confirmed' : 'Rejected'}`,
        message: `Your order for ${order.productName} has been ${status === 'confirmed' ? 'confirmed' : 'rejected'} by admin.`,
        timestamp: new Date().toISOString()
      }

      const userNotifications = JSON.parse(localStorage.getItem(`notifications_${order.userId}`) || '[]')
      userNotifications.push(notification)
      localStorage.setItem(`notifications_${order.userId}`, JSON.stringify(userNotifications))
    }
  }

  return (
    <div className="min-h-screen py-8" style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #ff6b6b 50%, #ffffff 100%)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Admin Panel</h1>
          <p className="text-lg text-white/90">
            Manage users and system settings
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/20 backdrop-blur-md rounded-xl border border-white/30 shadow-lg p-6">
            <div className="text-2xl font-bold text-white">{users.length}</div>
            <div className="text-white/80">Total Users</div>
          </div>
          <div className="bg-white/20 backdrop-blur-md rounded-xl border border-white/30 shadow-lg p-6">
            <div className="text-2xl font-bold text-white">{users.filter(u => u.role === 'admin').length}</div>
            <div className="text-white/80">Administrators</div>
          </div>
          <div className="bg-white/20 backdrop-blur-md rounded-xl border border-white/30 shadow-lg p-6">
            <div className="text-2xl font-bold text-white">{users.filter(u => u.isActive).length}</div>
            <div className="text-white/80">Active Users</div>
          </div>
          <div className="bg-white/20 backdrop-blur-md rounded-xl border border-white/30 shadow-lg p-6">
            <div className="text-2xl font-bold text-white">{messages.length}</div>
            <div className="text-white/80">Messages</div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'users' 
                ? 'bg-white/30 text-white' 
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            User Management
          </button>
          <button
            onClick={() => setActiveTab('messages')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'messages' 
                ? 'bg-white/30 text-white' 
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            Contact Messages
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'orders' 
                ? 'bg-white/30 text-white' 
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            Orders
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'products' 
                ? 'bg-white/30 text-white' 
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            Products
          </button>
        </div>

        {/* Success/Error Messages */}
        {success && (
          <div className="bg-green-900/50 border border-green-700 text-green-300 px-4 py-3 rounded-md text-sm mb-6">
            {success}
          </div>
        )}
        
        {error && (
          <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-md text-sm mb-6">
            {error}
          </div>
        )}

        {/* Users Table */}
        {activeTab === 'users' && (
          <div className="bg-gray-800/40 backdrop-blur-md rounded-xl border border-gray-700/30 shadow-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-700/20 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-white">User Management</h2>
              <button
                onClick={() => setShowAddUser(true)}
                className="px-4 py-2 bg-gray-700/50 text-white rounded-lg hover:bg-gray-700/70 transition-colors"
              >
                Add New User
              </button>
            </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700/50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Mobile</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Role</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700/20">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-700/20 transition-colors">
                    <td className="px-6 py-4 text-white">{user.name}</td>
                    <td className="px-6 py-4 text-white/80">{user.email}</td>
                    <td className="px-6 py-4 text-white/80">{user.mobile}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        user.role === 'admin' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        user.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {user.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditUser(user)}
                          className="px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleToggleUserStatus(user.id)}
                          className={`px-2 py-1 text-xs rounded transition-colors ${
                            user.isActive 
                              ? 'bg-yellow-600 text-white hover:bg-yellow-700' 
                              : 'bg-green-600 text-white hover:bg-green-700'
                          }`}
                        >
                          {user.isActive ? 'Deactivate' : 'Activate'}
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="px-2 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        )}

        {/* Messages Table */}
        {activeTab === 'messages' && (
          <div className="bg-gray-800/40 backdrop-blur-md rounded-xl border border-gray-700/30 shadow-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-700/20">
              <h2 className="text-xl font-semibold text-white">Contact Messages</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Email</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Subject</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Message</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700/20">
                  {messages.map((message) => (
                    <tr key={message.id} className="hover:bg-gray-700/20 transition-colors">
                      <td className="px-6 py-4 text-white">{message.name}</td>
                      <td className="px-6 py-4 text-white/80">{message.email}</td>
                      <td className="px-6 py-4 text-white/80">{message.subject}</td>
                      <td className="px-6 py-4 text-white/80 max-w-xs truncate">{message.message}</td>
                      <td className="px-6 py-4 text-white/80 text-sm">
                        {new Date(message.timestamp).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Orders Table */}
        {activeTab === 'orders' && (
          <div className="bg-gray-800/40 backdrop-blur-md rounded-xl border border-gray-700/30 shadow-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-700/20">
              <h2 className="text-xl font-semibold text-white">Order Management</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Order ID</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Customer</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Product</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Price</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700/20">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-700/20 transition-colors">
                      <td className="px-6 py-4 text-white text-sm">#{order.id.slice(-6)}</td>
                      <td className="px-6 py-4 text-white/80">{order.userName}</td>
                      <td className="px-6 py-4 text-white/80">{order.productName}</td>
                      <td className="px-6 py-4 text-white/80">Rs. {order.productPrice.toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          order.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                          order.status === 'rejected' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-white/80 text-sm">
                        {new Date(order.timestamp).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          {order.status === 'pending' && (
                            <>
                              <button
                                onClick={() => handleOrderStatusChange(order.id, 'confirmed')}
                                className="px-2 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 transition-colors"
                              >
                                Confirm
                              </button>
                              <button
                                onClick={() => handleOrderStatusChange(order.id, 'rejected')}
                                className="px-2 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 transition-colors"
                              >
                                Reject
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Products Table */}
        {activeTab === 'products' && (
          <div className="bg-gray-800/40 backdrop-blur-md rounded-xl border border-gray-700/30 shadow-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-700/20 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-white">Product Management</h2>
              <button
                onClick={() => {
                  setEditingProduct(null)
                  setProductForm({ name: '', category: '', price: '', description: '', features: '' })
                  setShowAddProduct(true)
                }}
                className="px-4 py-2 bg-gray-700/50 text-white rounded-lg hover:bg-gray-700/70 transition-colors"
              >
                Add New Product
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Category</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Price</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Description</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700/20">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-700/20 transition-colors">
                      <td className="px-6 py-4 text-white">{product.name}</td>
                      <td className="px-6 py-4 text-white/80">{product.category}</td>
                      <td className="px-6 py-4 text-white/80">Rs. {product.price.toLocaleString()}</td>
                      <td className="px-6 py-4 text-white/80 max-w-xs truncate">{product.description}</td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => handleEditProduct(product)}
                            className="px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => handleDeleteProduct(product.id)}
                            className="px-2 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Add User Modal */}
        {showAddUser && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-xl max-w-md w-full p-6">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-xl font-bold text-white">Add New User</h3>
                <button
                  onClick={() => setShowAddUser(false)}
                  className="text-gray-400 hover:text-gray-200 text-2xl"
                >
                  ×
                </button>
              </div>
              
              <form onSubmit={handleAddUser} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Mobile</label>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Password</label>
                  <input
                    type="password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Role</label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="employee">Employee</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowAddUser(false)}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    {loading ? 'Adding...' : 'Add User'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit User Modal */}
        {editingUser && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-xl max-w-md w-full p-6">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-xl font-bold text-white">Edit User</h3>
                <button
                  onClick={() => setEditingUser(null)}
                  className="text-gray-400 hover:text-gray-200 text-2xl"
                >
                  ×
                </button>
              </div>
              
              <form onSubmit={handleUpdateUser} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Mobile</label>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-white mb-2">New Password (optional)</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Role</label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="employee">Employee</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setEditingUser(null)}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    {loading ? 'Updating...' : 'Update User'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Add/Edit Product Modal */}
        {showAddProduct && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-xl max-w-md w-full p-6">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-xl font-bold text-white">
                  {editingProduct ? 'Edit Product' : 'Add New Product'}
                </h3>
                <button
                  onClick={() => {
                    setShowAddProduct(false)
                    setEditingProduct(null)
                    setProductForm({ name: '', category: '', price: '', description: '', features: '' })
                  }}
                  className="text-gray-400 hover:text-gray-200 text-2xl"
                >
                  ×
                </button>
              </div>
              
              <form onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Product Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={productForm.name}
                    onChange={handleProductChange}
                    className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Category</label>
                  <select
                    name="category"
                    required
                    value={productForm.category}
                    onChange={handleProductChange}
                    className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Category</option>
                    <option value="sims">SIM Cards</option>
                    <option value="mobile">Mobile Phones</option>
                    <option value="routers">Routers</option>
                    <option value="tv">TV Boxes</option>
                    <option value="chargers">Chargers</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Price (Rs.)</label>
                  <input
                    type="number"
                    name="price"
                    required
                    value={productForm.price}
                    onChange={handleProductChange}
                    className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    min="0"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Description</label>
                  <textarea
                    name="description"
                    required
                    rows={3}
                    value={productForm.description}
                    onChange={handleProductChange}
                    className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Features (comma separated)</label>
                  <input
                    type="text"
                    name="features"
                    value={productForm.features}
                    onChange={handleProductChange}
                    className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Feature 1, Feature 2, Feature 3"
                  />
                </div>
                
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddProduct(false)
                      setEditingProduct(null)
                      setProductForm({ name: '', category: '', price: '', description: '', features: '' })
                    }}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    {loading ? (editingProduct ? 'Updating...' : 'Adding...') : (editingProduct ? 'Update Product' : 'Add Product')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
