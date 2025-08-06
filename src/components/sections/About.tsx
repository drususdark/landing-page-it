'use client'

import React from 'react'
import { CheckCircle, Award, Users, Clock } from 'lucide-react'
import { useSiteContent } from '@/hooks/useContent'

export function About() {
  const { content, loading } = useSiteContent('about')

  const aboutContent = content.find(item => item.order_index === 1)
  const experienceContent = content.find(item => item.order_index === 2)

  const features = [
    {
      icon: Award,
      title: 'Certificaciones Profesionales',
      description: 'Certificado en múltiples tecnologías y plataformas'
    },
    {
      icon: Users,
      title: 'Enfoque Personalizado',
      description: 'Soluciones adaptadas a las necesidades específicas de cada cliente'
    },
    {
      icon: Clock,
      title: 'Respuesta Rápida',
      description: 'Tiempos de respuesta optimizados para minimizar el downtime'
    }
  ]

  const skills = [
    'Mantenimiento de Hardware',
    'Soporte de Software',
    'Redes y Conectividad',
    'Seguridad Informática',
    'Recuperación de Datos',
    'Consultoría IT'
  ]

  return (
    <section id="about" className="section-spacing bg-white">
      <div className="section-container">
        <div className="responsive-grid lg:grid-cols-2 items-center">
          {/* Content */}
          <div className="content-spacing-lg">
            <div className="text-section">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
                {loading ? (
                  <div className="animate-pulse h-10 bg-gray-200 rounded"></div>
                ) : (
                  aboutContent?.title || 'Sobre Mí'
                )}
              </h2>
              
              <div className="space-y-6 mb-10">
                <p className="text-lg text-gray-600 leading-relaxed">
                  {loading ? (
                    <div className="animate-pulse space-y-2">
                      <div className="h-4 bg-gray-200 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </div>
                  ) : (
                    aboutContent?.content || 'Técnico en Informática con más de 5 años de experiencia en soporte técnico, mantenimiento de equipos y soluciones IT. Me especializo en ofrecer servicios personalizados que ayuden a optimizar el rendimiento tecnológico de mis clientes.'
                  )}
                </p>

                <p className="text-lg text-gray-600 leading-relaxed">
                  {loading ? (
                    <div className="animate-pulse space-y-2">
                      <div className="h-4 bg-gray-200 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded w-4/5"></div>
                    </div>
                  ) : (
                    experienceContent?.content || 'He trabajado con empresas de diversos sectores, desde pequeños negocios hasta corporaciones medianas, proporcionando soporte técnico integral y soluciones innovadoras.'
                  )}
                </p>
              </div>
            </div>

            {/* Skills */}
            <div className="mb-10">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Especialidades</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {skills.map((skill, index) => (
                  <div key={index} className="flex items-center py-2">
                    <CheckCircle className="h-5 w-5 text-red-600 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="space-y-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                      <feature.icon className="h-6 w-6 text-red-600" />
                    </div>
                  </div>
                  <div className="pt-1">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h4>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual Elements */}
          <div className="relative mt-12 lg:mt-0">
            {/* Main Image Placeholder */}
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden shadow-lg">
                <div className="w-full h-full bg-gradient-to-br from-red-600/10 to-gray-900/10 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-red-600 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
                      <Award className="h-12 w-12 text-white" />
                    </div>
                    <p className="text-gray-600 font-medium text-lg">Técnico IT Profesional</p>
                  </div>
                </div>
              </div>
              
              {/* Floating Cards */}
              <div className="absolute -top-6 -right-6 bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <div className="text-3xl font-bold text-red-600 mb-1">5+</div>
                <div className="text-sm text-gray-600">Años</div>
              </div>
              
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <div className="text-3xl font-bold text-gray-900 mb-1">100%</div>
                <div className="text-sm text-gray-600">Satisfacción</div>
              </div>
            </div>

            {/* Background Elements */}
            <div className="absolute -z-10 top-8 left-8 w-32 h-32 bg-red-600/10 rounded-full"></div>
            <div className="absolute -z-10 bottom-8 right-8 w-24 h-24 bg-gray-900/10 rounded-lg rotate-45"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

