'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Container, Section } from './layout'

const methodologyItems = [
  {
    id: 1,
    title: 'Recorded Meetings',
    description: 'We record and transcribe every meeting so you can easily review information when necessary.',
  },
  {
    id: 2,
    title: 'Brainwriting Exercises',
    description: 'Brain writing is an exercise to help the brain get into a creative and productive state.',
  },
  {
    id: 3,
    title: 'Advanced AI Tools',
    description: 'Language Learning Models (LLMs) help automate workflow, brainstorm and advise work production.',
  },
  {
    id: 4,
    title: 'Industry Experts',
    description: 'Mentorship and guidance is provided through a variety of participants, advisors, and partners.',
  },
  {
    id: 5,
    title: 'Hands-on Projects',
    description: 'We work on interesting AI projects that create a better future for humanity.',
  },
]

export function Methodology() {
  return (
    <Section className="flo-blue-section py-16">
      <Container>
        {/* Banner image at top */}
        <div className="mb-12 -mx-4 md:mx-0">
          <Image
            src="/image-52-2-1024x266.jpg"
            alt="Our methodology - collaborative learning"
            width={1024}
            height={266}
            className="w-full h-auto rounded-lg"
          />
        </div>
        
        {/* Title with white borders */}
        <div className="text-center mb-12">
          <div className="max-w-4xl mx-auto">
            <div className="border-t-4 border-white mb-4"></div>
            <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              HELPING PEOPLE LEARN BETTER.
            </h3>
            <div className="border-t-4 border-white mb-6"></div>
          </div>
          <p className="text-white text-lg">
            Our methodology is to foster collaboration and creativity.
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
              <h4 className="text-lg font-bold mb-3 text-[#00349B]">
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
