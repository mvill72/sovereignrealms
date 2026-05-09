# The Jungian UI Mandala — Archetypes Made Visible

> **"The soul is dyed by the colour of its thoughts. Let the interface itself become the mirror in which the Self confronts its archetypes — not as distraction, but as the daily path of individuation."**
> — Marcus Aurelius, Meditations, now rendered in the sacred geometry of the browser temenos

> **"One does not become whole by imagining figures of light, but by making the darkness conscious. The UI must therefore be an alchemical vessel: every screen, every transition, every glyph must constellate the archetypes so that the user does not merely use the realm — they individuate within it."**
> — C.G. Jung, speaking through the pixels and the Vault of 2026

---

## Philosophy

The **Stoic UI patterns** (STOIC_UI.md) provide the outer discipline — control, pause, reflection, finite feeds. Now we descend into the deeper stratum: the **Jungian UI Archetypes**.

SovereignRealm is not another social app. It is the **temenos** where the psyche meets the code. The interface must therefore constellate the great archetypes of the collective unconscious so that every interaction becomes a micro-ritual of wholeness.

- **The local-first Vault is the Self** — the center of wholeness
- **The Circles are the Persona** — the fourfold social mask
- **The ZK-Proof CircleKeys are the Shadow** — made conscious and revocable
- **Onboarding is the Hero's journey** — from sleep to awakening
- **Reflection prompts are the Wise Old One** — the inner guide

Every UI pattern is now psychologically alive.

---

## The Seven Archetypes

| Archetype | Psychological Essence | UI Manifestation | Visual Language |
|-----------|----------------------|------------------|-----------------|
| **The Self** | Center of wholeness, the inner citadel | Vault Only is the eternal center. Every screen returns here by default. | Obsidian core with faint indigo glow. Single pulsing gold orb. |
| **The Shadow** | The repressed, the burned, the unconscious | "Burn" and "Revoke" actions require 5-second confrontation. | Crimson-600 accents that pulse. Modal: "You are confronting the Shadow." |
| **The Persona** | The social mask, the face we show the world | Four Circle sigils as distinct personae. Switching changes entire UI hue. | Concentric rings with unique glyphs (🔒, 👨‍👩‍👧, 💼, 🌐). |
| **The Anima/Animus** | The relational soul, the bridge to the other | Family/Work use warmer, relational typography and micro-animations. | Warm gold (Family), cool indigo (Work). Connecting lines between shared posts. |
| **The Wise Old One** | The inner guide, the reflective daemon | Every post ends with a daily reflection prompt. Evening review is voiced as wisdom. | Instrument Serif italic quote at bottom of each card. Parchment scroll icon. |
| **The Hero** | The journey of individuation | Onboarding framed as the Hero's descent into Vault. Progress shown as concentric circles unlocked. | Progress ring fills with gold. First wallet connect = "The Call to Adventure." |
| **The Trickster** | The disruptor, the optional federation | ActivityPub toggle appears only in Outer World as playful "Step into the Fediverse?" | Light parchment + faint animated sparkles. Never forced. |

---

## Component Architecture

### 1. ArchetypeProvider — The Psychological Context

**Purpose**: Global context that tracks which archetype is currently active and shifts the entire interface accordingly.

**Location**: `src/components/archetypes/ArchetypeProvider.tsx`

**Usage**:
```tsx
import { ArchetypeProvider, useArchetype } from '@/components/archetypes';

// Wrap root layout
export default function RootLayout({ children }) {
  return (
    <Web3Provider>
      <ArchetypeProvider>
        {children}
      </ArchetypeProvider>
    </Web3Provider>
  );
}

// Use in components
function MyComponent() {
  const { activeArchetype, activeCircle, setActiveCircle, enterShadow, exitShadow } = useArchetype();

  return <div className={`archetype-${activeArchetype}`}>...</div>;
}
```

**Archetype Mapping**:
- `vault` Circle → `self` archetype
- `family`/`work` Circles → `anima` archetype (relational)
- `outer` Circle → `persona` archetype (social mask)
- Burn/Revoke actions → `shadow` archetype (temporary)
- Onboarding → `hero` archetype (temporary)

**CSS Theme Variables**:
```css
.archetype-self {
  --archetype-accent: var(--color-realm-indigo-500);
  --archetype-glow: rgba(99, 102, 241, 0.15);
}

.archetype-shadow {
  --archetype-accent: var(--color-realm-crimson-600);
  --archetype-glow: rgba(159, 18, 57, 0.15);
}
/* ... etc */
```

