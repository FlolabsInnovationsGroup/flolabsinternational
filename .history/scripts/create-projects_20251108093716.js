/**
 * Create Projects in Strapi
 * 
 * Usage: STRAPI_TOKEN=xxx node create-projects.js
 */

const https = require('https');

const STRAPI_URL = 'https://strapi-production-7ecb.up.railway.app';
const STRAPI_TOKEN = process.env.STRAPI_TOKEN;

if (!STRAPI_TOKEN) {
  console.error('Error: STRAPI_TOKEN environment variable is required');
  process.exit(1);
}

const projects = [
  {
    title: 'MoodChanger',
    slug: 'moodchanger',
    description: 'MoodChanger is your one stop shop for all things AI. You can manage various AI systems through this app. Check out all of the exciting AI technologies being connected.',
    link: 'https://www.flomadlabs.com/moodchanger-people',
    order: 1
  },
  {
    title: 'CAIPO',
    slug: 'caipo',
    description: 'CAIPO is Chief Artificial Intelligence Productivity Officer. This is a wearable AI tech that can record audio and video for note taking. The AI can assist you with summarizing or finding sections of your notes.',
    link: 'https://www.flomadlabs.com/caipo',
    order: 2
  },
  {
    title: 'Flo Studios',
    slug: 'flo-studios',
    description: 'Flo Studios is our content creation hub for our interns. We want to focus on all types of contents. We currently have our own podcast The Flo Frequency.',
    link: 'https://www.youtube.com/@FlomadLabs',
    order: 3
  },
  {
    title: 'Flo Travel',
    slug: 'flo-travel',
    description: 'AI is taking over in the market for travel. Flo Travel is using AI to help clients plan their trips accordingly. Plan your flight, hotel, trip, activities, etc. all in one place.',
    link: 'https://www.flomadtravel.com/',
    order: 4
  }
];

async function createProject(project) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({ data: project });

    const options = {
      hostname: new URL(STRAPI_URL).hostname,
      path: '/api/projects',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${STRAPI_TOKEN}`,
        'Content-Length': Buffer.byteLength(body)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200 || res.statusCode === 201) {
          console.log(`✓ Created project: ${project.title}`);
          resolve(JSON.parse(data));
        } else {
          console.error(`✗ Failed to create ${project.title}: ${res.statusCode} - ${data}`);
          reject(new Error(`Failed: ${res.statusCode}`));
        }
      });
    });

    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

async function main() {
  console.log('Creating projects in Strapi...\n');

  for (const project of projects) {
    try {
      await createProject(project);
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.error(`Error creating ${project.title}:`, error.message);
    }
  }

  console.log('\n✓ Projects created successfully!');
  console.log('\nNext steps:');
  console.log('1. Update Projects page to fetch from Strapi');
  console.log('2. Add project images to Strapi');
  console.log('3. Deploy frontend');
}

main().catch(console.error);
