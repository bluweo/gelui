# Gel UI — Installation & Setup Guide

## Prerequisites

- **Node.js** 18+ (recommended: 20+)
- **npm** 9+ (comes with Node.js)
- **Git** (optional, for cloning from GitHub)

## Quick Start

### 1. Clone or extract the project

**From GitHub:**
```bash
git clone https://github.com/bluweo/gelui.git
cd gelui
```

**From ZIP backup:**
```bash
unzip gelui-backup.zip
cd gelui
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

The site will be available at **http://localhost:4321/** (or the next available port).

### 4. Open in browser

Navigate to:
- **Overview:** http://localhost:4321/design-system
- **Tokens:** http://localhost:4321/design-system/tokens
- **Primitives:** http://localhost:4321/design-system/primitives
- **Components:** http://localhost:4321/design-system/components
- **Patterns:** http://localhost:4321/design-system/patterns
- **Layouts:** http://localhost:4321/design-system/layouts

---

## Project Structure

```
gelui/
├── public/                    # Static assets
│   ├── logos/                 # Brand logos, browser icons, tech stack logos
│   │   ├── browsers/          # Chrome, Edge, Safari, Firefox, etc.
│   │   └── tech/              # Astro, React, TypeScript, Tailwind, etc.
│   ├── resources/images/      # Page hero images
│   └── video-backgrounds/     # Background video files
├── src/
│   ├── components/            # Organized by category
│   │   ├── block/             # Page section components (HeroText, TechStack, etc.)
│   │   ├── card/              # DSCard with frost zones
│   │   ├── context/           # React contexts (Appearance, Background, Contrast)
│   │   ├── footer/            # DSFooter
│   │   ├── glass/             # Liquid glass filter, slider, contrast text
│   │   ├── header/            # DSNav, ThemeToggle
│   │   ├── hooks/             # useContrastColor, useDraggableModal
│   │   ├── layout/            # DSShell, DSLayout, BaseLayout, AppProviders
│   │   └── modal/             # AppearanceModal, BackgroundPicker, ContextMenu, etc.
│   ├── pages/                 # Astro pages (file-based routing)
│   │   └── design-system/     # All design system pages
│   ├── styles/                # Global CSS (Tailwind v4)
│   │   └── global.css         # All custom utilities, tokens, glass effects
│   ├── tokens/                # Design token definitions
│   └── utils/                 # Color utilities
├── package.json
├── astro.config.ts
├── tsconfig.json
├── tailwind.config.ts
└── INSTALL.md                 # This file
```

---

## Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| Astro | 5.x | Static site framework with islands architecture |
| React | 19.x | Interactive islands (modals, controls, forms) |
| Tailwind CSS | 4.x | Utility-first CSS with custom design tokens |
| TypeScript | 5.x | Type safety across all components |

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |

---

## Key Features

- **Glassmorphism-first** — backdrop-filter blur, semi-transparent surfaces
- **Volumetric gel surfaces** — 10-layer inset shadows with specular highlights
- **Adaptive contrast** — text color auto-adjusts to background brightness
- **Real-time appearance tuning** — right-click to change background, theme, transparency
- **Font family picker** — 4 font roles (Heading, Body, UI, Mono) with Google Fonts
- **Type scale presets** — Small/Medium/Large global typography scaling
- **Logo color extraction** — upload logo to auto-generate brand palette
- **6-layer architecture** — Core → Tokens → Primitives → Components → Patterns → Layouts

---

## Environment Notes

- Default port: **4321** (auto-increments if busy)
- Google Fonts loaded via CDN (requires internet)
- Background videos stored in `/public/video-backgrounds/`
- No database required — all data is in TypeScript token files

---

## Troubleshooting

**Port already in use:**
```bash
npm run dev -- --port 4322
```

**Clear Vite cache:**
```bash
rm -rf node_modules/.vite
npm run dev
```

**Reinstall dependencies:**
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## Version

Current: **v0.8.2**

Repository: https://github.com/bluweo/gelui
