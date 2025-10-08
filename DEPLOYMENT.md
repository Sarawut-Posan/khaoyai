# Deployment Guide

This guide provides detailed instructions for deploying the Khao Yai Presentation app to various platforms.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Vercel Deployment (Recommended)](#vercel-deployment-recommended)
- [Static Export Deployment](#static-export-deployment)
- [Environment Variables](#environment-variables)
- [Post-Deployment Checklist](#post-deployment-checklist)
- [Troubleshooting](#troubleshooting)

## Prerequisites

Before deploying, ensure:

- ✅ All code is committed to Git
- ✅ Build succeeds locally (`npm run build`)
- ✅ No TypeScript errors (`npm run lint`)
- ✅ All environment variables are documented in `.env.example`
- ✅ Images load correctly from external URLs

## Vercel Deployment (Recommended)

Vercel is the recommended platform for deploying Next.js applications. It provides:
- Automatic deployments on Git push
- Preview deployments for pull requests
- Edge network CDN for fast global delivery
- Automatic SSL certificates
- Zero configuration for Next.js

### Method 1: Deploy via Vercel Dashboard

1. **Sign up/Login to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub, GitLab, or Bitbucket

2. **Import Project**
   - Click "Add New Project"
   - Select your Git repository
   - Vercel will auto-detect Next.js configuration

3. **Configure Project**
   - **Project Name**: `khao-yai-presentation` (or your preferred name)
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (or `khao-yai-presentation` if in monorepo)
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `.next` (auto-detected)
   - **Install Command**: `npm install` (auto-detected)

4. **Set Environment Variables**
   - Click "Environment Variables"
   - Add variables from `.env.example`:
     ```
     NEXT_PUBLIC_SITE_URL = https://your-project.vercel.app
     ```
   - Add any optional variables (GA_ID, etc.)

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete (usually 1-2 minutes)
   - Your site will be live at `https://your-project.vercel.app`

### Method 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy from Project Directory**
   ```bash
   cd khao-yai-presentation
   vercel
   ```

4. **Follow Prompts**
   - Set up and deploy: Yes
   - Which scope: Select your account
   - Link to existing project: No (first time)
   - Project name: khao-yai-presentation
   - Directory: ./
   - Override settings: No

5. **Deploy to Production**
   ```bash
   vercel --prod
   ```

### Automatic Deployments

Once connected to Vercel:

- **Production Deployment**: Every push to `main` branch
- **Preview Deployment**: Every push to feature branches
- **PR Deployments**: Automatic preview for pull requests

### Custom Domain Setup

1. Go to Project Settings → Domains
2. Click "Add Domain"
3. Enter your domain (e.g., `trip.yourdomain.com`)
4. Follow DNS configuration instructions:
   - **A Record**: Point to Vercel's IP
   - **CNAME**: Point to `cname.vercel-dns.com`
5. Wait for DNS propagation (5-60 minutes)
6. SSL certificate is automatically provisioned

## Static Export Deployment

For platforms like Netlify, GitHub Pages, AWS S3, or any static hosting:

### Step 1: Configure for Static Export

Update `next.config.ts`:

```typescript
const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // Required for static export
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/photo-**',
      },
    ],
  },
  trailingSlash: true,
};
```

### Step 2: Build Static Site

```bash
npm run build
```

This creates an `out` directory with static HTML/CSS/JS files.

### Step 3: Deploy to Platform

#### Netlify

1. **Via Netlify Dashboard**:
   - Drag and drop the `out` folder to [netlify.com/drop](https://app.netlify.com/drop)

2. **Via Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   netlify deploy --prod --dir=out
   ```

3. **Via Git Integration**:
   - Connect repository to Netlify
   - Build command: `npm run build`
   - Publish directory: `out`

#### GitHub Pages

1. **Install gh-pages**:
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add Deploy Script** to `package.json`:
   ```json
   "scripts": {
     "deploy": "next build && touch out/.nojekyll && gh-pages -d out -t true"
   }
   ```

3. **Deploy**:
   ```bash
   npm run deploy
   ```

4. **Configure GitHub Pages**:
   - Go to repository Settings → Pages
   - Source: Deploy from branch `gh-pages`

#### AWS S3 + CloudFront

1. **Build Static Site**:
   ```bash
   npm run build
   ```

2. **Upload to S3**:
   ```bash
   aws s3 sync out/ s3://your-bucket-name --delete
   ```

3. **Configure S3 Bucket**:
   - Enable static website hosting
   - Set index document: `index.html`
   - Set error document: `404.html`

4. **Set Up CloudFront** (optional but recommended):
   - Create CloudFront distribution
   - Origin: Your S3 bucket
   - Enable HTTPS
   - Set custom error pages

## Environment Variables

### Required Variables

```env
NEXT_PUBLIC_SITE_URL=https://your-production-url.com
```

### Optional Variables

```env
# Google Analytics (if tracking is needed)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Custom API keys (if needed)
NEXT_PUBLIC_API_KEY=your_api_key_here
```

### Setting Variables by Platform

**Vercel**:
- Dashboard: Project Settings → Environment Variables
- CLI: `vercel env add NEXT_PUBLIC_SITE_URL`

**Netlify**:
- Dashboard: Site Settings → Environment Variables
- CLI: `netlify env:set NEXT_PUBLIC_SITE_URL "https://..."`

**GitHub Actions**:
- Repository Settings → Secrets and Variables → Actions
- Add as repository secrets

## Post-Deployment Checklist

After deploying, verify:

- [ ] Site loads correctly at production URL
- [ ] All 12 slides render without errors
- [ ] Images load from Unsplash/Pexels
- [ ] Navigation works (keyboard, touch, progress dots)
- [ ] Animations play smoothly
- [ ] QR codes generate correctly on Slide 12
- [ ] External links open in new tabs
- [ ] Responsive design works on mobile/tablet
- [ ] Thai fonts (Kanit, Sarabun) load correctly
- [ ] No console errors in browser DevTools
- [ ] SSL certificate is active (HTTPS)
- [ ] Custom domain works (if configured)
- [ ] SEO meta tags are correct (view page source)
- [ ] Open Graph preview works (test on social media)

### Testing Tools

- **Lighthouse**: Run in Chrome DevTools for performance audit
- **PageSpeed Insights**: https://pagespeed.web.dev/
- **Mobile-Friendly Test**: https://search.google.com/test/mobile-friendly
- **SSL Test**: https://www.ssllabs.com/ssltest/

## Troubleshooting

### Build Fails

**Error**: TypeScript compilation errors
```bash
# Solution: Fix type errors
npm run lint
# Fix reported errors, then rebuild
```

**Error**: Module not found
```bash
# Solution: Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Images Not Loading

**Issue**: Images show broken icon

**Solutions**:
1. Check Unsplash URLs are accessible
2. Verify `remotePatterns` in `next.config.ts`
3. Check browser console for CORS errors
4. Ensure images are not blocked by firewall/proxy

### Deployment Succeeds but Site Shows 404

**Vercel**:
- Check build logs for errors
- Verify `output` directory is `.next` (not `out`)

**Static Export**:
- Ensure `output: 'export'` is in `next.config.ts`
- Check publish directory is `out`
- Verify `trailingSlash: true` is set

### Fonts Not Loading

**Issue**: Thai fonts (Kanit, Sarabun) not displaying

**Solutions**:
1. Check internet connection (fonts load from Google Fonts CDN)
2. Verify `next/font/google` import in `app/layout.tsx`
3. Check browser console for font loading errors
4. Test on different browsers

### Environment Variables Not Working

**Issue**: `process.env.NEXT_PUBLIC_SITE_URL` is undefined

**Solutions**:
1. Ensure variable is prefixed with `NEXT_PUBLIC_`
2. Restart dev server after adding variables
3. Rebuild for production: `npm run build`
4. Check platform-specific environment variable settings

### Performance Issues

**Issue**: Slow page load or animations

**Solutions**:
1. Run Lighthouse audit to identify bottlenecks
2. Check image sizes (Unsplash images should be optimized)
3. Verify CDN is enabled (Vercel Edge Network)
4. Enable compression (gzip/brotli) on hosting platform
5. Check for console errors that might block rendering

## Rollback Procedure

### Vercel

1. Go to Deployments tab
2. Find previous working deployment
3. Click "..." menu → "Promote to Production"

### Static Export

1. Checkout previous Git commit
2. Rebuild: `npm run build`
3. Redeploy `out` directory

## Monitoring and Analytics

### Vercel Analytics

Enable in Project Settings → Analytics for:
- Page views
- Performance metrics (Web Vitals)
- Geographic distribution

### Google Analytics (Optional)

1. Create GA4 property
2. Get Measurement ID (G-XXXXXXXXXX)
3. Add to environment variables
4. Implement tracking in `app/layout.tsx`

### Error Tracking (Optional)

Consider integrating:
- **Sentry**: Error tracking and monitoring
- **LogRocket**: Session replay and debugging

## Security Best Practices

- ✅ HTTPS enabled (automatic with Vercel)
- ✅ Security headers configured (see `vercel.json`)
- ✅ Environment variables not exposed in client code
- ✅ Dependencies regularly updated (`npm audit`)
- ✅ No sensitive data in Git repository

## Support

For deployment issues:
- **Vercel**: https://vercel.com/support
- **Next.js**: https://nextjs.org/docs
- **Project Issues**: Create issue in repository

---

**Last Updated**: January 2025
