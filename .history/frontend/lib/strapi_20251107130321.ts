// Strapi API Helper Functions
// Based on official Strapi v5 documentation

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN

interface StrapiResponse<T> {
  data: T
  meta?: {
    pagination?: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

interface StrapiAttributes {
  createdAt: string
  updatedAt: string
  publishedAt?: string
}

// Internship interface based on WordPress data
export interface Internship extends StrapiAttributes {
  id: number
  documentId: string
  title: string
  slug: string
  category: 'Engineering' | 'Marketing' | 'Design' | 'Business' | 'Science' | 'Operations' | 'Research' | 'Legal'
  description: string
  requirements?: string
  responsibilities?: string
  status: 'Open' | 'Closed'
  featured: boolean
  applicationUrl?: string
  location?: string
  duration?: string
  type?: string
}

export interface Project extends StrapiAttributes {
  id: number
  documentId: string
  title: string
  description: string
  image?: {
    url: string
    alternativeText?: string
  }
  link?: string
  order: number
  active: boolean
}

export interface BlogPost extends StrapiAttributes {
  id: number
  documentId: string
  title: string
  slug: string
  author: string
  publishedDate: string
  featuredImage?: {
    url: string
    alternativeText?: string
  }
  content: string
  excerpt?: string
  category?: string
  published: boolean
}

export interface TeamMember extends StrapiAttributes {
  id: number
  documentId: string
  name: string
  role: string
  bio?: string
  image?: {
    url: string
    alternativeText?: string
  }
  order: number
}

export interface Page extends StrapiAttributes {
  id: number
  documentId: string
  title: string
  slug: string
  content: string
  seo?: {
    metaTitle?: string
    metaDescription?: string
  }
}

// Generic fetch function
async function fetchAPI<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${STRAPI_URL}/api${path}`
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }

  if (options.headers) {
    Object.assign(headers, options.headers)
  }

  if (STRAPI_TOKEN) {
    headers['Authorization'] = `Bearer ${STRAPI_TOKEN}`
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    })

    if (!response.ok) {
      throw new Error(`Strapi API error: ${response.status} ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Strapi fetch error:', error)
    throw error
  }
}

// Internship API calls
export async function getInternships(filters?: {
  category?: string
  status?: string
  search?: string
}): Promise<Internship[]> {
  let query = '/internships?populate=*'
  
  if (filters?.category) {
    query += `&filters[category][$eq]=${filters.category}`
  }
  
  if (filters?.status) {
    query += `&filters[status][$eq]=${filters.status}`
  }
  
  if (filters?.search) {
    query += `&filters[$or][0][title][$containsi]=${filters.search}`
    query += `&filters[$or][1][description][$containsi]=${filters.search}`
  }

  const response = await fetchAPI<StrapiResponse<Internship[]>>(query)
  return response.data || []
}

export async function getInternshipBySlug(slug: string): Promise<Internship | null> {
  const response = await fetchAPI<StrapiResponse<Internship[]>>(
    `/internships?filters[slug][$eq]=${slug}&populate=*`
  )
  return response.data?.[0] || null
}

export async function getFeaturedInternships(): Promise<Internship[]> {
  const response = await fetchAPI<StrapiResponse<Internship[]>>(
    '/internships?filters[featured][$eq]=true&filters[status][$eq]=Open&populate=*'
  )
  return response.data || []
}

// Project API calls
export async function getProjects(): Promise<Project[]> {
  const response = await fetchAPI<StrapiResponse<Project[]>>(
    '/projects?filters[active][$eq]=true&populate=*&sort=order:asc'
  )
  return response.data || []
}

export async function getProjectById(id: number): Promise<Project | null> {
  const response = await fetchAPI<StrapiResponse<Project>>(
    `/projects/${id}?populate=*`
  )
  return response.data || null
}

// Blog API calls
export async function getBlogPosts(): Promise<BlogPost[]> {
  const response = await fetchAPI<StrapiResponse<BlogPost[]>>(
    '/blog-posts?filters[published][$eq]=true&populate=*&sort=publishedDate:desc'
  )
  return response.data || []
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const response = await fetchAPI<StrapiResponse<BlogPost[]>>(
    `/blog-posts?filters[slug][$eq]=${slug}&populate=*`
  )
  return response.data?.[0] || null
}

// Team API calls
export async function getTeamMembers(): Promise<TeamMember[]> {
  const response = await fetchAPI<StrapiResponse<TeamMember[]>>(
    '/team-members?populate=*&sort=order:asc'
  )
  return response.data || []
}

// Page API calls
export async function getPageBySlug(slug: string): Promise<Page | null> {
  const response = await fetchAPI<StrapiResponse<Page[]>>(
    `/pages?filters[slug][$eq]=${slug}&populate=*`
  )
  return response.data?.[0] || null
}

// Image URL helper
export function getStrapiImageUrl(imageUrl?: string): string | null {
  if (!imageUrl) return null
  
  // If already a full URL, return as-is
  if (imageUrl.startsWith('http')) {
    return imageUrl
  }
  
  // Otherwise, prepend Strapi URL
  return `${STRAPI_URL}${imageUrl}`
}

// Mock data for development (until Strapi is set up)
export const mockInternships: Internship[] = [
  {
    id: 1,
    documentId: 'ai-agi-intern',
    title: 'AI/AGI Intern',
    slug: 'ai-agi-intern',
    category: 'Research',
    description: 'Work on cutting-edge AI and AGI research projects. Collaborate with researchers to advance artificial intelligence capabilities.',
    requirements: 'Strong background in machine learning, Python, TensorFlow/PyTorch. Research experience preferred.',
    responsibilities: 'Implement ML algorithms, conduct experiments, analyze results, document findings.',
    status: 'Open',
    featured: true,
    location: 'Remote',
    duration: '3-6 months',
    type: 'Internship',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    publishedAt: new Date().toISOString(),
  },
  {
    id: 2,
    documentId: 'ui-ux-design-intern',
    title: 'UI/UX Design Intern',
    slug: 'ui-ux-design-intern',
    category: 'Design',
    description: 'Design intuitive interfaces for our robotics control systems. Create user-centered designs that enhance the human-robot interaction.',
    requirements: 'Proficiency in Figma, Adobe XD, or similar tools. Portfolio required.',
    responsibilities: 'Create wireframes, prototypes, conduct user research, collaborate with developers.',
    status: 'Open',
    featured: true,
    location: 'Remote',
    duration: '3-6 months',
    type: 'Internship',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    publishedAt: new Date().toISOString(),
  },
]