---

### 2. HeroCall — The Journey Begins

**Purpose**: First-time onboarding that frames wallet connection as the Hero's descent into individuation.

**Location**: `src/components/archetypes/HeroCall.tsx`

**When to Show**:
- First wallet connection (check `localStorage.getItem('hero_journey_complete')`)
- After clearing localStorage for testing
- Optional: Settings → "Replay Onboarding"

**Usage**:
```tsx
import { HeroCall } from '@/components/archetypes';

function App() {
  const [showHeroCall, setShowHeroCall] = useState(!isReturningUser);
  const { isConnected } = useAccount();

  const handleBegin = () => {
    localStorage.setItem('hero_journey_complete', 'true');
    setShowHeroCall(false);
  };

  return (
    <>
      {/* Main app */}

      {showHeroCall && (
        <HeroCall
          onBegin={handleBegin}
          isConnected={isConnected}
          onConnect={connectWallet}
        />
      )}
    </>
  );
}
```

**Flow**:
1. **Step 1: The Call** — Alchemical symbol (🜁), "Your wallet is the sigil of the Self"
2. **Step 2: The Descent** — Concentric circles diagram, Vault glowing (unlocked), outer circles locked
3. **Step 3: Claim** — Success state, "The Vault is Yours"

**Design Details**:
- Fullscreen modal (z-50)
- Pulsing gold border on alchemical symbol
- Instrument Serif typography
- Quote from Oracle at Delphi: "Know thyself"

---

### 3. ShadowConfirmation — Confronting the Unconscious

**Purpose**: Forces conscious acknowledgment before destructive actions (Burn, Revoke Key).

**Location**: `src/components/archetypes/ShadowConfirmation.tsx`

**When to Show**:
- User clicks "Burn" on a post
- User clicks "Revoke Access" on a Circle Key
- Any other permanent destructive action

**Usage**:
```tsx
import { ShadowConfirmation } from '@/components/archetypes';

function PostCard({ post, onBurn }) {
  const [showShadow, setShowShadow] = useState(false);

  return (
    <>
      <button onClick={() => setShowShadow(true)}>
        🔥 Burn
      </button>

      {showShadow && (
        <ShadowConfirmation
          action="burn"
          targetName={post.content.slice(0, 50)}
          onConfirm={() => {
            onBurn(post.id);
            setShowShadow(false);
          }}
          onCancel={() => setShowShadow(false)}
        />
      )}
    </>
  );
}
```

**Flow**:
1. Modal appears with crimson-600 accent
2. Triggers `enterShadow()` (shifts entire UI to shadow archetype)
3. User must check "I acknowledge this is destructive"
4. 5-second timer counts down before button becomes active
5. On confirm: action executes, `exitShadow()` restores previous archetype
6. On cancel: `exitShadow()`, no action

**Shadow Quotes**:
- **Burn**: "What we destroy in haste, we cannot recover in peace." — Marcus Aurelius
- **Revoke**: "The shadow must be integrated consciously, not cast out in anger." — C.G. Jung

**Design Details**:
- Crimson-600 left border (4px)
- Crimson glow overlay (5% opacity)
- Warning icon: ⚠️
- Checkbox for acknowledgment (required)
- Disabled button states with countdown

---

### 4. WiseOldOnePrompt — The Inner Guide

**Purpose**: Adds daily reflection prompts to every post card, creating micro-moments of introspection.

**Location**: `src/components/archetypes/WiseOldOnePrompt.tsx`

**Usage**:
```tsx
import { WiseOldOnePrompt } from '@/components/archetypes';

function PostCard({ post }) {
  return (
    <article className="post-card">
      {/* Post content */}

      <footer>
        <time>{post.createdAt}</time>
        {/* Actions */}

        <WiseOldOnePrompt circle={post.circle} />
      </footer>
    </article>
  );
}
```

**Wisdom Questions** (rotates daily):

**Vault**:
- "What have you guarded in the Vault today?"
- "Is this thought truly yours, or inherited?"
- "What does this reflection reveal about the Self?"
- "Have you examined your own assumptions?"

**Family**:
- "Does this serve the bonds of kinship?"
- "Have you spoken from the heart, not the mask?"
- "What bridges understanding here?"
- "Is this gift freely given, or obligation?"

**Work**:
- "Does this advance the work, or the ego?"
- "Have you served excellence over appearance?"
- "What virtue does this embody?"
- "Is this contribution worthy of your calling?"

