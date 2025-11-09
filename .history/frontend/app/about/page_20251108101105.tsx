import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Container, Section } from '@/components/layout'

export const metadata: Metadata = {
  title: 'About Us | Flo Labs R&D International',
  description: 'Learn about Flo Labs R&D International - our mission, objectives, and team dedicated to advancing AI and robotics innovation.',
}

const objectives = [
  'Advance artificial intelligence and robotics research through hands-on projects',
  'Provide experiential learning opportunities for aspiring technologists worldwide',
  'Foster innovation in key verticals: Education, Healthcare, Travel, and Space',
  'Build a global community of learners and creators pushing technological boundaries',
  'Develop practical AI solutions that address real-world challenges',
  'Promote continuous learning and skill development in emerging technologies',
]

export default function AboutPage() {
  return (
    <>
      {/* Hero Section with Background Image */}
      <Section className="relative py-32 md:py-48 min-h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image 
            src="/Frame-4.jpg" 
            alt="Flo Labs R&D" 
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-[#0047AB]/80" />
        </div>
        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Flo Labs R&D
            </h1>
            <p className="text-xl md:text-2xl">
              EXECUTIVE MANAGEMENT PROGRAM
            </p>
            <p className="text-lg mt-4 opacity-90">
              Provides students a remote, unique, powerful, and immersive hands on educational experience.
            </p>
          </div>
        </Container>
      </Section>

      {/* Mission Section */}
      <Section className="bg-white">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-[#0047AB] text-center">
              Objectives
            </h2>
            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-gray-700 text-lg leading-relaxed">
                <strong>Experiential Learning:</strong> Unique and immersive educational training with hands-on, real world experience.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                Provide practical experience working on innovative marketable projects.
              </p>
            </div>
            
            <h2 className="text-4xl font-bold mb-8 text-[#0047AB] text-center mt-12">
              Mission
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 text-lg leading-relaxed">
                Inspire and empower individuals through transformative educational experiences that foster global perspectives, innovative thinking, and practical skills.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                We aim to cultivate a culture of curiosity and creativity, create jobs of the future, and build innovative solutions for a rapidly changing world.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Objectives Section - Removed duplicate */}
      
      {/* Team Section */}
      <Section className="bg-white">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6 text-[#0047AB]">
              Our Team
            </h2>
            <p className="text-gray-700 text-lg mb-12">
              Meet the Flo Team
            </p>
            
            {/* Team grid will be populated from Strapi in the future */}
            <div className="flo-card p-12">
              <p className="text-gray-600 text-lg">
                Our team information will be available soon. We&apos;re currently updating our 
                profiles to better showcase the amazing individuals driving innovation at Flo Labs.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Call to Action */}
      <Section className="flo-blue-section">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Join Us on This Journey
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Whether you&apos;re looking to gain hands-on experience, contribute to groundbreaking 
              research, or simply learn from the best in the field, Flo Labs offers opportunities 
              for growth and innovation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/internships"
                className="px-8 py-3 bg-white text-[#0047AB] font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                Explore Internships
              </a>
              <a
                href="/projects"
                className="px-8 py-3 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors border-2 border-white"
              >
                View Our Projects
              </a>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
