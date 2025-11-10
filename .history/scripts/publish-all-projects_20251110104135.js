/**
 * Publish all draft projects in Strapi
 */

const STRAPI_URL = process.env.STRAPI_URL || 'https://strapi-production-7ecb.up.railway.app';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

if (!STRAPI_API_TOKEN) {
  console.error('❌ STRAPI_API_TOKEN environment variable is required');
  process.exit(1);
}

async function publishAllProjects() {
  console.log('📢 Publishing all draft projects...\n');

  // Get all projects including drafts
  const response = await fetch(`${STRAPI_URL}/api/projects?publicationState=preview&pagination[pageSize]=200&populate=*`, {
    headers: {
      'Authorization': `Bearer ${STRAPI_API_TOKEN}`,
    },
  });

  const { data } = await response.json();
  
  console.log(`Found ${data?.length || 0} projects total`);

  if (!data || data.length === 0) {
    console.log('❌ No projects found');
    return;
  }

  // Publish each project that isn't already published
  for (const project of data) {
    const isPublished = project.attributes.publishedAt !== null;
    const projectTitle = project.attributes.title || 'untitled';
    
    if (isPublished) {
      console.log(`✓ ${projectTitle} (already published)`);
      continue;
    }
    
    console.log(`Publishing ${projectTitle}...`);
    
    // Update project with current data plus publishedAt
    const publishResponse = await fetch(`${STRAPI_URL}/api/projects/${project.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${STRAPI_API_TOKEN}`,
      },
      body: JSON.stringify({
        data: {
          title: project.attributes.title,
          slug: project.attributes.slug,
          description: project.attributes.description,
          currentWork: project.attributes.currentWork,
          link: project.attributes.link,
          order: project.attributes.order,
          showOnHomepage: project.attributes.showOnHomepage,
          publishedAt: new Date().toISOString()
        }
      }),
    });
    
    if (publishResponse.ok) {
      console.log(`  ✓ Published`);
    } else {
      const error = await publishResponse.text();
      console.log(`  ✗ Failed: ${error}`);
    }
  }
  
  console.log('\n✅ Publishing complete');
}

publishAllProjects().catch(error => {
  console.error('❌ Error:', error.message);
  process.exit(1);
});
