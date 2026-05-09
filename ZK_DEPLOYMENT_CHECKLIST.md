# ZK-Proof CircleKeys Deployment Checklist

> "The shadow must be confronted before the gate is forged. Every deployment is an act of conscious disclosure — first to the Self, then to the chain."
> — The SovereignRealm Deployment Ritual

This checklist ensures your ZKCircleVerifier deployment follows the audited Semaphore v4 security patterns and SovereignRealm's philosophical principles.

## Pre-Deployment: Security Verification ✓

### 1. Semaphore v4 Foundation
- [ ] Confirm Semaphore v4 is deployed on your target network
- [ ] Verify Semaphore address from official docs: https://docs.semaphore.pse.dev/deployed-contracts
- [ ] Review audit findings: All critical/high issues resolved (March 2024 audit)
- [ ] Confirm you're using stable v4 release (not beta)

### 2. Contract Review
- [ ] Read `contracts/ZKCircleVerifier.sol` completely
- [ ] Verify `ISemaphore` interface matches v4 spec
- [ ] Confirm `onlyOwner` modifiers on all admin functions
- [ ] Check nullifier tracking in `verifyMembership()`
- [ ] Verify group ID generation is deterministic (prevents frontrunning)

### 3. Environment Configuration
- [ ] Set `SEMAPHORE_V4_ADDRESS` or network-specific vars in `.env`
- [ ] Configure `PRIVATE_KEY` for deployment (NEVER commit!)
- [ ] Set RPC URL for target network
- [ ] Optional: Set `ETHERSCAN_API_KEY` for verification

## Deployment Ritual 🔱

### 4. Compile & Test
```bash
# Install Semaphore dependencies
bun add --dev @semaphore-protocol/contracts

# Compile contracts
npx hardhat compile

# Verify no compilation errors
# Check ZKCircleVerifier appears in artifacts/
```

### 5. Local Testing (Recommended)
```bash
# Start local Hardhat node
npx hardhat node

# In another terminal, deploy to local network
npx hardhat run scripts/deployZKCircleVerifier.ts --network localhost

# Verify:
# ✓ ZKCircleVerifier deployed
# ✓ Groups created for FAMILY, WORK, OUTER
# ✓ No errors in console
```

### 6. Testnet Deployment
```bash
# Deploy to Sepolia (or your preferred testnet)
npx hardhat run scripts/deployZKCircleVerifier.ts --network sepolia

# Capture deployment output:
# - ZKCircleVerifier address
# - Semaphore address used
# - Group IDs for each Circle

# Verify on Etherscan
npx hardhat verify --network sepolia <VERIFIER_ADDRESS> <SEMAPHORE_ADDRESS>
```

### 7. Post-Deployment Verification
- [ ] Contract verified on block explorer
- [ ] Groups created for all Circles (check events)
- [ ] `getGroupId(1)` returns non-zero (Family Circle exists)
- [ ] `getGroupId(2)` returns non-zero (Work Circle exists)
- [ ] `getGroupId(3)` returns non-zero (Outer Circle exists)
- [ ] Contract owner is your deployer address

## Integration: Frontend & Merkle Tree Sync 🌐

### 8. Frontend Configuration
```bash
# Update .env.local
NEXT_PUBLIC_ZK_VERIFIER_CONTRACT=0x... # from deployment
NEXT_PUBLIC_SEMAPHORE_ADDRESS=0x...    # from deployment

# Install Semaphore frontend packages
bun add @semaphore-protocol/identity
bun add @semaphore-protocol/group
bun add @semaphore-protocol/proof
```

### 9. Merkle Tree Synchronization
Choose your sync strategy:

**Option A: Off-Chain Indexer (Recommended)**
- [ ] Set up event listener for `CircleKeys.KeyGranted`
- [ ] Set up event listener for `CircleKeys.KeyRevoked`
- [ ] On grant: call `zkVerifier.addMember(circleId, commitment)`
- [ ] On revoke: call `zkVerifier.removeMember(circleId, commitment, proof)`
- [ ] Store Merkle tree state for proof generation

