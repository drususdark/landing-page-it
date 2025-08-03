'use client'

import React from 'react'
import { 
  Monitor, 
  Wifi, 
  Download, 
  Network, 
  HardDrive, 
  Lightbulb,
  Wrench,
  Shield,
  Smartphone,
  ArrowRight
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useServices } from '@/hooks/useContent'

// Icon mapping for services
const iconMap: { [key: string]: React.ComponentType<any> } = {
  monitor: Monitor,
  wifi: Wifi,
  download: Download,
  network: Network,
  'hard-drive': HardDrive,
  lightbulb: Lightbulb,
  wrench: Wrench,
  shield: Shield,
  smartphone: Smartphone
}

export function Services() {
  const { services, loading } = useServices(true)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Servicios Profesionales
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ofrezco una amplia gama de servicios IT diseñados para mantener tu tecnología funcionando de manera óptima y segura.
          </p>
        </div>

        {/* Services Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg animate-pulse">
                <div className="w-12 h-12 bg-gray-200 rounded-lg mb-6"></div>
                <div className="h-6 bg-gray-200 rounded mb-4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent = iconMap[service.icon] || Wrench
              
              return (
                <div
                  key={service.id}
                  className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-2"
                >
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-red-600 transition-colors">
                    <IconComponent className="h-6 w-6 text-red-600 group-hover:text-white transition-colors" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {service.description}
                  </p>
                  
                  <button
                    onClick={() => scrollToSection('contact')}
                    className="flex items-center text-red-600 font-medium hover:text-red-700 transition-colors group"
                  >
                    Solicitar Servicio
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              )
            })}
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            ¿No encuentras el servicio que necesitas?
          </h3>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Cada proyecto es único. Contáctame para discutir tus necesidades específicas y crear una solución personalizada.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => scrollToSection('contact')}
              variant="primary"
              size="lg"
            >
              Consulta Personalizada
            </Button>
            <Button
              onClick={() => scrollToSection('about')}
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-gray-900"
            >
              Conoce Más Sobre Mí
            </Button>
          </div>
        </div>

        {/* Process Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Mi Proceso de Trabajo
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Un enfoque sistemático para garantizar resultados de calidad en cada proyecto.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Consulta Inicial',
                description: 'Evaluación gratuita de tus necesidades y diagnóstico del problema.'
              },
              {
                step: '02',
                title: 'Propuesta',
                description: 'Presupuesto detallado y plan de acción personalizado.'
              },
              {
                step: '03',
                title: 'Implementación',
                description: 'Ejecución del servicio con comunicación constante del progreso.'
              },
              {
                step: '04',
                title: 'Seguimiento',
                description: 'Soporte post-servicio y garantía de satisfacción.'
              }
            ].map((process, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {process.step}
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">
                  {process.title}
                </h4>
                <p className="text-gray-600">
                  {process.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

