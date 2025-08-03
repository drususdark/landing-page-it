'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { LogOut, Edit, Save, Plus, Eye } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { signOut } from '@/lib/auth'
import { useAuthContext } from '@/context/AuthContext'
import { ContentEditor } from '@/components/admin/ContentEditor'
import { ServicesEditor } from '@/components/admin/ServicesEditor'
import { ContactEditor } from '@/components/admin/ContactEditor'
import { toast } from 'sonner'  // <-- Importa toast

export default function AdminDashboard() {
  const router = useRouter()
  const { isAuthenticated, isAdmin, loading, user } = useAuthContext()
  const [activeTab, setActiveTab] = React.useState('content')

  useEffect(() => {
    console.log('Auth status:', { isAuthenticated, isAdmin, loading, userEmail: user?.email })
  }, [isAuthenticated, isAdmin, loading, user])

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated || !isAdmin) {
        router.push('/admin/login')
      }
    }
  }, [isAuthenticated, isAdmin, loading, router])

  const handleSignOut = async () => {
    try {
      await signOut()
      toast.success('Sesión cerrada correctamente')  // <-- Toast éxito
      router.push('/admin/login')
    } catch (error) {
      console.error('Error signing out:', error)
      toast.error('Error al cerrar sesión')  // <-- Toast error
    }
  }

  const openSite = () => {
    window.open('/', '_blank')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    )
  }

  if (!isAuthenticated || !isAdmin) {
    return null
  }

  const tabs = [
    { id: 'content', label: 'Contenido del Sitio', icon: Edit },
    { id: 'services', label: 'Servicios', icon: Plus },
    { id: 'contact', label: 'Información de Contacto', icon: Save }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Panel de Administración
              </h1>
              <p className="text-sm text-gray-600">
                Bienvenido, {user?.email}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                onClick={openSite}
                variant="outline"
                size="sm"
                className="flex items-center"
              >
                <Eye className="h-4 w-4 mr-2" />
                Ver Sitio
              </Button>
              <Button
                onClick={handleSignOut}
                variant="ghost"
                size="sm"
                className="flex items-center text-red-600 hover:text-red-700"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Cerrar Sesión
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center transition-colors ${
                  activeTab === tab.id
                    ? 'border-red-500 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="h-4 w-4 mr-2" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'content' && <ContentEditor />}
        {activeTab === 'services' && <ServicesEditor />}
        {activeTab === 'contact' && <ContactEditor />}
      </main>
    </div>
  )
}
