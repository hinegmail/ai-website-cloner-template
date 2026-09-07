# Page Behaviors & Interactions

## Scroll Behavior
- **Type:** Standard vertical scroll (no smooth scroll library detected)
- **Page Flow:** Top-to-bottom linear layout
- **Total Height:** ~13,900px (many tall video sections)
- **Behavior on Scroll:** No observed state changes; videos continue auto-playing as user scrolls

## Video Autoplay
- **All 8 videos:** Set to `autoplay=true, loop=true`
- **Trigger:** Videos auto-play on page load without user interaction
- **Muting:** May be browser auto-play policy dependent (typically requires muted or user interaction)
- **Duration per video:** 2-12 seconds (range varies by season)

## Header Sticky Behavior
- **Initial State (scroll position 0):**
  - Position: sticky at top
  - Height: 49px
  - Background: transparent
  - Text: rgba(235, 235, 235, 0.64)

- **Scrolled State (scroll position > 0):**
  - Remains sticky at top
  - No observed visual changes (background stays transparent, no shadow added)
  - Text color remains the same

## Navigation Links
- **Header Links:**
  - "最新系列" → `https://giada.com/home/index` (logo/home link)
  - "品牌档案" → `https://giada.com/archive/index` (current page, active)
  - "ART TO ART" → `https://giada.com/artToArtFilm/index`

- **Interaction:** Click navigation to other pages (no in-page tab switching)

## Video Player Interaction
- **Player Type:** Video.js (video-js class)
- **Controls:** Visible (play/pause, volume, timeline)
- **Autoplay:** Yes (all videos autoplay on page load)
- **Loop:** Yes (all videos loop at end)
- **Muted State:** Default browser policy (may require explicit muting for autoplay)

## Footer Expandable Sections
- **Collapse Item 1:** "服务" (Service) - "查找商店" (Find Store), "联系我们" (Contact Us)
  - Initially collapsed (height: 0)
  - Likely expands on click

- **Collapse Item 2:** "政策" (Policy) - "条款和条件", "隐私政策", "COOKIE政策"
  - Initially collapsed (height: 0)
  - Likely expands on click

## Responsive Layout
- **Desktop (1440px):** Full-width videos, single-column layout
- **Tablet (768px):** Expected to maintain single-column, possible text size adjustments
- **Mobile (390px):** Expected to maintain full-width videos, possible padding/margin reductions

## No Observed Behaviors
- No parallax or layer-based scrolling effects
- No fade-in animations on scroll
- No hover state changes on video cards
- No dark/light theme toggles
- No client-side filtering or sorting
