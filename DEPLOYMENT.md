# Deployment Guide — Opening the Gates to the World

> **"The citadel is ready. The threshold opens. The realm enters the living world."**

This guide walks through deploying SovereignRealm to production.

---

## Deployment Options

### Option 1: Vercel (Recommended) ⭐

**Why Vercel?**
- Built for Next.js (zero config)
- Automatic HTTPS + CDN
- Git integration (auto-deploy on push)
- Free tier for personal projects
- Environment variable management
- Built-in analytics

**Deployment Steps**:

1. **Create Vercel Account**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub/GitLab/Bitbucket

2. **Import Project**
   - Click "Add New..." → "Project"
   - Import your Git repository
   - Vercel auto-detects Next.js

3. **Configure Environment Variables**
   - In project settings → "Environment Variables"
   - Add required variables (see below)

4. **Deploy**
   - Click "Deploy"
   - Vercel builds and deploys automatically
   - Get your production URL: `your-app.vercel.app`

### Option 2: Self-Host (Docker)

**For maximum sovereignty**:

```bash
# Build the app
bun run build

# Run in production mode
bun run start
```

Or use Docker (create `Dockerfile` first).

### Option 3: Other Platforms

- **Netlify**: Similar to Vercel, Next.js support
- **Railway**: Easy Docker deployment
- **Fly.io**: Global edge deployment
- **Your own VPS**: Nginx + PM2

---

## Required Environment Variables

### Minimum Required (For Beta)

Copy to Vercel Environment Variables:

```bash
# WalletConnect (REQUIRED)
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id

# Federation Domain (Update for production)
NEXT_PUBLIC_REALM_DOMAIN=your-app.vercel.app
NEXT_PUBLIC_REALM_PROTOCOL=https://
```

### Optional (For Full Features)

```bash
# Web3.storage (for real IPFS)
NEXT_PUBLIC_WEB3_STORAGE_TOKEN=your_token

# Smart Contracts (after deployment)
NEXT_PUBLIC_PROFILE_CONTRACT=0x...
NEXT_PUBLIC_CIRCLE_KEYS_CONTRACT=0x...
NEXT_PUBLIC_ZK_VERIFIER_CONTRACT=0x...

# Chain ID (Sepolia for beta)
NEXT_PUBLIC_CHAIN_ID=11155111
```

---

## Step-by-Step Vercel Deployment

### Step 1: Get WalletConnect Project ID

