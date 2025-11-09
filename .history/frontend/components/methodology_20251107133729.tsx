'use client'

import { motion } from 'framer-motion'
import { Container, Section } from './layout'

const methodologyItems = [
  {
    id: 1,
    title: 'Recorded Meetings',
    description: 'All team meetings are recorded for reference and learning. Review discussions, catch up on missed sessions, and reinforce your understanding.',
  },
  {
    id: 2,
    title: 'Brainwriting Exercises',
    description: 'Collaborative ideation sessions where everyone contributes ideas in writing, fostering creativity and inclusive participation.',
  },
  {
    id: 3,
    title: 'Advanced AI Tools',
    description: 'Leverage cutting-edge Large Language Models (LLMs) and AI assistants to accelerate learning and problem-solving.',
  },
  {
    id: 4,
    title: 'Industry Experts',
    description: 'Learn directly from experienced professionals who bring real-world insights and mentorship to guide your development.',
  },
  {
    id: 5,
    title: 'Hands-on Projects',
    description: 'Apply your knowledge through practical project work that builds your portfolio and demonstrates real-world skills.',
  },
]

export function Methodology() {
  return (
    <Section className="flo-blue-section">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Helping People Learn Better
          </h2>
          <p className="text-white/90 text-lg md:text-xl">
            Our comprehensive methodology combines multiple approaches to maximize your learning experience.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {methodologyItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flo-card text-center"
            >
              <div className="mb-4 text-4xl font-bold text-[#0047AB]">
                {item.id}
              </div>
              <h4 className="text-lg font-bold mb-3 text-[#0047AB]">
                {item.title}
              </h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
