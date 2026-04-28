# Navbar Specification

## Overview
- **Target file:** `src/components/Navbar.tsx`
- **Screenshot:** `docs/design-references/header.png`
- **Interaction model:** static + hover states on nav links

## DOM Structure
```
<header id="header"> (h-16, md:sticky top-0 z-50, backdrop-blur, bg #0f1113)
  <nav> (grid grid-cols-[auto_1fr_auto], pr-4, h-full, items-center, container)
    Logo link (SVG icon + "Higgsfield" text on mobile)
    Div#header__menu_list (desktop nav links, hidden on mobile)
    Div (auth buttons: Login + Sign up)
```

## Computed Styles (exact from getComputedStyle)

### Header
- height: 64px
- position: sticky (md+)
- top: 0
- z-index: 51
- backgroundColor: rgb(15, 17, 19)  [#0f1113]
- backdropFilter: blur(4px) [backdrop-blur-xs]
- width: 100%

### Logo area
- display: grid
- gridAutoFlow: column
- alignItems: center
- gap: 8px

### Nav link (active)
- padding: 4px 12px
- borderRadius: 12px
- fontSize: 16px
- fontWeight: 500
- color: rgb(247, 247, 248)  [full white]
- cursor: pointer

### Nav link (inactive)
- color: rgba(255, 255, 255, 0.6)  [dimmed white]
- transition: color 150ms

### Badge "New"
- backgroundColor: rgb(209, 254, 23)  [neon green]
- color: rgb(19, 21, 23)  [near-black]
- fontSize: 10px
- fontWeight: 700
- padding: 2px 6px
- borderRadius: 4px
- textTransform: uppercase

### Badge "3.5" (numeric badge)
- backgroundColor: rgba(255,255,255,0.12)
- color: rgba(255,255,255,0.6)
- fontSize: 10px
- padding: 2px 5px
- borderRadius: 4px

### "Pricing" badge area
- Has "30% OFF" red sub-badge:
  - backgroundColor: rgb(219, 63, 62)  [red]
  - color: white
  - fontSize: 9px
  - fontWeight: 700

### Login button
- backgroundColor: transparent
- color: rgb(209, 254, 23)  [neon green text]
- fontSize: 16px
- fontWeight: 500
- padding: 8px 16px
- border: none

### Sign up button
- backgroundColor: rgb(209, 254, 23)  [neon green]
- color: rgb(19, 21, 23)  [near-black text]
- fontSize: 14px
- fontWeight: 700
- padding: 8px 16px
- borderRadius: 8px
- border: none

## Nav Items (left to right, desktop)
1. Logo SVG (28x28) + "Higgsfield" text (mobile only, font-bold 18px)
2. **Explore** (active, full white)
3. **Image** (dimmed, with chevron down indicating dropdown)
4. **Video** (dimmed, with chevron down)
5. **Audio** (dimmed)
6. **Collab** (dimmed)
7. **Edit** (dimmed, with chevron down)
8. **Character** (dimmed)
9. **Marketing Studio** (dimmed) + "New" green badge
10. **Cinema Studio** (dimmed) + "3.5" gray badge
11. **Originals** (dimmed) + "New" green badge
12. **Apps** (dimmed)
13. **Assist** (dimmed)
14. **Pricing** (dimmed) + "30% OFF" red pill badge below

Right side:
- **Login** (neon green text, no background)
- **Sign up** (neon green background, dark text, rounded-lg)

## States & Behaviors

### Hover on nav link
- **Trigger:** mouse hover
- **State A:** color rgba(255,255,255,0.6)
- **State B:** color rgb(247,247,248) [full white]
- **Transition:** color 150ms ease

### Mobile
- Nav links hidden (`hidden md:grid`)
- Logo text "Higgsfield" shown (`md:hidden`)
- Mobile header: separate `#header-mobile` element (hamburger menu)

## Text Content
- Logo text: "Higgsfield"
- Nav items: Explore, Image, Video, Audio, Collab, Edit, Character, Marketing Studio, Cinema Studio, Originals, Apps, Assist, Pricing
- Login | Sign up

## Responsive Behavior
- **Desktop (768px+):** Full horizontal nav visible
- **Mobile (<768px):** Nav links hidden, mobile header shown separately

## Implementation Notes
- Use Next.js Link for navigation
- For dropdown indicators use a simple ChevronDown icon from lucide-react
- Keep dropdowns as visual hint only (no actual dropdown functionality needed)
- Logo SVG: use a simple "H" or placeholder logo icon; the actual SVG is embedded in the page
- The Higgsfield logo looks like a stylized "H" in a rounded square shape
