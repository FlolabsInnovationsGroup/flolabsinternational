'use client'

import { motion } from 'framer-motion'
import { Container, Section, SectionTitle } from './layout'

const benefits = [
  {
    id: 1,
    title: 'Real-World Experience',
    description: 'Work on actual products and research that impact the future of technology.',
    icon: '🚀',
  },
  {
    id: 2,
    title: 'Mentorship',
    description: 'Learn from industry experts and researchers at the cutting edge of their fields.',
    icon: '👨‍🏫',
  },
  {
    id: 3,
    title: 'Remote Flexibility',
    description: 'Most positions offer remote work options with flexible schedules.',
    icon: '🌍',
  },
  {
    id: 4,
    title: 'Growth Opportunities',
    description: 'Top performers are often offered full-time positions after internship completion.',
    icon: '📈',
  },
  {
    id: 5,
    title: 'Innovative Culture',
    description: 'Be part of a team that values creativity, curiosity, and bold ideas.',
    icon: '💡',
  },
  {
    id: 6,
    title: 'Cutting-Edge Tech',
    description: 'Get hands-on experience with the latest tools, frameworks, and technologies.',
    icon: '⚡',
  },
]

export function Benefits() {
  return (
    <Section className="bg-gray-50">
      <Container>
        <SectionTitle subtitle="Why intern with Flolabs International?">
          Benefits & Perks
        </SectionTitle>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 bg-white rounded-xl shadow-sm"
            >
              <div className="text-4xl mb-4">{benefit.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
              <p className="text-gray-600 text-sm">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
