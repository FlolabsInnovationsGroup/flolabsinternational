# WordPress to Strapi Migration - Completion Checklist

## Current Status (November 8, 2025)

### ✅ COMPLETED
1. **Contact Page Removed** - WordPress site returns 404 for /contact, so we removed it from the Strapi site
2. **Core Site Structure** - Homepage, About, Projects, Internships, Blogs pages all exist
3. **Components** - All major components built (Hero, Projects Showcase, Internships Carousel, etc.)
4. **Strapi Backend** - Deployed to Railway with PostgreSQL
5. **Frontend** - Deployed to Vercel at https://flolabsfrontend.vercel.app

### 🔴 CRITICAL GAPS IDENTIFIED

#### 1. **Projects in Strapi (PRIORITY 1)**
**Issue:** Strapi only has 4 projects, but WordPress has 8.

**WordPress Projects:**
1. Flo Labs - The official portal for Flo Labs' Research and Development
2. Flo Travel - Next-gen travel platform with AI and multimodal transportation  
3. Flo International - Global platform showcasing Flo Labs' initiatives
4. CAIPO - AI-driven platform for predictive analytics and insights
5. MoodChanger - AI-powered emotional well-being platform
6. MoodChanger for Pets - Pet health and behavior insights
7. Humanoid Robots - Human-robot interaction research  
8. Flo Studios - Creative agency for UX/UI, multimedia, marketing

**Action Required:**
```bash
cd scripts
export STRAPI_API_TOKEN="your-token"
node create-projects.js
```

Verify the `create-projects.js` script creates all 8 projects with:
- Correct titles
- Full descriptions
- Links to external sites
- Proper ordering (order field 1-8)

#### 2. **Internships in Strapi (PRIORITY 1)**
**Issue:** Need to verify all 39 internships from `frontend/lib/internships-data.ts` are in Strapi.

**Internships List (39 total):**
From the internships-data.ts file, we have:
1. AI/AGI Intern
2. Machine Learning Engineering Intern
3. Software Development Intern
4. Neuroscience Intern
5. Biomedical Engineering Intern
6. Embedded Systems Intern
7. Computer Vision Engineering Intern
8. Mechatronics Engineering Intern
9. Front-end Developer Intern
10. Backend Developer Intern
11. Full Stack Developer Intern
12. Mobile App Developer Intern
13. Data Science Intern
14. Data Engineering Intern
15. Natural Language Processing (NLP) Intern
16. Robotics Research Intern
17. AI Research Intern
18. Social Media Intern
19. Finance Intern
20. Project Management Intern
21. UX/UI Design Intern
22. Graphic Design Intern
23. Video/Content Creator Intern
24. Research Associate Intern
25. Animal Science and Veterinary Research Intern
26. Quantum Engineer Intern
27. Space Science Intern
28. GTM Engineer Intern
29. GTM Influencer Intern
30. Aerospace Engineering Intern
31. Systems Engineering Intern
32. Materials Science Intern
33. Industrial Design Intern
34. Human Factors Engineering Intern
35. Quality Assurance Intern
36. DevOps Intern
37. Cloud Infrastructure Intern
38. Cybersecurity Intern
39. Business Development Intern

**Action Required:**
```bash
cd scripts
export STRAPI_API_TOKEN="your-token"
node sync-missing-internships.js
```

Verify `sync-missing-internships.js` uploads all internships with:
- Title, slug, status
- Full description
- Requirements (bullet list)
- Responsibilities (bullet list)
- HubSpot form IDs (from WordPress)
- Duration, location

#### 3. **Images (PRIORITY 2)**
**WordPress Images to Upload:**
- Hero/carousel images for internships page
- Project images
- About page hero image
- Homepage section images

**Located in WordPress at:**
- `/wp-content/uploads/2024/11/image-33-e1731164191312.png` (Internship carousel 1)
- `/wp-content/uploads/2024/11/image-29.png` (Internship carousel 2)
- `/wp-content/uploads/2024/11/Frame-1-59.png` (Internship carousel 3)
- `/wp-content/uploads/2025/06/Frame-26-1.jpg` (Internships page image)
- `/wp-content/uploads/2025/02/Frame-4.jpg` (About page hero)
- `/wp-content/uploads/2025/02/Frame-203.jpg` (Projects page image)

**Action Required:**
1. Download images from WordPress
2. Upload to Strapi media library
3. Update content types to reference new Strapi URLs

```bash
cd scripts
node download-images.js  # Downloads from WordPress
node upload-images-to-strapi.js  # Uploads to Strapi
```

#### 4. **Content Text Differences (PRIORITY 2)**

**About Page:**
WordPress has:
- "Flo Labs R&D" title in blue bordered box
- "EXECUTIVE MANAGEMENT PROGRAM" subtitle
- Objectives and Mission in side-by-side cards

Current Strapi site matches this ✅

**Internships Page:**
WordPress has these sections:
1. Hero carousel (3 images)
2. "Internship Positions" - Apply to your passion
3. Internship cards grid
4. "About The Internship" section with:
   - "Flexible. Dynamic. Inspiring." subsection
   - "Remote Internship Positions" details
   - "What We Do" with 3 sub-sections:
     - Build Future of Travel
     - Pushing Boundaries
     - Revolutionize Industries
   - "The Bottom Line" call-to-action
5. Full image (Frame-26-1.jpg)

