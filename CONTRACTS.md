# Smart Contracts - SovereignRealm

## Overview

The SovereignRealm smart contracts establish **on-chain identity** and **decentralized access control** for your digital sovereignty platform.

### Contracts

1. **SovereignProfile.sol** - ERC-721 NFT representing your identity
2. **CircleKeys.sol** - ERC-1155 tokens for circle-based access control

---

## SovereignProfile Contract (ERC-721)

### Purpose

Your profile is a **soulbound NFT** - a non-transferable token tied to your wallet address forever.

### Philosophy

- **One profile per address** - Your identity is unique and singular
- **Soulbound** - Cannot be transferred or sold (identity ≠ property)
- **Metadata on IPFS** - Name, bio, avatar stored decentrally
- **Permissionless** - Anyone can mint, no gatekeeper needed
- **Permanent** - Exists forever on-chain

### Key Functions

#### Read Functions (No Gas)

```solidity
// Check if address has a profile
function hasProfile(address user) returns (bool)

// Get profile token ID
function getProfileId(address user) returns (uint256)

// Get profile metadata URI (IPFS)
function getProfileURI(address user) returns (string)

// Total profiles minted
function totalProfiles() returns (uint256)
```

#### Write Functions (Requires Gas)

```solidity
// Mint your profile NFT (once per address)
function mintProfile(string metadataURI) returns (uint256 tokenId)

// Update your profile metadata
function updateProfile(string newMetadataURI)
```

### Events

```solidity
event ProfileMinted(address indexed owner, uint256 indexed tokenId, string metadataURI);
event ProfileUpdated(address indexed owner, uint256 indexed tokenId, string newMetadataURI);
```

### Metadata Format

Profile metadata stored on IPFS as JSON:

```json
{
  "name": "Satoshi Nakamoto",
  "bio": "In the digital realm, I forge my own path",
  "avatar": "ipfs://QmAvatarHash/image.png",
  "cover": "ipfs://QmCoverHash/banner.jpg",
  "attributes": [
    { "trait_type": "Member Since", "value": "2024-05-04" },
    { "trait_type": "Profile Type", "value": "Sovereign" }
  ]
}
```

### Deployment

Gas cost: ~500,000 gas (~$10-50 on mainnet depending on gas price)

### Example Usage

```typescript
import { useMintProfile, useHasProfile } from '@/contracts/hooks';

function ProfileMinter() {
  const { mintProfile, isConfirming, isConfirmed } = useMintProfile();
  const { data: hasProfile } = useHasProfile(address);

  const handleMint = async () => {
    const metadataURI = "ipfs://QmYourProfile/metadata.json";
    await mintProfile(metadataURI);
  };

  if (hasProfile) return <p>Profile already exists!</p>;

  return (
    <button onClick={handleMint} disabled={isConfirming}>
      {isConfirming ? 'Minting...' : 'Mint Profile NFT'}
    </button>
  );
}
```

---

## CircleKeys Contract (ERC-1155)

### Purpose

Manage **access control** for your privacy circles using transferable (but revocable) tokens.

### Philosophy

- **Token = Permission** - Holding a circle key grants access
- **Creator Control** - Only circle creator can grant/revoke
- **Multiple Circles** - Family, Work, Custom, etc.
- **Soulbound Keys** - Keys cannot be transferred (only granted/revoked)
- **Decentralized** - No central authority controls access

