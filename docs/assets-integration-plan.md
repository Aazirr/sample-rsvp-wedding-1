# Assets Integration Plan — Custom Art Rework

> **Status (post Phase 28):** OPTIONAL / FUTURE ENHANCEMENT. The distinctive identity called for below was instead delivered through the "Fine Stationery" typographic + CSS system (monogram, letterpress diamond dividers, editorial type) — no raster/SVG art was required, keeping the Starter build lightweight. The custom SVG assets here remain a nice-to-have upgrade, not a blocker.
>
> **Project:** SunSpire Studios — Starter Wedding RSVP Sample  
> **Purpose:** Replace generic visuals with custom art assets that give the page a distinctive, handcrafted identity while keeping the Starter package feel fast and affordable.

---

## 1. Current State Audit

| Asset Type | Current Implementation | Gap |
|---|---|---|
| Hero visuals | Full-screen photo with overlay text | No custom illustration or graphic identity |
| Section transitions | CSS `::before` pseudo-element backgrounds, linear gradients | No decorative dividers or section markers |
| Icons | Lucide React icons (CalendarDays, MapPin, Clock3, etc.) | Functional but generic — any site can use them |
| Gallery photos | 8 photos from Tagaytay photoshoot | Photos are the only visual interest |
| Theme preview | Photo thumbnails only | No custom color or illustration previews |
| Dividers/separators | CSS border-gradient on sections | No ornamental handoff between sections |
| Brand mark | Text-only "SunSpire Studios" in footer | No logo, crest, or monogram |
| Background | CSS radial gradient overlays | Subtle but still a code-only effect |
| Wedding party cards | Plain bordered panels with text | No visual distinction for roles |
| Sponsor sections | Same card pattern as wedding party | No hierarchy between primary/secondary |

---

## 2. Required Custom Assets

### 2.1 — Botanical Floral Corner Motif (SVG)

**File:** `public/assets/floral-corner.svg`  
**Usage:** Hero overlay, section dividers, invitation card borders  
**Description:** A single continuous botanical line art piece — eucalyptus branch with small blossoms. Rendered as a clean SVG path (no sketchy/doodle style). Two variants: **top-right** and **bottom-left** orientation.

**Visual reference:**
```
 ┌─────────────────────────────────┐
 │   ╱╲                            │
 │  ╱  ╲    ✿                      │
 │ ╱    ╲___╱                      │
 │ │         │                     │
 │ │         │   (content area)    │
 │ │         │                     │
 │      ___╱╲___                   │
 │     ╱        ╲                 │
 │    ✿          ╲                │
 └─────────────────────────────────┘
```

**How it integrates:**
- **Hero section:** Lightly overlaid at top-right corner of the hero photo, at ~8–10% opacity on desktop, hidden on small mobile to keep focus on the couple.
- **Event Details section header:** Used as a subtle decorative bracket above the section heading.
- **RSVP sidebar:** Flanking the invitation summary card as corner accents.

---

### 2.2 — Custom Monogram / Crest (SVG)

**File:** `public/assets/monogram.svg`  
**Usage:** Hero section, footer, form success state, favicon  
**Description:** An intertwined letter mark "A+T" (Amelia + Theo) in an elegant but readable serif style, encircled by a thin double-line ring with small leaf accents at the cardinal points. The design should feel like a wax-seal impression — composed, not ornate.

**Visual reference:**
```
       ╭──────────╮
       │  ╭────╮  │
       │  │A ✦ T│  │
       │  ╰────╯  │
       │   leaf   │
       ╰──────────╯
```

**How it integrates:**
- **Hero section:** Positioned above the couple names as a small visual anchor, replacing the plain text "SunSpire Studios Starter Sample" kicker.
- **Footer:** Placed between the contact line and the SunSpire credit, at 32×32px.
- **RSVP success state:** Displayed large (80×80px) inside the success message with a subtle fade-in animation.
- **Favicon:** Also used as `favicon.svg` for browser tab recognition.

---

### 2.3 — Section Divider Ornaments (SVG)

**File:** `public/assets/divider-leaf.svg`  
**Usage:** Between every major section  
**Description:** A slim horizontal divider — a thin line with a single leaf or small blossom at the center. Three color variants are achieved via CSS `currentColor` so they adapt to the active theme (blush/sage/champagne).

**Visual reference:**
```
─────── ✿ ───────
```

