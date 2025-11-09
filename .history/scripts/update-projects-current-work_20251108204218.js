const https = require('https');

const STRAPI_URL = process.env.STRAPI_URL || 'https://strapi-production-7ecb.up.railway.app';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

if (!STRAPI_API_TOKEN) {
  console.error('Error: STRAPI_API_TOKEN environment variable is required');
  process.exit(1);
}

// Current Work data from WordPress
const projectsCurrentWork = {
  'Flo Labs': '<p><strong>Current Work:</strong> Redesigning the site to reflect ongoing changes at Flo Labs.</p>',
  'Flo Travel': '<p><strong>Current Work:</strong> Developing a sophisticated AI chatbot and enhancing the website for intuitive travel planning.</p>',
  'Flo International': '<p><strong>Current Work:</strong> Redesigning the website to better highlight Flo Labs\' mission, ongoing projects, and opportunities for collaboration and internships.</p>',
  // Other projects just show "Current Work Focus" header (no content, handled by UI)
};

function makeRequest(options, data = null) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(body));
        } catch (e) {
          resolve(body);
        }
      });
    });

    req.on('error', reject);
    if (data) req.write(JSON.stringify(data));
    req.end();
  });
}

async function getProjects() {
  console.log('Fetching projects from Strapi...');
  
  const options = {
    hostname: STRAPI_URL.replace('https://', ''),
    path: '/api/projects?populate=*',
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${STRAPI_API_TOKEN}`,
      'Content-Type': 'application/json'
    }
  };

  const response = await makeRequest(options);
  return response.data || [];
}

async function updateProject(documentId, currentWork) {
  const options = {
    hostname: STRAPI_URL.replace('https://', ''),
    path: `/api/projects/${documentId}`,
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${STRAPI_API_TOKEN}`,
      'Content-Type': 'application/json'
    }
  };

  const data = {
    data: {
      currentWork: currentWork
    }
  };

  return await makeRequest(options, data);
}

async function main() {
  try {
    const projects = await getProjects();
    console.log(`Found ${projects.length} projects`);

    for (const project of projects) {
      const title = project.title;
      const currentWork = projectsCurrentWork[title];
      
      if (currentWork) {
        console.log(`\nUpdating "${title}" with Current Work content...`);
        await updateProject(project.documentId, currentWork);
        console.log(`✓ Updated "${title}"`);
      } else {
        console.log(`\n"${title}" - no Current Work content (will show "Current Work Focus" header)`);
      }
    }

    console.log('\n✅ All projects updated successfully!');
  } catch (error) {
    console.error('Error updating projects:', error.message);
    process.exit(1);
  }
}

main();
