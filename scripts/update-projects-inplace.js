/**
 * Update existing projects in Strapi to match flolabs.international
 * This updates the existing 8 projects instead of deleting/recreating
 */

const STRAPI_URL = process.env.STRAPI_URL || 'https://strapi-production-7ecb.up.railway.app';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

if (!STRAPI_API_TOKEN) {
  console.error('❌ STRAPI_API_TOKEN environment variable is required');
  process.exit(1);
}

// Map existing IDs to new data
const PROJECTS_UPDATE = {
  26: {
    title: 'MoodChanger',
    slug: 'moodchanger',
    description: '<p>MoodChanger is your one stop shop for all things AI. You can manage various AI systems through this app. Check out all of the exciting AI technologies being connected.</p>',
    link: 'https://www.flomadlabs.com/moodchanger-people',
    order: 1,
    showOnHomepage: true,
    currentWork: null
  },
  21: {
    title: 'CAIPO',
    slug: 'caipo',
    description: '<p>CAIPO is Chief Artificial Intelligence Productivity Officer. This is a wearable AI tech that can record audio and video for note taking. The AI can assist you with summarizing or finding sections of your notes.</p>',
    link: 'https://www.flomadlabs.com/caipo',
    order: 2,
    showOnHomepage: true,
    currentWork: null
  },
  23: {
    title: 'Flo Studios',
    slug: 'flo-studios',
    description: '<p>Flo Studios is our content creation hub for our interns. We want to focus on all types of contents. We currently have our own podcast The Flo Frequency.</p>',
    link: 'https://www.youtube.com/@FlomadLabs',
    order: 3,
    showOnHomepage: true,
    currentWork: null
  },
  27: {
    title: 'Flo Travel',
    slug: 'flo-travel',
    description: '<p>AI is taking over in the market for travel. Flo Travel is using AI to help clients plan their trips accordingly. Plan your flight, hotel, trip, activites, etc. all in one place.</p>',
    link: 'https://www.flomadtravel.com/',
    order: 4,
    showOnHomepage: true,
    currentWork: null
  },
  29: {
    title: 'Flo Labs',
    slug: 'flo-labs',
    description: '<p><strong>What The Project Is:</strong> The official portal for Flo Labs\' Research and Development.</p>',
    currentWork: '<p><strong>Current Work:</strong> Redesigning the site to reflect ongoing changes at Flo Labs.</p>',
    link: 'https://www.flomadlabs.com/',
    order: 5,
    showOnHomepage: false
  },
  30: {
    title: 'Flo International',
    slug: 'flo-international',
    description: '<p><strong>What The Project Is:</strong> A global platform showcasing Flo Labs\' diverse initiatives, partnerships, and cutting-edge innovations in AI and technology.</p>',
    currentWork: '<p><strong>Current Work:</strong> Redesigning the website to better highlight Flo Labs\' mission, ongoing projects, and opportunities for collaboration and internships.</p>',
    link: 'https://flomad.international/',
    order: 6,
    showOnHomepage: false
  },
  31: {
    title: 'MoodChanger for Pets',
    slug: 'moodchanger-for-pets',
    description: '<p><strong>What The Project Is:</strong> Expanding MoodChanger for pet owners by using data from wearable devices, environmental factors, and AI analysis to provide actionable insights into pets\' behaviors, moods, and overall health.</p>',
    currentWork: '<p><strong>Current Work Focus</strong></p>',
    link: 'https://www.canva.com/design/DAGYja1TUd4/0uXWmOksp8B2tV22841r9g/view',
    order: 7,
    showOnHomepage: false
  },
  32: {
    title: 'Humanoid Robots',
    slug: 'humanoid-robots',
    description: '<p><strong>What The Project Is:</strong> A major milestone in our mission to push the boundaries of intelligent systems and human-robot interaction and include that interns who join our program may have the opportunity to contribute directly to this groundbreaking initiative.</p><p>We are also launching RoboCollective.ai. Our one stop shop for all our robots and our partners robots and accessories.</p>',
    currentWork: '<p><strong>Current Work Focus</strong></p>',
    link: 'https://flomadlabs.com/',
    order: 8,
    showOnHomepage: false
  }
};

async function updateProject(id, projectData) {
  const response = await fetch(`${STRAPI_URL}/api/projects/${id}`, {
    method: 'PUT',
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
    throw new Error(`Failed to update project ${id}: ${error}`);
  }

  const result = await response.json();
  return result.data;
}

async function main() {
  console.log('🚀 Starting project updates...\n');

  for (const [id, projectData] of Object.entries(PROJECTS_UPDATE)) {
    try {
      const updated = await updateProject(id, projectData);
      console.log(`✅ Updated ID ${id}: ${updated.attributes.title}`);
    } catch (error) {
      console.error(`❌ Failed to update ID ${id}:`, error.message);
    }
  }

  console.log('\n✨ All projects updated successfully!');
  console.log('\n📋 Summary:');
  console.log('   - 4 projects marked showOnHomepage=true (will appear on homepage)');
  console.log('   - 4 projects marked showOnHomepage=false (Projects page only)');
}

main().catch(error => {
  console.error('❌ Error:', error.message);
  process.exit(1);
});
