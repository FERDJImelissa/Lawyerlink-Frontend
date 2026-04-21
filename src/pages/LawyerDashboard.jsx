import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import Navbar from '../components/layout/Navbar'
import LawyerRequestCard from '../components/lawyer/LawyerRequestCard'
import { RequestCardSkeleton } from '../components/ui/Skeletons'
import { Inbox, Clock, CheckCircle, XCircle, Scale, Filter } from 'lucide-react'
import { MOCK_REQUESTS } from '../lib/mockData'

const FILTERS = ['all', 'pending', 'accepted', 'rejected']

export default function LawyerDashboard() {
  const { profile } = useAuth()
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    const saved = localStorage.getItem('ll_mock_requests')
    const data = saved ? JSON.parse(saved) : MOCK_REQUESTS
    
    // In demo mode, show all requests for any lawyer
    setRequests(data)
    setLoading(false)
  }, [])

  const handleUpdate = () => {
    const saved = localStorage.getItem('ll_mock_requests')
    setRequests(JSON.parse(saved))
  }

  const stats = {
    total: requests.length,
    pending: requests.filter(r => r.status === 'pending').length,
    accepted: requests.filter(r => r.status === 'accepted').length,
    rejected: requests.filter(r => r.status === 'rejected').length,
  }

  const filtered = filter === 'all' ? requests : requests.filter(r => r.status === filter)

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-start justify-between mb-8 page-enter">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              {profile?.name || 'Lawyer'}'s Dashboard
            </h1>
            <p className="text-slate-500 mt-1">
              Frontend-only demonstration dashboard
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <div className="flex items-center gap-2 bg-navy-800 text-white px-4 py-2 rounded-xl text-sm font-medium">
              <Scale size={15} />
              {profile?.speciality || 'General Practice'}
            </div>
            {profile?.years_of_experience && (
              <div className="bg-white border-2 border-slate-200 text-slate-700 px-4 py-2 rounded-xl text-sm font-bold shadow-sm">
                {profile.years_of_experience} ans d'expérience
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total', value: stats.total, icon: Inbox, color: 'text-indigo-600 bg-indigo-50', id: 'all' },
            { label: 'Pending', value: stats.pending, icon: Clock, color: 'text-amber-600 bg-amber-50', id: 'pending' },
            { label: 'Accepted', value: stats.accepted, icon: CheckCircle, color: 'text-emerald-600 bg-emerald-50', id: 'accepted' },
            { label: 'Rejected', value: stats.rejected, icon: XCircle, color: 'text-red-600 bg-red-50', id: 'rejected' },
          ].map(stat => (
            <button
              key={stat.id}
              onClick={() => setFilter(stat.id)}
              className={`card p-4 flex items-center gap-3 text-left transition-all ${filter === stat.id ? 'ring-2 ring-navy-800' : ''}`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${stat.color}`}>
                <stat.icon size={18} />
              </div>
              <div>
                <p className="text-xl font-bold text-slate-900">{stat.value}</p>
                <p className="text-xs text-slate-500">{stat.label}</p>
              </div>
            </button>
          ))}
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Filter size={15} className="text-slate-400" />
            <div className="flex gap-1 bg-slate-200/60 p-1 rounded-xl">
              {FILTERS.map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${filter === f ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <RequestCardSkeleton />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filtered.map(request => (
                <LawyerRequestCard key={request.id} request={request} onUpdate={handleUpdate} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
