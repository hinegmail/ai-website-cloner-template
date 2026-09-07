# GIADA Archive Clone - Output Plan

## Target URL
- **Source:** https://giada.com/archive/index
- **Destination Route:** `/archive` → `src/app/archive/page.tsx`

## Site Configuration
- **App Root:** `.` (repository root)
- **Site Key:** `giada-com-0f7e9c3a` (based on origin hash)
- **Page Key:** `root-a1b2c3d4` (based on pathname `/archive/index` → `root`)
- **Artifact Root:** `docs/research/giada-com-0f7e9c3a/root-a1b2c3d4/`
- **Screenshot Root:** `docs/design-references/giada-com-0f7e9c3a/root-a1b2c3d4/`
- **Component Root:** `src/components/sites/giada-com-0f7e9c3a/root-a1b2c3d4/`
- **Asset Root:** `public/sites/giada-com-0f7e9c3a/root-a1b2c3d4/`
- **Shared Site Components:** `src/components/sites/giada-com-0f7e9c3a/shared/`

## Page Topology

### Header (Sticky)
- Navigation with links to main sections
- Height: 49px
- Stays fixed at top when scrolling
- Background: transparent, text color: rgba(235, 235, 235, 0.64)

### Main Content (Scrollable)
A vertical list of **8 seasonal collections**, each with:
1. Season title (e.g., "2026秋冬米兰秀")
2. Full-width **auto-looping video** (Video.js player)
3. Long-form description text below

### Footer
Expandable sections for:
- Service links
- Social media
- Language selection
- Policy links

## Global Design Tokens

### Fonts
- **Primary (Body):** Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto (fallback: sans-serif)
- **Chinese Text:** "Noto Sans SC"
- **Alternative:** "Heiti SC"

### Colors
- **Background:** rgb(0, 0, 0) [black]
- **Primary Text:** rgba(235, 235, 235, 0.64) [light gray semi-transparent]
- **White Text:** rgb(255, 255, 255)
- **White Semi-transparent:** rgba(255, 255, 255, 0.6)
- **Dark Overlay:** rgba(0, 0, 0, 0.5)

### Layout
- **Body Display:** block
- **Body Font Size:** 12px
- **Body Line Height:** 19.2px (1.6x)
- **Framework:** Element UI (Vue.js)

## Sections to Build

### 1. **StickyHeader** (Static)
   - Navigation with logo link
   - Menu items: "最新系列" (Latest), "品牌档案" (Archives), "ART TO ART"
   - Sticky positioning at top

### 2. **SeasonCard** Component (Repeatable x8)
   - Title: Season name
   - Video player (Video.js or HTML5 `<video>`)
   - Description text below
   - **Interaction Model:** Static display, video auto-plays on page load

### 3. **Footer** (Static with Expandable Sections)
   - Collapsible sections for Service, Policy
   - Social media links
   - Language selector

## Assets to Download
- All 8 video files from Tencent COS:
  - `cover-26FW.mp4`
  - `2026SS-Cover.mp4`
  - `2025FW-H.mp4`
  - `25SS-h.mp4`
  - `FW24-cover.mp4`
  - `SS24-cover.mp4`
  - `FW23-cover.mp4`
  - `SS23-cover.mp4`

## Responsive Behavior
- Test at 1440px (desktop), 768px (tablet), 390px (mobile)
- Expected: Video players likely remain full-width at all sizes
- Text descriptions may shift layout on smaller screens

## Existing Routes to Preserve
- Current route: `src/app/page.tsx` (scaffold)
- **Decision:** Replace with this new archive clone at `/` (default route) OR create at `/archive` route

## Status
- [ ] Font and color tokens extracted
- [ ] Video URLs discovered
- [ ] Component specs written
- [ ] Assets downloaded
- [ ] Components built
- [ ] Page assembly
- [ ] Visual QA pass
