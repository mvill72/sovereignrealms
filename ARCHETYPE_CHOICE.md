# The Sovereign Choice — Archetype Selection at First Entry

> **"You have power over your mind — not outside events. Realize this, and you will find strength. Why then should the interface be imposed upon the Self? The first act of sovereignty must be to choose the mirror in which you will confront your own thoughts."**
> — Marcus Aurelius, speaking to the wallet that has just awakened

> **"One does not become whole by accepting another's archetype. The Self must constellate its own garment — Stoic austerity for the disciplined, Jungian symbolism for the seeker of the unconscious, Anima warmth for the relational soul. Only then is the Vault truly yours."**
> — C.G. Jung, refracted through the local-first browser of SovereignRealm

---

## Philosophy

In SovereignRealm, **"sign up" is not a form with email and password**. It is the moment the wallet connects, the SovereignProfile NFT is recognized (or optionally minted), and the Self steps across the threshold into the Vault.

At that exact **liminal point** we place the **Archetype Chooser** — a deliberate, beautiful ritual that honors the user's individuation from the very first breath.

**No forced default. No corporate "recommended" theme. Only the sovereign choosing the visual daimon that will color their daily Meditations.**

---

## The Four Archetypal Garments

When the user first enters, they choose between four UI manifestations:

### 1. The Stoic Citadel

**Philosophy**: The path of Marcus Aurelius — control what is yours, release what is not.

**Visual Language**:
- **Colors**: Obsidian + burnished gold
- **Typography**: Clean, austere
- **Components**: Minimal ornamentation, maximum clarity
- **Focus**: Discipline, finite reflections, no distractions

**Who chooses this**:
- Privacy maximalists who value austerity
- Those seeking the dichotomy of control
- Minimalists who want zero visual noise

**CSS Class**: `archetype-self`

---

### 2. The Archetypal Temenos

**Philosophy**: The path of Carl Jung — confront the archetypes, individuate through the psyche.

**Visual Language**:
- **Colors**: Deep indigo + alchemical gold
- **Typography**: Symbolic, rich with glyphs
- **Components**: Archetypal symbols (🜁, 📜, etc.)
- **Focus**: Shadow work, Hero's journey, Wise Old One prompts

**Who chooses this**:
- Depth psychologists and seekers of the unconscious
- Those drawn to Jungian individuation
- Users who want the interface to mirror psychic work

**CSS Class**: `archetype-persona`

---

### 3. The Relational Bridge

**Philosophy**: The path of connection — Family and Work circles honored, the relational soul.

**Visual Language**:
- **Colors**: Warm gold + flowing parchment
- **Typography**: Soft, relational
- **Components**: Connecting lines between posts, mirrored reflections
- **Focus**: Anima/Animus, the bridge to the other

**Who chooses this**:
- Those who prioritize Family and Work circles
- Users seeking warmth and connection
- The relational soul who honors the other

**CSS Class**: `archetype-anima`

---

### 4. The Integrated Self (Recommended)

**Philosophy**: All paths united — Stoic discipline and Jungian depth, structure and soul.

**Visual Language**:
- **Colors**: Balanced indigo + gold (all palette shades)
- **Typography**: Serif for depth, sans for clarity
- **Components**: Stoic structure with Jungian symbolic layers
- **Focus**: Wholeness — the mandala complete

**Who chooses this**:
- First-time users seeking balance
- Those drawn to both Stoic and Jungian
- The integrated psyche walking the middle path

**CSS Class**: `archetype-self` (with balanced color usage)

---

## The Sacred Onboarding Flow

### Complete Journey (5 Steps)

```
1. Landing Page
   ↓ User clicks "Enter the Vault"

2. Wallet Connection
   ↓ RainbowKit modal → MetaMask/Rainbow/etc.

3. SIWE Authentication
   ↓ "Sign this message to prove wallet ownership"

4. ⭐ ARCHETYPE CHOOSER ⭐
   ↓ "Choose Your Garment, Sovereign"

5. First Vault Entry
   ↓ Main app loads with chosen archetype applied
```

