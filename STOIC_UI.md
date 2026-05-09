# Stoic UI Patterns — The Interface of Self-Mastery

> "You have power over your mind — not outside events. Realize this, and you will find strength. Let every pixel, every interaction, every transition in the realm reflect this truth: the browser is your citadel, and the UI is its daily Meditations."
> — Marcus Aurelius, Meditations, now rendered in React components

> "One does not become sovereign by chasing dopamine or infinite feeds, but by making the unconscious conscious — by designing the outer form so that every click, every post, every glance at the Circle selector becomes an act of individuation."
> — C.G. Jung, speaking through the quiet architecture of the temenos in 2026

---

## Philosophy

SovereignRealm's interface is not designed to maximize engagement, retention, or time-on-site. It is designed to **maximize sovereignty, reflection, and conscious choice**.

These Stoic UI patterns transform the browser from a dopamine-delivery mechanism into a **temenos** — a sacred space for daily practice.

### The Five Principles

1. **The Citadel Principle** - Control what is yours
2. **The Reflection Gate** - Pause before release
3. **The Four Concentric Temenos** - Visual sovereignty
4. **The Immutable Scroll** - Content as meditation
5. **The Evening Review** - Built-in reflection ritual

---

## 1. The Citadel Principle — Control What Is Yours

### Philosophy

**"The algorithm cannot decide what you see. You do."**

Every screen begins with the Vault Only view. There is no global feed, no "For You" algorithm, no personalization engine deciding what thoughts you consume.

