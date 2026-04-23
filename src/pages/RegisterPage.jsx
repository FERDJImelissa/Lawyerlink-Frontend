import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Scale, User, Briefcase } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'
import supabase from '../lib/supabase'

const SPECIALITIES = [
  'Criminal Law', 'Family Law', 'Corporate Law', 'Real Estate Law',
  'Immigration Law', 'Intellectual Property', 'Labor Law', 'Tax Law',
  'Civil Litigation', 'General Practice',
]

export default function RegisterPage() {
  const { user, signUp } = useAuth()
  const navigate = useNavigate()
  const [role, setRole] = useState('client')
  const [form, setForm] = useState({
    email: '', password: '', name: '',
    specialty: 'General Practice',
    experience_years: '',
  })
  const [loading, setLoading] = useState(false)

  function set(field) {
    return e => setForm(p => ({ ...p, [field]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    
    // Case: User is already logged in but completing profile
    if (user) {
        if (role === 'lawyer' && !form.name) return toast.error('Full name is required')
        
        setLoading(true)
        try {
          const profileData = { 
            id: user.id, 
            role, 
            full_name: form.name || user.email.split('@')[0],
          }
          
          const { error } = await supabase
            .from('profiles')
            .upsert([profileData])

          if (error) throw error

          if (role === 'lawyer') {
            const { error: lawyerError } = await supabase
              .from('lawyers')
              .insert([{
                id: user.id, // Linking lawyer record to profile id
                name: form.name,
                specialty: form.specialty,
                experience_years: parseInt(form.experience_years) || 0
              }])
            if (lawyerError) throw lawyerError
          }

          toast.success('Profile completed!')
          navigate(role === 'lawyer' ? '/lawyer' : '/client')
          window.location.reload()
        } catch (err) {
          toast.error(err.message)
        } finally {
          setLoading(false)
        }
        return
    }

    // New signup
    if (!form.email || !form.password) return toast.error('Email and password are required')
    if (form.password.length < 6) return toast.error('Password must be at least 6 characters')

    setLoading(true)
    try {
      await signUp({ 
        email: form.email, 
        password: form.password, 
        full_name: form.name || form.email.split('@')[0],
        role 
      })
      
      if (role === 'lawyer') {
        // We might need to wait for user to be confirmed if email confirmation is on
        // But assuming it's off or we use the data returned
      }

      toast.success('Account created!')
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
              <h1 className="font-display font-bold text-navy-800 text-xl tracking-tight">Avocat-Link</h1>
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
            <input type="text" value={form.name} onChange={set('name')} placeholder="Full Name" className="input-field" required />
            
            {role === 'lawyer' && (
              <div className="grid grid-cols-2 gap-3">
                <select value={form.specialty} onChange={set('specialty')} className="input-field">
                  {SPECIALITIES.map(s => <option key={s}>{s}</option>)}
                </select>
                <input type="number" min="0" value={form.experience_years} onChange={set('experience_years')} placeholder="Years Exp." className="input-field" required />
              </div>
            )}

            {!user && (
              <>
                <input type="email" value={form.email} onChange={set('email')} placeholder="Email" className="input-field" required />
                <input type="password" value={form.password} onChange={set('password')} placeholder="Password" className="input-field" required />
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
