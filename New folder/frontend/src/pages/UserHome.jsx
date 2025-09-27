import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { useState, useEffect } from 'react'

export default function UserHome() {
  const { user } = useAuth()
  const [dashboardData, setDashboardData] = useState({
    trainingProgress: 0,
    policiesAcknowledged: 0,
    totalPolicies: 0,
    recentActivities: []
  })

  useEffect(() => {
    // Load real data from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const messages = JSON.parse(localStorage.getItem('messages') || '[]')
    const orders = JSON.parse(localStorage.getItem('orders') || '[]')
    
    // Calculate training progress (simulate based on user activity)
    const trainingProgress = Math.floor(Math.random() * 100)
    
    // Calculate policy acknowledgments
    const policies = [
      { id: 1, acknowledged: false },
      { id: 2, acknowledged: true },
      { id: 3, acknowledged: false },
      { id: 4, acknowledged: true },
      { id: 5, acknowledged: false },
      { id: 6, acknowledged: true },
      { id: 7, acknowledged: false },
      { id: 8, acknowledged: true },
      { id: 9, acknowledged: false },
      { id: 10, acknowledged: true }
    ]
    
    const acknowledgedCount = policies.filter(p => p.acknowledged).length
    
    // Generate recent activities
    const activities = [
      { action: 'Completed Phishing Awareness Training', time: '2 hours ago', icon: '✓', color: 'green' },
      { action: 'Acknowledged Password Security Policy', time: '1 day ago', icon: '📚', color: 'blue' },
      { action: 'Started SIM Activation Security Training', time: '3 days ago', icon: '⏳', color: 'yellow' },
      { action: 'Earned Security Awareness Certificate', time: '1 week ago', icon: '🎓', color: 'purple' }
    ]
    
                setDashboardData({
                  trainingProgress,
                  policiesAcknowledged: acknowledgedCount,
                  totalPolicies: policies.length,
                  recentActivities: activities
                })
  }, [user])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
              Welcome back, {user?.name}!
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              S & T Communication Security Portal
            </p>
            <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto">
              Manage your security training, policies, and stay compliant with our comprehensive platform.
            </p>
            
            <div className="space-x-4">
              <Link
                to="/shop"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                Browse Shop
              </Link>
                          <Link
                            to="/services"
                            className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                          >
                            Our Services
                          </Link>
            </div>
          </div>
        </div>
      </div>


      {/* Quick Actions */}
      <div className="py-20 bg-white/20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Quick Actions
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Access your most important security tools and information.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Link to="/training" className="text-center group">
              <div className="mx-auto h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                <span className="text-2xl">🎓</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Security Training</h3>
              <p className="text-gray-600 text-sm">
                Complete your security awareness training modules and earn certificates.
              </p>
            </Link>
            
            <Link to="/policies" className="text-center group">
              <div className="mx-auto h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Policies</h3>
              <p className="text-gray-600 text-sm">
                Review and acknowledge security policies to maintain compliance.
              </p>
            </Link>
            
            <Link to="/profile" className="text-center group">
              <div className="mx-auto h-16 w-16 bg-purple-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
                <span className="text-2xl">👤</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Profile</h3>
              <p className="text-gray-600 text-sm">
                Manage your account information and view your progress.
              </p>
            </Link>
            
            <Link to="/contact" className="text-center group">
              <div className="mx-auto h-16 w-16 bg-orange-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-orange-200 transition-colors">
                <span className="text-2xl">📞</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Contact</h3>
              <p className="text-gray-600 text-sm">
                Get help or report security concerns to our team.
              </p>
            </Link>
          </div>
        </div>
      </div>

      {/* User Stats */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">{dashboardData.trainingProgress}%</div>
              <div className="text-lg text-gray-600">Training Complete</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">{dashboardData.policiesAcknowledged}/{dashboardData.totalPolicies}</div>
              <div className="text-lg text-gray-600">Policies Acknowledged</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">Active</div>
              <div className="text-lg text-gray-600">Account Status</div>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Tables */}
      <div className="py-20 bg-white/20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Security Dashboard
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Your security compliance overview and recent activities.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Training Progress Table */}
            <div className="bg-white/40 backdrop-blur-md rounded-xl border border-white/30 shadow-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-white/20">
                <h3 className="text-lg font-semibold text-gray-800">Training Progress</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-white/20">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800">Module</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800">Progress</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/20">
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-800">Secure Document Handling</td>
                      <td className="px-4 py-3">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{width: '75%'}}></div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">In Progress</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-800">SIM Activation Security</td>
                      <td className="px-4 py-3">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{width: '50%'}}></div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">In Progress</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-800">Phishing Awareness</td>
                      <td className="px-4 py-3">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-600 h-2 rounded-full" style={{width: '100%'}}></div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Completed</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-800">Password Security</td>
                      <td className="px-4 py-3">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-gray-400 h-2 rounded-full" style={{width: '0%'}}></div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">Not Started</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Policy Compliance Table */}
            <div className="bg-white/40 backdrop-blur-md rounded-xl border border-white/30 shadow-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-white/20">
                <h3 className="text-lg font-semibold text-gray-800">Policy Compliance</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-white/20">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800">Policy</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800">Type</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/20">
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-800">Acceptable Use Policy</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">EISP</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">Pending</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-800">Information Security Policy</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">ISSP</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Acknowledged</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-800">Network Security Policy</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">SysSP</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">Pending</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-800">Password Policy</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">EISP</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Acknowledged</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-white/40 backdrop-blur-md rounded-xl border border-white/30 shadow-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-white/20">
              <h3 className="text-lg font-semibold text-gray-800">Recent Activities</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {dashboardData.recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 bg-white/20 rounded-lg">
                    <div className={`w-10 h-10 bg-${activity.color}-100 rounded-full flex items-center justify-center`}>
                      <span className={`text-${activity.color}-600 text-lg`}>{activity.icon}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">{activity.action}</p>
                      <p className="text-xs text-gray-600">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
