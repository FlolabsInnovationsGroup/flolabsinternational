const fs = require('fs');

// Load WordPress data
const wordpressInternships = [
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

// Load Strapi data
const strapiRaw = JSON.parse(fs.readFileSync('/tmp/strapi_raw.json', 'utf8'));
const strapiInternships = strapiRaw.data.map(item => ({
  title: item.title,
  slug: item.slug,
  hubspotFormId: item.hubspotFormId,
  status: item.status
}));

console.log('\n# COMPREHENSIVE INTERNSHIP VERIFICATION TABLE\n');
console.log('| # | Internship Name | In WordPress | In Strapi | HubSpot Form ID | Status |');
console.log('|---|----------------|--------------|-----------|-----------------|--------|');

const wpSlugs = new Set(wordpressInternships);
const strapiBySlug = Object.fromEntries(strapiInternships.map(i => [i.slug, i]));

// WordPress internships
wordpressInternships.forEach((slug, index) => {
  const strapiData = strapiBySlug[slug];
  const inStrapi = strapiData ? '✅ Yes' : '❌ No';
  const formId = strapiData?.hubspotFormId || 'N/A';
  const status = strapiData ? (strapiData.hubspotFormId ? '✅' : '⚠️ Missing Form') : '❌';
  const title = strapiData?.title || slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  
  console.log(`| ${(index + 1).toString().padStart(2)} | ${title.padEnd(45)} | ✅ Yes | ${inStrapi.padEnd(9)} | ${formId.substring(0, 36).padEnd(36)} | ${status.padEnd(18)} |`);
});

// Find Strapi-only internships
const strapiOnlySlugs = strapiInternships.filter(s => !wpSlugs.has(s.slug));
if (strapiOnlySlugs.length > 0) {
  console.log('\n## EXTRA INTERNSHIPS IN STRAPI (Not in WordPress)\n');
  console.log('| # | Internship Name | In WordPress | In Strapi | HubSpot Form ID | Status |');
  console.log('|---|----------------|--------------|-----------|-----------------|--------|');
  
  strapiOnlySlugs.forEach((item, index) => {
    const formId = item.hubspotFormId || 'N/A';
    const status = item.hubspotFormId ? '✅' : '⚠️ Missing Form';
    console.log(`| ${(wordpressInternships.length + index + 1).toString().padStart(2)} | ${item.title.padEnd(45)} | ❌ No  | ✅ Yes     | ${formId.substring(0, 36).padEnd(36)} | ${status.padEnd(18)} |`);
  });
}

// Summary
console.log('\n## SUMMARY\n');
console.log(`- WordPress Internships: ${wordpressInternships.length}`);
console.log(`- Strapi Internships: ${strapiInternships.length}`);
console.log(`- Matched: ${wordpressInternships.filter(slug => strapiBySlug[slug]).length}`);
console.log(`- Extra in Strapi: ${strapiOnlySlugs.length}`);
console.log(`- Missing from Strapi: ${wordpressInternships.filter(slug => !strapiBySlug[slug]).length}`);

// HubSpot Form Analysis
const formIds = strapiInternships.map(i => i.hubspotFormId).filter(Boolean);
const uniqueFormIds = [...new Set(formIds)];
console.log(`\n## HUBSPOT FORM ANALYSIS\n`);
console.log(`- Total internships with forms: ${formIds.length}/${strapiInternships.length}`);
console.log(`- Unique form IDs: ${uniqueFormIds.length}`);
console.log(`- Internships missing forms: ${strapiInternships.length - formIds.length}`);
console.log(`- Forms are ${formIds.length === uniqueFormIds.length ? 'UNIQUE' : 'SHARED'}`);

if (uniqueFormIds.length <= 10) {
  console.log(`\n### Form IDs Used:\n`);
  uniqueFormIds.forEach(id => console.log(`- \`${id}\``));
}
