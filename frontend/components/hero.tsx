import Image from 'next/image'
import { Container } from './layout'
import { getSectionContent } from '@/lib/strapi'

export async function Hero() {
  const heroTitle = await getSectionContent('hero-title')
  const heroSubtitle = await getSectionContent('hero-subtitle')
  return (
    <section className="relative overflow-hidden bg-[#1e3a8a] min-h-screen flex items-center justify-center">
      {/* Blue hero section with visible world map - matching WordPress EXACTLY */}
      <div className="absolute inset-0 bg-[#1e3a8a]">
        {/* World map background - MORE VISIBLE like WordPress */}
        <Image 
          src="/Frame-3-5.jpg" 
          alt="Flo Labs Background"
          fill
          className="object-cover opacity-70"
          priority
        />
        {/* Light overlay */}
        <div className="absolute inset-0 bg-[#1e3a8a]/20" />
      </div>
      
      <Container className="relative z-10">
        <div className="mx-auto max-w-5xl text-center">
          <div>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 text-white">
              {heroTitle?.content || 'FLO LABS R&D'}
            </h1>
            
            <p className="text-2xl md:text-3xl text-white/95 mb-16">
              {heroSubtitle?.content || 'Advanced AI and Robotics Program'}
            </p>
            
            {/* Scroll indicator */}
            <div className="mt-20">
              <div className="inline-block text-white/70">
                <svg className="w-8 h-8 mx-auto animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
