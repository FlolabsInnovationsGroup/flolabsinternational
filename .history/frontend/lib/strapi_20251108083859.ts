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

// Internship interface matching Strapi schema
export interface Internship extends StrapiAttributes {
  id: number
  documentId: string
  title: string
  slug: string
  status: 'Open' | 'Closed' | 'Filled'
  location: string
  duration?: string
  description: string
  requirements?: string
  responsibilities?: string
  hubspotFormId?: string
  images?: {
    url: string
    alternativeText?: string
  }[]
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
// Based on WordPress export data from flolabs.international
export const mockInternships: Internship[] = [
  {
    id: 1,
    documentId: 'ai-agi-intern',
    title: 'AI/AGI Intern',
    slug: 'ai-agi-intern',
    category: 'Research',
    description: 'Work on cutting-edge AI and AGI research projects. Collaborate with researchers to advance artificial intelligence capabilities and contribute to the development of next-generation AI systems.',
    requirements: 'Strong background in machine learning, deep learning, and AI research. Proficiency in Python, TensorFlow, and PyTorch. Research experience in AI/ML preferred. Strong analytical and problem-solving skills.',
    responsibilities: 'Implement ML algorithms, conduct AI research experiments, analyze results, collaborate with research team, document findings, contribute to AGI development initiatives.',
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
    documentId: 'machine-learning-engineering-intern',
    title: 'Machine Learning Engineering Intern',
    slug: 'machine-learning-engineering-intern',
    category: 'Engineering',
    description: 'Develop and implement machine learning models for our humanoid robot. Work on pattern recognition, neural networks, and AI integration to enhance robot functionality.',
    requirements: 'Strong foundation in machine learning algorithms and neural networks. Proficiency in Python, TensorFlow, and PyTorch. Experience with data analysis and model optimization. Understanding of computer vision and NLP is a plus.',
    responsibilities: 'Implement ML algorithms, train and optimize neural networks, analyze datasets, integrate ML models with robot systems, collaborate with AI researchers, document development processes.',
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
    id: 3,
    documentId: 'software-development-intern',
    title: 'Software Development Intern',
    slug: 'software-development-intern',
    category: 'Engineering',
    description: 'Develop software for our humanoid robot systems. Work on integrating diverse software components, debugging, and creating reliable code for robot functionality.',
    requirements: 'Proficiency in Java, C++, and Python. Strong understanding of software development methodologies. Experience with algorithms and data structures. Ability to work in agile environments.',
    responsibilities: 'Develop and test software components, debug code, integrate software modules, write documentation, collaborate with engineering team, participate in code reviews.',
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
    id: 4,
    documentId: 'front-end-developer-intern',
    title: 'Front-end Developer Intern',
    slug: 'front-end-developer-intern',
    category: 'Engineering',
    description: 'Create responsive and interactive user interfaces using modern frameworks. Build user-friendly interfaces for robot control systems and monitoring dashboards.',
    requirements: 'Strong knowledge of HTML, CSS, and JavaScript. Experience with React or similar frameworks. Understanding of responsive design and UI/UX principles. Experience with state management.',
    responsibilities: 'Build responsive UI components, implement designs, optimize performance, integrate with backend APIs, ensure cross-browser compatibility, write clean maintainable code.',
    status: 'Open',
    featured: false,
    location: 'Remote',
    duration: '3-6 months',
    type: 'Internship',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    publishedAt: new Date().toISOString(),
  },
  {
    id: 5,
    documentId: 'ui-ux-design-intern',
    title: 'UI/UX Design Intern',
    slug: 'ui-ux-design-intern',
    category: 'Design',
    description: 'Design intuitive interfaces for our robotics control systems. Create user-centered designs that enhance the human-robot interaction and improve overall user experience.',
    requirements: 'Proficiency in Figma, Adobe XD, or similar design tools. Portfolio demonstrating UX design process. Understanding of design thinking and user research methodologies.',
    responsibilities: 'Create wireframes and prototypes, conduct user research, design user flows, collaborate with developers, conduct usability testing, iterate on designs based on feedback.',
    status: 'Open',
    featured: false,
    location: 'Remote',
    duration: '3-6 months',
    type: 'Internship',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    publishedAt: new Date().toISOString(),
  },
  {
    id: 6,
    documentId: 'embedded-systems-intern',
    title: 'Embedded Systems Intern',
    slug: 'embedded-systems-intern',
    category: 'Engineering',
    description: 'Develop firmware for microcontrollers controlling our humanoid robot. Work on low-level programming and hardware-software integration.',
    requirements: 'Experience with microcontroller programming (Arduino, Raspberry Pi). Proficiency in C, C++, Python, or Rust. Understanding of embedded systems and hardware interfaces.',
    responsibilities: 'Program microcontrollers, develop firmware, interface hardware components, debug embedded systems, document development processes, optimize code for performance.',
    status: 'Open',
    featured: false,
    location: 'Remote',
    duration: '3-6 months',
    type: 'Internship',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    publishedAt: new Date().toISOString(),
  },
  {
    id: 7,
    documentId: 'control-systems-engineering-intern',
    title: 'Control Systems Engineering Intern',
    slug: 'control-systems-engineering-intern',
    category: 'Engineering',
    description: 'Design and implement control algorithms for robot movement and behavior. Work on motion planning, sensor integration, and real-time control systems.',
    requirements: 'Background in control theory and systems engineering. Knowledge of MATLAB/Simulink. Understanding of PID controllers and feedback systems. Experience with robotics is a plus.',
    responsibilities: 'Design control algorithms, implement motion planning, integrate sensors, test control systems, optimize performance, document designs.',
    status: 'Open',
    featured: false,
    location: 'Remote',
    duration: '3-6 months',
    type: 'Internship',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    publishedAt: new Date().toISOString(),
  },
  {
    id: 8,
    documentId: 'quality-assurance-intern',
    title: 'Quality Assurance Intern',
    slug: 'quality-assurance-intern',
    category: 'Engineering',
    description: 'Test software and hardware systems to ensure quality and reliability. Develop testing strategies and identify issues before deployment.',
    requirements: 'Experience with software testing methodologies. Familiarity with testing tools like Postman, Selenium. Understanding of both manual and automated testing. Attention to detail.',
    responsibilities: 'Develop test plans, execute test cases, perform manual and automated testing, identify and document bugs, verify bug fixes, ensure quality standards.',
    status: 'Open',
    featured: false,
    location: 'Remote',
    duration: '3-6 months',
    type: 'Internship',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    publishedAt: new Date().toISOString(),
  },
  {
    id: 9,
    documentId: 'content-marketing-intern',
    title: 'Content Marketing Intern',
    slug: 'content-marketing-intern',
    category: 'Marketing',
    description: 'Create compelling content to promote our projects and internship programs. Develop content strategies, write blog posts, and manage social media presence.',
    requirements: 'Strong writing and editing skills. Experience with content creation and social media. Understanding of marketing principles. Portfolio of writing samples.',
    responsibilities: 'Write blog posts and articles, create social media content, develop newsletter content, edit and proofread materials, maintain brand voice, analyze content performance.',
    status: 'Open',
    featured: false,
    location: 'Remote',
    duration: '3-6 months',
    type: 'Internship',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    publishedAt: new Date().toISOString(),
  },
  {
    id: 10,
    documentId: 'sport-science-intern',
    title: 'Sport Science Intern',
    slug: 'sport-science-intern',
    category: 'Science',
    description: 'Apply sports science principles to robotics and human performance. Work on developing AI and sensor-based solutions for performance enhancement and injury prevention.',
    requirements: 'Background in kinesiology, sports science, or related field. Experience with performance monitoring technologies and biomechanics. Knowledge of data analysis.',
    responsibilities: 'Research sports science applications, analyze performance data, develop monitoring solutions, collaborate with engineering team, document research findings.',
    status: 'Open',
    featured: false,
    location: 'Remote',
    duration: '3-6 months',
    type: 'Internship',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    publishedAt: new Date().toISOString(),
  },
  {
    id: 11,
    documentId: 'ethical-legal-research-intern',
    title: 'Ethical and Legal Research Intern',
    slug: 'ethical-legal-research-intern',
    category: 'Legal',
    description: 'Research ethical implications and legal frameworks for AI and robotics. Help develop compliance guidelines and ethical standards for our technology.',
    requirements: 'Background in law, ethics, or policy. Strong research and analytical skills. Excellent writing abilities. Interest in technology law and AI ethics.',
    responsibilities: 'Conduct legal research, analyze ethical implications, develop compliance guidelines, write policy briefs, collaborate with engineering team, stay current on regulations.',
    status: 'Open',
    featured: false,
    location: 'Remote',
    duration: '3-6 months',
    type: 'Internship',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    publishedAt: new Date().toISOString(),
  },
]
