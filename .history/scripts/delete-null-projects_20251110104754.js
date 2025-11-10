/**
 * Delete NULL/empty project entries while keeping good ones
 */

const STRAPI_URL = process.env.STRAPI_URL || 'https://strapi-production-7ecb.up.railway.app';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

if (!STRAPI_API_TOKEN) {
  console.error('❌ STRAPI_API_TOKEN environment variable is required');
  process.exit(1);
}

async function deleteNullProjects() {
  console.log('🗑️  Removing NULL/empty project entries...\n');

  try {
    const response = await fetch(`${STRAPI_URL}/api/projects?publicationState=preview&pagination[pageSize]=200`, {
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
    
    console.log(`Found ${projects.length} total projects\n`);
    
    let deletedCount = 0;
    let keptCount = 0;
    
    for (const project of projects) {
      const projectId = project.id;
      const attrs = project.attributes;
      
      // Check if project has NULL/missing critical data
      const isNull = !attrs || !attrs.title || !attrs.slug;
      
      if (isNull) {
        console.log(`Deleting NULL project ID ${projectId}...`);
        
        const deleteResponse = await fetch(`${STRAPI_URL}/api/projects/${projectId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${STRAPI_API_TOKEN}`,
          },
        });
        
        if (deleteResponse.ok) {
          console.log(`  ✓ Deleted`);
          deletedCount++;
        } else {
          const error = await deleteResponse.text();
          console.log(`  ✗ Failed: ${error}`);
        }
      } else {
        console.log(`✓ Keeping ID ${projectId} - ${attrs.title}`);
        keptCount++;
      }
    }
    
    console.log(`\n✅ Complete! Deleted ${deletedCount} NULL projects, kept ${keptCount} good projects`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

deleteNullProjects();
