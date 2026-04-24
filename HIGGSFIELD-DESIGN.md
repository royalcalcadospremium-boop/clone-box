# Higgsfield Design Reference

Source analyzed: `https://higgsfield.ai/`

Capture method:
- Firefox desktop viewport: `1440x1000`
- Firefox mobile viewport: `390x844`
- Firecrawl scrape for public DOM/text structure
- Local artifacts:
  - `artifacts/higgsfield/desktop-home.png`
  - `artifacts/higgsfield/mobile-home.png`
  - `artifacts/higgsfield/desktop-home.json`
  - `artifacts/higgsfield/mobile-home.json`
  - `artifacts/higgsfield-firecrawl.json`

## Product Feel

Higgsfield reads as a dark, media-first AI creation platform. The experience is dense and tool-oriented, but still cinematic. The interface uses black surfaces, near-black panels, neon yellow-green actions, small rounded controls, and large image/video tiles. The main emotional cues are premium creator tooling, fast exploration, and app-store-like discovery.

The UI avoids a traditional SaaS dashboard feel. It behaves more like a creative operating system: persistent navigation, media feeds, carousels, tool launchers, creator cards, and bottom/mobile navigation.

## Color System

Use dark mode as the default.

Core colors observed:

```css
--hf-bg: #0f1113;
--hf-bg-mobile: #131517;
--hf-surface: #14151a;
--hf-surface-2: #171717;
--hf-panel: #1c1e20;
--hf-panel-soft: rgba(255, 255, 255, 0.05);
--hf-border: rgba(255, 255, 255, 0.08);
--hf-border-strong: rgba(255, 255, 255, 0.12);
--hf-text: #fbfbfe;
--hf-text-soft: rgba(255, 255, 255, 0.6);
--hf-text-muted: #898a8b;
--hf-lime: #d1fe17;
--hf-lime-soft: rgba(209, 254, 23, 0.1);
--hf-lime-border: rgba(209, 254, 23, 0.24);
--hf-pink: #ff005b;
--hf-danger-soft: rgba(219, 63, 62, 0.14);
--hf-black: #000000;
--hf-white: #ffffff;
```

Usage:
- Background: `#0f1113` desktop, `#131517` mobile sections.
- Cards/panels: `#14151a`, `#171717`, `#1c1e20`.
- Primary action: lime `#d1fe17` with black text.
- Promo badges: hot pink `#ff005b` with white text.
- Secondary controls: translucent white backgrounds, usually `rgba(255,255,255,.05-.1)`.

## Typography

Observed typography is compact, bold, and highly scannable.

Recommended stack:

```css
font-family: Inter, Geist, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
```

Scale:
- Top nav labels: `14px`, `700-800`, line-height `1`.
- Small badges: `9-11px`, `800-900`, uppercase or tight title case.
- Section eyebrows: `12-14px`, uppercase, `700-900`.
- Hero headings: `42-72px`, uppercase or title case, `800-900`.
- Card titles: `14-18px`, `800-900`.
- Body text: `14-16px`, `400-600`, color `rgba(255,255,255,.6)`.
- Metadata: `11-13px`, `600-800`, muted.

Text style:
- Headings often use compressed wording and strong line breaks, for example:
  - `Meet GPT Image 2`
  - `One link in. marketing out.`
  - `What will you create today?`
  - `Cinematic VFX ready to use`
- Feature names are short and tool-like: `Create Image`, `Motion Control`, `Soul 2.0`, `Upscale`.

## Layout Principles

### Desktop

Main structure:
- Sticky top navigation, height around `58-64px`.
- Full-width dark canvas.
- Media sections are built as horizontal/vertical card grids.
- Hero modules use full-bleed media, large background imagery, or stacked media cards.
- Controls appear as pills, cards, or launcher tiles.

Common grid patterns:

```css
.hf-page {
  min-height: 100vh;
  background: #0f1113;
}

.hf-section {
  padding: 32px 24px;
}

.hf-tool-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 12px;
}

.hf-media-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 8px;
}
```

### Mobile

