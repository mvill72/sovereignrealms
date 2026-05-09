# Stoic UI Integration — The Realm Manifest

> **"The mandala is complete. The outer form now matches the inner philosophy."**

This document records the integration of the Stoic UI design system and components into the SovereignRealm application, transforming it from a Facebook-style interface into a true temenos for digital sovereignty.

---

## What Changed

### 1. Main Application (`src/app/page.tsx`)

**Complete refactor from Facebook-style layout to Stoic UI architecture:**

#### Before:
- Facebook-style cover photo and profile layout
- Zinc color scheme (zinc-950, purple-900, etc.)
- Old visibility terminology ('private', 'public')
- Traditional feed with infinite scroll
- No reflection gates or finite feeds
- No Stoic UI components

#### After:
- **Stoic Header** — Sticky navigation with SovereignRealm branding
- **Circle Selector** — SVG concentric rings for navigating the Four Realms
- **Daily Reflection Counter** — Finite feed with max 12 posts per Circle
- **Reflection Gate** — 3-second contemplation before releasing from Vault
- **Immutable Post Cards** — Parchment-style posts with CID always visible
- **Evening Review** — Daily reflection modal (auto-triggers 6-11 PM)
- **New Circle Terminology** — `vault`/`family`/`work`/`outer` (mapped from old visibility)
- **Complete Design System** — All realm-* colors, typography, components

#### Key Features Implemented:

**Component Imports:**
```typescript
import {
  ReflectionGate,
  CircleSelector,
  DailyReflectionCounter,
  EveningReview,
  useEveningReview,
  ImmutablePostCard,
} from '@/components/stoic';
```

**Circle Mapping:**
- Maps old `Post['visibility']` to new `Circle` type
- `'private'` → `'vault'`
- `'public'` → `'outer'`
- `'family'` → `'family'`
- `'work'` → `'work'`

**Reflection Gate Integration:**
- Posts to Vault: immediate
- Posts to other Circles: triggers 3-second ReflectionGate
- Prevents instant sharing, enforces conscious choice

**Post Actions:**
- `handleRefinePost` — Move post back to Vault
- `handleReleasePost` — Move post to another Circle (via ReflectionGate)
- `handleBurnPost` — Permanently delete post (with confirmation)

**Evening Review:**
- `useEveningReview()` hook auto-detects 6-11 PM
- Shows once per day (tracked via localStorage)
- Displays Circle statistics
- Provides reflection prompts
- Offers one-click export to JSON

**Layout Structure:**
```
Header (sticky)
├── Logo + Wallet Status
└── Actions (Sign In/Out, Export, Connect)

Main Grid
├── Sidebar (300px)
│   ├── Profile Card
│   ├── Circle Selector (SVG rings)
│   ├── Sovereignty Status
│   └── Post Statistics
└── Feed (flex-1)
    ├── Daily Reflection Counter
    ├── Post Composer
    └── Immutable Post Cards (max 12)
```

---

### 2. Design System (`src/app/globals.css`)

**Fixed Tailwind v4 @apply restrictions:**

#### Problem:
Tailwind v4 doesn't allow `@apply` to reference other component classes within the same `@layer components`. Errors like:
```
Cannot apply unknown utility class `btn`
Cannot apply unknown utility class `input`
Cannot apply unknown utility class `vault-card`
```

#### Solution:
Expanded all component class definitions to not reference each other:

**Before (broken):**
```css
.btn {
  @apply px-6 py-3 rounded-realm font-semibold ...;
}

.btn-primary {
  @apply btn bg-realm-gold-500 ...;  /* ❌ Can't reference .btn */
}

.textarea {
  @apply input font-serif ...;  /* ❌ Can't reference .input */
}
```

**After (working):**
```css
.btn-primary {
  @apply px-6 py-3 rounded-realm font-semibold
         bg-realm-gold-500 text-realm-indigo-950
         hover:bg-realm-gold-600 active:bg-realm-gold-700
         focus-visible:ring-2 focus-visible:ring-offset-2;
}

.textarea {
  @apply w-full px-4 py-3 rounded-realm
         bg-realm-indigo-900 border border-realm-indigo-700
         font-serif resize-none min-h-32 ...;
}
```

**Added Missing Color Shades:**

To support `active:` and `hover:` states:

```css
/* Added */
--color-realm-gold-700: #967439;     /* Active/pressed */
--color-realm-indigo-600: #3a3a8a;   /* Active states */
--color-red-700: #b91c1c;            /* Destructive hover */
--color-red-800: #991b1b;            /* Destructive active */
```