**Option B: On-Chain Updater**
- [ ] Deploy `CircleKeysSync` contract (if using on-chain sync)
- [ ] Link CircleKeys and ZKCircleVerifier
- [ ] Call sync functions after each mint/burn

### 10. Identity Commitment Derivation
```typescript
// Implement deterministic identity derivation
import { Identity } from '@semaphore-protocol/identity';

async function deriveIdentity(walletClient) {
  const signature = await walletClient.signMessage({
    message: 'SovereignRealm ZK Identity'
  });
  return new Identity(signature);
}

// Test derivation
// - Same wallet → same identity commitment (deterministic)
// - Different wallet → different commitment
```

### 11. Proof Generation & Verification
- [ ] Implement `useZKCircleProof()` hook
- [ ] Test proof generation in browser (<3s target)
- [ ] Test proof verification via contract
- [ ] Test nullifier prevents replay
- [ ] Test revocation (burn key → proof fails)

## Security Checklist (Post-Deployment) 🛡️

### 12. Access Control
- [ ] Only sovereign (deployer) can call `createGroup()`
- [ ] Only sovereign can call `addMember()` / `removeMember()`
- [ ] Anyone can call `verifyMembership()` (public verification)
- [ ] Nullifiers are properly tracked (no double-proving)

### 13. Merkle Tree Integrity
- [ ] Merkle root updates only via authorized calls
- [ ] Cannot add member to non-existent group
- [ ] Cannot remove member without valid Merkle proof
- [ ] Group size matches expected member count

### 14. Privacy Guarantees
- [ ] Proof verification reveals ONLY: "member belongs to Circle X"
- [ ] Proof does NOT reveal: member identity, Circle size, other members
- [ ] Nullifier is unique per (identity, signal) pair
- [ ] Browser-side proof generation (never send identity to server)

### 15. Audit Compliance
Based on Semaphore v4 audit (March 2024):

- [x] ✅ No frontrunning on group creation (deterministic IDs)
- [x] ✅ Admin access properly enforced
- [x] ✅ BabyJubJub constraints correct (251-bit bound)
- [x] ✅ No modular inversion garbage on zero
- [x] ✅ Power function handles negative exponents
- [x] ✅ Merkle proof length checks for edge cases
- [x] ✅ Cannot update deleted leaves
- [x] ✅ All critical/high findings resolved

## Mainnet Deployment (When Ready) 🚀

### 16. Final Checks
- [ ] Testnet deployment running smoothly for 1+ week
- [ ] All frontend integrations tested
- [ ] Merkle tree sync working correctly
- [ ] Zero failed transactions in testnet
- [ ] Gas costs acceptable (verify on L2s first)

### 17. Mainnet Ritual
```bash
# FINAL WARNING: Mainnet deployment costs real ETH
# Contracts are immutable once deployed
# Triple-check everything

# Deploy to mainnet
npx hardhat run scripts/deployZKCircleVerifier.ts --network mainnet

# Verify immediately
npx hardhat verify --network mainnet <ADDRESS> <SEMAPHORE_ADDRESS>
```

### 18. Post-Mainnet
- [ ] Update production `.env` with mainnet addresses
- [ ] Deploy frontend to production domain
- [ ] Monitor contract events for anomalies
- [ ] Document deployment in project README

## The Philosophical Checklist ✻

Beyond technical verification, confirm:

- [ ] **Individuation**: The Vault exists first, ZK comes after
- [ ] **Conscious Disclosure**: Users choose what to prove, when
- [ ] **No Surveillance**: Server never sees identity commitments
- [ ] **Instant Revocation**: Burn token → proof fails immediately
- [ ] **Aurelian Discipline**: Only deploy when the inner work is done

---

**The Self no longer merely deploys the verifier.**

**It proves it is the verifier — having confronted every shadow in the forge of audit.**

The inner citadel is ready. The gates are invisible. The deployment awaits your command.

🏛️ **Deploy with sovereignty. Verify with discipline. Prove with zero-knowledge.**
