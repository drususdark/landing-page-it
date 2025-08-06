'use client'

import React from 'react'
import { Mail, Phone, MapPin, Linkedin, Twitter, Heart } from 'lucide-react'
import { useContactInfo } from '@/hooks/useContent'

export function Footer() {
  const { contactInfo } = useContactInfo()

  const getContactValue = (fieldName: string) => {
    const field = contactInfo.find(item => item.field_name === fieldName)
    return field?.field_value || ''
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white">
      <div className="section-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="text-2xl lg:text-3xl font-bold mb-6">
              Técnico<span className="text-red-600">IT</span>
            </div>
            <p className="text-gray-300 mb-8 max-w-md leading-relaxed">
              Soluciones tecnológicas profesionales para empresas y particulares. 
              Experiencia, calidad y compromiso en cada proyecto.
            </p>
            <div className="flex space-x-4">
              {getContactValue('linkedin') && (
                <a
                  href={getContactValue('linkedin')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-red-600 transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              )}
              {getContactValue('twitter') && (
                <a
                  href={getContactValue('twitter')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-red-600 transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-6 text-lg">Enlaces Rápidos</h3>
            <ul className="space-y-4">
              {[
                { label: 'Inicio', href: 'hero' },
                { label: 'Sobre Mí', href: 'about' },
                { label: 'Servicios', href: 'services' },
                { label: 'Contacto', href: 'contact' }
              ].map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-300 hover:text-red-600 transition-colors text-base"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-6 text-lg">Contacto</h3>
            <ul className="space-y-4">
              {getContactValue('email') && (
                <li className="flex items-start">
                  <Mail className="h-5 w-5 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
                  <a
                    href={`mailto:${getContactValue('email')}`}
                    className="text-gray-300 hover:text-white transition-colors text-base leading-relaxed"
                  >
                    {getContactValue('email')}
                  </a>
                </li>
              )}
              {getContactValue('phone') && (
                <li className="flex items-start">
                  <Phone className="h-5 w-5 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
                  <a
                    href={`tel:${getContactValue('phone')}`}
                    className="text-gray-300 hover:text-white transition-colors text-base leading-relaxed"
                  >
                    {getContactValue('phone')}
                  </a>
                </li>
              )}
              {getContactValue('location') && (
                <li className="flex items-start">
                  <MapPin className="h-5 w-5 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300 text-base leading-relaxed">
                    {getContactValue('location')}
                  </span>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-16 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-base">
              © {currentYear} TécnicoIT. Todos los derechos reservados.
            </p>
            <p className="text-gray-400 text-base flex items-center">
              Hecho con <Heart className="h-4 w-4 text-red-600 mx-2" /> para ayudarte con la tecnología
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

