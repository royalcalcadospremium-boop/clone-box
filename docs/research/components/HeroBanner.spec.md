# HeroBanner Specification

## Overview
- **Target file:** `src/components/HeroBanner.tsx`
- **Screenshot:** `docs/design-references/section-hero.png`
- **Interaction model:** static, hover group effects on cards

## DOM Structure
```
<section> (relative container px-0 group, pt-2 md:pt-3, mb-6 md:mb-8, z-0)
  3-column grid (gap-1 md:gap-1.5)
    Column 1: video card + caption below
    Column 2: video card + caption below
    Column 3: video card + caption below
```

## Computed Styles (exact from getComputedStyle)

### Section container
- display: grid
- gridTemplateColumns: repeat(3, 1fr)
- gap: 4px (md: 6px)
- paddingTop: 8px (md: 12px)
- marginBottom: 24px (md: 32px)
- overflow: hidden
- borderRadius: 0 (section level)

### Video card wrapper
- position: relative
- overflow: hidden
- borderRadius: 12px (rounded-xl)
- aspectRatio: ~ 16/10 (wide card)
- cursor: pointer

### Video/image inside card
- width: 100%
- height: 100%
- objectFit: cover
- display: block

### Overlay text on card (bottom of first card)
- position: absolute
- bottom: 12px
- left: 12px
- color: rgb(247,247,248)
- fontSize: 28px [varies per card]
- fontWeight: 700
- textTransform: uppercase
- textShadow: 0 2px 8px rgba(0,0,0,0.6)
- lineHeight: 1.0

### Small label above title (on card)
- fontSize: 11px
- fontWeight: 400
- color: rgba(255,255,255,0.7)
- letterSpacing: 0.05em
- Example: "OpenAI × Higgsfield"

### Caption below card (title row)
- marginTop: 8px
- display: flex
- alignItems: flex-start
- gap: 4px

### Card title (below card)
- fontSize: 13px
- fontWeight: 600
- color: rgb(247,247,248)
- textTransform: uppercase
- letterSpacing: 0.08em

### Card subtitle (below card)
- fontSize: 13px
- fontWeight: 400
- color: rgb(137,138,139) [muted gray]
- marginTop: 2px

## Content (3 featured items)
### Card 1
- Label on card: "OpenAI × Higgsfield"
- Big text on card: "GPT IMAGE 2.0"
- Below card title: "GPT IMAGE 2"
- Below card subtitle: "4K images with near-perfect text rendering"
- Media: video (dark background, people eating noodles scene)

### Card 2
- Big text on card: none visible at top
- Below card title: "KLING 3.0 IN 4K"
- Below card subtitle: "Cinema-grade video at full 4K resolution"
- Media: dark cinematic video/image (monster/creature scene)
- Has comparison slider UI overlaid (quality comparison)

### Card 3
- Big text on card: "MARKETING STUDIO" (large white text)
- Sub text on card: "Powered by Hermes Agent"
- Below card title: "MARKETING STUDIO FOR APPS"
- Below card subtitle: "Powered by Hermes Agent"
- Media: two-panel split image (woman + person at computer)

## States & Behaviors

### Hover on section
- **Trigger:** mouse hover on section (group hover)
- Non-hovered cards: slight dim (opacity or brightness reduction)
- Hovered card: stays full brightness, slight scale(1.01)
- **Transition:** 200ms ease

## Assets
- Cards use video/images from the live Higgsfield platform
- For clone: use dark placeholder with gradient overlay
- Placeholder gradient: linear-gradient(180deg, rgba(15,17,19,0) 40%, rgba(15,17,19,0.8) 100%)

## Responsive Behavior
- **Desktop (768px+):** 3 columns, equal width
- **Mobile (<768px):** 1 column stack, each card full width
- Card height: ~280px desktop, ~200px mobile
