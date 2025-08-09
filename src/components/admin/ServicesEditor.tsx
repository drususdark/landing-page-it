'use client'

import React, { useState } from 'react'
import { Save, Edit, Plus, Trash2, CheckCircle, AlertCircle, Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useServices } from '@/hooks/useContent'
import { updateService, createService, deleteService } from '@/lib/database'

export function ServicesEditor() {
  const { services, loading, refetch } = useServices(false) // Get all services, including inactive
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [editData, setEditData] = useState({
    title: '',
    description: '',
    icon: 'wrench',
    is_visible: true
  })
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  const iconOptions = [
    { value: 'monitor', label: 'Monitor' },
    { value: 'wifi', label: 'WiFi' },
    { value: 'download', label: 'Descarga' },
    { value: 'network', label: 'Red' },
    { value: 'hard-drive', label: 'Disco Duro' },
    { value: 'lightbulb', label: 'Bombilla' },
    { value: 'wrench', label: 'Llave' },
    { value: 'shield', label: 'Escudo' },
    { value: 'smartphone', label: 'Teléfono' }
  ]

  const startEditing = (service: any) => {
    setEditingId(service.id)
    setEditData({
      title: service.title,
      description: service.description,
      icon: service.icon,
      is_visible: service.is_visible
    })
    setIsCreating(false)
    setMessage(null)
  }

  const startCreating = () => {
    setIsCreating(true)
    setEditingId(null)
    setEditData({
      title: '',
      description: '',
      icon: 'wrench',
      is_visible: true
    })
    setMessage(null)
  }

  const cancelEditing = () => {
    setEditingId(null)
    setIsCreating(false)
    setEditData({
      title: '',
      description: '',
      icon: 'wrench',
      is_visible: true
    })
    setMessage(null)
  }

  const saveChanges = async () => {
    setSaving(true)
    try {
      if (isCreating) {
        const maxOrder = Math.max(...services.map(s => s.order_index), 0)
        await createService({
          ...editData,
          order_index: maxOrder + 1
        })
        setMessage({ type: 'success', text: 'Servicio creado exitosamente' })
      } else if (editingId) {
        await updateService(editingId, editData)
        setMessage({ type: 'success', text: 'Servicio actualizado exitosamente' })
      }
      
      setEditingId(null)
      setIsCreating(false)
      refetch()
      
      // Clear message after 3 seconds
      setTimeout(() => setMessage(null), 3000)
    } catch (error) {
      setMessage({ type: 'error', text: 'Error al guardar el servicio' })
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este servicio?')) {
      return
    }

    try {
      await deleteService(id)
      setMessage({ type: 'success', text: 'Servicio eliminado exitosamente' })
      refetch()
      setTimeout(() => setMessage(null), 3000)
    } catch (error) {
      setMessage({ type: 'error', text: 'Error al eliminar el servicio' })
    }
  }

  const toggleActive = async (service: any) => {
  try {
    await updateService(service.id, { is_visible: !service.is_visible })
    setMessage({ 
      type: 'success', 
      text: `Servicio ${!service.is_visible ? 'activado' : 'desactivado'} exitosamente` 
    })
    refetch()
    setTimeout(() => setMessage(null), 3000)
  } catch (error) {
    setMessage({ type: 'error', text: 'Error al cambiar el estado del servicio' })
  }
}

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="h-8 bg-gray-200 rounded w-1/3 animate-pulse"></div>
          <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
        </div>
        {[...Array(3)].map((_, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm border animate-pulse">
            <div className="h-6 bg-gray-200 rounded mb-4 w-1/2"></div>
            <div className="space-y-3">
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
        <h2 className="text-2xl font-bold text-gray-900">Gestionar Servicios</h2>
        <div className="flex items-center space-x-4">
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
          <Button
            onClick={startCreating}
            variant="primary"
            size="sm"
          >
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Servicio
          </Button>
        </div>
      </div>

      {/* Create New Service Form */}
      {isCreating && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-red-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Crear Nuevo Servicio</h3>
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Título del Servicio
                </label>
                <input
                  type="text"
                  value={editData.title}
                  onChange={(e) => setEditData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Ej: Mantenimiento de PC"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Icono
                </label>
                <select
                  value={editData.icon}
                  onChange={(e) => setEditData(prev => ({ ...prev, icon: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  {iconOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descripción
              </label>
              <textarea
                value={editData.description}
                onChange={(e) => setEditData(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                placeholder="Describe el servicio que ofreces..."
              />
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="is_visible"
                checked={editData.is_visible}
                onChange={(e) => setEditData(prev => ({ ...prev, is_visible: e.target.checked }))}
                className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
              />
              <label htmlFor="is_visible" className="ml-2 block text-sm text-gray-700">
                Servicio activo (visible en el sitio)
              </label>
            </div>
            
            <div className="flex space-x-3">
              <Button
                onClick={saveChanges}
                disabled={saving || !editData.title || !editData.description}
                variant="primary"
                size="sm"
              >
                {saving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Creando...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Crear Servicio
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
        </div>
      )}

      {/* Services List */}
      <div className="space-y-4">
        {services.map((service) => (
          <div key={service.id} className={`bg-white p-6 rounded-lg shadow-sm border ${
            !service.is_visible ? 'border-gray-300 bg-gray-50' : 'border-gray-200'
          }`}>
            {editingId === service.id ? (
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Título del Servicio
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
                      Icono
                    </label>
                    <select
                      value={editData.icon}
                      onChange={(e) => setEditData(prev => ({ ...prev, icon: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                      {iconOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descripción
                  </label>
                  <textarea
                    value={editData.description}
                    onChange={(e) => setEditData(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                  />
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id={`is_visible-${service.id}`}
                    checked={editData.is_visible}
                    onChange={(e) => setEditData(prev => ({ ...prev, is_visible: e.target.checked }))}
                    className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                  />
                  <label htmlFor={`is_visible-${service.id}`} className="ml-2 block text-sm text-gray-700">
                    Servicio activo (visible en el sitio)
                  </label>
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
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center">
                    <h3 className={`text-lg font-semibold ${
                      service.is_visible ? 'text-gray-900' : 'text-gray-500'
                    }`}>
                      {service.title}
                    </h3>
                    {!service.is_visible && (
                      <span className="ml-2 px-2 py-1 text-xs bg-gray-200 text-gray-600 rounded-full">
                        Inactivo
                      </span>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => toggleActive(service)}
                      variant="ghost"
                      size="sm"
                      className={service.is_visible ? 'text-gray-600' : 'text-green-600'}
                    >
                      {service.is_visible ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      onClick={() => startEditing(service)}
                      variant="ghost"
                      size="sm"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={() => handleDelete(service.id)}
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <p className={`text-sm leading-relaxed ${
                  service.is_visible ? 'text-gray-600' : 'text-gray-500'
                }`}>
                  {service.description}
                </p>
                <div className="mt-2 text-xs text-gray-500">
                  Icono: {iconOptions.find(opt => opt.value === service.icon)?.label || service.icon}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

