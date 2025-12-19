# Deployment Guide

## Environment Variables Setup

### Vercel (Frontend) Environment Variables

In your Vercel project settings, add these environment variables:

1. **STRAPI_URL** - Your Render backend URL
   - Example: `https://your-app-name.onrender.com`
   - **Important**: Make sure this points to your Render backend URL (without `/api`)

### Render (Backend) Environment Variables

In your Render dashboard, add these environment variables:

1. **FRONTEND_URL** - Your Vercel frontend URL (optional, for CORS)

   - Example: `https://your-app.vercel.app`
   - Note: CORS is configured to allow all origins in production

2. **NODE_ENV** - Set to `production`

3. **DATABASE_URL** - Your database connection string (if using PostgreSQL)

4. **APP_KEYS** - Strapi app keys (generate with `openssl rand -base64 32`)

## Troubleshooting: Frontend Not Updating

If your Vercel frontend isn't reflecting CMS updates from Render:

### 1. Check Environment Variables

- Verify `STRAPI_URL` in Vercel points to your Render backend
- The URL should be: `https://your-app-name.onrender.com` (no trailing slash, no `/api`)

### 2. Verify CORS Configuration

- The backend CORS is configured to allow all origins in production
- If you still see CORS errors, check Render logs

### 3. Check Render Backend is Accessible

- Visit `https://your-app-name.onrender.com/api/pages` in your browser
- You should see JSON data, not an error

### 4. Force Vercel Rebuild

- After updating environment variables, trigger a new deployment in Vercel
- Go to Deployments → Redeploy

### 5. Check Vercel Function Logs

- In Vercel dashboard, check Function Logs for any fetch errors
- Look for `[Strapi DEBUG]` logs to see what URL is being fetched

### 6. Clear Browser Cache

- Hard refresh: `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)
- Or use incognito/private browsing mode

## Testing the Connection

1. **Test Backend API directly:**

   ```bash
   curl https://your-app-name.onrender.com/api/pages
   ```

2. **Check Vercel logs:**

   - Go to Vercel Dashboard → Your Project → Functions
   - Look for logs showing the STRAPI_URL being used

3. **Verify in browser console:**
   - Open browser DevTools → Network tab
   - Look for requests to your Render backend
   - Check if they're successful (200 status)

## Common Issues

### Issue: CORS Errors

**Solution:** The backend CORS is configured to allow all origins in production. If you still see CORS errors, check that `NODE_ENV=production` is set in Render.

### Issue: 404 Errors

**Solution:** Verify `STRAPI_URL` doesn't include `/api` at the end. The code adds `/api` automatically.

### Issue: Timeout Errors

**Solution:** Render free tier has cold starts. First request after inactivity may timeout. Consider upgrading or using a health check service to keep it warm.

### Issue: Still Seeing Old Content

**Solution:**

1. Verify `dynamic = 'force-dynamic'` is in your page files
2. Check that `cache: 'no-store'` is set in strapi.ts fetch calls
3. Hard refresh your browser (Ctrl+Shift+R)
4. Check Vercel deployment logs to ensure latest code is deployed
