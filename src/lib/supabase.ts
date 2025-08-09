import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables.'
  )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Type Definitions for Supabase Tables

export interface SiteContent {
  id: string
  section: string
  title: string
  content: string
  order_index: number
  is_visible: boolean // New column
  created_at: string
  updated_at: string
}

export interface Service {
  id: string
  title: string
  description: string
  icon: string
  order_index: number
  is_visible: boolean // New column
  created_at: string
  updated_at: string
}

export interface ContactInfo {
  id: string
  field_name: string
  field_value: string
  field_type: string
  is_visible: boolean // New column
  created_at: string
  updated_at: string
}

export interface SeoMetadata {
  id: string
  page_name: string
  meta_title: string | null
  meta_description: string | null
  meta_keywords: string | null
  og_image_url: string | null
  created_at: string
  updated_at: string
}

export interface AppSetting {
  id: string
  setting_name: string
  setting_value: boolean
  created_at: string
  updated_at: string
}

// For admin panel usage (using client-side env vars for now)
export const adminSupabase = createClient(
  supabaseUrl,
  supabaseAnonKey, // Use anon key for client-side operations
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  }
)



