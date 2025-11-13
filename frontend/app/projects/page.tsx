import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Container, Section } from '@/components/layout'
import { getProjects, getStrapiImageUrl } from '@/lib/strapi'
import InternshipCarousel from '@/components/internship-carousel'

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

      {/* Image before Subject Matter Accelerator Programs */}
      <Section className="bg-white">
        <Container>
          <div className="max-w-6xl mx-auto">
            <Image
              src="/Frame-2.jpg"
              alt="Students learning and working"
              width={1449}
              height={651}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </Container>
      </Section>

      {/* Subject Matter Accelerator Programs */}
      <Section className="bg-white">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#00349B] mb-8">
              Subject Matter Accelerator Programs
            </h2>
          </div>
        </Container>
      </Section>

      {/* Image after Subject Matter Accelerator Programs (Our Tools) */}
      <Section className="bg-white">
        <Container>
          <div className="max-w-6xl mx-auto">
            <Image
              src="/image-52-2.jpg"
              alt="Our Tools - Technologies we use"
              width={1080}
              height={281}
              className="w-full h-auto"
            />
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
            
            {/* Image Carousel from WordPress */}
            <InternshipCarousel
              images={[
                { url: '/Frame-203.jpg', alternativeText: 'Frame 203' },
                { url: '/13.png', alternativeText: '13' },
                { url: '/14.png', alternativeText: '14' },
                { url: '/15.png', alternativeText: '15' },
                { url: '/12.png', alternativeText: '12' },
                { url: '/11.png', alternativeText: '11' },
              ]}
            />

            {/* Additional Image Below Carousel */}
            <div className="relative w-full max-w-2xl mx-auto mb-8">
              <Image
                src="/Group-1.png"
                alt="Flo Labs Positions"
                width={674}
                height={649}
                className="w-full h-auto"
              />
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