**How it integrates:**
- Inserted as a decorative `<hr>` replacement between sections: after Hero, before Event Details, before Gallery, before RSVP, before Footer.
- Rendered as an inline SVG in JSX or via `<img>` with `color-mix()` support.
- On mobile, the divider collapses to just the leaf symbol without the line to save horizontal space.

---

### 2.4 — Botanical Background Pattern (SVG/WebP)

**File:** `public/assets/pattern-botanical.webp` (or inline SVG)  
**Usage:** Subtle full-page background texture  
**Description:** A very faint, tiled botanical motif — scattered single leaves and tiny blossoms at high transparency (~3–5% opacity). Pattern repeats every 400×400px. This replaces the current CSS radial-gradient `ambient-drift` background.

**Visual reference:**
```
·   ·   ·   ·   ·   ·
  ✿       ✿       ✿
·   ·   ·   ·   ·   ·
    ✧       ✧
·   ·   ·   ·   ·   ·
  ✿       ✿       ✿
·   ·   ·   ·   ·   ·
```

**How it integrates:**
- Applied as `body` background via CSS: `background-image: url("/assets/pattern-botanical.webp")`.
- Kept at `opacity: 0.04` so it never competes with content.
- The `ambient-drift` CSS animation is removed since the static pattern provides texture without motion.
- On `prefers-reduced-motion`, the pattern remains static (already the default).

---

### 2.5 — Wedding Party Role Icons (SVG)

**Files:**
- `public/assets/icon-ring.svg` — Ring Bearers
- `public/assets/icon-petals.svg` — Flower Girls / Flower Ladies
- `public/assets/icon-couple.svg` — Matron of Honor / Best Man
- `public/assets/icon-family.svg` — Parents
- `public/assets/icon-candle.svg` — Candle sponsor
- `public/assets/icon-veil.svg` — Veil sponsor
- `public/assets/icon-cord.svg` — Cord sponsor
- `public/assets/icon-witness.svg` — Primary sponsors

**Usage:** Wedding party and sponsor section cards  
**Description:** A set of 8 minimalist line-art icons (24×24px viewBox), matching the same stroke weight and style as the current Lucide icons (~1.5px stroke, rounded caps). Each icon is a simple symbolic representation of the role.

**Visual reference (descriptions):**
| Icon | Shape |
|---|---|
| `icon-ring.svg` | Two interlocked circles |
| `icon-petals.svg` | Three small petals radiating |
| `icon-couple.svg` | Two simplified silhouettes side by side |
| `icon-family.svg` | Two large + one small simplified figures |
| `icon-candle.svg` | A tapered candle with a flame |
| `icon-veil.svg` | A draped fabric shape |
| `icon-cord.svg` | A twisted rope/yarn loop |
| `icon-witness.svg` | An open book / scroll |

**How it integrates:**
- Each icon is placed inside the `party-group` or `sponsor-panel` card, above the role label.
- They replace the absence of any visual marker — currently these sections have text only.
- Icons are colored with `var(--accent-strong)` via CSS `fill` or `stroke`.
- On hover, the icon gets a subtle `float-subtle` animation.

---

### 2.6 — RSVP Decorative Frame (SVG)

**File:** `public/assets/frame-rsvp.svg`  
**Usage:** RSVP form card  
**Description:** A thin double-line border frame with small corner flourishes, wrapping the RSVP form. It gives the form an invitation-paper feel without being ornate. The frame uses `currentColor` so it adapts to theme.

**Visual reference:**
```
┌──╴ ╶──┐
│        │
│  form  │
│        │
└──╴ ╶──┘
```

**How it integrates:**
- Applied to the `.rsvp-form` container as a `border-image` or overlaid SVG background.
- The frame is about 2px outer + 1px inner line, with a ~6px gap between them.
- Corner flourishes are small curled leaf shapes, ~16×16px.
- The frame should not add extra padding beyond what the form already has; it sits at the edge of the card.

---

### 2.7 — Hero Scroll Cue Arrow (SVG)

**File:** `public/assets/scroll-arrow.svg`  
**Usage:** Bottom of the hero section indicating scrollable content below  
**Description:** A thin, elegant downward-pointing chevron with a short stem, drawn in a single continuous stroke. Mimics an envelope flap opening downward.

**Visual reference:**
```
    ╲ ╱
     ╳
    ╱ ╲
     │
     │
```

