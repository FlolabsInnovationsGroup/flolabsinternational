# 413 Request Entity Too Large - Fix Documentation

## Problem
The "413 Request Entity Too Large" error occurs when uploading large files or sending large payloads to the Strapi backend. This is typically caused by default request size limits in the server configuration.

## Solution Implemented

### 1. Strapi Middleware Configuration (`strapi/app/config/middlewares.ts`)

**Changes:**
- Increased `formLimit` to 256MB (for form data)
- Increased `jsonLimit` to 256MB (for JSON payloads)
- Increased `textLimit` to 256MB (for text payloads)
- Set `maxFileSize` to 250MB for file uploads via formidable

```typescript
{
  name: 'strapi::body',
  config: {
    formLimit: '256mb',
    jsonLimit: '256mb',
    textLimit: '256mb',
    formidable: {
      maxFileSize: 250 * 1024 * 1024, // 250MB
    },
  },
}
```

### 2. Strapi Upload Plugin Configuration (`strapi/app/config/plugins.ts`)

**Changes:**
- Set media library upload size limit to 250MB

```typescript
export default () => ({
  upload: {
    config: {
      sizeLimit: 250 * 1024 * 1024, // 250MB in bytes
    },
  },
});
```

### 3. Strapi Server Configuration (`strapi/app/config/server.ts`)

**Changes:**
- Increased request timeout to 5 minutes (300,000ms) to accommodate large file uploads
- Added proxy configuration for Railway deployment

```typescript
timeout: 300000, // 5 minutes in milliseconds
```

## Deployment

### Railway (Backend)
The changes will take effect automatically when you push to the `main` branch. Railway will:
1. Detect the changes in the Strapi configuration
2. Rebuild and redeploy the backend
3. Apply the new upload limits

**No manual configuration needed in Railway dashboard.**

### Vercel (Frontend)
The frontend doesn't handle file uploads directly (that's done by Strapi), so no additional configuration is needed for Vercel.

## Testing

After deployment, you can test the fix by:

1. **Upload a large image to Strapi Media Library:**
   - Go to https://strapi-production-7ecb.up.railway.app/admin
   - Navigate to Media Library
   - Upload an image larger than the previous limit (typically ~10MB)

2. **Create content with large data:**
   - Create an internship or blog post with extensive content
   - Add multiple images
   - Verify no 413 errors occur

## Limits Summary

| Configuration | Previous Limit | New Limit |
|--------------|----------------|-----------|
| Form Data | ~1MB (default) | 256MB |
| JSON Payload | ~1MB (default) | 256MB |
| Text Payload | ~1MB (default) | 256MB |
| File Upload | ~10MB (default) | 250MB |
| Request Timeout | 60s (default) | 300s (5 min) |

## Troubleshooting

### If 413 errors still occur:

1. **Check Railway Logs:**
   ```bash
   # View Railway logs
   railway logs
   ```

2. **Verify environment variables:**
   - Ensure Railway has redeployed with the new configuration
   - Check that no proxy or load balancer is imposing additional limits

3. **Railway Proxy Limits:**
   - Railway's proxy has a 100MB limit by default
   - If you need larger files, contact Railway support or consider using direct S3/Cloud Storage

4. **Browser Limits:**
   - Some browsers may timeout on very large uploads
   - Consider implementing chunked upload for files >100MB

### Alternative Solution for Very Large Files

For files >250MB, consider:
1. **Cloud Storage Integration:**
   - AWS S3
   - Google Cloud Storage
   - Cloudflare R2

2. **Chunked Uploads:**
   - Implement multipart upload
   - Split large files into chunks
   - Upload incrementally

## Related Files

- `strapi/app/config/middlewares.ts` - Body parser limits
- `strapi/app/config/plugins.ts` - Upload plugin limits
- `strapi/app/config/server.ts` - Server timeout configuration

## References

- [Strapi Middleware Documentation](https://docs.strapi.io/dev-docs/configurations/middlewares)
- [Strapi Upload Plugin](https://docs.strapi.io/dev-docs/plugins/upload)
- [Railway Documentation](https://docs.railway.app/)
