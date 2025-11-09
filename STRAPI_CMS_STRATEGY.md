# Strapi CMS Content Management Strategy

## Overview

This document outlines the strategy for moving hardcoded content from components to Strapi CMS, enabling non-technical team members to manage all website content through the Strapi admin panel.

---

## Current State Analysis

### Hardcoded Content Locations

1. **Hero Component** (`/frontend/components/hero.tsx`)
   - Title: "FLO LABS R&D"
   - Subtitle: "Advanced AI and Robotics Program"

2. **Benefits Component** (`/frontend/components/benefits.tsx`)
   - 4 benefits: Flexibility, Affordability, Opportunities, Expertise
   - Each with title, description, and icon

3. **Verticals Component** (`/frontend/components/verticals.tsx`)
   - 4 verticals: Education, Healthcare, Travel, Space
   - Each with title, description, and image

4. **Methodology Component** (`/frontend/components/methodology.tsx`)
   - Multiple methodology items
   - Each with description

5. **Get Recruited Component** (`/frontend/components/get-recruited.tsx`)
   - Section title and description text

6. **Ambitious Projects Component** (`/frontend/components/ambitious-projects.tsx`)
   - Section title and description text

7. **Long Live Learning Component** (`/frontend/components/long-live-learning.tsx`)
   - Section title and description text

---

## Proposed Strapi Content Types

### 1. Site Settings (Single Type)

**Purpose**: Store global site configuration and hero content

**Fields**:
```typescript
{
  heroTitle: string              // "FLO LABS R&D"
  heroSubtitle: string           // "Advanced AI and Robotics Program"
  heroBackgroundImage?: Media    // Optional hero background
  siteName: string               // "Flo Labs International"
  siteDescription: string        // Meta description
  logoLight?: Media              // Light theme logo
  logoDark?: Media               // Dark theme logo
  footerText: string             // Footer copyright text
  contactEmail: string           // General contact email
  socialLinks: Component         // Repeatable: {platform, url, icon}
}
```

**API Endpoint**: `/api/site-setting?populate=*`

---

### 2. Benefit (Collection Type)

**Purpose**: Manage the 4 benefits shown on homepage

**Fields**:
```typescript
{
  title: string                  // "Flexibility", "Affordability", etc.
  description: text              // Full description
  icon: string                   // Icon name or emoji
  iconImage?: Media              // Optional uploaded icon
  order: number                  // For sorting (1, 2, 3, 4)
  isActive: boolean              // Show/hide benefit
  backgroundColor?: string       // Optional custom background
}
```

**API Endpoint**: `/api/benefits?populate=*&sort=order:asc&filters[isActive][$eq]=true`

**Default Data**:
1. Flexibility - "We adapt to fit your schedule..."
2. Affordability - "Quality education shouldn't break the bank..."
3. Opportunities - "Gain real-world experience..."
4. Expertise - "Learn from industry professionals..."

---

### 3. Vertical (Collection Type)

**Purpose**: Manage industry verticals showcased on site

**Fields**:
```typescript
{
  title: string                  // "Education", "Healthcare", etc.
  description: text              // Full description
  image: Media                   // Main vertical image (required)
  icon?: string                  // Optional icon
  order: number                  // For sorting
  isActive: boolean              // Show/hide vertical
  projects?: Relation            // Link to related projects
}
```

**API Endpoint**: `/api/verticals?populate=*&sort=order:asc&filters[isActive][$eq]=true`

**Default Data**:
1. Education - Frame-36.jpg
2. Healthcare - Frame-35.jpg
3. Travel - Frame-34.jpg
4. Space - Mask-group-7.jpg

---

### 4. Methodology Item (Collection Type)

**Purpose**: Manage methodology/process steps

**Fields**:
```typescript
{
  title: string                  // Step title
  description: text              // Step description
  icon?: string                  // Icon or emoji
  order: number                  // For sorting
  isActive: boolean              // Show/hide item
  duration?: string              // e.g., "2 weeks", "1 month"
}
```

