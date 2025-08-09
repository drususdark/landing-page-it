'use client'

import React, { useState } from 'react'
import { Eye, EyeOff, Edit, Save, X } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useContactInfo } from '@/hooks/useContent'
import { updateContactInfo } from '@/lib/database'

export function ContactFieldsEditor() {
  const { contactInfo, loading, refetch } = useContactInfo(true) // Include hidden fields
  const [editingField, setEditingField] = useState<string | null>(null)
  const [editValue, setEditValue] = useState('')
  const [saving, setSaving] = useState<string | null>(null)

  const fieldLabels: { [key: string]: string } = {
    email: 'Email',
    phone: 'Teléfono',
    whatsapp: 'WhatsApp',
    linkedin: 'LinkedIn',
    twitter: 'Twitter',
    location: 'Ubicación',
    availability: 'Horarios de Atención'
  }

  const handleToggleVisibility = async (fieldId: string, currentVisibility: boolean) => {
    setSaving(fieldId)
    try {
      await updateContactInfo(fieldId, { is_visible: !currentVisibility })
      await refetch()
    } catch (error) {
      console.error('Error updating field visibility:', error)
    } finally {
      setSaving(null)
    }
  }

  const handleStartEdit = (field: any) => {
    setEditingField(field.id)
    setEditValue(field.field_value)
  }

  const handleSaveEdit = async (fieldId: string) => {
    setSaving(fieldId)
    try {
      await updateContactInfo(fieldId, { field_value: editValue })
      setEditingField(null)
      setEditValue('')
      await refetch()
    } catch (error) {
      console.error('Error updating field value:', error)
    } finally {
      setSaving(null)
    }
  }

  const handleCancelEdit = () => {
    setEditingField(null)
    setEditValue('')
  }

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Gestión de Campos de Contacto</h3>
        <div className="animate-pulse space-y-4">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
              <div className="flex space-x-2">
                <div className="h-8 bg-gray-200 rounded w-16"></div>
                <div className="h-8 bg-gray-200 rounded w-16"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Gestión de Campos de Contacto</h3>
      
      <div className="space-y-4">
        {contactInfo.map(field => {
          const isEditing = editingField === field.id
          const isSaving = saving === field.id
          const fieldLabel = fieldLabels[field.field_name] || field.field_name
          
          return (
            <div key={field.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-3 mb-2">
                    {field.is_visible ? (
                      <Eye className="h-5 w-5 text-green-600 flex-shrink-0" />
                    ) : (
                      <EyeOff className="h-5 w-5 text-gray-400 flex-shrink-0" />
                    )}
                    <h4 className="font-medium text-gray-900">{fieldLabel}</h4>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      field.is_visible 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {field.is_visible ? 'Visible' : 'Oculto'}
                    </span>
                  </div>
                  
                  {isEditing ? (
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder={`Ingresa ${fieldLabel.toLowerCase()}`}
                      />
                      <div className="flex space-x-2">
                        <Button
                          onClick={() => handleSaveEdit(field.id)}
                          disabled={isSaving || !editValue.trim()}
                          variant="primary"
                          size="sm"
                        >
                          {isSaving ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          ) : (
                            <>
                              <Save className="h-4 w-4 mr-1" />
                              Guardar
                            </>
                          )}
                        </Button>
                        <Button
                          onClick={handleCancelEdit}
                          disabled={isSaving}
                          variant="outline"
                          size="sm"
                        >
                          <X className="h-4 w-4 mr-1" />
                          Cancelar
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-600 break-all">{field.field_value}</p>
                  )}
                </div>
                
                {!isEditing && (
                  <div className="flex space-x-2 ml-4">
                    <Button
                      onClick={() => handleStartEdit(field)}
                      disabled={isSaving}
                      variant="outline"
                      size="sm"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={() => handleToggleVisibility(field.id, field.is_visible)}
                      disabled={isSaving}
                      variant={field.is_visible ? "outline" : "primary"}
                      size="sm"
                      className={`min-w-[80px] ${
                        field.is_visible 
                          ? 'border-red-300 text-red-600 hover:bg-red-50' 
                          : 'bg-green-600 hover:bg-green-700'
                      }`}
                    >
                      {isSaving ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                      ) : (
                        <>
                          {field.is_visible ? (
                            <>
                              <EyeOff className="h-4 w-4 mr-1" />
                              Ocultar
                            </>
                          ) : (
                            <>
                              <Eye className="h-4 w-4 mr-1" />
                              Mostrar
                            </>
                          )}
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-medium text-blue-900 mb-2">💡 Información</h4>
        <p className="text-sm text-blue-700">
          Puedes ocultar campos de contacto individuales (como Twitter o LinkedIn) si no los usas. 
          Los campos ocultos no aparecerán en tu landing page, pero la información se mantendrá guardada.
        </p>
      </div>
    </div>
  )
}

