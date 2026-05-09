# Archetype Choice Integration — The Sovereign Threshold Complete

> **"The first act of sovereignty is choosing the mirror in which you will confront your own thoughts."**

This document records the implementation of the Archetype Chooser — the sacred ritual where new users select their UI garment at first entry.

---

## What Was Built

### Components Created (3 new + 1 updated)

#### 1. ArchetypeChooser.tsx (~180 lines)
**Purpose**: The sacred choice modal showing four archetypal UI garments

**Features**:
- Four archetype cards in responsive grid:
  - **The Stoic Citadel** — Obsidian + gold, austere discipline
  - **The Archetypal Temenos** — Deep indigo + gold, Jungian symbols
  - **The Relational Bridge** — Warm gold + parchment, Anima/Animus
  - **The Integrated Self** — Balanced (recommended default)
- Color gradient preview bars for each archetype
- Selected archetype highlighted with gold border
- Large preview card showing chosen archetype
- Alchemical symbol (🜁) pulsing at top
- Oracle quote at bottom
- "Enter the Vault with {Archetype}" confirmation button

**LocalStorage**:
```typescript
localStorage.setItem('sovereignUIArchetype', archetypeId);
// Values: 'stoic' | 'jungian' | 'anima' | 'balanced'
```

#### 2. OnboardingFlow.tsx (~150 lines)
**Purpose**: Orchestrates complete onboarding journey

**Flow**:
```
Step 1: Hero's Call (wallet connection)
  ↓
Step 2: SIWE Authentication (prove ownership)
  ↓
Step 3: Archetype Selection ✨
  ↓
Step 4: First Vault Entry (complete)
```

**Features**:
- Checks wallet connection status
- Checks SIWE authentication status
- Skips completed steps on return
- Smooth state transitions
- Error handling for each step
- Applies chosen archetype globally
- Marks onboarding complete

**Props**:
```tsx
<OnboardingFlow
  onComplete={(archetypeId) => void}
  onConnect={() => void}
  onSignIn={() => Promise<void>}
/>
```

#### 3. useOnboardingStatus Hook
**Purpose**: Check if user should see onboarding

**Returns**:
```tsx
{
  shouldShowOnboarding: boolean,
  completeOnboarding: () => void,
  resetOnboarding: () => void,
}
```

**Logic**:
- Show onboarding if:
  - Never completed onboarding (`onboarding_complete` missing), OR
  - Wallet connected but no archetype chosen (`sovereignUIArchetype` missing)

#### 4. ArchetypePreview.tsx (~60 lines)
**Purpose**: Miniature visual preview of each archetype

**Shows**:
- Sample post card with archetype-specific styling
- Border colors
- Typography
- Icons
- Content sample

#### 5. Updated: ArchetypeProvider.tsx
**Added**:
- Auto-load archetype preference from localStorage on mount
- Map archetype ID → active archetype state
- Persist choice across sessions

---

## The Four Archetypes

| ID | Name | Philosophy | Colors | Who Chooses |
|----|------|-----------|--------|-------------|
| `stoic` | The Stoic Citadel | Marcus Aurelius — control & release | Obsidian + gold | Privacy maximalists, minimalists |
| `jungian` | The Archetypal Temenos | Carl Jung — confront archetypes | Deep indigo + alchemical gold | Depth psychologists, seekers |
| `anima` | The Relational Bridge | Connection — Family/Work circles | Warm gold + parchment | Relational souls, family-focused |
| `balanced` | The Integrated Self | All paths united — structure & soul | Balanced indigo + gold | First-timers, seekers of wholeness |

---

## User Experience Transformation

### Before (No Choice)

1. Connect wallet
2. Sign SIWE message
3. Enter app (imposed UI)
4. Use app with default theme

### After (Sovereign Choice)

1. Connect wallet → **Hero's Call** appears
2. Sign SIWE → "The Call to Adventure"
3. **✨ Archetype Chooser appears ✨**
4. See four visual garments with previews
5. Select archetype that resonates
6. **Large preview** shows chosen theme
7. Confirm → UI **instantly applies**
8. Enter Vault with **chosen visual language**

**The user doesn't just use SovereignRealm. They co-create how the realm appears to their own psyche.**

---

## Technical Implementation

### LocalStorage Keys

```typescript
// Onboarding completion flag
'onboarding_complete': 'true'

// Chosen archetype ID
'sovereignUIArchetype': 'stoic' | 'jungian' | 'anima' | 'balanced'

// Hero's journey completion (from HeroCall)
'hero_journey_complete': 'true'
```

