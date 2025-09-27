import { useState } from 'react'

export default function AboutUs() {
  const [activeTab, setActiveTab] = useState('background')

  const teamMembers = [
    {
      name: "Saman Perera",
      position: "Founder & CEO",
      experience: "20+ years in mobile industry",
      image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=300&h=300&fit=crop&crop=face&auto=format&q=80"
    },
    {
      name: "Tharindu Silva",
      position: "Technical Director",
      experience: "15+ years in mobile repair",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop&crop=face&auto=format&q=80"
    },
    {
      name: "Nimali Fernando",
      position: "Customer Relations Manager",
      experience: "10+ years in customer service",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=face&auto=format&q=80"
    },
    {
      name: "Kasun Rajapaksa",
      position: "Lead Technician",
      experience: "12+ years in mobile repair",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face&auto=format&q=80"
    }
  ]

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">About S & T Communication</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Your trusted partner in mobile communication solutions for over 15 years
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-1 bg-white/20 backdrop-blur-md rounded-lg p-1">
            <button
              onClick={() => setActiveTab('background')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'background'
                  ? 'bg-white text-gray-800 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Our Background
            </button>
            <button
              onClick={() => setActiveTab('team')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'team'
                  ? 'bg-white text-gray-800 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Our Team
            </button>
            <button
              onClick={() => setActiveTab('mission')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'mission'
                  ? 'bg-white text-gray-800 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Future Mission
            </button>
          </div>
        </div>

        {/* Background Tab */}
        {activeTab === 'background' && (
          <div className="space-y-8">
            <div className="bg-white/40 backdrop-blur-md rounded-xl border border-white/30 shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Our Story</h2>
              <div className="prose max-w-none">
                <p className="text-gray-700 mb-4">
                  S & T Communication was founded in 2008 by Saman Perera with a vision to provide 
                  reliable mobile communication solutions to the Sri Lankan market. What started 
                  as a small mobile repair shop in Colombo has grown into one of the leading 
                  mobile communication companies in the country.
                </p>
                <p className="text-gray-700 mb-4">
                  Over the past 15 years, we have built a reputation for excellence in mobile 
                  repair services, SIM card distribution, and customer support. Our commitment 
                  to quality and customer satisfaction has made us the preferred choice for 
                  thousands of customers across Sri Lanka.
                </p>
                <p className="text-gray-700 mb-4">
                  Today, we sell over 50,000 products annually and serve customers from all 
                  walks of life, from individual consumers to large corporate clients. Our 
                  success is built on trust, reliability, and continuous innovation in the 
                  mobile communication industry.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/40 backdrop-blur-md rounded-xl border border-white/30 shadow-lg p-6 text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">15+</div>
                <div className="text-gray-600">Years of Experience</div>
              </div>
              <div className="bg-white/40 backdrop-blur-md rounded-xl border border-white/30 shadow-lg p-6 text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">50,000+</div>
                <div className="text-gray-600">Products Sold Annually</div>
              </div>
              <div className="bg-white/40 backdrop-blur-md rounded-xl border border-white/30 shadow-lg p-6 text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">10,000+</div>
                <div className="text-gray-600">Happy Customers</div>
              </div>
            </div>
          </div>
        )}

        {/* Team Tab */}
        {activeTab === 'team' && (
          <div className="space-y-8">
            <div className="bg-white/40 backdrop-blur-md rounded-xl border border-white/30 shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Meet Our Team</h2>
              <p className="text-gray-700 mb-8">
                Our experienced team of professionals is dedicated to providing you with the 
                best mobile communication solutions and customer service.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {teamMembers.map((member, index) => (
                  <div key={index} className="text-center">
                    <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white shadow-lg">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">{member.name}</h3>
                    <p className="text-blue-600 text-sm font-medium mb-2">{member.position}</p>
                    <p className="text-gray-600 text-xs">{member.experience}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Mission Tab */}
        {activeTab === 'mission' && (
          <div className="space-y-8">
            <div className="bg-white/40 backdrop-blur-md rounded-xl border border-white/30 shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Our Future Mission</h2>
              <div className="prose max-w-none">
                <p className="text-gray-700 mb-4">
                  As we look towards the future, S & T Communication is committed to staying 
                  at the forefront of mobile communication technology. Our mission is to 
                  continue providing innovative solutions that meet the evolving needs of 
                  our customers.
                </p>
                <p className="text-gray-700 mb-4">
                  We are investing heavily in new technologies, including 5G services, 
                  smart home solutions, and advanced mobile repair techniques. Our goal 
                  is to expand our services to cover the entire island and become the 
                  leading mobile communication provider in Sri Lanka.
                </p>
                <p className="text-gray-700 mb-4">
                  We are also committed to environmental sustainability and are working 
                  towards implementing eco-friendly practices in our operations. This 
                  includes proper disposal of electronic waste and promoting sustainable 
                  mobile solutions.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/40 backdrop-blur-md rounded-xl border border-white/30 shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Technology Innovation</h3>
                <p className="text-gray-600 text-sm">
                  Investing in cutting-edge mobile technologies and 5G infrastructure 
                  to provide faster and more reliable services to our customers.
                </p>
              </div>
              <div className="bg-white/40 backdrop-blur-md rounded-xl border border-white/30 shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Environmental Responsibility</h3>
                <p className="text-gray-600 text-sm">
                  Committed to sustainable practices and proper electronic waste management 
                  to protect our environment for future generations.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
