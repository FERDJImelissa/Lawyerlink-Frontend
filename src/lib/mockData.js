export const MOCK_LAWYERS = [
  { id: 1, user_id: 'lawyer-1', name: 'Sarah Jenkins', speciality: 'Criminal Law', years_exp: 15, success_rate: '98%' },
  { id: 2, user_id: 'lawyer-2', name: 'Michael Ross', speciality: 'Corporate Law', years_exp: 8, success_rate: '95%' },
  { id: 3, user_id: 'lawyer-3', name: 'Elena Rodriguez', speciality: 'Family Law', years_exp: 12, success_rate: '92%' },
  { id: 4, user_id: 'lawyer-4', name: 'David Chen', speciality: 'Real Estate Law', years_exp: 10, success_rate: '96%' },
  { id: 5, user_id: 'lawyer-5', name: 'Jessica Pearson', speciality: 'Civil Litigation', years_exp: 20, success_rate: '99%' },
  { id: 6, user_id: 'lawyer-6', name: 'Harvey Specter', speciality: 'Corporate Law', years_exp: 15, success_rate: '100%' },
]

export const MOCK_REQUESTS = [
  {
    id: 101,
    client_id: 'client-1',
    lawyer_id: 'lawyer-1',
    description: 'I need help with a traffic violation case from last week.',
    status: 'pending',
    created_at: new Date().toISOString(),
    lawyerInfo: { name: 'Sarah Jenkins', speciality: 'Criminal Law' }
  },
  {
    id: 102,
    client_id: 'client-1',
    lawyer_id: 'lawyer-2',
    description: 'Contract review for a new tech startup venture.',
    status: 'accepted',
    rdv_date: new Date(Date.now() + 86400000).toISOString(),
    created_at: new Date(Date.now() - 86400000).toISOString(),
    lawyerInfo: { name: 'Michael Ross', speciality: 'Corporate Law' }
  }
]
