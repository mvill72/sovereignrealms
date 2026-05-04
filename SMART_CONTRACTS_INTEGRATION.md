# Smart Contracts Integration Guide

## The Vision

Your SovereignRealm now extends beyond browser storage into the **permanent, immutable** Ethereum blockchain. This guide shows you how to forge the complete on-chain identity system.

---

## What We've Built

### 1. Smart Contracts (Solidity)

**SovereignProfile.sol**
- ERC-721 NFT representing your identity
- Soulbound (non-transferable)
- One profile per address
- Metadata stored on IPFS

**CircleKeys.sol**
- ERC-1155 tokens for access control
- Family, Work, Custom circles
- Grant/revoke access via tokens
- Creator-controlled membership

### 2. Tests (Hardhat + TypeScript)

Comprehensive test suites covering:
- Profile minting and updating
- Circle creation and management
- Access granting and revoking
- Soulbound enforcement
- Edge cases and security

### 3. Frontend Integration (React Hooks)

wagmi-based hooks for:
- Reading on-chain data
- Minting profiles
- Creating circles
- Managing members
- Transaction confirmations

---

## Complete Setup Flow

### Step 1: Upgrade Node.js (Required)

Hardhat requires Node.js 22.13.0+

```bash
# Check current version
node --version

# If < 22, upgrade using nvm (recommended)
nvm install 22
nvm use 22

# Or install from: https://nodejs.org/
```

### Step 2: Compile Contracts

```bash
# Compile Solidity contracts
bun run contracts:compile

# This creates:
# - artifacts/ (compiled bytecode)
# - cache/ (build cache)
```

### Step 3: Run Tests

```bash
# Run all tests
bun run contracts:test

# Expected output: All tests passing ✅
```

### Step 4: Deploy Locally (For Development)

```bash
# Terminal 1: Start local Hardhat node
bun run contracts:node

# Terminal 2: Deploy contracts
bun run contracts:deploy:local

# Copy contract addresses from output
```

### Step 5: Deploy to Sepolia (Testnet)

```bash
# 1. Get Sepolia ETH from faucet
#    https://sepoliafaucet.com/
#    Need ~0.02 ETH

# 2. Create .env.local with your private key
SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_KEY
PRIVATE_KEY=your_wallet_private_key_here

# 3. Deploy
bun run contracts:deploy:sepolia

# 4. Copy contract addresses
```

### Step 6: Update Frontend Configuration

Add to `.env.local`:

```bash
# Contract addresses (from deployment)
NEXT_PUBLIC_PROFILE_CONTRACT=0xYourProfileAddress
NEXT_PUBLIC_CIRCLE_KEYS_CONTRACT=0xYourCircleKeysAddress

# Network (optional, defaults to localhost)
NEXT_PUBLIC_CHAIN_ID=11155111  # Sepolia
```

### Step 7: Restart Dev Server

```bash
bun dev
```

Your SovereignRealm now reads from the blockchain!

---

## Frontend Integration Examples

### Check if User Has Profile

```typescript
'use client';

import { useAccount } from 'wagmi';
import { useHasProfile, useProfileURI } from '@/contracts/hooks';

export function ProfileStatus() {
  const { address } = useAccount();
  const { data: hasProfile, isLoading } = useHasProfile(address);
  const { data: profileURI } = useProfileURI(address);

  if (isLoading) return <p>Checking profile...</p>;

  if (!hasProfile) {
    return <p>No on-chain profile found</p>;
  }

  return (
    <div>
      <p>✅ Profile exists!</p>
      <p>Metadata: {profileURI}</p>
    </div>
  );
}
```

### Mint Profile Button

