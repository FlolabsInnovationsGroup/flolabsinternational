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
console.log('Keys in XML:', Object.keys(xmlData));
console.log('Keys in channel:', Object.keys(xmlData.rss.channel));

const items = xmlData.rss.channel.item || [];
console.log(`Total items: ${Array.isArray(items) ? items.length : 1}`);

// Sample first item
const firstItem = Array.isArray(items) ? items[0] : items;
console.log('\nFirst item keys:', Object.keys(firstItem));
console.log('First item post type:', firstItem['wp:post_type']);
console.log('First item status:', firstItem['wp:status']);
console.log('First item title:', firstItem.title);
