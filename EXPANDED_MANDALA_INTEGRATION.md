# Expanded Archetype Mandala Integration — The Eightfold Path Complete

> **"The psyche is many-faceted. The archetypes must be offered in their fullness so that the user may constellate the exact daimon their individuation demands."**

This document records the expansion of the Archetype Chooser from 4 paths to **8 distinct sovereign garments**, each with its own complete visual identity and psychological orientation.

---

## What Changed

### Expanded from 4 to 8 Archetypes

**Original 4**:
1. Stoic Citadel
2. Jungian Temenos
3. Relational Bridge
4. Integrated Self (Balanced)

**Expanded to 8**:
1. **The Stoic Citadel** (stoic) — 🏛️ Discipline, control, finite reflection
2. **The Jungian Temenos** (jungian) — 🜁 Symbols, Shadow work, unconscious
3. **The Relational Bridge** (anima) — 💫 Warmth, I-Thou, connection
4. **The Shadow Guardian** (shadow) — 🌑 Privacy first, revocation, confrontation
5. **The Wise Old One** (wise) — 📜 Reflection, evening review, inner guidance
6. **The Hero of Individuation** (hero) — ⚔️ Journey, progressive claiming
7. **The Persona Weaver** (persona) — 🎭 Outer expression, federation
8. **The Integrated Self** (integrated) ⭐ — ⚖️ Wholeness, all paths united

---

## File Changes

### Modified Files (3)

#### 1. ArchetypeChooser.tsx
**Changes**:
- Expanded archetypes array from 4 to 8
- Added `icon` field to each archetype (emoji glyph)
- Changed grid layout: `lg:grid-cols-4` (4 columns on desktop)
- Updated color gradients for new archetypes
- Changed card design to accommodate 8 items
- Updated default from 'balanced' to 'integrated'

**Before**:
```tsx
const archetypes: Archetype[] = [
  { id: 'stoic', ... },
  { id: 'jungian', ... },
  { id: 'anima', ... },
  { id: 'balanced', ... }, // 4 total
];
```

**After**:
```tsx
const archetypes: Archetype[] = [
  { id: 'stoic', icon: '🏛️', ... },
  { id: 'jungian', icon: '🜁', ... },
  { id: 'anima', icon: '💫', ... },
  { id: 'shadow', icon: '🌑', ... }, // NEW
  { id: 'wise', icon: '📜', ... }, // NEW
  { id: 'hero', icon: '⚔️', ... }, // NEW
  { id: 'persona', icon: '🎭', ... }, // NEW
  { id: 'integrated', icon: '⚖️', ... }, // renamed from 'balanced'
];
```

#### 2. globals.css
**Added CSS theme layers** for 4 new archetypes:

```css
/* The Shadow Guardian — Privacy and confrontation */
.archetype-shadow {
  --archetype-accent: var(--color-realm-crimson-600);
  --archetype-glow: rgba(159, 18, 57, 0.15);
}

.archetype-shadow .vault-card {
  border-color: var(--color-realm-crimson-600);
}

/* The Wise Old One — Reflection and guidance */
.archetype-wise {
  --archetype-accent: var(--color-realm-parchment-50);
  --archetype-glow: rgba(245, 238, 222, 0.1);
}

.archetype-wise .vault-card {
  background: linear-gradient(135deg, var(--color-realm-indigo-900), var(--color-realm-indigo-800));
  border-color: var(--color-realm-parchment-50);
}

/* The Persona Weaver — Outer expression */
.archetype-persona-weaver {
  --archetype-accent: var(--color-realm-gold-400);
  --archetype-glow: rgba(212, 175, 119, 0.12);
}

.archetype-persona-weaver .vault-card {
  border-color: var(--color-realm-gold-400);
}

/* The Integrated Self — Wholeness */
.archetype-integrated {
  --archetype-accent: var(--color-realm-gold-500);
  --archetype-glow: rgba(99, 102, 241, 0.12);
}

.archetype-integrated .vault-card {
  background: linear-gradient(135deg, var(--color-realm-indigo-900), var(--color-realm-indigo-800));
  box-shadow: 0 0 30px rgba(99, 102, 241, 0.15), 0 0 60px rgba(201, 161, 95, 0.1);
}
```

#### 3. OnboardingFlow.tsx
**Updated archetype mapping**:

