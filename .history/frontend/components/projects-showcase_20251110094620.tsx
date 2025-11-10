'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Container, Section } from './layout'

// HARDCODED projects matching flolabs.international EXACTLY
const HOMEPAGE_PROJECTS = [
  {
    id: 1,
    title: 'MoodChanger',
    description: 'MoodChanger is your one stop shop for all things AI. You can manage various AI systems through this app. Check out all of the exciting AI technologies being connected.',
    link: 'https://www.flomadlabs.com/moodchanger-people',
    image: '/Frame-3-1.jpg'
  },
  {
    id: 2,
    title: 'CAIPO',
    description: 'CAIPO is Chief Artificial Intelligence Productivity Officer. This is a wearable AI tech that can record audio and video for note taking. The AI can assist you with summarizing or finding sections of your notes.',
    link: 'https://www.flomadlabs.com/caipo',
    image: '/Frame-2-2.jpg'
  },
  {
    id: 3,
    title: 'Flo Studios',
    description: 'Flo Studios is our content creation hub for our interns. We want to focus on all types of contents. We currently have our own podcast The Flo Frequency.',
    link: 'https://www.youtube.com/@FlomadLabs',
    image: '/Frame-4.jpg'
  },
  {
    id: 4,
    title: 'Flo Travel',
    description: 'AI is taking over in the market for travel. Flo Travel is using AI to help clients plan their trips accordingly. Plan your flight, hotel, trip, activites, etc. all in one place.',
    link: 'https://www.flomadtravel.com/',
    image: '/Frame-5-3.jpg'
  }
]

export function ProjectsShowcase() {
  return (
    <Section className="flo-blue-section py-16">
      <Container>
        {/* Title with white borders above and below - matching WordPress */}
        <div className="text-center mb-12">
          <div className="max-w-4xl mx-auto">
            <div className="border-t-4 border-white mb-4"></div>
            <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white">Our Projects</h3>
            <div className="border-t-4 border-white mb-6"></div>
          </div>
          <p className="text-white text-lg">
            Check out our most exciting projects we&apos;ve going on right now.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {HOMEPAGE_PROJECTS.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flo-card group"
            >
              {/* Project image at top */}
              {project.image && (
                <div className="mb-4 -mx-6 -mt-6">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={266}
                    height={97}
                    className="w-full h-auto"
                  />
                </div>
              )}
              
              <h4 className="text-xl font-bold mb-3 text-[#00349B]">
                {project.title}
              </h4>
              <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                {project.description}
              </p>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#00349B] font-semibold text-sm hover:underline inline-flex items-center gap-1"
                >
                  {project.title === 'Flo Studios' ? 'Check out our YouTube!' : 
                   project.title === 'MoodChanger' ? 'MoodChanger Info' :
                   project.title === 'CAIPO' ? 'CAIPO Info' : 'Website'} →
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
