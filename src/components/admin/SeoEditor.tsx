'use client'

import React, { useState, useEffect } from 'react'
import { Search, Save, Globe } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useSeoMetadata } from '@/hooks/useContent'
import { updateSeoMetadata, createSeoMetadata } from '@/lib/database'

export function SeoEditor() {
  const { metadata, loading, refetch } = useSeoMetadata('home')
  const [formData, setFormData] = useState({
    meta_title: '',
    meta_description: '',
    meta_keywords: '',
    og_image_url: ''
  })
  const [saving, setSaving] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)

  useEffect(() => {
    if (metadata) {
      setFormData({
        meta_title: metadata.meta_title || '',
        meta_description: metadata.meta_description || '',
        meta_keywords: metadata.meta_keywords || '',
        og_image_url: metadata.og_image_url || ''
      })
    }
  }, [metadata])

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    setHasChanges(true)
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      if (metadata) {
        await updateSeoMetadata(metadata.id, formData)
      } else {
        await createSeoMetadata({
          page_name: 'home',
          ...formData
        })
      }
      await refetch()
      setHasChanges(false)
    } catch (error) {
      console.error('Error saving SEO metadata:', error)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Configuración SEO</h3>
        <div className="animate-pulse space-y-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i}>
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Search className="h-6 w-6 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Configuración SEO</h3>
        </div>
        {hasChanges && (
          <Button
            onClick={handleSave}
            disabled={saving}
            variant="primary"
          >
            {saving ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            Guardar Cambios
          </Button>
        )}
      </div>

      <div className="space-y-6">
        {/* Meta Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Título de la Página (Meta Title)
          </label>
          <input
            type="text"
            value={formData.meta_title}
            onChange={(e) => handleInputChange('meta_title', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="Ej: Técnico IT Freelance - Soluciones Profesionales"
            maxLength={60}
          />
          <div className="flex justify-between mt-1">
            <p className="text-xs text-gray-500">
              Aparece como título en los resultados de Google
            </p>
            <span className={`text-xs ${
              formData.meta_title.length > 60 ? 'text-red-500' : 'text-gray-400'
            }`}>
              {formData.meta_title.length}/60
            </span>
          </div>
        </div>

        {/* Meta Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Descripción (Meta Description)
          </label>
          <textarea
            value={formData.meta_description}
            onChange={(e) => handleInputChange('meta_description', e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="Ej: Servicios de soporte técnico, mantenimiento y consultoría IT para empresas y particulares. Soluciones profesionales adaptadas a tus necesidades."
            maxLength={160}
          />
          <div className="flex justify-between mt-1">
            <p className="text-xs text-gray-500">
              Aparece como descripción en los resultados de Google
            </p>
            <span className={`text-xs ${
              formData.meta_description.length > 160 ? 'text-red-500' : 'text-gray-400'
            }`}>
              {formData.meta_description.length}/160
            </span>
          </div>
        </div>

        {/* Meta Keywords */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Palabras Clave (Meta Keywords)
          </label>
          <input
            type="text"
            value={formData.meta_keywords}
            onChange={(e) => handleInputChange('meta_keywords', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="Ej: técnico IT, soporte técnico, mantenimiento PC, consultoría IT, freelance"
          />
          <p className="text-xs text-gray-500 mt-1">
            Separa las palabras clave con comas
          </p>
        </div>

        {/* Open Graph Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Imagen para Redes Sociales (Open Graph)
          </label>
          <input
            type="url"
            value={formData.og_image_url}
            onChange={(e) => handleInputChange('og_image_url', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="https://ejemplo.com/imagen.jpg"
          />
          <p className="text-xs text-gray-500 mt-1">
            URL de la imagen que aparecerá cuando compartan tu página en redes sociales
          </p>
        </div>
      </div>

      {/* Preview */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-medium text-gray-900 mb-3 flex items-center">
          <Globe className="h-4 w-4 mr-2" />
          Vista previa en Google
        </h4>
        <div className="bg-white p-4 rounded border">
          <h5 className="text-lg text-blue-600 hover:underline cursor-pointer">
            {formData.meta_title || 'Título de tu página'}
          </h5>
          <p className="text-green-700 text-sm">
            https://tu-dominio.vercel.app
          </p>
          <p className="text-gray-600 text-sm mt-1">
            {formData.meta_description || 'Descripción de tu página que aparecerá en los resultados de búsqueda...'}
          </p>
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-medium text-blue-900 mb-2">💡 Consejos SEO</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• <strong>Título:</strong> Máximo 60 caracteres, incluye palabras clave importantes</li>
          <li>• <strong>Descripción:</strong> Máximo 160 caracteres, describe claramente tu servicio</li>
          <li>• <strong>Palabras clave:</strong> Incluye términos que tus clientes buscarían</li>
          <li>• <strong>Imagen:</strong> Tamaño recomendado 1200x630 píxeles para redes sociales</li>
        </ul>
      </div>
    </div>
  )
}