**How it integrates:**
- Positioned at the bottom of the hero overlay, centered.
- Animated with a gentle bounce (translateY oscillation, 2s cycle).
- Hidden on desktop where the layout is already full-viewport.
- Replaces the current scroll-based fade/CSS-only cue.

---

## 3. Integration Map — by Section

| Section | Current Visual | Custom Asset | Integration Method |
|---|---|---|---|
| **Hero** | Photo + text overlay + gradient vignette | Monogram (top), Floral corner (top-right), Scroll arrow (bottom) | SVG `<img>` tags or inline SVGs inside the `.hero-overlay` div. Monogram replaces the kicker text. |
| **Event Details** | Icon list with Lucide icons + borders | Replace Lucide CalendarDays, MapPin, Clock3, Shirt with custom equivalents | Swap `import` from Lucide to local SVGs. Use an `<Icon>` wrapper component. |
| **Wedding Party** | Text-only cards in paired rows | Role icons (×4) for each card category | Add `<img>` or inline SVG at top of each `.party-group`, before the `party-role` label. |
| **Sponsors** | Text-only panels | Role icons (×4: candle, veil, cord, witness) | Same as wedding party — icon above the role heading. |
| **Gallery** | Photo carousel with arrows + dots | No new assets (photos are sufficient), but add the Divider Leaf above the section | Place `divider-leaf.svg` as a decorative `<hr>` between gallery heading and carousel. |
| **RSVP** | Plain form card with shadow | RSVP decorative frame wrapping the form | SVG border-image or CSS `background` with the frame SVG. Show the monogram in the success state. |
| **Theme Customization** | Color swatches + photo thumbs | No new assets needed | The existing controls are functional; no art needed here. |
| **Footer** | Text + credit line | Small monogram mark | Add `<img src="/assets/monogram.svg" height="24" />` before the credit text. |
| **Page Background** | CSS radial gradients + ambient-drift animation | Botanical pattern overlay | CSS `background-image` on `body`. Remove the `ambient-drift` keyframes. |

---

## 4. Technical Integration Guide

### 4.1 — Asset Directory Structure

```
public/
├── assets/
│   ├── monogram.svg
│   ├── floral-corner.svg
│   ├── divider-leaf.svg
│   ├── pattern-botanical.webp       (or .svg)
│   ├── scroll-arrow.svg
│   ├── frame-rsvp.svg
│   ├── icons/
│   │   ├── icon-ring.svg
│   │   ├── icon-petals.svg
│   │   ├── icon-couple.svg
│   │   ├── icon-family.svg
│   │   ├── icon-candle.svg
│   │   ├── icon-veil.svg
│   │   ├── icon-cord.svg
│   │   └── icon-witness.svg
│   └── custom-icons/
│       ├── ceremony-date.svg        (replaces CalendarDays)
│       ├── ceremony-location.svg    (replaces MapPin)
│       ├── dress-code.svg           (replaces Shirt)
│       └── deadline.svg             (replaces Clock3)
└── photos/
    ├── 1.jpg … 9.jpg               (existing)
```

### 4.2 — SVG Requirements

Every SVG must follow these conventions for consistent rendering:

| Property | Value |
|---|---|
| `viewBox` | `0 0 24 24` (icons) / `0 0 120 120` (monogram) / custom per asset |
| `stroke` | `currentColor` (never hardcoded hex) |
| `stroke-width` | `1.5` (icons) / `1.2` (ornamentals) |
| `stroke-linecap` | `round` |
| `stroke-linejoin` | `round` |
| `fill` | `none` (for line-art icons) |
| Color adaptation | Use `currentColor` so parent CSS can set the color |

### 4.3 — React Integration Pattern

Create a reusable `<Icon>` component at `src/components/Icon.jsx`:

```jsx
// src/components/Icon.jsx
export default function Icon({ name, size = 24, className = "" }) {
  return (
    <svg width={size} height={size} className={className}>
      <use href={`/assets/icons/icon-${name}.svg#icon`} />
    </svg>
  );
}
```

Then replace Lucide imports in `App.jsx`:

```jsx
// Before:
import { CalendarDays, MapPin, Clock3, Shirt } from "lucide-react";

