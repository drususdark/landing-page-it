'use client'

import React, { useState } from 'react'
import { Eye, EyeOff, Save } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useSiteContent } from '@/hooks/useContent'
import { updateSiteContent } from '@/lib/database'

export function SectionVisibilityEditor() {
  const { content, loading, refetch } = useSiteContent(undefined, true) // Include hidden content
  const [saving, setSaving] = useState<string | null>(null)

  const sections = [
    { key: 'hero', name: 'Sección Hero (Inicio)' },
    { key: 'about', name: 'Sección Sobre Mí' },
    { key: 'services', name: 'Sección Servicios' },
    { key: 'contact', name: 'Sección Contacto' }
  ]

  const getSectionVisibility = (sectionKey: string) => {
    const sectionContent = content.filter(item => item.section === sectionKey)
    if (sectionContent.length === 0) return true
    return sectionContent.every(item => item.is_visible)
  }

  const handleToggleSection = async (sectionKey: string) => {
    setSaving(sectionKey)
    try {
      const sectionContent = content.filter(item => item.section === sectionKey)
      const newVisibility = !getSectionVisibility(sectionKey)
      
      // Update all content items for this section
      await Promise.all(
        sectionContent.map(item => 
          updateSiteContent(item.id, { is_visible: newVisibility })
        )
      )
      
      await refetch()
    } catch (error) {
      console.error('Error updating section visibility:', error)
    } finally {
      setSaving(null)
    }
  }

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Control de Visibilidad de Secciones</h3>
        <div className="animate-pulse space-y-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              <div className="h-8 bg-gray-200 rounded w-16"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Control de Visibilidad de Secciones</h3>
      
      <div className="space-y-4">
        {sections.map(section => {
          const isVisible = getSectionVisibility(section.key)
          const isSaving = saving === section.key
          
          return (
            <div key={section.key} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-3">
                {isVisible ? (
                  <Eye className="h-5 w-5 text-green-600" />
                ) : (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                )}
                <div>
                  <h4 className="font-medium text-gray-900">{section.name}</h4>
                  <p className="text-sm text-gray-500">
                    {isVisible ? 'Visible en la página' : 'Oculta en la página'}
                  </p>
                </div>
              </div>
              
              <Button
                onClick={() => handleToggleSection(section.key)}
                disabled={isSaving}
                variant={isVisible ? "outline" : "primary"}
                size="sm"
                className={`min-w-[100px] ${
                  isVisible 
                    ? 'border-red-300 text-red-600 hover:bg-red-50' 
                    : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                {isSaving ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                ) : (
                  <>
                    {isVisible ? (
                      <>
                        <EyeOff className="h-4 w-4 mr-2" />
                        Ocultar
                      </>
                    ) : (
                      <>
                        <Eye className="h-4 w-4 mr-2" />
                        Mostrar
                      </>
                    )}
                  </>
                )}
              </Button>
            </div>
          )
        })}
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-medium text-blue-900 mb-2">💡 Información</h4>
        <p className="text-sm text-blue-700">
          Al ocultar una sección, esta no aparecerá en tu landing page pública, pero el contenido se mantendrá guardado. 
          Puedes volver a mostrarla en cualquier momento.
        </p>
      </div>
    </div>
  )
}

