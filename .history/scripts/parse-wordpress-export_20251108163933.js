const fs = require('fs');
const path = require('path');
const { XMLParser } = require('fast-xml-parser');

// Read the WordPress XML export
const xmlContent = fs.readFileSync(
  path.join(__dirname, 'wordpress-export-latest.xml'),
  'utf-8'
);

// Parse XML
const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
  textNodeName: '#text',
  ignoreDeclaration: true,
  parseTagValue: false
});

const xmlData = parser.parse(xmlContent);
const items = Array.isArray(xmlData.rss.channel.item) ? xmlData.rss.channel.item : [xmlData.rss.channel.item];

const pages = [];
const posts = [];
const jobs = [];

for (const item of items) {
  const type = item['wp:post_type'];
  const status = item['wp:status'];
  const title = (item.title || '').replace(/&#038;/g, '&').replace(/&amp;/g, '&');
  const slug = item['wp:post_name'];
  const content = item['content:encoded'] || '';
  
  if (status === 'publish' && type && title && slug) {
    const entry = { 
      title, 
      slug, 
      type, 
      content: content.substring(0, 300),
      link: item.link
    };
    
    if (type === 'page') {
      pages.push(entry);
    } else if (type === 'post') {
      posts.push(entry);
    } else if (type === 'jobs') {
      jobs.push(entry);
    }
  }
}

console.log('=== WORDPRESS EXPORT ANALYSIS ===\n');
console.log(`Total Pages: ${pages.length}`);
console.log(`Total Posts: ${posts.length}`);
console.log(`Total Jobs/Internships: ${jobs.length}\n`);

console.log('=== PUBLISHED PAGES ===');
for (const p of pages) {
  console.log(`- ${p.title} (/${p.slug})`);
}

console.log('\n=== PUBLISHED POSTS ===');
for (const p of posts) {
  console.log(`- ${p.title} (/${p.slug})`);
}

console.log('\n=== PUBLISHED JOBS/INTERNSHIPS ===');
for (const j of jobs) {
  console.log(`- ${j.title} (/${j.slug})`);
}

// Save detailed analysis
fs.writeFileSync(
  path.join(__dirname, 'wordpress-content-analysis.json'),
  JSON.stringify({ pages, posts, jobs }, null, 2)
);

console.log('\n✓ Detailed analysis saved to wordpress-content-analysis.json');
