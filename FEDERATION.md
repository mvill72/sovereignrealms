# ActivityPub Federation - SovereignRealm

## The Bridge to the Fediverse

> "The universe is transformation; our life is what our thoughts make it."
> — Marcus Aurelius

Your SovereignRealm can now **optionally** federate with the Fediverse (Mastodon, Pixelfed, Pleroma, etc.) while maintaining absolute sovereignty over your private inner citadel.

---

## Philosophy

### The Protected Core

- **Private posts** - Never leave your browser, never federate
- **Circle posts** - Token-gated, only for chosen members
- **Your vault** - Encrypted, local-only, shadow work space

### The Conscious Bridge

- **Public posts** - Optionally federate to Mastodon, Pixelfed, etc.
- **Follows** - Accept followers from the Fediverse
- **Replies** - Receive federated responses
- **Likes** - See appreciation from the wider world

**Key Principle**: The outer world touches your realm only by your explicit choice. The inner citadel remains sovereign.

---

## How It Works

### Your Fediverse Identity

When federation is enabled, your realm becomes an **ActivityPub Actor**:

```
Fediverse Handle: @0x1234...@your-realm.eth
Actor URI: https://your-realm.eth/ap/actors/0x1234...
Profile: Linked to your Profile NFT
Posts: Public posts appear in followers' feeds
```

### What Federates

**Public Posts Only**:
- Posts marked "Public / Fediverse"
- Convert to ActivityPub `Note` objects
- Delivered to followers
- Visible on Mastodon, Pleroma, etc.

**What Stays Private**:
- Private vault posts
- Family circle posts (token-gated)
- Work circle posts (token-gated)
- Encrypted content

### Discovery

Others find you via:
- **WebFinger**: `@user@your-realm.eth`
- **NodeInfo**: Instance metadata
- **Profile URL**: Direct link to your Actor

---

## Architecture

### Components

```
┌─────────────────────────────────────────────┐
│         Your SovereignRealm                 │
│                                             │
│  Private Vault (localStorage)               │
│  ├── Private posts                          │
│  └── Circle posts (token-gated)             │
│                                             │
│  Public Outbox (IPFS + ActivityPub)         │
│  ├── Public posts → IPFS                    │
│  └── ActivityPub Notes → Fediverse          │
│                                             │
│  Inbox (Federated Interactions)             │
│  ├── Follows from Mastodon users            │
│  ├── Replies to your posts                  │
│  └── Likes and boosts                       │
└─────────────────────────────────────────────┘
                    ↕ ActivityPub
┌─────────────────────────────────────────────┐
│            The Fediverse                    │
│  ├── Mastodon instances                     │
│  ├── Pixelfed (photo sharing)               │
│  ├── Pleroma, Misskey, etc.                 │
│  └── 10,000+ independent servers            │
└─────────────────────────────────────────────┘
```

### Tech Stack

- **Fedify** - Modern TypeScript ActivityPub library
- **WebFinger** - Actor discovery protocol
- **NodeInfo** - Instance metadata
- **HTTP Signatures** - Message authentication
- **ActivityStreams** - Post/activity format

---

## Setup Guide

### 1. Enable Federation

In your SovereignRealm UI:

1. Navigate to "Federation Settings"
2. Toggle "Enable Federation" to ON
3. Your Fediverse handle appears: `@user@localhost:3000`

### 2. Configure Domain (Production)

For federation to work beyond localhost:

**Update `.env.local`**:
```bash
NEXT_PUBLIC_REALM_DOMAIN=your-realm.eth
NEXT_PUBLIC_REALM_PROTOCOL=https://
```

**Requirements**:
- Public domain (or ENS name)
- HTTPS enabled (required for ActivityPub)
- Port 443 accessible

### 3. Post to the Fediverse

1. Create a new post
2. Select "Public / Fediverse" visibility
3. Post publishes to:
   - Your local timeline
   - IPFS (content-addressed)
   - ActivityPub outbox (federates to followers)

### 4. Accept Followers

From Mastodon or other instances:
1. User searches for `@user@your-realm.eth`
2. Clicks "Follow"
3. Your realm receives Follow activity
4. Auto-accepts (or manual approval in future)
5. Your public posts appear in their feed

---

## API Endpoints

### ActivityPub Endpoints

**Actor Profile**:
```
GET /ap/actors/{handle}
Content-Type: application/activity+json
```

Returns your Profile NFT as ActivityPub Person.

**Outbox** (Your Posts):
```
GET /ap/actors/{handle}/outbox
Content-Type: application/activity+json
```

Returns public posts as ActivityPub Notes.

**Inbox** (Incoming Activities):
```
POST /ap/actors/{handle}/inbox
Content-Type: application/activity+json
```