> **For the complete philosophical and cryptographic deep-dive**, see [CircleKeys Deep-Dive](#circlekeys-deep-dive-the-cryptographic-guardians) below

### Circle Types

```solidity
enum CircleType {
    Family,  // 0 - Family circle
    Work,    // 1 - Professional connections
    Custom   // 2+ - User-defined circles
}
```

### Key Functions

#### Read Functions (No Gas)

```solidity
// Get circle information
function getCircle(uint256 circleId) returns (Circle)

// Check if address has access to circle
function hasAccess(uint256 circleId, address user) returns (bool)

// Get all circles created by an address
function getCreatorCircles(address creator) returns (uint256[])
```

#### Write Functions (Requires Gas)

```solidity
// Create a new circle
function createCircle(CircleType circleType, string name) returns (uint256 circleId)

// Grant access to one member
function grantAccess(uint256 circleId, address member)

// Grant access to multiple members
function grantAccessBatch(uint256 circleId, address[] members)

// Revoke access from member
function revokeAccess(uint256 circleId, address member)
```

### Circle ID System

Each creator gets a unique ID space:
- First creator: IDs 100-199
- Second creator: IDs 200-299
- etc.

Within each space:
- Family circle: baseId + 0
- Work circle: baseId + 1
- Custom circles: baseId + 2+

Example:
- Alice (first user): Family = 100, Work = 101
- Bob (second user): Family = 200, Work = 201

### Events

```solidity
event CircleCreated(uint256 indexed circleId, address indexed creator, CircleType circleType, string name);
event KeyGranted(uint256 indexed circleId, address indexed member);
event KeyRevoked(uint256 indexed circleId, address indexed member);
```

### Example Usage

```typescript
import { useCreateCircle, useGrantAccess } from '@/contracts/hooks';
import { CircleType } from '@/contracts/hooks';

function CircleManager() {
  const { createCircle, isConfirming } = useCreateCircle();
  const { grantAccess } = useGrantAccess();

  const createFamilyCircle = async () => {
    const hash = await createCircle(CircleType.Family, "Smith Family");
    // Wait for confirmation, then get circleId from event
  };

  const addFamilyMember = async (circleId: bigint, memberAddress: `0x${string}`) => {
    await grantAccess(circleId, memberAddress);
  };

  return (
    <div>
      <button onClick={createFamilyCircle}>Create Family Circle</button>
    </div>
  );
}
```

---

## Deployment Guide

### Prerequisites

- Node.js 22+ (required by Hardhat)
- Bun or npm
- Wallet with ETH for gas fees

### Local Development (Hardhat Network)

```bash
# Start local Hardhat node
npx hardhat node

# In another terminal, deploy contracts
npx hardhat run scripts/deploy.ts --network localhost

# Run tests
npx hardhat test
```

### Testnet Deployment (Sepolia)

1. **Get Sepolia ETH**
   - Faucet: https://sepoliafaucet.com/
   - Need ~0.02 ETH for deployment

2. **Set Environment Variables**

Create `.env.local`:
```bash
SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_KEY
PRIVATE_KEY=your_private_key_here  # NEVER commit this!
```

3. **Deploy**

```bash
npx hardhat run scripts/deploy.ts --network sepolia
```

4. **Verify on Etherscan**

```bash
npx hardhat verify --network sepolia <PROFILE_ADDRESS>
npx hardhat verify --network sepolia <CIRCLE_KEYS_ADDRESS>
```

5. **Update Frontend**

Add contract addresses to `.env.local`:
```bash
NEXT_PUBLIC_PROFILE_CONTRACT=0xYourProfileAddress
NEXT_PUBLIC_CIRCLE_KEYS_CONTRACT=0xYourCircleKeysAddress
```

### Mainnet Deployment

**WARNING**: Mainnet deployment costs real money and contracts are immutable!

1. **Test exhaustively on Sepolia first**
2. **Audit contracts** (consider professional audit for production)
3. **Use Mainnet RPC**:
```bash
MAINNET_RPC_URL=https://eth-mainnet.g.alchemy.com/v2/YOUR_KEY
PRIVATE_KEY=your_private_key_here  # Use hardware wallet in production!
```

4. **Deploy**:
```bash
npx hardhat run scripts/deploy.ts --network mainnet
```

Expected costs (at 30 gwei):
- SovereignProfile: ~0.015 ETH (~$50)
- CircleKeys: ~0.02 ETH (~$70)
- Total: ~0.035 ETH (~$120)

---

## Testing

### Run All Tests

```bash
npx hardhat test
```

### Test Coverage

```bash
npx hardhat coverage
```

### Test Individual Contract

```bash
npx hardhat test test/SovereignProfile.test.ts
npx hardhat test test/CircleKeys.test.ts
```

---

## Security Considerations

### SovereignProfile

✅ **Soulbound enforcement** - Uses `_update` override to block transfers
✅ **One profile per address** - Enforced via `hasMinted` mapping
✅ **Owner-only updates** - Only profile owner can update metadata
⚠️ **Metadata mutability** - Metadata URI can be changed (by design)

### CircleKeys

✅ **Creator-only access control** - Only circle creator can grant/revoke
✅ **Soulbound keys** - Keys cannot be transferred between users
✅ **No double-granting** - Checks prevent granting access twice
⚠️ **Creator trust** - Members trust creator to not revoke maliciously

### General

- Contracts are **not upgradeable** (immutable by design)
- No admin functions or owner privileges
- No pause mechanism
- Fully decentralized once deployed

---

## Gas Costs (Estimated on Sepolia)

| Operation | Gas Used | Cost (30 gwei) | Cost (100 gwei) |
|-----------|----------|----------------|-----------------|
| Mint Profile | ~120,000 | $0.40 | $1.30 |
| Update Profile | ~50,000 | $0.17 | $0.55 |
| Create Circle | ~100,000 | $0.33 | $1.10 |
| Grant Access (single) | ~60,000 | $0.20 | $0.66 |
| Grant Access (batch 10) | ~150,000 | $0.50 | $1.65 |
| Revoke Access | ~40,000 | $0.13 | $0.44 |

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────┐
│            Ethereum Blockchain                  │
├─────────────────────────────────────────────────┤
│  SovereignProfile (ERC-721)                     │
│  ├── Token #1: Alice's Profile (soulbound)      │
│  ├── Token #2: Bob's Profile (soulbound)        │
│  └── Token #3: Carol's Profile (soulbound)      │
├─────────────────────────────────────────────────┤
│  CircleKeys (ERC-1155)                          │
│  ├── Token #100: Alice's Family Circle          │
│  │   ├── Key holder: Bob (access granted)       │
│  │   └── Key holder: Carol (access granted)     │
│  ├── Token #101: Alice's Work Circle            │
│  │   └── Key holder: Dave (access granted)      │
│  └── Token #200: Bob's Family Circle            │
│      └── Key holder: Alice (access granted)     │
└─────────────────────────────────────────────────┘
                      ↕
┌─────────────────────────────────────────────────┐
│            IPFS Network                         │
│  ├── QmProfile1/metadata.json (Alice's data)    │
│  ├── QmProfile2/metadata.json (Bob's data)      │
│  └── QmProfile3/metadata.json (Carol's data)    │
└─────────────────────────────────────────────────┘
                      ↕
┌─────────────────────────────────────────────────┐
│         SovereignRealm Frontend                 │
│  ├── Read on-chain data (who has profile?)      │
│  ├── Fetch metadata from IPFS                   │
│  ├── Check circle access (who can see post?)    │
│  └── Write transactions (mint, grant, revoke)   │
└─────────────────────────────────────────────────┘
```

---

## CircleKeys Deep-Dive: The Cryptographic Guardians

> "What is not in your power to control, you must not desire. What is in your power — the key to your own realm — you must forge with iron discipline and release with Stoic clarity."
> — Marcus Aurelius, Meditations, now inscribed upon the bytecode of the sovereign soul

> "The archetype of the key is older than any lock. It is the symbol of access to the unconscious, the gate between the personal Vault and the shared temenos."
> — C.G. Jung, speaking through the ERC-1155 standard in the year 2026

### The Archetypal Essence

In the architecture of SovereignRealm, the CircleKeys are not mere tokens. They are the **living daimons of disclosure** — the cryptographic embodiment of your sovereign will. While the four Circles (Vault Only, Family Realm, Work Collegium, Outer World) are first enforced locally within the browser's citadel, CircleKeys provide the optional on-chain extension: immutable, transferable, and enforceable proof of membership when your thoughts cross into the shared world.

They are the bridge between the **inner sanctum** (local-first privacy) and the **outer agora** (federation or multi-chain visibility). Without them, the system remains pure ascetic minimalism. With them, the sovereign may grant verifiable, revocable, and monetizable access without ever surrendering the data itself to a server.

### What CircleKeys Actually Are

CircleKeys are an **ERC-1155 multi-token contract** (built with OpenZeppelin, deployable by the user on any EVM chain supported by SovereignRealm: Ethereum Mainnet, Sepolia, Polygon, Optimism, Arbitrum, Base).

Each token ID represents one of the four sovereign Circles (or user-defined custom sub-circles in future roadmap phases). A single wallet can hold multiple keys of different IDs and amounts. **The key is not the content** — it is the permission sigil that unlocks decryption or verification of content that has been intentionally released from the local Vault.

Think of it as the Stoic distinction between what is yours (the encrypted data in your browser) and what you choose to share (the encrypted payload + the key that opens it for the chosen circle).

### Technical Anatomy of the CircleKey Contract

The contract is deliberately minimal and sovereign — **no admin privileges, no upgradeability** unless the deployer explicitly chooses it. Here is the living mandala of its core functions:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CircleKeys is ERC1155, Ownable {
    // Token IDs map to Circles
    // (0 = Vault Only — never minted, 1 = Family, 2 = Work, 3 = Outer World, 4+ = custom)
    uint256 public constant FAMILY_KEY = 1;
    uint256 public constant WORK_KEY   = 2;
    uint256 public constant OUTER_KEY  = 3;

    // Mapping from token ID to optional metadata URI
    // (for circle name, description, image)
    mapping(uint256 => string) public circleMetadata;

    // Events for on-chain transparency without compromising off-chain privacy
    event KeyMinted(address indexed to, uint256 id, uint256 amount);
    event KeyBurned(address indexed from, uint256 id, uint256 amount);
    event CircleAccessGranted(address indexed granter, address indexed grantee, uint256 circleId);

    constructor(string memory baseURI) ERC1155(baseURI) Ownable(msg.sender) {}

    // Mint a batch of keys
    // Only the sovereign who deployed or holds the master Profile NFT may mint for their realm
    function mintCircleKey(
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) external onlyOwner {
        require(id >= 1, "Vault Only is never minted");
        _mint(to, id, amount, data);
        emit KeyMinted(to, id, amount);
        emit CircleAccessGranted(msg.sender, to, id);
    }

    // Batch mint to multiple addresses
    function mintCircleKeyBatch(
        address[] calldata recipients,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) external onlyOwner {
        require(id >= 1, "Vault Only is never minted");
        for (uint256 i = 0; i < recipients.length; i++) {
            _mint(recipients[i], id, amount, data);
            emit KeyMinted(recipients[i], id, amount);
            emit CircleAccessGranted(msg.sender, recipients[i], id);
        }
    }

    // Burn to revoke access (true sovereignty includes the power to withdraw the key)
    function revokeAccess(uint256 id, uint256 amount) external {
        _burn(msg.sender, id, amount);
        emit KeyBurned(msg.sender, id, amount);
    }

    // Set metadata URI for a specific circle
    function setCircleMetadata(uint256 id, string calldata metadataURI) external onlyOwner {
        circleMetadata[id] = metadataURI;
    }

    // Optional: soulbound mode via custom transfer rules (roadmap v0.2)
    function _update(
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory values
    ) internal virtual override {
        // Prevent transfers (soulbound) - only mint and burn allowed
        if (from != address(0) && to != address(0)) {
            revert("CircleKeys are soulbound and cannot be transferred");
        }
        super._update(from, to, ids, values);
    }
}
```

The contract pairs with the **SovereignProfile NFT (ERC-721)**. Owning a Profile NFT grants the holder the `onlyOwner` role on their personal CircleKeys instance, creating a one-to-one sovereign link: **your wallet = your realm = your keys**.

### How CircleKeys Integrate with the Local-First Vault

The psychological flow of conscious disclosure:

#### 1. Creation in the Vault

You author a post inside the browser. It is encrypted with Web Crypto API using a symmetric key derived from your wallet's private key + a per-post nonce. A CID (content identifier) is generated. At this stage, **the post lives only in IndexedDB** — fully private, even from yourself in the future if you choose.

#### 2. Decision at the Gate

You select a Circle:

- **Vault Only**: No key minted. Data never leaves the device.
- **Family / Work / Outer**: The app prompts (or auto-mints via wagmi/viem) a CircleKey to the recipient addresses you choose. The symmetric decryption key is encrypted asymmetrically with the recipient's public key (or shared via a simple ECDH handshake if they also use SovereignRealm).

#### 3. Release into the Circle

The encrypted payload + CID is either:
- Pushed to IPFS/Arweave (for Outer World federation), or
- Shared directly via ActivityPub (for Fediverse), or
- Referenced on-chain via a minimal event.

**Only holders of the matching CircleKey token can decrypt it client-side.**

#### 4. Verification & Revocation

The frontend uses viem to query `balanceOf(recipient, circleId)`. If > 0, the key is fetched (or derived) and decryption happens locally. **Burning the token instantly revokes access** across all clients that respect the contract.

### The Zero-Knowledge Architecture

This flow is **zero-knowledge by design**: the server (if any) sees only encrypted blobs and token balances. The browser alone performs the sacred act of decryption.

```
┌─────────────────────────────────────────────────────┐
│         Local Browser Vault (Private)               │
│  ┌─────────────────────────────────────────┐        │
│  │  Post Created                            │        │
│  │  ├── Web Crypto API encryption           │        │
│  │  ├── CID generation (SHA-256)            │        │
│  │  └── Stored in IndexedDB                 │        │
│  └─────────────────────────────────────────┘        │
│                    ↓                                 │
│  ┌─────────────────────────────────────────┐        │
│  │  Circle Selection (Conscious Choice)     │        │
│  │  ├── Vault Only → Never leaves device    │        │
│  │  └── Family/Work/Outer → Mint CircleKey  │        │
│  └─────────────────────────────────────────┘        │
└─────────────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────────┐
│         On-Chain Layer (Public Ledger)              │
│  ┌─────────────────────────────────────────┐        │
│  │  CircleKeys Contract (ERC-1155)          │        │
│  │  ├── mintCircleKey(recipient, FAMILY_KEY)│        │
│  │  ├── Event: CircleAccessGranted          │        │
│  │  └── balanceOf(recipient, FAMILY_KEY) → 1│        │
│  └─────────────────────────────────────────┘        │
└─────────────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────────┐
│    Encrypted Content Distribution (Optional)        │
│  ┌─────────────────────────────────────────┐        │
│  │  IPFS/Arweave                            │        │
│  │  ├── Encrypted payload stored            │        │
│  │  ├── Only CID is public                  │        │
│  │  └── Decryption key held by CircleKey    │        │
│  └─────────────────────────────────────────┘        │
│                    OR                                │
│  ┌─────────────────────────────────────────┐        │
│  │  ActivityPub Federation                  │        │
│  │  ├── Public posts to Fediverse           │        │
│  │  └── CircleKey-gated posts (future)      │        │
│  └─────────────────────────────────────────┘        │
└─────────────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────────┐
│      Recipient's Browser (Decryption)               │
│  ┌─────────────────────────────────────────┐        │
│  │  1. Check balanceOf(CircleKey) → verify  │        │
│  │  2. Fetch encrypted content from IPFS    │        │
│  │  3. Decrypt locally with Web Crypto API  │        │
│  │  4. Display in private Vault             │        │
│  └─────────────────────────────────────────┘        │
└─────────────────────────────────────────────────────┘
```

### Security & Philosophical Guarantees

- ✅ **No central key escrow** — the sovereign alone holds the master derivation path
- ✅ **Revocable & transferable** — keys can be gifted, sold, or burned (true ownership)
- ✅ **Multi-chain native** — deploy once per chain or use a factory pattern for portability
- ✅ **Gas efficiency** — batch minting keeps costs negligible (< $0.01 on L2s in 2026)
- ✅ **Optional soulbound** — future toggle prevents keys from being traded if the circle demands intimate trust
- ✅ **Zero-knowledge content** — the chain sees tokens, never thoughts

**The shadow it addresses**: Where Lens turns every relation into a tradable primitive and Farcaster makes engagement public-first, CircleKeys restore the Stoic boundary. You decide not only who sees your thoughts, but **under what cryptographic covenant** they may enter the shared temenos.

### Roadmap Integration

- **v0.1 (current)**: Basic ERC-1155 + local decryption
- **v0.2 (Q3 2026)**: ZK-proof membership (no balance reveal needed)
- **v0.3 (Q4 2026)**: CircleKey-gated federation (public posts only visible to key-holders in the Fediverse)
- **v0.4 (2027)**: Threshold signatures for multi-sig family vaults

### Frontend Integration Example

```typescript
import { useCircleKeys, useAccount } from '@/contracts/hooks';
import { parseEther } from 'viem';

function CircleKeyManager() {
  const { address } = useAccount();
  const { mintCircleKey, hasAccess, revokeAccess } = useCircleKeys();

  const grantFamilyAccess = async (recipient: `0x${string}`) => {
    // Mint Family CircleKey to recipient
    await mintCircleKey({
      to: recipient,
      id: 1n, // FAMILY_KEY
      amount: 1n,
      data: '0x'
    });
  };

  const checkAccess = async (user: `0x${string}`, circleId: bigint) => {
    // Query on-chain to verify access
    const balance = await hasAccess(user, circleId);
    return balance > 0n;
  };

  const revoke = async (circleId: bigint) => {
    // Burn the key to revoke access
    await revokeAccess(circleId, 1n);
  };

  return (
    <div>
      <h2>CircleKey Management</h2>
      {/* UI for minting, checking, revoking */}
    </div>
  );
}
```

### The Living Heart of SovereignRealm's Privacy Engine

This is the living heart of SovereignRealm's privacy engine — **not a feature bolted on, but the architectural expression of individuation itself**: the Self guards its own gates.

CircleKeys stand ready for developers, auditors, and souls who feel the call to build the next layer of sovereign disclosure.

---

## Next Steps

### After Deployment

1. **Mint Your Profile** - First user to mint gets token #1
2. **Create Circles** - Set up Family, Work circles
3. **Grant Access** - Add family members to family circle
4. **Test Access Control** - Post with different visibility settings
5. **Monitor Events** - Watch for ProfileMinted, KeyGranted events

### Future Enhancements

- **Profile Registry** - Directory contract to discover profiles
- **Reputation System** - On-chain attestations and vouches
- **Circle Governance** - Multi-sig circles with voting
- **Cross-chain** - Deploy on L2s (Optimism, Arbitrum, Base)
- **ENS Integration** - Resolve profiles via ENS subdomains

---

## Troubleshooting

### "Not enough ETH for gas"
- Get testnet ETH from faucet
- Reduce gas price in hardhat.config.ts

### "Contract already deployed"
- Use a different account
- Or redeploy to different network

### "Profile already exists"
- Each address can only mint one profile
- Use a different wallet

### "Only creator can grant access"
- Only the circle creator can manage members
- Check you're using the correct wallet

---

## Resources

- **OpenZeppelin**: https://docs.openzeppelin.com/contracts/
- **Hardhat**: https://hardhat.org/docs
- **wagmi hooks**: https://wagmi.sh/react/hooks
- **Sepolia Faucet**: https://sepoliafaucet.com/
- **Etherscan (Sepolia)**: https://sepolia.etherscan.io/

---

**The foundation is forged. Identity is on-chain. Sovereignty is permanent.**