Mobile switches to a tighter app shell:
- Reduced top nav: logo, pricing/try-free or menu, profile/action.
- Content remains media-first.
- Bottom navigation appears with items like `Home`, `Community`, `Library`, `Profile`.
- Tool cards stack vertically.
- Feed cards become single-column, full-width, large thumbnails.

Mobile rules:
- Keep buttons at least `44px` tall.
- Use sticky bottom actions for generation flows.
- Avoid wide sidebars; collapse to tabs or bottom panels.
- Use less explanatory text and more direct tool labels.

## Navigation

Desktop nav items observed:

```text
Explore
Image
Video
Audio
Collab
Edit
Character
Marketing Studio New
Cinema Studio 3.5
Originals New
Apps
Assist
Community
Pricing 30% OFF
```

Nav styling:
- Sticky top, nearly black background.
- Logo at far left.
- Items are pill-like but subtle.
- Active/important states use lime.
- Promo discount badge uses pink.
- Desktop nav is dense and horizontal.

Recommended component:

```tsx
<header className="sticky top-0 z-50 h-[58px] border-b border-white/[0.08] bg-[#0f1113]/95">
  <nav className="flex h-full items-center gap-2 px-3">
    <Logo />
    <NavPill active>Explore</NavPill>
    <NavPill>Image</NavPill>
    <NavPill>Video</NavPill>
    <NavPill badge="New">Marketing Studio</NavPill>
    <PromoButton>Pricing</PromoButton>
  </nav>
</header>
```

## Components

### Pills

Use pills for navigation, metadata, filters, resolution, duration, aspect ratio, and model names.

```css
.hf-pill {
  height: 36px;
  border-radius: 12px;
  padding: 0 14px;
  background: rgba(255,255,255,.06);
  color: rgba(255,255,255,.72);
  font-size: 14px;
  font-weight: 800;
}

.hf-pill-active {
  background: rgba(255,255,255,.09);
  color: #d1fe17;
}
```

### Primary Button

```css
.hf-primary {
  min-height: 48px;
  border-radius: 16px;
  background: #d1fe17;
  color: #000;
  font-weight: 900;
}
```

Primary buttons should feel oversized and decisive in creation flows:
- `Generate`
- `Try Model`
- `Try Marketing Studio`
- `Get Seedance 2.0`

### Cards

Two dominant card families:

Media cards:
- Image/video thumbnail first.
- Dark text footer or overlay metadata.
- Rounded corners `16-24px`.
- Badges layered on image.

Tool cards:
- Small preview video/image.
- Title + short description.
- Optional badge like `NEW`, `PRO`, `TOP`.
- Clickable full card.

```css
.hf-card {
  border: 1px solid rgba(255,255,255,.08);
  border-radius: 20px;
  background: #14151a;
  overflow: hidden;
}

.hf-card:hover {
  border-color: rgba(209,254,23,.24);
  background: #1c1e20;
}
```

### Badges

Badge language:
- `New`
- `3.5`
- `30% OFF`
- `TOP CHOICE`
- `PRO`
- `AVAILABLE FOR EVERYONE`

```css
.hf-badge-lime {
  border-radius: 5px;
  background: #d1fe17;
  color: #000;
  font-size: 10px;
  font-weight: 900;
}

.hf-badge-pink {
  border-radius: 999px;
  background: #ff005b;
  color: #fff;
  font-size: 10px;
  font-weight: 900;
}
```

### Mega Menus

Authenticated app screenshots show large dropdown/mega panels:
- Dark elevated panel.
- Two-column structure: `Features` and `Models`.
- Each row has icon tile, bold title, muted description.
- New/top labels are lime or pink stickers attached to icon tiles.

Layout:

```css
.hf-mega-menu {
  width: 620px;
  border-radius: 24px;
  background: #191a1c;
  border: 1px solid rgba(255,255,255,.08);
  padding: 20px;
  box-shadow: 0 24px 80px rgba(0,0,0,.45);
}
```

## Home Page Structure

Public home content order observed:

1. Top navigation
2. Hero/product carousel:
   - `GPT Image 2`
   - `KLING 3.0 in 4K`
   - `Marketing Studio for Apps`
   - `Seedance 2.0 in 1080p`
   - `Marketing Studio`
3. Feature spotlight:
   - `Meet GPT Image 2`
   - CTA: `Try Model`
   - CTA: `View all of GPT Image 2`
