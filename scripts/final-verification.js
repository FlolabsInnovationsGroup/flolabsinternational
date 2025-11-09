const fs = require('fs');

const STRAPI_URL = 'https://strapi-production-7ecb.up.railway.app';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

async function main() {
  // Fetch from Strapi
  const response = await fetch(`${STRAPI_URL}/api/internships?pagination[pageSize]=100`, {
    headers: { 'Authorization': `Bearer ${STRAPI_TOKEN}` }
  });
  
  const data = await response.json();
  const strapiInternships = data.data.map(item => ({
    id: item.id,
    title: item.title,
    slug: item.slug,
    hubspotFormId: item.hubspotFormId,
    status: item.status
  }));

  // WordPress internship slugs
  const wpSlugs = [
    "ai-agi-intern", "machine-learning-engineering-intern", "software-development-intern",
    "front-end-developer-intern", "ui-ux-design-intern", "embedded-systems-engineering-intern",
    "control-systems-engineering-intern", "qa-testing-intern", "content-marketing-intern",
    "sport-science-intern", "ethical-legal-research-intern", "robotics-engineering-intern",
    "computer-vision-engineering-intern", "neuroscience-intern", "biomedical-engineering-intern",
    "mechatronics-engineering-intern", "sensor-integration-engineering-intern",
    "human-robot-interaction-intern", "digital-marketing-intern", "seo-marketing-intern",
    "social-media-marketing-intern", "business-development-sales-intern",
    "operations-intern", "finance-intern", "project-management-intern",
    "product-development-intern", "prompt-engineer-intern", "technical-writing-intern",
    "podcast-production-intern", "edtech-intern", "research-associate-intern",
    "journalism-pr-intern", "hospitality-intern", "animal-science-intern",
    "go-to-market-influencer-intern", "go-to-market-engineer-intern",
    "space-science-engineering-intern", "quantum-engineering-intern", "marketing-intern"
  ];

  console.log('\n# INTERNSHIP VERIFICATION TABLE\n');
  console.log('| # | Internship Name | In WP | In Strapi | HubSpot Form ID | Status |');
  console.log('|---|-----------------|-------|-----------|-----------------|--------|');

  const strapiBySlug = Object.fromEntries(strapiInternships.map(i => [i.slug, i]));
  const wpSet = new Set(wpSlugs);
  let matched = 0;

  // Check WordPress internships
  wpSlugs.forEach((slug, idx) => {
    const strapi = strapiBySlug[slug];
    if (strapi) {
      matched++;
      const formId = strapi.hubspotFormId || 'MISSING';
      const status = strapi.hubspotFormId ? '✅' : '⚠️ No Form';
      const shortFormId = formId === 'MISSING' ? 'MISSING' : formId.substring(0, 8) + '...';
      console.log(`| ${(idx + 1).toString().padStart(2)} | ${strapi.title.substring(0, 40).padEnd(40)} | ✅ | ✅ | ${shortFormId.padEnd(15)} | ${status.padEnd(11)} |`);
    } else {
      console.log(`| ${(idx + 1).toString().padStart(2)} | ${slug.padEnd(40)} | ✅ | ❌ | N/A | ❌ Missing |`);
    }
  });

  // Extra in Strapi
  console.log('\n## EXTRA IN STRAPI (Not in WordPress)\n');
  console.log('| # | Internship Name | In WP | In Strapi | HubSpot Form ID | Status |');
  console.log('|---|-----------------|-------|-----------|-----------------|--------|');
  
  strapiInternships.filter(s => !wpSet.has(s.slug)).forEach((item, idx) => {
    const formId = item.hubspotFormId || 'MISSING';
    const status = item.hubspotFormId ? '✅' : '⚠️ No Form';
    const shortFormId = formId === 'MISSING' ? 'MISSING' : formId.substring(0, 8) + '...';
    console.log(`| ${(wpSlugs.length + idx + 1).toString().padStart(2)} | ${item.title.substring(0, 40).padEnd(40)} | ❌ | ✅ | ${shortFormId.padEnd(15)} | ${status.padEnd(11)} |`);
  });

  // Summary
  const formIds = strapiInternships.map(i => i.hubspotFormId).filter(Boolean);
  const uniqueFormIds = [...new Set(formIds)];
  
  console.log('\n## SUMMARY\n');
  console.log(`- WordPress internships: ${wpSlugs.length}`);
  console.log(`- Strapi internships: ${strapiInternships.length}`);
  console.log(`- Matched: ${matched}`);
  console.log(`- Missing from Strapi: ${wpSlugs.length - matched}`);
  console.log(`- Extra in Strapi: ${strapiInternships.length - matched}`);
  console.log(`\n### HubSpot Forms:`);
  console.log(`- With form IDs: ${formIds.length}/${strapiInternships.length}`);
  console.log(`- Unique form IDs: ${uniqueFormIds.length}`);
  console.log(`- Missing forms: ${strapiInternships.length - formIds.length}`);
  console.log(`- Forms are: ${formIds.length === uniqueFormIds.length ? 'ALL UNIQUE ✅' : 'SHARED ⚠️'}`);
  
  if (uniqueFormIds.length <= 5) {
    console.log(`\n### Form IDs:`);
    uniqueFormIds.forEach(id => console.log(`- ${id}`));
  }
}

main().catch(console.error);
