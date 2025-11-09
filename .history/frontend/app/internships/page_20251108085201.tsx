import Link from 'next/link'
import { getInternships } from '@/lib/strapi'
import { Container, Section } from '@/components/layout'
import { Button } from '@/components/button'

export default async function InternshipsPage() {
  const internships = await getInternships({ status: 'Open' })

  return (
    <main className="min-h-screen bg-white pt-20">
      <Section className="py-16">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Internship Opportunities
            </h1>
            <p className="text-xl text-gray-600">
              Join our team and work on cutting-edge technology.
            </p>
          </div>

          {internships.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">
                No open internships at the moment. Check back soon!
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {internships.map((internship) => (
                <Link
                  key={internship.id}
                  href={`/internships/${internship.slug}`}
                  className="group block p-6 bg-white border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-lg transition-all"
                >
                  <h3 className="text-xl font-semibold mb-4">
                    {internship.title}
                  </h3>
                  <p className="text-gray-700 mb-4">
                    {internship.description}
                  </p>
                  <Button variant="outline" className="w-full">
                    Learn More
                  </Button>
                </Link>
              ))}
            </div>
          )}
        </Container>
      </Section>
    </main>
  )
}
