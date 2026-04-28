# SeedanceBanner Specification (Feature Banner — left text + right grid)

## Overview
- **Target file:** `src/components/SeedanceBanner.tsx`
- **Screenshot:** `docs/design-references/section-top-choice.png` (lower portion)
- **Interaction model:** static

## DOM Structure
```
<div> (container, flex flex-col lg:flex-row, relative, mb-6, rounded-2xl md:rounded-3xl, p-4 md:p-5 bg-dark)
  Left column (~30% width):
    Small label: "|| SEEDANCE 2.0"
    H2: "CINEMATIC VFX" / "READY TO USE"
    Subtitle: "Turn any shot cinematic"
    CTA button: "Explore All Presets" (neon outline)
    Text link: "Explore Kling 3.0"
    Decorative robot/character image

  Right column (~70% width):
    3x3 grid of video thumbnails (rounded)
```

## Computed Styles

### Outer wrapper
- backgroundColor: rgb(15, 17, 19)  [same dark bg]
- borderRadius: 16px (md: 24px)
- padding: 16px (md: 20px)
- display: flex
- flexDirection: column (mobile) → row (lg)
- overflow: hidden
- position: relative
- marginBottom: 24px

### Left column
- flex: 0 0 auto
- width: ~280px (desktop) / 100% (mobile)
- paddingRight: 20px (desktop only)
- display: flex
- flexDirection: column
- gap: 12px
- justifyContent: center

### Small label
- display: flex
- alignItems: center
- gap: 6px
- fontSize: 12px
- fontWeight: 500
- color: rgb(137, 138, 139)
- textTransform: uppercase
- letterSpacing: 0.08em
- Icon: bar chart icon (||) in neon green

### H2 heading
- fontSize: 40px (clamp 32-48px)
- fontWeight: 800
- textTransform: uppercase
- color: rgb(247, 247, 248)
- lineHeight: 1.0
- letterSpacing: -0.02em
- Text: "CINEMATIC VFX\nREADY TO USE"

### Subtitle
- fontSize: 14px
- color: rgb(137, 138, 139)
- lineHeight: 1.5

### CTA button (outline neon)
- backgroundColor: transparent
- border: 1px solid rgb(209, 254, 23)
- color: rgb(209, 254, 23)
- borderRadius: 24px
- padding: 10px 20px
- fontSize: 14px
- fontWeight: 500
- alignSelf: flex-start
- transition: background 150ms

### CTA hover
- backgroundColor: rgba(209, 254, 23, 0.1)

### Character/robot decorative image
- position: absolute or bottom of column
- maxHeight: ~180px
- Decorative, can use placeholder

### Right column (image grid)
- flex: 1
- display: grid
- gridTemplateColumns: repeat(4, 1fr) (or 3 visible + 1 partial)
- gridTemplateRows: repeat(3, 1fr)
- gap: 6px
- borderRadius: 12px
- overflow: hidden

### Grid thumbnail
- borderRadius: 8px
- overflow: hidden
- aspectRatio: 16/10
- backgroundColor: rgb(28, 30, 32)
- objectFit: cover

## Text Content
- Label: "SEEDANCE 2.0"  
- H2 line 1: "CINEMATIC VFX"
- H2 line 2: "READY TO USE"
- Subtitle: "Turn any shot cinematic"
- CTA: "Explore All Presets"
- Text link: "Explore Kling 3.0"

## Responsive Behavior
- **Desktop (1024px+):** row layout, left text + right grid side by side
- **Mobile:** column layout, text on top, grid below
