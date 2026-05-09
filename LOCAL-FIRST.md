# The Local-First Mandala: Frameworks of the Sovereign Psyche (2026 Edition)

> "The client is not a thin view begging data from the cloud. The client is the citadel — a node in the distributed kosmos, holding its own truth."
> — Echoing the Ink & Switch manifesto through the voice of Marcus Aurelius, who would have stored his *Meditations* in the Vault of his own mind, not on some distant server.

> "Local-first is the architectural expression of individuation: the Self confronts its data in solitude before any projection into the collective."
> — C.G. Jung, refracted through the browser window of 2026.

In the year of our sovereign reckoning (May 2026), the local-first movement has burst from research paper into living architecture. No longer a fringe ideal from 2019, it is now the *prima materia* for any application that refuses the shadow of surveillance capitalism. The browser is no longer a mere viewport — it is the *temenos*, the sacred enclosure where data lives first, syncs second, and belongs always to the user.

**SovereignRealm was forged in this fire from the beginning.**

Its current stack — **Next.js 16 + React 19 + native browser primitives** (IndexedDB, localStorage fallback, Web Crypto API, OPFS-aware where supported) — is not a limitation. It is a deliberate **ascetic practice**. You do not drag in a heavy sync engine unless the Circles demand it. The Vault Only remains pure. The data never leaves the device until you, the sovereign, open the gate.

Yet the ecosystem has matured into a rich pantheon. This document maps the major frameworks of 2026 against the soul of SovereignRealm. Use it to guide evolution, not reinvention.

---

## The 2026 Local-First Pantheon: A Comparative Mandala

| Framework / Tool | Core Strength (2026 State) | Sync / Collaboration Model | Storage Engine | Browser Performance (Real-World) | Philosophical Alignment with SovereignRealm | Shadow / Limitation | Integration Path for SovereignRealm? |
|------------------|---------------------------|---------------------------|----------------|----------------------------------|---------------------------------------------|---------------------|--------------------------------------|
| **Current SovereignRealm Stack** (Browser Primitives + Next.js) | Pure local-first by design. Zero external deps for core Vault. Web Crypto for encryption. | None by default. Optional ActivityPub federation only for Outer World. | IndexedDB + localStorage + Web Crypto + CID hashing. OPFS-ready. | Excellent for personal scale (single user). No CRDT overhead. | ✅ **Perfect**: Data sovereignty as moral imperative. Private-by-default. | No built-in multi-device sync or real-time collab within Circles. | — (This is the foundation) |
| **RxDB** | Most mature offline-first DB for complex queries. Regex on 1M docs in ~120ms via OPFS + workers. | Replicache-style or custom sync layers. | OPFS (primary), IndexedDB fallback. Sharding across Web Workers. | Near-native speed in browser/mobile. | ✅ **High**: User owns data; sync is optional. | Heavier bundle if overkill for simple posts. | **High** — Replace IndexedDB layer for richer queries in Vault + Circles. |
| **Yjs** | Gold-standard CRDT library. Battle-tested for real-time collab. | Real-time via y-websocket / y-indexeddb. | Any (pairs with IndexedDB/OPFS). | Lightweight; powers TipTap, BlockNote. | ✅ **Medium-High**: Enables "Family Realm" live editing without losing sovereignty. | Can tempt over-collaboration (shadow of the collective). | **Excellent** — Add for collaborative posts inside trusted Circles. |
| **Automerge** | Document-oriented CRDT, Rust-backed for safety. | Peer-to-peer or custom sync. | IndexedDB/OPFS. | Solid, especially for structured data. | ✅ **High**: Emphasizes long-term ownership. | Steeper learning curve than Yjs. | **Strong** — Future-proof for immutable post history. |
| **Zero** (Replicache successor) | Wins most 2026 sync-engine shootouts for DX and speed. | Serverless-first sync with local DB. | SQLite via wa-sqlite + OPFS. | Blazing for optimistic writes. | ✅ **High**: Client-as-authority. | Still maturing on extreme scale. | **Consider** if multi-device Vault sync becomes a Circle feature. |
| **PowerSync** | SQLite in browser (wa-sqlite) + Postgres sync. | Bidirectional with row-level security. | wa-sqlite + OPFS. | Production-ready for complex apps. | ⚠️ **Medium**: Great for hybrid, but leans server-assisted. | Less "pure" local-first than RxDB/Zero. | **Optional** — If federation evolves to private Postgres mirrors. |
| **ElectricSQL** | Postgres → local SQLite sync with CRDTs. | Live, reactive queries. | wa-sqlite. | Good, but controversial DX in some reports. | ⚠️ **Medium**: Powerful but can pull toward cloud. | Labeled "radioactive" by some architects in 2026 (sync complexity). | ❌ **Avoid** unless needing Postgres bridge. |
| **Jazz / DXOS / Triplit** | Full local-first frameworks (beyond DB). | Built-in auth, sync, P2P options. | Varies (OPFS-native). | Emerging; strong for end-to-end apps. | ✅ **High** for Jazz/DXOS: True data ownership. | Younger ecosystems; less battle-tested. | 👀 **Watch** — Could inspire next-gen Realm SDK. |

