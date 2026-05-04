import { viem } from "hardhat";

/**
 * Deploy SovereignRealm smart contracts
 *
 * Usage:
 *   npx hardhat run scripts/deploy.ts --network localhost
 *   npx hardhat run scripts/deploy.ts --network sepolia
 */
async function main() {
  console.log("🏛️  Deploying SovereignRealm Contracts...\n");

  // Get deployer account
  const [deployer] = await viem.getWalletClients();
  console.log("Deploying with account:", deployer.account.address);

  // Deploy SovereignProfile (Profile NFT)
  console.log("\n📜 Deploying SovereignProfile...");
  const profile = await viem.deployContract("SovereignProfile");
  console.log("✅ SovereignProfile deployed to:", profile.address);

  // Deploy CircleKeys (Access Tokens)
  console.log("\n🔑 Deploying CircleKeys...");
  const circleKeys = await viem.deployContract("CircleKeys");
  console.log("✅ CircleKeys deployed to:", circleKeys.address);

  // Summary
  console.log("\n" + "=".repeat(60));
  console.log("🎉 Deployment Complete!");
  console.log("=".repeat(60));
  console.log("\nContract Addresses:");
  console.log("  SovereignProfile:", profile.address);
  console.log("  CircleKeys:      ", circleKeys.address);

  console.log("\nNext Steps:");
  console.log("  1. Update .env.local with these addresses:");
  console.log(`     NEXT_PUBLIC_PROFILE_CONTRACT=${profile.address}`);
  console.log(`     NEXT_PUBLIC_CIRCLE_KEYS_CONTRACT=${circleKeys.address}`);
  console.log("\n  2. Verify contracts on Etherscan (if on testnet/mainnet):");
  console.log(`     npx hardhat verify --network <network> ${profile.address}`);
  console.log(`     npx hardhat verify --network <network> ${circleKeys.address}`);

  // Save deployment info
  const deployment = {
    network: await viem.getPublicClient().then((c) => c.chain.id),
    timestamp: new Date().toISOString(),
    deployer: deployer.account.address,
    contracts: {
      SovereignProfile: profile.address,
      CircleKeys: circleKeys.address,
    },
  };

  console.log("\n📝 Deployment info:");
  console.log(JSON.stringify(deployment, null, 2));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
