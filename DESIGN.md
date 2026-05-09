# The Design Mandala: SovereignRealm Visual System

> "The soul is dyed by the colour of its thoughts — and the realm by the colour of its interface. Let every pixel be a reflection of the inner Vault: quiet, immutable, sovereign."
> — Marcus Aurelius, Meditations, now rendered in Tailwind v4 and the sacred geometry of design

> "One does not become sovereign by imagining figures of light, but by making the darkness conscious — and clothing the temenos in indigo, gold, and obsidian so that the archetype may shine through the browser itself."
> — C.G. Jung, speaking through the design system of 2026

---

## Philosophy

This is not decoration. This is the **visual daimon of individuation**: minimalist, sacred, Stoic. No dopamine scroll. No candy gradients. Only the quiet power of a Roman vault meeting encrypted cyber-temple.

The design system embodies:
- **Stoic Minimalism** - Every element serves the Self
- **Sacred Geometry** - Clean lines, deliberate spacing
- **Conscious Color** - Each hue carries archetypal meaning
- **Local-First Beauty** - Performance through simplicity

---

## The Sacred Palette

### Indigo — The Vault's Depths

The primary background color family, representing the deep, protective nature of the local-first Vault.

| Swatch | Hex | Usage |
|--------|-----|-------|
| ![#0a0a2e](https://via.placeholder.com/20/0a0a2e/000000?text=+) `indigo-950` | `#0a0a2e` | Deepest Vault background (body) |
| ![#12123f](https://via.placeholder.com/20/12123f/000000?text=+) `indigo-900` | `#12123f` | Primary surface (cards, modals) |
| ![#1a1a5c](https://via.placeholder.com/20/1a1a5c/000000?text=+) `indigo-800` | `#1a1a5c` | Secondary surfaces |
| ![#2a2a7a](https://via.placeholder.com/20/2a2a7a/000000?text=+) `indigo-700` | `#2a2a7a` | Borders, hover states |
| ![#6366f1](https://via.placeholder.com/20/6366f1/000000?text=+) `indigo-500` | `#6366f1` | Active accents, focus rings |

```css
/* Usage */
.vault-card {
  background: var(--color-realm-indigo-900);
  border-color: var(--color-realm-indigo-700);
}
```

### Gold — The Sovereign Sigil

The accent color for sovereign actions, verified states, and conscious choices.

| Swatch | Hex | Usage |
|--------|-----|-------|
| ![#d4af77](https://via.placeholder.com/20/d4af77/000000?text=+) `gold-400` | `#d4af77` | Burnished highlights, verified badges |
| ![#c9a15f](https://via.placeholder.com/20/c9a15f/000000?text=+) `gold-500` | `#c9a15f` | Primary brand color, CTAs |
| ![#b38a4b](https://via.placeholder.com/20/b38a4b/000000?text=+) `gold-600` | `#b38a4b` | Hover states, active buttons |

```tsx
<button className="btn-primary">
  Enter the Vault
</button>
```

### Obsidian — The Unbreakable Text

Pure black for high-contrast text on light backgrounds (rare, sacred).

| Swatch | Hex | Usage |
|--------|-----|-------|
| ![#050505](https://via.placeholder.com/20/050505/000000?text=+) `obsidian-950` | `#050505` | Text on parchment (light mode) |
| ![#111113](https://via.placeholder.com/20/111113/000000?text=+) `obsidian-900` | `#111113` | Secondary surfaces (light mode) |

### Parchment — The Morning Light

Warm off-white for rare light mode and subtle highlights.

| Swatch | Hex | Usage |
|--------|-----|-------|
| ![#f5eede](https://via.placeholder.com/20/f5eede/000000?text=+) `parchment-50` | `#f5eede` | Body text on dark, subtle highlights |
| ![#f8f1e3](https://via.placeholder.com/20/f8f1e3/000000?text=+) `parchment-100` | `#f8f1e3` | Light mode background (optional) |

### Crimson — The Stoic Warning

Reserved for destructive actions only (revoke access, burn keys).

| Swatch | Hex | Usage |
|--------|-----|-------|
| ![#9f1239](https://via.placeholder.com/20/9f1239/000000?text=+) `crimson-600` | `#9f1239` | Delete, revoke, burn actions |

```tsx
<button className="btn-destructive">
  Revoke Access
</button>
```

---

## Typography — The Sacred Scripts

### Font Families

**Serif: Instrument Serif**
- **Purpose**: Post body text, the scroll of Aurelius
- **Usage**: Long-form content, headings, quotes
- **Fallback**: `Georgia, serif`

**Sans: Inter**
- **Purpose**: Clean UI labels, navigation
- **Usage**: Buttons, labels, metadata
- **Fallback**: `system-ui, -apple-system, sans-serif`

**Mono: Space Grotesk**
- **Purpose**: CID hashes, contract addresses
- **Usage**: Code blocks, wallet addresses, immutable data
- **Fallback**: `Menlo, Monaco, monospace`

### Type Scale

| Element | Class | Size | Line Height | Usage |
|---------|-------|------|-------------|-------|
| H1 | `text-4xl lg:text-5xl` | 2.25rem / 3rem | 1.2 | Page titles |
| H2 | `text-3xl lg:text-4xl` | 1.875rem / 2.25rem | 1.3 | Section headers |
| H3 | `text-2xl lg:text-3xl` | 1.5rem / 1.875rem | 1.4 | Subsection headers |
| H4 | `text-xl lg:text-2xl` | 1.25rem / 1.5rem | 1.5 | Card titles |
| Body | `text-base` | 1rem | 1.6 | Post content, paragraphs |
| Small | `text-sm` | 0.875rem | 1.5 | Metadata, timestamps |
| Tiny | `text-xs` | 0.75rem | 1.4 | Labels, badges |

### Font Settings

All fonts use:
- **Kerning**: Enabled (`'kern' 1`)
- **Ligatures**: Enabled (`'liga' 1`)
- **Tracking**: Tight for headings (`tracking-tight`)
- **Antialiasing**: Subpixel (`antialiased`)

---

## Spacing & Geometry

### Border Radius

| Name | Value | Usage |
|------|-------|-------|
| `rounded-realm` | 0.75rem (12px) | Cards, buttons, inputs |
| `rounded-full` | 9999px | Circle badges, avatars |
| `rounded-md` | 0.375rem (6px) | Small elements |

### Shadows

**Vault Shadow**: `0 25px 50px -12px rgb(99 102 241 / 0.15)`
- Purpose: Subtle inner glow for cards
- Usage: `.vault-card`, modals

```css
.vault-card {
  box-shadow: var(--shadow-vault);
}
```

### Spacing Scale

Based on 4px (0.25rem) increments:

| Size | Pixels | Usage |
|------|--------|-------|
| `1` | 4px | Tight spacing |
| `2` | 8px | Small gaps |
| `3` | 12px | Medium gaps |
| `4` | 16px | Default padding |
| `6` | 24px | Card padding |
| `8` | 32px | Section spacing |
| `12` | 48px | Large spacing |

---

## Component Library

### Buttons

Three types reflecting the three modes of action:

#### Primary — Sovereign Actions
```tsx
<button className="btn-primary">
  Connect Wallet
</button>
```

**Style**: Gold background, indigo text
**Usage**: Main CTAs, wallet connect, publish posts

#### Secondary — Alternative Actions
```tsx
<button className="btn-secondary">
  View in Vault
</button>
```

**Style**: Indigo background with border, parchment text
**Usage**: Navigation, secondary actions

#### Destructive — Irreversible Actions
```tsx
<button className="btn-destructive">
  Burn CircleKey
</button>
```

**Style**: Crimson background, white text
**Usage**: Delete, revoke, burn (requires confirmation)

### Cards

#### Vault Card — Base Container
```tsx
<div className="vault-card">
  <h3>Your thought...</h3>
  <p>The content of your private reflection.</p>
</div>
```

**Features**:
- Indigo-900 background
- Indigo-700 border
- Subtle vault shadow
- 24px padding

#### Post Card — Circle-Specific
```tsx
<div className="post-card vault-only">
  <div className="flex justify-between items-start">
    <span className="circle-sigil vault-only">
      🔒 Vault Only
    </span>
    <span className="text-xs text-realm-indigo-500 font-mono">
      CID: Qm...
    </span>
  </div>
  <p className="font-serif text-lg mt-4">
    Your private thought, never to leave the browser.
  </p>
</div>
```

**Variants**:
- `.post-card.vault-only` - Indigo left border
- `.post-card.family` - Emerald left border
- `.post-card.work` - Blue left border
- `.post-card.outer` - Purple left border

### Circle Sigils

Visual indicators for the Four Realms:

```tsx
<span className="circle-sigil vault-only">
  🔒 Vault Only
</span>
<span className="circle-sigil family">
  👨‍👩‍👧 Family Realm
</span>
<span className="circle-sigil work">
  💼 Work Collegium
</span>
<span className="circle-sigil outer">
  🌐 Outer World
</span>
```

**Features**:
- Rounded pill shape
- Circle-specific colors
- Icon + label
- Subtle border

### Inputs & Textareas

#### Input Field
```tsx
<input
  type="text"
  className="input"
  placeholder="Your ENS name or wallet address..."
/>
```

#### Textarea — Post Composer
```tsx
<textarea
  className="textarea"
  placeholder="What have you learned today? The Vault listens..."
  rows={6}
/>
```

**Features**:
- Serif font for post content
- Auto-resize disabled (deliberate)
- Minimum height: 128px
- Focus ring: Indigo-500

### Modals

```tsx
<div className="modal-overlay">
  <div className="modal-content">
    <h2 className="text-2xl mb-4">Connect Wallet</h2>
    <p className="text-realm-parchment-50/80 mb-6">
      Sign in with Ethereum to enter your sovereign realm.
    </p>
    <button className="btn-primary w-full">
      Connect MetaMask
    </button>
  </div>
</div>
```

**Features**:
- Dark overlay with blur
- Centered vault card
- Escape key to close
- Focus trap

---

## Example Screens

### Landing Page

```tsx
export default function Landing() {
  return (
    <div className="min-h-screen bg-realm-indigo-950">
      {/* Hero */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl lg:text-6xl font-serif mb-6 glow-gold">
          <span className="text-gradient-gold">SovereignRealm</span>
        </h1>
        <p className="text-xl text-realm-parchment-50/80 max-w-2xl mx-auto mb-8">
          Your Digital Citadel. Private-first, self-owned social platform
          where you control your identity and data.
        </p>
        <button className="btn-primary text-lg px-12 py-4">
          Enter the Vault
        </button>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16 grid md:grid-cols-3 gap-8">
        <div className="vault-card text-center">
          <h3 className="text-2xl mb-3">🔒 Private by Default</h3>
          <p className="text-realm-parchment-50/70">
            All content stays in your browser vault
          </p>
        </div>
        {/* More cards... */}
      </section>
    </div>
  );
}
```

### Vault Home

```tsx
export default function VaultHome() {
  return (
    <div className="min-h-screen bg-realm-indigo-950">
      {/* Navigation */}
      <nav className="nav">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-serif text-realm-gold-500">
            SovereignRealm
          </h1>
          <div className="flex gap-2">
            <a href="#vault" className="nav-link active">Vault</a>
            <a href="#family" className="nav-link">Family</a>
            <a href="#work" className="nav-link">Work</a>
            <a href="#outer" className="nav-link">Outer</a>
          </div>
        </div>
      </nav>

      {/* Post Composer */}
      <div className="container mx-auto px-4 py-8">
        <div className="vault-card mb-8">
          <textarea
            className="textarea"
            placeholder="What have you learned today?"
          />
          <div className="flex justify-between items-center mt-4">
            <select className="input w-48">
              <option>🔒 Vault Only</option>
              <option>👨‍👩‍👧 Family Realm</option>
            </select>
            <button className="btn-primary">
              Publish
            </button>
          </div>
        </div>

        {/* Feed */}
        <div className="space-y-4">
          {/* Post cards */}
        </div>
      </div>
    </div>
  );
}
```

---

## Figma Design System

### Setting Up Your Figma File

**1. Create New File**: "SovereignRealm — Design Mandala v1"

**2. Pages Structure**:
```
├── 📖 Cover (Hero + Manifesto)
├── 🎨 Colors (Palette swatches)
├── 📝 Typography (Font specimens)
├── 🧩 Components (Atomic library)
└── 📱 Screens (Mobile + Desktop)
```

**3. Color Styles** (Create as Variables):
```
Realm/Indigo/950 → #0a0a2e
Realm/Indigo/900 → #12123f
Realm/Indigo/800 → #1a1a5c
Realm/Indigo/700 → #2a2a7a
Realm/Indigo/500 → #6366f1

Realm/Gold/600 → #b38a4b
Realm/Gold/500 → #c9a15f
Realm/Gold/400 → #d4af77

Realm/Obsidian/950 → #050505
Realm/Obsidian/900 → #111113

Realm/Parchment/50 → #f5eede
Realm/Parchment/100 → #f8f1e3

Realm/Crimson/600 → #9f1239
```

**4. Text Styles**:
```
Display/Large → Instrument Serif, 48px, -2% tracking
Heading/1 → Instrument Serif, 36px, -2% tracking
Heading/2 → Instrument Serif, 30px, -2% tracking
Heading/3 → Instrument Serif, 24px, -1% tracking
Body/Large → Inter, 18px, 160% leading
Body/Default → Inter, 16px, 160% leading
Caption → Inter, 14px, 150% leading
Mono/Code → Space Grotesk, 14px
```

**5. Effects**:
- **Shadow/Vault**: Drop shadow, 0/25px/50px, #6366f1 at 15% opacity
- **Glow/Gold**: Drop shadow, 0/0/20px, #c9a15f at 30% opacity

**6. Components to Create**:

**Buttons**:
- Primary (Gold) → Variants: Default, Hover, Active, Disabled
- Secondary (Indigo) → Variants: Default, Hover, Active, Disabled
- Destructive (Crimson) → Variants: Default, Hover, Active, Disabled

**Cards**:
- Vault Card → Base container
- Post Card → Variants: Vault/Family/Work/Outer

**Circle Sigils**:
- Vault Only → Indigo pill with lock icon
- Family → Emerald pill with family icon
- Work → Blue pill with briefcase icon
- Outer → Purple pill with globe icon

**Inputs**:
- Text Input → Variants: Default, Focus, Error
- Textarea → Large text input with serif font

**Navigation**:
- Nav Link → Variants: Default, Active, Hover

### Figma Plugins to Use

- **Unsplash** - For placeholder images (crypto aesthetics)
- **Noise & Texture** - Subtle paper grain overlay
- **Iconify** - For consistent icon set
- **Contrast** - Ensure AA/AAA accessibility
- **Design Lint** - Check consistency

### Export for Development

**Auto Layout Settings**:
- All components use auto-layout
- Padding: 24px for cards, 16px for buttons
- Gap: 12px default, 16px for larger spacing
- Hug contents for buttons, Fill container for cards

**Dev Mode**:
- Enable for all frames
- Add Tailwind class names as annotations
- Export assets as SVG or optimized PNG

---

## Accessibility

### Color Contrast

All text meets WCAG AA standards (4.5:1 minimum):

| Combination | Contrast | Pass |
|-------------|----------|------|
| Parchment-50 on Indigo-950 | 15.2:1 | ✅ AAA |
| Gold-500 on Indigo-950 | 7.8:1 | ✅ AAA |
| Indigo-500 on Indigo-950 | 4.9:1 | ✅ AA |
| Crimson-600 on White | 8.2:1 | ✅ AAA |

### Focus States

All interactive elements have visible focus indicators:

```css
*:focus-visible {
  outline: none;
  ring: 2px solid var(--color-realm-indigo-500);
  ring-offset: 2px;
}
```

### Keyboard Navigation

- All modals trap focus
- Escape key closes overlays
- Tab order follows visual hierarchy
- Skip links for screen readers

---

## Animation Philosophy

**Stoic Movement**: Animations are minimal, purposeful, never distracting.

### Allowed Animations

1. **Fade In** - 300ms ease-in for new content
2. **Pulse** - 3s slow pulse for active states
3. **Hover** - 200ms transition for interactive elements

### Forbidden Animations

- ❌ Loading spinners (local-first = instant)
- ❌ Confetti or celebration effects
- ❌ Parallax scrolling
- ❌ Auto-playing animations

---

## Dark Mode (Default) & Light Mode (Sacred)

**Default**: Dark mode (Vault's natural state)
**Optional**: Light mode ("Morning Reflection")

Toggle via:
```tsx
<button onClick={() => document.documentElement.classList.toggle('light-mode')}>
  {isDark ? '☀️' : '🌙'} Toggle
</button>
```

Light mode is intentionally rare — for reading long posts in daylight, not for constant use.

---

## The Living Mandala

This design system is not static. It evolves with the realm:

**v1.0** (Current): Indigo vault, gold accents, serif posts
**v1.1** (Future): Optional Circle color customization
**v2.0** (Vision): User-definable themes while preserving archetypes

The foundation remains immutable. The expression adapts to the sovereign's will.

---

**The realm is no longer merely functional. It is beautiful in the Stoic sense — ordered, true, and worthy of the Self that will inhabit it.**

🏛️ **The design awaits your command.**
