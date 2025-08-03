'use client'

import React, { useState } from 'react'
import { Save, Edit, CheckCircle, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useSiteContent } from '@/hooks/useContent'
import { updateSiteContent } from '@/lib/database'

export function ContentEditor() {
  const { content, loading, refetch } = useSiteContent()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editData, setEditData] = useState({ title: '', content: '' })
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  const startEditing = (item: any) => {
    setEditingId(item.id)
    setEditData({ title: item.title, content: item.content })
    setMessage(null)
  }

  const cancelEditing = () => {
    setEditingId(null)
    setEditData({ title: '', content: '' })
    setMessage(null)
  }

  const saveChanges = async () => {
    if (!editingId) return

    setSaving(true)
    try {
      await updateSiteContent(editingId, {
        title: editData.title,
        content: editData.content
      })
      
      setMessage({ type: 'success', text: 'Contenido actualizado exitosamente' })
      setEditingId(null)
      refetch()
      
      // Clear message after 3 seconds
      setTimeout(() => setMessage(null), 3000)
    } catch (error) {
      setMessage({ type: 'error', text: 'Error al actualizar el contenido' })
    } finally {
      setSaving(false)
    }
  }

  const groupedContent = content.reduce((acc, item) => {
    if (!acc[item.section]) {
      acc[item.section] = []
    }
    acc[item.section].push(item)
    return acc
  }, {} as Record<string, typeof content>)

  const sectionNames: Record<string, string> = {
    hero: 'Sección Principal (Hero)',
    about: 'Sobre Mí',
    contact: 'Contacto'
  }

  if (loading) {
    return (
      <div className="space-y-6">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm border animate-pulse">
            <div className="h-6 bg-gray-200 rounded mb-4 w-1/3"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Editar Contenido del Sitio</h2>
        {message && (
          <div className={`flex items-center px-4 py-2 rounded-lg ${
            message.type === 'success' 
              ? 'bg-green-50 text-green-700 border border-green-200' 
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
            {message.type === 'success' ? (
              <CheckCircle className="h-5 w-5 mr-2" />
            ) : (
              <AlertCircle className="h-5 w-5 mr-2" />
            )}
            {message.text}
          </div>
        )}
      </div>

      {Object.entries(groupedContent).map(([section, items]) => (
        <div key={section} className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {sectionNames[section] || section}
          </h3>
          
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                {editingId === item.id ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Título
                      </label>
                      <input
                        type="text"
                        value={editData.title}
                        onChange={(e) => setEditData(prev => ({ ...prev, title: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Contenido
                      </label>
                      <textarea
                        value={editData.content}
                        onChange={(e) => setEditData(prev => ({ ...prev, content: e.target.value }))}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                      />
                    </div>
                    
                    <div className="flex space-x-3">
                      <Button
                        onClick={saveChanges}
                        disabled={saving}
                        variant="primary"
                        size="sm"
                      >
                        {saving ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Guardando...
                          </>
                        ) : (
                          <>
                            <Save className="h-4 w-4 mr-2" />
                            Guardar
                          </>
                        )}
                      </Button>
                      <Button
                        onClick={cancelEditing}
                        variant="outline"
                        size="sm"
                      >
                        Cancelar
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-gray-900">{item.title}</h4>
                      <Button
                        onClick={() => startEditing(item)}
                        variant="ghost"
                        size="sm"
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Editar
                      </Button>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {item.content}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

