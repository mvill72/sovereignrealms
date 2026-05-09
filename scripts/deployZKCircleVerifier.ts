import { viem } from "hardhat";

/**
 * Deploy ZKCircleVerifier for SovereignRealm ZK-Proof CircleKeys
 *
 * Philosophy:
 * - The Self proves belonging without exposing the Circle
 * - Zero-knowledge membership via Semaphore v4
 * - The gate becomes invisible to all but the sovereign
 *
 * Requirements:
 * - Semaphore v4 must be deployed on target network
 * - Set SEMAPHORE_V4_ADDRESS in .env for your network
 *
 * Usage:
 *   npx hardhat run scripts/deployZKCircleVerifier.ts --network sepolia
 *   npx hardhat run scripts/deployZKCircleVerifier.ts --network base
 *   npx hardhat run scripts/deployZKCircleVerifier.ts --network optimism
 */

// Semaphore v4 addresses (from https://docs.semaphore.pse.dev/deployed-contracts)
// Update these with actual addresses when Semaphore v4 is live on these networks
const SEMAPHORE_ADDRESSES: Record<string, string> = {
  // Mainnet
  mainnet: process.env.SEMAPHORE_V4_MAINNET || "0x0000000000000000000000000000000000000000",

  // Testnets
  sepolia: process.env.SEMAPHORE_V4_SEPOLIA || "0x0000000000000000000000000000000000000000",

  // L2s
  polygon: process.env.SEMAPHORE_V4_POLYGON || "0x0000000000000000000000000000000000000000",
  optimism: process.env.SEMAPHORE_V4_OPTIMISM || "0x0000000000000000000000000000000000000000",
  arbitrum: process.env.SEMAPHORE_V4_ARBITRUM || "0x0000000000000000000000000000000000000000",
  base: process.env.SEMAPHORE_V4_BASE || "0x0000000000000000000000000000000000000000",
};

// Circle configuration
const CIRCLES = {
  FAMILY: 1,
  WORK: 2,
  OUTER: 3,
} as const;

async function main() {
  console.log("🔱 SovereignRealm ZK-Proof CircleKeys Deployment\n");
  console.log("   The Self proves it is the gate — without ever opening it.\n");

  // Get deployer (sovereign)
  const [deployer] = await viem.getWalletClients();
  const publicClient = await viem.getPublicClient();

  console.log("Sovereign deploying from:", deployer.account.address);

  // Get network name and chain ID
  const chainId = await publicClient.getChainId();
  const networkName = publicClient.chain?.name || "unknown";

  console.log("Network:", networkName, `(Chain ID: ${chainId})`);

  // Get Semaphore v4 address for this network
  const networkKey = publicClient.chain?.name.toLowerCase() || "";
  const semaphoreAddress = SEMAPHORE_ADDRESSES[networkKey] || process.env.SEMAPHORE_V4_ADDRESS;

  if (!semaphoreAddress || semaphoreAddress === "0x0000000000000000000000000000000000000000") {
    console.error("\n❌ ERROR: Semaphore v4 address not configured for this network");
    console.error("   Set SEMAPHORE_V4_ADDRESS in your .env file");
    console.error("   Or update SEMAPHORE_ADDRESSES in this script");
    console.error("\n   Find addresses at: https://docs.semaphore.pse.dev/deployed-contracts");
    process.exit(1);
  }

  console.log("Using Semaphore v4 at:", semaphoreAddress);

  // Deploy ZKCircleVerifier
  console.log("\n🔐 Deploying ZKCircleVerifier...");
  const zkVerifier = await viem.deployContract("ZKCircleVerifier", [semaphoreAddress]);

  console.log("✅ ZKCircleVerifier deployed at:", zkVerifier.address);

  // Create Semaphore groups for each Circle
  console.log("\n📊 Creating Semaphore groups for Circles...");

  for (const [name, id] of Object.entries(CIRCLES)) {
    try {
      console.log(`\n   Creating group for ${name} Circle (ID: ${id})...`);

      const hash = await zkVerifier.write.createGroup([BigInt(id)]);
      await publicClient.waitForTransactionReceipt({ hash });

      const groupId = await zkVerifier.read.getGroupId([BigInt(id)]);

      console.log(`   ✓ ${name} Circle → Semaphore Group ID: ${groupId}`);
    } catch (error) {
      console.error(`   ✗ Failed to create ${name} Circle group:`, error);
    }
  }

  // Summary
  console.log("\n" + "=".repeat(70));
  console.log("🎉 ZK-Proof CircleKeys Deployment Complete!");
  console.log("=".repeat(70));

  console.log("\nDeployed Contracts:");
  console.log("  ZKCircleVerifier:", zkVerifier.address);
  console.log("  Semaphore v4:    ", semaphoreAddress);

  console.log("\nCircle Groups Created:");
  for (const [name, id] of Object.entries(CIRCLES)) {
    try {
      const groupId = await zkVerifier.read.getGroupId([BigInt(id)]);
      console.log(`  ${name.padEnd(6)} (${id}): Group ${groupId}`);
    } catch {
      console.log(`  ${name.padEnd(6)} (${id}): Not created`);
    }
  }

  console.log("\n📝 Next Steps:");
  console.log("  1. Update your .env.local:");
  console.log(`     NEXT_PUBLIC_ZK_VERIFIER_CONTRACT=${zkVerifier.address}`);
  console.log(`     NEXT_PUBLIC_SEMAPHORE_ADDRESS=${semaphoreAddress}`);

  console.log("\n  2. Verify contract on block explorer:");
  console.log(`     npx hardhat verify --network ${networkKey} ${zkVerifier.address} ${semaphoreAddress}`);

  console.log("\n  3. Install Semaphore frontend packages:");
  console.log("     bun add @semaphore-protocol/identity");
  console.log("     bun add @semaphore-protocol/group");
  console.log("     bun add @semaphore-protocol/proof");

  console.log("\n  4. Implement frontend ZK proof generation");
  console.log("     See: hooks/useZKCircleProof.ts");

  console.log("\n  5. Set up Merkle tree sync (indexer or on-chain updater)");
  console.log("     Listen to CircleKeys mint/burn events");
  console.log("     Call zkVerifier.addMember() / removeMember()");

  // Save deployment info
  const deployment = {
    network: networkName,
    chainId: chainId,
    timestamp: new Date().toISOString(),
    deployer: deployer.account.address,
    contracts: {
      ZKCircleVerifier: zkVerifier.address,
      SemaphoreV4: semaphoreAddress,
    },
    circles: Object.fromEntries(
      await Promise.all(
        Object.entries(CIRCLES).map(async ([name, id]) => {
          try {
            const groupId = await zkVerifier.read.getGroupId([BigInt(id)]);
            return [name, { circleId: id, groupId: groupId.toString() }];
          } catch {
            return [name, { circleId: id, groupId: null }];
          }
        })
      )
    ),
  };

  console.log("\n💾 Deployment Record:");
  console.log(JSON.stringify(deployment, null, 2));

  console.log("\n✻ The inner citadel is now cryptographically invisible.");
  console.log("  The Self no longer merely guards the gate.");
  console.log("  It proves it is the gate — without ever opening it.\n");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("\n❌ Deployment failed:", error);
    process.exit(1);
  });
