import { Metadata } from 'next'
import { Container, Section } from '@/components/layout'

export const metadata: Metadata = {
  title: 'Privacy Policy | Flo Labs R&D International',
  description: 'Privacy Policy for Flo Labs R&D International - Learn how we collect, use, and protect your personal information.',
}

export default function PrivacyPage() {
  return (
    <>
      {/* Hero Section */}
      <Section className="flo-blue-section">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-white/90">
              Last Updated: November 2024
            </p>
          </div>
        </Container>
      </Section>

      {/* Privacy Policy Content */}
      <Section className="bg-white">
        <Container>
          <div className="max-w-4xl mx-auto prose prose-lg">
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-[#00349B] mb-4">Introduction</h2>
                <p className="text-gray-700 leading-relaxed">
                  Flo Labs R&D International (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy. 
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you 
                  visit our website flolabs.international or participate in our programs.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-[#00349B] mb-4">Information We Collect</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We may collect information about you in a variety of ways. The information we may collect on the 
                  website includes:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>
                    <strong>Personal Data:</strong> Name, email address, phone number, and other contact information 
                    you provide when applying for internships or contacting us.
                  </li>
                  <li>
                    <strong>Educational Information:</strong> Resume, academic records, and other information relevant 
                    to internship applications.
                  </li>
                  <li>
                    <strong>Usage Data:</strong> Information about how you use our website, including your IP address, 
                    browser type, and pages visited.
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-[#00349B] mb-4">How We Use Your Information</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We use the information we collect to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Process and evaluate internship applications</li>
                  <li>Communicate with you about programs, opportunities, and updates</li>
                  <li>Improve our website and services</li>
                  <li>Send you marketing communications (with your consent)</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-[#00349B] mb-4">Information Sharing</h2>
                <p className="text-gray-700 leading-relaxed">
                  We do not sell, trade, or rent your personal information to third parties. We may share your 
                  information with:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-4">
                  <li>Service providers who assist us in operating our website and programs (e.g., HubSpot for forms)</li>
                  <li>Legal authorities when required by law or to protect our rights</li>
                  <li>Partner organizations for educational and research purposes (with your consent)</li>
                </ul>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-[#00349B] mb-4">Data Security</h2>
                <p className="text-gray-700 leading-relaxed">
                  We use administrative, technical, and physical security measures to protect your personal information. 
                  However, no electronic transmission over the Internet or information storage technology can be 
                  guaranteed to be 100% secure.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-[#00349B] mb-4">Your Rights</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  You have the right to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Access the personal information we hold about you</li>
                  <li>Request correction of inaccurate information</li>
                  <li>Request deletion of your personal information</li>
                  <li>Opt out of marketing communications</li>
                  <li>Withdraw consent for data processing</li>
                </ul>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-[#00349B] mb-4">Cookies and Tracking</h2>
                <p className="text-gray-700 leading-relaxed">
                  We use cookies and similar tracking technologies to track activity on our website and hold certain 
                  information. You can instruct your browser to refuse all cookies or to indicate when a cookie is 
                  being sent.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-[#00349B] mb-4">Third-Party Services</h2>
                <p className="text-gray-700 leading-relaxed">
                  Our website may contain links to third-party websites and uses services like HubSpot for form processing. 
                  These third parties have their own privacy policies, and we are not responsible for their practices.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-[#00349B] mb-4">Children&apos;s Privacy</h2>
                <p className="text-gray-700 leading-relaxed">
                  Our services are not directed to children under 13. We do not knowingly collect personal information 
                  from children under 13. If you are a parent or guardian and believe your child has provided us with 
                  personal information, please contact us.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-[#00349B] mb-4">Changes to This Policy</h2>
                <p className="text-gray-700 leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting 
                  the new Privacy Policy on this page and updating the &quot;Last Updated&quot; date.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-[#00349B] mb-4">Contact Us</h2>
                <p className="text-gray-700 leading-relaxed">
                  If you have questions about this Privacy Policy or how we handle your personal information, please 
                  contact us through our <a href="/contact" className="text-[#00349B] hover:underline">contact page</a>.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
