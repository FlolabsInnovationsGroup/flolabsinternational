// Compare WordPress internships with Strapi

const wpInternships = [
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
  'Technical Writing Intern',
  'Prompt Engineer Intern',
  'Product Development Intern (AI & Robotics)',
  'Ethical and Legal Research Intern',
  'EdTech and Innovation Intern',
  'AI/AGI Intern',
  'Podcast Production Intern Position',
  'Digital Marketing Intern',
  'Content Marketing Intern',
  'Business Development and Sales Intern (AI & Robotics)',
  'Software Development Intern',
  'Sensor Integration Intern',
  'Mechatronics Engineering Intern',
  'Human-Robot Interaction Intern',
  'Embedded Systems Intern',
  'Control Systems Engineering Intern',
  'Computer Vision Engineering Intern',
  'Marketing Intern',
  'Front-end Developer Intern',
  'Project Management Intern',
  'Biomedical Engineering Intern',
  'Machine Learning Engineering Intern',
  'Neuroscience Intern'
];

async function compare() {
  const response = await fetch('https://strapi-production-7ecb.up.railway.app/api/internships?pagination[pageSize]=100');
  const data = await response.json();
  
  console.log('WordPress has:', wpInternships.length, 'internships');
  console.log('Strapi has:', data.meta.pagination.total, 'internships\n');
  
  console.log('Extra/unwanted in Strapi:');
  const extras = [];
  data.data.forEach(i => {
    const title = i.title.replace(/&amp;/g, '&');
    if (!wpInternships.includes(title)) {
      extras.push(i.title);
    }
  });
  if (extras.length === 0) {
    console.log('  None');
  } else {
    extras.forEach(t => console.log('  - ' + t));
  }
  
  console.log('\nMissing from Strapi:');
  const missing = [];
  wpInternships.forEach(wp => {
    const found = data.data.some(i => i.title.replace(/&amp;/g, '&') === wp);
    if (!found) {
      missing.push(wp);
    }
  });
  if (missing.length === 0) {
    console.log('  None');
  } else {
    missing.forEach(t => console.log('  - ' + t));
  }
  
  console.log('\n' + '='.repeat(50));
  if (extras.length === 0 && missing.length === 0 && data.meta.pagination.total === 39) {
    console.log('✅ PERFECT MATCH! Strapi has exactly 39 WordPress internships');
  } else {
    console.log('⚠️  Need to delete ' + extras.length + ' extra and add ' + missing.length + ' missing');
  }
  console.log('='.repeat(50));
}

compare();