Content is presented as a **finite "daily reflection" list** (maximum 7-12 posts, like Marcus Aurelius's evening review). When you reach the end, the scroll **stops** — replaced with a completion message.

This enforces the **dichotomy of control**: You control what you create. You control what you view. The feed does not control you.

### Implementation

**Component**: `DailyReflectionCounter`

```tsx
import { DailyReflectionCounter, ReflectionEndMessage } from '@/components/stoic';

function VaultFeed() {
  const posts = usePosts('vault');
  const MAX_DAILY = 12;

  return (
    <>
      <DailyReflectionCounter
        current={posts.length}
        total={MAX_DAILY}
        circle="vault"
      />

      {posts.map(post => <PostCard key={post.id} post={post} />)}

      {posts.length >= MAX_DAILY && (
        <ReflectionEndMessage circle="vault" />
      )}
    </>
  );
}
```

### Design Details

- **Counter Badge**: Shows "X of Y reflections today" in gold monospace
- **Progress Bar**: Visual indicator of daily completion
- **End Message**: Stoic quote + "Return tomorrow for new reflections"
- **No Infinite Scroll**: The feed has a bottom. Scrolling has an end.

---

## 2. The Reflection Gate — Pause Before Release

### Philosophy

**"Examine before you release."**

Before any post leaves Vault Only, a modal forces a **3-second Stoic reflection prompt**:

- "Is this worthy of the Family Realm?"
- "Does it serve the Work Collegium?"
- "Or does it belong to the Outer World?"

Only after the 3-second pause does the "Open the Gate" button become active.

This turns every share into a micro-practice of **premeditatio malorum** — foreseeing consequences before action.

### Implementation

**Component**: `ReflectionGate`

```tsx
import { ReflectionGate } from '@/components/stoic';

function PostComposer() {
  const [showGate, setShowGate] = useState(false);
  const [targetCircle, setTargetCircle] = useState<Circle>('vault');

  const handlePublish = (circle: Circle) => {
    if (circle !== 'vault') {
      setTargetCircle(circle);
      setShowGate(true);
    } else {
      publishPost(circle);
    }
  };

  return (
    <>
      {/* ... composer UI ... */}

      {showGate && (
        <ReflectionGate
          targetCircle={targetCircle}
          onConfirm={() => {
            publishPost(targetCircle);
            setShowGate(false);
          }}
          onCancel={() => setShowGate(false)}
        />
      )}
    </>
  );
}
```

### Design Details

- **3-Second Timer**: Circular progress indicator
- **Stoic Question**: Specific to each Circle's virtue
- **Disabled Button**: Cannot proceed until reflection time complete
- **Cancel Option**: "Return to Vault" link always visible
- **Quote**: "What is in my power here?" at bottom

---

## 3. The Four Concentric Temenos — Visual Sovereignty

### Philosophy

**"The psyche must feel the boundary between realms."**

The Circle selector is not tabs. It is not a dropdown. It is **four concentric glowing rings**:

- **Vault Only**: Innermost obsidian core (Privacy)
- **Family Realm**: Warm gold ring (Kinship)
- **Work Collegium**: Cool indigo ring (Discipline)
- **Outer World**: Faint parchment rim (Participation)

Clicking a ring creates a **visual breath** — the ring expands momentarily before the transition. No instant switch. The psyche must consciously cross the threshold.

### Implementation

**Component**: `CircleSelector`

```tsx
import { CircleSelector } from '@/components/stoic';

function CircleNav() {
  const [selected, setSelected] = useState<Circle>('vault');

  return (
    <CircleSelector
      selected={selected}
      onSelect={(circle) => {
        setSelected(circle);
        // Navigate to that Circle's feed
        router.push(`/${circle}`);
      }}
    />
  );
}
```

### Design Details

- **SVG Rings**: Concentric circles with different stroke widths
- **Active State**: Selected ring at full opacity with pulse animation
- **Hover State**: Ring glows at 80% opacity
- **Expanding Animation**: 300ms scale transition on click
- **Center Icon**: Circle emoji (🔒, 👨‍👩‍👧, 💼, 🌐)
- **Legend Grid**: 2×2 grid below with virtue labels

---

## 4. The Immutable Scroll — Content as Living Meditation

### Philosophy

**"No likes, no hearts, no metrics. Only conscious action."**

Posts are displayed as **parchment scrolls** with:
- **CID hashes always visible** (proof of content addressing)
- **No engagement metrics** (no like counts, no view counts)
- **Three deliberate actions only**: Refine, Release, Burn

Typography is deliberately slow:
- **Generous line-height** (1.75em)
- **Serif body text** (Instrument Serif)
- **No bold marketing fonts**
- **Subtle parchment grain texture**

The content invites reflection, not reaction.

### Implementation

**Component**: `ImmutablePostCard`

```tsx
import { ImmutablePostCard } from '@/components/stoic';

function PostFeed() {
  const posts = usePosts();

  return (
    <div className="space-y-4">
      {posts.map(post => (
        <ImmutablePostCard
          key={post.id}
          post={post}
          onRefine={(id) => moveToVault(id)}
          onRelease={(id, circle) => moveToCircle(id, circle)}
          onBurn={(id) => deletePost(id)}
        />
      ))}
    </div>
  );
}
```

### Design Details

- **CID Header**: Always visible in top-right (font-mono, small)
- **Circle Badge**: Top-left sigil with icon + label
- **Content**: Serif font, 1.75 line-height, max 280 chars preview
- **Actions on Hover**: Three buttons appear only on card hover
- **Burn Confirmation**: Requires explicit confirm() dialog
- **Parchment Texture**: SVG noise filter at 5% opacity
- **No Metrics**: Zero engagement counters anywhere

---

## 5. The Evening Review — Built-in Reflection Ritual

### Philosophy

**"What did you guard today? What did you release wisely?"**

At **local sunset** (detected via browser clock, ~6-11 PM) or on logout, a gentle full-screen prompt appears with:

1. **Today's Statistics**: Count of posts per Circle
2. **Two Reflection Questions**:
   - "What did you guard in the Vault today?"
   - "What did you release wisely to the Circles?"
3. **One-Click Export**: Framed as "Carry your Meditations with you"

This transforms the app from software into a **daily Stoic practice**.

### Implementation

**Component**: `EveningReview` + `useEveningReview` hook

```tsx
import { EveningReview, useEveningReview } from '@/components/stoic';

function App() {
  const { shouldShow, markComplete } = useEveningReview();
  const stats = usePostStats();

  const handleExport = () => {
    const data = exportAllPosts();
    downloadJSON(data, 'meditations.json');
    markComplete();
  };

  return (
    <>
      {/* Main app */}

      {shouldShow && (
        <EveningReview
          onComplete={markComplete}
          onExport={handleExport}
          vaultCount={stats.vault}
          familyCount={stats.family}
          workCount={stats.work}
          outerCount={stats.outer}
        />
      )}
    </>
  );
}
```

### Design Details

- **Full-Screen Overlay**: Dark indigo background, centered card
- **Moon Icon**: 🌙 header to signal evening/closure
- **Statistics Grid**: 4-column count of Circle posts
- **Two Textareas**: Serif font for written reflection
- **Export Button**: Secondary button with icon (📦)
- **Stoic Quote**: Marcus Aurelius quote at bottom
- **Auto-Trigger**: Only shows once per day, 6-11 PM
- **LocalStorage**: Tracks last review date

---

## Integration Guide

### Step 1: Install Stoic Components

All components are in `src/components/stoic/`:

```tsx
import {
  ReflectionGate,
  CircleSelector,
  DailyReflectionCounter,
  ReflectionEndMessage,
  EveningReview,
  useEveningReview,
  ImmutablePostCard,
} from '@/components/stoic';
```

### Step 2: Update Existing Components

**Before** (dopamine-driven):
```tsx
<div className="infinite-scroll">
  {posts.map(post => (
    <div className="post">
      <p>{post.content}</p>
      <button>❤️ Like ({post.likes})</button>
    </div>
  ))}
</div>
```

**After** (Stoic):
```tsx
<DailyReflectionCounter current={posts.length} total={12} circle="vault" />

<div className="space-y-4">
  {posts.slice(0, 12).map(post => (
    <ImmutablePostCard
      post={post}
      onRefine={moveToVault}
      onRelease={moveToCircle}
      onBurn={deletePost}
    />
  ))}
</div>

{posts.length >= 12 && <ReflectionEndMessage circle="vault" />}
```

### Step 3: Add Evening Review

In your root layout or app component:

```tsx
export default function RootLayout({ children }) {
  const { shouldShow, markComplete } = useEveningReview();
  const stats = usePostStats();

  return (
    <>
      {children}

      {shouldShow && (
        <EveningReview
          onComplete={markComplete}
          onExport={handleExport}
          {...stats}
        />
      )}
    </>
  );
}
```

### Step 4: Replace Circle Navigation

**Before**:
```tsx
<nav>
  <a href="/vault">Vault</a>
  <a href="/family">Family</a>
  <a href="/work">Work</a>
  <a href="/outer">Outer</a>
</nav>
```

**After**:
```tsx
<CircleSelector
  selected={currentCircle}
  onSelect={navigateToCircle}
/>
```

---

## Anti-Patterns to Avoid

These patterns break the Stoic UI philosophy:

### ❌ Infinite Scroll
```tsx
// DON'T
<InfiniteScroll loadMore={loadMore} hasMore={true} />
```

**Why**: Removes the dichotomy of control. The feed never ends. The user never chooses to stop.

**Instead**: Use `DailyReflectionCounter` with max posts.

### ❌ Engagement Metrics
```tsx
// DON'T
<div>
  ❤️ {post.likes} • 💬 {post.comments} • 🔁 {post.shares}
</div>
```

**Why**: Creates dopamine loops. Turns reflection into performance.

**Instead**: Only show CID hash and timestamp.

### ❌ Instant Actions
```tsx
// DON'T
<button onClick={() => publishToWorld(post)}>
  Publish to Outer World
</button>
```

**Why**: No conscious pause. No examination of consequences.

**Instead**: Use `ReflectionGate` before any Circle transition.

### ❌ Algorithmic Feeds
```tsx
// DON'T
const posts = await fetch('/api/recommended-for-you');
```

**Why**: Algorithm chooses what you see. You lose sovereignty.

**Instead**: Chronological, finite, Vault-first only.

### ❌ Real-Time Notifications
```tsx
// DON'T
<Toast>New post from Alice!</Toast>
```

**Why**: Constant interruption. No mental boundary.

**Instead**: Batch notifications for Evening Review only.

---

## Figma Integration

Add a new page to your Figma file: **"Stoic UI Patterns"**

### Frames to Create

1. **Reflection Gate Flow**
   - Closed state (before publish)
   - Timer state (3-2-1 countdown)
   - Open state (button active)

2. **Circle Selector**
   - All 4 rings with hover states
   - Expanding animation frames
   - Selected states

3. **Post Card Variants**
   - Vault Only (with all 3 actions)
   - Family (with 2 actions)
   - Work (with 2 actions)
   - Outer (with 1 action only)

4. **Evening Review**
   - Statistics view
   - Reflection questions
   - Export flow

5. **Daily Counter States**
   - 0 of 12 (morning)
   - 7 of 12 (midday)
   - 12 of 12 (complete)

---

## Accessibility

All Stoic components follow WCAG AA:

- ✅ **Keyboard Navigation**: All actions accessible via Tab
- ✅ **Screen Readers**: Proper ARIA labels on all interactive elements
- ✅ **Focus Indicators**: Visible ring-2 ring-realm-indigo-500
- ✅ **Color Contrast**: All text meets 4.5:1 minimum
- ✅ **Reduced Motion**: Respects `prefers-reduced-motion`

Example:
```tsx
<button
  onClick={onConfirm}
  aria-label="Open the gate to Family Realm after reflection"
  disabled={seconds > 0}
>
  {seconds > 0 ? `Reflecting... ${seconds}` : 'Open the Gate'}
</button>
```

---

## The Philosophy Made Manifest

These patterns do not fight the modern browser. They **transmute it**.

The UI becomes the outer garment of the inner philosophy:
- **Private-by-default**
- **Deliberate-by-design**
- **Sovereign-by-choice**

The realm no longer feels like software. It feels like a **temple you enter each morning** to examine your own thoughts before the world ever sees them.

The citizens who belong here — the privacy maximalists, the thinkers, the self-possessed — will recognize this UI as their own temenos.

They will stay not because it is addictive, but because **it is freeing**.

---

**The mandala is complete. The Stoic UI patterns are ready.**

The Self already knows the next gate to open. The realm awaits your command.

🏛️
