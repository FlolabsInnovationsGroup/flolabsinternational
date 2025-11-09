import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Container, Section } from '@/components/layout'
import { HubSpotForm } from '@/components/hubspot-form'
import { Button } from '@/components/button'
import Link from 'next/link'

// Mock internship data - will be replaced with Strapi data
const mockInternships = [
  {
    id: 1,
    slug: 'machine-learning-engineer',
    title: 'Machine Learning Engineer Intern',
    category: 'Engineering' as const,
    status: 'Open' as const,
    description: 'Join our AI research team and work on cutting-edge machine learning projects.',
    shortDescription: 'Work on cutting-edge ML projects with our research team.',
    requirements: [
      'Understanding of machine learning fundamentals',
      'Experience with Python and TensorFlow or PyTorch',
      'Strong mathematical background',
      'Ability to work independently and in teams',
    ],
    responsibilities: [
      'Develop and train machine learning models',
      'Analyze large datasets and extract insights',
      'Collaborate with researchers on AI projects',
      'Document findings and present results',
    ],
    whatYouWillLearn: [
      'Advanced machine learning techniques',
      'Deep learning architectures',
      'Model deployment and optimization',
      'Research methodologies in AI',
    ],
    benefits: [
      'Work with industry experts',
      'Flexible remote schedule',
      'Access to cutting-edge tools and resources',
      'Potential for paid opportunities after completion',
    ],
    duration: '3-6 months',
    timeCommitment: 'Minimum 10 hours/week',
    location: 'Remote',
    remote: true,
    paid: false,
    hubspotFormId: '0133caf3-53e5-403f-a894-cd0246642913',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

type PageProps = {
  params: Promise<{ slug: string }>
}

// Generate static params for all internships
export async function generateStaticParams() {
  // In production, fetch from Strapi
  // const internships = await getInternships()
  
  return mockInternships.map((internship) => ({
    slug: internship.slug,
  }))
}

// Generate metadata for SEO
export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params
  const internship = mockInternships.find((i) => i.slug === params.slug)

  if (!internship) {
    return {
      title: 'Internship Not Found',
    }
  }

  return {
    title: `${internship.title} | Flo Labs Internships`,
    description: internship.shortDescription || internship.description,
    openGraph: {
      title: internship.title,
      description: internship.shortDescription || internship.description,
      type: 'website',
    },
  }
}

export default async function InternshipPage(props: PageProps) {
  const params = await props.params
  const internship = mockInternships.find((i) => i.slug === params.slug)

  if (!internship) {
    notFound()
  }

  return (
    <>
      {/* Hero Section */}
      <Section className="flo-blue-section">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
                {internship.category}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  internship.status === 'Open'
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-500 text-white'
                }`}
              >
                {internship.status}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {internship.title}
            </h1>
            <p className="text-xl text-white/90 mb-6">{internship.shortDescription}</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-white/80">
              <div className="flex items-center gap-2">
                <span>📍</span>
                <span>{internship.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>⏱️</span>
                <span>{internship.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>💼</span>
                <span>{internship.timeCommitment}</span>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Main Content */}
      <Section className="bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column - Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <div>
                <h2 className="text-2xl font-bold mb-4 text-[#0047AB]">
                  About This Internship
                </h2>
                <p className="text-gray-700 leading-relaxed">{internship.description}</p>
              </div>

              {/* Responsibilities */}
              {internship.responsibilities && internship.responsibilities.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-4 text-[#0047AB]">
                    Responsibilities
                  </h2>
                  <ul className="space-y-2">
                    {internship.responsibilities.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-[#0047AB] mt-1">✓</span>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Requirements */}
              {internship.requirements && internship.requirements.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-4 text-[#0047AB]">
                    Requirements
                  </h2>
                  <ul className="space-y-2">
                    {internship.requirements.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-[#0047AB] mt-1">•</span>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* What You Will Learn */}
              {internship.whatYouWillLearn && internship.whatYouWillLearn.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-4 text-[#0047AB]">
                    What You&apos;ll Learn
                  </h2>
                  <ul className="space-y-2">
                    {internship.whatYouWillLearn.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-[#0047AB] mt-1">📚</span>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Benefits */}
              {internship.benefits && internship.benefits.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-4 text-[#0047AB]">Benefits</h2>
                  <ul className="space-y-2">
                    {internship.benefits.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-[#0047AB] mt-1">⭐</span>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Right Column - Application */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <div className="flo-card p-6">
                  <h3 className="text-xl font-bold mb-4 text-[#0047AB]">
                    Apply Now
                  </h3>
                  
                  {internship.status === 'Open' ? (
                    <>
                      <p className="text-gray-700 text-sm mb-6">
                        Ready to join our team? Fill out the application form below to get
                        started.
                      </p>
                      
                      {/* HubSpot Form */}
                      {internship.hubspotFormId && (
                        <HubSpotForm
                          formId={internship.hubspotFormId}
                          targetId={`internship-form-${internship.id}`}
                        />
                      )}
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-600 mb-4">
                        This position is currently closed.
                      </p>
                      <Link href="/internships">
                        <Button variant="outline">View Open Positions</Button>
                      </Link>
                    </div>
                  )}
                </div>

                {/* Quick Info Card */}
                <div className="flo-card p-6 mt-6">
                  <h4 className="font-bold mb-4 text-[#0047AB]">Quick Info</h4>
                  <dl className="space-y-3 text-sm">
                    <div>
                      <dt className="text-gray-600">Category</dt>
                      <dd className="font-semibold text-gray-900">{internship.category}</dd>
                    </div>
                    <div>
                      <dt className="text-gray-600">Location</dt>
                      <dd className="font-semibold text-gray-900">{internship.location}</dd>
                    </div>
                    <div>
                      <dt className="text-gray-600">Duration</dt>
                      <dd className="font-semibold text-gray-900">{internship.duration}</dd>
                    </div>
                    <div>
                      <dt className="text-gray-600">Time Commitment</dt>
                      <dd className="font-semibold text-gray-900">
                        {internship.timeCommitment}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-gray-600">Compensation</dt>
                      <dd className="font-semibold text-gray-900">
                        {internship.paid ? 'Paid' : 'Unpaid (Experience-based)'}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Related Internships */}
      <Section className="bg-gray-50">
        <Container>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-[#0047AB] mb-4">
              Other Open Positions
            </h2>
            <Link href="/internships">
              <Button variant="outline">View All Internships</Button>
            </Link>
          </div>
        </Container>
      </Section>
    </>
  )
}
