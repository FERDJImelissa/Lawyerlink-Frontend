import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Bell, LogOut, Scale, User, ChevronDown, CheckCircle } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { formatDistanceToNow } from 'date-fns'

export default function Navbar() {
  const { user, profile, signOut } = useAuth()
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Welcome to LawyerLink! This is a frontend demo.', created_at: new Date().toISOString(), read: false }
  ])
  const [notifOpen, setNotifOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const notifRef = useRef(null)
  const userRef = useRef(null)

  const unreadCount = notifications.filter(n => !n.read).length

  useEffect(() => {
    function handleClick(e) {
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false)
      if (userRef.current && !userRef.current.contains(e.target)) setUserMenuOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  function markAllRead() {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-navy-800 flex items-center justify-center shadow-sm group-hover:bg-navy-700 transition-colors">
              <Scale size={18} className="text-white" />
            </div>
            <span className="font-display font-bold text-navy-800 text-lg tracking-tight">LawyerLink</span>
          </Link>

          <div className="flex items-center gap-2">
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => { setNotifOpen(!notifOpen); setUserMenuOpen(false) }}
                className="relative p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-all"
              >
                <Bell size={18} />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {notifOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-modal border border-slate-100 overflow-hidden animate-slide-up">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
                    <span className="font-semibold text-sm text-slate-900">Notifications</span>
                    {unreadCount > 0 && (
                      <button onClick={markAllRead} className="text-xs text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1">
                        <CheckCircle size={12} /> Mark all read
                      </button>
                    )}
                  </div>
                  <div className="max-h-72 overflow-y-auto">
                    {notifications.map(n => (
                      <div key={n.id} className={`px-4 py-3 border-b border-slate-50 last:border-0 ${!n.read ? 'bg-indigo-50/50' : ''}`}>
                        <p className="text-sm text-slate-700 leading-relaxed">{n.message}</p>
                        <p className="text-xs text-slate-400 mt-1">
                          {formatDistanceToNow(new Date(n.created_at), { addSuffix: true })}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="relative" ref={userRef}>
              <button
                onClick={() => { setUserMenuOpen(!userMenuOpen); setNotifOpen(false) }}
                className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl hover:bg-slate-100 transition-all"
              >
                <div className="w-7 h-7 rounded-lg bg-navy-800 flex items-center justify-center">
                  <User size={14} className="text-white" />
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-xs font-medium text-slate-900 leading-tight">{user?.email?.split('@')[0]}</p>
                  <p className="text-[10px] text-slate-400 capitalize">{profile?.role}</p>
                </div>
                <ChevronDown size={14} className="text-slate-400" />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-modal border border-slate-100 overflow-hidden animate-slide-up">
                  <button
                    onClick={signOut}
                    className="w-full flex items-center gap-2.5 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut size={14} />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
