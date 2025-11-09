/**
 * Sync Missing Internships from Static File to Strapi
 * 
 * This script identifies internships that exist in the static data file
 * but are missing from Strapi, and uploads them to Strapi.
 */

const fs = require('fs');
const path = require('path');

// Configuration
const STRAPI_URL = process.env.STRAPI_URL || 'https://strapi-production-7ecb.up.railway.app';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

if (!STRAPI_TOKEN) {
  console.error('❌ Error: STRAPI_API_TOKEN environment variable is required');
  console.log('Please set it in your .env file or export it:');
  console.log('export STRAPI_API_TOKEN="your-token-here"');
  process.exit(1);
}

// List of internships that are missing from Strapi (from WordPress)
const MISSING_INTERNSHIPS = [
  'GTM Influencer Intern',
  'GTM Engineer (Go-To-Market Engineer) Intern',
  'Space Science Intern',
  'Quantum Engineer Intern',
  'Animal Science and Veterinary Research Intern',
  'Research Associate Intern (Open-Source Projects)',
  'Finance Intern',
  'Social Media Intern',
  'Journalism & PR Intern',
  'SEO Specialist Intern',
  'Hospitality and Tourism Intern',
  'Sport Science Intern',
  'UI/UX Design Intern',
  'Robotics Engineering Intern',
  'Quality Assurance Intern',
  'Operations Intern',
  'Prompt Engineer Intern',
  'Product Development Intern (AI & Robotics)',
  'Ethical and Legal Research Intern',
  'Business Development and Sales Intern (AI & Robotics)',
];

/**
 * Fetch existing internships from Strapi
 */
async function getExistingInternships() {
  try {
    const response = await fetch(`${STRAPI_URL}/api/internships`, {
      headers: {
        'Authorization': `Bearer ${STRAPI_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch internships: ${response.status}`);
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching existing internships:', error.message);
    throw error;
  }
}

/**
 * Load internships from static data file
 */
function loadStaticInternships() {
  try {
    // Read the TypeScript file as text
    const filePath = path.join(__dirname, '../frontend/lib/internships-data.ts');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    
    // Extract internship objects using regex
    const internshipMatches = fileContent.matchAll(/\{[^}]*title:\s*['"]([^'"]+)['"],[^}]*\}/gs);
    const internships = [];
    
    for (const match of internshipMatches) {
      const objText = match[0];
      
      // Extract fields using regex
      const titleMatch = objText.match(/title:\s*['"](.*?)['"]/);
      const slugMatch = objText.match(/slug:\s*['"](.*?)['"]/);
      const categoryMatch = objText.match(/category:\s*['"](.*?)['"]/);
      const descriptionMatch = objText.match(/description:\s*['"](.*?)['"]/s);
      const statusMatch = objText.match(/status:\s*['"](.*?)['"]/);
      const locationMatch = objText.match(/location:\s*['"](.*?)['"]/);
      const durationMatch = objText.match(/duration:\s*['"](.*?)['"]/);
      
      if (titleMatch && slugMatch) {
        internships.push({
          title: titleMatch[1],
          slug: slugMatch[1],
          category: categoryMatch ? categoryMatch[1] : 'General',
          description: descriptionMatch ? descriptionMatch[1].replace(/\\'/g, "'") : '',
          status: statusMatch ? statusMatch[1] : 'Open',
          location: locationMatch ? locationMatch[1] : 'Remote',
          duration: durationMatch ? durationMatch[1] : '3-6 months',
        });
      }
    }
    
    return internships;
  } catch (error) {
    console.error('Error loading static internships:', error.message);
    throw error;
  }
}

/**
 * Create an internship in Strapi
 */
async function createInternship(internshipData) {
  try {
    const response = await fetch(`${STRAPI_URL}/api/internships`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${STRAPI_TOKEN}`,
      },
      body: JSON.stringify({ data: internshipData }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to create internship: ${response.status} - ${errorText}`);
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error(`Error creating internship "${internshipData.title}":`, error.message);
    throw error;
  }
}

/**
 * Main sync function
 */
async function syncMissingInternships() {
  console.log('🔍 Starting internship sync...\n');
  
  try {
    // Step 1: Load static internships
    console.log('📂 Loading static internships from file...');
    const staticInternships = loadStaticInternships();
    console.log(`   Found ${staticInternships.length} internships in static file\n`);
    
    // Step 2: Fetch existing Strapi internships
    console.log('🌐 Fetching existing internships from Strapi...');
    const existingInternships = await getExistingInternships();
    console.log(`   Found ${existingInternships.length} internships in Strapi\n`);
    
    // Step 3: Find missing internships
    console.log('🔎 Identifying missing internships...');
    const existingTitles = existingInternships.map(i => i.title);
    const missingInternships = staticInternships.filter(intern => 
      MISSING_INTERNSHIPS.some(title => 
        intern.title.toLowerCase().includes(title.toLowerCase()) ||
        title.toLowerCase().includes(intern.title.toLowerCase())
      ) && !existingTitles.includes(intern.title)
    );
    
    console.log(`   Missing internships: ${missingInternships.length}\n`);
    
    if (missingInternships.length === 0) {
      console.log('✅ All internships are already in Strapi!');
      return;
    }
    
    // Step 4: Upload missing internships
    console.log('📤 Uploading missing internships to Strapi...\n');
    let successCount = 0;
    let failCount = 0;
    
    for (const internship of missingInternships) {
      try {
        console.log(`   Uploading: ${internship.title}`);
        await createInternship(internship);
        successCount++;
        console.log(`   ✅ Success\n`);
        
        // Add a small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (error) {
        failCount++;
        console.log(`   ❌ Failed: ${error.message}\n`);
      }
    }
    
    // Summary
    console.log('\n' + '='.repeat(50));
    console.log('📊 Sync Summary:');
    console.log('='.repeat(50));
    console.log(`✅ Successfully uploaded: ${successCount}`);
    console.log(`❌ Failed: ${failCount}`);
    console.log(`📝 Total missing: ${missingInternships.length}`);
    console.log('='.repeat(50));
    
    if (successCount > 0) {
      console.log('\n🎉 Internships have been synced to Strapi!');
      console.log('   You can verify at:', `${STRAPI_URL}/admin/content-manager/collection-types/api::internship.internship`);
    }
    
  } catch (error) {
    console.error('\n❌ Fatal error:', error.message);
    process.exit(1);
  }
}

// Run the script
syncMissingInternships();
