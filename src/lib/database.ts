import { supabase, SiteContent, Service, ContactInfo, SeoMetadata, AppSetting } from './supabase'

// Site Content operations
export async function getSiteContent(section?: string, includeHidden: boolean = false): Promise<SiteContent[]> {
  try {
    let query = supabase
      .from('site_content')
      .select('*')
      .order('order_index', { ascending: true })

    if (section) {
      query = query.eq('section', section)
    }

    if (!includeHidden) {
      query = query.eq('is_visible', true)
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
export async function getServices(includeHidden: boolean = false): Promise<Service[]> {
  try {
    let query = supabase
      .from('services')
      .select('*')
      .order('order_index', { ascending: true })

    if (!includeHidden) {
      query = query.eq('is_visible', true)
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

export async function reorderServices(orderedServiceIds: string[]): Promise<void> {
  const updates = orderedServiceIds.map((id, index) => ({
    id,
    order_index: index,
  }));

  const { error } = await supabase.from('services').upsert(updates);

  if (error) {
    console.error('Error reordering services:', error);
    throw error;
  }
}

// Contact Info operations
export async function getContactInfo(includeHidden: boolean = false): Promise<ContactInfo[]> {
  try {
    let query = supabase
      .from('contact_info')
      .select('*')
      .order('field_name', { ascending: true })

    if (!includeHidden) {
      query = query.eq('is_visible', true)
    }

    const { data, error } = await query

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

export async function getContactInfoByField(fieldName: string, includeHidden: boolean = false): Promise<ContactInfo | null> {
  let query = supabase
    .from('contact_info')
    .select('*')
    .eq('field_name', fieldName)

  if (!includeHidden) {
    query = query.eq('is_visible', true)
  }

  const { data, error } = await query.single()

  if (error) {
    console.error('Error fetching contact info by field:', error)
    return null
  }

  return data as ContactInfo
}

// SEO Metadata operations
export async function getSeoMetadata(pageName: string): Promise<SeoMetadata | null> {
  try {
    const { data, error } = await supabase
      .from('seo_metadata')
      .select('*')
      .eq('page_name', pageName)
      .maybeSingle() // Use maybeSingle instead of single to handle no results

    if (error) {
      console.error('Error fetching SEO metadata:', error)
      return null
    }

    return data as SeoMetadata | null
  } catch (err) {
    console.error('Unexpected error fetching SEO metadata:', err)
    return null
  }
}

export async function updateSeoMetadata(id: string, updates: Partial<SeoMetadata>): Promise<SeoMetadata> {
  const { data, error } = await supabase
    .from('seo_metadata')
    .update(updates)
    .eq('id', id)
    .select()

  if (error) {
    console.error('Error updating SEO metadata:', error)
    throw error
  }

  return data[0] as SeoMetadata
}

export async function createSeoMetadata(metadata: Omit<SeoMetadata, 'id' | 'created_at' | 'updated_at'>): Promise<SeoMetadata> {
  const { data, error } = await supabase
    .from('seo_metadata')
    .insert(metadata)
    .select()

  if (error) {
    console.error('Error creating SEO metadata:', error)
    throw error
  }

  return data[0] as SeoMetadata
}

// App Settings operations
export async function getAppSettings(): Promise<AppSetting[]> {
  try {
    const { data, error } = await supabase
      .from('app_settings')
      .select('*')

    if (error) {
      console.error('Error fetching app settings:', error)
      return []
    }

    return data as AppSetting[]
  } catch (err) {
    console.error('Unexpected error fetching app settings:', err)
    return []
  }
}

export async function updateAppSetting(id: string, updates: Partial<AppSetting>): Promise<AppSetting> {
  const { data, error } = await supabase
    .from('app_settings')
    .update(updates)
    .eq('id', id)
    .select()

  if (error) {
    console.error('Error updating app setting:', error)
    throw error
  }

  return data[0] as AppSetting
}

export async function getAppSettingByName(settingName: string): Promise<AppSetting | null> {
  const { data, error } = await supabase
    .from('app_settings')
    .select('*')
    .eq('setting_name', settingName)
    .single()

  if (error) {
    console.error('Error fetching app setting by name:', error)
    return null
  }

  return data as AppSetting
}