**API Endpoint**: `/api/methodology-items?populate=*&sort=order:asc&filters[isActive][$eq]=true`

---

### 5. Section Content (Collection Type)

**Purpose**: Generic content sections (Get Recruited, Ambitious Projects, etc.)

**Fields**:
```typescript
{
  sectionKey: string             // Unique identifier: "get-recruited", "ambitious-projects"
  title: string                  // Section heading
  subtitle?: string              // Optional subheading
  body: richtext                 // Main content (supports markdown/HTML)
  ctaText?: string               // Call-to-action button text
  ctaLink?: string               // CTA button URL
  backgroundColor?: string       // Custom background color
  textColor?: string             // Custom text color
  backgroundImage?: Media        // Optional background image
  isActive: boolean              // Show/hide section
}
```

**API Endpoint**: `/api/section-contents?populate=*&filters[sectionKey][$eq]=get-recruited`

**Section Keys**:
- `hero` - Main hero section
- `get-recruited` - Get Recruited Today section
- `ambitious-projects` - Ambitious Innovative Projects section
- `long-live-learning` - Long Live Learning section
- `about-intro` - About page intro
- `contact-intro` - Contact page intro

---

### 6. Team Member (Collection Type)

**Purpose**: Manage team members for About page

**Fields**:
```typescript
{
  name: string                   // Full name
  title: string                  // Job title/role
  bio: text                      // Biography
  photo: Media                   // Headshot photo
  email?: string                 // Contact email
  linkedinUrl?: string           // LinkedIn profile
  twitterUrl?: string            // Twitter profile
  order: number                  // Display order
  isActive: boolean              // Show/hide member
}
```

**API Endpoint**: `/api/team-members?populate=*&sort=order:asc&filters[isActive][$eq]=true`

---

### 7. FAQ (Collection Type)

**Purpose**: Frequently asked questions (future use)

**Fields**:
```typescript
{
  question: string               // The question
  answer: richtext               // The answer (supports formatting)
  category: string               // "Internships", "Projects", "General"
  order: number                  // Display order
  isActive: boolean              // Show/hide FAQ
}
```

**API Endpoint**: `/api/faqs?populate=*&sort=order:asc&filters[isActive][$eq]=true&filters[category][$eq]=Internships`

---

## Implementation Plan

### Phase 1: Create Content Types in Strapi (1 day)

#### Steps:
1. Access Strapi admin: https://strapi-production-7ecb.up.railway.app/admin
2. Navigate to Content-Type Builder
3. Create each content type with fields specified above
4. Set permissions for each content type (allow public read access)
5. Enable populate deep for media fields

#### Validation:
- Test API endpoints with `curl` or Postman
- Verify JSON response structure
- Check media URLs are absolute

---

### Phase 2: Migrate Existing Content (1 day)

#### Create Migration Script: `scripts/migrate-content-to-strapi.js`

