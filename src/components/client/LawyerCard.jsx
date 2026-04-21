import { useState } from 'react'
import { Briefcase, Scale, ArrowRight, Star } from 'lucide-react'

const SPECIALTY_COLORS = {
  'Criminal Law': 'bg-red-50 text-red-700',
  'Family Law': 'bg-pink-50 text-pink-700',
  'Corporate Law': 'bg-blue-50 text-blue-700',
  'Real Estate Law': 'bg-emerald-50 text-emerald-700',
  'Immigration Law': 'bg-orange-50 text-orange-700',
  'Intellectual Property': 'bg-purple-50 text-purple-700',
  'Labor Law': 'bg-amber-50 text-amber-700',
  'Tax Law': 'bg-teal-50 text-teal-700',
  'Civil Litigation': 'bg-slate-100 text-slate-700',
  'General Practice': 'bg-indigo-50 text-indigo-700',
}

const AVATARS = ['⚖️', '🏛️', '📋', '🔏', '🗂️', '📜']

export default function LawyerCard({ lawyer, onSelect }) {
  const [hovered, setHovered] = useState(false)
  const initial = lawyer.name?.charAt(0)?.toUpperCase() || 'L'
  const colorClass = SPECIALTY_COLORS[lawyer.speciality] || 'bg-indigo-50 text-indigo-700'

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="card-hover p-6 flex flex-col gap-4 animate-fade-in"
    >
      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-navy-800 to-navy-700 flex items-center justify-center text-white font-bold text-xl shadow-sm flex-shrink-0">
          {initial}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-slate-900 truncate">{lawyer.name}</h3>
          <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full mt-1 ${colorClass}`}>
            <Briefcase size={10} />
            {lawyer.speciality}
          </span>
        </div>
        <div className="flex items-center gap-1 text-amber-400">
          <Star size={12} fill="currentColor" />
          <span className="text-xs font-medium text-slate-600">4.9</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-slate-50 rounded-xl p-3 text-center">
          <p className="text-lg font-bold text-navy-800">12+</p>
          <p className="text-xs text-slate-500">Years exp.</p>
        </div>
        <div className="bg-slate-50 rounded-xl p-3 text-center">
          <p className="text-lg font-bold text-navy-800">95%</p>
          <p className="text-xs text-slate-500">Success rate</p>
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={() => onSelect(lawyer)}
        className="w-full flex items-center justify-center gap-2 bg-navy-800 text-white py-2.5 rounded-xl text-sm font-semibold
                   hover:bg-navy-700 active:scale-[0.98] transition-all duration-150 shadow-sm group"
      >
        Request Consultation
        <ArrowRight size={15} className={`transition-transform duration-200 ${hovered ? 'translate-x-1' : ''}`} />
      </button>
    </div>
  )
}
