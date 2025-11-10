/**
 * Update projects in Strapi to match flolabs.international
 * This script will:
 * 1. Clear existing projects
 * 2. Create the 4 homepage projects with correct content
 * 3. Create the remaining projects for the Projects page
 */

const STRAPI_URL = process.env.STRAPI_URL || 'https://strapi-production-7ecb.up.railway.app';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

if (!STRAPI_API_TOKEN) {
  console.error('❌ STRAPI_API_TOKEN environment variable is required');
  process.exit(1);
}

// Homepage projects (matching flolabs.international exactly)
const HOMEPAGE_PROJECTS = [
  {
    title: 'MoodChanger',
    description: '<p>MoodChanger is your one stop shop for all things AI. You can manage various AI systems through this app. Check out all of the exciting AI technologies being connected.</p>',
    link: 'https://www.flomadlabs.com/moodchanger-people',
    linkText: 'MoodChanger Info',
    order: 1,
    showOnHomepage: true,
    image: 'Frame-3-1.jpg'
  },
  {
    title: 'CAIPO',
    description: '<p>CAIPO is Chief Artificial Intelligence Productivity Officer. This is a wearable AI tech that can record audio and video for note taking. The AI can assist you with summarizing or finding sections of your notes.</p>',
    link: 'https://www.flomadlabs.com/caipo',
    linkText: 'CAIPO Info',
    order: 2,
    showOnHomepage: true,
    image: 'Frame-2-2.jpg'
  },
  {
    title: 'Flo Studios',
    description: '<p>Flo Studios is our content creation hub for our interns. We want to focus on all types of contents. We currently have our own podcast The Flo Frequency.</p>',
    link: 'https://www.youtube.com/@FlomadLabs',
    linkText: 'Check out our YouTube!',
    order: 3,
    showOnHomepage: true,
    image: 'Frame-4.jpg'
  },
  {
    title: 'Flo Travel',
    description: '<p>AI is taking over in the market for travel. Flo Travel is using AI to help clients plan their trips accordingly. Plan your flight, hotel, trip, activites, etc. all in one place.</p>',
    link: 'https://www.flomadtravel.com/',
    linkText: 'Website',
    order: 4,
    showOnHomepage: true,
    image: 'Frame-5-3.jpg'
  }
];

