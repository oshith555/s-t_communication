import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import PolicyModal from '../components/PolicyModal.jsx'

const policies = [
  {
    id: 1,
    title: "Acceptable Use Policy for IT Resources",
    type: "EISP",
    date: "2024-01-15",
    description: "Defines acceptable use of company IT resources, internet access, email systems, and communication platforms. Covers personal use guidelines, prohibited activities, and consequences for violations.",
    acknowledged: false,
    acknowledgedAt: null
  },
  {
    id: 2,
    title: "Information Security Management Policy",
    type: "ISSP",
    date: "2024-01-20",
    description: "Comprehensive policy covering data protection, access controls, encryption standards, and security procedures for handling sensitive information across all departments.",
    acknowledged: true,
    acknowledgedAt: "2024-01-25",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop"
  },
  {
    id: 3,
    title: "Network and System Security Policy",
    type: "SysSP",
    date: "2024-02-01",
    description: "Guidelines for system administration, network security, infrastructure protection, firewall management, and secure configuration of IT systems.",
    acknowledged: false,
    acknowledgedAt: null
  },
  {
    id: 4,
    title: "Data Classification and Handling Policy",
    type: "ISSP",
    date: "2024-02-10",
    description: "Framework for classifying data based on sensitivity levels (Public, Internal, Confidential, Restricted) and implementing appropriate protection measures for each classification.",
    acknowledged: true,
    acknowledgedAt: "2024-02-15"
  },
  {
    id: 5,
    title: "Incident Response and Reporting Policy",
    type: "EISP",
    date: "2024-02-20",
    description: "Procedures for reporting, responding to, and recovering from security incidents, data breaches, and policy violations. Includes escalation procedures and communication protocols.",
    acknowledged: false,
    acknowledgedAt: null
  },
  {
    id: 6,
    title: "SIM Card Security and Mobile Device Policy",
    type: "SysSP",
    date: "2024-03-01",
    description: "Security protocols for SIM card activation, mobile device management, BYOD policies, and protection against SIM swapping attacks and unauthorized access.",
    acknowledged: true,
    acknowledgedAt: "2024-03-05"
  },
  {
    id: 7,
    title: "Secure Document Handling Policy",
    type: "ISSP",
    date: "2024-03-10",
    description: "Guidelines for secure printing, scanning, document storage, and disposal. Covers encryption requirements, access controls, and secure workflows for sensitive documents.",
    acknowledged: false,
    acknowledgedAt: null
  },
  {
    id: 8,
    title: "Password and Authentication Policy",
    type: "EISP",
    date: "2024-03-15",
    description: "Standards for password creation, management, multi-factor authentication implementation, and secure access credential practices across all systems and applications.",
    acknowledged: true,
    acknowledgedAt: "2024-03-20",
    image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=300&fit=crop"
  },
  {
    id: 9,
    title: "Email Security and Communication Policy",
    type: "EISP",
    date: "2024-03-25",
    description: "Guidelines for secure email usage, phishing prevention, attachment handling, and communication protocols for sensitive information transmission.",
    acknowledged: false,
    acknowledgedAt: null
  },
  {
    id: 10,
    title: "Remote Work and Telecommuting Security Policy",
    type: "ISSP",
    date: "2024-04-01",
    description: "Security requirements for remote work environments, VPN usage, home network security, and protection of company data when working outside the office.",
    acknowledged: true,
    acknowledgedAt: "2024-04-05"
  }
]

