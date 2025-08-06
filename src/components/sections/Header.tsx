'use client'

import React, { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMenuOpen(false)
    }
  }

  const navItems = [
    { label: 'Inicio', href: 'hero' },
    { label: 'Sobre Mí', href: 'about' },
    { label: 'Servicios', href: 'services' },
    { label: 'Contacto', href: 'contact' }
  ]

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
    }`}>
      <div className="section-container">
        <div className="flex justify-between items-center py-4 lg:py-6">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-2xl lg:text-3xl font-bold text-gray-900">
              Técnico<span className="text-red-600">IT</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 lg:space-x-10">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="text-gray-700 hover:text-red-600 transition-colors duration-200 font-medium text-base lg:text-lg"
              >
                {item.label}
              </button>
            ))}
            <Button
              onClick={() => scrollToSection('contact')}
              variant="primary"
              size="sm"
              className="ml-4"
            >
              Contactar
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-900" />
            ) : (
              <Menu className="h-6 w-6 text-gray-900" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-6 border-t border-gray-200 bg-white/95 backdrop-blur-sm">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="text-left text-gray-700 hover:text-red-600 transition-colors duration-200 font-medium py-3 text-lg"
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-4">
                <Button
                  onClick={() => scrollToSection('contact')}
                  variant="primary"
                  size="sm"
                  className="w-full"
                >
                  Contactar
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

