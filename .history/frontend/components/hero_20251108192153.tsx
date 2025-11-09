import Image from 'next/image'
import { Container } from './layout'
import { getSectionContent } from '@/lib/strapi'

export async function Hero() {
  const heroTitle = await getSectionContent('hero-title')
  const heroSubtitle = await getSectionContent('hero-subtitle')
  return (
    <section className="relative overflow-hidden bg-[#1a2847] py-32 md:py-48 min-h-[70vh] flex items-center justify-center">
      {/* Blue hero section with visible world map - matching WordPress EXACTLY */}
      <div className="absolute inset-0 bg-[#1a2847]">
        {/* World map background - MORE VISIBLE like WordPress */}
        <Image 
          src="/Frame-3-5.jpg" 
          alt="Flo Labs Background"
          fill
          className="object-cover opacity-40"
          priority
        />
        {/* Lighter overlay to show the blue map pattern */}
        <div className="absolute inset-0 bg-[#1a2847]/60" />
      </div>
      
      <Container className="relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-[#5ba3ff]">
              FLO LABS R&D
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-12">
              Advanced AI and Robotics Program
            </p>
            
            {/* Scroll indicator */}
            <div className="mt-16">
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="inline-block text-white/60"
              >
                <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
