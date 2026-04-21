import { useState } from 'react'
import { FileText, ExternalLink, Check, X, Calendar, Clock, Loader } from 'lucide-react'
import StatusBadge from '../ui/StatusBadge'
import toast from 'react-hot-toast'
import { format } from 'date-fns'

export default function LawyerRequestCard({ request, onUpdate }) {
  const [loading, setLoading] = useState(null)
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [rdvDate, setRdvDate] = useState('')

  async function handleAction(action) {
    setLoading(action)
    
    setTimeout(() => {
      const saved = JSON.parse(localStorage.getItem('ll_mock_requests') || '[]')
      const updated = saved.map(r => {
        if (r.id === request.id) {
          return { ...r, status: action, rdv_date: action === 'accepted' ? rdvDate : null }
        }
        return r
      })

      localStorage.setItem('ll_mock_requests', JSON.stringify(updated))
      
      toast.success(`Request ${action}! (Updated in LocalStorage)`)
      setLoading(null)
      setShowDatePicker(false)
      onUpdate?.()
    }, 800)
  }

  const clientEmail = request.clientInfo?.email || 'client@demo.com'
  const clientName = clientEmail.split('@')[0]

  return (
    <div className="card p-5 animate-fade-in space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-slate-700 flex items-center justify-center text-white text-sm font-bold">
            {clientName.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900 capitalize">{clientName}</p>
            <p className="text-xs text-slate-400">{clientEmail}</p>
          </div>
        </div>
        <StatusBadge status={request.status} />
      </div>

      <div className="flex items-center gap-1.5 text-xs text-slate-400">
        <Clock size={11} />
        {format(new Date(request.created_at), 'MMM d, yyyy')}
      </div>

      <div className="bg-slate-50 rounded-xl p-4">
        <p className="text-sm text-slate-700 leading-relaxed">{request.description}</p>
      </div>

      {request.status === 'accepted' && request.rdv_date && (
        <div className="flex items-center gap-2 text-sm text-emerald-700 bg-emerald-50 px-4 py-2.5 rounded-xl border border-emerald-200">
          <Calendar size={14} />
          <span className="font-medium">Appointment: {format(new Date(request.rdv_date), 'MMM d, yyyy · h:mm a')}</span>
        </div>
      )}

      {request.status === 'pending' && (
        <div className="pt-1 space-y-3">
          <div className="flex gap-2">
            <button onClick={() => setShowDatePicker(true)} className="flex-1 btn-success justify-center">
              <Check size={14} /> Accept
            </button>
            <button onClick={() => handleAction('rejected')} className="flex-1 btn-danger justify-center">
              <X size={14} /> Reject
            </button>
          </div>

          {showDatePicker && (
            <div className="border border-slate-200 rounded-xl p-4 space-y-3 bg-slate-50">
              <input
                type="datetime-local"
                value={rdvDate}
                onChange={e => setRdvDate(e.target.value)}
                className="input-field text-sm"
              />
              <div className="flex gap-2">
                <button onClick={() => handleAction('accepted')} className="flex-1 btn-success justify-center text-xs">
                  Confirm & Accept
                </button>
                <button onClick={() => setShowDatePicker(false)} className="btn-secondary text-xs px-3">Cancel</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