```javascript
const axios = require('axios')
const fs = require('fs')
const path = require('path')

const STRAPI_URL = process.env.STRAPI_URL || 'https://strapi-production-7ecb.up.railway.app'
const API_TOKEN = process.env.STRAPI_API_TOKEN

const api = axios.create({
  baseURL: `${STRAPI_URL}/api`,
  headers: {
    'Authorization': `Bearer ${API_TOKEN}`,
    'Content-Type': 'application/json'
  }
})

// Migrate Site Settings
async function migrateSiteSettings() {
  const data = {
    heroTitle: "FLO LABS R&D",
    heroSubtitle: "Advanced AI and Robotics Program",
    siteName: "Flo Labs International",
    siteDescription: "Advanced AI and Robotics Research & Development Program",
    footerText: "© 2025 Flo Labs International. All rights reserved.",
    contactEmail: "contact@flolabs.com"
  }

  await api.put('/site-setting', { data })
  console.log('✅ Site settings migrated')
}

// Migrate Benefits
async function migrateBenefits() {
  const benefits = [
    {
      title: "Flexibility",
      description: "We adapt to fit your schedule...",
      icon: "⚡",
      order: 1,
      isActive: true
    },
    {
      title: "Affordability",
      description: "Quality education shouldn't break the bank...",
      icon: "💰",
      order: 2,
      isActive: true
    },
    {
      title: "Opportunities",
      description: "Gain real-world experience...",
      icon: "🚀",
      order: 3,
      isActive: true
    },
    {
      title: "Expertise",
      description: "Learn from industry professionals...",
      icon: "🎓",
      order: 4,
      isActive: true
    }
  ]

  for (const benefit of benefits) {
    await api.post('/benefits', { data: benefit })
  }
  console.log('✅ Benefits migrated')
}

// Migrate Verticals
async function migrateVerticals() {
  const verticals = [
    {
      title: "Education",
      description: "Transforming learning experiences...",
      order: 1,
      isActive: true
      // Note: Image upload handled separately
    },
    // ... more verticals
  ]

  for (const vertical of verticals) {
    await api.post('/verticals', { data: vertical })
  }
  console.log('✅ Verticals migrated')
}

// Main execution
async function main() {
  try {
    await migrateSiteSettings()
    await migrateBenefits()
    await migrateVerticals()
    // ... more migrations
    
    console.log('🎉 All content migrated successfully!')
  } catch (error) {
    console.error('❌ Migration failed:', error.response?.data || error.message)
  }
}

main()
```

#### Run Migration:
```bash
cd scripts
export STRAPI_API_TOKEN=<your-token>
node migrate-content-to-strapi.js
```

---

### Phase 3: Create Strapi Helper Functions (1 day)

#### Update `/frontend/lib/strapi.ts`

```typescript
// Add new interfaces to types.ts
export interface SiteSettings {
  heroTitle: string
  heroSubtitle: string
  siteName: string
  logoLight?: StrapiImage
  logoDark?: StrapiImage
}

export interface Benefit {
  id: number
  title: string
  description: string
  icon: string
  iconImage?: StrapiImage
  order: number
  isActive: boolean
}

export interface Vertical {
  id: number
  title: string
  description: string
  image: StrapiImage
  order: number
  isActive: boolean
}

export interface MethodologyItem {
  id: number
  title: string
  description: string
  icon?: string
  order: number
  isActive: boolean
}

export interface SectionContent {
  id: number
  sectionKey: string
  title: string
  subtitle?: string
  body: string
  ctaText?: string
  ctaLink?: string
  backgroundColor?: string
  isActive: boolean
}

// Add API functions
export async function getSiteSettings(): Promise<SiteSettings | null> {
  const response = await fetchAPI<StrapiSingleResponse<SiteSettings>>(
    '/site-setting?populate=*'
  )
  return response.data || null
}

export async function getBenefits(): Promise<Benefit[]> {
  const response = await fetchAPI<StrapiResponse<Benefit[]>>(
    '/benefits?populate=*&sort=order:asc&filters[isActive][$eq]=true'
  )
  return response.data || []
}

export async function getVerticals(): Promise<Vertical[]> {
  const response = await fetchAPI<StrapiResponse<Vertical[]>>(
    '/verticals?populate=*&sort=order:asc&filters[isActive][$eq]=true'
  )
  return response.data || []
}

export async function getMethodologyItems(): Promise<MethodologyItem[]> {
  const response = await fetchAPI<StrapiResponse<MethodologyItem[]>>(
    '/methodology-items?populate=*&sort=order:asc&filters[isActive][$eq]=true'
  )
  return response.data || []
}

export async function getSectionContent(sectionKey: string): Promise<SectionContent | null> {
  const response = await fetchAPI<StrapiResponse<SectionContent[]>>(
    `/section-contents?populate=*&filters[sectionKey][$eq]=${sectionKey}&filters[isActive][$eq]=true`
  )
  return response.data?.[0] || null
}
```

---

