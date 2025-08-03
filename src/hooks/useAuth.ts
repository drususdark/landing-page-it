import { useAuthContext } from '@/context/AuthContext'

export function useAuth() {
  const { user, session, loading } = useAuthContext()

  const isAuthenticated = !!user
  const isAdmin = user?.email === (process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'admin@example.com')

  return {
    user,
    session,
    loading,
    isAuthenticated,
    isAdmin
  }
}