// Full projects page projects
const ALL_PROJECTS = [
  {
    title: 'Flo Labs',
    description: '<p><strong>What The Project Is:</strong> The official portal for Flo Labs\' Research and Development.</p>',
    currentWork: '<p><strong>Current Work:</strong> Redesigning the site to reflect ongoing changes at Flo Labs.</p>',
    link: 'https://www.flomadlabs.com/',
    order: 5,
    showOnHomepage: false
  },
  {
    title: 'Flo Travel',
    description: '<p><strong>What The Project Is:</strong> A next-gen travel platform integrating AI and multimodal transportation to create seamless, personalized travel experiences.</p>',
    currentWork: '<p><strong>Current Work:</strong> Developing a sophisticated AI chatbot and enhancing the website for intuitive travel planning.</p>',
    link: 'https://www.flomadtravel.com/',
    order: 6,
    showOnHomepage: false
  },
  {
    title: 'Flo International',
    description: '<p><strong>What The Project Is:</strong> A global platform showcasing Flo Labs\' diverse initiatives, partnerships, and cutting-edge innovations in AI and technology.</p>',
    currentWork: '<p><strong>Current Work:</strong> Redesigning the website to better highlight Flo Labs\' mission, ongoing projects, and opportunities for collaboration and internships.</p>',
    link: 'https://flomad.international/',
    order: 7,
    showOnHomepage: false
  },
  {
    title: 'CAIPO',
    description: '<p><strong>What Project Is:</strong> An advanced AI-driven platform designed to deliver predictive analytics, actionable insights, and innovative solutions for industries like healthcare, education, and beyond.</p>',
    currentWork: '<p><strong>Current Work Focus</strong></p>',
    link: 'https://www.caipo.ai/',
    order: 8,
    showOnHomepage: false
  },
  {
    title: 'MoodChanger',
    description: '<p><strong>What Project Is:</strong> An AI-powered platform designed to enhance emotional well-being. It leverages advanced AI models to analyze user inputs and generate practical advice to improve happiness and reduce stress.</p>',
    currentWork: '<p><strong>Current Work Focus</strong></p>',
    link: 'https://www.flomadlabs.com/moodchanger-people',
    order: 9,
    showOnHomepage: false
  },
  {
    title: 'MoodChanger for Pets',
    description: '<p><strong>What The Project Is:</strong> Expanding MoodChanger for pet owners by using data from wearable devices, environmental factors, and AI analysis to provide actionable insights into pets\' behaviors, moods, and overall health.</p>',
    currentWork: '<p><strong>Current Work Focus</strong></p>',
    link: 'https://www.canva.com/design/DAGYja1TUd4/0uXWmOksp8B2tV22841r9g/view',
    order: 10,
    showOnHomepage: false
  },
  {
    title: 'Humanoid Robots',
    description: '<p><strong>What The Project Is:</strong> A major milestone in our mission to push the boundaries of intelligent systems and human-robot interaction and include that interns who join our program may have the opportunity to contribute directly to this groundbreaking initiative.</p><p>We are also launching RoboCollective.ai. Our one stop shop for all our robots and our partners robots and accessories.</p>',
    currentWork: '<p><strong>Current Work Focus</strong></p>',
    link: 'https://flomadlabs.com/',
    order: 11,
    showOnHomepage: false
  },
  {
    title: 'Flo Studios',
    description: '<p><strong>What The Project Is:</strong> Flo Studios will serve as a hub for creativity and innovation, bringing together UX/UI designers, multimedia creators, and marketing strategists to work on groundbreaking internal projects. We are currently upgrading and launching several new websites, including Flo Studios and our Robot Dealership site. If you\'re interested in website development, this could be a great opportunity to get involved.</p><p>While AI is a core focus of Flo Labs, we\'re excited to announce Flo Studios, a new creative agency within our company.</p>',
    currentWork: '<p><strong>Current Work Focus</strong></p>',
    link: 'https://www.youtube.com/@FlomadLabs',
    order: 12,
    showOnHomepage: false
  }
];

async function deleteAllProjects() {
  console.log('🗑️  Fetching existing projects...');
  const response = await fetch(`${STRAPI_URL}/api/projects`, {
    headers: {
      'Authorization': `Bearer ${STRAPI_API_TOKEN}`,
    },
  });

  const { data } = await response.json();
  
  console.log(`Found ${data.length} existing projects to delete`);
  
  for (const project of data) {
    console.log(`Deleting project ID ${project.id}...`);
    await fetch(`${STRAPI_URL}/api/projects/${project.id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${STRAPI_API_TOKEN}`,
      },
    });
  }
  
  console.log('✅ All existing projects deleted');
}

async function createProject(projectData) {
  const response = await fetch(`${STRAPI_URL}/api/projects`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${STRAPI_API_TOKEN}`,
    },
    body: JSON.stringify({
      data: projectData
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to create project ${projectData.title}: ${error}`);
  }

  const result = await response.json();
  return result.data;
}

async function main() {
  console.log('🚀 Starting project update...\n');

  // Delete all existing projects
  await deleteAllProjects();
  console.log('');

  // Create homepage projects
  console.log('📝 Creating homepage projects...');
  for (const project of HOMEPAGE_PROJECTS) {
    const created = await createProject(project);
    console.log(`✅ Created: ${created.attributes.title} (ID: ${created.id})`);
  }
  console.log('');

  // Create all projects for projects page
  console.log('📝 Creating projects page entries...');
  for (const project of ALL_PROJECTS) {
    const created = await createProject(project);
    console.log(`✅ Created: ${created.attributes.title} (ID: ${created.id})`);
  }

  console.log('\n✨ All projects updated successfully!');
  console.log('\n📋 Summary:');
  console.log(`   - ${HOMEPAGE_PROJECTS.length} projects will show on homepage`);
  console.log(`   - ${ALL_PROJECTS.length} projects will show on /projects page`);
  console.log(`   - Total: ${HOMEPAGE_PROJECTS.length + ALL_PROJECTS.length} projects created`);
}

main().catch(error => {
  console.error('❌ Error:', error.message);
  process.exit(1);
});
