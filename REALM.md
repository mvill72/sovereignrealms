# SovereignRealm - Your Digital Citadel

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

## Technical Notes

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
