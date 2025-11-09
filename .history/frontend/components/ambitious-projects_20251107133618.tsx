'use client'

import { motion } from 'framer-motion'
import { Container, Section } from './layout'

export function AmbitiousProjects() {
  return (
    <Section className="flo-blue-section">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ambitious Innovative Projects
          </h2>
          <p className="text-white/90 text-lg md:text-xl leading-relaxed mb-6">
            At Flo Labs, we believe in experiential learning through hands-on project work. 
            Our interns don&apos;t just observe—they build, create, and innovate alongside 
            industry experts.
          </p>
          <p className="text-white/90 text-lg md:text-xl leading-relaxed">
            Collaborate with talented individuals from around the world in a dynamic environment 
            where your ideas matter and your contributions make a real impact on cutting-edge 
            AI and robotics solutions.
          </p>
        </motion.div>
      </Container>
    </Section>
  )
}
