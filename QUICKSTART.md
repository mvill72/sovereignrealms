# SovereignRealm - Quick Start Guide 🏛️

## Access Your Realm

**Live at:** http://localhost:3000 (publicly accessible on port 3000)

## First-Time Setup (30 seconds)

### 1. Connect Your Wallet

Look for the **"Connect Wallet"** button in the top-right corner:

- Click it
- Choose your wallet (MetaMask recommended for first-time users)
- Approve the connection in your wallet popup
- No gas fees, no transactions - just a simple connection

### 2. Sign In with Ethereum (SIWE)

After connecting, you'll see a **"🔐 Sign In with Ethereum"** button:

- Click it
- Your wallet will ask you to sign a message
- This proves you own the wallet address
- **No gas fees** - it's an off-chain signature
- Valid for 24 hours

### 3. Check Your Identity

Once signed in, you'll see:

- ✅ Green dot next to your wallet address
- Your ENS name (if you have one) as your display name
- Your ENS avatar (if set) as your profile picture
- "Authenticated" status in the top header

### 4. Create Your First Post

- Type in the text area: "My first sovereign thought"
- Notice it says **"Private"** by default
- Press **Cmd/Ctrl + Enter** or click "Post to Chosen Realm"
- Your post is now saved locally with an IPFS-style content hash

### 5. Try Different Circles

Click the circle buttons on the left:

- **🔒 Vault Only** - Never shared, completely private
- **👨‍👩‍👧 Family Realm** - Future: share with family token holders
- **💼 Work Collegium** - Future: share with work circle
- **🌐 Outer World** - Public/federated posts

Change the visibility and post again. Notice how the stats update.

### 6. Export Your Data

Click **"📦 Export"** in the top-right:

- Downloads a JSON file with all your data
- Includes profile, posts, timestamps
- Take it anywhere, import it anywhere
- True data portability

## What You Just Did

You experienced **digital sovereignty**:

1. ✅ No account creation, no password
2. ✅ Your wallet = your identity
3. ✅ Cryptographic proof (SIWE signature)
4. ✅ Data stored locally in your browser
5. ✅ Content-addressed posts (immutable hashes)
6. ✅ Privacy circles under your control

## Understanding the Interface

### Top Header

```
┌─────────────────────────────────────────────────┐
│ [Your Name]                    [Sign In] [Export]│
│ 0x1234...5678 • Authenticated  [Connect Wallet]  │
└─────────────────────────────────────────────────┘
```

- **Green dot** = authenticated
- **Yellow dot** = connected but not signed in
- **No dot** = not connected

### Left Sidebar

**The Protected Core** - Your profile (click Edit to change)

**My Circles** - Choose sharing level:
- Click any circle to set as default for next post
- See stats for how many posts in each circle

**Sovereignty Status** - Shows:
- Connection status
- Authentication status
- ENS name if available

### Main Timeline

- Post composer at top
- Existing posts below (newest first)
- Hover over posts to see delete button
- IPFS hash shown for content addressing

## Testing Web3 Features

### If You Have an ENS Name

Example: `vitalik.eth`, `alice.eth`

1. Make sure you're connected to **Mainnet** (not a testnet)
2. Connect your wallet
3. Your ENS name should auto-populate as your display name
4. If you have an ENS avatar, it replaces the generated avatar

### If You Don't Have an ENS Name

No problem!

- Your wallet address shows as `0x1234...5678` (shortened)
- A unique geometric avatar is generated (Dicebear)
- Everything else works identically

### Testing on Sepolia Testnet

1. Switch your wallet to Sepolia network
2. Get free Sepolia ETH: https://sepoliafaucet.com/
3. Connect to SovereignRealm
4. ENS won't resolve (Mainnet only), but everything else works

## Common Questions

### "Where is my data stored?"

Your browser's localStorage. Open DevTools → Application → LocalStorage → localhost:3000

You'll see:
- `sovereign_profile` - Your profile data
- `sovereign_posts` - All your posts
- `siwe_*` - Authentication data
- `ipfs-*` - Content cache by hash

### "Can I use this on mobile?"

Yes! The UI is responsive. Connect via:
- MetaMask mobile app (built-in browser)
- Rainbow mobile wallet
- Any wallet with WalletConnect support

### "What if I switch browsers?"

Your data is local to each browser. Use the Export feature to:
1. Export data in Browser A
2. Import data in Browser B (feature coming soon)

Or in the future: store profile on-chain as NFT.

### "Do posts really go to IPFS?"

Not yet! Currently:
- Posts are hashed with SHA-256 (content-addressed)
- Hash format mimics IPFS CIDs
- Stored locally with hash as key
- Future upgrade: pin to real IPFS via web3.storage

### "What's the difference between connected and authenticated?"

- **Connected** = Wallet linked to site (read-only)
- **Authenticated** = You signed a message proving ownership
- Always authenticate after connecting for full features

### "How long does authentication last?"

24 hours. After that:
- Your data is still there
- You're still connected
- Just click "Sign In" again to re-authenticate

## Next Steps

### Add a Custom Avatar

Current: Auto-generated from your name/address

Future options:
1. Upload image → pin to IPFS → store CID in profile
2. Set ENS avatar (if you own an ENS name)
3. Use NFT as avatar (future feature)

### Create More Posts

Experiment with:
- Different visibility circles
- Keyboard shortcut (Cmd/Ctrl + Enter)
- Multi-line posts (press Enter for new line)

### Share Your Realm

Currently local-only. Coming soon:
- Publish profile to IPFS
- Share IPFS hash with others
- They load your realm in their browser

### Explore the Code

Open DevTools → Console:
- See IPFS hashing logs
- Authentication confirmations
- Content addressing in action

## Troubleshooting

### "Connect Wallet button not showing"

1. Hard refresh: Cmd/Ctrl + Shift + R
2. Check console for errors
3. Make sure JavaScript is enabled

### "Wallet won't connect"

1. Make sure wallet extension is installed
2. Unlock your wallet
3. Try a different wallet
4. Check that you're on a supported network

### "Signature request not appearing"

1. Check if wallet popup is hidden
2. Reject and try again
3. Make sure wallet is unlocked

### "ENS name not showing"

1. Only works on Mainnet (not testnets)
2. Make sure your wallet is on Ethereum Mainnet
3. ENS resolution takes a few seconds

### "Posts disappearing"

Data is in localStorage, which can be:
- Cleared by browser settings
- Lost if you clear browsing data
- Separated per browser

**Solution**: Use Export feature regularly!

## Resources

- **Full Docs**: [REALM.md](./REALM.md)
- **Web3 Guide**: [WEB3_GUIDE.md](./WEB3_GUIDE.md)
- **Tech Docs**: [README.md](./README.md)

## Philosophy Reminder

This is not just another social app. It's a **template for digital sovereignty**:

- You own your identity (wallet)
- You own your data (local storage)
- You choose what to share (circles)
- You control the narrative (no algorithm)

> "Rule first your own domain, let the outer world remain indifferent."

---

**Welcome to your SovereignRealm. The citadel is yours.**

🏛️ http://localhost:3000