---

## Key 2026 Trends Visible in the Mandala

### 1. OPFS + wa-sqlite: The New Baseline
**Origin Private File System (OPFS) + wa-sqlite** has become the new baseline for serious local storage — near-native I/O without leaving the browser. Apps can now handle SQLite databases with performance rivaling native applications.

**Impact on SovereignRealm**: Future vault upgrades could leverage OPFS for massive post collections while maintaining zero-server architecture.

### 2. CRDTs Dominate Collaborative Use Cases
**Conflict-Free Replicated Data Types** (Yjs, Automerge) dominate where Circles might one day collaborate in real time. The Family Realm could enable shared albums or collaborative posts without sacrificing sovereignty.

**Impact on SovereignRealm**: Yjs integration would enable real-time Family/Work Circle collaboration while keeping data local-first.

### 3. Sync Engines Solve Multi-Device Without Cloud Lock-In
Modern sync engines (Zero, PowerSync) solve the "multi-device Vault" problem without sacrificing sovereignty. Your data syncs across your devices, not through someone else's cloud.

**Impact on SovereignRealm**: Phase 3 evolution could add optional peer-to-peer sync or user-controlled sync servers.

### 4. The Ecosystem Has Awakened
The entire space is exploding:
- **Local First Conf** (Berlin, July 2026)
- **FOSDEM Local-First DevRoom**
- **lofi.so directory** - Curated local-first tools

The collective unconscious has awakened to data ownership.

---

## SovereignRealm's Unique Daimon in This Landscape

**Most local-first apps chase collaboration-first (the outer projection). SovereignRealm chose containment-first (the inner Vault).**

Your current browser-native approach is not outdated — it is **Stoic minimalism**. It achieves the seven ideals of the 2019 Ink & Switch paper with zero ceremony:

### The Seven Ideals (Ink & Switch, 2019)

1. ✅ **No spinners** - Instant response (local-first)
2. ✅ **Your work is not trapped on one device** - JSON export always available
3. ✅ **The network is optional** - Works fully offline
4. ✅ **Seamless collaboration** - Optional via ActivityPub for public posts
5. ✅ **The Long Now** - Your data outlives any service
6. ✅ **Security and privacy by default** - Private-by-default, Web Crypto encryption
7. ✅ **You retain ultimate ownership** - Browser vault, your keys, your rules

**You only federate what virtue demands. This is the psychological revolution: individuation before participation.**

---

## Architectural Philosophy: The Three Vaults

SovereignRealm's local-first architecture is built on three concentric vaults:

### 1. The Inner Vault (Current Implementation)
```typescript
// Browser-native primitives
const vault = {
  storage: 'IndexedDB',           // Primary storage
  fallback: 'localStorage',        // Legacy support
  encryption: 'Web Crypto API',    // Native encryption
  addressing: 'SHA-256 CIDs',      // Content-addressed
  sync: 'none',                    // Pure local-first
  export: 'JSON',                  // Freedom to leave
}
```

**Philosophy**: The prima materia. Data exists here first, processed in solitude, individuated before projection.

**Performance**: Excellent for personal scale (thousands of posts). Zero network overhead. Works offline always.

**Shadow**: No multi-device sync. Clear browser data = lost data (mitigated by export).

### 2. The Circle Vault (Future: RxDB + Yjs)
```typescript
// Enhanced for Circle collaboration
const circleVault = {
  storage: 'RxDB on OPFS',         // Richer queries
  collab: 'Yjs CRDTs',             // Real-time within Circles
  encryption: 'E2E via CircleKeys', // ERC-1155 gated
  sync: 'P2P or relay',            // Optional, user-controlled
  addressing: 'IPFS CIDs',         // Immutable history
}
```

**Philosophy**: The Family Realm and Work Collegium. Shared spaces where trusted souls collaborate without sacrificing sovereignty.

**Performance**: Near-native queries via OPFS. Real-time collaboration via WebRTC or relay.

**Shadow**: Complexity increases. Temptation to over-collaborate before individuation.

