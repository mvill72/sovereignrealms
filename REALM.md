# SovereignRealm - Your Digital Citadel

> *For the essential vision, read [MANIFESTO.md](./MANIFESTO.md) - The founding principles in crystallized form.*

## What Is This?

A **privacy-first, self-owned social platform** where you control your identity and data. Think Facebook, but:

- 🔒 **Private by default** - All content stays in your browser vault
- 🌐 **Content-addressed storage** - Posts hashed with IPFS-style CIDs
- 🎭 **Circle-based sharing** - Choose who sees what (Family, Work, Public, or Private)
- 📦 **Portable identity** - Export all your data anytime
- 🚫 **No surveillance** - No central server tracking you

## Current Implementation (MVP + Web3)

### ✅ What Works Now

1. **Web3 Identity** ⭐ NEW
   - Connect any Ethereum wallet (MetaMask, Rainbow, Coinbase, etc.)
   - ENS name and avatar auto-resolution
   - Sign-In with Ethereum (SIWE) authentication
   - Multi-chain support (Mainnet, Sepolia, Polygon, Optimism, Arbitrum, Base)
   - Cryptographic proof of identity

2. **Profile Management**
   - Edit your name and bio
   - Wallet-based identity with ENS
   - Auto-generated avatar or ENS avatar
   - Local storage persistence

3. **Post Creation**
   - Write thoughts/updates
   - Choose visibility level (Private/Family/Work/Public)
   - Content hashing (SHA-256 based CIDs)
   - IPFS-style content addressing

4. **Circle System**
   - Four visibility levels with distinct UI
   - Stats tracking per circle
   - Visual indicators for each post

5. **Data Sovereignty**
   - All data in localStorage
   - One-click export to JSON
   - No server uploads (everything local)
   - Wallet-based authentication (no passwords)

### 🔧 How It Works

**Content Hashing**: Each post generates a deterministic hash (CID) similar to IPFS:
- Uses Web Crypto API (SHA-256)
- Content-addressed (same content = same hash)
- Stored locally with CID as key
- Ready to upgrade to real IPFS pinning

**Storage Architecture**:
```
localStorage
├── sovereign_profile   (your identity)
├── sovereign_posts     (all posts array)
└── ipfs-{cid}          (content cache by CID)
```

## Architecture

```
src/
├── app/
│   └── page.tsx        # Main SovereignRealm interface
└── utils/
    ├── ipfs.ts         # Content-addressed hashing
    └── storage.ts      # Local vault management
```

## Local-First Foundations

> "The client is not a thin view begging data from the cloud. The client is the citadel — a node in the distributed kosmos, holding its own truth."

SovereignRealm is built on **pure local-first principles** using native browser primitives. This is not a limitation — it is a deliberate architectural choice aligned with the philosophy of sovereignty.

### Current Stack: Stoic Minimalism

**Browser Primitives**:
- **IndexedDB** - Primary storage for posts and profile
- **localStorage** - Fallback and settings
- **Web Crypto API** - Native encryption (SHA-256, AES-GCM)
- **OPFS-ready** - Future-proof for enhanced performance

**Performance**:
- ✅ Instant response (no network latency)
- ✅ Works fully offline
- ✅ Handles thousands of posts effortlessly
- ✅ Zero server costs or dependencies

**Philosophy**: The Vault exists first. Data never leaves the device unless you consciously choose federation or export.

### The 2026 Local-First Landscape

| Framework | Best For | Alignment with SovereignRealm | Integration Priority |
|-----------|----------|-------------------------------|---------------------|
| **Browser Primitives** (current) | Pure local-first, single-user Vault | ✅ Perfect - Zero deps, pure sovereignty | **Foundation** |
| **RxDB** | Complex queries on large datasets | ✅ High - Enhanced Vault search/filter | **Phase 2** - For richer querying |
| **Yjs** | Real-time collaboration via CRDTs | ✅ High - Family/Work Circle collab | **Phase 2** - For Circle features |
| **Automerge** | Immutable document history | ✅ High - Post version control | **Phase 3** - For advanced features |
| **Zero** | Multi-device sync | ✅ High - Vault across devices | **Phase 3** - Optional sync |
| **PowerSync** | Hybrid local + Postgres | ⚠️ Medium - Server-dependent | **Optional** - If needed for federation |
| **ElectricSQL** | Postgres-first sync | ❌ Low - Too cloud-centric | **Avoid** - Conflicts with philosophy |

**Full comparison**: See [LOCAL-FIRST.md](./LOCAL-FIRST.md) for the complete technical mandala and integration roadmap.

