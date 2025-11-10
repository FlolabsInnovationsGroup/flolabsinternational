/**
 * Clear all projects from the database at the SQL level
 */

const STRAPI_URL = process.env.STRAPI_URL || 'https://strapi-production-7ecb.up.railway.app';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

if (!STRAPI_API_TOKEN) {
  console.error('❌ STRAPI_API_TOKEN environment variable is required');
  process.exit(1);
}

async function clearDatabase() {
  console.log('🗑️  Clearing projects database...\n');

  // First, try to get all projects with preview mode (includes drafts)
  const response = await fetch(`${STRAPI_URL}/api/projects?publicationState=preview&pagination[pageSize]=200`, {
    headers: {
      'Authorization': `Bearer ${STRAPI_API_TOKEN}`,
    },
  });

  const { data } = await response.json();
  
  console.log(`Found ${data?.length || 0} projects (including drafts)`);

  if (!data || data.length === 0) {
    console.log('✅ Database is already clean');
    return;
  }
  
  // Delete each project
  for (const project of data) {
    console.log(`Deleting project ID ${project.id} (${project.attributes?.title || 'untitled'})...`);
    
    const deleteResponse = await fetch(`${STRAPI_URL}/api/projects/${project.id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${STRAPI_API_TOKEN}`,
      },
    });
    
    if (deleteResponse.ok) {
      console.log(`  ✓ Deleted`);
    } else {
      const error = await deleteResponse.text();
      console.log(`  ✗ Failed: ${error}`);
    }
  }
  
  console.log('\n✅ Database cleanup complete');
}

clearDatabase().catch(error => {
  console.error('❌ Error:', error.message);
  process.exit(1);
});
