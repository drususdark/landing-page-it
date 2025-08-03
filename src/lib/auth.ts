import { supabase } from './supabase'

export async function signInWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) {
    throw error
  }

  return data
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  
  if (error) {
    throw error
  }
}

export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error) {
    throw error
  }
  
  return user
}

export async function getSession() {
  const { data: { session }, error } = await supabase.auth.getSession()
  
  if (error) {
    throw error
  }
  
  return session
}

// Simple admin check
export function isAdminEmail(email: string): boolean {
  // Buscar en NEXT_PUBLIC_ADMIN_EMAIL (cliente) o ADMIN_EMAIL (servidor)
  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL || process.env.ADMIN_EMAIL || 'admin@example.com'
  console.log('Comparando:', email, 'con adminEmail:', adminEmail)
  return email === adminEmail
}


