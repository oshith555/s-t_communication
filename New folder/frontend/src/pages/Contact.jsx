import { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      // Store message in localStorage (simulating backend)
      const existingMessages = JSON.parse(localStorage.getItem('messages') || '[]')
      const newMessage = {
        id: Date.now().toString(),
        ...formData,
        timestamp: new Date().toISOString()
      }
      
      existingMessages.push(newMessage)
      localStorage.setItem('messages', JSON.stringify(existingMessages))
      
      setSuccess(true)
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
    } catch (err) {
      setError('Failed to send message')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Get in touch with our team. We're here to help with any questions or concerns.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white/40 backdrop-blur-md rounded-xl border border-white/30 shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Send us a Message</h2>
            
            {success && (
              <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-md text-sm mb-6">
                Message sent successfully! We'll get back to you soon.
              </div>
            )}
            
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm mb-6">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Your full name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="+94 77 123 4567"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="What's this about?"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Tell us how we can help you..."
                />
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Sending Message...
                  </div>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white/40 backdrop-blur-md rounded-xl border border-white/30 shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Get in Touch</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 text-lg">📧</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Email</h3>
                    <p className="text-gray-600">S&Tcommunication@gmail.com</p>
                    <p className="text-sm text-gray-500">We'll respond within 24 hours</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 text-lg">📱</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Phone</h3>
                    <p className="text-gray-600">0773551659</p>
                    <p className="text-sm text-gray-500">Mon-Fri 9AM-6PM</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 text-lg">🏢</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Office</h3>
                    <p className="text-gray-600">S & T Communication</p>
                    <p className="text-sm text-gray-500">Sri Lanka</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <span className="text-orange-600 text-lg">⏰</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Business Hours</h3>
                    <p className="text-gray-600">Monday - Friday</p>
                    <p className="text-sm text-gray-500">9:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white/40 backdrop-blur-md rounded-xl border border-white/30 shadow-lg p-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Response</h3>
              <p className="text-gray-600 text-sm mb-4">
                For urgent security incidents or policy violations, please contact us immediately via phone or email.
              </p>
              <div className="space-y-2 text-sm text-gray-500">
                <p>• Security incidents: Call +94 77 355 1659</p>
                <p>• Policy questions: Email S&Tcommunication@gmail.com</p>
                <p>• Training support: Available 24/7 online</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
