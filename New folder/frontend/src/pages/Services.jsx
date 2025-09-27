import { useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'

export default function Services() {
  const { user } = useAuth()
  const [reloadForm, setReloadForm] = useState({
    mobileNumber: '',
    amount: '',
    network: '',
    paymentMethod: ''
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleReloadChange = (e) => {
    setReloadForm({
      ...reloadForm,
      [e.target.name]: e.target.value
    })
  }

  const handleReloadSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      // Validate all fields are filled
      if (!reloadForm.mobileNumber || !reloadForm.amount || !reloadForm.network || !reloadForm.paymentMethod) {
        setError('Please fill in all fields')
        return
      }

      // Validate mobile number format
      const mobileRegex = /^0[0-9]{9}$/
      if (!mobileRegex.test(reloadForm.mobileNumber)) {
        setError('Please enter a valid mobile number (e.g., 0771234567)')
        return
      }

      // Validate amount
      if (parseFloat(reloadForm.amount) < 50) {
        setError('Minimum reload amount is Rs. 50')
        return
      }

      // Simulate reload process
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setSuccess(true)
      setReloadForm({ mobileNumber: '', amount: '', network: '', paymentMethod: '' })
    } catch (err) {
      setError('Reload failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const services = [
    {
      id: 1,
      title: "Mobile Repair Services",
      description: "Professional mobile phone repair with genuine parts and warranty. We fix all major brands including iPhone, Samsung, Huawei, and more.",
      features: [
        "Screen replacement",
        "Battery replacement", 
        "Water damage repair",
        "Software issues",
        "Hardware problems"
      ],
      price: "Starting from Rs. 2,500"
    },
    {
      id: 2,
      title: "Software Updates",
      description: "Keep your mobile devices up-to-date with the latest software versions and security patches.",
      features: [
        "Android updates",
        "iOS updates",
        "Security patches",
        "Performance optimization",
        "Data backup & restore"
      ],
      price: "Starting from Rs. 500"
    },
    {
      id: 3,
      title: "Reload Services",
      description: "Instant mobile reload for all networks with competitive rates and 24/7 availability.",
      features: [
        "All network support",
        "Instant processing",
        "Competitive rates",
        "24/7 availability",
        "Multiple payment methods"
      ],
      price: "No service charges"
    },
    {
      id: 4,
      title: "Router & TV Setup",
      description: "Professional installation and configuration of routers, smart TV boxes, and networking equipment.",
      features: [
        "Router configuration",
        "WiFi setup",
        "Smart TV installation",
        "Network optimization",
        "Technical support"
      ],
      price: "Starting from Rs. 1,500"
    }
  ]

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Our Services</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Professional mobile and communication services with expert support and competitive pricing.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
          {services.map((service) => (
            <div key={service.id} className="bg-white/40 backdrop-blur-md rounded-xl border border-white/30 shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Services Include:</h4>
                <ul className="space-y-1">
                  {service.features.map((feature, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="text-lg font-semibold text-blue-600">{service.price}</div>
            </div>
          ))}
        </div>

        {/* Reload Panel */}
        <div className="bg-white/40 backdrop-blur-md rounded-xl border border-white/30 shadow-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Mobile Reload Service</h2>
            <p className="text-gray-600">Instant mobile reload for all networks with competitive rates</p>
          </div>

          {success && (
            <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-md text-sm mb-6 text-center">
              ✅ Reload successful! Your mobile has been recharged.
            </div>
          )}
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm mb-6 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleReloadSubmit} className="max-w-md mx-auto">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  name="mobileNumber"
                  required
                  value={reloadForm.mobileNumber}
                  onChange={handleReloadChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0771234567"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount (Rs.) *
                </label>
                <input
                  type="number"
                  name="amount"
                  required
                  value={reloadForm.amount}
                  onChange={handleReloadChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="100"
                  min="50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Network *
                </label>
                <select
                  name="network"
                  required
                  value={reloadForm.network}
                  onChange={handleReloadChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Network</option>
                  <option value="dialog">Dialog</option>
                  <option value="mobitel">Mobitel</option>
                  <option value="hutch">Hutch</option>
                  <option value="airtel">Airtel</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Method *
                </label>
                <select
                  name="paymentMethod"
                  required
                  value={reloadForm.paymentMethod}
                  onChange={handleReloadChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Payment Method</option>
                  <option value="card">Credit/Debit Card</option>
                  <option value="bank">Bank Transfer</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Processing Reload...
                  </div>
                ) : (
                  'Reload Now'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
