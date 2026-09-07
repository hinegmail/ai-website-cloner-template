# Page Topology & Assembly Blueprint

## Overall Layout Structure
```
<body>
  <section class="el-container is-vertical">
    <header class="el-header sticky-header">
      Navigation (sticky at top)
    </header>
    
    <section class="el-container">
      <main class="el-main">
        <!-- 8 Season Cards (repeating) -->
        SeasonCard 1 (2026 Fall-Winter)
        SeasonCard 2 (2026 Spring-Summer)
        SeasonCard 3 (2025 Fall-Winter)
        SeasonCard 4 (2025 Spring-Summer)
        SeasonCard 5 (2024 Fall-Winter)
        SeasonCard 6 (2024 Spring-Summer)
        SeasonCard 7 (2023 Fall-Winter)
        SeasonCard 8 (2023 Spring-Summer)
      </main>
    </section>
    
    <footer class="el-footer">
      Collapsible service/policy sections + language selector
    </footer>
  </section>
</body>
```

## Z-Index Layering
- **Layer 0 (bottom):** Body background (black)
- **Layer 1:** Main content (season cards)
- **Layer 2 (top):** Sticky header (remains on top during scroll)
- **Layer 3:** Footer (below main content, scrolls out of view)

## Section Details

### 1. Header (Sticky)
- **Visual Order:** Top, remains fixed
- **Dependency:** None (independent)
- **Flow:** Fixed at top
- **Size:** 49px tall
- **Classes:** `el-header sticky-header`

### 2. Main Content (Repeating Season Cards)
- **Visual Order:** Below header, scrolls
- **Dependency:** None
- **Flow:** Vertical scroll (each card ~1,200px tall)
- **Cards:** 8 total
- **Classes:** `el-container`, `el-main`

#### Each Season Card Contains:
- Title (h2 or heading)
- Full-width video (Video.js player, ~1,170px tall)
- Description text below video
- All text in Chinese

### 3. Footer (Scrollable Section)
- **Visual Order:** Bottom of page
- **Dependency:** None
- **Flow:** Scrolls in/out
- **Size:** ~340px tall
- **Classes:** `el-footer`
- **Contents:**
  - Collapsible "Service" section
  - Collapsible "Policy" section
  - Language selector
  - Social media links
  - Copyright notice

## Interaction Model Summary
- **Header:** Static + Link navigation
- **Season Cards:** Static display with auto-playing videos (no user interaction required)
- **Footer:** Clickable collapse/expand sections

## Assembly Instructions
1. Create sticky header component
2. Create season card component (repeatable)
3. Create footer with collapsible sections
4. Wire all 8 season cards with real data
5. Ensure videos autoplay and loop
6. Set body background to black
7. Apply typography: Inter (body), Noto Sans SC (Chinese)
8. Apply color tokens: rgba(235, 235, 235, 0.64) for text on black