4. Marketing Studio spotlight:
   - `One link in. marketing out.`
   - Product/app link input.
   - CTA: `Try Marketing Studio`
5. Seedance offer:
   - `Available for everyone`
   - `World's best video model`
   - CTA: `Get Seedance 2.0`
6. Tool launcher:
   - `What will you create today?`
   - `Create Image`
   - `Create Video`
   - `Motion Control`
   - `Soul 2.0`
   - `Soul ID`
   - `Upscale`
   - `Edit Image`
   - `Edit Video`
7. Top Choice tools
8. Cinematic VFX / Photodump / Soul Cinema / Kling blocks
9. Dense chip/link sections:
   - Mixed Media
   - Visual Effects
   - Higgsfield Apps
   - Explore more AI features
10. Footer with grouped links for Image, Video, Edit, company pages.

## Authenticated App Screens

From the provided screenshots, the logged-in app shell differs from the public home:

### Image Page

Structure:
- Top nav with `Explore`, `Image`, `Video`, `Audio`, etc.
- Secondary tabs: `History`, `Community`.
- Masonry/community grid.
- Floating generation composer at the bottom.

Composer:
- Attached image swatches/thumbnails at top.
- Prompt text.
- Model pill: `GPT Image 2`.
- Quality pill: `High`.
- Resolution pill: `1K`.
- Aspect ratio pill: `1:1`.
- Count/variation pill: `1/4`.
- Large lime `Generate` button.

### Video Page

Structure:
- Top nav.
- Left creation rail with tabs:
  - `Create Video`
  - `Edit Video`
  - `Motion Control`
- Upload/reference area.
- Prompt block.
- Model selector.
- Lime Generate button.
- Main history feed.
- Right rail with compact previous generations.

This is the strongest reference for CloneBox's creation screens.

## Responsiveness

Desktop:
- Horizontal nav remains visible.
- Right-side actions remain visible.
- Cards show 3-5 columns depending on section.
- Creation pages may use left rail + main feed + right rail.

Tablet:
- Hide secondary nav items first.
- Keep primary action and profile visible.
- Reduce media grids to 2 columns.

Mobile:
- Header becomes minimal.
- Public home exposes `Higgsfield`, `Pricing`, `Try Free`.
- App pages expose compact `Menu`.
- Bottom nav appears: `Home`, `Community`, `Library`, `Profile`.
- Generation composer becomes bottom sheet.
- Feed is single column.

## Implementation Guidance For CloneBox

Use this system when recreating Higgsfield-like screens:

1. Prefer media-first layouts over form-first dashboards.
2. Use a sticky top nav on every authenticated page.
3. Use lime only for primary actions, active nav, and special badges.
4. Keep cards dark, rounded, and compact.
5. Put prompt/generation controls in a bottom composer for image flows.
6. Put video creation controls in a left rail on desktop and a bottom sheet/tabs on mobile.
7. Use dense tool launchers with many small feature cards.
8. Use short English product labels if cloning Higgsfield exactly; use Portuguese only where CloneBox product context requires it.
9. Avoid light surfaces except thumbnails, media, and selected swatches.
10. Preserve mobile ergonomics: one-column feeds, sticky actions, no horizontal overflow.

## Useful Content Labels

Navigation:
```text
Explore, Image, Video, Audio, Collab, Edit, Character, Marketing Studio, Cinema Studio, Originals, Apps, Assist, Community
```

Models/tools:
```text
GPT Image 2, KLING 3.0, Seedance 2.0, Marketing Studio, Create Image, Create Video, Motion Control, Soul 2.0, Soul ID, Upscale, Edit Image, Edit Video, Nano Banana Pro, Skin Enhancer, Shots, Angles 2.0, Soul Moodboard
```

Calls to action:
```text
Try Model, View all, Try Marketing Studio, Get Seedance 2.0, Explore all tools, See all, Generate
```

## Notes

The public site uses many remote media assets and videos. For reliable local reproduction in CloneBox, cache reference media under `public/` or use local generated placeholders. Authenticated pages may require session state, so the screenshots in `Ninja Box - Hgs` remain the strongest reference for logged-in creation UI.
