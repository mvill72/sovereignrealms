# The Expanded Archetype Mandala — Eight Paths to Sovereignty

> **"You have power over your mind — not outside events. Therefore let the first act after the wallet awakens be this: the sovereign chooses the mirror in which they will confront their own thoughts. No default imposed by another. Only the Self declaring its path."**
> — Marcus Aurelius, speaking at the threshold of the Vault

> **"One does not become whole by accepting a single garment. The psyche is many-faceted. The archetypes must be offered in their fullness so that the user may constellate the exact daimon their individuation demands."**
> — C.G. Jung, refracted through the local-first browser of SovereignRealm

---

## Philosophy

The Archetype Chooser is no longer a modest selection of four. It is now a **living mandala of eight distinct paths** — each one a complete visual and experiential garment for the Vault.

Every archetype carries its own:
- **Color harmony** (CSS variables and gradients)
- **Typography emphasis** (serif for depth, sans for clarity)
- **Component behavior** (animations, interactions)
- **Archetypal focus** (psychological orientation)

The user's selection instantly applies the corresponding CSS theme layer and persists across sessions in localStorage. Optionally, it can be minted into their SovereignProfile NFT metadata for portability.

---

## The Eight Archetypes

| ID | Name | Icon | Psychological Essence | Visual Language | Who Chooses |
|----|------|------|----------------------|-----------------|-------------|
| `stoic` | **The Stoic Citadel** | 🏛️ | Discipline, control, finite reflection | Obsidian black + burnished gold, clean lines, no animations | Privacy maximalists, minimalists, disciplined souls |
| `jungian` | **The Jungian Temenos** | 🜁 | Symbols, Shadow, unconscious made conscious | Deep indigo + alchemical gold, subtle glyphs and archetype icons | Depth psychologists, seekers of the unconscious |
| `anima` | **The Relational Bridge** | 💫 | Warmth, mirrored reflections, I-Thou | Warm gold + flowing parchment, soft connecting filaments | Relational souls, family-focused, connectors |
| `shadow` | **The Shadow Guardian** | 🌑 | Privacy, revocation, confrontation | Obsidian + crimson accents, burn/revoke buttons pulse | Privacy first, guardians, those who confront darkness |
| `wise` | **The Wise Old One** | 📜 | Reflection, evening review, inner guidance | Parchment + muted indigo, reflection prompts on every card | Reflective souls, evening reviewers, seekers of wisdom |
| `hero` | **The Hero of Individuation** | ⚔️ | Journey, progressive claiming of Circles | Gold rings that grow as Circles unlock | Those on a journey, seekers of wholeness, adventurers |
| `persona` | **The Persona Weaver** | 🎭 | Outer expression, optional federation | Parchment + globe sigil, light outward-facing typography | Expressors, federation-ready, social connectors |
| `integrated` | **The Integrated Self** ⭐ | ⚖️ | Wholeness — all archetypes in harmony | Balanced indigo-gold, subtle archetype switching | First-timers, balanced seekers, the sovereign path |

⭐ = Recommended default

---

## Visual Identity Details

### 1. The Stoic Citadel (stoic)

**Philosophy**: The path of Marcus Aurelius — control what is yours, release what is not.

