import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Container, Section } from '@/components/layout'
import { formatDate } from '@/lib/utils'
import type { BlogPost } from '@/lib/types'

// Mock blog posts - will be replaced with Strapi data
const mockBlogPosts: BlogPost[] = [
  {
    id: 1,
    slug: 'future-of-ai-robotics',
    title: 'The Future of AI and Robotics: Trends for 2025',
    excerpt: 'Explore the latest trends shaping the future of artificial intelligence and robotics, from AGI advancements to human-robot collaboration.',
    content: `
# The Future of AI and Robotics: Trends for 2025

The landscape of artificial intelligence and robotics is evolving at an unprecedented pace. As we move through 2025, several key trends are emerging that will shape the future of these transformative technologies.

## Advancements in Artificial General Intelligence (AGI)

The quest for AGI continues to drive innovation across the industry. While true AGI remains on the horizon, we're seeing significant progress in creating AI systems that can handle multiple domains with increasing sophistication.

## Human-Robot Collaboration

The focus is shifting from robots replacing humans to robots augmenting human capabilities. New collaborative robots (cobots) are being designed with safety and ease of use in mind, enabling seamless integration into various work environments.

## AI Ethics and Responsible Development

As AI systems become more powerful, the importance of ethical development practices has never been greater. Organizations are implementing robust frameworks to ensure AI is developed and deployed responsibly.

## Multimodal AI Systems

The future of AI lies in systems that can process and understand multiple types of data simultaneously - text, images, audio, and video. This multimodal approach is enabling more natural and intuitive human-AI interactions.

## Edge AI and Distributed Intelligence

Moving AI processing closer to the data source is becoming increasingly important. Edge AI reduces latency, enhances privacy, and enables real-time decision-making in critical applications.

## Conclusion

The future of AI and robotics is bright and full of possibilities. At Flo Labs, we're committed to being at the forefront of these developments, training the next generation of innovators to tackle the challenges and opportunities that lie ahead.
    `,
    author: 'Flo Labs Team',
    publishedAt: new Date('2025-01-15').toISOString(),
    tags: ['AI', 'Robotics', 'Future Tech'],
  },
  {
    id: 2,
    slug: 'machine-learning-best-practices',
    title: 'Machine Learning Best Practices for 2025',
    excerpt: 'Learn the essential best practices for building robust machine learning models in production environments.',
    content: `
# Machine Learning Best Practices for 2025

Building production-ready machine learning models requires more than just achieving high accuracy on test data. Here are the essential best practices every ML practitioner should follow.

## Data Quality and Management

The foundation of any successful ML project is high-quality data. Implement robust data validation pipelines and maintain comprehensive data documentation.

## Model Versioning and Experiment Tracking

Track every experiment, model version, and hyperparameter configuration. Tools like MLflow and Weights & Biases make this process manageable at scale.

## Reproducibility

Ensure that your results can be reproduced by anyone on your team. Use seed values, version control for code and data, and document your environment setup.

## Monitoring and Maintenance

Deploy monitoring systems to track model performance in production. Be prepared to retrain models as data distributions shift over time.

## Ethical Considerations

Consider the broader implications of your models. Address potential biases in training data and ensure fair outcomes across different demographic groups.

## Conclusion

Following these best practices will help you build ML systems that are not only accurate but also maintainable, ethical, and production-ready.
    `,
    author: 'Flo Labs Team',
    publishedAt: new Date('2025-01-10').toISOString(),
    tags: ['Machine Learning', 'Best Practices', 'AI'],
    coverImage: null,
  },
  {
    id: 3,
    slug: 'internship-success-stories',
    title: 'Success Stories from Our Interns',
    excerpt: 'Hear from past interns about their experiences at Flo Labs and how the program helped launch their careers in tech.',
    content: `
# Success Stories from Our Interns

At Flo Labs, we're proud of the impact our internship program has had on the careers of aspiring technologists. Here are some inspiring stories from our alumni.

## From Intern to Machine Learning Engineer

One of our former interns joined the program with a passion for AI but limited practical experience. Through hands-on projects and mentorship, they developed the skills needed to land a full-time role as an ML engineer at a leading tech company.

## Building Real-World Projects

Our interns don't just learn theory - they build real products that solve actual problems. One team of interns developed a natural language processing tool that's now being used by our partner organizations.

## Growing a Professional Network

The connections made during our internship program often last a lifetime. Interns collaborate with industry experts, academic researchers, and fellow students from around the world.

## Developing Leadership Skills

We don't just teach technical skills - we help interns develop as leaders. Many of our alumni have gone on to lead their own teams and projects.

## The Flo Labs Difference

What sets our program apart is the combination of cutting-edge projects, expert mentorship, and a supportive community. We're not just preparing interns for jobs - we're preparing them to be innovators and leaders in their fields.

## Join Us

Ready to write your own success story? Check out our current internship opportunities and apply today.
    `,
    author: 'Flo Labs Team',
    publishedAt: new Date('2025-01-05').toISOString(),
    tags: ['Internships', 'Success Stories', 'Careers'],
    coverImage: null,
  },
]

