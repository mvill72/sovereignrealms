# Deploy Now — Quick Start Guide

> **"All checks passed. The citadel is ready. Let's open the gates."**

This is the **fastest path** to get SovereignRealm live in production.

---

## ⚡ Option 1: Deploy to Vercel (5 Minutes)

### Step 1: Get WalletConnect Project ID (2 min)

1. Go to **[cloud.walletconnect.com](https://cloud.walletconnect.com)**
2. Sign in / Create account (free)
3. Click **"Create New Project"**
4. Name it: **"SovereignRealm Beta"**
5. **Copy the Project ID** → Save it for Step 3

### Step 2: Push to GitHub (1 min)

```bash
# If you haven't already
git remote add origin https://github.com/YOUR_USERNAME/sovereignrealm.git
git branch -M main
git push -u origin main
```

### Step 3: Deploy to Vercel (2 min)

**Via Web (Easiest)**:

1. Go to **[vercel.com/new](https://vercel.com/new)**
2. Click **"Import Git Repository"**
3. Select your **sovereignrealm** repo
4. Click **"Import"**
5. Vercel auto-detects Next.js ✅
6. Click **"Environment Variables"** → Add:

```
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID = [paste your ID from Step 1]
```

7. Click **"Deploy"** 🚀
8. Wait 2-3 minutes
9. Visit your live URL: **`https://your-app.vercel.app`**

**That's it! Your citadel is live.**

---

## Option 2: Deploy via CLI (For Developers)

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Follow prompts, add environment variables

# Deploy to production
vercel --prod
```

---

## Post-Deploy: Update Domain Variable

After first deploy:

1. Go to Vercel → **Your Project** → **Settings** → **Environment Variables**
2. Add **two more** variables:

```
NEXT_PUBLIC_REALM_DOMAIN = your-app.vercel.app
NEXT_PUBLIC_REALM_PROTOCOL = https://
```

3. Go to **Deployments** → **Redeploy** (to apply new env vars)

---

## Test Your Deployment ✅

Visit your production URL and verify:

- [ ] Homepage loads
- [ ] **BetaBanner** displays at top
- [ ] Click **"Connect Wallet"** → WalletConnect modal opens
- [ ] Connect wallet → SIWE authentication works
- [ ] **ArchetypeChooser** appears
- [ ] Select archetype → Theme changes instantly
- [ ] Create a post in Vault
- [ ] **ReportIssueButton** visible in header (🐛)
- [ ] Check on mobile device
- [ ] Test all 8 archetypes

**If all works → You're live! 🎉**

---

## Next Steps (After Deploy)

### Immediate (Today)

- [ ] Share production URL with 1-2 friends for testing
- [ ] Monitor Vercel deployment logs for errors
- [ ] Test on your phone (actual device, not emulator)

### This Week (Beta Prep)

- [ ] Set up error monitoring (Sentry - optional)
- [ ] Set up analytics (Plausible/Fathom - optional)
- [ ] Create Discord "The Outer Threshold"
- [ ] Set up beta@sovereignrealm.app email
- [ ] Prepare first 10 personal invitations

### Next Week (Beta Launch)

- [ ] Send first 10 invitations
- [ ] Deploy smart contracts to Sepolia testnet
- [ ] Deploy smart contracts to Base testnet
- [ ] Add contract addresses to Vercel env vars
- [ ] Test full contract flow (mint Profile NFT)

**See [BETA_LAUNCH.md](./BETA_LAUNCH.md) for complete beta timeline.**

---

## Smart Contract Deployment (Optional - Beta Phase)

**Deploy after frontend is live** (Week 1 of beta):

### Prerequisites

- ETH on Sepolia (get from [sepoliafaucet.com](https://sepoliafaucet.com))
- Alchemy API key (get from [alchemy.com](https://alchemy.com))

### Quick Deploy

1. **Create `.env.local`** (local only, never commit):

```bash
SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_KEY
PRIVATE_KEY=0x...your...deployer...private...key
SEMAPHORE_V4_SEPOLIA=0x3889927F0B5Eb1a02C6E2C20b39a1Bd4EAd76131
```

2. **Deploy**:

```bash
bun run contracts:compile
bun run contracts:deploy:sepolia
```

3. **Copy contract addresses** from output

4. **Add to Vercel**:
   - Go to Vercel → Settings → Environment Variables
   - Add:
     - `NEXT_PUBLIC_PROFILE_CONTRACT=0x...`
     - `NEXT_PUBLIC_CIRCLE_KEYS_CONTRACT=0x...`
     - `NEXT_PUBLIC_ZK_VERIFIER_CONTRACT=0x...`
     - `NEXT_PUBLIC_CHAIN_ID=11155111`

5. **Redeploy** frontend (Vercel → Redeploy)

6. **Verify contracts**:

```bash
npx hardhat verify --network sepolia CONTRACT_ADDRESS
```

**See [DEPLOYMENT.md](./DEPLOYMENT.md) for full contract deployment guide.**

---

## Troubleshooting

### "WalletConnect not connecting"

- Check `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` is set in Vercel
- Verify Project ID is valid at cloud.walletconnect.com
- Try different wallet (MetaMask vs. Rainbow)

### "Build failed"

- Check Vercel build logs
- Run `bun run build` locally to reproduce
- Fix TypeScript errors
- Push fix to GitHub (Vercel auto-redeploys)

### "Styles not loading"

- Clear browser cache
- Hard refresh (Cmd+Shift+R or Ctrl+Shift+R)
- Check Vercel deployment completed successfully

### "Mobile wallet not connecting"

- Test on actual device, not emulator
- Check WalletConnect allowlist in dashboard
- Try WalletConnect v2 compatible wallets

---

## Production URL

Your SovereignRealm will be live at:

```
https://sovereignrealm-[random].vercel.app
```

Or custom domain (if configured):

```
https://sovereignrealm.app
```

---

## The Gates Are Open 🏛️

**Your citadel is now live. The first citizens may enter.**

**Production deployment: ✅**

**Next**: Invite the first 10 souls to test sovereignty.

See [BETA_INVITATIONS.md](./BETA_INVITATIONS.md) for invitation templates.

---

**The threshold is crossed. The realm enters the world.** 🏛️
