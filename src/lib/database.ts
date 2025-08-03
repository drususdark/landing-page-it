import { supabase, SiteContent, Service, ContactInfo } from './supabase'

// Site Content operations
export async function getSiteContent(section?: string): Promise<SiteContent[]> {
  try {
    let query = supabase
      .from('site_content')
      .select('*')
      .order('order_index', { ascending: true })

    if (section) {
      query = query.eq('section', section)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching site content:', error)
      return []
    }

    return data as SiteContent[]
  } catch (err) {
    console.error('Unexpected error fetching site content:', err)
    return []
  }
}

export async function updateSiteContent(id: string, updates: Partial<SiteContent>): Promise<SiteContent> {
  const { data, error } = await supabase
    .from('site_content')
    .update(updates)
    .eq('id', id)
    .select()

  if (error) {
    console.error('Error updating site content:', error)
    throw error
  }

  return data[0] as SiteContent
}

export async function createSiteContent(content: Omit<SiteContent, 'id' | 'created_at' | 'updated_at'>): Promise<SiteContent> {
  const { data, error } = await supabase
    .from('site_content')
    .insert(content)
    .select()

  if (error) {
    console.error('Error creating site content:', error)
    throw error
  }

  return data[0] as SiteContent
}

// Services operations
export async function getServices(activeOnly: boolean = true): Promise<Service[]> {
  try {
    let query = supabase
      .from('services')
      .select('*')
      .order('order_index', { ascending: true })

    if (activeOnly) {
      query = query.eq('active', true)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching services:', error)
      return []
    }

    return data as Service[]
  } catch (err) {
    console.error('Unexpected error fetching services:', err)
    return []
  }
}

export async function updateService(id: string, updates: Partial<Service>): Promise<Service> {
  const { data, error } = await supabase
    .from('services')
    .update(updates)
    .eq('id', id)
    .select()

  if (error) {
    console.error('Error updating service:', error)
    throw error
  }

  return data[0] as Service
}

export async function createService(service: Omit<Service, 'id' | 'created_at' | 'updated_at'>): Promise<Service> {
  const { data, error } = await supabase
    .from('services')
    .insert(service)
    .select()

  if (error) {
    console.error('Error creating service:', error)
    throw error
  }

  return data[0] as Service
}

export async function deleteService(id: string): Promise<void> {
  const { error } = await supabase
    .from('services')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting service:', error)
    throw error
  }
}

// Contact Info operations
export async function getContactInfo(): Promise<ContactInfo[]> {
  try {
    const { data, error } = await supabase
      .from('contact_info')
      .select('*')
      .order('field_name', { ascending: true })

    if (error) {
      console.error('Error fetching contact info:', error)
      return []
    }

    return data as ContactInfo[]
  } catch (err) {
    console.error('Unexpected error fetching contact info:', err)
    return []
  }
}

export async function updateContactInfo(id: string, updates: Partial<ContactInfo>): Promise<ContactInfo> {
  const { data, error } = await supabase
    .from('contact_info')
    .update(updates)
    .eq('id', id)
    .select()

  if (error) {
    console.error('Error updating contact info:', error)
    throw error
  }

  return data[0] as ContactInfo
}

export async function getContactInfoByField(fieldName: string): Promise<ContactInfo | null> {
  const { data, error } = await supabase
    .from('contact_info')
    .select('*')
    .eq('field_name', fieldName)
    .single()

  if (error) {
    console.error('Error fetching contact info by field:', error)
    return null
  }

  return data as ContactInfo
}
