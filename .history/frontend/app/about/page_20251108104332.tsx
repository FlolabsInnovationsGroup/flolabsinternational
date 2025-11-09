import { Metadata } from 'next'
import Image from 'next/image'
import { Container, Section } from '@/components/layout'

export const metadata: Metadata = {
  title: 'About Us | Flo Labs R&D International',
  description: 'Learn about Flo Labs R&D International - our mission, objectives, and team dedicated to advancing AI and robotics innovation.',
}

export default function AboutPage() {
  return (
    <>
      {/* Hero Section - Dark with Logo (matching WordPress) */}
      <Section className="relative py-24 md:py-32 min-h-[400px] flex items-center justify-center bg-[#222222]">
        <div className="absolute inset-0">
          <Image 
            src="/Frame-3-5.jpg" 
            alt="Flo Labs R&D" 
            fill
            className="object-cover opacity-[0.08]"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/20 to-black/50" />
        </div>
        <Container className="relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <Image 
              src="/Frame-4.jpg" 
              alt="Flo Labs Logo" 
              width={200}
              height={200}
              className="mx-auto mb-8"
            />
          </div>
        </Container>
      </Section>

      {/* Flo Labs R&D Title Box (white with blue border) */}
      <Section className="bg-white py-12">
        <Container>
          <div className="max-w-4xl mx-auto border-4 border-[#0047AB] p-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#0047AB]">
              Flo Labs R&D
            </h1>
            <p className="text-xl tracking-wider mb-4">
              EXECUTIVE MANAGEMENT PROGRAM
            </p>
            <p className="text-lg text-gray-700">
              Provides students a <strong>remote</strong>, <strong>unique</strong>, <strong>powerful</strong>, and <strong>immersive</strong> hands on educational experience.
            </p>
          </div>
        </Container>
      </Section>

      {/* Objectives & Mission Section - Blue Background with Cards */}
      <Section className="flo-blue-section py-16">
        <Container>
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
            {/* Objectives Card */}
            <div className="bg-white/95 rounded-lg p-8 shadow-lg">
              <h2 className="text-3xl font-bold mb-6 text-[#0047AB] text-center border-b-4 border-[#0047AB] pb-4">
                Objectives
              </h2>
              <div className="space-y-4">
                <p className="text-gray-800 leading-relaxed">
                  <strong>Experiential Learning:</strong> Unique and immersive educational training with hands-on, real world experience.
                </p>
                <p className="text-gray-800 leading-relaxed">
                  Provide practical experience working on innovative marketable projects.
                </p>
              </div>
            </div>

            {/* Mission Card */}
            <div className="bg-white/95 rounded-lg p-8 shadow-lg">
              <h2 className="text-3xl font-bold mb-6 text-[#0047AB] text-center border-b-4 border-[#0047AB] pb-4">
                Mission
              </h2>
              <div className="space-y-4">
                <p className="text-gray-800 leading-relaxed">
                  Inspire and empower individuals through transformative educational experiences that foster global perspectives, innovative thinking, and practical skills.
                </p>
                <p className="text-gray-800 leading-relaxed">
                  We aim to cultivate a culture of curiosity and creativity, create jobs of the future, and build innovative solutions for a rapidly changing world.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Team Section - White Background */}
      <Section className="bg-white py-16">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl font-bold mb-6 text-gray-200">
              Our Team
            </h2>
            <p className="text-[#0047AB] text-xl mb-12">
              Meet the <strong>Flo Team</strong>
            </p>
          </div>
        </Container>
      </Section>

      {/* Call to Action - Removed (not on WordPress About page) */}
    </>
  )
}
