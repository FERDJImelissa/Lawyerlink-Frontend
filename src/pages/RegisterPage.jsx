import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, Lock, Scale, Eye, EyeOff, User, Briefcase, ArrowRight, Hash } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

const SPECIALITIES = [
  'Criminal Law', 'Family Law', 'Corporate Law', 'Real Estate Law',
  'Immigration Law', 'Intellectual Property', 'Labor Law', 'Tax Law',
  'Civil Litigation', 'General Practice',
]

export default function RegisterPage() {
  const { user, signUp } = useAuth()
  const [role, setRole] = useState('client')
  const [form, setForm] = useState({
    email: '', password: '', name: '',
    lawyerSpecialId: '', speciality: 'General Practice',
  })
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)

  function set(field) {
    return e => setForm(p => ({ ...p, [field]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    
    // Case: User is already logged in but completing profile
    if (user) {
        if (role === 'lawyer' && !form.lawyerSpecialId) return toast.error('Lawyer ID is required')
        if (role === 'lawyer' && !form.name) return toast.error('Full name is required')
        
        setLoading(true)
        setTimeout(() => {
            const newProfile = { 
                id: user.id, 
                email: user.email, 
                role, 
                name: form.name || user.email.split('@')[0],
                speciality: form.speciality,
                lawyer_special_id: form.lawyerSpecialId 
            }
            localStorage.setItem('ll_profile', JSON.stringify(newProfile))
            window.location.reload() // Refresh to update context
            setLoading(false)
        }, 1000)
        return
    }

    // New signup
    if (!form.email || !form.password) return toast.error('Email and password are required')
    if (form.password.length < 6) return toast.error('Password must be at least 6 characters')
    if (role === 'lawyer' && !form.lawyerSpecialId) return toast.error('Lawyer ID is required')
    if (role === 'lawyer' && !form.name) return toast.error('Full name is required')

    setLoading(true)
    try {
      await signUp({ ...form, role })
      toast.success('Account created! Sign-in successful.')
    } catch (err) {
      toast.error(err.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-md relative animate-slide-up">
        <div className="card p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-11 h-11 rounded-2xl bg-navy-800 flex items-center justify-center shadow-lg">
              <Scale size={20} className="text-white" />
            </div>
            <div>
              <h1 className="font-display font-bold text-navy-800 text-xl tracking-tight">LawyerLink</h1>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mb-1">
            {user ? 'Finish Setup' : 'Create account'}
          </h2>
          <p className="text-slate-500 text-sm mb-6">
            {user ? 'Please select your role to continue' : 'Join the platform connecting clients & lawyers'}
          </p>

          <div className="grid grid-cols-2 gap-3 mb-6">
            <button type="button" onClick={() => setRole('client')} className={`p-4 rounded-xl border-2 transition-all ${role === 'client' ? 'border-navy-800 bg-navy-800/5' : 'border-slate-200'}`}>
              <User className={`mx-auto mb-1 ${role === 'client' ? 'text-navy-800' : 'text-slate-400'}`} />
              <p className="text-xs font-bold text-center">Client</p>
            </button>
            <button type="button" onClick={() => setRole('lawyer')} className={`p-4 rounded-xl border-2 transition-all ${role === 'lawyer' ? 'border-navy-800 bg-navy-800/5' : 'border-slate-200'}`}>
              <Briefcase className={`mx-auto mb-1 ${role === 'lawyer' ? 'text-navy-800' : 'text-slate-400'}`} />
              <p className="text-xs font-bold text-center">Lawyer</p>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {role === 'lawyer' && (
              <>
                <input type="text" value={form.name} onChange={set('name')} placeholder="Full Name" className="input-field" />
                <select value={form.speciality} onChange={set('speciality')} className="input-field">
                  {SPECIALITIES.map(s => <option key={s}>{s}</option>)}
                </select>
                <input type="text" value={form.lawyerSpecialId} onChange={set('lawyerSpecialId')} placeholder="Lawyer ID" className="input-field" />
              </>
            )}

            {!user && (
              <>
                <input type="email" value={form.email} onChange={set('email')} placeholder="Email" className="input-field" />
                <input type={showPw ? 'text' : 'password'} value={form.password} onChange={set('password')} placeholder="Password" className="input-field" />
              </>
            )}

            <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3">
              {loading ? 'Processing...' : user ? 'Complete Setup' : 'Create Account'}
            </button>
          </form>

          {!user && (
            <p className="mt-6 text-center text-sm text-slate-500">
              Already have an account? <Link to="/login" className="text-navy-800 font-bold">Sign in</Link>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
