# Web3 Identity Integration - SovereignRealm

## What's New

Your SovereignRealm now has **blockchain-based identity** powered by Ethereum wallets.

### New Features

✅ **Wallet Connection** - Connect MetaMask, Coinbase Wallet, Rainbow, and more
✅ **ENS Integration** - Automatic ENS name and avatar resolution
✅ **SIWE Authentication** - Sign-In with Ethereum for cryptographic proof
✅ **Multi-Chain Support** - Mainnet, Sepolia, Polygon, Optimism, Arbitrum, Base
✅ **Persistent Identity** - Your wallet = your realm identity

## User Flow

### 1. Connect Wallet
Click the **"Connect Wallet"** button in the top-right corner:
- Choose your wallet (MetaMask, Rainbow, Coinbase, WalletConnect)
- Approve the connection
- Your profile automatically updates with your wallet address

### 2. Sign In with Ethereum (SIWE)
After connecting, click **"🔐 Sign In with Ethereum"**:
- Your wallet will prompt you to sign a message
- This proves you own the wallet address
- No gas fees - it's just a signature
- Valid for 24 hours

### 3. ENS Magic
If you have an ENS name (like `vitalik.eth`):
- It automatically appears as your display name
- Your ENS avatar becomes your profile picture
- No manual setup needed

### 4. Sovereignty Unlocked
Once authenticated:
- Green status indicator shows you're verified
- Your posts are cryptographically signed to your identity
- Future: On-chain attestations and decentralized social graph

## Technical Implementation

### Architecture

```
Frontend:
├── wagmi - React hooks for Ethereum
├── viem - TypeScript Ethereum library
├── RainbowKit - Beautiful wallet connection UI
└── SIWE - Sign-In with Ethereum protocol

Identity Resolution:
├── ENS names (username.eth)
├── ENS avatars (IPFS/HTTPS)
└── Address shortening (0x1234...5678)

Authentication:
├── SIWE message signing
├── 24-hour session validity
└── localStorage persistence
```

### Files Added

```
src/
├── providers/
│   └── Web3Provider.tsx    # Wagmi + RainbowKit setup
├── config/
│   └── wagmi.ts            # Chain configuration
└── utils/
    ├── ens.ts              # ENS resolution helpers
    └── siwe.ts             # Sign-In with Ethereum
```

### Environment Variables

Create `.env.local`:
```bash
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
```

Get a free WalletConnect Project ID at: https://cloud.walletconnect.com/

## How It Works

### 1. Wallet Connection (RainbowKit + wagmi)

```typescript
import { useAccount } from 'wagmi';

const { address, isConnected } = useAccount();
// address: 0x1234... or undefined
// isConnected: true/false
```

RainbowKit provides the beautiful connection modal automatically.

### 2. ENS Resolution

```typescript
import { useEnsName, useEnsAvatar } from 'wagmi';

const { data: ensName } = useEnsName({ address });
// Returns: "vitalik.eth" or null

const { data: ensAvatar } = useEnsAvatar({ name: ensName });
// Returns: IPFS/HTTPS URL or null
```

Automatic lookups - no API keys needed (uses public RPC).

### 3. Sign-In with Ethereum (SIWE)

```typescript
import { SiweMessage } from 'siwe';

// Create message
const message = new SiweMessage({
  domain: 'localhost:3000',
  address: '0x1234...',
  statement: 'Sign in to SovereignRealm',
  uri: 'http://localhost:3000',
  version: '1',
  chainId: 1,
});

// Sign with wallet
const signature = await walletClient.signMessage({
  message: message.prepareMessage(),
});

// Store in localStorage (valid 24h)
```

This creates a cryptographic proof that you control the wallet address.

### 4. Profile Integration

When wallet connects:
1. Check if user has ENS name → use as display name
2. Check if ENS has avatar → use as profile picture
3. Store wallet address in profile
4. Prompt for SIWE authentication

## Supported Wallets

Via RainbowKit:
- **MetaMask** - Most popular browser wallet
- **Rainbow** - Mobile-first with beautiful UI
- **Coinbase Wallet** - User-friendly, backed by Coinbase
- **WalletConnect** - Any mobile wallet (Trust, Argent, etc.)
- **Ledger** - Hardware wallet support
- **Brave Wallet** - Built into Brave browser

## Supported Chains

Currently configured:
- **Mainnet** (Ethereum L1) - Production use
- **Sepolia** - Free testnet for development
- **Polygon** - Fast, cheap transactions
- **Optimism** - Ethereum L2
- **Arbitrum** - Ethereum L2
- **Base** - Coinbase's L2

Switch chains in the wallet UI - SovereignRealm adapts automatically.

## Security Features

### SIWE Authentication
- No passwords to leak
- Cryptographic proof of ownership
- 24-hour session expiry
- Stored only in your browser

### Data Sovereignty
- Profile data stays in localStorage
- Wallet signature proves identity
- No server-side authentication needed
- You control when/if data goes on-chain

### Privacy
- ENS resolution uses public RPC
- No tracking or analytics
- No data sent to third parties
- Wallet connection is permission-based

## Next Steps

### Option A: On-Chain Profile NFT
Mint your profile as an ERC-721 NFT:
- Store metadata on IPFS
- Profile becomes portable across apps
- Transfer/sell your identity (wild!)

### Option B: Decentralized Storage
Upload posts to real IPFS:
- Content-addressed by CID
- Permanent, immutable storage
- Link CIDs to on-chain registry

### Option C: Circle Access NFTs
Create ERC-1155 tokens for circles:
- Family members get "Family" token
- Token = access to shared content
- Revoke access by burning token

### Option D: Cross-Chain Identity
Use Ceramic Network or Lit Protocol:
- Decentralized identity (DID)
- Cross-chain reputation
- Verifiable credentials

## Troubleshooting

### "Connect Wallet" button not showing
- Check that Web3Provider wraps your app in layout.tsx
- Verify RainbowKit CSS is imported
- Check browser console for errors

### ENS not resolving
- ENS only works on Mainnet
- Make sure you're connected to Ethereum (not testnet)
- Some ENS names may not have avatars set

### SIWE signature rejected
- User must approve the signature in wallet
- No gas fees - it's off-chain
- Try again if wallet modal was closed

### Session expired
- SIWE sessions last 24 hours
- Click "Sign In" again to renew
- Data is never lost - authentication is separate from storage

## Development Tips

### Testing with Testnets
1. Switch to Sepolia in your wallet
2. Get free Sepolia ETH: https://sepoliafaucet.com/
3. Connect to SovereignRealm - works identically

### Using ENS on Testnet
ENS is Mainnet-only. On testnets:
- Display wallet address instead
- Use Dicebear for avatar generation
- Production: always use Mainnet for ENS

### WalletConnect Project ID
For production:
1. Go to https://cloud.walletconnect.com/
2. Create a free project
3. Copy Project ID
4. Add to `.env.local`

## Philosophy

> "Your keys, your identity, your data."

Web3 identity inverts the paradigm:
- Traditional: Server controls your account
- SovereignRealm: You own your cryptographic identity
- Transfer realms, platforms - identity stays yours

The wallet is the Self. The signature is proof of sovereignty.

## Resources

- **wagmi**: https://wagmi.sh/
- **RainbowKit**: https://rainbowkit.com/
- **SIWE**: https://eips.ethereum.org/EIPS/eip-4361
- **ENS**: https://ens.domains/
- **WalletConnect**: https://walletconnect.com/

---

**The bridge is forged. Your realm now extends to the Ethereum network.**