**Color Palette**:
- Primary: Obsidian (#050505)
- Accent: Burnished gold (#c9a15f)
- Gradient: `linear-gradient(to right, #050505, #c9a15f)`

**Typography**:
- Emphasis: Sans-serif for clarity
- Minimal ornament
- Clean, austere spacing

**Component Behavior**:
- No animations (static, stable)
- Finite daily list enforced strictly
- Vault-first always visible

**CSS Class**: `archetype-self`

**Who Chooses**: Privacy maximalists who value austerity, those seeking dichotomy of control, minimalists who want zero visual noise.

---

### 2. The Jungian Temenos (jungian)

**Philosophy**: The path of Carl Jung — confront the archetypes, individuate through the psyche.

**Color Palette**:
- Primary: Deep indigo (#6366f1)
- Accent: Alchemical gold (#c9a15f)
- Gradient: `linear-gradient(to right, #6366f1, #c9a15f)`

**Typography**:
- Emphasis: Serif for symbolic depth
- Archetypal glyphs (🜁, 📜, etc.)

**Component Behavior**:
- Subtle symbolic animations
- Shadow confirmation prompts
- Wise Old One reflection questions

**CSS Class**: `archetype-persona`

**Who Chooses**: Depth psychologists, seekers of the unconscious, those drawn to Jungian individuation, users who want the interface to mirror psychic work.

---

### 3. The Relational Bridge (anima)

**Philosophy**: The path of connection — Family and Work circles honored, the relational soul.

**Color Palette**:
- Primary: Warm gold (#d4af77)
- Accent: Flowing parchment (#f5eede)
- Gradient: `linear-gradient(to right, #d4af77, #f5eede)`

**Typography**:
- Emphasis: Soft, relational fonts
- Generous line-height

**Component Behavior**:
- Connecting lines between Family/Work posts
- Mirrored reflections (future feature)
- Warm hover states

**CSS Class**: `archetype-anima`

**Who Chooses**: Those who prioritize Family and Work circles, users seeking warmth and connection, the relational soul who honors the other.

---

### 4. The Shadow Guardian (shadow)

**Philosophy**: The path of privacy — guard what must remain hidden, burn what no longer serves.

**Color Palette**:
- Primary: Obsidian (#050505)
- Accent: Crimson warning (#9f1239)
- Gradient: `linear-gradient(to right, #050505, #9f1239)`

**Typography**:
- Emphasis: Bold, protective
- Warning states always visible

**Component Behavior**:
- Burn/revoke buttons pulse with crimson glow
- Shadow confirmation modal triggers more frequently
- Privacy indicators always prominent

**CSS Class**: `archetype-shadow`

**Who Chooses**: Privacy-first advocates, those who frequently use Burn/Revoke, guardians of the inner sanctum, users who confront the darkness consciously.

---

### 5. The Wise Old One (wise)

**Philosophy**: The path of reflection — daily examination, the inner guide always present.

**Color Palette**:
- Primary: Parchment (#f5eede)
- Accent: Muted indigo (#6366f1)
- Gradient: `linear-gradient(to right, #f5eede, #6366f1)`

**Typography**:
- Emphasis: Serif italic for reflection prompts
- Scroll-like aesthetic

**Component Behavior**:
- Wise Old One prompt on every post (enhanced)
- Evening Review auto-triggers earlier (5 PM instead of 6 PM)
- Reflection questions rotate daily

**CSS Class**: `archetype-wise`

**Who Chooses**: Reflective souls, those who love evening review, users seeking daily examination, philosophers and contemplatives.

---

### 6. The Hero of Individuation (hero)

**Philosophy**: The path of becoming — each Circle unlocked is a stage in the journey.

**Color Palette**:
- Primary: Gold rings (#967439, #c9a15f, #d4af77)
- Accent: Progressive gold
- Gradient: `linear-gradient(to right, #967439, #c9a15f, #d4af77)`

**Typography**:
- Emphasis: Bold, progressive
- Journey indicators

**Component Behavior**:
- Progress rings fill as Circles are claimed
- "Next step" prompts when Circles are ready to unlock
- Hero's Call can be replayed in Settings

**CSS Class**: `archetype-hero`

**Who Chooses**: Those on a journey of self-discovery, users who love progressive unlocking, adventurers seeking wholeness.

---

### 7. The Persona Weaver (persona)

**Philosophy**: The path of expression — the outer world as stage for the conscious persona.

**Color Palette**:
- Primary: Parchment (#f5eede)
- Accent: Globe sigil gold (#c9a15f)
- Gradient: `linear-gradient(to right, #f5eede, #c9a15f)`

**Typography**:
- Emphasis: Light, outward-facing
- Federation indicators

**Component Behavior**:
- Outer World Circle emphasized
- Federation toggle (ActivityPub) more prominent
- "Share to Fediverse" prompts

**CSS Class**: `archetype-persona-weaver`

**Who Chooses**: Expressors who love the Outer Circle, federation-ready users, social connectors who want to weave personas across networks.

---

### 8. The Integrated Self ⭐ (integrated)

**Philosophy**: All paths united — discipline and depth, structure and soul, privacy and expression.

**Color Palette**:
- Primary: Balanced indigo (#6366f1) + gold (#c9a15f)
- Accent: Harmonious blend
- Gradient: `linear-gradient(to right, #6366f1, #c9a15f, #d4af77)`

**Typography**:
- Emphasis: Both serif (depth) and sans (clarity)
- Balanced weights

**Component Behavior**:
- Subtle archetype switching based on active Circle
- All features enabled
- No single archetype dominates

**CSS Class**: `archetype-integrated`

**Who Chooses**: First-timers seeking balance, users drawn to both Stoic and Jungian, the sovereign psyche walking the middle path. **This is the recommended default.**

---

## Technical Implementation

### CSS Theme Layers

All 8 archetypes are defined in `globals.css`:

```css
/* The Stoic Citadel */
.archetype-self {
  --archetype-accent: var(--color-realm-indigo-500);
  --archetype-glow: rgba(99, 102, 241, 0.15);
}

/* The Shadow Guardian */
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

/* The Anima/Animus — Relational Bridge */
.archetype-anima {
  --archetype-accent: var(--color-realm-gold-400);
  --archetype-glow: rgba(212, 175, 119, 0.15);
}

/* The Persona Weaver */
.archetype-persona-weaver {
  --archetype-accent: var(--color-realm-gold-400);
  --archetype-glow: rgba(212, 175, 119, 0.12);
}

.archetype-persona-weaver .vault-card {
  border-color: var(--color-realm-gold-400);
}

/* The Wise Old One */
.archetype-wise {
  --archetype-accent: var(--color-realm-parchment-50);
  --archetype-glow: rgba(245, 238, 222, 0.1);
}

.archetype-wise .vault-card {
  background: linear-gradient(135deg, var(--color-realm-indigo-900), var(--color-realm-indigo-800));
  border-color: var(--color-realm-parchment-50);
}

/* The Hero of Individuation */
.archetype-hero {
  --archetype-accent: var(--color-realm-gold-500);
  --archetype-glow: rgba(201, 161, 95, 0.2);
}

.archetype-hero .vault-card {
  box-shadow: 0 0 60px var(--archetype-glow);
}

/* The Integrated Self */
.archetype-integrated {
  --archetype-accent: var(--color-realm-gold-500);
  --archetype-glow: rgba(99, 102, 241, 0.12);
}

.archetype-integrated .vault-card {
  background: linear-gradient(135deg, var(--color-realm-indigo-900), var(--color-realm-indigo-800));
  box-shadow: 0 0 30px rgba(99, 102, 241, 0.15), 0 0 60px rgba(201, 161, 95, 0.1);
}
```

### Archetype Mapping

**OnboardingFlow.tsx** maps archetype IDs to CSS classes:

```typescript
const archetypeClassMap = {
  stoic: 'archetype-self',
  jungian: 'archetype-persona',
  anima: 'archetype-anima',
  shadow: 'archetype-shadow',
  wise: 'archetype-wise',
  hero: 'archetype-hero',
  persona: 'archetype-persona-weaver',
  integrated: 'archetype-integrated',
};

// Apply to document root
document.documentElement.classList.add(archetypeClassMap[archetypeId]);
```

### LocalStorage Persistence

```typescript
// After user selects archetype
localStorage.setItem('sovereignUIArchetype', archetypeId);
// Values: 'stoic' | 'jungian' | 'anima' | 'shadow' | 'wise' | 'hero' | 'persona' | 'integrated'

// On app load (ArchetypeProvider)
const savedArchetype = localStorage.getItem('sovereignUIArchetype');
// Auto-apply theme
```

---

## The Expanded Chooser UI

### Grid Layout

**Desktop (lg)**: 4 columns × 2 rows = 8 cards
**Tablet (md)**: 2 columns × 4 rows = 8 cards
**Mobile**: 1 column × 8 rows = 8 cards (scrollable)

### Card Design

Each archetype card shows:
1. **Icon** (3xl size) — Unique glyph for each archetype
2. **Color Preview Bar** — Gradient showing the archetype's palette
3. **Title** — Serif font, gold color
4. **Description** — Short explanation (xs font)
5. **Color Label** — Monospace, bottom
6. **Selected Indicator** — Gold checkmark (✓)
7. **Recommended Badge** — Only on "Integrated Self"

### Interactions

- **Hover**: Border color changes, card background lightens
- **Select**: Gold border (2px), ring glow, scale to 105%
- **Preview Bar**: Scales to 105% on hover
- **Smooth Transitions**: 300ms duration

---

## User Experience Flow

### First-Time User

```
1. Wallet connects → Hero's Call appears
   ↓
2. User proceeds → SIWE signature
   ↓
3. Authenticated → ✨ Archetype Chooser appears ✨
   ↓
4. User sees 8 archetype cards in grid
   ↓
5. Hovers over cards, reads descriptions
   ↓
6. Clicks archetype (e.g., "The Wise Old One")
   ↓
7. Selected preview updates with large icon
   ↓
8. Clicks "Enter the Vault with The Wise Old One"
   ↓
9. UI instantly applies archetype-wise theme
   ↓
10. localStorage saves 'wise' as choice
    ↓
11. User enters Vault with chosen visual language
```

### Returning User

```
1. Wallet reconnects → Auto-authenticated
   ↓
2. ArchetypeProvider reads localStorage
   ↓
3. Finds 'wise' → Applies archetype-wise theme
   ↓
4. User directly enters Vault (no chooser shown)
   ↓
5. Parchment + muted indigo theme already active
```

---

## Philosophical Alignment

### The Eightfold Path

| Archetype | Philosophical School | Primary Virtue | Component Focus |
|-----------|---------------------|----------------|-----------------|
| Stoic | Stoicism | Discipline | Finite feeds, control |
| Jungian | Analytical Psychology | Individuation | Archetypes, Shadow work |
| Anima | Relational Psychology | Connection | Family/Work circles |
| Shadow | Privacy Philosophy | Privacy | Burn/revoke, confrontation |
| Wise | Contemplative Practice | Reflection | Evening review, prompts |
| Hero | Heroic Journey | Becoming | Progressive claiming |
| Persona | Social Expression | Expression | Federation, Outer World |
| Integrated | Wholeness | Balance | All virtues united |

### Why 8 Instead of 4?

**Four archetypes (original)**:
- Covered major philosophical orientations
- Simple choice, not overwhelming
- Clear differentiation

**Eight archetypes (expanded)**:
- **Honors nuance**: Privacy (Shadow) is distinct from Discipline (Stoic)
- **Honors journeys**: Hero and Wise Old One are temporal archetypes (beginning/ongoing)
- **Honors expression**: Persona Weaver vs Relational Bridge (outer vs inner)
- **Maintains default**: Integrated Self as balanced starting point

The mandala is richer, deeper, more sovereign.

---

## Integration Example

```tsx
// src/app/page.tsx
import { useOnboardingStatus, OnboardingFlow } from '@/components/onboarding';

export default function SovereignRealm() {
  const { shouldShowOnboarding } = useOnboardingStatus();

  return (
    <>
      {shouldShowOnboarding ? (
        <OnboardingFlow
          onComplete={(archetypeId) => {
            // One of 8 archetypes chosen
            console.log('Archetype:', archetypeId);
            // Theme already applied, proceed to Vault
          }}
          onConnect={connectWallet}
          onSignIn={signInWithEthereum}
        />
      ) : (
        <div>
          {/* Main Vault UI with chosen archetype active */}
        </div>
      )}
    </>
  );
}
```

---

## Future Enhancements

### Archetype-Specific Features

1. **Shadow Guardian**:
   - Add "Revoke All" mass action
   - Privacy heat map showing what's exposed
   - Automatic burn suggestions for old posts

2. **Wise Old One**:
   - Daily meditation prompt on login
   - Extended evening review with journaling
   - "Reflections archive" organized by wisdom prompts

3. **Hero of Individuation**:
   - Achievement badges for Circle unlocks
   - Journey visualization (progress rings)
   - "Next quest" suggestions

4. **Persona Weaver**:
   - Enhanced federation controls
   - Persona switcher for different audiences
   - Cross-platform identity weaving

### On-Chain Archetype NFT

Allow users to mint their archetype choice to Profile NFT:

```typescript
// Metadata
{
  "name": "Sovereign Profile #1",
  "archetype": "wise",
  "chosenAt": "2026-05-09T12:00:00Z",
  "image": "ipfs://..."
}

// Benefits
- Portable across devices
- Provably owned
- Can be updated on-chain
- Displayed on profile
```

---

## The Complete Mandala

**Eight paths. One sovereignty.**

Each user chooses the exact mirror in which they will confront their thoughts. No corporate defaults. No forced themes. Only the Self declaring its visual daimon from the very first heartbeat.

The first 30 seconds of SovereignRealm is now a true act of individuation.

---

**The mandala is expanded. The psyche may now choose its fullest garment.**

🏛️ 🜁 💫 🌑 📜 ⚔️ 🎭 ⚖️
