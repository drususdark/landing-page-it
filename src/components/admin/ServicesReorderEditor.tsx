'use client'

import React, { useState, useEffect } from 'react'
import { GripVertical, Eye, EyeOff, Save } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useServices } from '@/hooks/useContent'
import { updateService, reorderServices } from '@/lib/database'
import { Service } from '@/lib/supabase'

export function ServicesReorderEditor() {
  const { services: originalServices, loading, refetch } = useServices(true) // Include hidden services
  const [services, setServices] = useState<Service[]>([])
  const [draggedItem, setDraggedItem] = useState<number | null>(null)
  const [hasChanges, setHasChanges] = useState(false)
  const [saving, setSaving] = useState(false)
  const [togglingVisibility, setTogglingVisibility] = useState<string | null>(null)

  useEffect(() => {
    setServices(originalServices)
    setHasChanges(false)
  }, [originalServices])

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedItem(index)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault()
    
    if (draggedItem === null || draggedItem === dropIndex) {
      setDraggedItem(null)
      return
    }

    const newServices = [...services]
    const draggedService = newServices[draggedItem]
    
    // Remove dragged item
    newServices.splice(draggedItem, 1)
    
    // Insert at new position
    newServices.splice(dropIndex, 0, draggedService)
    
    setServices(newServices)
    setDraggedItem(null)
    setHasChanges(true)
  }

  const handleToggleVisibility = async (serviceId: string, currentVisibility: boolean) => {
    setTogglingVisibility(serviceId)
    try {
      await updateService(serviceId, { is_visible: !currentVisibility })
      await refetch()
    } catch (error) {
      console.error('Error updating service visibility:', error)
    } finally {
      setTogglingVisibility(null)
    }
  }

  const handleSaveOrder = async () => {
    setSaving(true)
    try {
      const orderedIds = services.map(service => service.id)
      await reorderServices(orderedIds)
      await refetch()
      setHasChanges(false)
    } catch (error) {
      console.error('Error saving service order:', error)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Reordenar Servicios</h3>
        <div className="animate-pulse space-y-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="flex items-center space-x-4 p-4 border rounded-lg">
              <div className="h-6 w-6 bg-gray-200 rounded"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
              <div className="h-8 bg-gray-200 rounded w-16"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Reordenar Servicios</h3>
        {hasChanges && (
          <Button
            onClick={handleSaveOrder}
            disabled={saving}
            variant="primary"
          >
            {saving ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            Guardar Orden
          </Button>
        )}
      </div>
      
      <div className="space-y-3">
        {services.map((service, index) => {
          const isToggling = togglingVisibility === service.id
          
          return (
            <div
              key={service.id}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
              className={`flex items-center space-x-4 p-4 border rounded-lg cursor-move hover:bg-gray-50 transition-colors ${
                draggedItem === index ? 'opacity-50' : ''
              }`}
            >
              <div className="flex items-center space-x-3">
                <GripVertical className="h-5 w-5 text-gray-400" />
                <span className="text-sm font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {index + 1}
                </span>
              </div>
              
              <div className="flex items-center space-x-3">
                {service.is_visible ? (
                  <Eye className="h-5 w-5 text-green-600" />
                ) : (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                )}
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 truncate">{service.title}</h4>
                  <p className="text-sm text-gray-500 truncate">{service.description}</p>
                </div>
              </div>
              
              <Button
                onClick={() => handleToggleVisibility(service.id, service.is_visible)}
                disabled={isToggling}
                variant={service.is_visible ? "outline" : "primary"}
                size="sm"
                className={`min-w-[80px] ${
                  service.is_visible 
                    ? 'border-red-300 text-red-600 hover:bg-red-50' 
                    : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                {isToggling ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                ) : (
                  <>
                    {service.is_visible ? (
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
          )
        })}
      </div>
      
      <div className="mt-6 space-y-4">
        <div className="p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">💡 Cómo usar</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• <strong>Arrastra y suelta</strong> los servicios para cambiar su orden</li>
            <li>• <strong>Oculta servicios</strong> que no quieras mostrar temporalmente</li>
            <li>• <strong>Guarda los cambios</strong> cuando termines de reordenar</li>
          </ul>
        </div>
        
        {hasChanges && (
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              ⚠️ Tienes cambios sin guardar en el orden de los servicios. No olvides hacer clic en "Guardar Orden".
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