### The Liminal Moment (Step 4)

**Visual Design**:
- Fullscreen modal with parchment-like background
- Alchemical symbol (🜁) pulsing at top
- Grid of 4 archetype cards with:
  - Color preview bar (gradient of archetype palette)
  - Title + description
  - Philosophy quote
  - Preview thumbnail
- Selected archetype highlighted with gold border
- Large preview card showing chosen archetype
- "Enter the Vault with {Archetype Name}" button

**User Actions**:
- Click archetype card to select
- Hover shows preview animation
- Selection updates large preview
- Confirm choice to proceed

**After Choice**:
1. Archetype saved to `localStorage` as `sovereignUIArchetype`
2. Optionally minted to on-chain Profile NFT metadata
3. Applied to `document.documentElement` as CSS class
4. Onboarding marked complete
5. User enters Vault with chosen visual language

---

## Implementation

### Components Created

#### 1. ArchetypeChooser.tsx (~180 lines)
```tsx
import { ArchetypeChooser } from '@/components/onboarding';

<ArchetypeChooser
  onChosen={(archetypeId) => {
    // Save, apply, enter Vault
  }}
/>
```

**Features**:
- Four archetype cards with visual previews
- Color gradient bars showing palette
- Selected preview card with large icon
- Responsive grid (2x2 on desktop, stacked on mobile)
- Instrument Serif typography
- Oracle quote at bottom

#### 2. OnboardingFlow.tsx (~150 lines)
```tsx
import { OnboardingFlow, useOnboardingStatus } from '@/components/onboarding';

const { shouldShowOnboarding } = useOnboardingStatus();

{shouldShowOnboarding && (
  <OnboardingFlow
    onComplete={(archetypeId) => {
      // Archetype applied, proceed to Vault
    }}
    onConnect={connectWallet}
    onSignIn={signInWithEthereum}
  />
)}
```

**Features**:
- Orchestrates full flow: Hero's Call → SIWE → Archetype → Entry
- Checks wallet connection status
- Checks authentication status
- Skips steps if already completed
- Smooth transitions between steps
- Handles errors gracefully

#### 3. useOnboardingStatus Hook
```tsx
const {
  shouldShowOnboarding,  // boolean
  completeOnboarding,    // () => void
  resetOnboarding,       // () => void (for testing/settings)
} = useOnboardingStatus();
```

**Logic**:
- Show onboarding if:
  - Never completed onboarding, OR
  - Wallet connected but no archetype chosen
- Check `localStorage` for:
  - `onboarding_complete`
  - `sovereignUIArchetype`

---

## Persistence

### LocalStorage Keys

```typescript
// Onboarding completion flag
localStorage.setItem('onboarding_complete', 'true');

// Chosen archetype ID ('stoic' | 'jungian' | 'anima' | 'balanced')
localStorage.setItem('sovereignUIArchetype', archetypeId);

// Hero's journey completion (from previous HeroCall)
localStorage.setItem('hero_journey_complete', 'true');
```

### CSS Application

After choice, the archetype is applied globally:

```typescript
// Map archetype ID to CSS class
const archetypeClassMap = {
  stoic: 'archetype-self',
  jungian: 'archetype-persona',
  anima: 'archetype-anima',
  balanced: 'archetype-self',
};

// Apply to document root
document.documentElement.classList.add(archetypeClassMap[archetypeId]);
```

All components then inherit the archetype theme via CSS cascade.

### Optional: On-Chain Metadata

For users who want their archetype choice to be portable:

```typescript
// After archetype chosen
import { useWriteContract } from 'wagmi';

const { writeContract } = useWriteContract();

await writeContract({
  address: SOVEREIGN_PROFILE_ADDRESS,
  abi: SovereignProfileABI,
  functionName: 'updateMetadata',
  args: [
    JSON.stringify({
      archetype: archetypeId,
      chosenAt: new Date().toISOString(),
    })
  ],
});
```

On future wallet connections, the app can:
1. Check on-chain metadata
2. If archetype found, auto-apply
3. Otherwise, show Archetype Chooser

