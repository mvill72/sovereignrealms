import { expect } from "chai";
import { viem } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";

describe("SovereignProfile", function () {
  // Fixture to deploy the contract
  async function deployProfileFixture() {
    const [owner, user1, user2, user3] = await viem.getWalletClients();

    const profile = await viem.deployContract("SovereignProfile");

    const publicClient = await viem.getPublicClient();

    return { profile, owner, user1, user2, user3, publicClient };
  }

  describe("Deployment", function () {
    it("Should set the correct name and symbol", async function () {
      const { profile } = await loadFixture(deployProfileFixture);

      expect(await profile.read.name()).to.equal("Sovereign Profile");
      expect(await profile.read.symbol()).to.equal("SOVEREIGN");
    });

    it("Should start with zero profiles", async function () {
      const { profile } = await loadFixture(deployProfileFixture);

      expect(await profile.read.totalProfiles()).to.equal(0n);
    });
  });

  describe("Minting Profiles", function () {
    it("Should allow user to mint a profile", async function () {
      const { profile, user1 } = await loadFixture(deployProfileFixture);

      const metadataURI = "ipfs://QmExample123/profile.json";

      const hash = await profile.write.mintProfile([metadataURI], {
        account: user1.account,
      });

      // Check that profile was minted
      expect(await profile.read.hasProfile([user1.account.address])).to.be.true;
      expect(await profile.read.totalProfiles()).to.equal(1n);

      // Check token ID
      const tokenId = await profile.read.getProfileId([user1.account.address]);
      expect(tokenId).to.equal(1n);

      // Check metadata URI
      const uri = await profile.read.getProfileURI([user1.account.address]);
      expect(uri).to.equal(metadataURI);
    });

    it("Should emit ProfileMinted event", async function () {
      const { profile, user1, publicClient } = await loadFixture(deployProfileFixture);

      const metadataURI = "ipfs://QmExample123/profile.json";

      const hash = await profile.write.mintProfile([metadataURI], {
        account: user1.account,
      });

      const receipt = await publicClient.waitForTransactionReceipt({ hash });

      // Check event was emitted
      expect(receipt.status).to.equal("success");
    });

    it("Should not allow minting twice from same address", async function () {
      const { profile, user1 } = await loadFixture(deployProfileFixture);

      const metadataURI = "ipfs://QmExample123/profile.json";

      await profile.write.mintProfile([metadataURI], {
        account: user1.account,
      });

      // Try to mint again
      await expect(
        profile.write.mintProfile([metadataURI], {
          account: user1.account,
        })
      ).to.be.rejectedWith("Profile already exists for this address");
    });

    it("Should not allow empty metadata URI", async function () {
      const { profile, user1 } = await loadFixture(deployProfileFixture);

      await expect(
        profile.write.mintProfile([""], {
          account: user1.account,
        })
      ).to.be.rejectedWith("Metadata URI cannot be empty");
    });

    it("Should assign sequential token IDs", async function () {
      const { profile, user1, user2, user3 } = await loadFixture(deployProfileFixture);

      const uri1 = "ipfs://QmUser1/profile.json";
      const uri2 = "ipfs://QmUser2/profile.json";
      const uri3 = "ipfs://QmUser3/profile.json";

      await profile.write.mintProfile([uri1], { account: user1.account });
      await profile.write.mintProfile([uri2], { account: user2.account });
      await profile.write.mintProfile([uri3], { account: user3.account });

      expect(await profile.read.getProfileId([user1.account.address])).to.equal(1n);
      expect(await profile.read.getProfileId([user2.account.address])).to.equal(2n);
      expect(await profile.read.getProfileId([user3.account.address])).to.equal(3n);
      expect(await profile.read.totalProfiles()).to.equal(3n);
    });
  });

  describe("Updating Profiles", function () {
    it("Should allow owner to update their profile", async function () {
      const { profile, user1 } = await loadFixture(deployProfileFixture);

      const originalURI = "ipfs://QmOriginal/profile.json";
      const newURI = "ipfs://QmUpdated/profile.json";

      await profile.write.mintProfile([originalURI], {
        account: user1.account,
      });

      await profile.write.updateProfile([newURI], {
        account: user1.account,
      });

      const updatedURI = await profile.read.getProfileURI([user1.account.address]);
      expect(updatedURI).to.equal(newURI);
    });

    it("Should not allow updating without a profile", async function () {
      const { profile, user1 } = await loadFixture(deployProfileFixture);

      await expect(
        profile.write.updateProfile(["ipfs://QmNew/profile.json"], {
          account: user1.account,
        })
      ).to.be.rejectedWith("No profile exists for this address");
    });

    it("Should not allow empty metadata URI in update", async function () {
      const { profile, user1 } = await loadFixture(deployProfileFixture);

      await profile.write.mintProfile(["ipfs://QmOriginal/profile.json"], {
        account: user1.account,
      });

      await expect(
        profile.write.updateProfile([""], {
          account: user1.account,
        })
      ).to.be.rejectedWith("Metadata URI cannot be empty");
    });
  });

  describe("Soulbound (Non-transferable)", function () {
    it("Should not allow transferring profile to another address", async function () {
      const { profile, user1, user2 } = await loadFixture(deployProfileFixture);

      await profile.write.mintProfile(["ipfs://QmExample/profile.json"], {
        account: user1.account,
      });

      const tokenId = await profile.read.getProfileId([user1.account.address]);

      // Try to transfer - should fail
      await expect(
        profile.write.transferFrom(
          [user1.account.address, user2.account.address, tokenId],
          { account: user1.account }
        )
      ).to.be.rejectedWith("Sovereign profiles are soulbound and cannot be transferred");
    });
  });

  describe("View Functions", function () {
    it("Should return empty string for non-existent profile", async function () {
      const { profile, user1 } = await loadFixture(deployProfileFixture);

      const uri = await profile.read.getProfileURI([user1.account.address]);
      expect(uri).to.equal("");
    });

    it("Should return false for hasProfile when no profile exists", async function () {
      const { profile, user1 } = await loadFixture(deployProfileFixture);

      expect(await profile.read.hasProfile([user1.account.address])).to.be.false;
    });

    it("Should return 0 for getProfileId when no profile exists", async function () {
      const { profile, user1 } = await loadFixture(deployProfileFixture);

      expect(await profile.read.getProfileId([user1.account.address])).to.equal(0n);
    });
  });
});
