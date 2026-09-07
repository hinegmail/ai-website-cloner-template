# StickyHeader Component Specification

## Overview
- **Target file:** `src/components/sites/giada-com-0f7e9c3a/root-a1b2c3d4/StickyHeader.tsx`
- **Screenshot:** `docs/design-references/giada-com-0f7e9c3a/root-a1b2c3d4/header-sticky.png`
- **Interaction model:** Static with link navigation

## DOM Structure
```
<header class="sticky-header">
  <nav>
    <a href="/home/index">
      <span>最新系列</span> (logo/home link)
    </a>
    <a href="/archive/index" class="active">
      <span>品牌档案</span>
    </a>
    <a href="/artToArtFilm/index">
      <span>ART TO ART</span>
    </a>
  </nav>
</header>
```

## Computed Styles

### Header Container
- display: block
- position: sticky
- top: 0
- height: 49px
- padding: 0px (inspect actual padding)
- background-color: transparent (rgba(0, 0, 0, 0))
- z-index: 100 (ensures it stays above content on scroll)
- border-bottom: none (no border)
- box-shadow: none (no shadow)

### Nav Element
- display: flex
- flex-direction: row
- justify-content: flex-start
- align-items: center
- gap: 24px (spacing between links)
- padding: 0 16px (horizontal padding inside header)
- height: 100%

### Navigation Links (a)
- font-size: 12px
- font-weight: 400
- color: rgba(235, 235, 235, 0.64)
- font-family: Inter, sans-serif
- text-decoration: none
- cursor: pointer
- padding: 0 8px
- transition: none (no hover animation observed)

### Active Link (a[class*="active"])
- color: rgb(255, 255, 255) (white, fully opaque)

### Link Hover (a:hover)
- color: rgb(255, 255, 255) (becomes white on hover)
- transition: none or very fast

## States & Behaviors

### Sticky Positioning
- **Trigger:** Page load and scroll
- **State A (scroll position 0):**
  - position: sticky
  - top: 0
  - background-color: transparent
  - box-shadow: none
  - border: none

- **State B (scroll position > 0):**
  - Remains sticky at top (CSS sticky positioning handles this)
  - No observed visual changes
  - Background remains transparent
  - No shadow added
  - Text color unchanged

- **Implementation approach:** CSS `position: sticky; top: 0;` (no JavaScript required)

### Navigation Links
- **Link 1:** "最新系列" → href: "https://giada.com/home/index"
- **Link 2:** "品牌档案" → href: "https://giada.com/archive/index" (current page, active state)
- **Link 3:** "ART TO ART" → href: "https://giada.com/artToArtFilm/index"

### Hover States
- **All links:** Font color transitions from rgba(235, 235, 235, 0.64) to white
- **Active link:** Already white (shows current page)

## Content
- **Link 1:** 最新系列
- **Link 2:** 品牌档案 (active on /archive/index)
- **Link 3:** ART TO ART

## Responsive Behavior
- **Desktop (1440px):** Full-width header, links centered horizontally
- **Tablet (768px):** Same layout, possibly smaller font (12px to 11px)
- **Mobile (390px):** Possibly hamburger menu or stacked layout (not observed at 1440px, needs mobile testing)
- **Breakpoint:** Unknown (need to test at actual mobile widths)

## Implementation Notes
- Use CSS `position: sticky` for sticky behavior (no JavaScript needed)
- The header is part of a larger Element UI container, but for cloning purposes, treat as standalone
- Link colors: inactive = rgba(235, 235, 235, 0.64), active = rgb(255, 255, 255)
- No animations observed on link hover
- Z-index must be high enough to stay above video content (use z-index: 100)
