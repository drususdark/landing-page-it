'use client'

import React, { useState } from 'react'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send,
  MessageSquare,
  Linkedin,
  Twitter,
  CheckCircle
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useContactInfo, useSiteContent } from '@/hooks/useContent'

export function Contact() {
  const { contactInfo, loading: contactLoading } = useContactInfo()
  const { content: siteContent, loading: contentLoading } = useSiteContent('contact')
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: ''
      })
    }, 3000)
  }

  const getContactValue = (fieldName: string) => {
    const field = contactInfo.find(item => item.field_name === fieldName)
    return field?.field_value || ''
  }

  const contactMethods = [
    {
      icon: Mail,
      label: 'Email',
      value: getContactValue('email'),
      href: `mailto:${getContactValue('email')}`,
      color: 'text-blue-600'
    },
    {
      icon: Phone,
      label: 'Teléfono',
      value: getContactValue('phone'),
      href: `tel:${getContactValue('phone')}`,
      color: 'text-green-600'
    },
    {
      icon: MessageSquare,
      label: 'WhatsApp',
      value: getContactValue('whatsapp'),
      href: `https://wa.me/${getContactValue('whatsapp')?.replace(/[^0-9]/g, '')}`,
      color: 'text-green-500'
    },
    {
      icon: MapPin,
      label: 'Ubicación',
      value: getContactValue('location'),
      href: '#',
      color: 'text-red-600'
    }
  ]

  const socialLinks = [
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: getContactValue('linkedin'),
      color: 'text-blue-700'
    },
    {
      icon: Twitter,
      label: 'Twitter',
      href: getContactValue('twitter'),
      color: 'text-blue-400'
    }
  ]

  const services = [
    'Mantenimiento de PC',
    'Soporte Remoto',
    'Instalación de Software',
    'Configuración de Redes',
    'Recuperación de Datos',
    'Consultoría IT',
    'Otro'
  ]

  return (
    <section id="contact" className="section-spacing bg-white">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
            Contacto
          </h2>
          <div className="text-section">
            <p className="text-xl text-gray-600 leading-relaxed">
              {contentLoading ? (
                <div className="animate-pulse h-6 bg-gray-200 rounded mx-auto w-3/4"></div>
              ) : (
                siteContent[0]?.content || 'Estoy disponible para consultas y presupuestos. No dudes en contactarme para discutir cómo puedo ayudarte con tus necesidades tecnológicas.'
              )}
            </p>
          </div>
        </div>

        <div className="responsive-grid lg:grid-cols-2">
          {/* Contact Form */}
          <div className="bg-gray-50 p-8 lg:p-10 rounded-2xl">
            <h3 className="text-2xl font-semibold text-gray-900 mb-8">
              Envíame un Mensaje
            </h3>
            
            {isSubmitted ? (
              <div className="text-center py-12">
                <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-6" />
                <h4 className="text-xl font-semibold text-gray-900 mb-3">
                  ¡Mensaje Enviado!
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  Gracias por contactarme. Te responderé lo antes posible.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre Completo *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
                      placeholder="Tu nombre"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
                      placeholder="tu@email.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                      Servicio de Interés
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
                    >
                      <option value="">Selecciona un servicio</option>
                      {services.map((service) => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Mensaje *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors resize-none"
                    placeholder="Describe tu necesidad o problema..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant="primary"
                  size="lg"
                  className="w-full"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5" />
                      Enviar Mensaje
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>

          {/* Contact Information */}
          <div className="content-spacing-lg">
            <h3 className="text-2xl font-semibold text-gray-900 mb-8">
              Información de Contacto
            </h3>
            
            <div className="space-y-6 mb-10">
              {contactLoading ? (
                [...Array(4)].map((_, index) => (
                  <div key={index} className="flex items-center animate-pulse">
                    <div className="w-12 h-12 bg-gray-200 rounded-lg mr-4"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                    </div>
                  </div>
                ))
              ) : (
                contactMethods.map((method, index) => (
                  <div key={index} className="flex items-center group">
                    <div className={`w-12 h-12 ${method.color.replace('text-', 'bg-').replace('-600', '-100').replace('-500', '-100').replace('-700', '-100').replace('-400', '-100')} rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform`}>
                      <method.icon className={`h-6 w-6 ${method.color}`} />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 mb-1">{method.label}</div>
                      {method.href.startsWith('http') || method.href.startsWith('mailto') || method.href.startsWith('tel') ? (
                        <a
                          href={method.href}
                          target={method.href.startsWith('http') ? '_blank' : undefined}
                          rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="text-gray-600 hover:text-red-600 transition-colors"
                        >
                          {method.value}
                        </a>
                      ) : (
                        <div className="text-gray-600">{method.value}</div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Availability */}
            <div className="bg-gray-50 p-6 rounded-xl mb-10">
              <div className="flex items-center mb-4">
                <Clock className="h-6 w-6 text-red-600 mr-3" />
                <h4 className="font-semibold text-gray-900">Horarios de Atención</h4>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {contactLoading ? (
                  <div className="animate-pulse h-4 bg-gray-200 rounded"></div>
                ) : (
                  getContactValue('availability') || 'Lunes a Viernes: 9:00 AM - 6:00 PM'
                )}
              </p>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-6">Sígueme en Redes</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  social.href && (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-12 h-12 ${social.color.replace('text-', 'bg-').replace('-700', '-100').replace('-400', '-100')} rounded-lg flex items-center justify-center hover:scale-110 transition-transform`}
                    >
                      <social.icon className={`h-6 w-6 ${social.color}`} />
                    </a>
                  )
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

