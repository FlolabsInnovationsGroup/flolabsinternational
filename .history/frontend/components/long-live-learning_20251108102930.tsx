'use client'

import { motion } from 'framer-motion'
import { Container, Section } from './layout'

export function LongLiveLearning() {
  return (
    <Section className="bg-white">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Blue bordered box matching WordPress */}
          <div className="border-4 border-[#0047AB] bg-white p-8 md:p-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#0047AB]">
              Long Live Learning
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Learn about the latest trends in technology. We are learning about the future of <strong>AI, robotics, education,</strong> and so much more. Every day is a great day to learn and we want to continuously learn and we expand.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              <strong>Flo Labs</strong> wants to prepare you for your own journey in your career. We help you learn the way you want to learn so you can achieve your goals of getting to the next level.
            </p>
          </div>
        </motion.div>
      </Container>
    </Section>
  )
}
