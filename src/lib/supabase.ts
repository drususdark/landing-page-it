import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// ✅ Singleton: solo una instancia en toda la app
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
})

// ❌ Eliminamos createSupabaseClient(), ya no hace falta

// ✅ Tipos para las tablas
export interface SiteContent {
  id: string
  section: string
  title: string
  content: string
  order_index: number
  created_at: string
  updated_at: string
}

export interface Service {
  id: string
  title: string
  description: string
  icon: string
  order_index: number
  active: boolean
  created_at: string
  updated_at: string
}

export interface ContactInfo {
  id: string
  field_name: string
  field_value: string
  field_type: 'text' | 'email' | 'phone' | 'url'
  created_at: string
  updated_at: string
}
