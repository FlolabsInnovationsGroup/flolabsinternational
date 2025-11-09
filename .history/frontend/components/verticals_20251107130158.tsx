'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Container, Section, SectionTitle } from './layout'

const verticals = [
  {
    id: 1,
    title: 'Engineering',
    description: 'Software, hardware, and systems engineering roles',
    icon: '⚙️',
    count: 15,
    href: '/internships?category=Engineering',
  },
  {
    id: 2,
    title: 'Research & AI',
    description: 'Machine learning, AI research, and data science',
    icon: '🔬',
    count: 12,
    href: '/internships?category=Research',
  },
  {
    id: 3,
    title: 'Design',
    description: 'UI/UX design and user experience research',
    icon: '🎨',
    count: 8,
    href: '/internships?category=Design',
  },
  {
    id: 4,
    title: 'Business',
    description: 'Marketing, operations, and business development',
    icon: '💼',
    count: 10,
    href: '/internships?category=Business',
  },
]

export function Verticals() {
  return (
    <Section>
      <Container>
        <SectionTitle subtitle="Find opportunities across multiple disciplines">
          Internship Categories
        </SectionTitle>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {verticals.map((vertical, index) => (
            <motion.div
              key={vertical.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Link
                href={vertical.href}
                className="block p-8 bg-white border-2 border-gray-100 rounded-xl hover:border-blue-500 hover:shadow-lg transition-all duration-300 group text-center"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                  {vertical.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                  {vertical.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  {vertical.description}
                </p>
                <span className="inline-block px-3 py-1 text-sm font-medium text-blue-600 bg-blue-50 rounded-full">
                  {vertical.count} positions
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
