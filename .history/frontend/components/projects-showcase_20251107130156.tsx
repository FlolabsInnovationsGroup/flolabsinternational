'use client'

import { motion } from 'framer-motion'
import { Container, Section, SectionTitle } from './layout'

const projects = [
  {
    id: 1,
    title: 'Humanoid Robotics',
    description: 'Advanced humanoid robots with AI-powered movement and interaction capabilities.',
    image: '🤖',
    link: '/projects/humanoid-robotics',
  },
  {
    id: 2,
    title: 'AI Research Lab',
    description: 'Cutting-edge research in artificial intelligence and machine learning.',
    image: '🧠',
    link: '/projects/ai-research',
  },
  {
    id: 3,
    title: 'Sports Science Tech',
    description: 'Sensor technology and AI for performance enhancement and injury prevention.',
    image: '⚡',
    link: '/projects/sports-science',
  },
  {
    id: 4,
    title: 'Embedded Systems',
    description: 'Next-generation embedded systems for robotics and IoT applications.',
    image: '⚙️',
    link: '/projects/embedded-systems',
  },
]

export function ProjectsShowcase() {
  return (
    <Section className="bg-gray-50">
      <Container>
        <SectionTitle subtitle="Explore our innovative projects and research initiatives">
          Our Projects
        </SectionTitle>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <a
                href={project.link}
                className="block h-full p-6 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 group"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                  {project.image}
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {project.description}
                </p>
              </a>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
