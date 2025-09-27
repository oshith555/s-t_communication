export default function Footer() {
  return (
    <footer className="bg-white/20 backdrop-blur-md border-t border-white/30 mt-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <h3 className="text-sm font-semibold text-blue-600 mb-1">S & T Communication</h3>
            <p className="text-gray-600 text-xs">
              Your trusted mobile communication partner
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-800 mb-1 text-xs">Quick Links</h4>
            <ul className="space-y-0.5 text-xs text-gray-600">
              <li><a href="/services" className="hover:text-blue-600 transition-colors">Services</a></li>
              <li><a href="/about" className="hover:text-blue-600 transition-colors">About Us</a></li>
              <li><a href="/shop" className="hover:text-blue-600 transition-colors">Shop</a></li>
              <li><a href="/contact" className="hover:text-blue-600 transition-colors">Contact Us</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-800 mb-1 text-xs">Contact Info</h4>
            <div className="space-y-0.5 text-xs text-gray-600">
              <p>📧 S&Tcommunication@gmail.com</p>
              <p>📱 0773551659</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/30 mt-2 pt-2 text-center text-xs text-gray-600">
          <p>&copy; 2024 S & T Communication. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
