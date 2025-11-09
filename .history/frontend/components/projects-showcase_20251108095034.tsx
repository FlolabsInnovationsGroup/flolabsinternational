'use client'

import { motion } from 'framer-motion'
import { Container, Section } from './layout'

interface Project {
  id: number
  title: string
  description: string
  link?: string
}

interface ProjectsShowcaseProps {
  readonly projects: readonly Project[]
}

export function ProjectsShowcase({ projects }: ProjectsShowcaseProps) {
  return (
    <Section className="flo-blue-section">
      <Container>
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">Our Projects</h3>
          <p className="text-white/90 text-lg">
            Check out our most exciting projects we&apos;ve going on right now.
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
              <div 
                className="text-gray-700 text-sm mb-4 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: project.description }}
              />
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0047AB] font-semibold text-sm hover:underline inline-flex items-center gap-1"
                >
                  Learn More →
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
