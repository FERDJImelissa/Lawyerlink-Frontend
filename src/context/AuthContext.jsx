import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext({})

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load simulated session from localStorage
    const savedUser = localStorage.getItem('ll_user')
    const savedProfile = localStorage.getItem('ll_profile')
    
    if (savedUser && savedProfile) {
      setUser(JSON.parse(savedUser))
      setProfile(JSON.parse(savedProfile))
    }
    setLoading(false)
  }, [])

  async function signUp({ email, role, name, speciality, lawyerSpecialId }) {
    const newUser = { id: `user-${Date.now()}`, email }
    const newProfile = { 
      id: newUser.id, 
      email, 
      role, 
      name: name || email.split('@')[0],
      speciality,
      lawyer_special_id: lawyerSpecialId
    }

    setUser(newUser)
    setProfile(newProfile)
    
    localStorage.setItem('ll_user', JSON.stringify(newUser))
    localStorage.setItem('ll_profile', JSON.stringify(newProfile))
    return { user: newUser }
  }

  async function signIn({ email, password }) {
    // In pure frontend mode, any login works!
    const role = email.includes('lawyer') ? 'lawyer' : 'client'
    const newUser = { id: `user-${Date.now()}`, email }
    const newProfile = { 
      id: newUser.id, 
      email, 
      role,
      name: email.split('@')[0],
      speciality: 'General Practice'
    }

    setUser(newUser)
    setProfile(newProfile)
    
    localStorage.setItem('ll_user', JSON.stringify(newUser))
    localStorage.setItem('ll_profile', JSON.stringify(newProfile))
    return { user: newUser }
  }

  async function signOut() {
    setUser(null)
    setProfile(null)
    localStorage.removeItem('ll_user')
    localStorage.removeItem('ll_profile')
  }

  return (
    <AuthContext.Provider value={{ user, profile, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
