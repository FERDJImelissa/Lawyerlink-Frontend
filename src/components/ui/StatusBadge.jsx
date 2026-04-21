import { Clock, CheckCircle, XCircle } from 'lucide-react'

export default function StatusBadge({ status }) {
  if (status === 'pending') return (
    <span className="badge-pending">
      <Clock size={11} />
      Pending
    </span>
  )
  if (status === 'accepted') return (
    <span className="badge-accepted">
      <CheckCircle size={11} />
      Accepted
    </span>
  )
  if (status === 'rejected') return (
    <span className="badge-rejected">
      <XCircle size={11} />
      Rejected
    </span>
  )
  return null
}
