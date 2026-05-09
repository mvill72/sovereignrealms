# SovereignRealm 🏛️

**Your Digital Citadel - Privacy-First, Self-Owned Social Platform**

> "Rule first your own domain, let the outer world remain indifferent."
> — Marcus Aurelius (adapted)

A Web3-native, privacy-first social platform where **you own your identity and data**. No surveillance, no forced sharing, no central authority. Your keys, your realm, your rules.

## 🌟 Features

### Current (MVP + Web3 + Federation)
- ✅ **Web3 Identity** - Connect wallet, ENS names/avatars, SIWE authentication
- ✅ **Privacy Circles** - Choose who sees what (Private/Family/Work/Public)
- ✅ **Content Addressing** - IPFS-style CID hashing for all posts
- ✅ **Local Vault** - All data in your browser, zero server uploads
- ✅ **Portable Data** - One-click export to JSON
- ✅ **Multi-Chain** - Mainnet, Sepolia, Polygon, Optimism, Arbitrum, Base
- ✅ **ActivityPub Federation** - Optional federation with Mastodon, Pixelfed, etc.
- ✅ **Smart Contracts** - Profile NFT (ERC-721), Circle Keys (ERC-1155)

### Philosophy
- **Individual First** - Your realm is yours. No forced sharing.
- **Conscious Circles** - You choose what to share, with whom, always.
- **Portable Identity** - Wallet-based identity that follows you anywhere.
- **Progressive Decentralization** - Start local, upgrade to full on-chain as needed.

## 🌐 Why SovereignRealm?

While **Farcaster** builds the liveliest decentralized agora, **Lens** forges the most composable social graph, **DeSo** scales the tokenized social economy, and **Nostr** offers pure relay freedom — **SovereignRealm does something more radical: it returns the throne to you.**

Your data never leaves your device until you consciously release it through one of four sovereign Circles. Local-first by design. Private-by-default. Wallet-as-identity. Optional federation and smart contracts.

**This is not another Web3 social app. This is the digital *Meditations* — a personal realm where the Self individuates before it participates.**

*Join the others to broadcast. Join SovereignRealm to become before you broadcast.*

