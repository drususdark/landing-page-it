import { useState, useEffect } from 'react'
import { SiteContent, Service, ContactInfo } from '@/lib/supabase'
import { getSiteContent, getServices, getContactInfo } from '@/lib/database'

export function useSiteContent(section?: string) {
  const [content, setContent] = useState<SiteContent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchContent() {
      try {
        setLoading(true)
        const data = await getSiteContent(section)
        setContent(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error fetching content')
      } finally {
        setLoading(false)
      }
    }

    fetchContent()
  }, [section])

  return { content, loading, error, refetch: () => fetchContent() }
}

export function useServices(activeOnly: boolean = true) {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchServices() {
      try {
        setLoading(true)
        const data = await getServices(activeOnly)
        setServices(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error fetching services')
      } finally {
        setLoading(false)
      }
    }

    fetchServices()
  }, [activeOnly])

  return { services, loading, error, refetch: () => fetchServices() }
}

export function useContactInfo() {
  const [contactInfo, setContactInfo] = useState<ContactInfo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchContactInfo() {
      try {
        setLoading(true)
        const data = await getContactInfo()
        setContactInfo(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error fetching contact info')
      } finally {
        setLoading(false)
      }
    }

    fetchContactInfo()
  }, [])

  return { contactInfo, loading, error, refetch: () => fetchContactInfo() }
}

