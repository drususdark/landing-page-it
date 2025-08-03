'use client'

import React from 'react'
import { ChevronDown, Monitor, Wifi, Download } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useSiteContent } from '@/hooks/useContent'

export function Hero() {
  const { content, loading } = useSiteContent('hero')

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const heroContent = content[0]

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 border-2 border-gray-900 rounded-full"></div>
        <div className="absolute top-40 right-32 w-24 h-24 border-2 border-red-600 rounded-lg rotate-45"></div>
        <div className="absolute bottom-32 left-1/4 w-16 h-16 border-2 border-gray-900 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-20 h-20 border-2 border-red-600 rounded-lg rotate-12"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              {loading ? (
                <div className="animate-pulse">
                  <div className="h-12 bg-gray-200 rounded mb-4"></div>
                  <div className="h-12 bg-gray-200 rounded"></div>
                </div>
              ) : (
                <>
                  Soluciones <span className="text-red-600">IT</span><br />
                  Profesionales
                </>
              )}
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {loading ? (
                <div className="animate-pulse">
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                </div>
              ) : (
                heroContent?.content || 'Soy un técnico IT freelance especializado en brindar soluciones tecnológicas profesionales para empresas y particulares.'
              )}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <Button
                onClick={() => scrollToSection('services')}
                variant="primary"
                size="lg"
                className="group"
              >
                Ver Servicios
                <ChevronDown className="ml-2 h-5 w-5 group-hover:translate-y-1 transition-transform" />
              </Button>
              <Button
                onClick={() => scrollToSection('contact')}
                variant="outline"
                size="lg"
              >
                Contactar Ahora
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 text-center lg:text-left">
              <div>
                <div className="text-2xl font-bold text-gray-900">5+</div>
                <div className="text-sm text-gray-600">Años de Experiencia</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">100+</div>
                <div className="text-sm text-gray-600">Clientes Satisfechos</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">24/7</div>
                <div className="text-sm text-gray-600">Soporte Disponible</div>
              </div>
            </div>
          </div>

          {/* Visual Elements */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-6">
              {/* Service Icons */}
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 group">
                <Monitor className="h-12 w-12 text-red-600 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-gray-900 mb-2">Mantenimiento</h3>
                <p className="text-sm text-gray-600">Optimización y limpieza de equipos</p>
              </div>
              
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 group mt-8">
                <Wifi className="h-12 w-12 text-red-600 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-gray-900 mb-2">Soporte Remoto</h3>
                <p className="text-sm text-gray-600">Asistencia técnica a distancia</p>
              </div>
              
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 group -mt-8">
                <Download className="h-12 w-12 text-red-600 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-gray-900 mb-2">Instalaciones</h3>
                <p className="text-sm text-gray-600">Software y configuraciones</p>
              </div>
              
              <div className="bg-gradient-to-br from-red-600 to-red-700 p-8 rounded-2xl text-white">
                <div className="text-3xl font-bold mb-2">¿Necesitas ayuda?</div>
                <p className="text-red-100 mb-4">Contáctame para una consulta gratuita</p>
                <Button
                  onClick={() => scrollToSection('contact')}
                  variant="secondary"
                  size="sm"
                  className="bg-white text-red-600 hover:bg-gray-100"
                >
                  Contactar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <button
          onClick={() => scrollToSection('about')}
          className="p-2 rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow"
        >
          <ChevronDown className="h-6 w-6 text-gray-600" />
        </button>
      </div>
    </section>
  )
}

