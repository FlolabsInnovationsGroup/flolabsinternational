'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Container, Section } from './layout'

interface Project {
  id: number
  title: string
  description: string
  link?: string
  image?: string
  showOnHomepage?: boolean
}

interface ProjectsShowcaseProps {
  readonly projects: readonly Project[]
}

// Map project titles to their image filenames for backwards compatibility
const projectImages: Record<string, string> = {
  'MoodChanger': '/Frame-3-1.jpg',
  'CAIPO': '/Frame-2-2.jpg',
  'Flo Studios': '/Frame-4.jpg',
  'Flo Travel': '/Frame-5-3.jpg',
}

export function ProjectsShowcase({ projects }: ProjectsShowcaseProps) {
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
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flo-card group"
            >
              {/* Project image at top */}
              {(project.image || projectImages[project.title]) && (
                <div className="mb-4 -mx-6 -mt-6">
                  <Image
                    src={project.image || projectImages[project.title]}
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
                  {(() => {
                    if (project.title === 'Flo Studios') return 'Check out our YouTube!'
                    if (project.title === 'MoodChanger') return 'MoodChanger Info'
                    if (project.title === 'CAIPO') return 'CAIPO Info'
                    return 'Website'
                  })()} →
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
