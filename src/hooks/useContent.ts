import { useState, useEffect, useCallback } from 'react'
import { SiteContent, Service, ContactInfo } from '@/lib/supabase'
import { getSiteContent, getServices, getContactInfo } from '@/lib/database'

export function useSiteContent(section?: string) {
  const [content, setContent] = useState<SiteContent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // fetchContent definido con useCallback para evitar recreaciones innecesarias
  const fetchContent = useCallback(async () => {
    try {
      setLoading(true)
      const data = await getSiteContent(section)
      setContent(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching content')
    } finally {
      setLoading(false)
    }
  }, [section])

  useEffect(() => {
    fetchContent()
  }, [fetchContent])

  return { content, loading, error, refetch: fetchContent }
}

export function useServices(activeOnly: boolean = true) {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchServices = useCallback(async () => {
    try {
      setLoading(true)
      const data = await getServices(activeOnly)
      setServices(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching services')
    } finally {
      setLoading(false)
    }
  }, [activeOnly])

  useEffect(() => {
    fetchServices()
  }, [fetchServices])

  return { services, loading, error, refetch: fetchServices }
}

export function useContactInfo() {
  const [contactInfo, setContactInfo] = useState<ContactInfo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchContactInfo = useCallback(async () => {
    try {
      setLoading(true)
      const data = await getContactInfo()
      setContactInfo(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching contact info')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchContactInfo()
  }, [fetchContactInfo])

  return { contactInfo, loading, error, refetch: fetchContactInfo }
}
