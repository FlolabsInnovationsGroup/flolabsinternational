import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Container, Section } from '@/components/layout'
import { Button } from '@/components/button'
import Link from 'next/link'
import { getInternshipBySlug, getInternships } from '@/lib/strapi'

type PageProps = {
  params: Promise<{ slug: string }>
}

// Generate static params for all internships
export async function generateStaticParams() {
  const internships = await getInternships()
  
  return internships.map((internship) => ({
    slug: internship.slug,
  }))
}

// Generate metadata for SEO
export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params
  const internship = await getInternshipBySlug(params.slug)

  if (!internship) {
    return {
      title: 'Internship Not Found',
    }
  }

  const description = internship.description?.substring(0, 160) || `Join our team as a ${internship.title}`

  return {
    title: `${internship.title} | Flo Labs Internships`,
    description,
    openGraph: {
      title: internship.title,
      description,
      type: 'website',
    },
  }
}

export default async function InternshipPage(props: PageProps) {
  const params = await props.params
  const internship = await getInternshipBySlug(params.slug)

  if (!internship) {
    notFound()
  }

  // Convert array data to arrays if they're strings
  const getArrayData = (data: string[] | string | undefined): string[] => {
    if (!data) return []
    if (Array.isArray(data)) return data
    // If it's a string, try to parse it
    return data.split('\n').map(line => line.trim()).filter(line => line.length > 0)
  }

  const requirements = getArrayData(internship.requirements)
  const responsibilities = getArrayData(internship.responsibilities)

  return (
    <>
      {/* Simple WordPress-style layout */}
      <Section className="bg-white pt-24 pb-16">
        <Container>
          <article className="max-w-4xl mx-auto">
            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900">
              {internship.title}
            </h1>

            {/* Overview */}
            <div className="prose prose-lg max-w-none mb-8">
              <p className="font-bold text-xl text-gray-900 mb-4">Overview</p>
              <p className="text-gray-700 leading-relaxed">{internship.description}</p>
            </div>

            {/* Key Responsibilities */}
            {responsibilities.length > 0 && (
              <div className="mb-8">
                <p className="font-bold text-xl text-gray-900 mb-4">Key Responsibilities</p>
                <ul className="space-y-3 list-disc pl-6">
                  {responsibilities.map((item) => (
                    <li key={item} className="text-gray-700 leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Qualifications and Skills */}
            {requirements.length > 0 && (
              <div className="mb-8">
                <p className="font-bold text-xl text-gray-900 mb-4">Qualifications and Skills</p>
                <ul className="space-y-3 list-disc pl-6">
                  {requirements.map((item) => (
                    <li key={item} className="text-gray-700 leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Why Join Us */}
            <div className="mb-8">
              <p className="font-bold text-xl text-gray-900 mb-4">Why Join Us?</p>
              
              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>Impactful & Innovative Work:</strong> Contribute to cutting-edge projects in AI, robotics, and technology that are shaping the future across multiple industries including education, healthcare, travel, space exploration, and more.
              </p>
              
              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>Fully Remote & Flexible Schedule:</strong> This internship is entirely remote, allowing you to contribute from anywhere. You can choose to work full-time (up to 40 hours per week) or part-time (a minimum of 8-10 hours per week) based on your availability.
              </p>
              
              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>On-site Internship (Optional):</strong> If interested, we can offer onsite internships at two locations: Austin, Texas, and Lemnos, Greece.
              </p>
              
              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>Work on Advanced Technologies:</strong> Gain hands-on experience with state-of-the-art tools, frameworks, and methodologies in your field, working on real-world applications that make a difference.
              </p>
              
              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>Interdisciplinary Collaboration:</strong> Work alongside experts from diverse fields including AI researchers, robotics engineers, data scientists, designers, and business strategists, expanding your professional network and skillset.
              </p>
              
              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>Professional Growth & Development:</strong> Build practical skills, contribute to research publications, and gain experience that will accelerate your career in technology and innovation.
              </p>
            </div>

            {/* Application CTA */}
            <div className="mt-12 p-8 bg-blue-50 rounded-lg border-2 border-[#00349B]">
              <h3 className="text-2xl font-bold mb-4 text-[#00349B]">Ready to Apply?</h3>
              <p className="text-gray-700 mb-6">
                Join our team and help shape the future of AI and robotics. Fill out our application form to get started.
              </p>
              <Link href="/internships">
                <Button className="bg-[#00349B] hover:bg-[#002775]">
                  Apply Now →
                </Button>
              </Link>
            </div>
          </article>
        </Container>
      </Section>
    </>
  )
}
