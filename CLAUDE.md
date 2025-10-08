# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A modern, interactive web-based presentation for a Khao Yai team trip (14 people, November 8-9, 2025). Features 12 slides covering trip logistics, activities, accommodation, dress code, and checklists. Built with Next.js 15 and a custom "Forest Terracotta" design theme inspired by nature.

## Task Verification Protocol

When verifying if a task is complete, follow this protocol:

### 1. Locate Task Definition
- Read task details from `.kiro/specs/khao-yai-presentation/tasks.md`
- Identify all sub-requirements and deliverables for the task
- Note the requirement references (e.g., _Requirements: 2.7, 2.8_)

### 2. Verify File Locations
- **IMPORTANT**: All project files are located in `/Users/sarawut/Documents/Khaoyai/khao-yai-presentation/`
- Common mistake: Looking in `/Users/sarawut/Documents/Khaoyai/` (parent directory)
- Always check the correct subdirectory path before declaring files missing

### 3. Check File Existence
- Use Read tool to verify each required file exists
- For components: Check `khao-yai-presentation/components/` or `khao-yai-presentation/components/ui/`
- For library code: Check `khao-yai-presentation/lib/`
- For configuration: Check `khao-yai-presentation/` root
- For app files: Check `khao-yai-presentation/app/`

### 4. Verify File Contents
For each file, verify:
- All required exports/interfaces are present
- Implementation matches specifications in tasks.md
- Code follows conventions in this CLAUDE.md
- Thai language is used where specified
- Styling follows design system (colors, fonts, spacing)

### 5. Cross-Reference with Requirements
- Compare deliverables against original requirements
- Check if all sub-tasks are implemented
- Verify edge cases and optional features

### 6. Report Format
When reporting verification results, use this format:

```
## ✅/❌ Task X: [Task Name] - [Complete/Incomplete]

### Required Deliverables:
1. ✅/❌ [Deliverable 1] - [Status/Location]
2. ✅/❌ [Deliverable 2] - [Status/Location]

### Verification Details:
- File: `path/to/file.tsx` (lines X-Y)
  - ✅ [Specific requirement met]
  - ❌ [Missing requirement with details]

### Summary:
[Concise summary of completion status]
```

### Example Verification - Task 2

**Task 2: Create design system constants and types**

Verification checklist:
1. ✅ File `lib/constants.ts` exists at `khao-yai-presentation/lib/constants.ts`
   - ✅ COLORS constant with all 6 colors (lines 5-12)
   - ✅ TRIP_INFO constant (lines 15-21)
   - ✅ TIMELINE_DATA (lines 24-79)
   - ✅ ACTIVITIES (lines 82-125)
   - ✅ RESTAURANTS (lines 128-153)
   - ✅ SHOPPING_CATEGORIES (lines 156-187)

2. ✅ File `lib/types.ts` exists at `khao-yai-presentation/lib/types.ts`
   - ✅ SlideProps interface (lines 3-6)
   - ✅ NavigationState interface (lines 8-13)
   - ✅ ActivityCard interface (lines 15-21)
   - ✅ RestaurantInfo interface (lines 23-30)
   - ✅ ShoppingCategory interface (lines 32-36)
   - ✅ VillaZone interface (lines 38-43)
   - ✅ TimelineItem interface (lines 45-50) [bonus]

**Result**: ✅ Task 2 is **100% complete**

## Development Commands

```bash
# Development server with Turbopack
npm run dev

# Production build with Turbopack
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## Tech Stack

- **Next.js 15.5.4** with App Router
- **React 19.1.0**
- **TypeScript** with strict mode
- **Tailwind CSS 4** (new inline theme syntax in `@theme inline`)
- **Framer Motion** for animations
- **Lucide React** for icons
- **next-qrcode** for QR code generation
- **Google Fonts**: Kanit (headings) + Sarabun (body text) with Thai support

## Architecture

### Application Structure

```
app/
  layout.tsx                  # Root layout with fonts and metadata
  page.tsx                    # Main presentation container
  globals.css                 # Tailwind 4 with @theme inline
components/
  PresentationContainer.tsx   # Navigation orchestrator
  slides/
    Slide01.tsx              # Hero landing page
    Slide02.tsx              # Trip timeline
    Slide03.tsx              # Day 1 morning departure
    Slide04.tsx              # Main activity details
    Slide05.tsx              # Lunch & cafe recommendations
    Slide06.tsx              # Makro shopping checklist
    Slide07.tsx              # Villa check-in and layout
    Slide08.tsx              # Evening activities
    Slide09.tsx              # Day 2 morning options
    Slide10.tsx              # Dress code theme
    Slide11.tsx              # Design system meta
    Slide12.tsx              # Final checklist and resources
  ui/
    Button.tsx               # Primary/secondary/ghost variants
    Card.tsx                 # Content block cards
    Timeline.tsx             # Horizontal/vertical timeline
    Badge.tsx                # Labels and tags
    Accordion.tsx            # Expandable content
    ProgressDots.tsx         # Navigation indicator
