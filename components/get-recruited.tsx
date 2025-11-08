'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Container, Section } from './layout'
import { Button } from './button'

export function GetRecruited() {
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
            Get Recruited Today
          </h2>
          <p className="text-gray-700 text-lg md:text-xl mb-8 leading-relaxed">
            Join Flo Labs and work on cutting-edge AI and robotics projects. We connect talented 
            individuals with opportunities to learn, grow, and contribute to revolutionary technology. 
            Whether you&apos;re passionate about machine learning, software development, or emerging tech, 
            we have a place for you.
          </p>
          <Link href="/internships">
            <Button size="lg" className="px-8">
              View Internship Opportunities
            </Button>
          </Link>
        </motion.div>
      </Container>
    </Section>
  )
}
