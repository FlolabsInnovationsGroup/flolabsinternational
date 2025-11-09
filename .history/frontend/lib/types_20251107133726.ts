// Shared TypeScript types for the application

export type InternshipCategory = 
  | 'Engineering' 
  | 'Marketing' 
  | 'Design' 
  | 'Business' 
  | 'Science' 
  | 'Operations' 
  | 'Research' 
  | 'Legal'

export type InternshipStatus = 'Open' | 'Closed'

export interface Internship {
  id: number
  slug: string
  title: string
  category: InternshipCategory
  status: InternshipStatus
  description: string
  shortDescription?: string
  requirements?: string[]
  responsibilities?: string[]
  whatYouWillLearn?: string[]
  benefits?: string[]
  duration?: string
  timeCommitment?: string
  location: string
  remote: boolean
  paid: boolean
  hubspotFormId?: string
  createdAt: string
  updatedAt: string
}

export interface InternshipFilters {
  category?: InternshipCategory
  status?: InternshipStatus
  search?: string
}

export interface Project {
  id: number
  slug: string
  title: string
  description: string
  link?: string
  image?: string
  technologies?: string[]
  createdAt: string
  updatedAt: string
}

export interface BlogPost {
  id: number
  slug: string
  title: string
  excerpt?: string
  content: string
  author: string
  publishedAt: string
  coverImage?: string
  tags?: string[]
  createdAt: string
  updatedAt: string
}

export interface Page {
  id: number
  slug: string
  title: string
  content: string
  createdAt: string
  updatedAt: string
}

export interface StrapiResponse<T> {
  data: T
  meta: {
    pagination?: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export interface NavLink {
  href: string
  label: string
  external?: boolean
}

export interface SiteConfig {
  name: string
  description: string
  url: string
  ogImage: string
  links: {
    github?: string
    twitter?: string
    linkedin?: string
  }
}
