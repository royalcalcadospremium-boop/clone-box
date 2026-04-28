# CommunitySection Specification (Reusable)

## Overview
- **Target file:** `src/components/CommunitySection.tsx`
- **Screenshot:** `docs/design-references/section-community.png`
- **Interaction model:** static grid with hover effects on thumbnails
- **Used for:** Soul Cinema, Soul 2.0, Mixed Media, Visual Effects, Apps, Soul, Kling sections

## DOM Structure
```
<section id="..."> (mb-10 md:mb-16, scroll-mt-4 md:scroll-mt-20, container, relative px-0 group/section)
  Header row:
    Left: section title + subtitle/badge
    Right: "View all" link with arrow →
  
  Media grid:
    4-column × 3-row grid of video thumbnails
    (some sections have 3 rows = 12 items)
  
  CTA button row (centered):
    Outline neon green button
```

## Computed Styles

### Section
- marginBottom: 40px (md: 64px)
- position: relative

### Section header row
- display: flex
- justifyContent: space-between
- alignItems: flex-start
- marginBottom: 16px

### Section title
- fontSize: 24px (md: 32px)
- fontWeight: 700
- color: rgb(247, 247, 248)
- lineHeight: 1.2

### Section subtitle/description
- fontSize: 14px
- color: rgb(137, 138, 139)
- marginTop: 4px

### "View all" link
- fontSize: 14px
- fontWeight: 500
- color: rgb(209, 254, 23)  [neon green]
- display: flex
- alignItems: center
- gap: 4px
- hover: opacity 0.8

### Media grid
- display: grid
- gridTemplateColumns: repeat(4, 1fr)
- gap: 8px (md: 12px)
- marginBottom: 24px

### Thumbnail card
- position: relative
- overflow: hidden
- borderRadius: 12px (rounded-xl)
- aspectRatio: 16/10
- backgroundColor: rgb(28, 30, 32)  [dark placeholder]
- cursor: pointer

### Thumbnail image/video
- width: 100%
- height: 100%
- objectFit: cover
- transition: transform 200ms, filter 200ms

### Thumbnail hover
- **Trigger:** mouse hover
- **State B:** transform scale(1.02), filter brightness(1.1)
- **Transition:** 200ms ease

### Creator badge (bottom-left of some thumbnails)
- position: absolute
- bottom: 8px
- left: 8px
- display: flex
- alignItems: center
- gap: 6px

### Creator avatar
- width: 24px
- height: 24px
- borderRadius: 50%
- border: 2px solid rgba(255,255,255,0.3)

### Creator name
- fontSize: 12px
- color: rgba(255,255,255,0.9)
- fontWeight: 500

### Like count badge (bottom-right)
- position: absolute
- bottom: 8px
- right: 8px
- display: flex
- alignItems: center
- gap: 4px
- backgroundColor: rgba(0,0,0,0.6)
- borderRadius: 20px
- padding: 3px 8px
- fontSize: 12px
- color: rgba(255,255,255,0.9)

### CTA button (centered below grid)
- display: block
- margin: 0 auto
- backgroundColor: transparent
- border: 1px solid rgb(209, 254, 23)  [neon outline]
- color: rgb(209, 254, 23)
- borderRadius: 24px
- padding: 10px 24px
- fontSize: 14px
- fontWeight: 500
- cursor: pointer
- transition: background 150ms

### CTA button hover
- backgroundColor: rgba(209, 254, 23, 0.1)

## Props Interface
```typescript
interface CommunitySectionProps {
  id?: string;
  title: string;
  subtitle?: string;
  viewAllHref: string;
  viewAllLabel: string;
  ctaLabel: string;
  ctaHref: string;
  items: Array<{
    id: string;
    imageUrl?: string;
    creatorName?: string;
    creatorAvatar?: string;
    likeCount?: number;
  }>;
}
```

## Sections That Use This Component
1. Soul Cinema — title: "Higgsfield Soul Cinema", cta: "View all of Higgsfield Soul Cinema ↗"
2. Soul 2.0 — title: "Higgsfield Soul 2.0", subtitle: "A culture-native photo model..."
3. Mixed Media — title: "Mixed Media"
4. Visual Effects — title: "Visual Effects", subtitle: "Big-budget visual effects, from explosions to surreal transformations"
5. Higgsfield Apps — title: "Higgsfield Apps", subtitle: "Create ready-to-share content in one click..."
6. Soul Photo — title: "Higgsfield Soul", subtitle: "Higgsfield's first high-aesthetic photo model"
7. Kling 2.5 — title: "Kling 2.5 Turbo", subtitle: "Next-gen video creation..."

## Responsive Behavior
- **Desktop (1024px+):** 4-column grid
- **Tablet (768px):** 3-column grid
- **Mobile (390px):** 2-column grid, thumbnails stack