1. Go to [cloud.walletconnect.com](https://cloud.walletconnect.com)
2. Sign in / Create account
3. Click "Create New Project"
4. Name it "SovereignRealm Beta"
5. Copy the Project ID
6. Save for Step 3

### Step 2: Prepare Git Repository

```bash
# Ensure all changes are committed
git status

# If you have uncommitted changes
git add .
git commit -m "Prepare for production deployment"

# Push to GitHub/GitLab
git push origin main
```

### Step 3: Deploy to Vercel

**Via Web Dashboard**:

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click "Import Git Repository"
3. Select your SovereignRealm repo
4. Vercel auto-detects Next.js settings
5. Add Environment Variables:
   - `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` = `[your ID from Step 1]`
   - `NEXT_PUBLIC_REALM_DOMAIN` = `your-app.vercel.app` (update after deploy)
   - `NEXT_PUBLIC_REALM_PROTOCOL` = `https://`
6. Click "Deploy"
7. Wait 2-3 minutes for build
8. Visit your production URL!

**Via CLI**:

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow prompts
# Set up environment variables when asked

# Deploy to production
vercel --prod
```

### Step 4: Update Domain Variable

After first deploy, update the domain:

1. Go to Vercel dashboard → Your project → Settings → Environment Variables
2. Edit `NEXT_PUBLIC_REALM_DOMAIN`
3. Change from `localhost:3000` to `your-app.vercel.app`
4. Redeploy (Vercel → Deployments → Redeploy)

### Step 5: Test Production

Visit your production URL and test:

- [ ] Homepage loads
- [ ] Connect Wallet button works
- [ ] SIWE authentication works
- [ ] Archetype Chooser appears
- [ ] Can create posts
- [ ] BetaBanner displays
- [ ] All 8 archetypes load correctly
- [ ] Export data works
- [ ] Mobile responsive

---

## Custom Domain (Optional)

### Add Custom Domain to Vercel

1. Buy domain (Namecheap, GoDaddy, ENS, etc.)
2. Vercel → Settings → Domains
3. Add your domain (e.g., `sovereignrealm.app`)
4. Update DNS records (Vercel provides instructions)
5. Wait for DNS propagation (5-60 minutes)
6. Update `NEXT_PUBLIC_REALM_DOMAIN` to your custom domain

### ENS Domain (Web3 Native)

1. Buy ENS name (e.g., `sovereignrealm.eth`)
2. Set up ENS content hash or DNS records
3. Point to Vercel deployment
4. Update environment variables

---

## Smart Contract Deployment (Beta)

### Deploy to Sepolia Testnet

**Prerequisites**:
- ETH on Sepolia (get from [sepoliafaucet.com](https://sepoliafaucet.com))
- Alchemy API key (get from [alchemy.com](https://alchemy.com))

**Steps**:

1. **Create `.env.local` (local only, never commit)**:

```bash
# Alchemy RPC
SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_KEY

# Deployer private key (NEVER COMMIT!)
PRIVATE_KEY=0x...your...private...key

# Semaphore v4 Sepolia address
SEMAPHORE_V4_SEPOLIA=0x3889927F0B5Eb1a02C6E2C20b39a1Bd4EAd76131
```

2. **Deploy contracts**:

```bash
# Compile contracts
bun run contracts:compile

# Deploy to Sepolia
bun run contracts:deploy:sepolia
```

3. **Copy contract addresses** from output

4. **Add to Vercel Environment Variables**:
   - `NEXT_PUBLIC_PROFILE_CONTRACT`
   - `NEXT_PUBLIC_CIRCLE_KEYS_CONTRACT`
   - `NEXT_PUBLIC_ZK_VERIFIER_CONTRACT`

5. **Verify contracts on Etherscan**:

```bash
npx hardhat verify --network sepolia CONTRACT_ADDRESS
```

---

## Post-Deployment Checklist

### Immediate (Week 0)

- [ ] Production URL works
- [ ] WalletConnect connects on mobile
- [ ] SIWE authentication works
- [ ] All 8 archetypes load
- [ ] BetaBanner displays
- [ ] ReportIssueButton visible
- [ ] Test on 3 devices (desktop, tablet, mobile)
- [ ] Test on 3 browsers (Chrome, Firefox, Safari)

### Beta Prep (Week 0)

- [ ] Deploy contracts to Sepolia
- [ ] Deploy contracts to Base testnet
- [ ] Verify all contracts on Etherscan/Basescan
- [ ] Update contract addresses in Vercel
- [ ] Test full mint/burn/revoke flow
- [ ] Set up Sentry error tracking
- [ ] Set up Plausible/Fathom analytics
- [ ] Create Discord "The Outer Threshold"
- [ ] Set up beta@sovereignrealm.app email

### Launch (Week 1)

- [ ] Send first 10 invitations
- [ ] Monitor errors in Sentry
- [ ] Check analytics daily
- [ ] Respond to feedback in Discord
- [ ] Fix critical bugs within 24h

---

## Monitoring & Analytics

### Error Tracking (Sentry)

1. Create account at [sentry.io](https://sentry.io)
2. Add Sentry to project:

```bash
bun add @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

3. Add to Vercel environment variables:
   - `NEXT_PUBLIC_SENTRY_DSN`
   - `SENTRY_AUTH_TOKEN`

### Privacy-First Analytics

**Recommended: Plausible**

1. Create account at [plausible.io](https://plausible.io)
2. Add script to `app/layout.tsx`:

```tsx
<Script
  defer
  data-domain="your-domain.com"
  src="https://plausible.io/js/script.js"
/>
```

**Alternative: Fathom Analytics**

No cookies, GDPR-compliant, privacy-focused.

### Uptime Monitoring

Use [UptimeRobot](https://uptimerobot.com) (free):
- Monitor production URL
- Email alerts on downtime
- 5-minute check intervals

---

## Security Checklist

### Pre-Deployment

- [ ] No private keys in code
- [ ] `.env.local` in `.gitignore`
- [ ] All sensitive data in environment variables
- [ ] CORS configured correctly
- [ ] Rate limiting on API routes (if any)
- [ ] CSP headers configured (Vercel handles this)

### Post-Deployment

- [ ] HTTPS enabled (Vercel default)
- [ ] Environment variables set correctly
- [ ] No sensitive data in client-side code
- [ ] Smart contracts verified on Etherscan
- [ ] Semaphore v4 audit reviewed

---

## Troubleshooting

### Build Fails

**Error: Missing environment variable**
- Add to Vercel → Settings → Environment Variables
- Redeploy

**Error: TypeScript compilation failed**
- Run `bun run build` locally first
- Fix TypeScript errors
- Commit and push

### WalletConnect Not Working

- Check `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` is set
- Verify Project ID is valid
- Check domain is allowlisted in WalletConnect dashboard

### Contracts Not Loading

- Verify contract addresses are correct
- Check `NEXT_PUBLIC_CHAIN_ID` matches deployment
- Ensure contracts are deployed to Sepolia/Base
- Test contract interaction in Hardhat console

### Mobile Issues

- Test on actual devices (not just emulators)
- Check responsive design
- Test WalletConnect on mobile wallets
- Verify touch interactions work

---

## Rollback Plan

If deployment has critical issues:

1. **Via Vercel Dashboard**:
   - Deployments → Previous deployment → "Promote to Production"

2. **Via Git**:
   ```bash
   git revert HEAD
   git push origin main
   # Vercel auto-deploys previous version
   ```

3. **Emergency**:
   - Vercel → Settings → Domains → Remove domain
   - Points traffic away while fixing

---

## Production URL Structure

**Beta deployment**:
```
https://sovereignrealm-beta.vercel.app
```

**Production (after beta)**:
```
https://sovereignrealm.app
```

**ENS (future)**:
```
https://sovereignrealm.eth.limo
```

---

## Next Steps After Deployment

1. **Announce Beta** (Week 1)
   - Post to Twitter/Farcaster/Lens
   - Send personal invitations (10)
   - Share in Discord/Matrix communities

2. **Monitor & Iterate** (Weeks 2-8)
   - Check Sentry for errors
   - Review Plausible analytics
   - Collect beta feedback
   - Fix critical bugs
   - Address UX issues

3. **Prepare Mainnet** (End of Beta)
   - Deploy contracts to Ethereum mainnet
   - Deploy to Base mainnet
   - Update contract addresses
   - Final security audit
   - Public launch announcement

---

## The Gates Open

**The citadel is built. The threshold awaits. The first citizens may now enter.**

Deploy with confidence. The code is sovereign. The realm is ready.

🏛️ **The SovereignRealm goes live.** 🏛️