lib/
  constants.ts               # Colors, TRIP_INFO, content data
  types.ts                   # TypeScript interfaces
  utils.ts                   # Utility functions
public/
  images/                    # Trip visuals and backgrounds
```

### Component Architecture Pattern

**Container-Presenter Pattern**:
1. **PresentationContainer**: Manages global state (current slide, navigation, keyboard/touch events)
2. **Slide Components**: Presentational components receiving props
3. **UI Components**: Reusable atomic components with consistent styling
4. **Layout**: Handles fonts, metadata, global providers

**State Management**: Local React hooks (useState, useEffect) - no global state library needed.

### Font System

Configured in `app/layout.tsx`:
- **Kanit** (weights 600, 700) for headings
- **Sarabun** (weight 400) for body text
- Both include Thai language support
- Font variables: `--font-kanit`, `--font-sarabun`
- Usage: `font-kanit` or `font-sarabun` class

### Custom Theme Colors

Defined in `app/globals.css` using Tailwind 4's `@theme inline` syntax:
- **Deep Forest** (`deep-forest`): #2F6B3C - primary green, headings
- **Sage** (`sage`): #A8C3A1 - light green, secondary buttons, alternating backgrounds
- **Terracotta** (`terracotta`): #D17A47 - accent orange, CTAs, important elements
- **Sand** (`sand`): #E8DCC8 - background beige, light slides
- **Charcoal** (`charcoal`): #2B2B2B - text dark, primary text

**Usage Guidelines**:
- Backgrounds: Sand for light slides, Sage for alternating slides
- Text: Charcoal for body, Deep Forest for headings
- CTAs: Terracotta for primary buttons and important elements
- Ensure WCAG AA contrast compliance (4.5:1 for text, 3:1 for large text)

### Typography System

```css
/* Headings - Kanit font */
h1: font-kanit text-5xl md:text-6xl font-bold (48-60px)
h2: font-kanit text-4xl md:text-5xl font-semibold (36-48px)
h3: font-kanit text-2xl md:text-3xl font-semibold (24-32px)
h4: font-kanit text-xl md:text-2xl font-semibold (20-24px)

/* Body - Sarabun font */
body: font-sarabun text-base md:text-lg (16-18px)
small: font-sarabun text-sm (14px)
caption: font-sarabun text-xs (12px)
```

### Component Interfaces

#### PresentationContainer
```typescript
interface PresentationContainerProps {
  slides: React.ComponentType[];
  initialSlide?: number;
}
// State: currentSlide, direction ('left' | 'right')
// Features: keyboard nav, touch gestures, URL hash sync, transitions
```

#### Slide Components (Common Pattern)
```typescript
interface SlideProps {
  isActive?: boolean;
  onNavigate?: (slideIndex: number) => void;
}
```

#### Button Component
```typescript
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
}
// Primary: Terracotta bg, white text
// Secondary: Sage outline, hover fill
// Ghost: Transparent with hover effect
```

#### Timeline Component
```typescript
interface TimelineItem {
  time: string;
  title: string;
  icon: React.ReactNode;
  description?: string;
}

interface TimelineProps {
  items: TimelineItem[];
  orientation?: 'horizontal' | 'vertical';
}
// Responsive: horizontal on desktop, vertical on mobile
```

### Constants and Data

Store in `lib/constants.ts`:
```typescript
export const COLORS = {
  deepForest: '#2F6B3C',
  sage: '#A8C3A1',
  terracotta: '#D17A47',
  sand: '#E8DCC8',
  charcoal: '#2B2B2B',
  white: '#FFFFFF',
} as const;

export const TRIP_INFO = {
  title: 'Khao Yai Getaway',
  subtitle: '14 Friends, 2D1N',
  dates: 'เสาร์ 8 - อาทิตย์ 9 พฤศจิกายน 2568',
  location: 'DN Poolvilla Khaoyai',
  teamSize: 14,
} as const;

// Additional constants: TIMELINE_DATA, ACTIVITIES, RESTAURANTS, SHOPPING_CATEGORIES
```

### Animation Strategy

**Framer Motion Variants**:
```typescript
// Slide transitions
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
};

// Element stagger
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

