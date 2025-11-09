import Link from 'next/link'
import { getInternships, getStrapiImageUrl } from '@/lib/strapi'
import { Container, Section } from '@/components/layout'
import { Button } from '@/components/button'
import InternshipCarousel from '@/components/internship-carousel'

export default async function InternshipsPage() {
  const internships = await getInternships({ status: 'Open' })
  
  // Carousel images (uploaded to Strapi)
  const carouselImages = [
    {
      url: getStrapiImageUrl('/uploads/internship_carousel_1_86c69d1387.png') || '',
      alternativeText: 'Remote Internship Opportunities for Students'
    },
    {
      url: getStrapiImageUrl('/uploads/internship_carousel_2_ed94b7ea6d.png') || '',
      alternativeText: 'Remote Internship Opportunities for professionals across the globe'
    },
    {
      url: getStrapiImageUrl('/uploads/internship_carousel_3_d8791cb75a.png') || '',
      alternativeText: 'Hands-on robotics internship opportunity for remote learners'
    }
  ]

  return (
    <main className="min-h-screen bg-white pt-20">
      <Section className="py-16">
        <Container>
          {/* Carousel */}
          <InternshipCarousel images={carouselImages} />
          
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#0047AB]">
              Internship Positions
            </h1>
            <p className="text-xl text-gray-600">
              Apply to your passion
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
                  className="group block p-6 bg-white border border-gray-200 rounded-lg hover:border-[#0047AB] hover:shadow-lg transition-all"
                >
                  <h3 className="text-xl font-semibold mb-4 text-[#0047AB] group-hover:text-[#003580]">
                    {internship.title}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                    {internship.location && (
                      <span className="flex items-center gap-1">
                        <span>📍</span>
                        {internship.location}
                      </span>
                    )}
                    {internship.duration && (
                      <span className="flex items-center gap-1">
                        <span>⏱️</span>
                        {internship.duration}
                      </span>
                    )}
                  </div>
                  <Button variant="outline" className="w-full border-[#0047AB] text-[#0047AB] hover:bg-[#0047AB] hover:text-white">
                    More Details →
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