Receives Follow, Like, Create (replies), etc.

### Discovery Endpoints

**WebFinger**:
```
GET /.well-known/webfinger?resource=acct:user@domain
Content-Type: application/jrd+json
```

Maps `@user@domain` to Actor URI.

**NodeInfo**:
```
GET /.well-known/nodeinfo
GET /nodeinfo/2.1
Content-Type: application/json
```

Instance metadata for Fediverse discovery.

---

## Federation Flow Examples

### Example 1: Post to Fediverse

```typescript
// 1. User creates post
const post = {
  content: "Exploring digital sovereignty!",
  visibility: "public",  // Enables federation
};

// 2. Post saves to localStorage
addPost(post);

// 3. Post uploads to IPFS
const cid = await uploadTextToIPFS(post.content);

// 4. ActivityPub Note created
const note = {
  "@context": "https://www.w3.org/ns/activitystreams",
  "type": "Note",
  "id": "https://your-realm.eth/ap/notes/123",
  "attributedTo": "https://your-realm.eth/ap/actors/0x1234",
  "content": "Exploring digital sovereignty!",
  "published": "2024-05-04T12:00:00Z",
  "to": ["https://www.w3.org/ns/activitystreams#Public"]
};

// 5. Create activity sent to followers
// Followers see post in their Mastodon feed
```

### Example 2: Receive Follow from Mastodon

```typescript
// 1. Mastodon user clicks "Follow"
// 2. Mastodon sends Follow activity:
{
  "@context": "https://www.w3.org/ns/activitystreams",
  "type": "Follow",
  "actor": "https://mastodon.social/users/alice",
  "object": "https://your-realm.eth/ap/actors/0x1234"
}

// 3. Your inbox receives activity
// 4. Auto-accept (send Accept activity)
{
  "type": "Accept",
  "actor": "https://your-realm.eth/ap/actors/0x1234",
  "object": { /* the Follow activity */ }
}

// 5. Follower added to your realm
addFollower("https://mastodon.social/users/alice");

// 6. Your future public posts deliver to Alice
```

### Example 3: Receive Reply

```typescript
// 1. Someone replies to your post on Mastodon
// 2. Reply sent as Create activity to your inbox
{
  "type": "Create",
  "actor": "https://mastodon.social/users/bob",
  "object": {
    "type": "Note",
    "content": "Great post! Love the Web3 integration.",
    "inReplyTo": "https://your-realm.eth/ap/notes/123"
  }
}

// 3. Your realm receives reply
// 4. Optionally display in your UI
// 5. Reply stored as federated interaction
```

---

## Security & Privacy

### What's Safe to Federate

✅ Public thoughts and ideas
✅ Professional updates
✅ Creative work
✅ Open discussions

### What to Keep Private

❌ Personal family content → Use Family Circle
❌ Sensitive work data → Use Work Circle
❌ Shadow work / journaling → Use Private Vault
❌ Financial information
❌ Private conversations

### Security Measures

**HTTP Signatures**:
- All federated activities signed
- Prevents impersonation
- Verifies sender identity

**Instance Blocking**:
- Block abusive instances
- Prevent spam from known sources
- Protect your inbox

**Follow Approval** (Future):
- Manual approval before accepting
- Curate your audience
- Block unwanted followers

**Content Encryption**:
- Circle posts use token-gating
- Private posts stay encrypted
- IPFS content remains under your control

---

## Testing Federation

### Local Testing (Development)

```bash
# 1. Start your realm
bun dev

# 2. Test WebFinger (should return your actor)
curl "http://localhost:3000/.well-known/webfinger?resource=acct:user@localhost:3000"

# 3. Test Actor endpoint
curl -H "Accept: application/activity+json" \
  "http://localhost:3000/ap/actors/0x1234..."

# 4. Test NodeInfo
curl "http://localhost:3000/.well-known/nodeinfo"
curl "http://localhost:3000/nodeinfo/2.1"
```

### Testing with Mastodon (Local)

```bash
# 1. Run a local Mastodon instance (Docker)
git clone https://github.com/mastodon/mastodon
cd mastodon
docker-compose up -d

# 2. Make your realm accessible to Mastodon
# Use ngrok or similar for local testing
ngrok http 3000

# 3. Update NEXT_PUBLIC_REALM_DOMAIN to ngrok URL

# 4. From Mastodon, search for @user@your-ngrok-url
# 5. Click Follow
# 6. Create public post from your realm
# 7. See it appear in Mastodon feed
```

### Testing Tools

- **Fedify CLI**: Test ActivityPub implementation
```bash
bunx fedify lookup https://your-realm.eth/ap/actors/user
```

