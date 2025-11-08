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
          className="max-w-4xl mx-auto"
        >
          {/* Blue bordered box matching WordPress */}
          <div className="border-4 border-[#0047AB] bg-white p-8 md:p-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#0047AB]">
              Ambitious Innovative Projects
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Enjoy collaborating with other thoughtful <strong>professionals</strong> that are passionate about bringing a vision to life! We offer experiential learning, a unique and immersive educational training program with hands-on, real world <strong>experience</strong>.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              <strong>Flo Labs R&D</strong> is an incubator launching innovative projects in AI and Robotics. We enhance learning and project outcomes through teamwork, idea sharing, and innovative methods like brainstorming and LLM automation, preparing students with practical skills.
            </p>
          </div>
        </motion.div>
      </Container>
    </Section>
  )
}
