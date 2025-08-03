import { createClient } from '@supabase/supabase-js'
import { createBrowserClient } from '@supabase/ssr'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export function createSupabaseClient() {
  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}

// Types for database tables
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