// After:
import Icon from "./components/Icon";
// In JSX: <Icon name="ceremony-date" size={20} />
```

Alternatively, for a simpler approach, import SVGs directly as React components using Vite's SVG support, or use `<img src="/assets/icons/icon-ring.svg" alt="Ring Bearers" />`.

### 4.4 — CSS Integration for Background Assets

```css
/* Pattern background — replaces radial-gradient + ambient-drift */
body {
  background-image: url("/assets/pattern-botanical.webp");
  background-size: 400px 400px;
  background-repeat: repeat;
  background-color: var(--bg); /* keep the base color */
  /* Remove: background-attachment: fixed; */
  /* Remove: animation: ambient-drift; */
}

/* Section divider */
.section-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  margin: 0 auto;
  color: var(--line);
}

.section-divider::before,
.section-divider::after {
  content: "";
  flex: 1;
  height: 1px;
  background: var(--line);
}

.section-divider img {
  width: 24px;
  height: 24px;
  margin: 0 12px;
}
```

### 4.5 — Component Changes Summary

| File | Change |
|---|---|
| `src/App.jsx` | Replace Lucide icon imports with local `<Icon>` component. Add monogram to hero. Add divider elements between sections. Add role icons to wedding party and sponsor cards. Add scroll arrow to hero. Apply RSVP frame. Add monogram to success state and footer. |
| `src/styles.css` | Add `.section-divider` styles. Replace `body` background with pattern. Add RSVP frame CSS. Remove `ambient-drift` animation. Add icon hover styles for party cards. |
| `src/components/Icon.jsx` | **New file.** Reusable SVG icon wrapper with `use` tag or direct SVG rendering. |
| `index.html` | Update favicon to `monogram.svg`. |

---

## 5. Asset Creation Priority

| Priority | Asset | Reason |
|---|---|---|
| P0 | Monogram (`monogram.svg`) | Most visible — used in hero, footer, success state, favicon |
| P0 | Floral corner (`floral-corner.svg`) | Defines the visual identity across sections |
| P0 | Section divider (`divider-leaf.svg`) | Needed to break up sections with custom identity |
| P1 | Role icons (×8 in `icons/`) | Wedding party and sponsors are text-only currently |
| P1 | Custom event icons (×4) | Replace the most-used Lucide icons |
| P1 | Botanical pattern | Replaces the CSS-only background with a genuine art asset |
| P2 | Scroll arrow (`scroll-arrow.svg`) | Hero cue — nice to have, lower impact |
| P2 | RSVP frame (`frame-rsvp.svg`) | RSVP polish pass |

---

## 6. Design Principles for the Art Assets

All custom art must adhere to these constraints to stay aligned with the Starter package positioning:

1. **Line art only** — no filled shapes, no gradients, no color stops. Single-stroke SVG paths keep file sizes small and render crisp on all screens.
2. **CurrentColor everywhere** — every SVG uses `stroke="currentColor"` so the active theme (blush, sage, champagne) tints the art automatically.
3. **Minimal file sizes** — each SVG should be hand-optimized to under 2KB. The pattern can be up to 10KB since it tiles.
4. **No hand-drawn/sketchy aesthetics** — paths must be mathematically clean (arcs, smooth bezier curves). No `feTurbulence` or paper-grain filters.
5. **Romantic but restrained** — think calligraphy nib, not crayon. Think single eucalyptus stem, not a full bouquet.
6. **Mobile-safe** — decorative assets should either disappear or scale down on screens under 640px. The monogram and role icons are small enough to remain; the floral corner and scroll arrow hide on mobile.
7. **Reduced motion respected** — the scroll arrow animation pauses for `prefers-reduced-motion`. The background pattern has no animation by nature.

---

## 7. Production Checklist

- [ ] All SVGs use `currentColor` with no hardcoded fills or strokes
- [ ] All SVGs have `xmlns="http://www.w3.org/2000/svg"` and correct `viewBox`
- [ ] Pattern asset is exported as WebP for smaller file size (with SVG fallback)
- [ ] Favicon updated to `monogram.svg` in `index.html`
- [ ] Lucide icon imports removed from `App.jsx` (tree-shaken by Vite)
- [ ] `ambient-drift` keyframes and radial-gradient background removed from `styles.css`
- [ ] Reduced-motion query added for scroll arrow animation
- [ ] All `alt` attributes added for `<img>` references to SVGs
- [ ] Visual test on mobile (320px–428px) — decorative elements hidden where they clutter
- [ ] Visual test on desktop (1280px+) — corners, dividers, and frame render at intended scale
- [ ] Theme toggle test — all assets correctly inherit blush / sage / champagne colors