### CSS Application

After choice, archetype is applied globally:

```typescript
// Map archetype ID to CSS class
const archetypeClassMap = {
  stoic: 'archetype-self',
  jungian: 'archetype-persona',
  anima: 'archetype-anima',
  balanced: 'archetype-self',
};

// Remove any existing archetype classes
document.documentElement.classList.remove(
  'archetype-self',
  'archetype-shadow',
  'archetype-persona',
  'archetype-anima',
  'archetype-hero'
);

// Apply chosen archetype
document.documentElement.classList.add(archetypeClassMap[archetypeId]);
```

All components then inherit archetype theme via CSS cascade.

### Persistence Flow

```
OnboardingFlow
  ↓
ArchetypeChooser (user selects 'jungian')
  ↓
localStorage.setItem('sovereignUIArchetype', 'jungian')
  ↓
document.documentElement.classList.add('archetype-persona')
  ↓
OnboardingFlow.onComplete('jungian')
  ↓
localStorage.setItem('onboarding_complete', 'true')
  ↓
Main app loads with archetype-persona theme

--- Next visit ---

ArchetypeProvider.useEffect()
  ↓
const saved = localStorage.getItem('sovereignUIArchetype') // 'jungian'
  ↓
setActiveArchetype('persona')
  ↓
All components inherit .archetype-persona theme
```

---

## Integration Example

### Main App (src/app/page.tsx)

```tsx
import { useOnboardingStatus, OnboardingFlow } from '@/components/onboarding';
import { signInWithEthereum } from '@/utils/siwe';

export default function SovereignRealm() {
  const { shouldShowOnboarding } = useOnboardingStatus();
  const { address, isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();

  const handleOnboardingComplete = (archetypeId: string) => {
    console.log('✓ Onboarding complete with archetype:', archetypeId);
    // Archetype already applied to document.documentElement
    // User can now proceed to Vault
  };

  const handleSignIn = async () => {
    if (!address || !walletClient) return;
    await signInWithEthereum(address, walletClient);
  };

  return (
    <>
      {shouldShowOnboarding ? (
        <OnboardingFlow
          onComplete={handleOnboardingComplete}
          onConnect={() => {
            // RainbowKit handles wallet connection
            // OnboardingFlow waits for connection then proceeds
          }}
          onSignIn={handleSignIn}
        />
      ) : (
        <div className="min-h-screen">
          {/* Main Vault UI */}
          {/* User's chosen archetype is already applied */}
        </div>
      )}
    </>
  );
}
```

### Settings — Re-garment the Realm

```tsx
// src/app/settings/page.tsx
import { ArchetypeChooser } from '@/components/onboarding';

export default function SettingsPage() {
  const [showChooser, setShowChooser] = useState(false);

  return (
    <div>
      <h2>Visual Preferences</h2>

      <button onClick={() => setShowChooser(true)} className="btn-secondary">
        Re-garment the Realm
      </button>

      {showChooser && (
        <ArchetypeChooser
          onChosen={(archetypeId) => {
            // Apply new archetype
            const archetypeClassMap = {
              stoic: 'archetype-self',
              jungian: 'archetype-persona',
              anima: 'archetype-anima',
              balanced: 'archetype-self',
            };

            // Update UI
            document.documentElement.classList.remove(
              'archetype-self', 'archetype-persona', 'archetype-anima'
            );
            document.documentElement.classList.add(archetypeClassMap[archetypeId]);

            // Close modal
            setShowChooser(false);
          }}
        />
      )}
    </div>
  );
}
```

---

## File Changes Summary

### Created Files (4)

**Components**:
- `src/components/onboarding/ArchetypeChooser.tsx` (~180 lines)
- `src/components/onboarding/OnboardingFlow.tsx` (~150 lines)
- `src/components/onboarding/ArchetypePreview.tsx` (~60 lines)
- `src/components/onboarding/index.ts` (~15 lines)

**Documentation**:
- `ARCHETYPE_CHOICE.md` (~600 lines)
- `ARCHETYPE_CHOICE_INTEGRATION.md` (this file)

### Modified Files (2)

**Code**:
- `src/components/archetypes/ArchetypeProvider.tsx` — Added localStorage loading on mount

**Documentation**:
- `README.md` — Added ARCHETYPE_CHOICE.md reference

---

## Philosophy Alignment

### The Sovereign Choice Principle

