import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Container, Section } from '@/components/layout'
import { formatDate } from '@/lib/utils'
import { getBlogPosts } from '@/lib/strapi'

export const metadata: Metadata = {
  title: 'Blogs | Flo Labs R&D International',
  description: 'Explore Blogs on AI Breakthroughs, Internships & Emerging Tech Trends - Stay ahead with Flo Labs R&D.',
}

export const revalidate = 60 // Revalidate every 60 seconds

export default async function BlogsPage() {
  const blogPosts = await getBlogPosts()
  
  return (
    <>
      {/* Hero Section - Matching WordPress */}
      <Section className="bg-white py-16">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
              BLOGS
            </h1>
            
            <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-gray-800">
              Explore Blogs on AI Breakthroughs, Internships & Emerging Tech Trends
            </h2>

            {/* Hero Image */}
            <div className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
              <Image
                src="/Frame-26-1.jpg"
                alt="blogs page image"
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="text-lg text-gray-700 leading-relaxed space-y-4">
              <p>
                Welcome to Flo Labs R&D Blogs- your gateway to the world of AI innovation,{' '}
                <Link href="/internships" className="text-[#00349B] hover:underline font-semibold">
                  hands-on internships
                </Link>
                , and cutting-edge tech trends. Whether you&apos;re a student, professional, or tech enthusiast, our blogs are here to inform, inspire, and{' '}
                <a 
                  href="https://www.linkedin.com/pulse/tech-journey-beginners-guide-nouwen-mokua-7rpqf/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#00349B] hover:underline font-semibold"
                >
                  power up your tech journey
                </a>
                {' '}into the future of technology. Dive in and stay ahead!
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Blog Posts Grid */}
      <Section className="bg-white">
        <Container>
          {blogPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600 mb-6">
                No blog posts available at the moment.
              </p>
              <p className="text-gray-500">
                Check back soon for updates from our team!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blogs/${post.slug}`}
                  className="group"
                >
                  <article className="flo-card h-full hover:shadow-xl transition-all duration-300">
                    <div className="mb-4">
                      <h2 className="text-xl font-bold text-[#00349B] group-hover:text-[#002775] transition-colors mb-3">
                        {post.title}
                      </h2>
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                        <span>{post.author}</span>
                        <span>•</span>
                        <time dateTime={post.publishedDate}>
                          {formatDate(post.publishedDate)}
                        </time>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-blue-50 text-[#00349B] text-xs rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </article>
                </Link>
              ))}
            </div>
          )}
        </Container>
      </Section>

      {/* Newsletter Section */}
      <Section className="flo-blue-section">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Stay Updated
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Get the latest insights on AI, robotics, and technology innovation delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900"
              />
              <button className="px-6 py-3 bg-white text-[#00349B] font-semibold rounded-lg hover:bg-gray-100 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
