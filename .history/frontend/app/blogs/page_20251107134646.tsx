import { Metadata } from 'next'
import Link from 'next/link'
import { Container, Section } from '@/components/layout'
import { formatDate } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Blog | Flo Labs R&D International',
  description: 'Read the latest insights, research updates, and news from Flo Labs on AI, robotics, and emerging technologies.',
}

// Mock blog posts - these should match the ones in blogs/[slug]/page.tsx
// In production, both will fetch from Strapi
const mockBlogPosts = [
  {
    id: 1,
    slug: 'future-of-ai-robotics',
    title: 'The Future of AI and Robotics: Trends for 2025',
    excerpt: 'Explore the latest trends shaping the future of artificial intelligence and robotics, from AGI advancements to human-robot collaboration.',
    author: 'Flo Labs Team',
    publishedAt: new Date('2025-01-15').toISOString(),
    tags: ['AI', 'Robotics', 'Future Tech'],
  },
  {
    id: 2,
    slug: 'machine-learning-best-practices',
    title: 'Machine Learning Best Practices for 2025',
    excerpt: 'Learn the essential best practices for building robust machine learning models in production environments.',
    author: 'Flo Labs Team',
    publishedAt: new Date('2025-01-10').toISOString(),
    tags: ['Machine Learning', 'Best Practices', 'AI'],
  },
  {
    id: 3,
    slug: 'internship-success-stories',
    title: 'Success Stories from Our Interns',
    excerpt: 'Hear from past interns about their experiences at Flo Labs and how the program helped launch their careers in tech.',
    author: 'Flo Labs Team',
    publishedAt: new Date('2025-01-05').toISOString(),
    tags: ['Internships', 'Success Stories', 'Careers'],
  },
]

export default function BlogsPage() {
  return (
    <>
      {/* Hero Section */}
      <Section className="flo-blue-section">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Blog
            </h1>
            <p className="text-xl text-white/90">
              Insights, research updates, and news from the Flo Labs team
            </p>
          </div>
        </Container>
      </Section>

      {/* Blog Posts Grid */}
      <Section className="bg-white">
        <Container>
          {mockBlogPosts.length === 0 ? (
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
              {mockBlogPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blogs/${post.slug}`}
                  className="group"
                >
                  <article className="flo-card h-full hover:shadow-xl transition-all duration-300">
                    <div className="mb-4">
                      <h2 className="text-xl font-bold text-[#0047AB] group-hover:text-[#003580] transition-colors mb-3">
                        {post.title}
                      </h2>
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                        <span>{post.author}</span>
                        <span>•</span>
                        <time dateTime={post.publishedAt}>
                          {formatDate(post.publishedAt)}
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
                            className="px-3 py-1 bg-blue-50 text-[#0047AB] text-xs rounded-full"
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
              <button className="px-6 py-3 bg-white text-[#0047AB] font-semibold rounded-lg hover:bg-gray-100 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