**Traditional apps**:
- Impose single UI on all users
- Dark/light mode as only choice
- No psychological alignment
- User feels like guest in corporate design

**SovereignRealm**:
- User chooses visual language
- Four archetypes honor different paths
- No forced "recommended" (balanced is user's choice, not corporate)
- User feels like owner of own temenos

### The First Act of Sovereignty

This ritual transforms the threshold moment:

**Without Archetype Choice**:
> Connect wallet → Sign message → Use app
> (Functional, transactional, forgettable)

**With Archetype Choice**:
> Connect wallet → The Call to Adventure → **Choose your visual daimon** → Enter your Vault
> (Psychological, memorable, sacred)

### Integration with Existing Layers

| Layer | Purpose | User Control |
|-------|---------|-------------|
| **Stoic Structure** | Outer discipline | None (universal patterns) |
| **Jungian Depth** | Inner psyche | None (archetypal symbols) |
| **Design System** | Visual language | None (color palette) |
| **Archetype Choice** | Personal garment | **✨ Full user choice ✨** |

The first three layers are *given* by SovereignRealm.
The fourth layer is *chosen* by the user.

This honors both:
- **Universal patterns** (Stoic/Jungian wisdom applies to all)
- **Individual sovereignty** (each Self chooses its own mirror)

---

## The Complete Onboarding Mandala

```
Landing Page
  ↓ "Enter the Vault"

Wallet Connection (RainbowKit)
  ↓ MetaMask/Rainbow/WalletConnect

Hero's Call (Step 1)
  ↓ "Your wallet is the sigil of the Self"
  ↓ Alchemical symbol (🜁)

SIWE Authentication (Step 2)
  ↓ "Sign to prove ownership"

✨ ARCHETYPE CHOOSER ✨ (Step 3)
  ┌─────────────────────────────┐
  │  Choose Your Garment        │
  ├─────────────────────────────┤
  │  [ Stoic Citadel ]          │
  │  [ Archetypal Temenos ]     │
  │  [ Relational Bridge ]      │
  │  [ Integrated Self ] ⭐     │
  └─────────────────────────────┘
  ↓ User selects archetype

CSS Applied + LocalStorage Saved
  ↓ document.documentElement.classList.add('archetype-{chosen}')

First Vault Entry (Step 4)
  ↓ Main app loads with chosen theme

Onboarding Complete ✓
  ↓ User begins daily Meditations
```

---

## Build Status

```
✓ Compiled successfully in 8.6s
✓ TypeScript verification passed
✓ All routes generated
✓ Production ready
```

**All archetype chooser components**:
- ✅ ArchetypeChooser.tsx
- ✅ OnboardingFlow.tsx
- ✅ useOnboardingStatus hook
- ✅ ArchetypePreview.tsx
- ✅ ArchetypeProvider localStorage loading
- ✅ Complete documentation

---

## Next Steps (Optional)

### Recommended Follow-Ups

1. **On-Chain Archetype Metadata**
   - Allow users to mint archetype choice to Profile NFT
   - Auto-load archetype from on-chain on future connections
   - "Portable Garment" feature in Settings

2. **Archetype Visualization**
   - Add live preview thumbnails to chooser
   - Show animated transition when archetype changes
   - Preview full app with selected archetype

3. **Advanced Archetypes**
   - Add 5th archetype: "The Trickster" (Federation-focused)
   - Add 6th archetype: "The Shadow" (Dark mode, confrontation)
   - Custom archetype builder in Settings

4. **Analytics (Local-Only)**
   - Track which archetypes are most chosen (localStorage only)
   - Show archetype distribution in Settings
   - "Most users like you chose..." (never sent to server)

5. **Onboarding Metrics**
   - Track completion rate (localStorage only)
   - Track time spent on each step
   - A/B test archetype descriptions

---

## The Mandala Is Now Complete

**Five Layers of Sovereignty**:

1. **Identity** → User chooses wallet (Web3)
2. **Authentication** → User signs SIWE (Cryptographic proof)
3. **Visual Garment** → **User chooses archetype (CSS theme)**
4. **Content** → User writes reflections (Local-first)
5. **Sharing** → User chooses Circles (Privacy Circles)

**Every layer honors sovereignty. Every choice belongs to the Self.**

---

**The threshold is ready. The first act of sovereignty is complete.**

**The user does not merely use SovereignRealm. From the very first heartbeat, they co-create how the realm appears to their own psyche.**

🏛️
