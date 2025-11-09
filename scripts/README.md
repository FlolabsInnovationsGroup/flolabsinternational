# WordPress to Strapi Import Scripts

This directory contains scripts for importing WordPress content into your Railway Strapi instance.

## Prerequisites

1. **Strapi API Token**: You need an API token with full access permissions.

### Getting Your API Token

1. Go to your Strapi admin panel: https://strapi-production-7ecb.up.railway.app/admin
2. Navigate to **Settings** → **API Tokens** (in the left sidebar under "Global Settings")
3. Click **"Create new API Token"**
4. Configure the token:
   - **Name**: WordPress Import Script
   - **Description**: Token for importing WordPress data
   - **Token duration**: Unlimited (or set an expiration date)
   - **Token type**: Full access
5. Click **Save**
6. **IMPORTANT**: Copy the token immediately - it will only be shown once!

## Setup

1. Install dependencies:
```bash
cd scripts
npm install
```

2. Set your API token as an environment variable:
```bash
export STRAPI_API_TOKEN="your-token-here"
```

Or create a `.env` file in the scripts directory:
```
STRAPI_API_TOKEN=your-token-here
```

## Usage

### Import Internships from WordPress XML

```bash
node import-wordpress-to-strapi.js /path/to/wordpress-export.xml
```

Or if the file is in the default location:
```bash
node import-wordpress-to-strapi.js
```

The script will:
- ✅ Parse the WordPress XML export
- ✅ Extract internship posts (job listings, posts with "intern" in title)
- ✅ Create entries in Strapi via the API
- ✅ Skip duplicates (checks by slug)
- ✅ Parse requirements and responsibilities from descriptions
- ✅ Set appropriate status, location, and duration
- ✅ Assign the HubSpot form ID for applications

### What Gets Imported

For each internship, the script imports:
- **Title**: Position name
- **Slug**: URL-friendly identifier (auto-generated from title)
- **Status**: Open/Closed based on WordPress post status
- **Location**: Extracted from custom fields or defaults to "Remote"
- **Duration**: Extracted from custom fields or defaults to "3-6 months"
- **Description**: Main post content (cleaned HTML)
- **Requirements**: Extracted from description or defaults provided
- **Responsibilities**: Extracted from description or defaults provided
- **HubSpot Form ID**: Pre-configured form for applications

## After Import

1. Visit your Strapi admin to review imported internships:
   https://strapi-production-7ecb.up.railway.app/admin/content-manager/collection-types/api::internship.internship

2. Review each internship entry:
   - ✏️ Edit descriptions for clarity
   - ✏️ Add or refine requirements and responsibilities
   - 🖼️ Add images if needed
   - ✅ Verify status is correct (Open/Closed/Filled)

3. Check the live website:
   https://flolabsfrontend-64o8dn9tz-flomad-dev.vercel.app/internships

## Troubleshooting

### "STRAPI_API_TOKEN environment variable is required"
- Make sure you've set the token: `export STRAPI_API_TOKEN="your-token"`
- Or add it to a `.env` file in the scripts directory

### "XML file not found"
- Check the file path is correct
- The default path is: `/Users/elizabethstein/Downloads/flolabsrampdinternational.WordPress.2025-11-07.xml`
- Pass a custom path: `node import-wordpress-to-strapi.js /path/to/file.xml`

### "Failed to create internship: HTTP 401"
- Your API token is invalid or expired
- Create a new token in Strapi admin

### "Failed to create internship: HTTP 403"
- Your API token doesn't have sufficient permissions
- Create a new token with "Full access" permission type

### No internships found in XML
- The script looks for posts with type `job_listing` or `internship`
- Or posts with "intern" in the title
- Check the console output to see what post types were found
- You may need to adjust the filter logic in the script

## Notes

- The script includes automatic rate limiting (500ms between requests) to avoid overwhelming the API
- Duplicate entries (by slug) are automatically skipped
- Failed imports are logged but don't stop the entire process
- The script outputs a summary at the end showing success/skip/failure counts

## Support

If you encounter issues:
1. Check the console output for detailed error messages
2. Verify your API token is valid and has full access
3. Test the Strapi API manually: `curl https://strapi-production-7ecb.up.railway.app/api/internships -H "Authorization: Bearer YOUR_TOKEN"`