interface BlogDetailPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  // In production, this would fetch from Strapi
  return mockBlogPosts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata(
  props: BlogDetailPageProps
): Promise<Metadata> {
  const params = await props.params
  const post = mockBlogPosts.find((p) => p.slug === params.slug)

  if (!post) {
    return {
      title: 'Blog Post Not Found | Flo Labs',
    }
  }

  return {
    title: `${post.title} | Flo Labs Blog`,
    description: post.excerpt,
  }
}

export default async function BlogDetailPage(props: BlogDetailPageProps) {
  const params = await props.params
  const post = mockBlogPosts.find((p) => p.slug === params.slug)

  if (!post) {
    notFound()
  }

  // Get related posts (exclude current post)
  const relatedPosts = mockBlogPosts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 2)

  return (
    <>
      {/* Hero Section */}
      <Section className="flo-blue-section">
        <Container>
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <div className="mb-6">
              <Link
                href="/blogs"
                className="text-white/80 hover:text-white transition-colors"
              >
                ← Back to Blog
              </Link>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-white/90">
              <span className="font-medium">{post.author}</span>
              <span>•</span>
              <time dateTime={post.publishedAt}>
                {formatDate(post.publishedAt)}
              </time>
            </div>
          </div>
        </Container>
      </Section>

      {/* Content */}
      <Section className="bg-white">
        <Container>
          <div className="max-w-4xl mx-auto">
            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 bg-blue-50 text-[#0047AB] text-sm font-medium rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Article Content */}
            <article className="prose prose-lg max-w-none">
              <div className="whitespace-pre-wrap leading-relaxed text-gray-800">
                {post.content}
              </div>
            </article>
          </div>
        </Container>
      </Section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <Section className="bg-gray-50">
          <Container>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-[#0047AB] mb-8">
                Related Articles
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.id}
                    href={`/blogs/${relatedPost.slug}`}
                    className="group"
                  >
                    <article className="flo-card h-full hover:shadow-xl transition-all duration-300">
                      <h3 className="text-xl font-bold text-[#0047AB] group-hover:text-[#003580] transition-colors mb-3">
                        {relatedPost.title}
                      </h3>
                      <p className="text-gray-700 mb-3 line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                      <div className="text-sm text-gray-500">
                        {formatDate(relatedPost.publishedAt)}
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* Call to Action */}
      <Section className="flo-blue-section">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Interested in Working With Us?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join our team and contribute to cutting-edge AI and robotics research.
            </p>
            <Link
              href="/internships"
              className="inline-block px-8 py-3 bg-white text-[#0047AB] font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              View Opportunities
            </Link>
          </div>
        </Container>
      </Section>
    </>
  )
}
