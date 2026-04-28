# FooterLanding Specification

## Overview
- **Target file:** `src/components/FooterLanding.tsx`
- **Screenshot:** `docs/design-references/section-footer.png`
- **Interaction model:** static links with hover underline/opacity

## DOM Structure
```
<footer id="footer-landing"> (relative bg-neon text-dark z-10)
  <div class="container py-9 grid gap-14 md:gap-18">
    
    Top section:
      H2 headline (left)
      4-column nav links grid (right)
    
    Bottom section:
      Address + logo info (left)
      Social links (right, hidden on mobile)
```

## Computed Styles

### Footer outer
- backgroundColor: rgb(209, 254, 23)  [#d1fe17 bright neon yellow-green]
- color: rgb(20, 21, 26)  [#14151a near-black]
- position: relative
- zIndex: 10
- width: 100%

### Container inner
- padding: 36px 16px  [py-9]
- display: grid
- gap: 56px (md: 72px)  [gap-14 md:gap-18]

### Top section
- display: grid
- gridTemplateRows: auto 1fr (mobile)
- gridTemplateColumns: auto 1fr (xl: side by side)
- justifyContent: space-between
- gap: 32px (md: 48px)

### H2 headline
- fontSize: 40px (md: 56px)
- fontWeight: 500
- textTransform: uppercase
- fontFamily: Space Grotesk
- color: rgb(19, 21, 23)  [near-black]
- maxWidth: 384px (xl: constrained)
- paddingRight: 40px
- lineHeight: 1.05
- Text: "THE ULTIMATE AI-POWERED CAMERA CONTROL FOR FILMMAKERS & CREATORS"

### Nav columns grid
- display: grid
- gridTemplateColumns: repeat(2, 1fr)  [mobile]
- gridTemplateColumns: repeat(3, 1fr)  [md]
- gridTemplateColumns: repeat(4, 1fr)  [xl]
- gap: 48px

### Column header (not shown — columns go straight to links)
- No visible column headers

### Nav link
- display: block
- fontSize: 14px
- fontWeight: 400
- color: rgb(20, 21, 26)
- padding: 3px 0
- textDecoration: none
- transition: opacity 150ms

### Nav link hover
- opacity: 0.6

### Bottom section
- display: grid
- gridAutoFlow: row
- gridTemplateColumns: auto 1fr (xl)
- gap: 32px
- justifyContent: space-between

### Address area
- fontSize: 14px
- color: rgb(19, 21, 23)
- lineHeight: 1.5
- Text: "535 Mission St, 14th floor, San Francisco, CA, 94105"

### Social links (ul)
- display: flex (hidden on mobile: `hidden md:flex`)
- gap: 32px  [gap-8]
- justifyContent: flex-end (xl)
- listStyle: none

### Social link
- fontSize: 14px
- fontWeight: 500
- color: rgb(20, 21, 26)
- hover: opacity 0.6
- transition: opacity 150ms

## Footer Navigation Content

### Column 1 (Company)
About, Trust, Careers, Contact, Pricing, Apps, Cinema Studio, Marketing Studio, Higgsfield Chat, AI Influencer, Community, Enterprise, Team, Copilot, Reference Extension, Blog, Contests, Discord

### Column 2 (AI Image)
AI Image, Soul ID Character, Draw to Edit, Fashion Factory, Edit Image, Image Upscale, Photodump Studio, Higgsfield Popcorn, Nano Banana Pro, Nano Banana 2, Prompt Guide, Flux 2, GPT Image 2, Inpaint, Soul 2.0, Soul Cinema, Soul Cast

### Column 3 (AI Video)
AI Video, Mixed media, Sora 2 Introduction, Veo 3.1 Introduction, Create Video, Lipsync Studio, Talking Avatar, Draw to Video, UGC Factory, Video Upscale, Kling 3.0, WAN 2.6, Seedance 2.0

### Column 4 (Edit)
Banana Placement, Product Placement, Edit Image, Multi Reference, Upscale, Sora 2 Upscale

## Social Links
- X / Twitter → https://x.com/higgsfield
- Youtube → https://www.youtube.com/@HiggsfieldAI
- Instagram → https://www.instagram.com/higgsfield.ai
- LinkedIn → https://www.linkedin.com/company/higgsfield
- Tiktok → https://www.tiktok.com/@higgsfield.ai90

## Address
535 Mission St, 14th floor, San Francisco, CA, 94105

## Responsive Behavior
- **Desktop XL (1280px+):** H2 left, 4-col nav right, side by side
- **Tablet MD (768px):** H2 top, 3-col nav below
- **Mobile:** H2 top, 2-col nav below, social links hidden
