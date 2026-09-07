# `/clone-website` 技能使用指南

> **版本：** 0.4.0
> **更新日期：** 2026-08-11
> **适用平台：** 13 个 AI 编程代理平台

---

## 目录

1. [概述](#1-概述)
2. [前置条件](#2-前置条件)
3. [各平台调用方式](#3-各平台调用方式)
4. [五阶段流水线详解](#4-五阶段流水线详解)
5. [输出产物说明](#5-输出产物说明)
6. [使用示例](#6-使用示例)
7. [自定义与高级用法](#7-自定义与高级用法)
8. [常见问题与排障](#8-常见问题与排障)
9. [最佳实践](#9-最佳实践)
10. [反模式：切勿这样做](#10-反模式切勿这样做)

---

## 1. 概述

### 1.1 什么是 `/clone-website`

`/clone-website` 是一个 AI 技能（Skill），让 AI 编程代理将**任意网站**逆向工程并重建为**像素级精确**的 Next.js 应用。它不是简单的截图复刻，而是：

- 提取目标网站的**精确 CSS 值**（通过 `getComputedStyle()`）
- 还原**交互行为**（滚动、点击、悬停、响应式）
- 下载**真实素材**（图片、视频、字体、SVG 图标）
- 生成**可审计的规格文件**（spec.md），每个组件一份
- 并行分派**构建代理**，各自在独立 git worktree 中工作
- 最终进行**视觉 QA 对比**，确保与原站一致

### 1.2 核心设计理念

| 理念           | 含义                                                 |
| -------------- | ---------------------------------------------------- |
| 像素级精确     | 不估算、不近似 — 每个值都来自`getComputedStyle()` |
| 规格驱动       | 每个组件在构建前都有`spec.md` 作为契约文件         |
| 真实内容       | 使用目标站点的真实文本和素材，非占位符               |
| 小任务完美结果 | 复杂区域拆分为子组件，每个代理只做一件事             |
| 构建必须通过   | 每步都验证`tsc --noEmit` 和 `npm run build`      |

### 1.3 范围定义

| ✅ 在范围内    | ❌ 不在范围内         |
| -------------- | --------------------- |
| 视觉布局与样式 | 真实后端 / 数据库     |
| 组件结构与交互 | 认证系统              |
| 响应式设计     | 实时功能（WebSocket） |
| Mock 演示数据  | SEO 优化              |
| 动画与过渡效果 | 无障碍审计            |

---

## 2. 前置条件

### 2.1 环境要求

| 要求    | 版本             | 验证命令          |
| ------- | ---------------- | ----------------- |
| Node.js | ≥ 24            | `node -v`       |
| npm     | 随 Node.js 附带  | `npm -v`        |
| Git     | 任意 recent 版本 | `git --version` |

### 2.2 AI 编程代理

需要以下 13 个平台之一（推荐 Claude Code + Opus 5）：

| 平台                  | 推荐度     | 说明                              |
| --------------------- | ---------- | --------------------------------- |
| **Claude Code** | ⭐⭐⭐⭐⭐ | 最佳效果，需配合`--chrome` 启动 |
| Codex CLI             | ⭐⭐⭐⭐   | OpenAI 官方 CLI                   |
| Cursor                | ⭐⭐⭐⭐   | IDE 集成                          |
| Windsurf              | ⭐⭐⭐⭐   | IDE 集成                          |
| Gemini CLI            | ⭐⭐⭐⭐   | Google 官方 CLI                   |
| GitHub Copilot        | ⭐⭐⭐⭐   | GitHub 官方                       |
| Kiro                  | ⭐⭐⭐     | 新兴平台                          |
| Cline                 | ⭐⭐⭐     | VS Code 扩展                      |
| Roo Code              | ⭐⭐⭐     | VS Code 扩展                      |
| OpenCode              | ⭐⭐⭐     | 开源 CLI                          |
| Continue              | ⭐⭐⭐     | VS Code 扩展                      |
| Amazon Q              | ⭐⭐⭐     | AWS 官方                          |
| Augment Code          | ⭐⭐⭐     | 新兴平台                          |

### 2.3 浏览器自动化（必需）

`/clone-website` **依赖浏览器 MCP 工具**才能工作。以下任选其一：

| 浏览器 MCP           | 安装方式                                | 推荐度     |
| -------------------- | --------------------------------------- | ---------- |
| **Chrome MCP** | Claude Code 内置（`claude --chrome`） | ⭐⭐⭐⭐⭐ |
| Playwright MCP       | `npx @anthropic/mcp-playwright`       | ⭐⭐⭐⭐   |
| Browserbase MCP      | 云端浏览器服务                          | ⭐⭐⭐     |
| Puppeteer MCP        | 社区实现                                | ⭐⭐⭐     |

> ⚠️ **如果没有检测到浏览器 MCP 工具，技能会暂停并询问用户如何连接。**

### 2.4 基础项目验证

运行技能前，确保基础项目可以构建：

```bash
npm run build
```

如果构建失败，先修复基础项目再运行克隆。

---

## 3. 各平台调用方式

### 3.1 Claude Code（推荐）

```bash
# 1. 安装依赖
npm install

# 2. 启动 Claude Code（带 Chrome 浏览器自动化）
claude --chrome

# 3. 在 Claude Code 中运行技能
/clone-website https://example.com
```

**多 URL 克隆：**

```
/clone-website https://example.com https://example.com/about https://example.com/pricing
```

**自然语言触发：**

```
Clone https://example.com using the clone-website workflow
```

### 3.2 Codex CLI

```bash
# 启动 Codex CLI
codex

# 调用技能
/clone-website https://example.com
```

> Codex 原生读取 `.codex/skills/clone-website/SKILL.md`，支持 `$ARGUMENTS` 参数替换。

### 3.3 Cursor

在 Cursor 中打开命令面板，输入：

```
clone-website https://example.com
```

> Cursor 使用 `.cursor/commands/clone-website.md`，不支持 `$ARGUMENTS` 参数替换，URL 以自然语言方式提供。

### 3.4 Windsurf

在 Windsurf 中调用工作流：

```
clone-website https://example.com
```

> 使用 `.windsurf/workflows/clone-website.md`。

### 3.5 Gemini CLI

```bash
# 启动 Gemini CLI
gemini

# 调用命令
/clone-website https://example.com
```

> 使用 `.gemini/commands/clone-website.toml`（TOML 格式），参数使用 `{{args}}` 语法。

### 3.6 GitHub Copilot

在 Copilot Chat 中输入：

```
/clone-website https://example.com
```

> 使用 `.github/skills/clone-website/SKILL.md`。

### 3.7 Kiro

```
/clone-website https://example.com
```

> 使用 `.kiro/skills/clone-website/SKILL.md`。

### 3.8 Cline

在 Cline 扩展中调用：

```
Clone https://example.com using the clone-website skill
```

> 使用 `.cline/skills/clone-website/SKILL.md`（Agent Skills 格式）。

### 3.9 Roo Code

在 Roo Code 中使用斜杠命令：

```
/clone-website https://example.com
```

> 使用 `.roo/commands/clone-website.md` 作为入口，加载 `.roo/skills/clone-website/SKILL.md`。

### 3.10 OpenCode

```
/clone-website https://example.com
```

> 使用 `.opencode/commands/clone-website.md`。

### 3.11 Continue

在 Continue 扩展中调用：

```
/clone-website https://example.com
```

> 使用 `.continue/commands/clone-website.md`（`invokable: true`）。

### 3.12 Amazon Q

```bash
# 使用 Amazon Q CLI
q

# 调用代理
clone-website https://example.com
```

> 使用 `.amazonq/cli-agents/clone-website.json`（JSON 格式定义）。

### 3.13 Augment Code

```
/clone-website https://example.com
```

> 使用 `.augment/commands/clone-website.md`。

### 3.14 平台调用速查表

| 平台           | 调用语法                 | 参数支持       | 文件位置                                   |
| -------------- | ------------------------ | -------------- | ------------------------------------------ |
| Claude Code    | `/clone-website <url>` | `$ARGUMENTS` | `.claude/skills/clone-website/SKILL.md`  |
| Codex CLI      | `/clone-website <url>` | `$ARGUMENTS` | `.codex/skills/clone-website/SKILL.md`   |
| Cursor         | `clone-website <url>`  | 自然语言       | `.cursor/commands/clone-website.md`      |
| Windsurf       | `clone-website <url>`  | 自然语言       | `.windsurf/workflows/clone-website.md`   |
| Gemini CLI     | `/clone-website <url>` | `{{args}}`   | `.gemini/commands/clone-website.toml`    |
| GitHub Copilot | `/clone-website <url>` | `$ARGUMENTS` | `.github/skills/clone-website/SKILL.md`  |
| Kiro           | `/clone-website <url>` | `$ARGUMENTS` | `.kiro/skills/clone-website/SKILL.md`    |
| Cline          | `Clone <url> using...` | 自然语言       | `.cline/skills/clone-website/SKILL.md`   |
| Roo Code       | `/clone-website <url>` | `$ARGUMENTS` | `.roo/skills/clone-website/SKILL.md`     |
| OpenCode       | `/clone-website <url>` | `$ARGUMENTS` | `.opencode/commands/clone-website.md`    |
| Continue       | `/clone-website <url>` | `$ARGUMENTS` | `.continue/commands/clone-website.md`    |
| Amazon Q       | `clone-website <url>`  | 自然语言       | `.amazonq/cli-agents/clone-website.json` |
| Augment Code   | `/clone-website <url>` | `$ARGUMENTS` | `.augment/commands/clone-website.md`     |

---

## 4. 五阶段流水线详解

```
┌─────────────────────────────────────────────────────────────┐
│  Phase 1          Phase 2          Phase 3          Phase 4    Phase 5   │
│  侦察      →  基础搭建  →  组件规格  →  组装  →  视觉 QA  │
│  (Recon)         (Foundation)      (Spec+Dispatch)  (Assembly)  (QA)     │
└─────────────────────────────────────────────────────────────┘
        顺序执行        顺序执行        并行执行        顺序执行     顺序执行
```

### 4.1 Phase 1：侦察（Reconnaissance）

**目标：** 全面了解目标网站的外观和行为。

**执行步骤：**

1. **截图**

   - 桌面全页截图（1440px 宽）
   - 移动端全页截图（390px 宽）
   - 保存到 `docs/design-references/<site-key>/<page-key>/`
2. **全局提取**

   - 字体：检查 `<link>` 标签和 `font-family` 计算值
   - 颜色：从 `getComputedStyle()` 提取色彩调色板
   - Favicon 和元数据
   - 全局 UI 模式（自定义滚动条、scroll-snap、关键帧动画等）
3. **强制交互扫描** — 这是发现所有行为的关键步骤：

   - 🔍 **滚动扫描：** 缓慢从上到下滚动，观察哪些元素随滚动变化
   - 👆 **点击扫描：** 点击每个看起来可交互的元素（按钮、标签、卡片）
   - 🖱️ **悬停扫描：** 悬停每个可能有 hover 效果的元素
   - 📱 **响应式扫描：** 在 1440px / 768px / 390px 三个宽度测试
4. **页面拓扑图**

   - 从上到下映射每个区域，赋予工作名
   - 记录区域间的依赖关系
   - 标注每个区域的交互模型（静态 / 点击驱动 / 滚动驱动 / 时间驱动）

**产出文件：**

- `docs/research/<site-key>/<page-key>/BEHAVIORS.md` — 行为清单
- `docs/research/<site-key>/<page-key>/PAGE_TOPOLOGY.md` — 页面拓扑

### 4.2 Phase 2：基础搭建（Foundation Build）

**目标：** 建立全局基础设施，所有后续组件依赖于此。

**此阶段顺序执行，不可并行**（因为涉及共享文件修改）。

**执行步骤：**

1. **合并字体** → `src/app/layout.tsx`
2. **合并全局 CSS** → `src/app/globals.css`（设计 token、关键帧）
3. **创建 TypeScript 接口** → `src/types/`
4. **提取 SVG 图标** → `src/components/sites/<site-key>/shared/icons.tsx`
5. **下载素材** → `public/sites/<site-key>/<page-key>/`
   - 使用命名空间脚本 `scripts/download-assets-<site-key>-<page-key>.mjs`
   - 并行下载（4 个同时），含错误处理
6. **验证构建** → `npm run build`

### 4.3 Phase 3：组件规格与分派（Component Spec & Dispatch）

**目标：** 逐区域提取精确规格，分派构建代理并行构建。

**这是核心循环**，对每个区域执行三步：

#### Step 1：提取

使用浏览器 MCP 运行 CSS 提取脚本（见 SKILL.md 中的完整脚本），获取：

- 每个元素的精确计算样式（40+ CSS 属性）
- DOM 结构（最多 4 层深度）
- 真实文本内容
- 图片信息（含分层/叠加图片）
- 多状态样式差分（滚动前后、悬停前后、各标签页）

#### Step 2：写规格文件

每个组件生成一份 `spec.md`：

```
docs/research/<site-key>/<page-key>/components/<component-name>.spec.md
```

规格文件包含：

- 目标文件路径
- 交互模型
- DOM 结构
- 精确计算样式（每个元素的每个属性）
- 状态与行为（触发条件、前后状态、过渡动画）
- 各状态内容
- 素材引用
- 逐字文本内容
- 响应式行为

#### Step 3：分派构建代理

根据复杂度决定分派策略：

- **简单区域**（1-2 个子组件）→ 1 个代理
- **复杂区域**（3+ 个子组件）→ 每个子组件 1 个代理 + 1 个包装器代理

构建代理在**独立 git worktree** 中工作，收到：

- 完整 spec.md 内容（内联在提示中）
- 截图路径
- 共享组件导入信息
- 目标文件路径
- 构建验证指令

> ⚡ **不等待** — 分派后立即继续提取下一个区域，构建与提取并行。

#### Step 4：合并

代理完成后合并 worktree 分支，验证构建。

### 4.4 Phase 4：页面组装（Assembly）

**目标：** 将所有区域组件连接为完整页面。

- 导入所有区域组件到目标路由文件
- 实现页面级布局（滚动容器、列结构、sticky 定位、z-index 层叠）
- 连接真实内容到组件 props
- 实现页面级行为（scroll-snap、滚动动画、IntersectionObserver、平滑滚动等）
- 验证 `npm run build`

### 4.5 Phase 5：视觉 QA 差异对比（Visual QA）

**目标：** 确保克隆与原站一致。

1. 并排截图对比原站与克隆
2. 逐区域检查（桌面 1440px + 移动 390px）
3. 对每个差异：
   - 检查 spec.md — 提取是否正确？
   - 规格错误 → 重新提取，更新规格，修复组件
   - 构建错误 → 修复组件以匹配规格
4. 测试所有交互行为
5. 验证动画、过渡、平滑滚动

> ✅ **只有通过视觉 QA 后，克隆才算完成。**

---

## 5. 输出产物说明

### 5.1 目录结构

运行 `/clone-website https://example.com` 后，项目新增以下内容：

```
项目根目录/
├── src/
│   ├── app/
│   │   └── page.tsx                          # 克隆页面路由（首次克隆替换脚手架）
│   ├── components/
│   │   └── sites/
│   │       └── <site-key>/
│   │           ├── shared/
│   │           │   └── icons.tsx             # 站点共享 SVG 图标
│   │           └── <page-key>/
│   │               ├── Header.tsx             # 各区域组件
│   │               ├── HeroSection.tsx
│   │               ├── FeaturesSection.tsx
│   │               ├── Footer.tsx
│   │               └── ...
│   └── types/
│       └── <site-key>.ts                     # 内容结构接口
├── public/
│   └── sites/
│       └── <site-key>/
│           ├── shared/
│           │   └── favicon.ico
│           └── <page-key>/
│               └── images/                   # 下载的图片素材
│                   ├── hero-bg.webp
│                   ├── card-1.png
│                   └── ...
├── docs/
│   ├── research/
│   │   └── <site-key>/
│   │       └── <page-key>/
│   │           ├── BEHAVIORS.md              # 行为清单
│   │           ├── PAGE_TOPOLOGY.md          # 页面拓扑
│   │           └── components/
│   │               ├── Header.spec.md         # 组件规格文件
│   │               ├── HeroSection.spec.md
│   │               └── ...
│   └── design-references/
│       └── <site-key>/
│           └── <page-key>/
│               ├── desktop-full.png          # 桌面全页截图
│               ├── mobile-full.png           # 移动端全页截图
│               └── ...                        # 各区域截图
└── scripts/
    └── download-assets-<site-key>-<page-key>.mjs  # 素材下载脚本
```

### 5.2 命名空间键

- **`<site-key>`：** 站点来源 slug + SHA-256 前 8 位（如 `example-com-a1b2c3d4`）
- **`<page-key>`：** 路径 slug + SHA-256 前 8 位（如 `root-e5f6g7h8` 表示 `/`）

> 这些键是**碰撞抵抗**的，确保不同站点/页面的产物不会冲突。

### 5.3 规格文件（spec.md）结构

```markdown
# HeroSection Specification

## Overview
- Target file: src/components/sites/<site-key>/<page-key>/HeroSection.tsx
- Screenshot: docs/design-references/.../hero.png
- Interaction model: static

## DOM Structure
section > div.container > h1 + p + div.cta-group > a.btn-primary + a.btn-secondary

## Computed Styles (exact values from getComputedStyle)
### Container
- display: flex
- padding: 80px 24px
- maxWidth: 1200px
...

## States & Behaviors
### Hover states
- CTA button: backgroundColor: #0070f3 → #005bb5, transition: all 0.2s ease

## Assets
- Background image: public/sites/.../images/hero-bg.webp
- Icons: ArrowRightIcon from shared/icons.tsx

## Text Content (verbatim)
"Build faster. Ship smarter."
"The AI-powered platform for modern developers."

## Responsive Behavior
- Desktop (1440px): centered, max-width 1200px
- Mobile (390px): full-width, padding 48px 16px
- Breakpoint: ~768px
```

### 5.4 完成报告

技能完成后输出：

- 源 URL → 目标路由映射
- 保留的现有路由
- 构建的区域数 / 组件数 / 规格文件数
- 下载的素材数
- 构建状态
- 视觉 QA 结果
- 已知差距

---

## 6. 使用示例

### 6.1 基础用法：克隆单页面

```bash
# Claude Code
claude --chrome
/clone-website https://linear.app
```

结果：`linear.app` 首页被克隆到 `src/app/page.tsx`。

### 6.2 多页面克隆

```bash
/clone-website https://stripe.com https://stripe.com/pricing https://stripe.com/docs
```

结果：

- `https://stripe.com` → `src/app/page.tsx`（`/` 路由）
- `https://stripe.com/pricing` → `src/app/pricing/page.tsx`（`/pricing` 路由）
- `https://stripe.com/docs` → `src/app/docs/page.tsx`（`/docs` 路由）

每个页面的研究产物、截图、组件、素材**完全隔离**。

### 6.3 多站点克隆

```bash
/clone-website https://vercel.com https://netlify.com
```

> 不同来源的站点可能需要不兼容的字体和全局样式。技能会询问是否创建独立应用根目录（推荐）或使用路由作用域样式的组合多站点应用。

### 6.4 克隆后自定义

```bash
# 1. 先完成纯克隆
/clone-website https://example.com

# 2. 然后在克隆基础上自定义修改
# 例如修改颜色、添加功能、调整文案等
```

> 技能默认**纯仿真**，不做任何个人审美修改。先 1:1 匹配，后自定义。

### 6.5 在已有项目中添加克隆

如果项目已有页面（非空白模板）：

```bash
/clone-website https://example.com/about
```

技能会：

- 检查所有现有 `src/app/**/page.tsx`
- 将 `/about` 路径映射为 `src/app/about/page.tsx`
- **不会删除或替换**已有路由（除非用户明确批准）

### 6.6 Docker 环境下使用

```bash
# 开发模式
docker compose up dev --build
# 然后在 http://localhost:3001 查看克隆结果

# 生产模式
docker compose up app --build
# 然后在 http://localhost:3000 查看克隆结果
```

---

## 7. 自定义与高级用法

### 7.1 指定保真度级别

默认是像素级精确。可以降级：

```
/clone-website https://example.com
请使用"近似"保真度，不需要精确匹配动画
```

### 7.2 排除特定区域

```
/clone-website https://example.com
跳过页脚区域，不需要克隆 Cookie 同意弹窗
```

### 7.3 添加额外上下文

```
/clone-website https://example.com
这个网站使用 Lenis 平滑滚动库，注意保留滚动体验
```

### 7.4 修改技能行为

技能源文件位于：

```
.claude/skills/clone-website/SKILL.md
```

修改后运行同步脚本重新生成所有平台副本：

```bash
node scripts/sync-skills.mjs
```

### 7.5 修改项目指令

项目指令源文件：

```
AGENTS.md
```

修改后运行：

```bash
bash scripts/sync-agent-rules.sh
```

---

## 8. 常见问题与排障

### Q1: 技能无法启动，提示缺少浏览器 MCP

**原因：** `/clone-website` 依赖浏览器自动化工具来提取目标网站。

**解决：**

- Claude Code：使用 `claude --chrome` 启动（内置 Chrome MCP）
- 其他代理：安装 Playwright MCP 或 Browserbase MCP

### Q2: 克隆结果与原站有视觉差异

**排查步骤：**

1. 检查 `docs/research/<site-key>/<page-key>/components/` 下的 spec.md — 提取值是否正确？
2. 如果 spec 值错误 → 原始提取有误，需重新运行
3. 如果 spec 值正确但组件不对 → 构建代理实现有误，修复组件
4. 检查是否遗漏了叠加/分层图片
5. 检查交互模型是否正确（滚动驱动 vs 点击驱动）

### Q3: 构建失败（`npm run build` 报错）

**排查：**

```bash
# 单独运行类型检查
npm run typecheck

# 单独运行 lint
npm run lint

# 完整检查
npm run check
```

技能要求每个构建代理在完成前验证 `npx tsc --noEmit`，合并后验证 `npm run build`。如果构建失败，说明某个代理未遵守此规则。

### Q4: 标签页/选项卡切换不工作

**最可能原因：** 交互模型识别错误 — 将滚动驱动构建为了点击驱动（或反之）。

**这是代价最高的错误**，需要完全重写而非 CSS 修复。

**预防：** Phase 1 的交互扫描中，**先滚动再点击**，确定交互模型后再构建。

### Q5: 移动端布局破裂

**原因：** 可能只在桌面宽度做了提取。

**解决：** 确保 Phase 1 在 1440px、768px、390px 三个宽度都做了提取。spec.md 中的 Responsive Behavior 部分应记录所有断点。

### Q6: 字体不匹配

**排查：**

1. 检查 `src/app/layout.tsx` 是否正确配置了 `next/font`
2. 检查 spec.md 中的 `font-family` 值
3. 某些站点使用自托管字体，需下载字体文件并使用 `next/font/local`

### Q7: 多 URL 克隆时路由冲突

**解决：** 技能在 Pre-Flight 阶段会检查所有现有路由。如果目标路由已存在，会暂停并询问是更新、换路由还是跳过。

### Q8: 滚动体验与原站不同

**原因：** 原站可能使用了平滑滚动库（如 Lenis、Locomotive Scroll）。

**解决：** 检查原站是否有 `.lenis` 类或自定义滚动容器。如有，需在克隆中安装并配置相应库。

---

## 9. 最佳实践

### 9.1 选择合适的目标网站

| ✅ 适合克隆  | ❌ 不适合                        |
| ------------ | -------------------------------- |
| 静态展示网站 | 需要登录的页面（内容因用户而异） |
| 营销/着陆页  | 实时数据仪表盘                   |
| 文档网站     | 依赖后端 API 的交互应用          |
| 产品介绍页   | 有用户生成内容的平台             |

### 9.2 获得最佳效果的建议

1. **使用 Claude Code + Opus 5** — 效果最优
2. **以 `--chrome` 启动** — 内置浏览器自动化
3. **先克隆再自定义** — 不要在克隆过程中混入个人修改
4. **检查目标站点的 ToS** — 确保允许抓取和复制
5. **使用真实 URL** — 不要用截图或存档页面作为目标
6. **保持网络稳定** — 素材下载需要网络连接

### 9.3 管理克隆产物

```bash
# 克隆完成后验证构建
npm run check

# 启动开发服务器查看结果
npm run dev

# 使用 Docker 查看生产构建效果
docker compose up app --build
```

### 9.4 多人协作

如果团队多人同时克隆不同站点：

- 每人在独立分支/worktree 中工作
- 最后合并，利用命名空间隔离确保不冲突
- 合并后运行 `npm run build` 验证

---

## 10. 反模式：切勿这样做

这些是过往失败克隆的教训，每条都导致数小时返工：

| 编号 | 反模式                              | 后果                      | 正确做法                          |
| ---- | ----------------------------------- | ------------------------- | --------------------------------- |
| 1    | 将滚动驱动 UI 构建为点击驱动        | 需完全重写                | 先滚动测试，确定交互模型再构建    |
| 2    | 只提取默认状态                      | 标签页/状态切换后内容缺失 | 点击每个标签，提取所有状态内容    |
| 3    | 遗漏叠加/分层图片                   | 区域看起来空白            | 检查每个容器的完整 DOM 树         |
| 4    | 为视频内容构建 HTML 模拟            | 浪费时间且效果差          | 先检查`<video>`、Lottie、canvas |
| 5    | 估算 CSS 类名（"看起来像 text-lg"） | 像素不精确                | 使用`getComputedStyle()` 精确值 |
| 6    | 单次巨型提交                        | 无法回滚特定组件          | 增量提交，每步验证构建            |
| 7    | 新克隆覆盖已有页面                  | 丢失之前的工作            | 保留现有路由，命名空间隔离        |
| 8    | 让构建代理自行查阅文档              | 代理可能找不到或理解偏差  | 规格内联在提示中                  |
| 9    | 跳过素材提取                        | 克隆看起来虚假            | 下载所有图片、视频、字体          |
| 10   | 给单个代理过多范围                  | 细节被忽略                | 拆分为小任务，每个代理只做一件事  |
| 11   | 只在桌面宽度提取                    | 移动端破裂                | 1440px + 768px + 390px 三宽度提取 |
| 12   | 忽略平滑滚动库                      | 滚动体验明显不同          | 检查 Lenis / Locomotive Scroll    |
| 13   | 无规格文件直接分派构建代理          | 代理靠猜测填补空白        | 先写 spec.md，再分派              |

---

## 附录：技术架构概览

```
用户输入 URL
    │
    ▼
┌─ Pre-Flight ─────────────────────────────────┐
│  检测浏览器 MCP → 验证 URL → 验证构建 →      │
│  盘点现有路由 → 输出计划                      │
└──────────────────────────────────────────────┘
    │
    ▼
┌─ Phase 1: 侦察 ─────────────────────────────┐
│  截图(1440+390) → 全局提取(字体/颜色/Meta) →  │
│  交互扫描(滚动/点击/悬停/响应式) →            │
│  BEHAVIORS.md + PAGE_TOPOLOGY.md             │
└──────────────────────────────────────────────┘
    │
    ▼
┌─ Phase 2: 基础搭建 [顺序] ──────────────────┐
│  合并字体 → 合并 CSS → TS 接口 →              │
│  SVG 图标 → 下载素材 → 验证构建              │
└──────────────────────────────────────────────┘
    │
    ▼
┌─ Phase 3: 组件规格与分派 [并行] ────────────┐
│  ┌─ 区域 1 ──────────────────────────────┐  │
│  │  提取 CSS → 写 spec.md → 分派代理     │  │
│  └───────────────────────────────────────┘  │
│  ┌─ 区域 2 ──────────────────────────────┐  │
│  │  提取 CSS → 写 spec.md → 分派代理     │  │
│  └───────────────────────────────────────┘  │
│  ... (并行)                                 │
│  合并 worktree → 验证构建                    │
└──────────────────────────────────────────────┘
    │
    ▼
┌─ Phase 4: 页面组装 ─────────────────────────┐
│  导入组件 → 页面布局 → 连接内容 →            │
│  页面级行为 → 验证构建                       │
└──────────────────────────────────────────────┘
    │
    ▼
┌─ Phase 5: 视觉 QA ──────────────────────────┐
│  并排对比 → 逐区域检查 → 修复差异 →          │
│  交互测试 → ✅ 完成                          │
└──────────────────────────────────────────────┘
```

---

*本文档由 CatPaw AI 编程助手基于 `.claude/skills/clone-website/SKILL.md` 及各平台命令文件自动生成。*