---

## Integration Guide

### Step 1: Add to Main App

```tsx
// src/app/page.tsx
import { useOnboardingStatus, OnboardingFlow } from '@/components/onboarding';
import { signInWithEthereum } from '@/utils/siwe';

export default function SovereignRealm() {
  const { shouldShowOnboarding } = useOnboardingStatus();
  const { isConnected } = useAccount();

  const handleOnboardingComplete = (archetypeId: string) => {
    console.log('Onboarding complete with archetype:', archetypeId);
    // Archetype already applied to document.documentElement
    // Proceed to show main Vault UI
  };

  return (
    <>
      {shouldShowOnboarding ? (
        <OnboardingFlow
          onComplete={handleOnboardingComplete}
          onConnect={() => {
            // Trigger wallet connection (RainbowKit handles this)
            // OnboardingFlow will wait for connection then proceed
          }}
          onSignIn={async () => {
            if (!address || !walletClient) return;
            await signInWithEthereum(address, walletClient);
          }}
        />
      ) : (
        {/* Main Vault UI */}
        <div className="min-h-screen">
          {/* Your existing app */}
        </div>
      )}
    </>
  );
}
```

### Step 2: Add Settings → Re-garment

Allow users to change archetype later:

```tsx
// src/app/settings/page.tsx
import { ArchetypeChooser } from '@/components/onboarding';

export default function SettingsPage() {
  const [showArchetypeChooser, setShowArchetypeChooser] = useState(false);

  return (
    <div>
      <h2>Visual Preferences</h2>
      <button onClick={() => setShowArchetypeChooser(true)}>
        Re-garment the Realm
      </button>

      {showArchetypeChooser && (
        <ArchetypeChooser
          onChosen={(archetypeId) => {
            // Apply new archetype
            setShowArchetypeChooser(false);
          }}
        />
      )}
    </div>
  );
}
```

### Step 3: Apply Archetype on Load

In ArchetypeProvider (already done):

```tsx
// src/components/archetypes/ArchetypeProvider.tsx
useEffect(() => {
  const savedArchetype = localStorage.getItem('sovereignUIArchetype');

  const archetypeMap = {
    stoic: 'self',
    jungian: 'persona',
    anima: 'anima',
    balanced: 'self',
  };

  if (savedArchetype && archetypeMap[savedArchetype]) {
    setActiveArchetype(archetypeMap[savedArchetype]);
  }
}, []);
```

---

## User Experience

### First-Time User Journey

1. **Lands on website** → Sees manifesto/landing page
2. **Clicks "Enter the Realm"** → Wallet connection modal (RainbowKit)
3. **Connects wallet** → Hero's Call appears: "The Call to Adventure"
4. **Proceeds through Hero's Call** → SIWE signature request
5. **Signs message** → **✨ Archetype Chooser appears ✨**
6. **Sees four garments**:
   - Stoic Citadel (austere, disciplined)
   - Archetypal Temenos (symbolic, depth)
   - Relational Bridge (warm, connected)
   - Integrated Self (balanced, recommended)
7. **Selects archetype** → Large preview updates
8. **Clicks "Enter the Vault with {Archetype}"** → UI applies instantly
9. **Vault loads** → All components now use chosen color/style theme
10. **Posts first reflection** → Onboarding complete

### Returning User Journey

1. **Wallet reconnects** → Auto-authenticated via SIWE session
2. **localStorage checks**:
   - `onboarding_complete` = `'true'` ✓
   - `sovereignUIArchetype` = `'balanced'` ✓
3. **Archetype auto-applied** → No chooser shown
4. **Directly enters Vault** → Seamless return

---

## Design Philosophy

### Why This Matters

**Traditional apps**:
- Impose a single UI on all users
- "Dark mode" vs "Light mode" as only choice
- No psychological alignment
- User feels like guest in someone else's design