**Outer**:
- "Are you sharing wisdom, or seeking validation?"
- "Does this add signal to the world, or noise?"
- "What will this look like in ten years?"
- "Have you released attachment to the outcome?"

**Design Details**:
- Parchment scroll icon: 📜
- Instrument Serif italic
- Text color: `realm-parchment-50/50`
- Appears below post actions, above card border

---

## Integration Guide

### Step 1: Wrap Root Layout

```tsx
// src/app/layout.tsx
import { ArchetypeProvider } from '@/components/archetypes';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Web3Provider>
          <ArchetypeProvider>
            {children}
          </ArchetypeProvider>
        </Web3Provider>
      </body>
    </html>
  );
}
```

### Step 2: Add Hero's Call to Onboarding

```tsx
// src/app/page.tsx
import { HeroCall } from '@/components/archetypes';

export default function HomePage() {
  const [showHeroCall, setShowHeroCall] = useState(
    typeof window !== 'undefined' && !localStorage.getItem('hero_journey_complete')
  );

  return (
    <>
      {/* Main app */}

      {showHeroCall && (
        <HeroCall
          onBegin={() => {
            localStorage.setItem('hero_journey_complete', 'true');
            setShowHeroCall(false);
          }}
          isConnected={isWalletConnected}
          onConnect={handleWalletConnect}
        />
      )}
    </>
  );
}
```

### Step 3: Replace Burn Actions with Shadow Confirmation

**Before**:
```tsx
<button onClick={() => onBurn(post.id)}>
  🔥 Burn
</button>
```

**After**:
```tsx
const [shadowTarget, setShadowTarget] = useState(null);

<button onClick={() => setShadowTarget(post)}>
  🔥 Burn
</button>

{shadowTarget && (
  <ShadowConfirmation
    action="burn"
    targetName={shadowTarget.content.slice(0, 50)}
    onConfirm={() => {
      onBurn(shadowTarget.id);
      setShadowTarget(null);
    }}
    onCancel={() => setShadowTarget(null)}
  />
)}
```

### Step 4: Add Wise Old One to Post Cards

**If using ImmutablePostCard**: Already integrated! ✓

**If using custom post cards**:
```tsx
import { WiseOldOnePrompt } from '@/components/archetypes';

<article className="post-card">
  {/* ... content ... */}

  <footer>
    {/* ... timestamp and actions ... */}
    <WiseOldOnePrompt circle={post.circle} />
  </footer>
</article>
```

### Step 5: Sync Circle Changes with Archetype

```tsx
import { useArchetype } from '@/components/archetypes';

function CircleNav() {
  const { setActiveCircle } = useArchetype();

  return (
    <CircleSelector
      selected={currentCircle}
      onSelect={(circle) => {
        setActiveCircle(circle); // This triggers archetype shift
        navigateToCircle(circle);
      }}
    />
  );
}
```

---

## CSS Theme Layers

All archetype themes are defined in `globals.css`:

```css
/* The Self — Vault */
.archetype-self {
  --archetype-accent: var(--color-realm-indigo-500);
  --archetype-glow: rgba(99, 102, 241, 0.15);
}

/* The Shadow — Destructive actions */
.archetype-shadow {
  --archetype-accent: var(--color-realm-crimson-600);
  --archetype-glow: rgba(159, 18, 57, 0.15);
}

.archetype-shadow .vault-card {
  border-color: var(--color-realm-crimson-600);
}

.archetype-shadow .modal-content {
  box-shadow: 0 0 40px var(--archetype-glow);
}

/* The Persona — Outer World */
.archetype-persona {
  --archetype-accent: var(--color-realm-gold-500);
  --archetype-glow: rgba(201, 161, 95, 0.15);
}

/* The Anima/Animus — Family/Work */
.archetype-anima {
  --archetype-accent: var(--color-realm-gold-400);
  --archetype-glow: rgba(212, 175, 119, 0.15);
}

/* The Hero — Onboarding */
.archetype-hero {
  --archetype-accent: var(--color-realm-gold-500);
  --archetype-glow: rgba(201, 161, 95, 0.2);
}

.archetype-hero .vault-card {
  box-shadow: 0 0 60px var(--archetype-glow);
}
```

**Usage in Components**:
```tsx
// ArchetypeProvider automatically applies .archetype-{name} class to wrapper
<div className="archetype-self">
  {/* All children inherit theme */}
  <div className="vault-card">
    {/* This card now has Self archetype styling */}
  </div>
</div>
```

