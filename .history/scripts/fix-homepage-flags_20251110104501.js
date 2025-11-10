/**
 * Update existing projects to set showOnHomepage field correctly
 */

const STRAPI_URL = process.env.STRAPI_URL || 'https://strapi-production-7ecb.up.railway.app';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

if (!STRAPI_API_TOKEN) {
  console.error('❌ STRAPI_API_TOKEN environment variable is required');
  process.exit(1);
}

// Projects that should show on homepage (first 4)
const HOMEPAGE_PROJECT_SLUGS = ['moodchanger', 'caipo', 'flo-studios', 'flo-travel'];

async function updateProjects() {
  console.log('🔄 Updating project showOnHomepage flags...\n');

  try {
    // Get all projects
    const response = await fetch(`${STRAPI_URL}/api/projects?publicationState=preview&pagination[pageSize]=100&populate=*`, {
      headers: {
        'Authorization': `Bearer ${STRAPI_API_TOKEN}`,
      },
    });

    if (!response.ok) {
      console.error(`❌ API request failed: ${response.status} ${response.statusText}`);
      return;
    }

    const result = await response.json();
    const projects = result.data || [];
    
    console.log(`Found ${projects.length} projects\n`);
    
    for (const project of projects) {
      const projectId = project.id;
      const attrs = project.attributes;
      
      if (!attrs || !attrs.slug) {
        console.log(`⏭️  Skipping project ID ${projectId} - no data`);
        continue;
      }
      
      const shouldBeOnHomepage = HOMEPAGE_PROJECT_SLUGS.includes(attrs.slug);
      const currentHomepageStatus = attrs.showOnHomepage;
      
      // Only update if needed
      if (currentHomepageStatus === shouldBeOnHomepage) {
        console.log(`✓ ${attrs.title} - already correct (${shouldBeOnHomepage})`);
        continue;
      }
      
      console.log(`Updating ${attrs.title} - setting showOnHomepage to ${shouldBeOnHomepage}...`);
      
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
        console.log(`  ✓ Updated`);
      } else {
        const error = await updateResponse.text();
        console.log(`  ✗ Failed: ${error}`);
      }
    }
    
    console.log('\n✅ Update complete!');
    console.log(`\n📋 Homepage should now show only: ${HOMEPAGE_PROJECT_SLUGS.join(', ')}`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

updateProjects();
