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

export interface InternshipFilters {
  category?: InternshipCategory
  status?: InternshipStatus
  search?: string
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
