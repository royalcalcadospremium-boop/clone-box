# TopChoice Specification

## Overview
- **Target file:** `src/components/TopChoice.tsx`
- **Screenshot:** `docs/design-references/section-top-choice.png` (top portion)
- **Interaction model:** horizontal scroll, hover on cards

## DOM Structure
```
<section> (mb-8 md:mb-16, container, relative px-0, group)
  Header row:
    Left: "Top Choice" title + subtitle
    Right: "See all →" link
  
  Horizontal scroll container (overflow-x: auto, hide-scrollbar):
    Tool cards (min-width per card, inline-flex)
      Image (large, top ~70% of card)
      Tool name → arrow
      Description below
```

## Computed Styles

### Section header
- display: flex
- justifyContent: space-between
- alignItems: flex-start
- marginBottom: 16px

### Title "Top Choice"
- fontSize: 24px
- fontWeight: 700
- color: rgb(247, 247, 248)
- lineHeight: 1.2

### Subtitle
- fontSize: 14px
- color: rgb(137, 138, 139)
- marginTop: 4px
- Text: "Creator-recommended tools tailored for you"

### "See all →" link
- display: flex
- alignItems: center
- gap: 4px
- fontSize: 14px
- fontWeight: 500
- color: rgb(247, 247, 248)
- hover: color rgb(209, 254, 23)
- Contains: chevron right icon

### Scroll container
- display: flex
- flexDirection: row
- gap: 12px
- overflowX: auto
- scrollbarWidth: none  [hide-scrollbar]
- paddingBottom: 8px

### Tool card
- display: flex
- flexDirection: column
- minWidth: 200px
- maxWidth: 200px
- cursor: pointer

### Card image area
- width: 200px
- height: 240px
- borderRadius: 12px
- overflow: hidden
- objectFit: cover
- backgroundColor: rgb(28, 30, 32)
- position: relative

### PRO badge on card image
- position: absolute
- top: 8px
- left: 8px
- backgroundColor: #8b5cf6  [purple]
- color: white
- fontSize: 10px
- fontWeight: 700
- padding: 2px 6px
- borderRadius: 4px
- textTransform: uppercase

### Card title row (below image)
- display: flex
- alignItems: center
- justifyContent: space-between
- marginTop: 10px

### Card title text
- fontSize: 15px
- fontWeight: 600
- color: rgb(247, 247, 248)

### Arrow icon →
- fontSize: 14px
- color: rgb(137, 138, 139)

### Card description
- fontSize: 13px
- color: rgb(137, 138, 139)
- marginTop: 3px
- display: -webkit-box
- -webkit-line-clamp: 2
- overflow: hidden

## Cards Content (left to right)
1. Nano Banana Pro — "Best 4K image model ever" — no badge
2. Motion Control — "Precise control of character actions" — no badge
3. Skin Enhancer — "Natural, realistic skin textures" — PRO badge
4. Shots — "9 unique shots from one image" — no badge
5. Angles 2.0 — "Generate any angle view for any..." — PRO badge
6. Kling 3.0 — "15-second v..." — no badge (partially visible)

## Responsive Behavior
- **All viewports:** horizontal scroll, cards never stack
- Card min-width stays at 200px regardless of viewport
