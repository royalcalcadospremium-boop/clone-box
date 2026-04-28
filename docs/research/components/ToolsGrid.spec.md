# ToolsGrid Specification

## Overview
- **Target file:** `src/components/ToolsGrid.tsx`
- **Screenshot:** `docs/design-references/section-hero.png` (lower half)
- **Interaction model:** static cards, hover bg change

## DOM Structure
```
<div class="container"> (height ~2783px — contains multiple sub-sections)
  Row 1 (top tools):
    Large Generate Image card (left ~40% wide) + 2x3 grid of tool cards (right ~60%)
  Row 2 (Top Choice section) — separate component
  Row 3 (Seedance banner) — separate component
  ...
```

## Tool Cards Layout (Row 1 only — the 6 primary tools)

### Layout
- Display: grid
- gridTemplateColumns: ~2fr 1fr 1fr 1fr (Generate Image takes more width)
- OR: flex row with Generate Image card being wide
- gap: 8px
- marginBottom: 32px

### Generate Image Card (large)
- backgroundColor: rgb(20, 21, 26)  [dark surface]
- borderRadius: 16px
- padding: 20px
- minHeight: 280px
- display: flex
- flexDirection: column
- position: relative
- overflow: hidden

### Generate Image card content
- Title: "Generate Image" — fontSize: 22px, fontWeight: 600, color: rgb(247,247,248)
- Subtitle: "Describe an image and click generate" — fontSize: 14px, color: rgb(137,138,139)
- "Generate" button: white bg, dark text, rounded-lg, fontWeight: 600, padding: 8px 20px, fontSize: 14px
- Right side: floating image of AI-generated person (positioned absolute right)
- Bottom gradient fade: linear-gradient for image blending

### Small tool card (6 items)
- backgroundColor: rgb(20, 21, 26) → hover: rgb(28, 30, 32)
- borderRadius: 16px
- padding: 16px 20px
- display: flex
- flexDirection: column
- gap: 4px
- minHeight: 130px
- transition: background 150ms

### Small card content
- Icon: top-left, 24x24, color rgb(137,138,139)
- Badge (if any): top-right, absolute
- Title: fontSize: 18px, fontWeight: 600, color: rgb(247,247,248), marginTop: 12px
- Subtitle: fontSize: 13px, color: rgb(137,138,139)

## Tool Cards Content

### Card 1: Generate Image (large)
- Title: "Generate Image"
- Subtitle: "Describe an image and click generate"
- Button: "Generate" (white)
- Has generated image floating on right

### Card 2: Generate Video
- Icon: video camera outline
- Title: "Generate Video"
- Subtitle: "Create high-quality videos in seconds"

### Card 3: Seedance 2.0
- Icon: bar chart / analytics icon
- Badge: "NEW" (neon green)
- Title: "Seedance 2.0"
- Subtitle: "Most advanced video model"

### Card 4: Nano Banana Pro
- Icon: "G" letter (Nano Banana / GPT related)
- Badge: "UNLIMITED" (red/pink)
- Title: "Nano Banana Pro"
- Subtitle: "Generate high-quality visuals"

### Card 5: Marketing Studio
- Icon: monitor/screen outline
- Badge: "NEW" (neon green)
- Title: "Marketing Studio"
- Subtitle: "Launch full campaigns from one prompt"

### Card 6: Cinema Studio 3.5
- Icon: film/clapperboard outline
- Title: "Cinema Studio 3.5"
- Subtitle: "Create cinematic scenes effortlessly"

### Card 7: Higgsfield Soul V2
- Icon: swirl/atom-like icon
- Badge: "FREE GENS" (green)
- Title: "Higgsfield Soul V2"
- Subtitle: "Generate ultra-realistic visuals"

## States & Behaviors

### Card hover
- backgroundColor: rgb(20,21,26) → rgb(28,30,32)
- Transition: 150ms ease
- Cursor: pointer

## Responsive Behavior
- **Desktop (768px+):** 2-column layout: large card left + 3-col grid right
- **Mobile (<768px):** Single column, all cards full-width, equal size
