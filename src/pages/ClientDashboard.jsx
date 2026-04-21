import { useState, useEffect } from 'react'
import { Search, Scale, Users, FileText, Clock, CheckCircle, XCircle, Plus } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import Navbar from '../components/layout/Navbar'
import LawyerCard from '../components/client/LawyerCard'
import RequestModal from '../components/client/RequestModal'
import ClientRequestCard from '../components/client/ClientRequestCard'
import { LawyerCardSkeleton, RequestCardSkeleton } from '../components/ui/Skeletons'
import { MOCK_LAWYERS, MOCK_REQUESTS } from '../lib/mockData'

const TABS = [
  { id: 'lawyers', label: 'Find a Lawyer', icon: Users },
  { id: 'requests', label: 'My Requests', icon: FileText },
]

export default function ClientDashboard() {
  const { user } = useAuth()
  const [tab, setTab] = useState('lawyers')
  const [lawyers, setLawyers] = useState([])
  const [requests, setRequests] = useState([])
  const [loadingLawyers, setLoadingLawyers] = useState(true)
  const [loadingRequests, setLoadingRequests] = useState(true)
  const [selectedLawyer, setSelectedLawyer] = useState(null)
  const [search, setSearch] = useState('')
  const [filterSpeciality, setFilterSpeciality] = useState('All')

  useEffect(() => {
    // Simulate API fetch delay
    setTimeout(() => {
      setLawyers(MOCK_LAWYERS)
      setLoadingLawyers(false)
    }, 800)

    const savedRequests = localStorage.getItem('ll_mock_requests')
    if (savedRequests) {
      setRequests(JSON.parse(savedRequests))
      setLoadingRequests(false)
    } else {
      setTimeout(() => {
        setRequests(MOCK_REQUESTS)
        localStorage.setItem('ll_mock_requests', JSON.stringify(MOCK_REQUESTS))
        setLoadingRequests(false)
      }, 1000)
    }
  }, [])

  const specialities = ['All', ...new Set(MOCK_LAWYERS.map(l => l.speciality))]

  const filteredLawyers = lawyers.filter(l => {
    const matchSearch = l.name?.toLowerCase().includes(search.toLowerCase()) ||
      l.speciality?.toLowerCase().includes(search.toLowerCase())
    const matchSpec = filterSpeciality === 'All' || l.speciality === filterSpeciality
    return matchSearch && matchSpec
  })

  const stats = {
    total: requests.length,
    pending: requests.filter(r => r.status === 'pending').length,
    accepted: requests.filter(r => r.status === 'accepted').length,
    rejected: requests.filter(r => r.status === 'rejected').length,
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 page-enter">
          <h1 className="text-2xl font-bold text-slate-900">
            Welcome back, <span className="text-navy-800">{user?.email?.split('@')[0]}</span> 👋
          </h1>
          <p className="text-slate-500 mt-1">Standalone Frontend Demo — No Backend Required</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Requests', value: stats.total, icon: FileText, color: 'text-indigo-600 bg-indigo-50' },
            { label: 'Pending', value: stats.pending, icon: Clock, color: 'text-amber-600 bg-amber-50' },
            { label: 'Accepted', value: stats.accepted, icon: CheckCircle, color: 'text-emerald-600 bg-emerald-50' },
            { label: 'Rejected', value: stats.rejected, icon: XCircle, color: 'text-red-600 bg-red-50' },
          ].map(stat => (
            <div key={stat.label} className="card p-4 flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${stat.color}`}>
                <stat.icon size={18} />
              </div>
              <div>
                <p className="text-xl font-bold text-slate-900">{stat.value}</p>
                <p className="text-xs text-slate-500">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-1 bg-slate-200/60 p-1 rounded-xl w-fit mb-6">
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                tab === t.id ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <t.icon size={15} />
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'lawyers' && (
          <div className="space-y-6 page-enter">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search lawyers..."
                  className="input-field pl-10"
                />
              </div>
              <select
                value={filterSpeciality}
                onChange={e => setFilterSpeciality(e.target.value)}
                className="input-field sm:w-48 appearance-none"
              >
                {specialities.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>

            {loadingLawyers ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 3 }).map((_, i) => <LawyerCardSkeleton key={i} />)}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredLawyers.map(lawyer => (
                  <LawyerCard key={lawyer.id} lawyer={lawyer} onSelect={setSelectedLawyer} />
                ))}
              </div>
            )}
          </div>
        )}

        {tab === 'requests' && (
          <div className="space-y-4 page-enter">
            {loadingRequests ? (
              Array.from({ length: 2 }).map((_, i) => <RequestCardSkeleton key={i} />)
            ) : (
              requests.map(request => (
                <ClientRequestCard key={request.id} request={request} />
              ))
            )}
          </div>
        )}
      </main>

      {selectedLawyer && (
        <RequestModal
          lawyer={selectedLawyer}
          onClose={() => setSelectedLawyer(null)}
          onSuccess={() => { 
            const updated = JSON.parse(localStorage.getItem('ll_mock_requests'))
            setRequests(updated)
            setTab('requests') 
          }}
        />
      )}
    </div>
  )
}
