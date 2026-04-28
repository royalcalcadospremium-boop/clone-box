# KlingExclusive Specification

## Overview
- **Target file:** `src/components/KlingExclusive.tsx`
- **Screenshot:** `docs/design-references/section-community.png` (bottom half)
- **Interaction model:** static

## DOM Structure
```
<section> (container relative mb-8 rounded-2xl overflow-hidden)
  Row layout (flex col mobile, row desktop):
    Left panel (~280px): logo + badge + giant title + description + buttons
    Right panel: 4-col × 3-row media grid
```

## Computed Styles

### Section wrapper
- backgroundColor: rgb(19, 21, 23)  [very dark]
- borderRadius: 16px (md: 24px)
- overflow: hidden
- marginBottom: 32px
- display: flex
- flexDirection: column (mobile) → row (lg)

### Left panel
- width: ~280px (desktop)
- padding: 24px 20px
- display: flex
- flexDirection: column
- gap: 16px
- backgroundColor: transparent

### Logo/icon at top
- width: 48px
- height: 48px
- Custom Kling logo (dragon/phoenix like SVG in bright yellow-green)

### Label "EXCLUSIVELY ON HIGGSFIELD"
- fontSize: 11px
- fontWeight: 600
- color: rgb(137, 138, 139)
- textTransform: uppercase
- letterSpacing: 0.12em

### Giant title "KLING 3.0"
- fontSize: 56px (clamp 40-64px)
- fontWeight: 900
- color: rgb(209, 254, 23)  [NEON GREEN — important!]
- textTransform: uppercase
- lineHeight: 0.95
- letterSpacing: -0.02em

### Subtitle "EXCLUSIVE ACCESS"
- fontSize: 40px (clamp 28-48px)
- fontWeight: 900
- color: rgb(209, 254, 23)  [neon green]
- textTransform: uppercase
- lineHeight: 0.95
- marginTop: -8px

### Description text
- fontSize: 14px
- color: rgb(137, 138, 139)
- lineHeight: 1.5
- Text: "Explore Higgsfield Community gallery for stunning Kling 3.0 creations"

### CTA button (solid neon)
- backgroundColor: rgb(209, 254, 23)  [solid neon green]
- color: rgb(19, 21, 23)  [near-black]
- borderRadius: 24px
- padding: 12px 24px
- fontSize: 14px
- fontWeight: 700
- border: none
- cursor: pointer
- transition: opacity 150ms
- Text: "Get Exclusive Offer"

### Text link
- fontSize: 14px
- fontWeight: 500
- color: rgb(247, 247, 248)
- textDecoration: none
- hover: text-decoration underline
- Text: "Explore Kling 3.0"

### Right panel (media grid)
- flex: 1
- display: grid
- gridTemplateColumns: repeat(4, 1fr)
- gridTemplateRows: repeat(3, auto)
- gap: 4px
- padding: 12px
- overflow: hidden

### Grid item
- borderRadius: 8px
- overflow: hidden
- aspectRatio: 16/10
- backgroundColor: rgb(28, 30, 32)
- position: relative

### Last thumbnail (bottom-right): has creator overlay
- Creator name + heart icon + like count badge
- Position: absolute bottom-left

## Text Content
- Exclusive label: "EXCLUSIVELY ON HIGGSFIELD"
- Title: "KLING 3.0"
- Subtitle: "EXCLUSIVE ACCESS"
- Description: "Explore Higgsfield Community gallery for stunning Kling 3.0 creations"
- CTA button: "Get Exclusive Offer"
- Link: "Explore Kling 3.0"

## Color Notes
- This section has a DARK background (unlike footer which is neon)
- The KLING 3.0 and EXCLUSIVE ACCESS text IS neon green (#d1fe17)
- Rest of text is white or muted gray

## Responsive Behavior
- **Desktop:** row layout, left panel fixed width ~280px
- **Mobile:** column, text on top stacked, grid below
