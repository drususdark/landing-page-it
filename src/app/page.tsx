'use client'

import { Header } from '@/components/sections/Header'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Services } from '@/components/sections/Services'
import { Contact } from '@/components/sections/Contact'
import { Footer } from '@/components/sections/Footer'
import { useSiteContent } from '@/hooks/useContent'

export default function Home() {
  const { content: heroContent } = useSiteContent('hero')
  const { content: aboutContent } = useSiteContent('about')
  const { content: contactContent } = useSiteContent('contact')

  // Check if sections should be visible based on content visibility
  const isHeroVisible = heroContent.some(item => item.is_visible)
  const isAboutVisible = aboutContent.some(item => item.is_visible)
  const isContactVisible = contactContent.some(item => item.is_visible)

  return (
    <main className="min-h-screen">
      <Header />
      {isHeroVisible && <Hero />}
      {isAboutVisible && <About />}
      <Services /> {/* Services visibility is handled within the component */}
      {isContactVisible && <Contact />}
      <Footer />
    </main>
  )
}

