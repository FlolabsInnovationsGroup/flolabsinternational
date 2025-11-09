import { Metadata } from 'next'
import Link from 'next/link'
import { Container, Section } from '@/components/layout'

export const metadata: Metadata = {
  title: 'Our Projects | Flo Labs R&D International',
  description: 'Explore our cutting-edge AI and robotics projects at Flo Labs - from MoodChanger to CAIPO, Flo Travel, and more.',
}

const projects = [
  {
    id: 1,
    slug: 'moodchanger',
    title: 'MoodChanger',
    description: 'MoodChanger is your one stop shop for all things AI. You can manage various AI systems through this app. Check out all of the exciting AI technologies being connected.',
    link: 'https://www.flomadlabs.com/moodchanger-people',
    technologies: ['AI Integration', 'Multi-System Management', 'User Interface'],
  },
  {
    id: 2,
    slug: 'caipo',
    title: 'CAIPO',
    description: 'CAIPO is Chief Artificial Intelligence Productivity Officer. This is a wearable AI tech that can record audio and video for note taking. The AI can assist you with summarizing or finding sections of your notes.',
    link: 'https://www.flomadlabs.com/caipo',
    technologies: ['Wearable Tech', 'AI Assistant', 'Audio/Video Processing', 'Note Taking'],
  },
  {
    id: 3,
    slug: 'flo-studios',
    title: 'Flo Studios',
    description: 'Flo Studios is our content creation hub for our interns. We want to focus on all types of contents. We currently have our own podcast The Flo Frequency.',
    link: 'https://www.youtube.com/@FlomadLabs',
    technologies: ['Content Creation', 'Podcast Production', 'Media Hub'],
  },
  {
    id: 4,
    slug: 'flo-travel',
    title: 'Flo Travel',
    description: 'AI is taking over in the market for travel. Flo Travel is using AI to help clients plan their trips accordingly. Plan your flight, hotel, trip, activities, etc. all in one place.',
    link: 'https://www.flomadtravel.com/',
    technologies: ['AI Travel Planning', 'Trip Management', 'Smart Recommendations'],
  },
]

export default function ProjectsPage() {
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className="flo-card group hover:shadow-xl transition-all duration-300"
              >
                <h3 className="text-2xl font-bold mb-4 text-[#0047AB] group-hover:text-[#003580] transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-gray-700 mb-6 leading-relaxed">
                  {project.description}
                </p>

                {project.technologies && project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-blue-50 text-[#0047AB] text-sm rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#0047AB] font-semibold hover:underline"
                >
                  Learn More →
                </a>
              </div>
            ))}
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
              className="inline-block px-8 py-3 bg-white text-[#0047AB] font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              View Internship Opportunities
            </Link>
          </div>
        </Container>
      </Section>
    </>
  )
}
