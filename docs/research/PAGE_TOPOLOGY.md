# Higgsfield.ai — Page Topology

## Design Tokens
- **Background**: `rgb(15, 17, 19)` (body), near-black
- **Text primary**: `rgb(247, 247, 248)` (almost white)
- **Accent neon**: `rgb(209, 254, 23)` (bright neon yellow-green) — primary CTA, footer bg
- **Surface dark 1**: `rgb(20, 21, 26)`
- **Surface dark 2**: `rgb(19, 21, 23)`
- **Surface dark 3**: `rgb(28, 30, 32)`
- **Muted text**: `rgb(137, 138, 139)`
- **Border**: `rgb(46, 48, 49)`
- **Font**: `Space Grotesk` (primary), system-ui fallback
- **Scheme**: dark-only (`scheme-only-dark`)

## Page Structure (top → bottom)

### 0. Header (`#header`)
- `h-16 md:h-16 w-full relative md:sticky top-0 z-51 backdrop-blur-xs bg-black-90`
- Height: 64px, sticky on desktop
- Background: `rgb(15, 17, 19)` (dark)
- Contains: logo, nav links, auth buttons

### 1. Hero/Promo Banner (index 11, SECTION)
- Classes: `relative container px-0 group pt-2 md:pt-3 mb-6 md:mb-8 z-0`
- Height: ~360px, offsetTop: 64
- Contains video + headline text + CTA
- Text: "Your browser does not support the video. GPT Image 2: 4K images with near-perfect..."
- INTERACTION: static + hover group effects

### 2. Tools Grid (index 12, DIV.container)
- Height: ~2783px, offsetTop: 456
- 6 children — contains multiple tool cards in a grid layout
- Text: "Generate Image, Describe an image and click generate, Generate Video, Create h..."
- This is the MAIN content section with all the tool thumbnails

### 3. Top Choice Section (index 13, SECTION)
- Classes: `mb-8 md:mb-16 container relative px-0 group`
- Height: ~388px, offsetTop: 3303
- Text: "Top Choice, Creator-recommended tools tailored for you, See all"
- Contains video cards carousel/grid

### 4. Seedance 2.0 Feature Banner (index 14, DIV)
- Classes: `container flex flex-col lg:flex-row relative w-full mb-6 overflow-visible sm:overflow-hidden mt-16 sm:mt-0 rounded-2xl md:rounded-3xl p-4 md:p-5`
- Height: ~506px, offsetTop: 3755
- Background: `rgb(15, 17, 19)`
- Text: "Seedance 2.0, Cinematic VFX, Ready to Use, Turn any shot cinematic, Explore All Presets"

### 5. Photodump Promo Banner (index 17, DIV)
- Classes: `mb-8 md:mb-16 relative transition hover:opacity-80 container`
- Height: ~280px, offsetTop: 4285
- Text: "Try Photodump"
- INTERACTION: hover opacity 80%

### 6. Soul Cinema Community (index 18, SECTION#soul-cinema-community)
- Height: ~976px, offsetTop: 4629
- Text: "Higgsfield Soul Cinema, Explore Higgsfield Community gallery..."
- Contains media grid

### 7. Kling 3.0 Exclusive Banner (index 19, SECTION)
- Classes: `container relative mb-8`
- Height: ~475px, offsetTop: 5669
- Text: "exclusively on Higgsfield, KLING 3.0, EXCLUSIVE ACCESS"

### 8. Soul 2.0 Community (index 20, SECTION#soul-community)
- Height: ~976px, offsetTop: 6176
- Text: "Higgsfield Soul 2.0, A culture-native photo model built for fashion, aesthetics..."

### 9. Mixed Media Community (index 21, SECTION#mixed-media-community)
- Height: ~1040px, offsetTop: 7216
- Text: "Mixed Media"

### 10. Visual Effects (index 22, SECTION#effects)
- Height: ~1040px, offsetTop: 8320
- Text: "Visual Effects, Big-budget visual effects, from explosions to surreal transformati..."

### 11. Higgsfield Apps (index 23, SECTION#apps)
- Height: ~1040px, offsetTop: 9424
- Text: "Higgsfield Apps, Create ready-to-share content in one click..."

### 12. Soul Photo Model (index 24, SECTION#soul)
- Height: ~976px, offsetTop: 10528
- Text: "Higgsfield Soul, Higgsfield's first high-aesthetic photo model..."

### 13. Kling 2.5 Turbo (index 25, SECTION#kling)
- Height: ~1040px, offsetTop: 11568
- Text: "Kling 2.5 Turbo, Next-gen video creation powered by exclusive presets..."

### 14. Explore More AI Features (index 26, SECTION)
- Classes: `py-10 md:py-20 container max-w-8xl mb-10 md:mb-16`
- Height: ~400px, offsetTop: 12672
- Text: "Explore more ai features, Cinema Studio, Visual Effects, Higgsfield Soul, Higgsfield Apps..."

### 15. Footer (`#footer-landing`, FOOTER)
- Background: `rgb(209, 254, 23)` — BRIGHT NEON YELLOW-GREEN
- Height: ~888px, offsetTop: 13136
- Text: "THE ULTIMATE AI-POWERED CAMERA CONTROL FOR FILMMAKERS & CREATORS"
- Contains site links, tagline, social links

## Z-Index Layers
- Header: z-51 (above everything)
- Toast notifications: z-9999
- Main content: z-0

## Interaction Model
- Header: sticky scroll, backdrop-blur increases on scroll
- Hero video: autoplay, loop, muted
- Section grids: hover effects on cards
- Photodump banner: hover:opacity-80
- Community sections: 2-column grid of video thumbnails
- Footer: static, bright neon background
