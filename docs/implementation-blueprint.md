# Implementation Blueprint: Curiosity Cloud Migration

**Document Version:** 1.0.0  
**Author:** Lead Software Architect & UI Reverse-Engineering Engineer  
**Source of Truth:** [`original/curiosity-cloud.jsx`](file:///Users/u-elementtechnologiesprivatelimited/Uelement/uelement/curiosity-cloud/original/curiosity-cloud.jsx)  
**Target Platform:** Next.js (App Router), TypeScript, Tailwind CSS, React 19

---

## Executive Summary & Migration Directive

This blueprint is the authoritative technical specification for migrating the single-file React SPA `original/curiosity-cloud.jsx` into the existing Next.js App Router project.

### Core Directives
1. **Zero Redesign Policy:** Do not alter layout, typography, line heights, letter spacings, colors, visual weights, copy, datasets, or animations.
2. **Pixel Fidelity > Framework Conventions:** The CSS in `curiosity-cloud.jsx` is the exact visual measurement specification. Custom CSS classes and rules must be preserved with 100% precision.
3. **App Router Architecture:** Convert hash-based routing (`#/platform`, `#/blog/interconnection-queue`) to clean, idiomatic Next.js routes (`/platform`, `/blog/interconnection-queue`) using Server Components by default, isolating `"use client"` strictly to interactive islands (Canvas, mobile menu, contact form, smooth anchor navigation).
4. **Procedural Canvas Integrity:** The `Terrain` canvas component is a mathematical procedural dithering engine; it must remain procedurally rendered on HTML5 `<canvas>` and never replaced with rasterized images.
5. **No Source Code Changes in This Phase:** This document is the standalone deliverable for planning before execution.

---

## 1. Route Architecture & URL Mapping

### 1.1 Hash Route to Next.js App Router Mapping

The legacy application parsed `window.location.hash` using:
```js
const parse = () => {
  const raw = (window.location.hash || "#/").replace(/^#\/?/, "");
  return raw.split("/").filter(Boolean);
};
```

Below is the exhaustive mapping table to the target Next.js App Router structure:

| Legacy Hash Route | Route Type | Target Next.js File Path | Rendering Mode | Notes & Dynamic Segments |
| :--- | :--- | :--- | :--- | :--- |
| `#/` | Page | `app/page.tsx` | Server Component | Home page (Hero, Logos, The Problem, The Thesis, Platform Preview, Getting Started, Why India). |
| `#/platform` | Page | `app/platform/page.tsx` | Server Component | Platform overview (Products cards, 6 Architecture planes, Commitments). |
| `#/platform/cloud` | Dynamic Page | `app/platform/[slug]/page.tsx` | Server Component (`generateStaticParams`) | GPU Cloud product detail page (`slug="cloud"`). |
| `#/platform/inference` | Dynamic Page | `app/platform/[slug]/page.tsx` | Server Component (`generateStaticParams`) | Managed Inference product detail page (`slug="inference"`). |
| `#/platform/ai-factories`| Dynamic Page | `app/platform/[slug]/page.tsx` | Server Component (`generateStaticParams`) | AI Factories product detail page (`slug="ai-factories"`). |
| `#/platform/energy` | Dynamic Page | `app/platform/[slug]/page.tsx` | Server Component (`generateStaticParams`) | Energy product detail page (`slug="energy"`). |
| `#/platform/[invalid]` | Error/404 | `app/platform/[slug]/page.tsx` | Server Component | Calls Next.js `notFound()` to render `not-found.tsx`. |
| `#/solutions` | Page | `app/solutions/page.tsx` | Server Component | Solutions page containing 4 target sections. |
| `#/solutions/training` | Section Anchor | `/solutions#training` | Client Anchor Scroll | Targets `<section id="training">` on `/solutions`. |
| `#/solutions/inference`| Section Anchor | `/solutions#inference`| Client Anchor Scroll | Targets `<section id="inference">` on `/solutions`. |
| `#/solutions/sovereign`| Section Anchor | `/solutions#sovereign`| Client Anchor Scroll | Targets `<section id="sovereign">` on `/solutions`. |
| `#/solutions/wholesale`| Section Anchor | `/solutions#wholesale`| Client Anchor Scroll | Targets `<section id="wholesale">` on `/solutions`. |
| `#/company` | Page | `app/company/page.tsx` | Server Component | Company page (Why we exist, How we work, Founders, Careers). |
| `#/company/founders` | Section Anchor | `/company#founders` | Client Anchor Scroll | Targets `<section id="founders">` on `/company`. |
| `#/company/careers` | Section Anchor | `/company#careers` | Client Anchor Scroll | Targets `<section id="careers">` on `/company`. |
| `#/blog` | Page | `app/blog/page.tsx` | Server Component | Blog index listing all 6 articles. |
| `#/blog/[slug]` | Dynamic Page | `app/blog/[slug]/page.tsx` | Server Component (`generateStaticParams`) | Dynamic blog article. Renders full editorial for `interconnection-queue`, placeholder for others. |
| `#/blog/[invalid]` | Error/404 | `app/blog/[slug]/page.tsx` | Server Component | Calls Next.js `notFound()` to render `not-found.tsx`. |
| `#/docs` | Page | `app/docs/page.tsx` | Client/Server Hybrid | Documentation page with interactive sidebar anchor navigation. |
| `#/docs/[section]` | Section Anchor | `/docs#[section]` | Client Anchor Scroll | Targets `<h2 id="[section]">` in docs body (`quickstart`, `concepts`, `clusters`, `storage`, `inference`, `energy`, `regions`, `api`, `changelog`). |
| `#/contact` | Page | `app/contact/page.tsx` | Client Component Island | Contact page. **Crucial:** `CTA` band must NOT render on `/contact`. |
| `*` (any unmatched) | Error/404 | `app/not-found.tsx` | Server Component | HTTP 404 page ("This route has no power."). |

### 1.2 Section Anchors vs Pages vs Navigation State

In the legacy JSX file, routing handled both top-level pages and section anchors within `useEffect`:
```javascript
const anchor = route[1];
const needsAnchor = ["solutions", "company", "docs"].indexOf(route[0]) > -1 && anchor;
if (needsAnchor) {
  const el = document.getElementById(anchor);
  if (el) { el.scrollIntoView({ behavior: "smooth", block: "start" }); return; }
}
window.scrollTo({ top: 0, behavior: "auto" });
```

**Next.js Implementation Strategy:**
1. **URL Standardisation:** All cross-page anchor links (e.g., Footer links) become standard Next.js URLs with hash fragments:
   - `#/solutions/training` $\rightarrow$ `/solutions#training`
   - `#/company/founders` $\rightarrow$ `/company#founders`
   - `#/company/careers` $\rightarrow$ `/company#careers`
   - `#/docs/api` $\rightarrow$ `/docs#api`
   - `#/docs/changelog` $\rightarrow$ `/docs#changelog`
2. **Native Smooth Scrolling Support:** Ensure `html { scroll-behavior: smooth; }` is preserved in `globals.css`.
3. **Docs Interactive Navigation:** For in-page clicks within `/docs`, create a lightweight client navigation handler that uses `history.replaceState` or standard hash links to avoid full-page reload while smoothly scrolling to the targeted heading ID.

---

## 2. Component Inventory & Architecture

### 2.1 Atomic & Structural Components Breakdown

| Component Name | Source Lines | Responsibility | Props Interface | State | Server / Client | Proposed Location |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `Icons` (`Bolt`, `Chip`, `Cloud`, `Grid`, `Clock`, `Shield`, `Mark`, `Chev`, `DocIcon`) | 366–398 | Render crisp inline SVG graphic icons with exact viewboxes and stroke widths. | `className?: string; style?: React.CSSProperties` | None | Server | `components/Icons.tsx` |
| `LogoRow` | 798–834 | Renders the 6-partner SVG logo lockups for the trusted logos strip. | None | None | Server | `components/LogoRow.tsx` |
| `Rule` | 654–656 | Hairline top-bordered divider with absolute `+` glyphs at frame edges (`.l` and `.r`). | None | None | Server | `components/Rule.tsx` |
| `Item` | 658–667 | Numbered list row (`01`, `02`) with title, body, and right icon box (`.ico`). | `{ n: number; title: string; body: string; icon: IconKey; }` | None | Server | `components/Item.tsx` |
| `Card` | 669–676 | Interactive bordered grid card with category pill (`.k`), `h3` title, body, and `.go` hover arrow. | `{ k: string; title: string; body: string; href: string; go?: string; }` | None | Server | `components/Card.tsx` |
| `Eyebrow` | 678–680 | Monospace utility badge with colored square pseudo-element (`::before`). | `{ children: React.ReactNode; dark?: boolean; }` | None | Server | `components/Eyebrow.tsx` |
| `Spec` | 682–686 | Two-column data specification table (`[label, value]`). | `{ rows: [string, string][]; style?: React.CSSProperties; }` | None | Server | `components/Spec.tsx` |
| `Split` | 699–701 | Asymmetric 2-column layout container (`minmax(0, 1fr)` and `minmax(0, 1.32fr)`). | `{ left: React.ReactNode; children: React.ReactNode; }` | None | Server | `components/Split.tsx` |
| `PageHead` | 688–697 | Subpage header with Eyebrow, `h1`, lede paragraph, and embedded `Terrain` canvas band. | `{ eyebrow: string; title: React.ReactNode; lede: string; variant?: "hero" \| "band" \| "cta"; }` | None | Server (contains Client `Terrain`) | `components/PageHead.tsx` |
| `Terrain` | 400–493 | Procedural dithered canvas generator using Bayer matrix, trigonometric elevation curves, and DPI scaling. | `{ variant?: "hero" \| "band" \| "cta"; className?: string; style?: React.CSSProperties; }` | Internal canvas `ref`, resize debounce listener | **Client** (`"use client"`) | `components/Terrain.tsx` |
| `Header` | 704–731 | Sticky navigation bar with Brand mark, burger toggle, desktop dropdowns, active route highlighting, and CTA button. | None (reads `usePathname`) | `open: boolean` (mobile drawer state) | **Client** (`"use client"`) | `components/Header.tsx` |
| `CTA` | 733–754 | High-impact dark navy conversion banner with `Terrain variant="cta"`, typography, actions, and metadata chips. | None | None | Server (contains Client `Terrain`) | `components/CTA.tsx` |
| `Footer` | 756–796 | 5-column site footer with brand overview, product links, solutions links, company links, resources, copyright, and operational status dot. | None | None | Server | `components/Footer.tsx` |
| `ContactForm` | 1275–1334 | Controlled interactive capacity request form with field inputs, select dropdown, textarea, button validation, and success alert banner. | None | `form: ContactFormData`, `sent: boolean` | **Client** (`"use client"`) | `components/ContactForm.tsx` |
| `DocsSidebar` | 1199–1208 | Sticky documentation sidebar rendering grouped anchor links with smooth scroll handler. | `{ nav: DocNavGroup[]; }` | None | **Client** (`"use client"`) | `components/DocsSidebar.tsx` |

---

## 3. Data Architecture & Types

All static datasets must be extracted into dedicated, strictly typed TypeScript modules under `lib/data/` or unified in `lib/data.ts`. No copy, keys, or array orders may be changed.

### 3.1 TypeScript Type Definitions (`lib/types.ts`)

```typescript
export type IconKey = "bolt" | "chip" | "cloud" | "grid" | "clock" | "shield";

export interface ProductCapability {
  title: string;
  description: string;
  icon: IconKey;
}

export interface ProductSpecItem {
  label: string;
  value: string;
}

export interface Product {
  slug: "cloud" | "inference" | "ai-factories" | "energy";
  key: string;
  name: string;
  tagline: string;
  blurb: string;
  lede: string;
  kicker: string;
  caps: [string, string, IconKey][];
  spec: [string, string][];
  related: ("cloud" | "inference" | "ai-factories" | "energy")[];
}

export interface Solution {
  id: "training" | "inference" | "sovereign" | "wholesale";
  eyebrow: string;
  h: string;
  note: string;
  items: [string, string, IconKey][];
}

export interface BlogPost {
  slug: string;
  date: string;
  read: string;
  tag: string;
  title: string;
  excerpt: string;
}

export type DocNavLink = [id: string, label: string];
export type DocNavGroup = [groupTitle: string, links: DocNavLink[]];

export interface Founder {
  name: string;
  role: string;
  bio: string;
}

export interface CareerPosition {
  category: string;
  location: string;
  title: string;
  body: string;
  href: string;
}

export interface StatItem {
  k: string;
  val: string;
  desc: string;
}

export interface ThesisStep {
  num: string;
  k: string;
  title: string;
  body: string;
  arrow: string;
}
```

### 3.2 Dataset Inventory & Verification (`lib/data.ts`)

1. **`PRODUCTS`**: 4 products (`cloud`, `inference`, `ai-factories`, `energy`). Complete specs, capabilities, kickers, and related product pairings.
2. **`PROBLEMS`**: 4 problem statements on Home page (`Interconnection Queues`, `A Flat Load On A Variable Grid`, `Four Vendors, No Owner`, `Capital Sitting Idle`).
3. **`COMMITMENTS`**: 4 platform commitments (`A date, not a queue position`, `Energy shown per job`, `Data stays in India`, `Exit without a rebuild`).
4. **`PLANES`**: 6 platform architecture planes (`Experience`, `Cloud management`, `Federation control`, `Energy intelligence`, `Site control`, `Resource & energy`).
5. **`SOLUTIONS`**: 4 solution tracks (`training`, `inference`, `sovereign`, `wholesale`).
6. **`POSTS`**: 6 blog articles (`interconnection-queue`, `hourly-matching`, `rack-density`, `group-captive`, `six-planes`, `evening-ramp`).
7. **`DOC_NAV`**: 3 navigation groups (`Start`, `Guides`, `Reference`) with 9 total anchor endpoints.
8. **`FOUNDERS`**: Punit K Goyal & Raman Ladda biographies.
9. **`CAREERS`**: 3 open positions for Energy, Platform, and Sites.
10. **`STATS`**: 3 national energy stats (`257 GW`, `50 GW+`, `1.5 TW`).
11. **`THESIS_STEPS`**: 3-step pipeline (`01 · Current`, `02 · Chip`, `03 · Cloud`).
12. **`CONTACT_STEPS`**: 3 sizing steps (`A sizing call`, `A site and a profile`, `A schedule you can plan against`).

---

## 4. Procedural Canvas & Mathematical Visual Engine

The `Terrain` component (lines 400–493 of `curiosity-cloud.jsx`) is a custom procedural rendering system.

### 4.1 Mathematical Foundations
1. **Bayer Ordered Dithering Matrix (8x8):**
   ```javascript
   const BAYER = [
     [0, 32, 8, 40, 2, 34, 10, 42], [48, 16, 56, 24, 50, 18, 58, 26],
     [12, 44, 4, 36, 14, 46, 6, 38], [60, 28, 52, 20, 62, 30, 54, 22],
     [3, 35, 11, 43, 1, 33, 9, 41], [51, 19, 59, 27, 49, 17, 57, 25],
     [15, 47, 7, 39, 13, 45, 5, 37], [63, 31, 55, 23, 61, 29, 53, 21]
   ];
   ```
2. **Pseudorandom Hash Function `rnd(i, j)`:**
   $$s = \sin(i \cdot 127.1 + j \cdot 311.7) \cdot 43758.5453$$
   $$\text{rnd}(i, j) = s - \lfloor s \rfloor$$
3. **Piecewise Linear Interpolation `polyY(pts, u)`:**
   Interpolates $u \in [0, 1]$ across arbitrary 2D control point arrays `pts: [u_k, y_k][]`.
4. **Preset Elevation Curves & Palette:**
   - **`hero`**:
     - `ramp`: `[[0.13, 1.0], [0.4, 0.9], [0.58, 0.76], [0.78, 0.52], [0.9, 0.24], [0.97, 0.03], [1.0, 0.02]]`
     - `peak`: `[[0.4, 1.0], [0.63, 0.06], [0.83, 1.0]]`
     - Palette: `low: [200, 207, 221]`, `high: [47, 100, 240]`
   - **`band`**:
     - `ramp`: `[[0.05, 1.0], [0.34, 0.86], [0.62, 0.62], [0.84, 0.34], [0.96, 0.08], [1.0, 0.06]]`
     - `peak`: `[[0.22, 1.0], [0.42, 0.22], [0.62, 1.0]]`
     - Palette: `low: [208, 214, 226]`, `high: [58, 108, 240]`
   - **`cta`**:
     - `ramp`: `[[0.0, 1.0], [0.22, 0.82], [0.46, 0.58], [0.7, 0.72], [0.88, 0.3], [1.0, 0.1]]`
     - `peak`: `[[0.52, 1.0], [0.74, 0.16], [0.95, 1.0]]`
     - Palette: `low: [26, 44, 104]`, `high: [176, 200, 255]`

### 4.2 Drawing Algorithm Execution
1. Grid step: `cell = 4`, point diameter `dot = 3`.
2. Pixel ratio handling: `dpr = Math.min(window.devicePixelRatio || 1, 2)`.
3. Clear context and transform: `ctx.setTransform(dpr, 0, 0, dpr, 0, 0)`.
4. Iterate columns $x = i \cdot \text{cell}$, rows $y = j \cdot \text{cell}$.
5. Calculate composite elevation $topY = \min(\text{rampY}, \text{peakY})$.
6. If $y < topY$: conditionally render specular star points if $u > 0.62 \land \text{rampY} > y \land \text{rampY} - y < 0.16h \land \text{rnd}(i, j) > 0.982$.
7. If $y \ge topY$: calculate decay intensity $v$ using exponential curves, perturb with $\text{rnd}(i, j)$, and compare against Bayer matrix threshold:
   $$\text{threshold} = \frac{\text{BAYER}[j \bmod 8][i \bmod 8] + 0.5}{64}$$
   If $v > \text{threshold}$, fill square with RGB color interpolated by $t = \min(1, 0.75u + 0.45v)$.

### 4.3 Browser Lifecycle & Next.js Architecture
- **Component File:** `components/Terrain.tsx` with `"use client"`.
- **Resize Handler:** Debounced with a 120ms timer.
- **Font Ready Hook:** `document.fonts?.ready?.then(draw).catch(() => {})` guarantees crisp redrawing after custom Google Fonts complete loading.
- **Cleanup:** `window.removeEventListener("resize", onResize)` on unmount.
- **Canvas Accessibility:** `aria-hidden="true"` and `pointer-events: none` on `.terrain-wrap`.

---

## 5. Styling Architecture & Design Tokens

### 5.1 CSS Variables & Palette Tokens
```css
:root {
  --ink: #0C0D0F;
  --ink-soft: #5B616B;
  --ink-mute: #868C96;
  --blue: #2C55DE;
  --blue-deep: #1B39B4;
  --blue-soft: #7C9BF3;
  --blue-pale: #9BB4F7;
  --navy: #0D1A45;
  --line: #E3E5EA;
  --line-soft: #EDEEF2;
  --frame: 1392px;
  --pad: 40px;
}
```

### 5.2 Background Patterns & Textures
1. **Global Body Texture:**
   ```css
   background-color: #fff;
   background-image: repeating-linear-gradient(135deg, #fff 0 6px, #F0F1F4 6px 7px);
   ```
2. **Hero & PageHead Dotted Mesh:**
   ```css
   background-image: radial-gradient(circle, #E1E4EA 1px, transparent 1.1px);
   background-size: 9px 9px;
   ```
3. **Avatar Dot Matrix:**
   ```css
   background: radial-gradient(circle, #E1E4EA 1px, transparent 1.1px) 0 0/7px 7px, #FBFCFE;
   ```
4. **CTA Band Radial/Linear Depth:**
   ```css
   background: #0E1C4E;
   background-image: linear-gradient(160deg, #132464 0%, #0B1740 55%, #081029 100%);
   ```

### 5.3 Typography Matrix
- **Display Font:** `Inter Tight`, sans-serif (weights 300, 400, 500, 600)
- **Body Font:** `Inter`, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif (weights 400, 500)
- **Utility / Code Font:** `JetBrains Mono`, monospace (weights 400, 500, with `font-feature-settings: "zero" 1`)

#### Scale Specifications:
- **Hero `h1`:** `font-size: clamp(42px, 7.9vw, 108px); line-height: 1.02; letter-spacing: -0.035em; max-width: 1080px;`
- **PageHead `h1`:** `font-size: clamp(36px, 5.4vw, 72px); max-width: 16ch;`
- **Post `h1`:** `font-size: clamp(32px, 4.4vw, 58px); max-width: 20ch;`
- **Docs `h1`:** `font-size: clamp(34px, 4.6vw, 56px);`
- **404 `h1`:** `font-size: clamp(40px, 6vw, 86px);`
- **CTA `h2`:** `font-size: clamp(34px, 4.6vw, 60px); line-height: 1.06; letter-spacing: -0.032em; max-width: 15ch;`
- **Section `h2`:** `font-size: clamp(30px, 3.2vw, 41px); line-height: 1.14;`
- **`h3`:** `font-size: 21px; letter-spacing: -0.015em;`
- **Stat `h3`:** `font-size: 44px; letter-spacing: -0.04em; line-height: 1;`
- **Eyebrow:** `font-family: "JetBrains Mono", monospace; font-size: 11.5px; letter-spacing: 0.16em; text-transform: uppercase;`
- **Button:** `font-family: "JetBrains Mono", monospace; font-size: 11.5px; font-weight: 500; letter-spacing: 0.13em; text-transform: uppercase;`

### 5.4 Hairline Frame & Rule Elements
- `.frame`: `max-width: 1392px; margin: 0 auto; background: #fff; border-left: 1px solid var(--line); border-right: 1px solid var(--line);`
- `.rule`: `position: relative; border-top: 1px solid var(--line); height: 0;`
- `.rule > span`: `position: absolute; top: -10px; font: 400 17px/1 "JetBrains Mono", monospace; color: #A7ADB8;`
- `.rule .l`: `left: calc(50% - var(--frame)/2 - 8px);`
- `.rule .r`: `left: calc(50% + var(--frame)/2 - 9px);`

---

## 6. Responsive Behavior & Breakpoints

### 6.1 Desktop Viewport ($> 1100\text{px}$)
- Full 1392px framed layout with left and right hairline borders.
- Floating `+` markers aligned precisely to the outer borders.
- Grid layouts:
  - Cards: 3 columns (`.cards`) or 2 columns (`.cards.two`).
  - Team: 4 columns.
  - Split: 2-column asymmetric (`minmax(0,1fr)` and `minmax(0,1.32fr)`).
  - Footer: 5 columns (`1.5fr repeat(4, 1fr)`).
  - Docs: 2-column grid (`236px minmax(0, 1fr)`).

### 6.2 Tablet Viewport ($\le 1100\text{px}$)
- `--pad`: reduced from `40px` to `36px`.
- Outer frame borders disabled (`.frame { border-left: 0; border-right: 0; }`).
- Rule `+` markers anchored to screen edge (`.rule .l { left: 6px; }`, `.rule .r { right: 6px; left: auto; }`).
- Team grid collapses to 2 columns (`repeat(2, minmax(0, 1fr))`).
- Footer collapses to 3 columns (`1fr 1fr 1fr; gap: 34px;`).

### 6.3 Mobile Viewport ($\le 860\text{px}$)
- **Header & Navigation:**
  - Desktop nav links hide; `.burger` icon (`40x36px`) becomes visible.
  - `.head-cta` ("Request capacity →") is hidden.
  - Menu opens as full-width vertical accordion drawer below 80px header (`position: absolute; top: 80px; left: 0; right: 0;`).
  - Dropdown items become statically expanded sub-items inside the mobile menu.
- **Grids & Layouts:**
  - `.split`: collapses to single column (`grid-template-columns: 1fr; gap: 40px;`).
  - `.cards`, `.cards.two`: collapse to single column.
  - `.flow`: collapses from 3 columns to 1 column.
  - `.item`: collapses to `grid-template-columns: 44px 1fr;` with `.ico` hidden (`display: none;`).
  - `.logo-row`: flex wraps with `gap: 28px 40px; margin-inline: 0;`.
  - `.docs`: collapses to 1 column. Sidebar `.docs-nav` becomes static top section with bottom border.
  - `.post-row`: collapses to 1 column with tag aligned to start.
  - `.form`: collapses to single column.
  - `.foot-in`: collapses to 2 columns (`1fr 1fr; gap: 30px;`).
  - `.terrain-wrap`: `margin-top: -20px;`, `canvas.terrain { height: 280px; }`.

### 6.4 Accessibility & Motion Preferences
- `@media (prefers-reduced-motion: reduce)`:
  - `* { transition: none !important; scroll-behavior: auto; }`

---

## 7. Interaction Mapping & State Transitions

1. **Header Mobile Hamburger Toggle:**
   - Click toggles state `open: boolean`.
   - `aria-expanded` updates dynamically on button.
   - Automatically closes when route changes.
2. **Platform Dropdown Menu:**
   - Desktop: Opens on `:hover` or `:focus-within` with smooth fade/slide (`opacity: 0; transform: translateY(-5px);` $\rightarrow$ `opacity: 1; transform: none;`).
   - Mobile: Statically rendered in expanded menu with indented sublinks.
3. **Active Nav Highlighting:**
   - Compares active pathname with link href. Sets `.active` class (`color: var(--blue)`).
4. **Docs Section Anchors:**
   - Clicking sidebar links scrolls the corresponding section heading into view smoothly and updates the URL hash without triggering full reload.
5. **Contact Request Form:**
   - Controlled state for fields: `name`, `email`, `company`, `need`, `size`, `when`, `detail`.
   - Submit button disabled state: `disabled={!ready}` where `ready = Boolean(form.name.trim() && form.email.trim())`.
   - Submission toggles `sent: true` displaying the confirmation box (`Request received. Someone from the capacity team replies within one business day.`).
6. **Canvas Dynamic Resize:**
   - Debounced window resize listener clears and re-computes grid dimensions, recalculating device pixel ratio and redraws curves deterministically.

---

## 8. Client vs Server Component Strategy

To maintain maximum performance and SEO while preventing hydration mismatches:

### Server Components (Default)
- `app/layout.tsx`
- `app/page.tsx` (Home)
- `app/platform/page.tsx` (Platform index)
- `app/platform/[slug]/page.tsx` (Product details)
- `app/solutions/page.tsx` (Solutions)
- `app/company/page.tsx` (Company)
- `app/blog/page.tsx` (Blog index)
- `app/blog/[slug]/page.tsx` (Blog post)
- `app/not-found.tsx` (404 page)
- `components/Footer.tsx`
- `components/CTA.tsx`
- `components/PageHead.tsx`
- `components/Rule.tsx`
- `components/Item.tsx`
- `components/Card.tsx`
- `components/Eyebrow.tsx`
- `components/Spec.tsx`
- `components/Split.tsx`
- `components/LogoRow.tsx`
- `components/Icons.tsx`

### Client Components (`"use client"`)
- `components/Terrain.tsx` (Requires `<canvas>`, 2D context, `window.devicePixelRatio`, `document.fonts`, resize listeners).
- `components/Header.tsx` (Requires mobile drawer state `open`, `usePathname()` active link matching, click handlers).
- `components/ContactForm.tsx` (Requires form inputs state `form`, validation, submission state `sent`).
- `components/DocsNav.tsx` (Requires smooth anchor click handling and URL hash updating).

---

## 9. Hydration Safeguards & Deterministic Rendering

| Potential Hydration Risk | Root Cause in Original SPA | Deterministic Next.js Solution |
| :--- | :--- | :--- |
| **`window.location.hash`** | Read synchronously during state initialization (`useState(parse)`). | Replaced by Next.js App Router static/dynamic params and Next.js `<Link>` components. |
| **`devicePixelRatio` & Viewport Dimensions** | Canvas dimensions evaluated from `window.devicePixelRatio` and DOM `clientWidth`/`clientHeight`. | Initial HTML renders `<canvas className={className} style={style} aria-hidden="true" />` with identical static attributes. Drawing only fires inside `useEffect`. |
| **`document.fonts.ready`** | Direct DOM API access. | Executed strictly inside `useEffect` with `.then().catch()` error boundary. |
| **Dynamic Year in Footer** | `new Date().getFullYear()` can mismatch between server render time and client execution if timezones differ. | Hardcoded to current authoritative release year or rendered deterministically from server props. |
| **Contact Form Sent State** | Interactive DOM switching. | State initialized deterministically to `false`. |

---

## 10. Next.js Project File Structure

```
curiosity-cloud/
├── app/
│   ├── blog/
│   │   ├── [slug]/
│   │   │   └── page.tsx
│   │   └── page.tsx
│   ├── company/
│   │   └── page.tsx
│   ├── contact/
│   │   └── page.tsx
│   ├── docs/
│   │   └── page.tsx
│   ├── platform/
│   │   ├── [slug]/
│   │   │   └── page.tsx
│   │   └── page.tsx
│   ├── solutions/
│   │   └── page.tsx
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   ├── not-found.tsx
│   └── page.tsx
├── components/
│   ├── Card.tsx
│   ├── ContactForm.tsx
│   ├── CTA.tsx
│   ├── DocsNav.tsx
│   ├── Eyebrow.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── Icons.tsx
│   ├── Item.tsx
│   ├── LogoRow.tsx
│   ├── PageHead.tsx
│   ├── Rule.tsx
│   ├── Spec.tsx
│   ├── Split.tsx
│   └── Terrain.tsx
├── lib/
│   ├── data.ts
│   └── types.ts
├── public/
├── docs/
│   └── implementation-blueprint.md
├── package.json
├── tsconfig.json
└── next.config.ts
```

---

## 11. Migration Execution Plan (Step-by-Step)

The next agent should follow this sequenced execution roadmap:

### Phase 1: Foundation Setup
1. **Design System & Global CSS:**
   - Migrate the full CSS block into `app/globals.css`. Ensure Google Fonts (`Inter Tight`, `Inter`, `JetBrains Mono`) are loaded via `next/font/google` in `app/layout.tsx` or through `@import` in `globals.css`.
   - Verify all CSS variables and classes (`.frame`, `.rule`, `.hero`, `.page-head`, `.split`, `.item`, `.cards`, `.spec`, `.prose`, `.cta`, `.foot-in`, etc.) are active.
2. **Type System & Static Data Extraction:**
   - Create `lib/types.ts` with all interfaces defined in Section 3.1.
   - Create `lib/data.ts` exporting all constants (`PRODUCTS`, `PROBLEMS`, `COMMITMENTS`, `PLANES`, `SOLUTIONS`, `POSTS`, `DOC_NAV`, `FOUNDERS`, `CAREERS`, `STATS`, `THESIS_STEPS`).

### Phase 2: Core Reusable Components
1. Create `components/Icons.tsx` and `components/LogoRow.tsx`.
2. Create `components/Rule.tsx`, `components/Eyebrow.tsx`, `components/Item.tsx`, `components/Card.tsx`, `components/Spec.tsx`, `components/Split.tsx`.
3. Create `components/Terrain.tsx` with `"use client"` and exact mathematical algorithms.
4. Create `components/PageHead.tsx`, `components/CTA.tsx`, and `components/Footer.tsx`.
5. Create `components/Header.tsx` with `"use client"`, mobile hamburger drawer, desktop dropdown, and active route detection.

### Phase 3: Route Implementation
1. **Root Layout (`app/layout.tsx`):**
   - Include `Header` and `Footer`.
   - Wrap main content in `.cc-root`.
   - Set metadata title: `"Curiosity Cloud | Infrastructure Layer for India's AI Economy"`.
2. **Home Page (`app/page.tsx`):**
   - Assemble Hero, Logos, Problem, Thesis, Platform, Getting Started, and Why India sections. Include `CTA`.
3. **Platform Pages (`app/platform/page.tsx` & `app/platform/[slug]/page.tsx`):**
   - Platform overview with Products cards, 6 Planes, Commitments, and `CTA`.
   - Dynamic product page with `generateStaticParams` for `["cloud", "inference", "ai-factories", "energy"]`, Capabilities, Spec, and "Pairs with" cards.
4. **Solutions Page (`app/solutions/page.tsx`):**
   - Assemble PageHead and 4 solution sections with exact IDs (`training`, `inference`, `sovereign`, `wholesale`). Include `CTA`.
5. **Company Page (`app/company/page.tsx`):**
   - Assemble PageHead, Why we exist prose, How we work commitments, Founders cards (`id="founders"`), Careers cards (`id="careers"`). Include `CTA`.
6. **Blog Pages (`app/blog/page.tsx` & `app/blog/[slug]/page.tsx`):**
   - Blog listing with 6 post rows.
   - Dynamic post page with `generateStaticParams`, rendering full copy for `interconnection-queue` and placeholder for others. Include `CTA`.
7. **Docs Page (`app/docs/page.tsx`):**
   - 2-column docs layout with `DOC_NAV` sidebar and full markdown/code content. Include `CTA`.
8. **Contact Page (`app/contact/page.tsx`):**
   - Interactive `ContactForm` on right, sizing steps on left. **Crucial:** Omit `CTA` band on Contact page!
9. **404 Page (`app/not-found.tsx`):**
   - Custom error layout ("This route has no power.") matching source lines 1338–1352.

### Phase 4: Verification & Build
1. Execute `npm run build` to verify zero TypeScript errors, zero lint warnings, and valid static page generation.
2. Perform browser verification on desktop (1440px), tablet (1024px), and mobile (390px) viewports.

---

## 12. Complete Acceptance Criteria Checklist

### 12.1 Route & URL Integrity
- [ ] `/` renders Home page correctly.
- [ ] `/platform` renders Platform overview.
- [ ] `/platform/cloud`, `/platform/inference`, `/platform/ai-factories`, `/platform/energy` render respective product details.
- [ ] `/platform/unknown-slug` triggers custom 404 page.
- [ ] `/solutions` renders all 4 solution sections.
- [ ] `/solutions#training`, `/solutions#inference`, `/solutions#sovereign`, `/solutions#wholesale` scroll directly to sections.
- [ ] `/company` renders Why We Exist, Commitments, Founders, and Careers.
- [ ] `/company#founders` and `/company#careers` scroll directly to respective sections.
- [ ] `/blog` lists all 6 articles.
- [ ] `/blog/interconnection-queue` renders the complete editorial essay.
- [ ] `/blog/hourly-matching` (and other slugs) render queued notice with link back.
- [ ] `/blog/invalid-slug` triggers custom 404 page.
- [ ] `/docs` renders full documentation with sidebar navigation.
- [ ] `/contact` renders sizing steps and interactive form.
- [ ] Non-existent routes (e.g. `/xyz`) render custom 404 page.

### 12.2 Copy & Data Fidelity
- [ ] 100% exact copy match across all headlines, paragraphs, code blocks, tables, and notes.
- [ ] All 4 products in `PRODUCTS` retain complete capabilities, specifications, and related pairings.
- [ ] All 6 posts in `POSTS` retain exact dates, tags, read times, titles, and excerpts.
- [ ] All 6 planes in `PLANES` and 4 commitments in `COMMITMENTS` preserved verbatim.
- [ ] All 9 docs sections and spec tables preserved verbatim.

### 12.3 Visual & Design System Fidelity
- [ ] Font families (`Inter Tight`, `Inter`, `JetBrains Mono`) render with exact weights and tracking.
- [ ] Global diagonal repeating stripe background is visible behind white frame.
- [ ] Frame borders (1392px width, 1px `#E3E5EA` border) render accurately on desktop.
- [ ] Rule lines render hairline border with `+` glyphs at left and right frame margins.
- [ ] Dot-matrix radial patterns render on hero, subpage headers, and founder avatars.
- [ ] CTA band renders deep navy gradient (`#132464` $\rightarrow$ `#0B1740` $\rightarrow$ `#081029`).
- [ ] Buttons (`.btn-primary`, `.btn-ghost`, `.btn-light`, `.btn-outline-light`) render exact gradients, borders, and hover states.

### 12.4 Canvas & Procedural Rendering
- [ ] Hero terrain renders with `hero` preset colors and elevation curves.
- [ ] Subpage heads render with `band` preset colors.
- [ ] CTA band renders with `cta` preset colors on dark background.
- [ ] Canvas scales smoothly with `window.devicePixelRatio` without blurring.
- [ ] Window resize debouncing recalculates dimensions without memory leaks.
- [ ] Font load listener triggers redraw when web fonts finish loading.

### 12.5 Interactive Components & Forms
- [ ] Header mobile burger button opens/closes menu drawer below 860px.
- [ ] Header Platform dropdown opens on hover/focus on desktop and as an accordion list on mobile.
- [ ] Contact form validates `name` and `email` before enabling submit button.
- [ ] Submitting contact form displays the confirmation banner.
- [ ] Docs sidebar clicks navigate and scroll smoothly to target headings.
- [ ] CTA band is displayed on all pages **except** `/contact`.

### 12.6 Quality, Hydration & Build
- [ ] Zero hydration warnings or errors in browser console.
- [ ] Zero server/client markup discrepancies.
- [ ] Passes `npm run build` cleanly with all routes statically generated.
