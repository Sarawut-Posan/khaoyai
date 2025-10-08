# Quick Start Guide

Get the Khao Yai Presentation up and running in 5 minutes.

## 🚀 Local Development

```bash
# 1. Install dependencies
npm install

# 2. Copy environment variables
cp .env.example .env.local

# 3. Start development server
npm run dev

# 4. Open browser
# Visit http://localhost:3000
```

## 📦 Production Build

```bash
# Build for production
npm run build

# Test production build locally
npm start
```

## 🌐 Deploy to Vercel (Easiest)

### Option 1: One-Click Deploy

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your repository
5. Click "Deploy" (no configuration needed!)

### Option 2: CLI Deploy

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

## 🔧 Environment Variables

Create `.env.local` file:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

For production, set in Vercel dashboard:
- Project Settings → Environment Variables
- Add: `NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app`

## 📱 Test Your Deployment

After deploying, check:

- ✅ All 12 slides load
- ✅ Images display correctly
- ✅ Navigation works (arrows, swipe, dots)
- ✅ Animations play smoothly
- ✅ QR codes generate on Slide 12
- ✅ Mobile responsive design

## 🆘 Common Issues

**Images not loading?**
- Check internet connection (images from Unsplash)
- Verify `next.config.ts` has `remotePatterns` configured

**Build fails?**
```bash
# Clear cache and reinstall
rm -rf .next node_modules package-lock.json
npm install
npm run build
```

**Fonts not showing?**
- Fonts load from Google Fonts CDN
- Check browser console for errors

## 📚 Full Documentation

- [README.md](README.md) - Complete project documentation
- [DEPLOYMENT.md](DEPLOYMENT.md) - Detailed deployment guide
- [SETUP.md](SETUP.md) - Development setup guide

## 🎯 Next Steps

1. Customize content in `lib/constants.ts`
2. Update images URLs if needed
3. Test on mobile devices
4. Share with your team!

---

**Need help?** Check the full [README.md](README.md) or [DEPLOYMENT.md](DEPLOYMENT.md)
