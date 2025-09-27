import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
// Import images from assets folder
import sim1 from '../assets/1.png'
import sim2 from '../assets/2.png'
import sim3 from '../assets/3.png'
import sim4 from '../assets/4.png'
import mobile5 from '../assets/5.png'
import mobile6 from '../assets/6.png'
import mobile7 from '../assets/7.png'
import mobile8 from '../assets/8.png'
import router15 from '../assets/15.png'
import router16 from '../assets/16.png'
import router17 from '../assets/17.png'
import tv20 from '../assets/20.png'
import tv21 from '../assets/21.png'
import tv22 from '../assets/22.png'
import charger25 from '../assets/25.png'
import charger26 from '../assets/26.png'
import charger27 from '../assets/27.png'

export default function Shop() {
  const { user } = useAuth()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [allProducts, setAllProducts] = useState([])
  const [orderForm, setOrderForm] = useState({
    name: '',
    email: '',
    mobile: '',
    address: '',
    paymentMethod: '',
    idCard: null
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const categories = [
    { id: 'all', name: 'All Products', icon: '🛍️' },
    { id: 'sims', name: 'SIM Cards', icon: '📶' },
    { id: 'mobile', name: 'Mobile Phones', icon: '📱' },
    { id: 'routers', name: 'Routers', icon: '📡' },
    { id: 'tv', name: 'TV Boxes', icon: '📺' },
    { id: 'chargers', name: 'Chargers', icon: '🔌' }
  ]

  const products = [
    // SIM Cards - Images 1-4
    {
      id: 1,
      name: "Dialog SIM Card",
      category: "sims",
      price: 500,
      image: sim1,
      description: "Dialog 4G SIM card with instant activation and data packages available.",
      features: ["4G Network", "Instant Activation", "Data Packages", "Voice & SMS"]
    },
    {
      id: 2,
      name: "Mobitel SIM Card",
      category: "sims",
      price: 500,
      image: sim2,
      description: "Mobitel 4G SIM card with competitive data rates.",
      features: ["4G Network", "Competitive Rates", "Nationwide Coverage", "24/7 Support"]
    },
    {
      id: 3,
      name: "Hutch SIM Card",
      category: "sims",
      price: 500,
      image: sim3,
      description: "Hutch 4G SIM card with excellent coverage and data plans.",
      features: ["4G Network", "Excellent Coverage", "Data Plans", "Customer Support"]
    },
    {
      id: 4,
      name: "Airtel SIM Card",
      category: "sims",
      price: 500,
      image: sim4,
      description: "Airtel 4G SIM card with international roaming and data packages.",
      features: ["4G Network", "International Roaming", "Data Packages", "Global Coverage"]
    },
    // Mobile Phones - Images 5-8
    {
      id: 5,
      name: "Samsung Galaxy A54",
      category: "mobile",
      price: 85000,
      image: mobile5,
      description: "Latest Samsung Galaxy A54 with 128GB storage and 6GB RAM.",
      features: ["128GB Storage", "6GB RAM", "50MP Camera", "5G Ready"]
    },
    {
      id: 6,
      name: "iPhone 15",
      category: "mobile",
      price: 150000,
      image: mobile6,
      description: "Apple iPhone 15 with A17 Pro chip and advanced camera system.",
      features: ["A17 Pro Chip", "48MP Camera", "128GB Storage", "iOS 17"]
    },
    {
      id: 7,
      name: "Huawei P60 Pro",
      category: "mobile",
      price: 95000,
      image: mobile7,
      description: "Huawei P60 Pro with advanced photography and long battery life.",
      features: ["Advanced Camera", "Long Battery", "256GB Storage", "HarmonyOS"]
    },
    {
      id: 8,
      name: "OnePlus 11",
      category: "mobile",
      price: 75000,
      image: mobile8,
      description: "OnePlus 11 with Snapdragon 8 Gen 2 and fast charging.",
      features: ["Snapdragon 8 Gen 2", "Fast Charging", "120Hz Display", "OxygenOS"]
    },
    // Routers - Images 15-17
    {
      id: 9,
      name: "TP-Link Router",
      category: "routers",
      price: 15000,
      image: router15,
      description: "High-speed WiFi router with dual-band support and easy setup.",
      features: ["Dual Band", "High Speed", "Easy Setup", "Long Range"]
    },
    {
      id: 10,
      name: "Netgear Router",
      category: "routers",
      price: 18000,
      image: router16,
      description: "Professional-grade router with advanced security features.",
      features: ["Advanced Security", "Gigabit Speed", "VPN Support", "Parental Controls"]
    },
    {
      id: 11,
      name: "ASUS Router",
      category: "routers",
      price: 20000,
      image: router17,
      description: "Gaming router with low latency and high performance.",
      features: ["Gaming Optimized", "Low Latency", "High Performance", "RGB Lighting"]
    },
    // TV Boxes - Images 20-22
    {
      id: 12,
      name: "Android TV Box",
      category: "tv",
      price: 12000,
      image: tv20,
      description: "Android TV box with 4K support and streaming capabilities.",
      features: ["4K Support", "Android OS", "Streaming Apps", "Remote Control"]
    },
    {
      id: 13,
      name: "Smart TV Box Pro",
      category: "tv",
      price: 15000,
      image: tv21,
      description: "Premium Android TV box with 8K support and voice control.",
      features: ["8K Support", "Voice Control", "Premium Apps", "Bluetooth"]
    },
    {
      id: 14,
      name: "Streaming Box",
      category: "tv",
      price: 10000,
      image: tv22,
      description: "Compact streaming box with all major streaming platforms.",
      features: ["Compact Design", "All Platforms", "HD Support", "Easy Setup"]
    },
    // Chargers - Images 25-27
    {
      id: 15,
      name: "Fast Charger 65W",
      category: "chargers",
      price: 3500,
      image: charger25,
      description: "65W fast charging adapter with multiple port support.",
      features: ["65W Fast Charging", "Multiple Ports", "Universal", "Safety Protection"]
    },
    {
      id: 16,
      name: "Wireless Charger",
      category: "chargers",
      price: 4500,
      image: charger26,
      description: "Qi-compatible wireless charger with LED indicator.",
      features: ["Qi Compatible", "LED Indicator", "Fast Wireless", "Universal"]
    },
    {
      id: 17,
      name: "Car Charger",
      category: "chargers",
      price: 2500,
      image: charger27,
      description: "Dual port car charger with fast charging capability.",
      features: ["Dual Port", "Fast Charging", "Car Compatible", "Safety Features"]
    }
  ]

  useEffect(() => {
    // Load admin-added products from localStorage
    const adminProducts = JSON.parse(localStorage.getItem('products') || '[]')
    
    // Merge default products with admin products
    const mergedProducts = [...products, ...adminProducts]
    setAllProducts(mergedProducts)
  }, [])

  const filteredProducts = selectedCategory === 'all' 
    ? allProducts 
    : allProducts.filter(product => product.category === selectedCategory)

  const handleOrderChange = (e) => {
    setOrderForm({
      ...orderForm,
      [e.target.name]: e.target.value
    })
  }

  const handleIdCardUpload = (e) => {
    setOrderForm({
      ...orderForm,
      idCard: e.target.files[0]
    })
  }

  const handleOrderSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      // Validate all fields
      if (!orderForm.name || !orderForm.email || !orderForm.mobile || !orderForm.address || !orderForm.paymentMethod) {
        setError('Please fill in all required fields')
        return
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(orderForm.email)) {
        setError('Please enter a valid email address')
        return
      }

      // Validate mobile number format
      const mobileRegex = /^0[0-9]{9}$/
      if (!mobileRegex.test(orderForm.mobile)) {
        setError('Please enter a valid mobile number (e.g., 0771234567)')
        return
      }

      // Validate ID card upload
      if (!orderForm.idCard) {
        setError('Please upload your ID card image')
        return
      }

      // Create order
      const order = {
        id: Date.now().toString(),
        userId: user?.id,
        userName: user?.name,
        productId: selectedProduct.id,
        productName: selectedProduct.name,
        productPrice: selectedProduct.price,
        customerDetails: orderForm,
        status: 'pending',
        timestamp: new Date().toISOString()
      }

      // Store order in localStorage
      const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]')
      existingOrders.push(order)
      localStorage.setItem('orders', JSON.stringify(existingOrders))

      // Create notification for user
      const notification = {
        id: Date.now().toString(),
        title: 'Order Placed Successfully',
        message: `Your order for ${selectedProduct.name} has been placed and is pending admin approval.`,
        timestamp: new Date().toISOString()
      }

      const userNotifications = JSON.parse(localStorage.getItem(`notifications_${user?.id}`) || '[]')
      userNotifications.push(notification)
      localStorage.setItem(`notifications_${user?.id}`, JSON.stringify(userNotifications))

      setSuccess(true)
      setSelectedProduct(null)
      setOrderForm({ name: '', email: '', mobile: '', address: '', paymentMethod: '', idCard: null })
    } catch (err) {
      setError('Failed to place order. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">S & T Communication Shop</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover our wide range of mobile phones, SIM cards, routers, and accessories
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white/40 text-gray-700 hover:bg-white/60'
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white/40 backdrop-blur-md rounded-xl border border-white/30 shadow-lg overflow-hidden card-hover cursor-pointer"
              onClick={() => setSelectedProduct(product)}
            >
              <div className="p-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-blue-600">Rs. {product.price.toLocaleString()}</span>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Product Detail Modal */}
        {selectedProduct && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedProduct.name}</h2>
                    <p className="text-gray-600">{selectedProduct.description}</p>
                  </div>
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="text-gray-400 hover:text-gray-600 text-2xl"
                  >
                    ×
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <img
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  </div>
                  
                  <div>
                    <div className="text-3xl font-bold text-blue-600 mb-4">
                      Rs. {selectedProduct.price.toLocaleString()}
                    </div>
                    
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold mb-2">Features:</h3>
                      <ul className="space-y-1">
                        {selectedProduct.features.map((feature, index) => (
                          <li key={index} className="text-sm text-gray-600 flex items-center">
                            <span className="text-green-500 mr-2">✓</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Order Form */}
                {user ? (
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold mb-4">Place Order</h3>
                    
                    {success && (
                      <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-md text-sm mb-4">
                        ✅ Order placed successfully! You will receive a notification when admin confirms your order.
                      </div>
                    )}
                    
                    {error && (
                      <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm mb-4">
                        {error}
                      </div>
                    )}

                    <form onSubmit={handleOrderSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            name="name"
                            required
                            value={orderForm.name}
                            onChange={handleOrderChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email *
                          </label>
                          <input
                            type="email"
                            name="email"
                            required
                            value={orderForm.email}
                            onChange={handleOrderChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Mobile Number *
                          </label>
                          <input
                            type="tel"
                            name="mobile"
                            required
                            value={orderForm.mobile}
                            onChange={handleOrderChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Payment Method *
                          </label>
                          <select
                            name="paymentMethod"
                            required
                            value={orderForm.paymentMethod}
                            onChange={handleOrderChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="">Select Payment Method</option>
                            <option value="card">Credit/Debit Card</option>
                            <option value="bank">Bank Transfer</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Delivery Address *
                        </label>
                        <textarea
                          name="address"
                          required
                          rows={3}
                          value={orderForm.address}
                          onChange={handleOrderChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          ID Card Image *
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          required
                          onChange={handleIdCardUpload}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>

                      <div className="flex justify-end space-x-4">
                        <button
                          type="button"
                          onClick={() => setSelectedProduct(null)}
                          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={loading}
                          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
                        >
                          {loading ? 'Placing Order...' : 'Place Order'}
                        </button>
                      </div>
                    </form>
                  </div>
                ) : (
                  <div className="border-t pt-6 text-center">
                    <p className="text-gray-600 mb-4">Please login to place an order</p>
                    <a
                      href="/login"
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Login
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