### Phase 4: Refactor Components (2-3 days)

#### Example: Hero Component Refactor

**Before** (`hero.tsx`):
```tsx
export function Hero() {
  return (
    <section>
      <h1>FLO LABS R&D</h1>
      <p>Advanced AI and Robotics Program</p>
    </section>
  )
}
```

**After** (`hero.tsx`):
```tsx
import { getSiteSettings } from '@/lib/strapi'

export async function Hero() {
  const settings = await getSiteSettings()
  
  if (!settings) {
    return <div>Loading...</div>
  }

  return (
    <section>
      <h1>{settings.heroTitle}</h1>
      <p>{settings.heroSubtitle}</p>
    </section>
  )
}

// Add revalidation
export const revalidate = 60
```

#### Example: Benefits Component Refactor

**Before** (`benefits.tsx`):
```tsx
const benefits = [
  { title: 'Flexibility', description: '...' },
  // ... hardcoded
]

export function Benefits() {
  return (
    <div>
      {benefits.map(benefit => (
        <div key={benefit.title}>
          <h3>{benefit.title}</h3>
          <p>{benefit.description}</p>
        </div>
      ))}
    </div>
  )
}
```

**After** (`benefits.tsx`):
```tsx
import { getBenefits } from '@/lib/strapi'

export async function Benefits() {
  const benefits = await getBenefits()

  if (benefits.length === 0) {
    return null
  }

  return (
    <div>
      {benefits.map(benefit => (
        <div key={benefit.id}>
          <h3>{benefit.title}</h3>
          <p>{benefit.description}</p>
          {benefit.icon && <span>{benefit.icon}</span>}
        </div>
      ))}
    </div>
  )
}

export const revalidate = 60
```

#### Refactor Priority:
1. ✅ Hero component (high visibility)
2. ✅ Benefits component (homepage)
3. ✅ Verticals component (homepage)
4. Section content components (Get Recruited, etc.)
5. Methodology component
6. About page team members (when created)

---

### Phase 5: Testing & Validation (1 day)

#### Testing Checklist:

**API Testing**:
- [ ] All endpoints return expected data structure
- [ ] Populate works for media fields
- [ ] Filtering by `isActive` works
- [ ] Sorting by `order` works correctly
- [ ] Media URLs are absolute and accessible

**Component Testing**:
- [ ] Components render with Strapi data
- [ ] Loading states work properly
- [ ] Error handling for missing data
- [ ] Revalidation (60s) works as expected
- [ ] Build succeeds with all components

**Content Editor Testing**:
- [ ] Can create new benefits in Strapi
- [ ] Can reorder items by changing `order` field
- [ ] Can hide items by setting `isActive` to false
- [ ] Can upload and attach images
- [ ] Changes appear on site within 60 seconds

