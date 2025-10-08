# Khao Yai Presentation

A modern, interactive web-based presentation for a Khao Yai team trip (14 people, November 8-9, 2025). Built with Next.js 15 and featuring a custom "Forest Terracotta" design theme.

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4 with custom theme
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **QR Codes**: next-qrcode
- **Fonts**: Google Fonts (Kanit & Sarabun)

## Custom Theme Colors

- **Deep Forest**: `#2F6B3C` - primary green, headings
- **Sage**: `#A8C3A1` - light green, secondary buttons
- **Terracotta**: `#D17A47` - accent orange, CTAs
- **Sand**: `#E8DCC8` - background beige
- **Charcoal**: `#2B2B2B` - text dark

## Project Structure

```
khao-yai-presentation/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with fonts and metadata
│   ├── page.tsx           # Main page with PresentationContainer
│   └── globals.css        # Global styles with Tailwind 4
├── components/
│   ├── PresentationContainer.tsx  # Navigation orchestrator
│   ├── slides/            # Individual slide components (Slide01-Slide12)
│   └── ui/                # Reusable UI components
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Badge.tsx
│       ├── Timeline.tsx
│       ├── Accordion.tsx
│       ├── ProgressDots.tsx
│       ├── Image.tsx
│       └── ImageSkeleton.tsx
├── lib/
│   ├── constants.ts       # Colors, trip info, content data
│   ├── types.ts           # TypeScript interfaces
│   ├── animations.ts      # Framer Motion animation variants
│   └── hooks/
│       └── useReducedMotion.ts  # Accessibility hook
└── public/
    └── images/            # Static images
```

## Getting Started

### Prerequisites

- Node.js 18+ (recommended: Node.js 20+)
- npm or yarn

### Installation

```bash
# Clone the repository (if applicable)
git clone <repository-url>
cd khao-yai-presentation

# Install dependencies
npm install
```

### Environment Variables

Copy the `.env.example` file to `.env.local` and configure the variables:

```bash
cp .env.example .env.local
```