```typescript
import { useState } from 'react';
import { useMintProfile, useHasProfile } from '@/contracts/hooks';
import { useAccount } from 'wagmi';
import { uploadTextToIPFS } from '@/utils/ipfs';

export function MintProfileButton() {
  const { address } = useAccount();
  const { data: hasProfile } = useHasProfile(address);
  const { mintProfile, isConfirming, isConfirmed, isPending } = useMintProfile();
  const [error, setError] = useState<string | null>(null);

  const handleMint = async () => {
    try {
      setError(null);

      // 1. Create metadata
      const metadata = {
        name: "Sovereign Self",
        bio: "My digital citadel",
        avatar: "",
        attributes: [
          { trait_type: "Member Since", value: new Date().toISOString() }
        ]
      };

      // 2. Upload to IPFS
      const metadataStr = JSON.stringify(metadata);
      const cid = await uploadTextToIPFS(metadataStr);
      const metadataURI = `ipfs://${cid}`;

      // 3. Mint profile NFT
      await mintProfile(metadataURI);

    } catch (err) {
      setError(err.message);
      console.error('Mint failed:', err);
    }
  };

  if (hasProfile) {
    return <p className="text-green-400">✅ Profile minted!</p>;
  }

  return (
    <div>
      <button
        onClick={handleMint}
        disabled={isPending || isConfirming}
        className="bg-violet-600 hover:bg-violet-700 disabled:bg-zinc-700 px-6 py-3 rounded-lg font-medium"
      >
        {isPending && 'Confirm in wallet...'}
        {isConfirming && 'Minting profile...'}
        {!isPending && !isConfirming && '🎨 Mint Profile NFT'}
      </button>

      {isConfirmed && <p className="text-green-400 mt-2">✅ Profile minted!</p>}
      {error && <p className="text-red-400 mt-2">Error: {error}</p>}
    </div>
  );
}
```

### Create Circle

```typescript
import { useCreateCircle, CircleType } from '@/contracts/hooks';

export function CreateCircleButton() {
  const { createCircle, isConfirming, isConfirmed } = useCreateCircle();

  const handleCreateFamily = async () => {
    try {
      await createCircle(CircleType.Family, "My Family Circle");
    } catch (err) {
      console.error('Failed to create circle:', err);
    }
  };

  return (
    <button
      onClick={handleCreateFamily}
      disabled={isConfirming}
      className="bg-emerald-600 hover:bg-emerald-700 px-6 py-3 rounded-lg"
    >
      {isConfirming ? 'Creating...' : '👨‍👩‍👧 Create Family Circle'}
    </button>
  );
}
```

### Grant Access to Member

```typescript
import { useState } from 'react';
import { useGrantAccess } from '@/contracts/hooks';

export function GrantAccessForm({ circleId }: { circleId: bigint }) {
  const [memberAddress, setMemberAddress] = useState('');
  const { grantAccess, isConfirming } = useGrantAccess();

  const handleGrant = async () => {
    try {
      await grantAccess(circleId, memberAddress as `0x${string}`);
      setMemberAddress('');
    } catch (err) {
      console.error('Failed to grant access:', err);
    }
  };

  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={memberAddress}
        onChange={(e) => setMemberAddress(e.target.value)}
        placeholder="0x... or name.eth"
        className="flex-1 bg-zinc-800 p-2 rounded"
      />
      <button
        onClick={handleGrant}
        disabled={!memberAddress || isConfirming}
        className="bg-violet-600 px-4 py-2 rounded"
      >
        {isConfirming ? 'Granting...' : 'Grant Access'}
      </button>
    </div>
  );
}
```

---

## Post Visibility with On-Chain Circles

### Enhanced Post Type

Update `src/utils/storage.ts`:

```typescript
export interface Post {
  id: string;
  content: string;
  ipfsHash?: string;
  visibility: 'private' | 'family' | 'work' | 'public';
  circleId?: bigint; // NEW: On-chain circle ID
  timestamp: string;
  owner?: string;
}
```

### Check if User Can View Post

```typescript
import { useHasCircleAccess } from '@/contracts/hooks';
import { useAccount } from 'wagmi';

