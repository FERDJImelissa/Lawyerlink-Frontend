import { FileText, Calendar, ExternalLink } from 'lucide-react'
import StatusBadge from '../ui/StatusBadge'
import { format } from 'date-fns'

export default function ClientRequestCard({ request }) {
  return (
    <div className="card p-5 animate-fade-in space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-slate-900 truncate">
            Request to {request.lawyerInfo?.name || 'Lawyer'}
          </p>
          <p className="text-xs text-slate-400 mt-0.5">
            {format(new Date(request.created_at), 'MMM d, yyyy · h:mm a')}
          </p>
        </div>
        <StatusBadge status={request.status} />
      </div>

      <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">{request.description}</p>

      <div className="flex items-center gap-3 flex-wrap">
        {request.file_url && (
          <a
            href={request.file_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-indigo-600 hover:text-indigo-700 font-medium bg-indigo-50 px-3 py-1.5 rounded-lg transition-colors"
          >
            <FileText size={12} />
            View Document
            <ExternalLink size={11} />
          </a>
        )}

        {request.status === 'accepted' && request.rdv_date && (
          <div className="inline-flex items-center gap-1.5 text-xs text-emerald-700 font-medium bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
            <Calendar size={12} />
            Appointment: {format(new Date(request.rdv_date), 'MMM d, yyyy · h:mm a')}
          </div>
        )}
      </div>

      {request.status === 'accepted' && !request.rdv_date && (
        <div className="text-xs text-amber-600 bg-amber-50 px-3 py-2 rounded-lg border border-amber-100">
          ⏳ Awaiting appointment date from lawyer
        </div>
      )}
    </div>
  )
}