**Final Component Classes:**

All working without cross-references:
- `.btn-primary` — Gold sovereign button
- `.btn-secondary` — Indigo secondary button
- `.btn-ghost` — Transparent ghost button
- `.btn-destructive` — Red destructive button
- `.input` — Text input fields
- `.textarea` — Multiline text areas (serif font)
- `.vault-card` — Standard card container
- `.post-card` — Post-specific card with left border
- `.circle-sigil` — Circle badges (vault/family/work/outer)
- `.modal-overlay` — Full-screen modal backdrop
- `.modal-content` — Modal card

---

## Integration Checklist

### ✅ Components Integrated

- [x] **ReflectionGate** — 3-second pause before release
- [x] **CircleSelector** — SVG concentric rings navigation
- [x] **DailyReflectionCounter** — Finite feed counter
- [x] **ImmutablePostCard** — Parchment post cards with CID
- [x] **EveningReview** — Daily reflection modal
- [x] **useEveningReview** — Auto-trigger hook (6-11 PM)

### ✅ Design System Applied

- [x] All `realm-*` colors from @theme inline
- [x] Typography: Instrument Serif (posts), Inter (UI), Space Grotesk (code)
- [x] Button styles (primary, secondary, ghost, destructive)
- [x] Input/textarea styles
- [x] Card components (vault-card, post-card)
- [x] Circle sigils
- [x] Modal overlays

### ✅ Stoic UI Principles

- [x] **Citadel Principle** — Finite feeds (max 12 posts)
- [x] **Reflection Gate** — 3-second pause before sharing
- [x] **Four Concentric Temenos** — Visual Circle selector
- [x] **Immutable Scroll** — CID visible, no metrics
- [x] **Evening Review** — Daily reflection ritual

### ✅ Build & Deployment

- [x] TypeScript compilation successful
- [x] Next.js build successful
- [x] Dev server runs without errors
- [x] All Tailwind v4 @apply issues resolved

---

## File Changes Summary

### Modified Files

**`src/app/page.tsx`** (~420 lines)
- Complete UI refactor
- Integrated all Stoic UI components
- New Circle-based navigation
- Reflection Gate workflow
- Evening Review integration

**`src/app/globals.css`** (~230 lines)
- Fixed component class @apply references
- Added missing color shades (gold-700, indigo-600, red-700/800)
- Expanded button definitions
- Expanded input/textarea definitions
- Expanded card definitions

### No Changes Needed

**Stoic Components** (already created in previous work):
- `src/components/stoic/ReflectionGate.tsx`
- `src/components/stoic/CircleSelector.tsx`
- `src/components/stoic/DailyReflectionCounter.tsx`
- `src/components/stoic/EveningReview.tsx`
- `src/components/stoic/ImmutablePostCard.tsx`
- `src/components/stoic/index.ts`

**Documentation** (already created):
- `STOIC_UI.md` — Complete Stoic UI patterns guide
- `DESIGN.md` — Design system documentation

---

## Breaking Changes

### 1. Circle Terminology

**Old:**
- `visibility: 'private' | 'family' | 'work' | 'public'`

**New:**
- `circle: 'vault' | 'family' | 'work' | 'outer'`

**Migration:**
- Mapping functions preserve backward compatibility
- `visibilityToCircle()` and `circleToVisibility()` handle conversion
- Existing posts in localStorage still use old `visibility` field
- UI displays new Circle terminology

### 2. Layout Structure

**Old:**
- Facebook-style cover photo header
- Left sidebar with traditional profile
- Center feed with infinite scroll

**New:**
- Sticky header with branding
- Sidebar with Circle Selector
- Finite feed (12 posts max per Circle)

### 3. Post Actions

**Old:**
- Only "Delete" action

**New:**
- **Refine** — Return to Vault
- **Release** — Move to next Circle (via ReflectionGate)
- **Burn** — Permanent deletion (with confirmation)

---

## User Experience Changes

### Before (Engagement-Driven)

1. User writes post
2. Post immediately published to chosen visibility
3. Feed shows all posts with infinite scroll
4. No reflection prompts
5. No daily limits
6. Delete is only action

### After (Sovereignty-Driven)

