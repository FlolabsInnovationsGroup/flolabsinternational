import { Metadata } from 'next'
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
      {/* Hero Section */}
      <Section className="flo-blue-section">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About Flo Labs
            </h1>
            <p className="text-xl text-white/90">
              Advanced AI and Robotics - Entrepreneurship Executive Management Program
            </p>
          </div>
        </Container>
      </Section>

      {/* Mission Section */}
      <Section className="bg-white">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-[#0047AB] text-center">
              Our Mission
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                Flo Labs R&D International is dedicated to advancing the frontiers of artificial 
                intelligence and robotics through innovative research, hands-on project work, and 
                experiential learning opportunities.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                We believe that the future of technology lies in collaborative, interdisciplinary 
                approaches that combine cutting-edge research with practical application. Our mission 
                is to empower the next generation of innovators by providing them with the tools, 
                knowledge, and experience needed to shape the future of AI and robotics.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                Through our Executive Management Program, we offer aspiring technologists and 
                entrepreneurs the opportunity to work on real-world projects, learn from industry 
                experts, and develop the skills necessary to drive technological innovation across 
                multiple industries.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Objectives Section */}
      <Section className="flo-blue-section">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">
              Our Objectives
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {objectives.map((objective, index) => (
                <motion.div
                  key={objective}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flo-card"
                >
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 w-8 h-8 bg-[#0047AB] rounded-full flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                    <p className="text-gray-700 leading-relaxed">{objective}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Team Section */}
      <Section className="bg-white">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6 text-[#0047AB]">
              Our Team
            </h2>
            <p className="text-gray-700 text-lg mb-12">
              Meet the <strong>Flo Team</strong> - a diverse group of researchers, engineers, 
              and innovators dedicated to pushing the boundaries of what&apos;s possible in AI 
              and robotics.
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
