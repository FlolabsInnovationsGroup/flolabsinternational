'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Container, Section } from './layout'
import { getStrapiImageUrl } from '@/lib/strapi'

interface Project {
  id: number
  title: string
  description: string
  link?: string
  images?: {
    url: string
    alternativeText?: string
  }[]
  showOnHomepage?: boolean
}

interface ProjectsShowcaseProps {
  readonly projects: readonly Project[]
}

// Map project titles to their Cloudinary URLs for backwards compatibility
const projectImages: Record<string, string> = {
  'MoodChanger': 'https://res.cloudinary.com/dgb6qsvev/image/upload/v1763058552/15_156b828e1e.png',
  'CAIPO': 'https://res.cloudinary.com/dgb6qsvev/image/upload/v1763058568/11_082e0d104a.png',
  'Flo Studios': 'https://res.cloudinary.com/dgb6qsvev/image/upload/v1763058581/image_29_61ef8c56ae.png',
  'Flo Travel': 'https://res.cloudinary.com/dgb6qsvev/image/upload/v1763058544/14_261199444b.png',
  'Flo Labs': 'https://res.cloudinary.com/dgb6qsvev/image/upload/v1763058521/image_1_3aafaed984.png',
  'Flo International': 'https://res.cloudinary.com/dgb6qsvev/image/upload/v1763058571/Group_1_b03a84fef5.png',
  'MoodChanger for Pets': 'https://res.cloudinary.com/dgb6qsvev/image/upload/v1763058517/image_52_2_f28051fbde.jpg',
  'Humanoid Robots': 'https://res.cloudinary.com/dgb6qsvev/image/upload/v1763058586/Frame_1_59_a1c07e5e10.png',
}

export function ProjectsShowcase({ projects }: ProjectsShowcaseProps) {
  const getProjectImageUrl = (project: Project): string => {
    const firstImage = project.images?.[0];
    if (firstImage?.url) {
      const imageUrl = firstImage.url.startsWith('http') 
        ? firstImage.url 
        : getStrapiImageUrl(firstImage.url);
      return imageUrl || '';
    }
    return projectImages[project.title] || '';
  };

  return (
    <Section className="flo-blue-section py-16">
      <Container>
        {/* Title with white borders - matching WordPress */}
        <div className="text-center mb-12">
          <div className="border-t-4 border-white mb-6"></div>
          <h3 className="text-3xl md:text-4xl font-bold mb-6 text-white">Our Projects</h3>
          <div className="border-t-4 border-white mb-6"></div>
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
              {(project.images?.[0] || projectImages[project.title]) && (
                <div className="mb-4 -mx-6 -mt-6">
                  <Image
                    src={getProjectImageUrl(project)}
                    alt={project.images?.[0]?.alternativeText || project.title}
                    width={266}
                    height={97}
                    className="w-full h-auto"
                  />
                </div>
              )}
              
              <h4 className="text-xl font-bold mb-3 text-[#00349B]">
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
                  className="text-[#00349B] font-semibold text-sm hover:underline inline-flex items-center gap-1"
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
