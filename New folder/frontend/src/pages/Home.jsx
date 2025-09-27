import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Home() {
  const { user } = useAuth()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
              S & T Communication
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Your Trusted Mobile & SIM Solutions Provider
            </p>
            <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto">
              Leading mobile communication shop with over 15 years of experience. 
              We sell 50,000+ products annually including mobile phones, SIM cards, 
              routers, TV boxes, and accessories with professional repair services.
            </p>
            
            {user ? (
              <div className="space-x-4">
                <Link
                  to="/user-home"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                >
                  Go to Shop
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                >
                  Our Services
                </Link>
              </div>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                Get Started
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white/20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Our Mobile & Communication Solutions
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Complete mobile communication services with the latest technology and expert support.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="mx-auto h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Mobile Phones</h3>
              <p className="text-gray-600 text-sm">
                Latest smartphones from top brands with warranty and repair services.
              </p>
            </div>
            
            <div className="text-center">
              <div className="mx-auto h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">📶</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">SIM Cards</h3>
              <p className="text-gray-600 text-sm">
                All network SIM cards with instant activation and data packages.
              </p>
            </div>
            
            <div className="text-center">
              <div className="mx-auto h-16 w-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">🔧</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Repair Services</h3>
              <p className="text-gray-600 text-sm">
                Professional mobile repair with genuine parts and quick turnaround.
              </p>
            </div>
            
            <div className="text-center">
              <div className="mx-auto h-16 w-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">📺</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">TV & Routers</h3>
              <p className="text-gray-600 text-sm">
                Smart TV boxes, routers, and networking equipment with setup support.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">50,000+</div>
              <div className="text-lg text-gray-600">Products Sold Annually</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">15+</div>
              <div className="text-lg text-gray-600">Years of Experience</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">24/7</div>
              <div className="text-lg text-gray-600">Customer Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Upgrade Your Mobile Experience?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Discover our wide range of mobile phones, SIM cards, and communication solutions with expert support.
          </p>
          {!user && (
            <Link
              to="/login"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 transition-colors"
            >
              Shop Now
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
