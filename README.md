# Flo Labs R&D International Website

This is the official website for Flo Labs R&D International, built with [Next.js](https://nextjs.org) and [Strapi CMS](https://strapi.io). The site showcases our AI and robotics programs, internship opportunities, and innovative projects.

## 🚀 Tech Stack

- **Frontend**: Next.js 16 with React 19
- **Backend CMS**: Strapi v5
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Forms**: HubSpot Integration
- **Deployment**: Vercel
- **Language**: TypeScript

## 📋 Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── about/             # About us page
│   ├── blogs/             # Blog listing and detail pages
│   ├── contact/           # Contact page with HubSpot form
│   ├── internships/       # Internship listings and detail pages
│   ├── privacy/           # Privacy policy page
│   ├── projects/          # Projects showcase page
│   └── page.tsx           # Homepage
├── components/            # Reusable React components
├── lib/                   # Utility functions and API clients
│   ├── strapi.ts         # Strapi API integration
│   ├── types.ts          # TypeScript type definitions
│   └── utils.ts          # Helper functions
└── public/               # Static assets (images, icons)
```

## 🏗️ Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/FlomadLabsRD/flolabsinternational.git
cd flolabsinternational
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` and configure your Strapi backend URL:
```
NEXT_PUBLIC_STRAPI_URL=https://your-strapi-instance.com
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) to view the site.

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📄 Key Pages

- **Home** (`/`) - Hero section, projects showcase, verticals, benefits, and methodology
- **About** (`/about`) - Mission, objectives, and team information
- **Internships** (`/internships`) - Browse and apply for internship positions
- **Projects** (`/projects`) - View our AI and robotics projects
- **Blogs** (`/blogs`) - Latest insights and research updates
- **Contact** (`/contact`) - Get in touch via HubSpot form
- **Privacy** (`/privacy`) - Privacy policy and data handling

## 🔌 Integrations

### Strapi CMS
The website fetches content dynamically from a Strapi backend, including:
- Internship positions
- Blog posts
- Project information
- Team members

### HubSpot Forms
Contact and application forms are powered by HubSpot:
- Portal ID: 45023159
- Contact Form ID: 0133caf3-53e5-403f-a894-cd0246642913

## 🎨 Design System

- **Primary Color**: #00349B (Flo Blue)
- **Fonts**: Roboto (body), Poppins (headings)
- **Blue Gradient**: Custom radial gradient matching WordPress design
- **Components**: Reusable card, button, and layout components

## 🚢 Deployment

The site is deployed on Vercel with automatic deployments from the main branch.

### Vercel Configuration
- Build Command: `npm run build`
- Output Directory: `.next`
- Framework: Next.js

### Environment Variables on Vercel
Make sure to set these in your Vercel project settings:
- `NEXT_PUBLIC_STRAPI_URL` - Your Strapi backend URL
- `STRAPI_API_TOKEN` - (Optional) For authenticated API requests

## 📝 Content Management

Content is managed through the Strapi admin panel. To update:
1. Log in to your Strapi backend
2. Navigate to Content Manager
3. Edit or create content (internships, blogs, projects)
4. Publish changes
5. Content will be automatically fetched by the Next.js site

## 🤝 Contributing

This is a private project for Flo Labs R&D International. For questions or contributions, please contact the development team.

## 📧 Contact

For more information about Flo Labs R&D International:
- Website: https://flolabs.international
- LinkedIn: https://www.linkedin.com/company/flomad-labs-r-d/

## 📜 License

Copyright © 2024 Flo Labs R&D International. All rights reserved.
