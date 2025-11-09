'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Container, Section } from '@/components/layout'
import InternshipCarousel from '@/components/internship-carousel'
import { getStrapiImageUrl } from '@/lib/strapi'

interface Internship {
  id: number
  title: string
  slug: string
  status: string
}

export default function InternshipsPage() {
  const [internships, setInternships] = useState<Internship[]>([])
  const [filteredInternships, setFilteredInternships] = useState<Internship[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  
  // Carousel images
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
  
  useEffect(() => {
    async function fetchInternships() {
      try {
        const response = await fetch('/api/internships')
        const data = await response.json()
        setInternships(data)
        setFilteredInternships(data)
      } catch (error) {
        console.error('Error fetching internships:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchInternships()
  }, [])
  
  useEffect(() => {
    const filtered = internships.filter(internship =>
      internship.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredInternships(filtered)
  }, [searchTerm, internships])

  return (
    <main className="min-h-screen bg-white pt-20">
      <Section className="py-16">
        <Container>
          {/* Carousel */}
          <InternshipCarousel images={carouselImages} />
          
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#00349B]">
              Internship Positions
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Apply to your passion
            </p>
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search internships..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 pl-12 border-2 border-gray-300 rounded-lg focus:border-[#00349B] focus:ring-2 focus:ring-[#00349B]/20 outline-none transition-all"
                />
                <svg
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#00349B]"></div>
              <p className="mt-4 text-gray-600">Loading internships...</p>
            </div>
          ) : (
            <>
              {filteredInternships.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-xl text-gray-600">
                    {searchTerm ? `No internships found matching "${searchTerm}"` : 'No open internships at the moment. Check back soon!'}
                  </p>
                </div>
              ) : (
                <>
                  {/* Internship Count */}
                  <div className="max-w-3xl mx-auto mb-6">
                    <p className="text-center text-gray-600">
                      Showing <strong>{filteredInternships.length}</strong> {filteredInternships.length === 1 ? 'position' : 'positions'}
                    </p>
                  </div>
                  
                  {/* Single-column list layout like WordPress */}
                  <div className="max-w-3xl mx-auto space-y-4 mb-16">
                    {filteredInternships.map((internship) => {
                      const getStatusClass = () => {
                        if (internship.status === 'Open') return 'bg-green-100 text-green-800'
                        if (internship.status === 'Filled') return 'bg-gray-100 text-gray-800'
                        return 'bg-yellow-100 text-yellow-800'
                      }
                      
                      return (
                        <Link
                          key={internship.id}
                          href={`/internships/${internship.slug}`}
                          className="group block p-6 bg-white border-2 border-gray-200 rounded-lg hover:border-[#00349B] hover:shadow-lg transition-all duration-200"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <h3 className="text-xl font-semibold text-gray-900 group-hover:text-[#00349B] transition-colors">
                                {internship.title}
                              </h3>
                              {internship.status && (
                                <span className={`inline-block mt-2 px-3 py-1 text-xs font-semibold rounded-full ${getStatusClass()}`}>
                                  {internship.status}
                                </span>
                              )}
                            </div>
                            <span className="text-[#00349B] font-medium flex items-center gap-2">
                              More Details 
                              <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </span>
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                </>
              )}
            </>
          )}

          {/* About The Internship Section */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-6 text-[#00349B]">About The Internship</h2>
                
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