**SovereignRealm**:
- User chooses visual language that mirrors their psyche
- Four archetypes honor different paths
- No corporate "recommended" (balanced is user's choice)
- User feels like owner of their own temenos

### The First Act of Sovereignty

This ritual transforms the threshold moment:

**Without Archetype Choice**:
> "Connect wallet → Sign message → Start using app"
> (Functional, transactional, forgettable)

**With Archetype Choice**:
> "Connect wallet → The Call to Adventure → Choose your visual daimon → Enter your Vault"
> (Psychological, memorable, sacred)

The user doesn't just *use* SovereignRealm. They **co-create** how the realm appears to their own psyche from the very first heartbeat.

---

## Figma Integration

### New Page: "Archetype Chooser — The Sacred Choice"

Create frames for:

#### 1. Full Chooser View
- 4 archetype cards in 2x2 grid
- Each card with:
  - Color gradient preview bar
  - Title (Instrument Serif, 24px)
  - Description (Inter, 14px)
  - Philosophy quote (Instrument Serif italic, 12px)
  - "Recommended" badge on Balanced
- Selected archetype with gold border + scale
- Large preview card below grid
- "Enter the Vault" button

#### 2. Individual Archetype Cards
- Component variants for each archetype:
  - Default state
  - Hover state
  - Selected state
- Include color gradients
- Show preview thumbnails

#### 3. Preview Cards
- Mini post card for each archetype
- Shows:
  - Border color (archetype-specific)
  - Typography style
  - Icon/glyph
  - Sample content

#### 4. Complete Flow
- Frame 1: Hero's Call (existing)
- Frame 2: **✨ Archetype Chooser ✨** (new)
- Frame 3: First Vault Entry (existing)
- Connect with flow arrows

---

## Accessibility

All archetype chooser components follow WCAG AA:

### Keyboard Navigation
```tsx
// Arrow keys to navigate between archetypes
// Enter/Space to select
// Tab to move to "Enter Vault" button
```

### Screen Reader Support
```tsx
<button
  role="radio"
  aria-checked={selectedId === archetype.id}
  aria-label={`Choose ${archetype.name}: ${archetype.description}`}
>
  {/* Archetype card content */}
</button>
```

### Color Contrast
- All text meets 4.5:1 minimum
- Gold borders visible on dark backgrounds
- Preview gradients have sufficient differentiation

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  .animate-pulse-slow {
    animation: none;
  }
}
```

---

## Technical Notes

### Why After Wallet Connection?

The archetype choice happens **after** wallet connection because:

1. **Persistence**: Need wallet address to optionally save to on-chain metadata
2. **Authentication**: SIWE proves ownership before allowing profile customization
3. **Threshold Moment**: The liminal space between connection and entry is sacred
4. **Context**: User has committed to entry, now chooses how the realm appears

### LocalStorage vs On-Chain

**LocalStorage** (default):
- ✅ Instant, zero gas
- ✅ Private (never leaves browser)
- ✅ Easy to change
- ❌ Not portable across devices
- ❌ Lost if localStorage cleared

**On-Chain Metadata** (optional):
- ✅ Portable across devices
- ✅ Provably owned
- ✅ Permanent record
- ❌ Requires gas fee
- ❌ Public (on-chain)
- ❌ Harder to change

**Recommendation**: Start with localStorage, offer "Mint Archetype to Profile NFT" in Settings for users who want permanence.

---

## The Mandala Complete

With the Archetype Chooser, the SovereignRealm interface becomes fully **co-created**:

| Layer | User Control | Technical Implementation |
|-------|-------------|-------------------------|
| **Identity** | User chooses wallet | Web3 (wagmi + RainbowKit) |
| **Authentication** | User signs SIWE message | Cryptographic signature |
| **Visual Garment** | **User chooses archetype** | **CSS theme + localStorage** |
| **Content** | User writes reflections | Local-first (IndexedDB) |
| **Sharing** | User chooses Circles | Privacy Circles (Vault/Family/Work/Outer) |

**Every layer honors sovereignty.**

The first act is not "accept terms and conditions." The first act is **"Choose the mirror in which you will confront your own thoughts."**

---

**The threshold is ready. The Self may now choose its own garment.**

🏛️
