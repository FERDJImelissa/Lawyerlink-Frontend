import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ClientDashboard from './pages/ClientDashboard'
import LawyerDashboard from './pages/LawyerDashboard'
import LoadingScreen from './components/ui/LoadingScreen'

function ProtectedRoute({ children, requiredRole }) {
  const { user, profile, loading } = useAuth()

  if (loading) return <LoadingScreen />
  
  // If not logged in, go to login
  if (!user) return <Navigate to="/login" replace />
  
  // If logged in but NO profile row, they need to finish registration
  if (!profile) return <Navigate to="/register" replace />

  // If wrong role, redirect to their correct dashboard
  if (requiredRole && profile.role !== requiredRole) {
    return <Navigate to={profile.role === 'lawyer' ? '/lawyer' : '/client'} replace />
  }

  return children
}

function PublicRoute({ children, allowLoggedInWithoutProfile }) {
  const { user, profile, loading } = useAuth()

  if (loading) return <LoadingScreen />
  
  if (user) {
    // If they have a profile, send them to their dashboard
    if (profile) {
      return <Navigate to={profile.role === 'lawyer' ? '/lawyer' : '/client'} replace />
    } 
    // If they DON'T have a profile, only allow them to see the Register/Complete Profile page
    if (!allowLoggedInWithoutProfile) {
      return <Navigate to="/register" replace />
    }
  }

  return children
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      
      <Route path="/login" element={
        <PublicRoute>
          <LoginPage />
        </PublicRoute>
      } />
      
      <Route path="/register" element={
        <PublicRoute allowLoggedInWithoutProfile={true}>
          <RegisterPage />
        </PublicRoute>
      } />
      
      <Route path="/client" element={
        <ProtectedRoute requiredRole="client">
          <ClientDashboard />
        </ProtectedRoute>
      } />
      
      <Route path="/lawyer" element={
        <ProtectedRoute requiredRole="lawyer">
          <LawyerDashboard />
        </ProtectedRoute>
      } />
      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
