'use client'

import { motion } from 'framer-motion'
import { Container, Section } from './layout'

export function AmbitiousProjects() {
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
                  Ambitious Innovative Projects
                </h2>
              </div>
            </div>
            
            {/* Content text on the right (60%) */}
            <div className="md:col-span-3 space-y-4">
              <p className="text-gray-700 text-lg leading-relaxed">
                Enjoy collaborating with other thoughtful <strong>professionals</strong> that are passionate about bringing a vision to life! We offer experiential learning, a unique and immersive educational training program with hands-on, real world <strong>experience</strong>.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                <strong>Flo Labs R&D</strong> is an incubator launching innovative projects in AI and Robotics. We enhance learning and project outcomes through teamwork, idea sharing, and innovative methods like brainstorming and LLM automation, preparing students with practical skills.
              </p>
            </div>
          </div>
        </motion.div>
      </Container>
    </Section>
  )
}
