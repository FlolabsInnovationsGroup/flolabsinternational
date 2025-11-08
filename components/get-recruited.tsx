'use client'

import { motion } from 'framer-motion'
import { Container, Section } from './layout'

export function GetRecruited() {
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
              <div className="border-4 border-[#00349B] bg-white p-8 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-[#00349B]">
                  Get Recruited Today
                </h2>
              </div>
            </div>
            
            {/* Content text on the right (60%) */}
            <div className="md:col-span-3">
              <p className="text-gray-700 text-lg leading-relaxed">
                Join the Flo Labs family and kickstart your career in AI and robotic technologies. We are on a mission to bring the world together with the latest trends in AI and robotics. We are looking for individuals who are hungry for more growth in their experience and knowledge. Gain the experience you desire by applying with us on the programs page.
              </p>
            </div>
          </div>
        </motion.div>
      </Container>
    </Section>
  )
}
