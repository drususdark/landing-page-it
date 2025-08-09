import { useState, useEffect, useCallback } from 'react'
import { SiteContent, Service, ContactInfo, SeoMetadata, AppSetting } from '@/lib/supabase'
import { getSiteContent, getServices, getContactInfo, getSeoMetadata, getAppSettings, getAppSettingByName } from '@/lib/database'

export function useSiteContent(section?: string, includeHidden: boolean = false) {
  const [content, setContent] = useState<SiteContent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchContent = useCallback(async () => {
    try {
      setLoading(true)
      const data = await getSiteContent(section, includeHidden)
      setContent(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching content')
    } finally {
      setLoading(false)
    }
  }, [section, includeHidden])

  useEffect(() => {
    fetchContent()
  }, [fetchContent])

  return { content, loading, error, refetch: fetchContent }
}

export function useServices(includeHidden: boolean = false) {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchServices = useCallback(async () => {
    try {
      setLoading(true)
      const data = await getServices(includeHidden)
      setServices(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching services')
    } finally {
      setLoading(false)
    }
  }, [includeHidden])

  useEffect(() => {
    fetchServices()
  }, [fetchServices])

  return { services, loading, error, refetch: fetchServices }
}

export function useContactInfo(includeHidden: boolean = false) {
  const [contactInfo, setContactInfo] = useState<ContactInfo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchContactInfo = useCallback(async () => {
    try {
      setLoading(true)
      const data = await getContactInfo(includeHidden)
      setContactInfo(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching contact info')
    } finally {
      setLoading(false)
    }
  }, [includeHidden])

  useEffect(() => {
    fetchContactInfo()
  }, [fetchContactInfo])

  return { contactInfo, loading, error, refetch: fetchContactInfo }
}

export function useSeoMetadata(pageName: string) {
  const [metadata, setMetadata] = useState<SeoMetadata | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchMetadata = useCallback(async () => {
    try {
      setLoading(true)
      const data = await getSeoMetadata(pageName)
      setMetadata(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching SEO metadata')
    } finally {
      setLoading(false)
    }
  }, [pageName])

  useEffect(() => {
    fetchMetadata()
  }, [fetchMetadata])

  return { metadata, loading, error, refetch: fetchMetadata }
}

export function useAppSettings(settingName?: string) {
  const [settings, setSettings] = useState<AppSetting[] | AppSetting | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchSettings = useCallback(async () => {
    try {
      setLoading(true)
      let data: AppSetting[] | AppSetting | null;
      if (settingName) {
        data = await getAppSettingByName(settingName);
      } else {
        data = await getAppSettings();
      }
      setSettings(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching app settings')
    } finally {
      setLoading(false)
    }
  }, [settingName])

  useEffect(() => {
    fetchSettings()
  }, [fetchSettings])

  return { settings, loading, error, refetch: fetchSettings }
}