export default function Policies() {
  const { user } = useAuth()
  const [showPolicyModal, setShowPolicyModal] = useState(false)
  const [selectedPolicy, setSelectedPolicy] = useState(null)
  const [acknowledgmentHistory, setAcknowledgmentHistory] = useState([])

  useEffect(() => {
    // Load acknowledgment history for the current user
    const history = policies
      .filter(policy => policy.acknowledged)
      .map(policy => ({
        policyId: policy.id,
        policyTitle: policy.title,
        acknowledgedAt: policy.acknowledgedAt,
        user: user?.name || 'Current User'
      }))
    setAcknowledgmentHistory(history)
  }, [user])

  const handleAcknowledge = (policyId) => {
    // Update policy acknowledgment status
    const policyIndex = policies.findIndex(p => p.id === policyId)
    if (policyIndex !== -1) {
      policies[policyIndex].acknowledged = true
      policies[policyIndex].acknowledgedAt = new Date().toISOString().split('T')[0]
      
      // Update acknowledgment history
      const newHistory = {
        policyId,
        policyTitle: policies[policyIndex].title,
        acknowledgedAt: policies[policyIndex].acknowledgedAt,
        user: user?.name || 'Current User'
      }
      setAcknowledgmentHistory(prev => [...prev, newHistory])
    }
  }

  const handleViewPolicy = (policy) => {
    setSelectedPolicy(policy)
  }

  const handleDownloadPolicy = (policy) => {
    // Simulate PDF download
    const element = document.createElement('a')
    element.href = '#'
    element.download = `${policy.title}.pdf`
    element.click()
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Security Policies</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Review and acknowledge all security policies to ensure compliance with organizational standards.
          </p>
        </div>

        {/* Policy Modal */}
        <PolicyModal 
          open={showPolicyModal} 
          onAccept={() => setShowPolicyModal(false)} 
        />

        {/* Policies Table */}
        <div className="bg-white/40 backdrop-blur-md rounded-xl border border-white/30 shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/20">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Title</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Type</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/20">
                {policies.map((policy) => (
                  <tr key={policy.id} className="hover:bg-white/10 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-800">{policy.title}</div>
                        <div className="text-sm text-gray-600">{policy.description}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        policy.type === 'EISP' ? 'bg-blue-100 text-blue-800' :
                        policy.type === 'ISSP' ? 'bg-green-100 text-green-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {policy.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{policy.date}</td>
                    <td className="px-6 py-4">
                      {policy.acknowledged ? (
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                          ✓ Acknowledged
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                          ⏳ Pending
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleViewPolicy(policy)}
                          className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleDownloadPolicy(policy)}
                          className="px-3 py-1 bg-gray-600 text-white text-xs rounded hover:bg-gray-700 transition-colors"
                        >
                          Download
                        </button>
                        {!policy.acknowledged && (
                          <button
                            onClick={() => handleAcknowledge(policy.id)}
                            className="px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 transition-colors"
                          >
                            Acknowledge
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Acknowledgment History */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Acknowledgment History</h2>
          <div className="bg-white/40 backdrop-blur-md rounded-xl border border-white/30 shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/20">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Policy</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Acknowledged By</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/20">
                  {acknowledgmentHistory.map((record, index) => (
                    <tr key={index} className="hover:bg-white/10 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-gray-800">{record.policyTitle}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{record.user}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{record.acknowledgedAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Policy Detail Modal */}
        {selectedPolicy && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedPolicy.title}</h2>
                    <div className="flex items-center space-x-4 mb-4">
                      <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                        selectedPolicy.type === 'EISP' ? 'bg-blue-100 text-blue-800' :
                        selectedPolicy.type === 'ISSP' ? 'bg-green-100 text-green-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {selectedPolicy.type}
                      </span>
                      <span className="text-sm text-gray-600">Date: {selectedPolicy.date}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedPolicy(null)}
                    className="text-gray-400 hover:text-gray-600 text-2xl"
                  >
                    ×
                  </button>
                </div>
                
                <div className="prose max-w-none">
                  <p className="text-gray-700 mb-6">{selectedPolicy.description}</p>
                  
                  {selectedPolicy.image && (
                    <div className="mb-6">
                      <img
                        src={selectedPolicy.image}
                        alt={selectedPolicy.title}
                        className="w-full h-64 object-cover rounded-lg shadow-lg"
                      />
                    </div>
                  )}
                  
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4">Policy Content</h3>
                    <div className="space-y-4 text-sm text-gray-700">
                      <p>This policy outlines the standards and procedures for maintaining security and compliance within our organization. All employees are required to read, understand, and acknowledge this policy.</p>
                      
                      <h4 className="font-semibold">Key Requirements:</h4>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>Follow all security protocols and procedures</li>
                        <li>Report any security incidents immediately</li>
                        <li>Maintain confidentiality of sensitive information</li>
                        <li>Use company resources responsibly and ethically</li>
                        <li>Participate in required security training programs</li>
                      </ul>
                      
                      <h4 className="font-semibold">Compliance:</h4>
                      <p>Failure to comply with this policy may result in disciplinary action, up to and including termination of employment.</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-4 mt-6">
                  <button
                    onClick={() => handleDownloadPolicy(selectedPolicy)}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Download PDF
                  </button>
                  {!selectedPolicy.acknowledged && (
                    <button
                      onClick={() => {
                        handleAcknowledge(selectedPolicy.id)
                        setSelectedPolicy(null)
                      }}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Acknowledge Policy
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
