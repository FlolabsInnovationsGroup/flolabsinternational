import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Container, Section } from '@/components/layout'
import { getProjects, getStrapiImageUrl } from '@/lib/strapi'

export const metadata: Metadata = {
  title: 'Our Projects | Flo Labs R&D International',
  description: 'Explore our cutting-edge AI and robotics projects at Flo Labs - from MoodChanger to CAIPO, Flo Travel, and more.',
}

// Revalidate every 60 seconds
export const revalidate = 60

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <>
      {/* Hero Section */}
      <Section className="flo-blue-section">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Our Projects
            </h1>
            <p className="text-xl text-white/90">
              Explore the innovative AI and robotics projects we&apos;re building at Flo Labs
            </p>
          </div>
        </Container>
      </Section>

      {/* Projects Grid */}
      <Section className="bg-white">
        <Container>
          {projects.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No projects available at this time.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  {/* Project Image */}
                  {project.images && project.images.length > 0 ? (
                    <div className="relative w-full h-48">
                      <Image
                        src={getStrapiImageUrl(project.images[0].url) || ''}
                        alt={project.images[0].alternativeText || project.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center">
                      <span className="text-4xl text-[#00349B] opacity-50">
                        {project.title.charAt(0)}
                      </span>
                    </div>
                  )}
                  
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-6 text-[#00349B]">
                      {project.title}
                    </h3>
                    
                    {/* What The Project Is */}
                    <div className="mb-6">
                      <div 
                        className="text-gray-700 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: project.description }}
                      />
                    </div>

                    {/* Current Work section */}
                    {project.currentWork ? (
                      <div className="mb-6">
                        <div 
                          className="text-gray-700 leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: project.currentWork }}
                        />
                      </div>
                    ) : (
                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-900 mb-2">Current Work Focus</h4>
                      </div>
                    )}

                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-[#00349B] font-semibold hover:underline"
                      >
                        Visit Site →
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Container>
      </Section>

      {/* Subject Matter Accelerator Programs */}
      <Section className="bg-white">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg text-gray-700 leading-relaxed mb-12">
              Students gain experience through all phases of the project&apos;s evolution to learn today&apos;s best practices in research and development.
            </p>
            
            <h2 className="text-3xl md:text-4xl font-bold text-[#00349B]">
              Subject Matter Accelerator Programs
            </h2>
          </div>
        </Container>
      </Section>

      {/* Over 30 Unique Positions Available */}
      <Section className="bg-gray-50">
        <Container>
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-[#00349B]">
              Over 30 Unique Positions Available
            </h2>
            
            {/* Project Images Gallery */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
              {projects
                .filter(p => p.images && p.images.length > 0)
                .map((project) => (
                  <div
                    key={project.id}
                    className="relative aspect-square rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300 shadow-md"
                  >
                    <Image
                      src={getStrapiImageUrl(project.images![0].url) || ''}
                      alt={project.images![0].alternativeText || project.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
            </div>

                        <div className="mt-8">
              <Link
                href="/internships"
                className="inline-flex items-center gap-2 text-[#00349B] font-semibold text-lg hover:underline"
              >
                View All Positions →
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
          </div>
        </Container>
      </Section>
    </>
  )
}
