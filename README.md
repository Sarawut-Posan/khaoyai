# Khao Yai Presentation

A modern, interactive web-based presentation for a Khao Yai team trip (14 people, November 8-9, 2025). Built with Next.js 14+ and featuring a custom "Forest Terracotta" design theme.

## Tech Stack

- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4 with custom theme
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **QR Codes**: next-qrcode
- **Fonts**: Google Fonts (Kanit & Sarabun)

## Custom Theme Colors

- **Deep Forest**: `#2F6B3C`
- **Sage**: `#A8C3A1`
- **Terracotta**: `#D17A47`
- **Sand**: `#E8DCC8`
- **Charcoal**: `#2B2B2B`

## Project Structure

```
khao-yai-presentation/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with fonts
│   ├── page.tsx           # Main page
│   └── globals.css        # Global styles
├── components/
│   ├── slides/            # Individual slide components
│   └── ui/                # Reusable UI components
├── lib/                   # Utilities and constants
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
# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the presentation.

### Build

```bash
# Create production build
npm run build

# Start production server
npm start
```

## Features

- 12 interactive slides covering trip logistics
- Responsive design (desktop, tablet, mobile)
- Smooth animations and transitions
- Thai language support
- QR codes for quick resource access
- Keyboard and touch navigation

## Typography

- **Headings**: Kanit (weights 600-700)
- **Body**: Sarabun (weight 400)

## License

Private project for team trip planning.
