import { useState, useEffect } from 'react'
import { User } from '@supabase/supabase-js'
import { createSupabaseClient } from '@/lib/supabase'
import { getCurrentUser, isAdminEmail } from '@/lib/auth'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const supabase = createSupabaseClient()

    // Get initial session
    const getInitialSession = async () => {
      try {
        const currentUser = await getCurrentUser()
        setUser(currentUser)
        setIsAdmin(currentUser ? isAdminEmail(currentUser.email || '') : false)
      } catch (error) {
        console.error('Error getting initial session:', error)
        setUser(null)
        setIsAdmin(false)
      } finally {
        setLoading(false)
      }
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser(session.user)
          setIsAdmin(isAdminEmail(session.user.email || ''))
        } else {
          setUser(null)
          setIsAdmin(false)
        }
        setLoading(false)
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return {
    user,
    loading,
    isAdmin,
    isAuthenticated: !!user
  }
}

