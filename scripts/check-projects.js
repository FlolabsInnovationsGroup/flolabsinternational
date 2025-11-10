/**
 * Check the status of projects in Strapi
 */

const STRAPI_URL = process.env.STRAPI_URL || 'https://strapi-production-7ecb.up.railway.app';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

if (!STRAPI_API_TOKEN) {
  console.error('❌ STRAPI_API_TOKEN environment variable is required');
  process.exit(1);
}

async function checkProjects() {
  console.log('🔍 Checking projects in Strapi...\n');

  try {
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
    
    console.log(`Found ${result.data?.length || 0} published projects\n`);
    
    if (result.data && result.data.length > 0) {
      result.data.forEach(project => {
        const attrs = project.attributes || {};
        console.log(`ID ${project.id}:`);
        console.log(`  Title: ${attrs.title || 'NULL'}`);
        console.log(`  Slug: ${attrs.slug || 'NULL'}`);
        console.log(`  Order: ${attrs.order ?? 'NULL'}`);
        console.log(`  Homepage: ${attrs.showOnHomepage ?? 'NULL'}`);
        console.log(`  Published: ${attrs.publishedAt ? 'Yes' : 'No'}`);
        console.log('');
      });
    } else {
      console.log('⚠️  No projects found in API response');
      console.log('This might mean:');
      console.log('1. Projects have null data and failed validation');
      console.log('2. Projects are not actually published');
      console.log('3. API token lacks permissions');
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

checkProjects();
