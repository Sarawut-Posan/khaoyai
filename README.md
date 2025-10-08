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
│       └── ProgressDots.tsx
├── lib/
│   ├── constants.ts       # Colors, trip info, content data
│   ├── types.ts           # TypeScript interfaces
│   └── utils.ts           # Utility functions
└── public/
    └── images/            # Static images
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Run development server with Turbopack
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the presentation.

### Build

```bash
# Create production build with Turbopack
npm run build

# Start production server
npm start
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

## Image Sources

All images are sourced from Unsplash (free for personal use). See [IMAGE_SOURCES.md](IMAGE_SOURCES.md) for detailed attribution.

## Documentation

- [SETUP.md](SETUP.md) - Detailed setup instructions
- [CLAUDE.md](CLAUDE.md) - Claude Code AI assistant guidance
- [IMAGE_SOURCES.md](IMAGE_SOURCES.md) - Image attribution and sources

## License

Private project for team trip planning.
