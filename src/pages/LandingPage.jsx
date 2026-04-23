import { Link } from 'react-router-dom'
import { Scale, ArrowRight, Shield, Clock, Zap, Star } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-navy-800 flex items-center justify-center shadow-lg">
            <Scale size={20} className="text-white" />
          </div>
          <span className="font-display font-bold text-navy-800 text-xl tracking-tight">Avocat-Link</span>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/login" className="text-sm font-semibold text-slate-600 hover:text-navy-800">Sign in</Link>
          <Link to="/register" className="btn-primary">Get Started</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
        <div className="text-center space-y-8 animate-slide-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider">
            <Star size={12} fill="currentColor" /> Premium Legal Network
          </div>
          <h1 className="text-5xl sm:text-7xl font-display font-bold text-navy-800 leading-[1.1] tracking-tight">
            Legal Expertise <br />
            <span className="text-slate-400">Simplified & On-Demand.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-slate-500 leading-relaxed">
            Connect with top-tier specialized lawyers in seconds. Avocat-Link brings the courtroom to your screen with a secure, cloud-powered extranet.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link to="/register" className="btn-primary px-8 py-4 text-base group">
              Find Your Lawyer <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link to="/login" className="btn-secondary px-8 py-4 text-base">View Dashboard</Link>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32">
          {[
            { icon: Shield, title: 'Secure & Confidential', desc: 'Enterprise-grade encryption for all your legal documents and evidence.' },
            { icon: Clock, title: 'Instant Consultations', desc: 'Book appointments and get legal advice without the weeks of waiting.' },
            { icon: Zap, title: 'Cloud Powered', desc: 'Built on Supabase & Vercel for maximum reliability and global speed.' },
          ].map((f, i) => (
            <div key={i} className="card p-8 hover:shadow-card-hover transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-navy-800 mb-6">
                <f.icon size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{f.title}</h3>
              <p className="text-slate-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-100 py-12 text-center text-slate-400 text-sm">
        <p>&copy; 2026 Avocat-Link. Projet de Fin de Module "Build & Ship".</p>
      </footer>
    </div>
  )
}
