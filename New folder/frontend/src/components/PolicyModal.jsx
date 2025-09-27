import { useState } from 'react'

export default function PolicyModal({ open, onAccept }) {
  const [accepted, setAccepted] = useState({ aup: false, privacy: false, security: false })
  if (!open) return null
  const all = accepted.aup && accepted.privacy && accepted.security
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded p-4 w-full max-w-lg space-y-3">
        <h2 className="text-lg font-semibold">Accept Required Policies</h2>
        <label className="flex items-center gap-2"><input type="checkbox" checked={accepted.aup} onChange={e=>setAccepted(v=>({...v, aup:e.target.checked}))}/> Acceptable Use Policy</label>
        <label className="flex items-center gap-2"><input type="checkbox" checked={accepted.privacy} onChange={e=>setAccepted(v=>({...v, privacy:e.target.checked}))}/> Privacy Policy</label>
        <label className="flex items-center gap-2"><input type="checkbox" checked={accepted.security} onChange={e=>setAccepted(v=>({...v, security:e.target.checked}))}/> Security Policy</label>
        <div className="flex justify-end">
          <button disabled={!all} onClick={()=>onAccept?.()} className={`px-4 py-2 rounded ${all ? 'bg-blue-600 text-white' : 'bg-gray-400 text-gray-200'}`}>Continue</button>
        </div>
      </div>
    </div>
  )
}