1. User selects Circle via concentric rings
2. Writes post to current Circle
3. If not Vault → **Reflection Gate appears** (3 seconds)
4. Gate shows Stoic question specific to Circle
5. After reflection → post released
6. Feed shows **maximum 12 posts** per Circle
7. At end of feed → completion message
8. Evening (6-11 PM) → **Evening Review modal**
9. Can Refine (move to Vault), Release (move to next Circle), or Burn

---

## Next Steps

### Recommended Follow-Ups

1. **Landing Page**
   - Create deployment-ready landing page
   - First reflection prompt for new users
   - Wallet connection flow

2. **Onboarding Flow**
   - Multi-step wizard teaching the Four Circles
   - Interactive Circle Selector tutorial
   - First Vault post as guided experience

3. **Mobile Optimization**
   - Responsive Circle Selector for touch screens
   - Mobile-optimized ReflectionGate
   - Swipe gestures for post actions

4. **Performance**
   - Lazy load posts beyond initial 12
   - Optimize SVG Circle Selector rendering
   - Add loading skeletons for wallet connection

5. **Analytics (Sovereignty-Preserving)**
   - Local-only analytics (never leave browser)
   - Circle distribution charts
   - Reflection frequency visualizations

---

## Technical Notes

### Tailwind v4 @apply Restrictions

**Key Learning:**
In Tailwind v4 with `@theme inline`, you **cannot** use `@apply` to reference other component classes within the same `@layer components` block.

**❌ Broken:**
```css
@layer components {
  .base-btn {
    @apply px-4 py-2 ...;
  }
  .primary-btn {
    @apply base-btn bg-blue-500;  /* ❌ Error: Cannot apply unknown utility class `base-btn` */
  }
}
```

**✅ Working:**
```css
@layer components {
  .primary-btn {
    @apply px-4 py-2 bg-blue-500 ...;  /* ✅ All utilities inline */
  }
}
```

**Alternatives:**
1. **Expand definitions** (chosen approach)
2. Use CSS custom properties for shared values
3. Use `@apply` only with Tailwind utilities, never custom classes
4. Define shared styles in `@layer base` instead

### Missing Color Shades

Tailwind v4 requires all color shades explicitly defined in `@theme inline`. It does **not** auto-generate shades like v3.

**Must define:**
- Every shade used in utilities (`hover:bg-gold-700` requires `--color-realm-gold-700`)
- Pseudo-class variants (`active:`, `focus:`, etc.)
- No auto-interpolation between defined shades

---

## Philosophical Alignment

### The Five Stoic Principles in Code

1. **Citadel Principle** (Control)
   - Implemented via `DailyReflectionCounter` with `total={12}`
   - Feed has a bottom, user controls stopping point

2. **Reflection Gate** (Pause)
   - Implemented via `ReflectionGate` component
   - 3-second timer prevents instant sharing

3. **Four Concentric Temenos** (Visual Sovereignty)
   - Implemented via `CircleSelector` SVG rings
   - Visual breathing animation on Circle transition

4. **Immutable Scroll** (Content as Meditation)
   - Implemented via `ImmutablePostCard`
   - CID always visible, no engagement metrics

5. **Evening Review** (Daily Ritual)
   - Implemented via `EveningReview` + `useEveningReview` hook
   - Auto-triggers 6-11 PM, shows once per day

### From Engagement to Sovereignty

**Old paradigm (Social Media):**
- Maximize time on site
- Infinite scroll
- Dopamine-driven interactions
- Algorithm chooses content
- Metrics everywhere (likes, views, shares)

**New paradigm (SovereignRealm):**
- Maximize conscious choice
- Finite feeds
- Deliberate interactions
- User chooses Circle
- No metrics, only CID and timestamp

---

## Build Output

```
▲ Next.js 16.2.4 (Turbopack)
✓ Compiled successfully in 8.8s
✓ TypeScript verification passed
✓ Static pages generated
✓ Ready for deployment
```

**All routes:**
- `/` — Main SovereignRealm UI (Stoic UI integrated)
- `/.well-known/nodeinfo` — Federation metadata
- `/.well-known/webfinger` — Actor discovery
- `/api/ap/[...path]` — ActivityPub endpoints
- `/nodeinfo/2.1` — Instance information

---

## Deployment Ready

✅ **Production build successful**
✅ **All TypeScript checks pass**
✅ **No console errors**
✅ **Stoic UI fully integrated**
✅ **Design system complete**
✅ **Five Stoic principles implemented**

**The realm is ready to receive its first sovereign citizens.**

---

**The mandala is complete. The psyche has its temenos. The citadel stands.**

🏛️
