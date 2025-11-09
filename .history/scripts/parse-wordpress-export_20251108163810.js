const fs = require('fs');
const path = require('path');

// Read the WordPress XML export
const xmlContent = fs.readFileSync(
  path.join(__dirname, 'wordpress-export-latest.xml'),
  'utf-8'
);

// Extract pages
const pageMatches = xmlContent.match(/<item>[\s\S]*?<\/item>/g) || [];

const pages = [];
const posts = [];
const jobs = [];

pageMatches.forEach(item => {
  const typeMatch = item.match(/<wp:post_type><!\[CDATA\[(.*?)\]\]><\/wp:post_type>/);
  const statusMatch = item.match(/<wp:status><!\[CDATA\[(.*?)\]\]><\/wp:status>/);
  const titleMatch = item.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/) || item.match(/<title>(.*?)<\/title>/);
  const slugMatch = item.match(/<wp:post_name><!\[CDATA\[(.*?)\]\]><\/wp:post_name>/);
  const contentMatch = item.match(/<content:encoded><!\[CDATA\[([\s\S]*?)\]\]><\/content:encoded>/);
  
  const type = typeMatch ? typeMatch[1] : null;
  const status = statusMatch ? statusMatch[1] : null;
  const title = titleMatch ? (titleMatch[1] || titleMatch[2] || '').replace(/&#038;/g, '&').replace(/&amp;/g, '&') : '';
  const slug = slugMatch ? slugMatch[1] : null;
  const content = contentMatch ? contentMatch[1] : '';
  
  if (status === 'publish' && type && title && slug) {
    const entry = { title, slug, type, content: content.substring(0, 200) };
    
    if (type === 'page') {
      pages.push(entry);
    } else if (type === 'post') {
      posts.push(entry);
    } else if (type === 'jobs') {
      jobs.push(entry);
    }
  }
});

console.log('=== WORDPRESS EXPORT ANALYSIS ===\n');
console.log(`Total Pages: ${pages.length}`);
console.log(`Total Posts: ${posts.length}`);
console.log(`Total Jobs/Internships: ${jobs.length}\n`);

console.log('=== PUBLISHED PAGES ===');
pages.forEach(p => console.log(`- ${p.title} (/${p.slug})`));

console.log('\n=== PUBLISHED POSTS ===');
posts.forEach(p => console.log(`- ${p.title} (/${p.slug})`));

console.log('\n=== PUBLISHED JOBS/INTERNSHIPS ===');
jobs.forEach(j => console.log(`- ${j.title} (/${j.slug})`));

// Save detailed analysis
fs.writeFileSync(
  path.join(__dirname, 'wordpress-content-analysis.json'),
  JSON.stringify({ pages, posts, jobs }, null, 2)
);

console.log('\n✓ Detailed analysis saved to wordpress-content-analysis.json');