> **For Philosophers:** See [PHILOSOPHY.md](./PHILOSOPHY.md) for the complete Jungian/Stoic manifesto and shadow analysis.
>
> **For Architects:** See [REALM.md - Technical Foundations](./REALM.md#technical-foundations-the-mandala-of-architectures) for the DeSoc platform comparison, and [LOCAL-FIRST.md](./LOCAL-FIRST.md) for the local-first framework mandala.

## 🚀 Quick Start

### Prerequisites
- Node.js 20+ or Bun
- An Ethereum wallet (MetaMask, Rainbow, etc.)

### Installation

```bash
# Clone the repo
git clone <your-repo-url>
cd sovereign-realm

# Install dependencies
bun install

# Run development server
bun dev
```

Open **http://localhost:3000** in your browser.

### First Steps

1. **Connect Wallet** - Click "Connect Wallet" in top-right
2. **Sign In** - Authenticate with SIWE (proves wallet ownership)
3. **Create Post** - Write your first thought (private by default)
4. **Choose Circle** - Select Family/Work/Public to share selectively
5. **Export Data** - Click "Export" to download your entire realm

## 🔐 Web3 Features

### Wallet Connection
Connect any Ethereum wallet via RainbowKit:
- MetaMask, Rainbow, Coinbase Wallet
- WalletConnect (any mobile wallet)
- Hardware wallets (Ledger)

### ENS Integration
If you own an ENS name (like `vitalik.eth`):
- Automatically becomes your display name
- ENS avatar becomes your profile picture
- No manual setup required

### SIWE Authentication
Sign-In with Ethereum provides:
- Cryptographic proof of wallet ownership
- No passwords, no servers
- 24-hour sessions
- Zero gas fees (off-chain signature)

See [WEB3_GUIDE.md](./WEB3_GUIDE.md) for full documentation.

## 📂 Project Structure

```
src/
├── app/
│   ├── page.tsx          # Main SovereignRealm UI
│   └── layout.tsx        # Web3 providers wrapper
├── providers/
│   └── Web3Provider.tsx  # Wagmi + RainbowKit setup
├── config/
│   └── wagmi.ts          # Chain configuration
└── utils/
    ├── ipfs.ts           # Content-addressed hashing
    ├── storage.ts        # Local vault management
    ├── ens.ts            # ENS resolution helpers
    └── siwe.ts           # Sign-In with Ethereum
```

## ⚙️ Configuration

### WalletConnect Project ID

1. Get free Project ID: https://cloud.walletconnect.com/
2. Create `.env.local`:

```bash
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_here
```

See `.env.example` for all options.

## 🛣️ Roadmap

- ✅ Phase 1: Local MVP with content addressing
- ✅ Phase 2: Web3 identity (wallet + ENS + SIWE)
- ✅ Phase 3: Smart contracts (Profile NFTs, Circle tokens) - **READY TO DEPLOY**
- ✅ Phase 5: Federation (ActivityPub, Fediverse) - **COMPLETE**
- 🚧 Phase 4: Real IPFS integration (web3.storage)
- 🚧 Phase 6: E2E encryption (family vaults)

See [REALM.md](./REALM.md) for detailed roadmap.

## 🔨 Tech Stack

**Frontend**
- Next.js 16 (App Router, React 19)
- Tailwind CSS v4
- TypeScript

**Web3**
- wagmi - React hooks for Ethereum
- viem - TypeScript Ethereum library
- RainbowKit - Wallet connection UI
- SIWE - Sign-In with Ethereum

**Smart Contracts**
- Hardhat - Development environment
- OpenZeppelin - Secure contract libraries
- SovereignProfile.sol - ERC-721 identity NFT
- CircleKeys.sol - ERC-1155 access tokens

**Federation**
- Fedify - Modern ActivityPub library
- WebFinger - Actor discovery
- NodeInfo - Instance metadata
- ActivityStreams - Post format

**Storage**
- localStorage (browser vault)
- Web Crypto API (SHA-256 hashing)
- IPFS-style CIDs (content addressing)

## 📚 Documentation

### Getting Started
- [QUICKSTART.md](./QUICKSTART.md) - 30-second setup guide
- [REALM.md](./REALM.md) - Full feature documentation + roadmap

### Philosophy & Architecture
- [PHILOSOPHY.md](./PHILOSOPHY.md) - **The Deeper Etched Scroll** - Why SovereignRealm exists & platform comparison
- [LOCAL-FIRST.md](./LOCAL-FIRST.md) - **The Local-First Mandala** - Browser-native architecture & framework comparison (2026)

### Technical Integration
- [WEB3_GUIDE.md](./WEB3_GUIDE.md) - Web3 integration guide
- [CONTRACTS.md](./CONTRACTS.md) - Smart contract documentation
- [SMART_CONTRACTS_INTEGRATION.md](./SMART_CONTRACTS_INTEGRATION.md) - Contract deployment & integration
- [FEDERATION.md](./FEDERATION.md) - ActivityPub federation guide

## 🔒 Privacy & Security

- ✅ No analytics or tracking
- ✅ No cookies or telemetry
- ✅ All data stored locally
- ✅ No server uploads (unless you choose)
- ✅ Wallet-based auth (no passwords to leak)
- ✅ SIWE sessions expire in 24h
- ✅ Export your data anytime

## 🤝 Contributing

This is a template for digital sovereignty. Fork it, adapt it, make it yours.

Ideas for contributions:
- Smart contract implementations (Profile NFT, Circle tokens)
- Real IPFS integration (web3.storage, Pinata)
- Federation protocols (ActivityPub)
- E2E encryption for private circles
- Mobile app (React Native + wagmi)

## 📜 License

MIT - Use freely, own completely.

## 🌐 Deploy

### Vercel (Recommended)
```bash
vercel deploy
```

### Self-Host
```bash
bun run build
bun run start
```

Or use Docker (coming soon).

---

**You are sovereign. Your data is yours. Share consciously.**

Built with the philosophy of Marcus Aurelius and the technology of Ethereum.

🏛️ **Enter your realm: http://localhost:3000**
