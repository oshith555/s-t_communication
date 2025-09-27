import { useEffect } from 'react'

export default function Snackbar({ message, type = 'info', open, onClose }) {
  useEffect(() => {
    if (!open) return
    const t = setTimeout(() => onClose?.(), 3000)
    return () => clearTimeout(t)
  }, [open, onClose])

  if (!open) return null

  const color = type === 'error' ? 'bg-red-600' : type === 'success' ? 'bg-green-600' : 'bg-gray-800'

  return (
    <div className={`fixed bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 text-white rounded ${color}`}>
      {message}
    </div>
  )
}