**Action:** Compare word-for-word with `app/internships/page.tsx`

**Projects Page:**
WordPress format:
- Each project has:
  - Title
  - "What The Project Is:" description
  - "Current Work:" or "Current Work Focus" section
  - "Visit Site" button

**Action:** Verify Strapi projects have these exact fields

#### 5. **Styling Differences (PRIORITY 3)**

**Colors:**
- Primary blue: `#0047AB` (WordPress uses `#00349B` in some places - verify)
- Use exact color values from WordPress

**Fonts:**
- Verify font families match
- Check font weights and sizes

**Spacing:**
- Compare section padding/margins
- Verify card spacing in grids

**Action:**
1. Open both sites side-by-side
2. Use browser dev tools to compare computed styles
3. Update Tailwind classes in components to match exactly

### 📋 CODE CLEANUP (PRIORITY 4)

**Files to Remove After Migration Complete:**
```bash
scripts/
├── import-wordpress-to-strapi.js  # Keep for reference, but archive
├── sync-missing-internships.js    # Keep until verified complete
├── compare-internships.js         # Remove - one-time use
├── download-images.js             # Archive after images uploaded
├── upload-images-to-strapi.js     # Archive after images uploaded
├── parse-wordpress-export.js      # Remove - diagnostic only
├── debug-xml.js                   # Remove - diagnostic only
└── wordpress-export-latest.xml    # Move to /archive folder

Root docs to clean:
├── EXACT_MATCH_TODOS.md          # Remove - outdated
├── QA_CHECKLIST.md               # Archive - reference only
├── SITE_COMPARISON.md            # Archive - reference only
├── UPLOAD_LIMITS_FIX.md          # Archive - resolved issue
├── WEBSITE_ANALYSIS.md           # Archive - reference only
└── STRAPI_SETUP.md               # Merge into DEVELOPER_GUIDE.md
```

**Files to Keep:**
- `README.md` - Main project documentation
- `DEVELOPER_GUIDE.md` - Developer reference
- `EXECUTIVE_SUMMARY.md` - Project overview
- `MIGRATION_STRATEGY.md` - Historical reference
- `CMS_USER_GUIDE.md` - For content editors
- `QUICK_START.md` - Getting started guide

## 🚀 DEPLOYMENT CHECKLIST

### Before Going Live:
- [ ] All 8 projects in Strapi with correct data
- [ ] All 39 internships in Strapi with correct data
- [ ] All images uploaded to Strapi
- [ ] Content text matches WordPress exactly
- [ ] Styling matches WordPress exactly
- [ ] HubSpot forms working on all internship pages
- [ ] Test all navigation links
- [ ] Test mobile responsiveness
- [ ] Verify SEO metadata on all pages
- [ ] Check page load times (should be <2s)

### Going Live:
1. Update DNS for flolabs.international to point to Vercel
2. Update `NEXT_PUBLIC_SITE_URL` in Vercel environment variables
3. Test live site thoroughly
4. Keep WordPress site as backup for 30 days
5. Monitor error logs and analytics

### Post-Launch:
- [ ] Update README with new live URL
- [ ] Archive WordPress export for records
- [ ] Clean up unnecessary scripts/docs
- [ ] Create content editor training session
- [ ] Document any customizations made

## 📊 VERIFICATION COMMANDS

### Check Strapi Content:
```bash
# Count projects
curl "https://strapi-production-7ecb.up.railway.app/api/projects" \
  -H "Authorization: Bearer $STRAPI_API_TOKEN" | jq '.data | length'

# Count internships
curl "https://strapi-production-7ecb.up.railway.app/api/internships?pagination[pageSize]=100" \
  -H "Authorization: Bearer $STRAPI_API_TOKEN" | jq '.data | length'

# List all project titles
curl "https://strapi-production-7ecb.up.railway.app/api/projects?sort=order:asc" \
  -H "Authorization: Bearer $STRAPI_API_TOKEN" | jq '.data[].title'
```

### Compare Sites:
```bash
# Homepage
diff <(curl -s https://flolabs.international | grep -oP '(?<=<h1>).*?(?=</h1>)') \
     <(curl -s https://flolabsfrontend.vercel.app | grep -oP '(?<=<h1>).*?(?=</h1>)')
```

## 🆘 TROUBLESHOOTING

### If Strapi API returns empty data:
1. Check STRAPI_API_TOKEN is set correctly
2. Verify token has "Full access" permissions
3. Check content is Published (not Draft) in Strapi admin
4. Verify API endpoint URL is correct

### If images don't display:
1. Check image URLs in Strapi (should be absolute URLs)
2. Verify NEXT_PUBLIC_STRAPI_URL in frontend `.env.local`
3. Check CORS settings in Strapi config
4. Verify image files uploaded successfully

### If builds fail:
1. Check all environment variables set in Vercel
2. Verify Strapi is accessible at build time
3. Check build logs for specific errors
4. Try rebuilding with cleared cache

## ✅ FINAL SIGN-OFF

When all items above are complete:
- [ ] Technical lead approval
- [ ] Content review complete
- [ ] Design approval (matches WordPress)
- [ ] Stakeholder approval
- [ ] Ready to switch DNS

---

**Last Updated:** November 8, 2025
**Migration Progress:** ~75% complete
**Estimated Time to Complete:** 4-6 hours
**Critical Blocker:** Need to complete Strapi content (projects + internships)