### 3. The Federated Vault (Current: ActivityPub)
```typescript
// Federation for the Outer World only
const federatedVault = {
  protocol: 'ActivityPub',          // Fediverse bridge
  storage: 'Fedify + local cache',  // Hybrid
  visibility: 'Public only',        // Never private Circles
  sync: 'Outbound push',            // One-way by default
  control: 'Opt-in always',         // Never default
}
```

**Philosophy**: The Outer World. Public projection after individuation is complete. The agora entered consciously, not compulsively.

**Performance**: Network-dependent. Async by design.

**Shadow**: Federation complexity. Potential for dilution of message across platforms.

---

## Recommended Evolution Path

### Phase 1: Pure Asceticism (Current - COMPLETE ✅)
- Browser primitives only
- Zero external sync dependencies
- Private-by-default
- One-click JSON export
- Perfect for MVP and individuation phase

**Mantras**: "The Vault is sovereign." "Data never leaves the device."

### Phase 2: Circle Collaboration (Next)
- Add **RxDB** for richer Vault queries (search, filter, sort across thousands of posts)
- Add **Yjs** for optional real-time collaboration in Family/Work Circles
- Implement **CircleKeys** (ERC-1155) for cryptographic Circle membership
- Add E2E encryption for Circle-shared content

**Mantras**: "Circles collaborate without surveillance." "The Family Realm is encrypted."

**Code Preview**:
```typescript
import { createRxDatabase } from 'rxdb'
import * as Y from 'yjs'

// Enhanced Vault with RxDB
const vaultDB = await createRxDatabase({
  name: 'sovereign_vault',
  storage: 'opfs',  // OPFS for performance
  multiInstance: false,
})

// Circle collaboration with Yjs
const familyDoc = new Y.Doc()
const familyPosts = familyDoc.getArray('posts')

// Real-time sync within Circle (P2P or relay)
const provider = new WebrtcProvider('family-circle-id', familyDoc)
```

### Phase 3: Multi-Device Vault Sync (Optional)
- Add **Zero** or **PowerSync** for seamless multi-device sync
- User-controlled sync servers (self-hostable)
- Still local-first: sync is enhancement, not requirement
- Conflicts resolved via CRDTs

**Mantras**: "Your devices sync through your server, not theirs." "The Vault expands, sovereignty remains."

**Code Preview**:
```typescript
import { Zero } from '@rocicorp/zero'

// Optional multi-device sync
const zero = new Zero({
  server: process.env.NEXT_PUBLIC_SYNC_SERVER || 'self-hosted',
  auth: siweAuth,  // Wallet-based authentication
})

// Client remains authoritative
const vault = zero.query('SELECT * FROM posts WHERE circle = "vault"')
```

### Phase 4: Full P2P Circles (Vision)
- Peer-to-peer Circle collaboration (no relay required)
- IPFS pinning for shared Circle content
- Threshold cryptography for Family Vaults
- Zero-knowledge proofs for Circle membership

**Mantras**: "The Circle is a distributed temple." "No single point of failure or surveillance."

---

## Integration Decision Matrix

When considering a new local-first technology, ask:

| Question | Requirement |
|----------|-------------|
| Does it preserve private-by-default? | Must not leak data without explicit user consent |
| Does it work offline-first? | Must function without network access |
| Does the user own the data? | Must enable export/migration without permission |
| Is sync optional, not mandatory? | Must not require external servers for core features |
| Does it respect the Vault's purity? | Must not force collaboration before individuation |
| Can it be self-hosted? | Must not require corporate infrastructure |
| Is it appropriate for the Circle? | Match tech to social context (Vault vs Family vs Outer) |

**Example**:
- ✅ **Yjs** for Family Circle collaboration - Passes all checks
- ❌ **ElectricSQL** for core Vault - Fails "sync optional" (too server-dependent)

---

## Technical Sovereignty Principles

### 1. The Browser is the Citadel
Never treat the browser as a "thin client." It is a full-fledged node in the distributed system. IndexedDB/OPFS can hold gigabytes. Web Crypto can encrypt. Service Workers can sync intelligently.

### 2. The Network is a Tool, Not a Master
Network sync (ActivityPub, P2P, relay) is a conscious choice made after the inner work is complete. The Vault exists first, federation follows virtue.

### 3. Export is Sacred
At any moment, the user can export their entire realm as JSON. This is the ultimate escape hatch from lock-in. No database is so complex that it cannot be serialized to human-readable formats.

### 4. Encryption Protects the Shadow
The Vault Only circle may contain raw, unprocessed thoughts — the shadow material. Web Crypto encryption ensures these never leak, even if the device is compromised.

