const STRAPI_URL = 'https://strapi-production-7ecb.up.railway.app';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

async function fetchInternships() {
  const response = await fetch(`${STRAPI_URL}/api/internships?pagination[pageSize]=100&populate=*`, {
    headers: {
      'Authorization': `Bearer ${STRAPI_TOKEN}`
    }
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  const data = await response.json();
  
  // Save raw response first
  const fs = require('fs');
  fs.writeFileSync('/tmp/strapi_raw.json', JSON.stringify(data, null, 2));
  console.log('✅ Raw data saved to /tmp/strapi_raw.json');
  
  console.log(`\n📊 Total Internships in Strapi: ${data.data.length}\n`);
  console.log('='.repeat(120));
  console.log('| # | Title | Slug | HubSpot Form ID | Status |');
  console.log('='.repeat(120));
  
  const sortedInternships = data.data
    .filter(i => i && i.attributes)
    .sort((a, b) => a.attributes.title.localeCompare(b.attributes.title));
  
  sortedInternships.forEach((internship, index) => {
    const title = (internship.attributes.title || 'Untitled').substring(0, 45).padEnd(45);
    const slug = (internship.attributes.slug || 'no-slug').substring(0, 40).padEnd(40);
    const formId = (internship.attributes.hubspotFormId || 'MISSING').substring(0, 36).padEnd(36);
    const status = (internship.attributes.status || 'Unknown').padEnd(10);
    
    console.log(`| ${(index + 1).toString().padEnd(3)} | ${title} | ${slug} | ${formId} | ${status} |`);
  });
  
  console.log('='.repeat(120));
  
  // Check for unique vs shared form IDs
  const formIds = sortedInternships
    .map(i => i.attributes.hubspotFormId)
    .filter(id => id);
  
  const uniqueFormIds = [...new Set(formIds)];
  const missingFormIds = sortedInternships.filter(i => !i.attributes.hubspotFormId).length;
  
  console.log(`\n📝 HubSpot Form Summary:`);
  console.log(`   Total internships: ${sortedInternships.length}`);
  console.log(`   With form IDs: ${formIds.length}`);
  console.log(`   Without form IDs: ${missingFormIds}`);
  console.log(`   Unique form IDs: ${uniqueFormIds.length}`);
  console.log(`   Shared forms: ${formIds.length > uniqueFormIds.length ? 'Yes - some internships share forms' : 'No - all forms are unique'}`);
  
  if (uniqueFormIds.length <= 10) {
    console.log(`\n   Form IDs used:`);
    uniqueFormIds.forEach(id => console.log(`   - ${id}`));
  }
}

fetchInternships().catch(console.error);
