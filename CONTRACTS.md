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
