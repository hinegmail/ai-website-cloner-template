# Footer Component Specification

## Overview
- **Target file:** `src/components/sites/giada-com-0f7e9c3a/root-a1b2c3d4/Footer.tsx`
- **Screenshot:** `docs/design-references/giada-com-0f7e9c3a/root-a1b2c3d4/footer-full.png`
- **Interaction model:** Click-driven (collapsible sections)

## DOM Structure
```
<footer class="el-footer">
  <div class="footer-content">
    <!-- Section 1: Social Media -->
    <div class="section">
      <h3>社交媒体</h3>
      <!-- Social links -->
    </div>
    
    <!-- Section 2: Service (collapsible) -->
    <div class="collapse-item">
      <div class="collapse-header" role="button">
        <span>服务</span>
      </div>
      <div class="collapse-body">
        <a href="/contact/index">查找商店</a>
        <a href="/contact/index?id=1">联系我们</a>
      </div>
    </div>
    
    <!-- Section 3: Language Selector -->
    <div class="language-selector">
      <span>语言:</span>
      <span class="active">CN</span> | <span>EN</span>
    </div>
    
    <!-- Section 4: Policy (collapsible) -->
    <div class="collapse-item">
      <div class="collapse-header" role="button">
        <span>政策</span>
      </div>
      <div class="collapse-body">
        <a href="/policy/termsConditions/index">条款和条件</a>
        <a href="/policy/privacyPolicy/index">隐私政策</a>
        <a href="/policy/cookiePolicy/index">COOKIE政策</a>
      </div>
    </div>
    
    <!-- Section 5: Copyright -->
    <div class="copyright">
      <span>©2024 迦达高级时装有限公司</span>
      <a href="https://beian.miit.gov.cn/">粤ICP备19068183号</a>
    </div>
  </div>
</footer>
```

## Computed Styles

### Footer Container
- display: block
- width: 100%
- height: auto (expands with content)
- padding: 24px 16px
- background-color: rgb(0, 0, 0) (matches body)
- border-top: 1px solid rgba(255, 255, 255, 0.1) (estimated)

### Section Headers (h3, collapse-header)
- font-size: 12px
- font-weight: 400
- color: rgba(235, 235, 235, 0.64)
- margin-bottom: 12px
- cursor: pointer (on collapsible headers)

### Links (a)
- font-size: 12px
- color: rgba(235, 235, 235, 0.64)
- text-decoration: none
- margin-bottom: 8px
- display: block

### Language Selector
- font-size: 12px
- color: rgba(235, 235, 235, 0.64)
- span.active: rgb(255, 255, 255) (white)

### Copyright Text
- font-size: 10px
- color: rgba(235, 235, 235, 0.64)
- margin-top: 16px

## States & Behaviors

### Collapsible Service Section
- **Initial State:** height: 0 (collapsed)
- **Trigger:** Click on "服务" header
- **Expanded State:** height: auto (shows "查找商店", "联系我们" links)
- **Animation:** Smooth height transition (0.3s ease or similar)
- **Implementation approach:** CSS transitions or React state toggle

### Collapsible Policy Section
- **Initial State:** height: 0 (collapsed)
- **Trigger:** Click on "政策" header
- **Expanded State:** height: auto (shows 3 policy links)
- **Animation:** Smooth height transition

### Link Hover States
- **All links:** Color transitions from rgba(235, 235, 235, 0.64) to white on hover
- **Transition:** 0.2s or instant

## Content

### Social Media Section
- **Title:** 社交媒体
- **Links:** (External social media URLs - to be extracted)

### Service Section (Collapsible)
- **Title:** 服务
- **Links:**
  1. 查找商店 → /contact/index
  2. 联系我们 → /contact/index?id=1

### Language Selector
- **Label:** 语言:
- **Options:** CN (active) | EN

### Policy Section (Collapsible)
- **Title:** 政策
- **Links:**
  1. 条款和条件 → /policy/termsConditions/index
  2. 隐私政策 → /policy/privacyPolicy/index
  3. COOKIE政策 → /policy/cookiePolicy/index

### Copyright
- **Text:** ©2024 迦达高级时装有限公司
- **ICP Link:** 粤ICP备19068183号 → https://beian.miit.gov.cn/

## Responsive Behavior
- **Desktop (1440px):** Full-width layout, all sections visible
- **Tablet (768px):** Same layout, padding may adjust
- **Mobile (390px):** Likely stacked layout, collapsible sections useful for space saving
- **Breakpoint:** Unknown

## Implementation Notes
- Use React state or CSS for collapse/expand toggle
- Smooth transition animation recommended (0.3s ease)
- Language selector should be clickable (CN/EN toggle, though may link to different pages)
- All links are internal (relative paths) except ICP beian link
- Copyright year is hard-coded as 2024 (may need updating in 2025+)
- Consider accessibility: use ARIA attributes for collapsible sections
