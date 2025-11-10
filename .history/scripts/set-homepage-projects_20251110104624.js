/**
 * Set showOnHomepage flag for specific project IDs
 */

const STRAPI_URL = process.env.STRAPI_URL || 'https://strapi-production-7ecb.up.railway.app';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

if (!STRAPI_API_TOKEN) {
  console.error('❌ STRAPI_API_TOKEN environment variable is required');
  process.exit(1);
}

// Based on screenshot: these should be on homepage
// CAIPO (ID 66, slug: caipo)
// Flo Studios (ID 68, slug: flo-studios)
// Flo Travel (ID 70, slug: flo-travel)
// MoodChanger - need to find by slug

async function updateHomepageFlags() {
  console.log('🔄 Setting showOnHomepage flags for the correct 4 projects...\n');

  try {
    // Get all projects (using a different endpoint that might work better)
    const response = await fetch(`${STRAPI_URL}/api/projects?pagination[pageSize]=100`, {
      headers: {
        'Authorization': `Bearer ${STRAPI_API_TOKEN}`,
      },
    });

    if (!response.ok) {
      console.error(`❌ API request failed: ${response.status} ${response.statusText}`);
      const text = await response.text();
      console.error('Response:', text);
      return;
    }

    const result = await response.json();
    const projects = result.data || [];
    
    console.log(`Found ${projects.length} published projects\n`);
    
    // Define which slugs should be on homepage
    const homepageSlugs = ['moodchanger', 'caipo', 'flo-studios', 'flo-travel'];
    
    for (const project of projects) {
      const projectId = project.id;
      const slug = project.attributes?.slug;
      const title = project.attributes?.title;
      
      if (!slug) {
        console.log(`⏭️  Skipping project ID ${projectId} - no slug`);
        continue;
      }
      
      const shouldBeOnHomepage = homepageSlugs.includes(slug);
      
      console.log(`Updating ID ${projectId} (${title || slug}) - showOnHomepage: ${shouldBeOnHomepage}...`);
      
      const updateResponse = await fetch(`${STRAPI_URL}/api/projects/${projectId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${STRAPI_API_TOKEN}`,
        },
        body: JSON.stringify({
          data: {
            showOnHomepage: shouldBeOnHomepage
          }
        }),
      });
      
      if (updateResponse.ok) {
        console.log(`  ✓ Updated successfully`);
      } else {
        const error = await updateResponse.text();
        console.log(`  ✗ Failed: ${error}`);
      }
    }
    
    console.log('\n✅ Update complete!');
    console.log('\n📋 Projects with showOnHomepage=true should be:');
    console.log('  - moodchanger');
    console.log('  - caipo');
    console.log('  - flo-studios');
    console.log('  - flo-travel');
    console.log('\n🔄 Wait 60 seconds for Next.js ISR to revalidate, then check homepage');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

updateHomepageFlags();
