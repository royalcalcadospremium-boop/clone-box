# CopyrightBar Specification

## Overview
- **Target file:** `src/components/CopyrightBar.tsx`
- **Screenshot:** `docs/design-references/section-footer.png` (very bottom)
- **Interaction model:** static links

## DOM Structure
```
<footer id="footer"> (contain-layout w-full area-[footer])
  <nav>
    Paragraph: "© 2026 Higgsfield AI™. All rights reserved."
    Link list: Press | Creative Challenge | Privacy | Terms | Cookie Notice | Cookie Settings
```

## Computed Styles

### Footer bar
- backgroundColor: rgb(15, 17, 19)  [dark, back to normal bg]
- height: 68px
- display: flex
- alignItems: center

### Nav inner
- display: flex
- justifyContent: space-between
- alignItems: center
- width: 100%
- padding: 0 16px
- maxWidth: 1440px
- margin: 0 auto

### Copyright text
- fontSize: 13px
- color: rgb(137, 138, 139)  [muted gray]
- fontWeight: 400

### Link list
- display: flex
- gap: 24px  [gap-6]
- listStyle: none

### Link item
- fontSize: 13px
- color: rgb(137, 138, 139)
- hover: color rgb(247, 247, 248)
- transition: color 150ms

## Text Content
- Copyright: "© 2026 Higgsfield AI™. All rights reserved."
- Links: Press, Creative Challenge, Privacy, Terms, Cookie Notice, Cookie Settings

## Responsive Behavior
- **Desktop:** flex row, copyright left, links right
- **Mobile:** may stack, copyright top, links below