**Edge Cases**:
- [ ] What if Strapi is down? (Show cached data)
- [ ] What if section has no content? (Don't render)
- [ ] What if image upload fails? (Fallback/placeholder)
- [ ] What if order numbers conflict? (Sort by ID as fallback)

---

## Content Management Workflow

### For Content Editors (Non-Technical)

#### Adding a New Benefit:
1. Log in to Strapi admin panel
2. Navigate to "Benefits" in left sidebar
3. Click "Create new entry"
4. Fill in:
   - Title (e.g., "Innovation")
   - Description (full text)
   - Icon (emoji or text)
   - Order (5, 6, 7... for new items)
   - Set "Is Active" to true
5. Click "Save" and "Publish"
6. Changes appear on website within 60 seconds

#### Changing Hero Text:
1. Navigate to "Site Setting" (single type)
2. Click on existing entry
3. Update "Hero Title" or "Hero Subtitle"
4. Click "Save" and "Publish"
5. Changes appear on website within 60 seconds

#### Reordering Items:
1. Navigate to collection (Benefits, Verticals, etc.)
2. Edit each item and change "Order" number
3. Example: To move item 4 to position 2:
   - Change item 4 order to 2
   - Change item 2 order to 3
   - Change item 3 order to 4
4. Save all changes
5. Items will reorder on website within 60 seconds

#### Hiding Content Temporarily:
1. Edit the content entry
2. Set "Is Active" to false
3. Save and Publish
4. Content will disappear from website within 60 seconds
5. To restore: Set "Is Active" back to true

---

## Benefits of This Approach

### For Content Editors:
✅ No code changes required for content updates
✅ Visual interface for all content management
✅ Ability to preview before publishing
✅ Easy reordering with number fields
✅ Show/hide content without deleting
✅ Upload and manage images in one place

### For Developers:
✅ Single source of truth for content
✅ Type-safe with TypeScript interfaces
✅ Easy to add new content types
✅ Consistent API structure
✅ Automatic revalidation with ISR
✅ Reduced hardcoded strings in components

### For Site Performance:
✅ Static generation with 60s revalidation
✅ Content cached at edge (Vercel CDN)
✅ Fast page loads
✅ No runtime data fetching delays
✅ SEO-friendly (content in HTML)

---

## Rollback Plan

If issues occur during migration:

1. **Immediate Rollback**: Revert component changes in Git
   ```bash
   git revert <commit-hash>
   git push origin main
   ```

2. **Partial Rollback**: Keep some components on Strapi, revert others
   - Identify problematic component
   - Restore hardcoded content for that component only
   - Keep other migrated components

3. **Data Recovery**: If Strapi data is lost
   - Re-run migration script
   - Or manually re-enter content using backup JSON

---

## Maintenance & Best Practices

### Regular Tasks:
- **Weekly**: Review and clean up unused media files in Strapi
- **Monthly**: Audit `isActive=false` items and delete if no longer needed
- **Quarterly**: Review content type structure and add new fields as needed

### Content Guidelines:
- Always preview content before publishing
- Use descriptive titles for easy identification
- Keep order numbers sequential (1, 2, 3, 4...)
- Use isActive instead of deleting content (allows restoration)
- Compress images before upload (max 500KB recommended)
- Use alt text for all images (accessibility)

### Developer Guidelines:
- Always add `revalidate = 60` to components fetching Strapi data
- Handle null/empty responses gracefully
- Use TypeScript interfaces for all Strapi data
- Add error boundaries for Strapi components
- Test with Strapi down (cached data should work)
- Document any new content types in this guide

---

## Next Steps

1. ✅ Review and approve content type schema
2. Create content types in Strapi (1 day)
3. Create and run migration script (1 day)
4. Update Strapi helper functions (1 day)
5. Refactor components one by one (2-3 days)
6. Test thoroughly (1 day)
7. Deploy to production
8. Train content editors on Strapi admin
9. Monitor for issues for 1 week
10. Document any learnings/improvements

---

## Support & Documentation

### For Content Editors:
- See `CMS_USER_GUIDE.md` for detailed Strapi admin instructions
- Contact developer team for technical issues
- Slack channel: #flo-labs-website

### For Developers:
- See `DEVELOPER_GUIDE.md` for technical setup
- Strapi docs: https://docs.strapi.io/
- API documentation: https://strapi-production-7ecb.up.railway.app/documentation

---

## Estimated Timeline

| Phase | Duration | Dependencies |
|-------|----------|--------------|
| Create content types | 1 day | Strapi access |
| Migrate existing content | 1 day | Content types created |
| Create helper functions | 1 day | Migration complete |
| Refactor components | 2-3 days | Helper functions ready |
| Testing & validation | 1 day | All components refactored |
| **Total** | **6-7 days** | |

---

## Success Metrics

- ✅ 100% of hardcoded content moved to Strapi
- ✅ Content editors can update all text without developer help
- ✅ Page load times remain under 2 seconds
- ✅ Zero content-related bugs in production
- ✅ ISR working correctly (60s revalidation)
- ✅ All content types have at least 1 entry
- ✅ Content editor training completed
