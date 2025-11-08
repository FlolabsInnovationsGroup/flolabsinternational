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
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#0047AB]">
            Long Live Learning
          </h2>
          <p className="text-gray-700 text-lg md:text-xl leading-relaxed mb-6">
            In the rapidly evolving world of technology, continuous learning isn&apos;t just 
            important—it&apos;s essential. We&apos;re committed to keeping our team at the forefront 
            of AI and robotics innovation.
          </p>
          <p className="text-gray-700 text-lg md:text-xl leading-relaxed">
            Stay ahead of the curve with access to the latest tools, technologies, and trends. 
            From advanced AI models to emerging robotics platforms, we ensure you&apos;re always 
            learning and growing with the industry.
          </p>
        </motion.div>
      </Container>
    </Section>
  )
}
