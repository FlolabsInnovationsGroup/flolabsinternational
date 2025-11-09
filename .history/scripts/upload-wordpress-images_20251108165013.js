/**
 * Upload WordPress images to Strapi
 * 
 * Usage: STRAPI_API_TOKEN=<token> node upload-wordpress-images.js
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const STRAPI_URL = 'https://strapi-production-7ecb.up.railway.app';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;
const IMAGES_DIR = path.join(__dirname, 'wordpress-images');

if (!STRAPI_TOKEN) {
  console.error('Error: STRAPI_API_TOKEN environment variable is required');
  process.exit(1);
}

/**
 * Upload a file to Strapi using multipart form data
 */
async function uploadToStrapi(filePath) {
  return new Promise((resolve, reject) => {
    const fileName = path.basename(filePath);
    const fileContent = fs.readFileSync(filePath);
    const boundary = '----WebKitFormBoundary' + Math.random().toString(36).substring(2);
    
    // Build multipart form data manually
    const parts = [];
    parts.push(`--${boundary}\r\n`);
    parts.push(`Content-Disposition: form-data; name="files"; filename="${fileName}"\r\n`);
    parts.push(`Content-Type: ${getContentType(fileName)}\r\n\r\n`);
    
    const header = Buffer.from(parts.join(''));
    const footer = Buffer.from(`\r\n--${boundary}--\r\n`);
    const body = Buffer.concat([header, fileContent, footer]);
    
    const options = {
      hostname: 'strapi-production-7ecb.up.railway.app',
      path: '/api/upload',
      method: 'POST',
      headers: {
        'Content-Type': `multipart/form-data; boundary=${boundary}`,
        'Authorization': `Bearer ${STRAPI_TOKEN}`,
        'Content-Length': body.length
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          const response = JSON.parse(data);
          console.log(`✓ Uploaded: ${fileName} (ID: ${response[0].id})`);
          resolve(response[0]);
        } else {
          console.error(`✗ Failed to upload ${fileName}: ${res.statusCode}`);
          console.error(data);
          reject(new Error(`Upload failed: ${res.statusCode}`));
        }
      });
    });

    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

function getContentType(filename) {
  const ext = path.extname(filename).toLowerCase();
  const types = {
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.webp': 'image/webp'
  };
  return types[ext] || 'application/octet-stream';
}

/**
 * Main function
 */
async function main() {
  console.log('=== Uploading WordPress Images to Strapi ===\n');

  const images = [
    'image-33-e1731164191312.png',
    'image-29.png',
    'Frame-1-59.png',
    'Frame-26-1.jpg',
    'Frame-4.jpg',
    'Frame-203.jpg'
  ];

  let successCount = 0;
  let failCount = 0;

  for (const image of images) {
    try {
      const filePath = path.join(IMAGES_DIR, image);
      if (!fs.existsSync(filePath)) {
        console.error(`✗ File not found: ${image}`);
        failCount++;
        continue;
      }
      
      await uploadToStrapi(filePath);
      successCount++;
      
      // Rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.error(`✗ Error uploading ${image}:`, error.message);
      failCount++;
    }
  }

  console.log(`\n=== Upload Complete ===`);
  console.log(`✓ Success: ${successCount}`);
  console.log(`✗ Failed: ${failCount}`);
  console.log(`\nImages are now in Strapi media library at:`);
  console.log(`${STRAPI_URL}/admin/content-manager/upload`);
}

main().catch(console.error);