### 5. Complexity Must Justify Itself
Every framework added must earn its weight. RxDB for complex queries? Justified. ElectricSQL for Vault storage? Unjustified (too server-heavy).

---

## The Local-First Manifesto for SovereignRealm

We believe:

1. **Your data belongs in your hands first** - Browser, not cloud
2. **Collaboration is chosen, not forced** - Circles are opt-in
3. **The network augments, never replaces** - Offline-first always
4. **Privacy is the default, not a setting** - Vault Only comes first
5. **You can leave anytime** - One-click JSON export
6. **Sync is peer-to-peer or self-hosted** - Never corporate surveillance
7. **Encryption is native, not bolted-on** - Web Crypto from day one

**We refuse**:
- ❌ Cloud-first architectures that treat local storage as a cache
- ❌ Sync systems that require corporate infrastructure
- ❌ Collaboration features that eliminate private space
- ❌ Lock-in via proprietary formats or protocols
- ❌ Privacy as a paid tier or premium feature

---

## Resources & Further Reading

### Foundational Texts
- **[Ink & Switch: Local-First Software](https://www.inkandswitch.com/local-first/)** (2019) - The founding manifesto
- **[Local-First Web Development](https://localfirstweb.dev/)** (2024+) - Practical guide for web devs

### 2026 Ecosystem
- **[lofi.so](https://lofi.so)** - Curated directory of local-first tools
- **Local First Conf** (Berlin, July 2026) - Annual gathering
- **[FOSDEM Local-First DevRoom](https://fosdem.org)** - February conference track

### Technical Deep Dives
- **[RxDB Documentation](https://rxdb.info/)** - Offline-first database
- **[Yjs Documentation](https://docs.yjs.dev/)** - CRDT collaboration
- **[Zero Documentation](https://zero.rocicorp.dev/)** - Modern sync engine
- **[Automerge](https://automerge.org/)** - Document CRDTs

### Philosophical Context
- **Marcus Aurelius, *Meditations*** - Stoic practice of inner containment
- **C.G. Jung, *Memories, Dreams, Reflections*** - Individuation before projection
- **Ink & Switch Research** - Technical manifestation of data sovereignty

---

## For Contributors: The Sacred Constraints

If you contribute to SovereignRealm, you inherit these constraints:

1. **Never break offline-first** - All features must work without network
2. **Preserve the Vault's purity** - Private-by-default is non-negotiable
3. **Respect the Three Vaults** - Inner (solo), Circle (trusted), Outer (public)
4. **Justify complexity** - Simple > clever
5. **Enable export always** - Freedom to leave > network effects
6. **Encryption is standard** - Web Crypto, not optional add-on
7. **Self-hosting over SaaS** - User-controlled infrastructure

**These are not preferences. These are the architectural expression of the philosophy.**

---

## Conclusion: The Citadel Stands

The local-first ecosystem of 2026 offers rich tools for evolution. But SovereignRealm's **browser-native, private-by-default, zero-server foundation** is not a limitation to overcome — it is the philosophical core to protect.

As you integrate RxDB for richer queries, Yjs for Circle collaboration, or Zero for multi-device sync, never forget:

> **The Vault exists first. Federation follows virtue. Individuation precedes participation.**

The frameworks of 2026 are merely tools that may one day stand guard at the outer gates — **never the throne itself.**

---

**The inner citadel remains yours. The local-first mandala is your map, not your master.**

---

## Related Documentation

### Philosophy
- **[PHILOSOPHY.md](./PHILOSOPHY.md)** - Why SovereignRealm exists (Jungian/Stoic manifesto + DeSoc shadow analysis)
- **[README.md](./README.md)** - Project overview and quick start

### Technical Depth
- **[REALM.md](./REALM.md)** - Feature documentation + roadmap + local-first foundations
- **[REALM.md - Technical Foundations](./REALM.md#technical-foundations-the-mandala-of-architectures)** - DeSoc platform comparison (Farcaster, Lens, DeSo, Nostr)
- **[WEB3_GUIDE.md](./WEB3_GUIDE.md)** - Web3 integration (wagmi, viem, SIWE, ENS)
- **[CONTRACTS.md](./CONTRACTS.md)** - Smart contracts (SovereignProfile, CircleKeys)
- **[FEDERATION.md](./FEDERATION.md)** - ActivityPub federation guide

### Quick Start
- **[QUICKSTART.md](./QUICKSTART.md)** - 30-second user guide

---

🏛️ **Return to your realm: [README.md](./README.md)**
