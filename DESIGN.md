# Spotify-Inspired Design System — CloneBox

## Colors

### Primary Palette
- **Spotify Green**: `#1DB954` — CTAs principais, destaques, badges de sucesso
- **Green Hover**: `#1ED760` — hover states
- **Black**: `#191414` — background principal
- **Dark Surface**: `#121212` — background de cards e painéis
- **Surface Elevated**: `#282828` — cards elevados, modais
- **Surface Highlight**: `#3E3E3E` — hover em cards
- **White**: `#FFFFFF` — textos primários
- **Subdued**: `#B3B3B3` — textos secundários
- **Muted**: `#535353` — textos terciários, borders

### Semantic
- **Success**: `#1DB954`
- **Error**: `#E91429`
- **Warning**: `#FFA42B`
- **Info**: `#2D46B9`

## Typography

### Font Family
- **Primary**: `Circular Std` → fallback: `Inter`, `system-ui`, `sans-serif`
- **Mono**: `Geist Mono`, `monospace`

### Scale
| Token | Size | Weight | Usage |
|-------|------|--------|-------|
| `display` | 96px | 900 | Hero headlines |
| `heading-xl` | 48px | 700 | Page titles |
| `heading-lg` | 32px | 700 | Section titles |
| `heading-md` | 24px | 700 | Card titles |
| `heading-sm` | 18px | 600 | Subsections |
| `body-lg` | 16px | 400 | Body text |
| `body-sm` | 14px | 400 | Secondary text |
| `label` | 12px | 500 | Labels, badges |
| `micro` | 11px | 400 | Captions |

## Spacing

Base unit: `4px`

| Token | Value |
|-------|-------|
| `xs` | 4px |
| `sm` | 8px |
| `md` | 16px |
| `lg` | 24px |
| `xl` | 32px |
| `2xl` | 48px |
| `3xl` | 64px |

## Border Radius
- **Pill**: `500px` — botões, badges
- **Card**: `8px` — cards, modais
- **Small**: `4px` — inputs, tags

## Shadows
- **Card**: `0 8px 24px rgba(0,0,0,0.5)`
- **Elevated**: `0 16px 56px rgba(0,0,0,0.5)`
- **Glow Green**: `0 0 20px rgba(29,185,84,0.3)`

## Components

### Button — Primary
```
background: #1DB954
color: #000000
font-weight: 700
border-radius: 500px
padding: 14px 32px
hover: background #1ED760, transform scale(1.04)
```

### Button — Secondary
```
background: transparent
color: #FFFFFF
border: 1px solid #B3B3B3
border-radius: 500px
padding: 14px 32px
hover: border-color #FFFFFF
```

### Card
```
background: #181818
border-radius: 8px
padding: 16px
hover: background #282828
transition: 0.3s ease
```

### Input
```
background: #3E3E3E
border: 1px solid transparent
border-radius: 4px
color: #FFFFFF
padding: 12px 16px
focus: border-color #1DB954
placeholder-color: #B3B3B3
```

## Animation
- **Transition default**: `300ms ease`
- **Hover scale**: `transform: scale(1.04)`
- **Fade in**: `opacity 0 → 1, 200ms`
- **Slide up**: `translateY(8px) → 0, 300ms`