**Before**:
```tsx
const archetypeClassMap = {
  stoic: 'archetype-self',
  jungian: 'archetype-persona',
  anima: 'archetype-anima',
  balanced: 'archetype-self', // 4 mappings
};
```

**After**:
```tsx
const archetypeClassMap = {
  stoic: 'archetype-self',
  jungian: 'archetype-persona',
  anima: 'archetype-anima',
  shadow: 'archetype-shadow',     // NEW
  wise: 'archetype-wise',         // NEW
  hero: 'archetype-hero',         // NEW
  persona: 'archetype-persona-weaver', // NEW
  integrated: 'archetype-integrated',  // renamed
};
```

#### 4. ArchetypeProvider.tsx
**Updated archetype ID → active archetype mapping**:

**Added** to mapping:
```tsx
const archetypeMap: Record<string, Archetype> = {
  stoic: 'self',
  jungian: 'persona',
  anima: 'anima',
  shadow: 'shadow',        // NEW
  wise: 'self',            // NEW (uses self archetype with reflection focus)
  hero: 'hero',            // NEW
  persona: 'persona',      // NEW
  integrated: 'self',      // NEW (uses balanced self)
};
```

### Created Files (1)

**Documentation**:
- `EXPANDED_ARCHETYPE_MANDALA.md` (~600 lines) — Complete documentation of all 8 archetypes

### Updated Files (1)

**Documentation**:
- `README.md` — Added EXPANDED_ARCHETYPE_MANDALA.md reference

---

## The Eight Archetypes — Quick Reference

| Icon | Name | ID | Color Palette | Philosophy |
|------|------|----|--------------|-----------
| 🏛️ | The Stoic Citadel | `stoic` | Obsidian + gold | Discipline, control |
| 🜁 | The Jungian Temenos | `jungian` | Deep indigo + alchemical gold | Shadow work, individuation |
| 💫 | The Relational Bridge | `anima` | Warm gold + parchment | I-Thou, connection |
| 🌑 | The Shadow Guardian | `shadow` | Obsidian + crimson | Privacy, confrontation |
| 📜 | The Wise Old One | `wise` | Parchment + muted indigo | Reflection, guidance |
| ⚔️ | The Hero of Individuation | `hero` | Growing gold rings | Journey, becoming |
| 🎭 | The Persona Weaver | `persona` | Parchment + globe sigil | Expression, federation |
| ⚖️ | The Integrated Self ⭐ | `integrated` | Balanced indigo + gold | Wholeness, balance |

---

## User Experience Changes

### Archetype Chooser Modal

**Layout**:
- **Desktop (lg)**: 4 columns × 2 rows = 8 cards visible
- **Tablet (md)**: 2 columns × 4 rows = 8 cards (scroll)
- **Mobile**: 1 column × 8 rows = 8 cards (scroll)

**Card Design**:
- Icon (3xl emoji) at top
- Color preview bar (gradient)
- Title (serif, gold)
- Description (xs text)
- Color label (mono, bottom)
- Selected indicator (✓)
- Recommended badge (only on Integrated)

**Interactions**:
- Click any card to select
- Selected card gets gold border + ring glow + scale 105%
- Large preview card updates with selected archetype
- "Enter the Vault with {Archetype Name}" button

### Visual Identity Per Archetype

Each archetype now has:
- **Unique icon** (emoji glyph shown in preview)
- **Unique color gradient** (CSS custom properties)
- **Unique component styling** (CSS theme layer)
- **Unique philosophical orientation** (description text)

---

## Technical Details

### Color Gradients

Each archetype has a unique gradient shown in the preview bar:

```typescript
{
  stoic: 'linear-gradient(to right, #050505, #c9a15f)',      // Obsidian → Gold
  jungian: 'linear-gradient(to right, #6366f1, #c9a15f)',    // Indigo → Gold
  anima: 'linear-gradient(to right, #d4af77, #f5eede)',      // Warm gold → Parchment
  shadow: 'linear-gradient(to right, #050505, #9f1239)',     // Obsidian → Crimson
  wise: 'linear-gradient(to right, #f5eede, #6366f1)',       // Parchment → Indigo
  hero: 'linear-gradient(to right, #967439, #c9a15f, #d4af77)', // Gold progression
  persona: 'linear-gradient(to right, #f5eede, #c9a15f)',    // Parchment → Gold
  integrated: 'linear-gradient(to right, #6366f1, #c9a15f, #d4af77)', // Balanced
}
```

