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
          className="max-w-4xl mx-auto"
        >
          {/* Blue bordered box matching WordPress */}
          <div className="border-4 border-[#0047AB] bg-white p-8 md:p-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#0047AB]">
              Get Recruited Today
            </h2>
            <p className="text-gray-700 text-lg md:text-xl leading-relaxed">
              Join the Flo Labs family and kickstart your career in AI and robotic technologies. We are on a mission to bring the world together with the latest trends in AI and robotics. We are looking for individuals who are hungry for more growth in their experience and knowledge. Gain the experience you desire by applying with us on the programs page.
            </p>
          </div>
        </motion.div>
      </Container>
    </Section>
  )
}
