# Higgsfield.ai — Behavior Bible

## Global Behaviors

### Dark-Only Scheme
- Body has class `scheme-only-dark` — no light mode exists
- Background is always `rgb(15, 17, 19)` (#0f1113)

### Font System
- Primary: **Space Grotesk** (Google Fonts) — weights 400, 500, 600, 700
- Font size scale: body-s=14px, body-m=16px, body-l=18px
- Font classes: `font-grotesk`, `font-medium`, `font-bold`

### No Smooth Scroll Library
- No Lenis/Locomotive detected — uses native browser scroll

---

## Header (#header)

### Scroll Behavior
- **Trigger:** page scroll
- **State A (top, scroll=0):** `backdrop-blur-xs bg-black-90` — semi-transparent dark
- **State B (scrolled):** stays same `backdrop-blur-xs` — no major visual change observed
- **Position:** `md:sticky top-0 z-51`
- **Height:** 64px (h-16)

### Nav Links
- Active link: full white `rgb(247, 247, 248)`, fontWeight 500
- Inactive link: muted white `rgba(255, 255, 255, 0.6)`, fontWeight 500
- All links: `py-1 px-3 rounded-xl text-body-s font-medium`
- Hover: color goes to full white (transition)

### Nav Items (left to right)
1. Logo (SVG + "Higgsfield" text on mobile) — links to /
2. Explore (active, white)
3. Image (dropdown group)
4. Video (dropdown group)
5. Audio
6. Collab
7. Edit (dropdown group)
8. Character
9. Marketing Studio + "New" badge (green)
10. Cinema Studio + "3.5" badge
11. Originals + "New" badge
12. Apps
13. Assist
14. Community (partially visible, cut off)
15. Pricing badge with "30% OFF" red pill
16. Login button (ghost, white text)
17. Sign up button (neon green bg, dark text)

---

## Section: Hero Banner (3-column featured content)

### Layout
- 3 equal columns side by side
- Each column: tall video/image card + title + subtitle below
- Cards have rounded corners ~12px
- Gap between columns ~4px
- Offset: starts at y=64 (below header)

### Content
- Column 1: GPT IMAGE 2 — "4K images with near-perfect text rendering"
- Column 2: KLING 3.0 IN 4K — "Cinema-grade video at full 4K resolution"
- Column 3: MARKETING STUDIO FOR APPS — "Powered by Hermes Agent"

### Interaction
- Card hover: subtle scale/brightness effect (group hover)
- Title text: `text-caption-l font-medium uppercase` ~13px, tracking-wider
- Subtitle text: muted gray `rgb(137, 138, 139)`

---

## Section: Tools Grid (6 cards)

### Layout
- Large image gen card on left (spans ~2 rows) + right 2x3 grid
- OR: 1 large card + 2 rows of 3 smaller cards

### Cards
1. **Generate Image** (large left) — dark bg `rgb(20, 21, 26)`, text area + image preview, "Generate" white button, rounded-2xl
2. **Generate Video** — icon + title + subtitle, dark card
3. **Seedance 2.0** — "NEW" badge (neon green), icon + title
4. **Nano Banana Pro** — "UNLIMITED" badge (pink/red), icon + title
5. **Marketing Studio** — "NEW" badge, icon + title
6. **Cinema Studio 3.5** — icon + title
7. **Higgsfield Soul V2** — "FREE GENS" badge, icon + title

### Interaction
- Static cards, hover shows subtle bg change
- Badges: small pill, rounded-full, colored background

---

## Section: Top Choice

### Layout
- Title "Top Choice" + subtitle + "See all →" link on right
- Horizontal scrollable row of tool cards
- Each card: large image, tool name → arrow, short description below

### Cards (left to right)
- Nano Banana Pro, Motion Control, Skin Enhancer, Shots, Angles 2.0, Kling 3.0...

---

## Section: Seedance 2.0 Feature Banner

### Layout  
- Left side: logo + title (CINEMATIC VFX / READY TO USE) + subtitle + "Explore All Presets" button
- Right side: 3x3 grid of video thumbnails
- Background: dark `rgb(15, 17, 19)`, rounded-2xl md:rounded-3xl
- Button: neon yellow-green outline pill

### Interaction  
- Static, no interactivity beyond hover on video thumbs

---

## Section: Community Sections (Soul Cinema, Soul 2.0, Mixed Media, Effects, Apps, Soul, Kling)

### Shared Pattern — Repeated 7 times
- Section header: title (left) + "View all" link (right)
- Below: mosaic/masonry grid of video thumbnails (4 columns, 3 rows ≈ 12 items)
- Each thumbnail: rounded-2xl, aspect-video
- Bottom: CTA button centered (neon green outline)

### Kling 3.0 Exclusive Banner (different from above)
- Left: logo + "EXCLUSIVELY ON HIGGSFIELD" + "KLING 3.0" giant text + "EXCLUSIVE ACCESS" + description + "Get Exclusive Offer" button (solid neon green) + "Explore Kling 3.0" text link
- Right: 4-col 3-row grid of video thumbnails
- Background: dark (same near-black)

---

## Section: Explore More AI Features

### Layout
- Title: "Explore more ai features" (lowercase styling)
- Grid of feature links with icons: Cinema Studio, Visual Effects, Higgsfield Soul, Higgsfield Apps...
- Minimal text-only layout

---

## Footer (#footer-landing)

### Background
- BRIGHT NEON YELLOW-GREEN: `rgb(209, 254, 23)` (#d1fe17)
- Text color: `rgb(20, 21, 26)` (near-black)

### Layout
- Container `py-9` (36px top/bottom padding)
- Top section: H2 headline (left) + 4-column nav grid (right)
  - H2: "THE ULTIMATE AI-POWERED CAMERA CONTROL FOR FILMMAKERS & CREATORS"
  - Font: 40px, fontWeight 500, uppercase, Space Grotesk
- Bottom section: address (left) + social links (right, `xl:justify-end`)

### Nav Columns (4 cols on XL, 3 on MD, 2 on mobile)
1. **Company**: About, Trust, Careers, Contact, Pricing, Apps, Cinema Studio, Marketing Studio, Higgsfield Chat, AI Influencer, Community, Enterprise, Team, Copilot, Reference Extension, Blog, Contests, Discord
2. **AI Image**: AI Image, Soul ID Character, Draw to Edit, Fashion Factory, Edit Image, Image Upscale, Photodump Studio, Higgsfield Popcorn, Nano Banana Pro, Nano Banana 2, Prompt Guide, Flux 2, GPT Image 2, Inpaint, Soul 2.0, Soul Cinema, Soul Cast
3. **AI Video**: AI Video, Mixed media, Sora 2 Introduction, Veo 3.1 Introduction, Create Video, Lipsync Studio, Talking Avatar, Draw to Video, UGC Factory, Video Upscale, Kling 3.0, WAN 2.6, Seedance 2.0
4. **Edit**: Banana Placement, Product Placement, Edit Image, Multi Reference, Upscale, Sora 2 Upscale

### Social Links
- X / Twitter: https://x.com/higgsfield
- Youtube: https://www.youtube.com/@HiggsfieldAI
- Instagram: https://www.instagram.com/higgsfield.ai
- LinkedIn: https://www.linkedin.com/company/higgsfield
- Tiktok: https://www.tiktok.com/@higgsfield.ai90

### Address
- 535 Mission St, 14th floor, San Francisco, CA, 94105

### Copyright Bar (#footer, separate element)
- Background: dark again `rgb(15, 17, 19)`
- Height: 68px
- Content: © 2026 Higgsfield AI™. All rights reserved. | Press | Creative Challenge | Privacy | Terms | Cookie Notice | Cookie Settings

---

## Responsive Behavior

### Desktop (1440px) → Mobile (390px)
- Header: horizontal nav collapses, shows hamburger menu
- Hero banner: 3 col → 1 col stack
- Tools grid: adapts columns
- Community sections: 4-col grid → 2-col grid
- Footer nav: 4 cols → 2 cols → 1 col
- Footer headline: 40px → ~24px

### Breakpoints
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