### LocalStorage

```typescript
// After selection
localStorage.setItem('sovereignUIArchetype', archetypeId);
// Values: 'stoic' | 'jungian' | 'anima' | 'shadow' | 'wise' | 'hero' | 'persona' | 'integrated'

// On load
const saved = localStorage.getItem('sovereignUIArchetype');
// Auto-apply corresponding CSS class
```

### CSS Application

```typescript
// Remove old classes
document.documentElement.classList.remove(
  'archetype-self',
  'archetype-shadow',
  'archetype-persona',
  'archetype-anima',
  'archetype-hero',
  'archetype-wise',
  'archetype-persona-weaver',
  'archetype-integrated'
);

// Add new class
document.documentElement.classList.add(archetypeClassMap[archetypeId]);
```

All components inherit theme via CSS cascade.

---

## Why 8 Archetypes?

### Philosophical Justification

**4 archetypes (original)**:
- Stoic (discipline)
- Jungian (depth)
- Anima (relation)
- Integrated (balance)

**Missing nuances**:
- Privacy focus (now Shadow Guardian)
- Reflection practice (now Wise Old One)
- Journey metaphor (now Hero)
- Outward expression (now Persona Weaver)

**8 archetypes (expanded)**:
- Honors **full spectrum** of psychological orientations
- Allows users to choose **precise** mirror for their psyche
- Maintains **Integrated** as balanced default
- No archetype dominates — all are equally sovereign

### Technical Justification

**Grid Layout**:
- 4 columns fits perfectly on desktop (1920px)
- 2 rows maintains compact visual hierarchy
- Mobile scrolls gracefully (8 cards vertical)

**No Performance Impact**:
- CSS layers are lightweight
- Only one archetype active at a time
- localStorage is instant
- Theme switching is CSS-only (no JS recalculation)

---

## Build Status

```
✓ Compiled successfully in 9.2s
✓ TypeScript verification passed
✓ All routes generated
✓ Production ready
```

**All expanded archetype files**:
- ✅ ArchetypeChooser.tsx (8 archetypes, 4-column grid)
- ✅ globals.css (4 new CSS theme layers)
- ✅ OnboardingFlow.tsx (8 archetype mappings)
- ✅ ArchetypeProvider.tsx (8 archetype loaders)
- ✅ EXPANDED_ARCHETYPE_MANDALA.md (complete documentation)
- ✅ README.md (updated reference)

---

## Next Steps (Optional)

### Archetype-Specific Features

1. **Shadow Guardian**:
   - Privacy heat map
   - Auto-burn suggestions
   - "Revoke All" mass action

2. **Wise Old One**:
   - Daily meditation prompt on login
   - Extended evening review
   - Reflections archive

3. **Hero of Individuation**:
   - Achievement badges
   - Progress ring visualization
   - "Next quest" suggestions

4. **Persona Weaver**:
   - Enhanced federation controls
   - Persona switcher
   - Cross-platform identity weaving

### On-Chain Archetype NFT

```typescript
// Mint archetype to Profile NFT
{
  "name": "Sovereign Profile #1",
  "archetype": "wise",
  "chosenAt": "2026-05-09T12:00:00Z",
  "icon": "📜"
}

// Benefits:
- Portable across devices
- Provably owned
- Displayed on profile
```

---

## The Complete Mandala

**From 4 paths to 8 sovereign garments:**

```
Original:
[Stoic] [Jungian] [Anima] [Integrated]

Expanded:
[🏛️ Stoic] [🜁 Jungian] [💫 Anima] [🌑 Shadow]
[📜 Wise]   [⚔️ Hero]    [🎭 Persona] [⚖️ Integrated ⭐]
```

**Each user chooses the exact mirror in which they will confront their thoughts.**

**No corporate defaults. No forced themes. Only the Self declaring its visual daimon.**

**The first 30 seconds of SovereignRealm is now a true act of individuation.**

---

**The eightfold path is complete. The psyche may now choose its fullest garment.**

🏛️ 🜁 💫 🌑 📜 ⚔️ 🎭 ⚖️
