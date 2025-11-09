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
          className="max-w-6xl mx-auto"
        >
          {/* Side-by-side layout matching WordPress: Blue box LEFT, text RIGHT */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
            {/* Blue bordered box on the left (40%) */}
            <div className="md:col-span-2">
              <div className="border-4 border-[#0047AB] bg-white p-8 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-[#0047AB]">
                  Long Live Learning
                </h2>
              </div>
            </div>
            
            {/* Content text on the right (60%) */}
            <div className="md:col-span-3 space-y-4">
              <p className="text-gray-700 text-lg leading-relaxed">
                Learn about the latest trends in technology. We are learning about the future of <strong>AI, robotics, education,</strong> and so much more. Every day is a great day to learn and we want to continuously learn and we expand.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                <strong>Flo Labs</strong> wants to prepare you for your own journey in your career. We help you learn the way you want to learn so you can achieve your goals of getting to the next level.
              </p>
            </div>
          </div>
        </motion.div>
      </Container>
    </Section>
  )
}