See the [Environment Variables](#environment-variables-1) section below for details.

### Development

```bash
# Run development server with Turbopack
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the presentation.

The development server includes:
- Hot module replacement (HMR)
- Fast refresh for instant updates
- TypeScript type checking
- Tailwind CSS JIT compilation

### Build

```bash
# Create production build with Turbopack
npm run build

# Start production server
npm start
```

### Linting

```bash
# Run ESLint
npm run lint
```

## Features

- 12 interactive slides covering trip logistics
- Keyboard navigation (Arrow keys, Home, End)
- Touch gesture support (swipe left/right)
- URL hash synchronization for deep linking
- Responsive design (desktop, tablet, mobile)
- Smooth animations with Framer Motion
- Thai language support
- QR codes for quick resource access
- External image integration from Unsplash

## Navigation

- **Keyboard**: Arrow Left/Right, Home, End
- **Touch**: Swipe left/right
- **Click**: Progress dots at bottom
- **URL**: Use hash (e.g., `#3` for slide 4)

## Typography

- **Headings**: Kanit (weights 600-700)
- **Body**: Sarabun (weight 400)
- Both fonts support Thai language

## Slide Overview

1. **Hero Landing** - Trip title and team info
2. **Trip Timeline** - 2-day schedule with interactive icons
3. **Day 1 Departure** - Meeting point and breakfast options
4. **Main Activities** - 6 activities at Thong Somboon Club
5. **Lunch & Cafes** - Restaurant recommendations
6. **Makro Shopping** - Shopping checklist categories
7. **Villa Check-in** - Floor plan and house rules
8. **Evening Activities** - Night activities suggestions
9. **Day 2 Morning** - Morning options and cafes
10. **Dress Code** - Forest Terracotta theme outfits
11. **Design System** - Color and component showcase
12. **Final Checklist** - Interactive checklist with QR codes

## Environment Variables

This project uses environment variables for configuration. Create a `.env.local` file in the root directory:

```env
# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Optional: Google Analytics (if needed)
# NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Optional: External API keys (if needed in future)
# NEXT_PUBLIC_API_KEY=your_api_key_here
```

**Note**: The `.env.local` file is gitignored and should not be committed. Use `.env.example` as a template.

## Image Sources and Usage Rights

All images are sourced from **Unsplash** and **Pexels**, which provide free images for personal and commercial use under their respective licenses:

### Unsplash License
- Free to use for personal and commercial projects
- No attribution required (but appreciated)
- Cannot be sold or redistributed as-is
- [Unsplash License Details](https://unsplash.com/license)

### Pexels License
- Free to use for personal and commercial projects
- No attribution required (but appreciated)
- Cannot be sold or redistributed as-is
- [Pexels License Details](https://www.pexels.com/license/)

### Image Attribution

For detailed image sources and photographer credits, see [IMAGE_SOURCES.md](IMAGE_SOURCES.md).

**Usage in this project**: All images are used for personal, non-commercial purposes (team trip planning) and comply with the respective licenses.

## Deployment

### Deploy to Vercel (Recommended)

This project is optimized for deployment on [Vercel](https://vercel.com), the platform created by the makers of Next.js.

#### Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/khao-yai-presentation)

#### Manual Deployment Steps

1. **Install Vercel CLI** (optional):
   ```bash
   npm install -g vercel
   ```

2. **Connect your repository**:
   - Push your code to GitHub, GitLab, or Bitbucket
   - Go to [vercel.com](https://vercel.com) and sign in
   - Click "Add New Project"
   - Import your repository

3. **Configure build settings**:
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `.next` (auto-detected)
   - **Install Command**: `npm install` (auto-detected)

4. **Set environment variables**:
   - Go to Project Settings → Environment Variables
   - Add `NEXT_PUBLIC_SITE_URL` with your production URL
   - Add any other variables from `.env.example`

5. **Deploy**:
   - Click "Deploy"
   - Vercel will build and deploy your project
   - You'll get a production URL (e.g., `https://khao-yai-presentation.vercel.app`)

#### Automatic Deployments

Once connected, Vercel automatically deploys:
- **Production**: Every push to the `main` branch
- **Preview**: Every push to other branches and pull requests

### Deploy to Other Platforms

#### Static Export (for any static hosting)

If you want to deploy to platforms like Netlify, GitHub Pages, or AWS S3:

1. **Update `next.config.ts`** to enable static export:
   ```typescript
   const nextConfig: NextConfig = {
     output: 'export',
     images: {
       unoptimized: true, // Required for static export
     },
   };
   ```

2. **Build the static site**:
   ```bash
   npm run build
   ```

3. **Deploy the `out` directory** to your hosting platform.

**Note**: Static export has limitations (no API routes, no server-side rendering). This project is designed to work with static export.

### Custom Domain

To use a custom domain with Vercel:

1. Go to Project Settings → Domains
2. Add your domain (e.g., `trip.yourdomain.com`)
3. Follow DNS configuration instructions
4. Vercel will automatically provision SSL certificates

### Performance Optimization

The production build includes:
- ✅ Automatic code splitting
- ✅ Image optimization (via Unsplash CDN)
- ✅ CSS minification
- ✅ JavaScript minification
- ✅ Gzip/Brotli compression
- ✅ Edge caching via Vercel CDN

## Documentation

- **[QUICK_START.md](QUICK_START.md)** - Get started in 5 minutes ⚡
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Complete deployment guide 🚀
- [SETUP.md](SETUP.md) - Detailed setup instructions
- [IMAGE_SOURCES.md](IMAGE_SOURCES.md) - Image attribution and sources
- [ANIMATIONS.md](ANIMATIONS.md) - Animation system documentation
- [ANIMATION_VERIFICATION.md](ANIMATION_VERIFICATION.md) - Animation testing guide
- [CLAUDE.md](CLAUDE.md) - Claude Code AI assistant guidance

## Troubleshooting

### Common Issues

**Issue**: Images not loading
- **Solution**: Check that Unsplash URLs are accessible and not blocked by firewall/proxy

**Issue**: Build fails with TypeScript errors
- **Solution**: Run `npm run lint` to check for type errors, fix them before building

**Issue**: Animations not working
- **Solution**: Ensure Framer Motion is installed (`npm install framer-motion`)

**Issue**: Fonts not loading
- **Solution**: Check internet connection (Google Fonts are loaded from CDN)

### Development Tips

- Use `npm run dev` for hot reload during development
- Check browser console for errors
- Use React DevTools for component debugging
- Test on multiple devices/browsers for responsive design

## Contributing

This is a private project for team trip planning. If you're part of the team and want to contribute:

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

Private project for team trip planning. All rights reserved.