// Hover effects
const hoverVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.05, transition: { duration: 0.3 } },
};
```

**Performance**: Use `transform` and `opacity` for GPU acceleration. Respect `prefers-reduced-motion`.

### Navigation System

**Methods**:
1. **Keyboard**: Arrow Left/Right (prev/next), Home/End (first/last)
2. **Touch**: Swipe left/right using Framer Motion drag
3. **Click**: Progress dots to jump to slide

**URL Synchronization**:
```typescript
// Sync currentSlide with window.location.hash
useEffect(() => {
  const hash = window.location.hash.replace('#', '');
  const slideIndex = parseInt(hash) || 0;
  if (slideIndex >= 0 && slideIndex < totalSlides) {
    setCurrentSlide(slideIndex);
  }
}, []);

useEffect(() => {
  window.location.hash = `${currentSlide}`;
}, [currentSlide]);
```

### Responsive Design

**Breakpoints** (Tailwind defaults):
- `sm`: 640px (mobile landscape)
- `md`: 768px (tablet)
- `lg`: 1024px (desktop)
- `xl`: 1280px (large desktop)

**Layout Adaptations**:
- **Desktop (lg+)**: 16:9 aspect ratio, max-width 1400px centered, multi-column grids (2-3 cols), horizontal timeline
- **Tablet (md-lg)**: 2-column grids, reduced font scale (0.9), stacked sections
- **Mobile (sm)**: Single column, full-width cards, vertical timeline, touch-friendly buttons (min 44px)

**Patterns**:
```css
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6
text-2xl md:text-3xl lg:text-4xl
p-4 md:p-6 lg:p-8
```

### Path Aliases

- `@/*` maps to project root (configured in `tsconfig.json`)
- Example: `import { Button } from '@/components/ui/Button'`

### ESLint Configuration

- Uses Next.js core-web-vitals and TypeScript presets
- Ignores: `node_modules`, `.next`, `out`, `build`, `next-env.d.ts`

## Key Conventions

### Language and Localization
- **All content in Thai language** - slides, comments, error messages, accessibility labels
- HTML lang is set to "th" in `app/layout.tsx`
- Use Thai fonts (Kanit + Sarabun) with proper Thai rendering

### Accessibility
- Respect `prefers-reduced-motion` media query (already in `app/globals.css`)
- Add ARIA labels to icons and interactive elements
- Ensure keyboard navigation works for all components
- Alt text for all images
- WCAG AA contrast compliance (4.5:1 for text)

### External Links
- Open all external links in new tabs: `target="_blank" rel="noopener noreferrer"`
- Phone links should work on mobile: `href="tel:+66..."`
- Google Maps links should open in new tab

### Component Styling
```css
/* Cards */
bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6

/* Primary Button */
bg-terracotta text-white hover:bg-terracotta/90 rounded-lg px-6 py-3

/* Secondary Button */
border-2 border-sage text-sage hover:bg-sage hover:text-white rounded-lg px-6 py-3
```

### Slide-Specific Notes

**Slide 06 (Shopping)**: Display ONLY category names (Fresh Food, Dry Goods, Supplies). Do NOT include specific menu items, ingredients, quantities, or recipes. Provide download link to Google Sheets checklist.

**Slide 07 (Villa)**: Include floor plan diagram with interactive zone labels (Kitchen, Pool, Karaoke). Add copy-to-clipboard for villa contact number.

**Slide 10 (Dress Code)**: "Forest Terracotta Picnic" theme. Show 6 outfit inspiration images in grid (3x2 on desktop, 2 cols on mobile). Display color swatches with HEX codes.

**Slide 12 (Checklist)**: Generate QR codes using `next-qrcode` for maps and Google Sheets. Interactive checkboxes with state management.

## Deployment

### Build Configuration
```typescript
// next.config.ts
export default {
  output: 'export', // Static export for Vercel
  images: {
    unoptimized: true, // For static export
  },
  trailingSlash: true,
};
```

### Metadata (in app/layout.tsx)
```typescript
export const metadata = {
  title: 'Khao Yai Getaway - 14 Friends, 2D1N',
  description: 'ทริปเขาใหญ่ 2 วัน 1 คืน กับเพื่อน 14 คน ที่ DN Poolvilla Khaoyai',
  keywords: 'Khao Yai, team trip, DN Poolvilla, เขาใหญ่',
  openGraph: {
    title: 'Khao Yai Getaway - 14 Friends, 2D1N',
    description: 'ทริปเขาใหญ่ 2 วัน 1 คืน กับเพื่อน 14 คน',
    type: 'website',
  },
};
```

### Performance
- Implement lazy loading for images with Next.js Image component
- Code splitting for slides
- Optimize bundle size
- Target: LCP < 2.5s, FID < 100ms, CLS < 0.1

## Turbopack

This project uses Turbopack (enabled via `--turbopack` flag) for faster builds and HMR. This is Next.js 15's experimental bundler.
