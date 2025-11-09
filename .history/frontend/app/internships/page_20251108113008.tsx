import Link from 'next/link'
import { getInternships, getStrapiImageUrl } from '@/lib/strapi'
import { Container, Section } from '@/components/layout'
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
            <>
              {/* Single-column list layout like WordPress */}
              <div className="max-w-3xl mx-auto space-y-4 mb-16">
                {internships.map((internship) => (
                  <Link
                    key={internship.id}
                    href={`/internships/${internship.slug}`}
                    className="group block p-6 bg-white border border-gray-200 rounded-lg hover:border-[#0047AB] hover:shadow-md transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold text-gray-900 group-hover:text-[#0047AB]">
                        {internship.title}
                      </h3>
                      <span className="text-[#0047AB] font-medium">More Details →</span>
                    </div>
                  </Link>
                ))}
              </div>

              {/* About The Internship Section */}
              <div className="max-w-4xl mx-auto mb-16">
                <h2 className="text-3xl font-bold mb-6 text-[#0047AB]">About The Internship</h2>
                
                <div className="prose prose-lg max-w-none space-y-6 text-gray-700">
                  <h3 className="text-2xl font-bold text-gray-900">Flexible. Dynamic. Inspiring.</h3>
                  <p>
                    We are focused on creating the future—the robotics, the AI, the algorithms, 
                    the technologies that will define tomorrow. Our internship program is designed 
                    for those who want to do more than just observe—we want you to contribute, 
                    innovate, and help shape the next generation of intelligent systems.
                  </p>

                  <h3 className="text-2xl font-bold text-gray-900 mt-8">Remote Internship Positions</h3>
                  <p>
                    All our internships are remote by default, offering you the flexibility to work 
                    from anywhere in the world. We believe that great talent isn&apos;t confined by geography, 
                    and our distributed team allows us to bring together the best minds from across the globe.
                  </p>
                  <p>
                    <strong>Time Commitment:</strong> Our internships are flexible. You can work full-time 
                    (up to 40 hours per week) or part-time (minimum 8-10 hours per week), depending on 
                    your availability and schedule. We understand that students and professionals have 
                    varying commitments, and we&apos;re happy to accommodate.
                  </p>

                  <h3 className="text-2xl font-bold text-gray-900 mt-8">What We Do:</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-xl font-bold text-gray-900">Build Future of Travel</h4>
                      <p>
                        We&apos;re developing autonomous vehicles and AI-driven transportation systems 
                        that will revolutionize how people and goods move around the world.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xl font-bold text-gray-900">Pushing Boundaries</h4>
                      <p>
                        From humanoid robotics to AGI research, we&apos;re working on projects that push 
                        the limits of what&apos;s possible with artificial intelligence and machine learning.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xl font-bold text-gray-900">Revolutionize Industries</h4>
                      <p>
                        Whether it&apos;s healthcare, agriculture, or space exploration, our AI and robotics 
                        solutions are designed to transform entire industries and improve lives.
                      </p>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mt-8">The Bottom Line:</h3>
                  <p>
                    If you&apos;re passionate about AI, robotics, or any of the cutting-edge fields we work in, 
                    and you want to gain hands-on experience while contributing to real-world projects, 
                    we&apos;d love to hear from you. Explore our open positions above and apply to the role 
                    that matches your interests and skills.
                  </p>
                  <p className="font-semibold">
                    Ready to shape the future? Let&apos;s build it together.
                  </p>
                </div>
              </div>
            </>
          )}
        </Container>
      </Section>
    </main>
  )
}
