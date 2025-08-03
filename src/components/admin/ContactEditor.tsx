'use client'

import React, { useState } from 'react'
import { Save, Edit, CheckCircle, AlertCircle, Mail, Phone, MapPin, Clock, Linkedin, Twitter } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useContactInfo } from '@/hooks/useContent'
import { updateContactInfo } from '@/lib/database'

export function ContactEditor() {
  const { contactInfo, loading, refetch } = useContactInfo()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editData, setEditData] = useState({ field_value: '' })
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  const fieldLabels: Record<string, string> = {
    email: 'Email',
    phone: 'Teléfono',
    whatsapp: 'WhatsApp',
    linkedin: 'LinkedIn',
    twitter: 'Twitter',
    location: 'Ubicación',
    availability: 'Horarios de Atención'
  }

  const fieldIcons: Record<string, React.ComponentType<any>> = {
    email: Mail,
    phone: Phone,
    whatsapp: Phone,
    linkedin: Linkedin,
    twitter: Twitter,
    location: MapPin,
    availability: Clock
  }

  const startEditing = (item: any) => {
    setEditingId(item.id)
    setEditData({ field_value: item.field_value })
    setMessage(null)
  }

  const cancelEditing = () => {
    setEditingId(null)
    setEditData({ field_value: '' })
    setMessage(null)
  }

  const saveChanges = async () => {
    if (!editingId) return

    setSaving(true)
    try {
      await updateContactInfo(editingId, {
        field_value: editData.field_value
      })
      
      setMessage({ type: 'success', text: 'Información de contacto actualizada exitosamente' })
      setEditingId(null)
      refetch()
      
      // Clear message after 3 seconds
      setTimeout(() => setMessage(null), 3000)
    } catch (error) {
      setMessage({ type: 'error', text: 'Error al actualizar la información de contacto' })
    } finally {
      setSaving(false)
    }
  }

  const getFieldType = (fieldName: string) => {
    switch (fieldName) {
      case 'email':
        return 'email'
      case 'phone':
      case 'whatsapp':
        return 'tel'
      case 'linkedin':
      case 'twitter':
        return 'url'
      default:
        return 'text'
    }
  }

  const getPlaceholder = (fieldName: string) => {
    switch (fieldName) {
      case 'email':
        return 'contacto@ejemplo.com'
      case 'phone':
      case 'whatsapp':
        return '+1 (555) 123-4567'
      case 'linkedin':
        return 'https://linkedin.com/in/usuario'
      case 'twitter':
        return 'https://twitter.com/usuario'
      case 'location':
        return 'Ciudad, País'
      case 'availability':
        return 'Lunes a Viernes: 9:00 AM - 6:00 PM'
      default:
        return ''
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-gray-200 rounded w-1/3 animate-pulse"></div>
        {[...Array(4)].map((_, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm border animate-pulse">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-gray-200 rounded mr-3"></div>
              <div className="h-6 bg-gray-200 rounded w-1/4"></div>
            </div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Información de Contacto</h2>
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

      <div className="grid md:grid-cols-2 gap-6">
        {contactInfo.map((item) => {
          const IconComponent = fieldIcons[item.field_name] || Mail
          
          return (
            <div key={item.id} className="bg-white p-6 rounded-lg shadow-sm border">
              {editingId === item.id ? (
                <div className="space-y-4">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center mr-3">
                      <IconComponent className="h-4 w-4 text-red-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {fieldLabels[item.field_name] || item.field_name}
                    </h3>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Valor
                    </label>
                    {item.field_name === 'availability' ? (
                      <textarea
                        value={editData.field_value}
                        onChange={(e) => setEditData({ field_value: e.target.value })}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                        placeholder={getPlaceholder(item.field_name)}
                      />
                    ) : (
                      <input
                        type={getFieldType(item.field_name)}
                        value={editData.field_value}
                        onChange={(e) => setEditData({ field_value: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder={getPlaceholder(item.field_name)}
                      />
                    )}
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
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center mr-3">
                        <IconComponent className="h-4 w-4 text-red-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {fieldLabels[item.field_name] || item.field_name}
                      </h3>
                    </div>
                    <Button
                      onClick={() => startEditing(item)}
                      variant="ghost"
                      size="sm"
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Editar
                    </Button>
                  </div>
                  
                  <div className="text-gray-600">
                    {item.field_type === 'url' ? (
                      <a
                        href={item.field_value}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-red-600 hover:text-red-700 underline break-all"
                      >
                        {item.field_value}
                      </a>
                    ) : item.field_type === 'email' ? (
                      <a
                        href={`mailto:${item.field_value}`}
                        className="text-red-600 hover:text-red-700 underline"
                      >
                        {item.field_value}
                      </a>
                    ) : item.field_type === 'phone' ? (
                      <a
                        href={`tel:${item.field_value}`}
                        className="text-red-600 hover:text-red-700 underline"
                      >
                        {item.field_value}
                      </a>
                    ) : (
                      <span className="whitespace-pre-line">{item.field_value}</span>
                    )}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">
          Instrucciones de Uso
        </h3>
        <div className="text-sm text-blue-700 space-y-2">
          <p>• <strong>Email y Teléfono:</strong> Se utilizan en el formulario de contacto y footer</p>
          <p>• <strong>WhatsApp:</strong> Debe incluir el código de país (ej: +1234567890)</p>
          <p>• <strong>Redes Sociales:</strong> Deben ser URLs completas (ej: https://linkedin.com/in/usuario)</p>
          <p>• <strong>Ubicación:</strong> Se muestra en la sección de contacto</p>
          <p>• <strong>Horarios:</strong> Información sobre disponibilidad para clientes</p>
        </div>
      </div>
    </div>
  )
}

