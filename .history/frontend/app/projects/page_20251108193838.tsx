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
                  className="flo-card group hover:shadow-xl transition-all duration-300"
                >
                  <h3 className="text-2xl font-bold mb-4 text-[#00349B] group-hover:text-[#002775] transition-colors">
                    {project.title}
                  </h3>
                  
                  <div 
                    className="text-gray-700 mb-6 leading-relaxed prose prose-sm"
                    dangerouslySetInnerHTML={{ __html: project.description }}
                  />

                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[#00349B] font-semibold hover:underline"
                    >
                      Learn More →
                    </a>
                  )}
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#00349B]">
              Subject Matter Accelerator Programs
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Students gain experience through all phases of the project&apos;s evolution to learn today&apos;s best practices in research and development.
            </p>
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
            <p className="text-xl text-gray-600 mb-8">
              Explore diverse opportunities across AI, robotics, healthcare, education, and more
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {[
                'Machine Learning Engineer',
                'Robotics Engineer',
                'AI Research Intern',
                'Data Scientist',
                'UX/UI Designer',
                'Full Stack Developer'
              ].map((position) => (
                <div
                  key={position}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-[#00349B]"
                >
                  <p className="text-lg font-semibold text-gray-900">{position}</p>
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

      {/* Call to Action */}
      <Section className="flo-blue-section">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Want to Work on These Projects?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join our internship program and contribute to cutting-edge AI and robotics innovations.
            </p>
            <Link
              href="/internships"
              className="inline-block px-8 py-3 bg-white text-[#00349B] font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              View Internship Opportunities
            </Link>
          </div>
        </Container>
      </Section>
    </>
  )
}
