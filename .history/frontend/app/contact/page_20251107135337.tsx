import { Metadata } from 'next'
import Link from 'next/link'
import { Container, Section } from '@/components/layout'
import { HubSpotForm } from '@/components/hubspot-form'

export const metadata: Metadata = {
  title: 'Contact Us | Flo Labs R&D International',
  description: 'Get in touch with Flo Labs. Whether you have questions about our internships, projects, or want to collaborate, we\'d love to hear from you.',
}

export default function ContactPage() {
  return (
    <>
      {/* Hero Section */}
      <Section className="flo-blue-section">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Get In Touch
            </h1>
            <p className="text-xl text-white/90">
              Have questions? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
            </p>
          </div>
        </Container>
      </Section>

      {/* Contact Form Section */}
      <Section className="bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-[#0047AB] mb-6">
                Contact Information
              </h2>
              
              <p className="text-gray-700 mb-8 leading-relaxed">
                Whether you&apos;re interested in our internship programs, want to learn more about our projects, 
                or have a collaboration proposal, we&apos;re here to help.
              </p>

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">General Inquiries</h3>
                  <p className="text-gray-700">
                    For general questions about Flo Labs and our programs
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Internship Applications</h3>
                  <p className="text-gray-700">
                    Visit our{' '}
                    <Link href="/internships" className="text-[#0047AB] hover:underline">
                      Internships page
                    </Link>
                    {' '}to apply for specific positions
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Partnership Opportunities</h3>
                  <p className="text-gray-700">
                    Interested in collaborating on research or projects? Let us know!
                  </p>
                </div>
              </div>

              <div className="mt-12 p-6 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-[#0047AB] mb-3">Quick Links</h3>
                <ul className="space-y-2">
                  <li>
                    <Link 
                      href="/internships" 
                      className="text-gray-700 hover:text-[#0047AB] transition-colors flex items-center gap-2"
                    >
                      → Browse Internship Opportunities
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/projects" 
                      className="text-gray-700 hover:text-[#0047AB] transition-colors flex items-center gap-2"
                    >
                      → View Our Projects
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/about" 
                      className="text-gray-700 hover:text-[#0047AB] transition-colors flex items-center gap-2"
                    >
                      → Learn About Flo Labs
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/blogs" 
                      className="text-gray-700 hover:text-[#0047AB] transition-colors flex items-center gap-2"
                    >
                      → Read Our Blog
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Contact Form */}
            <div className="flo-card">
              <h2 className="text-2xl font-bold text-[#0047AB] mb-6">
                Send Us a Message
              </h2>
              
              <HubSpotForm
                portalId="45023159"
                formId="0133caf3-53e5-403f-a894-cd0246642913"
                region="na1"
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section className="flo-blue-section">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Join Our Community
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Stay updated on our latest research, projects, and internship opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/internships"
                className="px-8 py-3 bg-white text-[#0047AB] font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                Explore Internships
              </Link>
              <Link
                href="/blogs"
                className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-[#0047AB] transition-colors"
              >
                Read Our Blog
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