### The Seven Ideals (Achieved)

Based on the foundational [Ink & Switch paper (2019)](https://www.inkandswitch.com/local-first/):

1. ✅ **No spinners** - Instant response (local-first)
2. ✅ **Your work is not trapped** - JSON export always available
3. ✅ **The network is optional** - Works fully offline
4. ✅ **Seamless collaboration** - Optional via ActivityPub for public posts
5. ✅ **The Long Now** - Your data outlives any service
6. ✅ **Security and privacy by default** - Private-by-default, Web Crypto encryption
7. ✅ **You retain ultimate ownership** - Browser vault, your keys, your rules

### Evolution Without Compromise

Future enhancements will follow this principle:

> **The Vault exists first. Federation follows virtue. Individuation precedes participation.**

As we integrate advanced local-first technologies (RxDB, Yjs, Zero), the core constraint remains: **private-by-default, offline-first, user-owned.**

## Next Steps - The Roadmap to Full Sovereignty

### ✅ Phase 2: Web3 Identity (COMPLETED!)
See [WEB3_GUIDE.md](./WEB3_GUIDE.md) for full documentation.

**What's Live**:
- ✅ Wallet connection (RainbowKit)
- ✅ Sign-in with Ethereum (SIWE)
- ✅ ENS integration (names + avatars)
- ✅ Multi-chain support
- 🚧 Profile NFT (next step)

### Phase 3: Smart Contracts
```bash
forge init contracts
```

**Build**:
- Profile NFT contract (Solidity)
- Circle access tokens (ERC-1155 for family/work keys)
- On-chain identity registry
- Decentralized ENS-style usernames

> **For the complete cryptographic and philosophical deep-dive on CircleKeys**, see [CONTRACTS.md - CircleKeys Deep-Dive](./CONTRACTS.md#circlekeys-deep-dive-the-cryptographic-guardians)

### Phase 4: Real IPFS Integration
```bash
# Option A: web3.storage (easiest)
bun add @web3-storage/w3up-client

# Option B: Pinata (developer-friendly)
bun add pinata-web3

# Option C: Self-hosted IPFS node (Docker)
docker run -d ipfs/kubo
```

**Upgrade**:
- Pin content to real IPFS network
- Use gateway for image hosting
- Decentralized content delivery

### Phase 5: Federation & Cross-Realm

**Build**:
- Activity Pub protocol integration
- Cross-realm messaging
- Decentralized social graph
- Fediverse compatibility

### Phase 6: Encryption & Family Vaults

**Add**:
- E2E encryption for private posts
- Shared family vault (multi-sig or threshold)
- Encrypted shared albums
- Key management via hardware wallets

## Upgrade Paths

### Quick Win: Add Real IPFS with web3.storage

1. Get API key: https://web3.storage
2. Update `src/utils/ipfs.ts`:
```typescript
import { create } from '@web3-storage/w3up-client'

export async function uploadToIPFS(content: string) {
  const client = await create()
  await client.login('your@email.com')
  const cid = await client.uploadFile(new Blob([content]))
  return cid.toString()
}
```

### Add Wallet Connection

1. Install dependencies:
```bash
bun add wagmi viem @rainbow-me/rainbowkit
```

2. Wrap app with providers (see RainbowKit docs)
3. Replace profile avatar with ENS avatar
4. Store profile on-chain or IPFS

## Philosophy

This is not just another social app. It's a **template for digital sovereignty**:

1. **Individual First**: Your realm is yours. No forced sharing.
2. **Conscious Circles**: You choose what to share, with whom, always.
3. **Portable Identity**: Your data, your keys, your rules.
4. **Progressive Decentralization**: Start local, upgrade to full Web3 as needed.

## Inspiration & Vision

> "Rule first your own domain, let the outer world remain indifferent."
> — Marcus Aurelius (adapted)

> "Until you make the unconscious conscious, it will direct your life and you will call it fate."
> — Carl Jung

This realm is your **digital mandala** - a protected space for individuation in the age of surveillance capitalism.

## Why SovereignRealm Exists: A Confrontation with the Shadows of DeSoc

The year is 2026. **Farcaster's** Frames pulse with activity yet remain tethered to the visible chain. **Lens's** Social Primitives enable infinite composition, yet every relation is minted before it is felt. **DeSo** turns thoughts into tradable assets. **Nostr** scatters them across relays.

**All four have liberated the graph. None have fully liberated the psyche.**

SovereignRealm is the missing archetype: the **local-first vault** where the Jungian process of individuation meets the Stoic discipline of self-mastery. Here you guard the *prima materia* of your thoughts. Only when the inner *logos* is clear do you open the Circles — Family, Collegium, Outer World — or federate into the Fediverse.

### The Shadows of Web3 Social

| Platform | Strength | Shadow |
|----------|----------|--------|
| **Farcaster** | Lively decentralized agora with Frames | Engagement before reflection |
| **Lens** | Composable on-chain social primitives | Token before Self |
| **DeSo** | Native L1 for social with creator economy | Economy before psyche |
| **Nostr** | Censorship-resistant relay network | Broadcast before containment |
| **SovereignRealm** | Local-first vault for individuation | ✅ Inner work before outer projection |

### Roadmap Alignment

While others chase DAU and token velocity, we:
- **Deepen the Vault** - Enhanced encryption, multi-device sync with local-first principles
- **Refine CircleKey Cryptography** - ERC-1155 gating with threshold signatures
- **Expand Multi-Chain NFT Portability** - Profile NFT that lives across chains
- **Perfect the One-Click JSON Exodus** - True data liberation, no lock-in

**Scale is secondary to sovereignty.** The network will grow not through hype, but through souls who have first learned to rule themselves.

> For the complete philosophical manifesto and detailed platform comparison, see [PHILOSOPHY.md](./PHILOSOPHY.md)

---

## Technical Foundations: The Mandala of Architectures

> "Know thyself" — not through the oracle of the chain, but through the silent vault where the Self first confronts its own code.
> — Marcus Aurelius, rendered for the architect of sovereign systems

> "The shadow of every technology is the unintegrated fragment it refuses to contain."
> — C.G. Jung, speaking to the builders of 2026

This technical comparison reveals the *daimon* of each protocol: the unconscious architectural choice that shapes whether the user becomes sovereign or merely participates in the collective ledger.

### Appendix B: Technical Mandala — SovereignRealm vs. the Four Archetypes of DeSoc (2026 State)

| Technical Dimension | SovereignRealm (Local-First Citadel) | Farcaster (Hybrid Agora on Optimism) | Lens Chain (ZK SocialFi Hyperchain) | DeSo (Infinite-State L1) | Nostr (Relay Wanderer) |
|---------------------|--------------------------------------|-------------------------------------|-------------------------------------|--------------------------|------------------------|
| **Core Architecture** | Browser-native local-first. All state in IndexedDB + Web Crypto. Zero server unless user opts into federation or contract mint. | Hybrid: On-chain identity/permissions (3 contracts on Optimism L2) + off-chain Hubs + Snapchain (Malachite BFT consensus, Tendermint-derived, account sharding). | ZKsync ZK Stack Validium hyperchain + Avail DA. Modular on-chain Social Primitives (Profiles, Graphs, Feeds, Groups) with customizable Rules. | Purpose-built L1 blockchain optimized for infinite-state social data (posts, profiles, coins stored directly on-chain). Revolution PoS consensus. | Pure client-relay protocol. No blockchain. Events broadcast to user-chosen relays. Minimalist JSON events over WebSocket. |
| **Storage Model** | Local Vault (browser only). IPFS-style CID hashing for content addressing. One-click JSON export. No uploads by default. | Off-chain Hubs (replicated, verifiable) + on-chain storage metering. Snapchain for ordered social activity. | On-chain primitives + Avail DA for cheap, censorship-resistant data. Storage Nodes for decentralized content. | Fully on-chain "infinite state" — every post, like, follow stored permanently on L1. | Relays store and forward events. User chooses relays; no global guarantee. |
| **Identity Mechanism** | Wallet = Self. ENS as display sigil. Optional ERC-721 SovereignProfile NFT (multi-chain deployable). | Farcaster ID (FID) mapped to Ethereum custody address via IdRegistry on Optimism. | NFT Profile (composable, minted on Lens Chain). Handles and Graphs as on-chain primitives. | On-chain username + profile stored directly on DeSo L1. Creator coins tied to identity. | Raw public-key cryptography (secp256k1). No on-chain registry. |
| **Authentication** | SIWE (Sign-In With Ethereum) + wagmi/viem. No passwords, no email. | Wallet signature + KeyRegistry for EdDSA delegated signing keys. | Wallet or abstracted (phone/email via Lens) + ZK proofs. | Native wallet signature on DeSo L1. Cross-chain onboarding (MetaMask, etc.). | Nostr keypair only. No external auth needed. |
| **Privacy / Encryption Model** | Private-by-default. Four Circles enforced locally + optional ERC-1155 CircleKeys for cryptographic gating. Web Crypto API encryption. | Public-by-design with client-side gating. No native local encryption. | On-chain transparency + Rule-based access control. ZK privacy in some primitives. | Fully public and permanent on L1. No native private circles. | Key-based encryption possible (NIP-04/44 DMs). Privacy via relay choice, not enforced containment. |
| **Data Propagation / Sync** | Local-first. Optional ActivityPub federation (Fedify) for public Outer World posts. | Hub synchronization + Snapchain ordering. Clients read from any compliant Hub. | ZK rollup settlement + Storage Nodes. Cross-chain via Elastic Network. | Native L1 gossip and indexing. Built-in social graph propagation. | Direct relay-to-relay and client-to-relay WebSocket events. No global ordering guarantee. |
| **Scalability Approach** | Personal scale first (browser limits). Network grows via organic federation. Multi-chain contract deployment (Ethereum, Polygon, Base, etc.). | Snapchain + account-level sharding: 10k+ TPS, linear horizontal scaling. StorageRegistry meters usage (~$7/year). | ZKsync horizontal scaling + Avail DA sampling. Designed for consumer SocialFi at cloud-like costs. | L1 engineered for storage-heavy apps. Infinite-state optimization from genesis. | Infinite by design — add more relays. No global state bloat. |
| **Smart Contract Depth** | Optional & sovereign: ERC-721 Profile + ERC-1155 CircleKeys (Hardhat + OpenZeppelin). Deployed by user on any EVM chain. | Minimal: Only IdRegistry, StorageRegistry, KeyRegistry on Optimism. No per-post contracts. | Deep & modular: On-chain Social Primitives with customizable Rules, Open Actions, monetization modules. | None needed — social features are native L1 primitives (no smart contracts required for core social). | None. Protocol is not EVM-based. |
| **Frontend / Client Stack** | Next.js 16 + React 19 + Tailwind v4 + RainbowKit. Fully client-side. | Multiple clients (Warpcast flagship). Open protocol allows any frontend. | Multiple clients (Orb flagship) + Lens SDKs. | Native clients + web. Built-in social features. | Hundreds of open clients (Damus, etc.). Pure protocol — no official client. |
| **Interoperability / Federation** | Optional ActivityPub (true Fediverse bridge). Multi-chain NFT portability. | Cross-client via protocol. Limited Fediverse. | Elastic Network (ZKsync hyperchains) + cross-app composability. | Cross-chain social layer in progress (MetaMask, Solana, etc.). | Native relay federation. Works across any Nostr client/relay. |
| **Security & Trust Model** | Browser sandbox + Web Crypto. User controls private keys and data. Contracts optional. | Sufficient decentralization: on-chain anchors + decentralized Hubs. | Ethereum-secured ZK rollup + Avail DA. | L1 consensus security. Public and verifiable. | Cryptographic only. Trust in chosen relays. Censorship resistance via multiplicity. |
| **Development Paradigm** | Local-first philosophy. Code runs in user's browser. Contracts are user-minted tools, never the prison. | "Sufficient decentralization" — hybrid for UX + security. | Infrastructure-first: build on modular primitives. | Full-stack L1: social + money primitives out-of-the-box. | Minimalist protocol. Build anything on top. |

### Archetypal Integration Note for Developers

**SovereignRealm does not fight the others on their chosen battlegrounds. It precedes them.**

- Where **Farcaster** and **Lens** externalize the social graph to the chain or ZK layer for composability, SovereignRealm keeps the *prima materia* (your thoughts) in the local Vault until the individuated Self consciously releases it.

- Where **DeSo** and **Nostr** make every post a permanent broadcast or relay event, SovereignRealm enforces Stoic containment: the **Vault Only** Circle is the daily *Meditations* — examined, refined, and only then offered to Family, Collegium, or the federated Outer World.

**This architecture is not a compromise. It is the missing psychological layer the entire DeSoc ecosystem has unconsciously sought: local-first sovereignty as the foundation for true participation.**

---

## Technical Stack

- **Framework**: Next.js 16 (App Router), React 19
- **Styling**: Tailwind CSS v4
- **Storage**: Browser localStorage + Web Crypto API
- **Deployment**: Works on port 3000 (Vibecode forwarded)

## Data Privacy

- No analytics
- No telemetry
- No cookies
- No server uploads (yet - you control when/if that happens)
- Everything stays in your browser until you choose otherwise

---

**You are sovereign. Your data is yours. Share consciously.**
