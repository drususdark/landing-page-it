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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="text-2xl font-bold mb-4">
              Técnico<span className="text-red-600">IT</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Soluciones tecnológicas profesionales para empresas y particulares. 
              Experiencia, calidad y compromiso en cada proyecto.
            </p>
            <div className="flex space-x-4">
              {getContactValue('linkedin') && (
                <a
                  href={getContactValue('linkedin')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-red-600 transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              )}
              {getContactValue('twitter') && (
                <a
                  href={getContactValue('twitter')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-red-600 transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              {[
                { label: 'Inicio', href: 'hero' },
                { label: 'Sobre Mí', href: 'about' },
                { label: 'Servicios', href: 'services' },
                { label: 'Contacto', href: 'contact' }
              ].map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-300 hover:text-red-600 transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">Contacto</h3>
            <ul className="space-y-3">
              {getContactValue('email') && (
                <li className="flex items-center">
                  <Mail className="h-4 w-4 text-red-600 mr-3 flex-shrink-0" />
                  <a
                    href={`mailto:${getContactValue('email')}`}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {getContactValue('email')}
                  </a>
                </li>
              )}
              {getContactValue('phone') && (
                <li className="flex items-center">
                  <Phone className="h-4 w-4 text-red-600 mr-3 flex-shrink-0" />
                  <a
                    href={`tel:${getContactValue('phone')}`}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {getContactValue('phone')}
                  </a>
                </li>
              )}
              {getContactValue('location') && (
                <li className="flex items-center">
                  <MapPin className="h-4 w-4 text-red-600 mr-3 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">
                    {getContactValue('location')}
                  </span>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} TécnicoIT. Todos los derechos reservados.
            </p>
            <p className="text-gray-400 text-sm flex items-center mt-4 md:mt-0">
              Hecho con <Heart className="h-4 w-4 text-red-600 mx-1" /> para ayudarte con la tecnología
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

