'use client'

import { motion } from 'framer-motion'
import { Container, Section, SectionTitle } from './layout'

const projects = [
  {
    id: 1,
    title: 'MoodChanger',
    description: 'MoodChanger is your one stop shop for all things AI. You can manage various AI systems through this app. Check out all of the exciting AI technologies being connected.',
    link: 'https://www.flomadlabs.com/moodchanger-people',
  },
  {
    id: 2,
    title: 'CAIPO',
    description: 'CAIPO is Chief Artificial Intelligence Productivity Officer. This is a wearable AI tech that can record audio and video for note taking. The AI can assist you with summarizing or finding sections of your notes.',
    link: 'https://www.flomadlabs.com/caipo',
  },
  {
    id: 3,
    title: 'Flo Studios',
    description: 'Flo Studios is our content creation hub for our interns. We want to focus on all types of contents. We currently have our own podcast The Flo Frequency.',
    link: 'https://www.youtube.com/@FlomadLabs',
  },
  {
    id: 4,
    title: 'Flo Travel',
    description: 'AI is taking over in the market for travel. Flo Travel is using AI to help clients plan their trips accordingly. Plan your flight, hotel, trip, activities, etc. all in one place.',
    link: 'https://www.flomadtravel.com/',
  },
]

export function ProjectsShowcaseBlue() {
  return (
    <Section className="flo-blue-section">
      <Container>
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">Our Projects</h3>
          <p className="text-white/90 text-lg">
            Check out our most exciting projects we've going on right now.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flo-card group"
            >
              <h4 className="text-xl font-bold mb-3 text-[#0047AB]">
                {project.title}
              </h4>
              <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                {project.description}
              </p>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0047AB] font-semibold text-sm hover:underline inline-flex items-center gap-1"
              >
                Learn More →
              </a>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
