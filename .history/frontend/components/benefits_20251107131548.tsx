'use client'

import { motion } from 'framer-motion'
import { Container, Section } from './layout'

const benefits = [
  {
    id: 1,
    title: 'Flexibility',
    description: 'We offer you the flexibility you need to complete your tasks. We know you have a busy schedule and we offer you the ability to work at your own pace on your own time.',
  },
  {
    id: 2,
    title: 'Affordability',
    description: 'We can provide the learning experience needed for your success without breaking the bank.',
  },
  {
    id: 3,
    title: 'Opportunities',
    description: 'We focus on AI and robotic technologies because this is the future for humanity. The opportunities here will lead you to greater opportunities of the future. We want to see you succeed in creating better technology for the future.',
  },
  {
    id: 4,
    title: 'Expertise',
    description: 'Learn with us as we discover the latest trends in AI and robotics. We want you to learn and know the best technologies available as we improve the world around us technologically.',
  },
]

export function Benefits() {
  return (
    <Section className="flo-blue-section">
      <Container>
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold">Our Benefits</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flo-card text-center"
            >
              <h4 className="text-xl font-bold mb-3 text-[#0047AB]">
                {benefit.title}
              </h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
