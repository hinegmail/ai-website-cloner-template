# SeasonCard Component Specification

## Overview
- **Target file:** `src/components/sites/giada-com-0f7e9c3a/root-a1b2c3d4/SeasonCard.tsx`
- **Screenshot:** `docs/design-references/giada-com-0f7e9c3a/root-a1b2c3d4/season-card-sample.png`
- **Interaction model:** Static (auto-playing video, no user interaction required)

## DOM Structure
```
<article>
  <h2>Season Title (e.g., "2026秋冬米兰秀")</h2>
  <div class="video-container">
    <video autoplay loop muted>
      <source src="..." type="video/mp4" />
    </video>
  </div>
  <p class="description">Long-form description text</p>
</article>
```

## Computed Styles

### Container (article)
- display: block
- width: 100%
- padding: 0px
- margin-bottom: 0px (cards are stacked directly)
- background-color: transparent

### Title (h2)
- font-size: 14px
- font-weight: 300
- color: rgba(255, 255, 255, 0.6)
- font-family: Inter, sans-serif
- line-height: 1.4 (estimated from body)
- margin-bottom: 16px (spacing to video)
- text-align: left

### Video Container (div.video-container)
- display: block
- width: 100%
- aspect-ratio: 16 / 9 (estimated from video-js default)
- margin-bottom: 24px

### Video Element (video)
- width: 100%
- height: 100%
- object-fit: cover
- autoplay: true
- loop: true
- muted: true (required for autoplay in modern browsers)
- controls: true (Video.js shows controls)
- poster: none (no poster image)

### Description (p.description)
- font-size: 10px
- line-height: 1.6 (calculated from 19.2px / 12px base)
- color: rgb(255, 255, 255)
- font-family: "Noto Sans SC", sans-serif
- font-weight: 400
- letter-spacing: normal
- margin-bottom: 0px
- max-width: none (full width on desktop)
- text-align: left

## States & Behaviors

### Video Autoplay
- **Trigger:** Page load
- **State:** Video plays automatically, loops continuously
- **Implementation approach:** HTML5 `<video autoplay loop muted />` with `<source>` element
- **Note:** Muted attribute required for autoplay to work in modern browsers without user gesture

### Hover States
- **Title on hover:** No observed hover effect (color remains the same)
- **Description on hover:** No observed hover effect
- **Video on hover:** Video.js shows player controls (standard browser behavior)

## Content Structure

Each season card displays:
1. **Title:** Varies per season (e.g., "2026秋冬米兰秀")
2. **Video:** MP4 video URL from Tencent COS
3. **Description:** Long Chinese text (200-400 characters per description)

### Props Interface
```typescript
interface SeasonCardProps {
  title: string;           // e.g., "2026秋冬米兰秀"
  videoUrl: string;        // Full URL to MP4 video
  description: string;     // Long-form Chinese description
}
```

## Responsive Behavior
- **Desktop (1440px):** Full-width layout, title 14px, description 10px
- **Tablet (768px):** Full-width layout maintained, same sizing (no breakpoint observed)
- **Mobile (390px):** Full-width layout maintained, possible font size reduction to 12px/9px
- **Breakpoint:** No explicit breakpoint observed; likely responsive via viewport-relative units

## Text Content (Sample Season 1)

**Title:** 2026秋冬米兰秀

**Description:** 以兰花为灵感，创意总监 Gabriele Colangelo 为 GIADA 2026 秋冬系列写下克制而精准的美学叙事。兰花的色泽与质感流转衣间，建筑感廓形的强势与丝绸针织的轻盈构成张力。携手艺术家 Leigh Wells，植物意象化作枝蔓图腾，以立体刺绣于丝绸羊绒上轻柔浮现。于米兰布雷拉国家图书馆内，大秀再次致敬品牌精神，定格刚柔并济的隽永风骨。

**Video URL:** https://giada-cn-1302696420.cos.ap-guangzhou.myqcloud.com/cover-26FW.mp4

## Assets
- Video files (8 total): Downloaded from Tencent COS
- No images required (text-only headers, full-width videos)
- No icon components required

## Implementation Notes
- Use HTML5 `<video>` element for broad browser support
- Muted attribute is critical for autoplay to work without user interaction
- All 8 season cards are identical in structure, only content (title, videoUrl, description) changes
- Consider lazy-loading videos on mobile devices to reduce initial load