- **Mastodon Validator**: Check ActivityPub compliance
- **WebFinger Validator**: Verify discovery

---

## Production Deployment

### Requirements

1. **Domain Name**
   - Register domain or use ENS
   - Must be publicly accessible
   - HTTPS required (Let's Encrypt)

2. **Server Setup**
   - Node.js server (or serverless)
   - Port 443 open (HTTPS)
   - Persistent storage (for follower data)

3. **Environment Config**
```bash
NEXT_PUBLIC_REALM_DOMAIN=your-realm.eth
NEXT_PUBLIC_REALM_PROTOCOL=https://
```

### Deployment Options

**Option A: Vercel/Netlify**
- Deploy Next.js app
- Add custom domain
- SSL automatic
- Federation works immediately

**Option B: Self-Hosted**
```bash
# VPS with nginx reverse proxy
server {
    listen 443 ssl;
    server_name your-realm.eth;

    ssl_certificate /etc/letsencrypt/live/your-realm.eth/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-realm.eth/privkey.pem;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
    }
}
```

**Option C: Docker**
```bash
docker run -d \
  -p 3000:3000 \
  -e NEXT_PUBLIC_REALM_DOMAIN=your-realm.eth \
  -e NEXT_PUBLIC_REALM_PROTOCOL=https:// \
  sovereign-realm
```

---

## Limitations & Future

### Current Limitations

- Single-user instance (by design)
- Auto-accept follows (manual approval coming)
- No DMs yet (use encrypted circles instead)
- No image federation (text only for now)
- No boosts/reblogs (future feature)

### Planned Features

- Manual follow approval
- Federated image posts (IPFS-backed)
- Reply threading UI
- Block/mute specific users
- Instance blocklist management
- Federated search
- Boosts and favorites
- Public/private follower lists

---

## Troubleshooting

### "Not found" on WebFinger

**Problem**: `/.well-known/webfinger` returns 404

**Solutions**:
- Check `.well-known` directory exists in `src/app`
- Verify route.ts files are present
- Restart dev server
- Check Next.js routing config

### "Actor not found" from Mastodon

**Problem**: Mastodon can't find your actor

**Solutions**:
- Verify `NEXT_PUBLIC_REALM_DOMAIN` is set
- Must use HTTPS (not HTTP) in production
- Check WebFinger returns correct actor URI
- Verify actor endpoint returns valid JSON

### Follows not recording

**Problem**: People follow but don't appear in followers

**Solutions**:
- Check inbox route is working
- Verify localStorage is saving
- Check browser console for errors
- Ensure Follow activity handler is registered

### Posts not federating

**Problem**: Public posts don't appear on Mastodon

**Solutions**:
- Verify federation is enabled
- Check post visibility is "public"
- Ensure outbox dispatcher returns posts
- Check followers list is populated

---

## Resources

### Documentation

- **Fedify**: https://fedify.dev/
- **ActivityPub**: https://www.w3.org/TR/activitypub/
- **Mastodon API**: https://docs.joinmastodon.org/
- **WebFinger**: https://webfinger.net/

### Testing

- **Fediverse Observer**: https://fediverse.observer/
- **ActivityPub Validator**: https://activitypub.rocks/
- **Mastodon Instances**: https://joinmastodon.org/servers

### Community

- **Fediverse Forum**: https://socialhub.activitypub.rocks/
- **Mastodon Discord**: https://discord.gg/mastodon
- **ActivityPub Matrix**: #activitypub:matrix.org

---

## The Complete Vision

```
┌──────────────────────────────────────────────────┐
│           Your SovereignRealm                    │
│                                                  │
│  Layer 1: Ethereum (Identity)                   │
│  ├── Profile NFT (ERC-721)                       │
│  └── Circle Keys (ERC-1155)                      │
│                                                  │
│  Layer 2: IPFS (Storage)                         │
│  ├── Profile metadata                            │
│  └── Post content (public)                       │
│                                                  │
│  Layer 3: localStorage (Private)                 │
│  ├── Private vault                               │
│  └── Circle-gated content                        │
│                                                  │
│  Layer 4: ActivityPub (Federation)               │
│  ├── Public posts → Fediverse                    │
│  ├── Followers from Mastodon                     │
│  └── Federated replies                           │
└──────────────────────────────────────────────────┘
```

**You now possess**:
- Wallet-based identity (cryptographic)
- On-chain profile (permanent)
- Token-gated circles (decentralized)
- IPFS storage (content-addressed)
- ActivityPub federation (interoperable)

**The inner citadel** (private/circle) remains sovereign.
**The outer agora** (public) connects with the wider world.
**All by conscious choice.**

---

**The bridge is forged. The realms unite without merging.**

🏛️ **Federation awaits your public thoughts.**