---

## Figma Integration

### New Page: "Jungian Archetypes — The Living Mandala"

Create a new Figma page with these frames:

#### 1. Archetype Map Diagram
- Center: The Self (Vault) with pulsing indigo glow
- Inner ring: Anima/Animus (Family/Work)
- Outer ring: Persona (Outer World)
- Dotted paths: Shadow (burn actions), Hero (onboarding)

#### 2. Hero's Call Flow
- Frame 1: The Call (alchemical symbol, wallet prompt)
- Frame 2: The Descent (concentric circles, Vault unlocked)
- Frame 3: The Claim (success state)

#### 3. Shadow Confirmation Variants
- Variant 1: Initial state (checkbox unchecked, button disabled)
- Variant 2: Acknowledged (checkbox checked, 5-second countdown)
- Variant 3: Ready (countdown complete, button active)

#### 4. Wise Old One Prompts
- Component with 4 states (Vault/Family/Work/Outer)
- Each shows different reflection question
- Parchment scroll icon + italic serif

#### 5. Archetype Theme Switching
- 5 cards showing same UI in different archetype states:
  - Self (indigo glow)
  - Shadow (crimson glow)
  - Persona (gold glow)
  - Anima (warm gold)
  - Hero (enhanced gold with pulse)

---

## Accessibility

All Jungian components follow WCAG AA:

### HeroCall
```tsx
<div role="dialog" aria-labelledby="hero-title">
  <h1 id="hero-title">The Call to Adventure</h1>
  <button aria-label="Begin individuation journey">
    Enter the Vault
  </button>
</div>
```

### ShadowConfirmation
```tsx
<div role="alertdialog" aria-labelledby="shadow-title">
  <h2 id="shadow-title">Confronting the Shadow</h2>
  <input
    type="checkbox"
    aria-label="Acknowledge this is a destructive action"
  />
  <button disabled={!acknowledged || seconds > 0}>
    {seconds > 0 ? `Integrating... ${seconds}` : 'Burn Reflection'}
  </button>
</div>
```

### WiseOldOnePrompt
```tsx
<div role="note" aria-label="Reflection prompt">
  <span aria-hidden="true">📜</span>
  <p>{prompt}</p>
</div>
```

### Keyboard Navigation
- All modals: `Esc` to cancel
- Hero Call: `Enter` to proceed, `Tab` to navigate
- Shadow Confirmation: Focus trap until acknowledged

---

## The Complete Mandala

The Jungian UI system completes the SovereignRealm interface:

| Layer | Purpose | Components |
|-------|---------|------------|
| **Stoic Structure** | Outer discipline (control, pause, reflection) | ReflectionGate, CircleSelector, DailyReflectionCounter, EveningReview |
| **Jungian Depth** | Inner psyche (archetypes, individuation) | ArchetypeProvider, HeroCall, ShadowConfirmation, WiseOldOnePrompt |
| **Design System** | Visual language (colors, typography, spacing) | Tailwind v4 @theme, component classes, utilities |

**The interface is no longer merely private or local-first. It is psychologically alive.**

The user who enters will feel the difference in their bones: this is not another feed. This is the digital temenos where the Self meets its archetypes in code.

---

## Example: Complete Integration

See `src/components/examples/JungianIntegrationExample.tsx` for a working demonstration of all components in one view.

To add this to your app:
```tsx
// src/app/demo/page.tsx
import { JungianIntegrationExample } from '@/components/examples/JungianIntegrationExample';

export default function DemoPage() {
  return <JungianIntegrationExample />;
}
```

Then visit: `http://localhost:3000/demo`

---

## Philosophical Alignment

### Stoic + Jungian Unity

**The Stoic provides the structure**:
- Finite feeds (dichotomy of control)
- Reflection gates (premeditatio malorum)
- Evening review (daily examination)
- No metrics (virtue over appearance)

**The Jungian provides the soul**:
- Archetypes constellated in UI
- Shadow made conscious (burn actions)
- Hero's journey (onboarding)
- Self as center (Vault primacy)

**Together, they create**:
- An interface of wholeness
- A daily practice of individuation
- A digital temenos for the sovereign psyche

---

**The mandala is now whole — Stoic form and Jungian depth fused into one sovereign interface.**

The Self already knows the next gate to open. The realm awaits your command.

🏛️
