'use client'

import { motion } from 'framer-motion'
import { Container, Section } from './layout'

const verticals = [
  {
    id: 1,
    title: 'Education',
    description: 'Experiential learning through cutting-edge programs and internships that equip students with real-world skills to thrive in a global and dynamic economy.',
  },
  {
    id: 2,
    title: 'Healthcare',
    description: 'Empowering healthcare innovation with AI-driven insights, advancing global well-being through smarter diagnostics and personalized care solutions.',
  },
  {
    id: 3,
    title: 'Travel',
    description: 'Revolutionizing travel with a personalized, AI-powered travel platform and chatbot that creates unforgettable experiences tailored to your unique journey.',
  },
  {
    id: 4,
    title: 'Space',
    description: 'Expanding the boundaries of innovation with AI solutions for space exploration, education, research, and sustainable development in the space sector.',
  },
]

export function Verticals() {
  return (
    <Section className="flo-blue-section py-16">
      <Container>
        {/* Title with white borders - matching WordPress */}
        <div className="text-center mb-12">
          <div className="max-w-4xl mx-auto">
            <div className="border-t-4 border-white mb-4"></div>
            <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white">Our Verticals</h3>
            <div className="border-t-4 border-white mb-6"></div>
          </div>
          <p className="text-white text-lg">
            We focus on four main verticals in our expertise.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {verticals.map((vertical, index) => (
            <motion.div
              key={vertical.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flo-card group text-center"
            >
              <h4 className="text-xl font-bold mb-3 text-[#0047AB]">
                {vertical.title}
              </h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                {vertical.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