export function SecurePost({ post }: { post: Post }) {
  const { address } = useAccount();
  const { data: hasAccess } = useHasCircleAccess(
    post.circleId,
    address
  );

  // Private posts - only owner can see
  if (post.visibility === 'private' && post.owner !== address) {
    return null;
  }

  // Circle posts - check on-chain access
  if (post.circleId && !hasAccess) {
    return (
      <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
        <p className="text-zinc-500">🔒 This post is shared with a private circle.</p>
        <p className="text-zinc-600 text-sm">You need access to view.</p>
      </div>
    );
  }

  // Show post
  return (
    <div className="bg-zinc-900 p-6 rounded-xl">
      <p>{post.content}</p>
    </div>
  );
}
```

---

## Workflow: Full On-Chain Identity

### 1. User Connects Wallet
- RainbowKit modal
- Choose MetaMask/Rainbow/Coinbase
- Sign connection (no gas)

### 2. User Signs In (SIWE)
- Proves wallet ownership
- Off-chain signature
- 24-hour session

### 3. Check On-Chain Profile
```typescript
const { data: hasProfile } = useHasProfile(address);
```

### 4. Mint Profile (If Needed)
- Create metadata JSON
- Upload to IPFS
- Mint profile NFT (gas required)
- Transaction confirmed

### 5. Create Circles
- Family circle (gas)
- Work circle (gas)
- Custom circles (gas)

### 6. Grant Access to Members
- Add family members to family circle
- Add colleagues to work circle
- Batch grant for multiple members

### 7. Post with Circle Visibility
- User creates post
- Selects "Family" visibility
- Frontend stores post with `circleId`
- Only circle members can view

### 8. Revoke Access (If Needed)
- Member leaves family
- Creator revokes access
- Member can no longer view family posts

---

## Gas Cost Breakdown

Typical costs on Sepolia (testnet) with 30 gwei gas:

| Action | Gas | ETH | USD (at $3000/ETH) |
|--------|-----|-----|---------------------|
| Mint Profile | 120k | 0.0036 | $10.80 |
| Update Profile | 50k | 0.0015 | $4.50 |
| Create Circle | 100k | 0.003 | $9.00 |
| Grant Access (1 member) | 60k | 0.0018 | $5.40 |
| Grant Access (10 members) | 150k | 0.0045 | $13.50 |
| Revoke Access | 40k | 0.0012 | $3.60 |

**Total to set up identity + 2 circles + 5 members**: ~$60

On mainnet: 2-5x higher depending on gas prices.

---

## Security Best Practices

### 1. Private Keys
- NEVER commit `.env.local` to git
- Use hardware wallets for mainnet
- Consider multi-sig for valuable contracts

### 2. Metadata Storage
- Pin IPFS content to prevent loss
- Use redundant pinning services
- Consider Arweave for permanent storage

### 3. Access Control
- Circle creators have full control
- Members trust creators not to revoke maliciously
- Consider multi-sig circles for shared control

### 4. Testing
- Test exhaustively on Sepolia before mainnet
- Verify all edge cases
- Consider professional audit for production

---

## Troubleshooting

### "Transaction failed"
- Check wallet has enough ETH for gas
- Verify contract addresses in .env.local
- Check you're on the correct network

### "Profile already exists"
- Each address can only mint one profile
- This is by design (soulbound identity)
- Use a different wallet if testing

### "Only creator can grant access"
- Only the circle creator can manage members
- Make sure you're connected with creator wallet

### "Contract not deployed"
- Deploy contracts first
- Update .env.local with addresses
- Restart dev server

### "Metadata not loading"
- IPFS can be slow (distributed network)
- Use IPFS gateway: `https://ipfs.io/ipfs/{cid}`
- Consider pinning service for faster loads

---

## Next Steps

### Immediate
1. Deploy to Sepolia testnet
2. Mint your profile NFT
3. Create family circle
4. Add family members
5. Test access control

### Near Term
- Integrate profile NFT with UI
- Show on-chain circles in sidebar
- Enforce access control on posts
- Add circle management page

### Long Term
- Deploy to mainnet
- L2 deployment (cheaper gas)
- Multi-sig circles
- Reputation system
- Cross-realm federation

---

## Resources

- **Contracts**: [CONTRACTS.md](./CONTRACTS.md)
- **Tests**: `test/` directory
- **Hooks**: `src/contracts/hooks.ts`
- **Deployment**: `scripts/deploy.ts`

- **Hardhat**: https://hardhat.org/docs
- **wagmi**: https://wagmi.sh/react/hooks
- **OpenZeppelin**: https://docs.openzeppelin.com/contracts/
- **Etherscan**: https://sepolia.etherscan.io/

---

**The foundation is on-chain. Your identity is permanent. Your sovereignty is cryptographic.**

🏛️ **The citadel expands to the Ethereum network.**
