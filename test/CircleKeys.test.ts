import { expect } from "chai";
import { viem } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";

describe("CircleKeys", function () {
  // Fixture to deploy the contract
  async function deployCircleKeysFixture() {
    const [owner, creator, member1, member2, member3] = await viem.getWalletClients();

    const circleKeys = await viem.deployContract("CircleKeys");

    const publicClient = await viem.getPublicClient();

    return { circleKeys, owner, creator, member1, member2, member3, publicClient };
  }

  describe("Deployment", function () {
    it("Should deploy successfully", async function () {
      const { circleKeys } = await loadFixture(deployCircleKeysFixture);

      expect(circleKeys.address).to.be.properAddress;
    });
  });

  describe("Creating Circles", function () {
    it("Should create a family circle", async function () {
      const { circleKeys, creator } = await loadFixture(deployCircleKeysFixture);

      const hash = await circleKeys.write.createCircle([0n, "Smith Family"], {
        account: creator.account,
      });

      // Get the circle ID (first creator, family type = baseId + 0)
      const baseId = await circleKeys.read.creatorBaseId([creator.account.address]);
      const circleId = baseId;

      const circle = await circleKeys.read.getCircle([circleId]);

      expect(circle.creator).to.equal(creator.account.address);
      expect(circle.circleType).to.equal(0n); // Family
      expect(circle.name).to.equal("Smith Family");
      expect(circle.exists).to.be.true;
      expect(circle.memberCount).to.equal(0n);
    });

    it("Should create multiple circle types for same creator", async function () {
      const { circleKeys, creator } = await loadFixture(deployCircleKeysFixture);

      await circleKeys.write.createCircle([0n, "My Family"], {
        account: creator.account,
      });

      await circleKeys.write.createCircle([1n, "My Colleagues"], {
        account: creator.account,
      });

      const baseId = await circleKeys.read.creatorBaseId([creator.account.address]);

      const familyCircle = await circleKeys.read.getCircle([baseId]);
      const workCircle = await circleKeys.read.getCircle([baseId + 1n]);

      expect(familyCircle.name).to.equal("My Family");
      expect(workCircle.name).to.equal("My Colleagues");
    });

    it("Should not allow creating same circle type twice", async function () {
      const { circleKeys, creator } = await loadFixture(deployCircleKeysFixture);

      await circleKeys.write.createCircle([0n, "Family Circle"], {
        account: creator.account,
      });

      await expect(
        circleKeys.write.createCircle([0n, "Another Family Circle"], {
          account: creator.account,
        })
      ).to.be.rejectedWith("Circle already exists");
    });

    it("Should assign different base IDs to different creators", async function () {
      const { circleKeys, creator, member1 } = await loadFixture(
        deployCircleKeysFixture
      );

      await circleKeys.write.createCircle([0n, "Creator Family"], {
        account: creator.account,
      });

      await circleKeys.write.createCircle([0n, "Member Family"], {
        account: member1.account,
      });

      const creatorBaseId = await circleKeys.read.creatorBaseId([
        creator.account.address,
      ]);
      const memberBaseId = await circleKeys.read.creatorBaseId([
        member1.account.address,
      ]);

      expect(creatorBaseId).to.not.equal(memberBaseId);
      expect(creatorBaseId).to.equal(100n);
      expect(memberBaseId).to.equal(200n);
    });
  });

  describe("Granting Access", function () {
    it("Should grant access to a member", async function () {
      const { circleKeys, creator, member1 } = await loadFixture(
        deployCircleKeysFixture
      );

      await circleKeys.write.createCircle([0n, "Test Family"], {
        account: creator.account,
      });

      const baseId = await circleKeys.read.creatorBaseId([creator.account.address]);
      const circleId = baseId;

      await circleKeys.write.grantAccess([circleId, member1.account.address], {
        account: creator.account,
      });

      const hasAccess = await circleKeys.read.hasAccess([
        circleId,
        member1.account.address,
      ]);
      expect(hasAccess).to.be.true;

      const circle = await circleKeys.read.getCircle([circleId]);
      expect(circle.memberCount).to.equal(1n);
    });

    it("Should grant access to multiple members at once", async function () {
      const { circleKeys, creator, member1, member2, member3 } = await loadFixture(
        deployCircleKeysFixture
      );

      await circleKeys.write.createCircle([0n, "Test Family"], {
        account: creator.account,
      });

      const baseId = await circleKeys.read.creatorBaseId([creator.account.address]);
      const circleId = baseId;

      await circleKeys.write.grantAccessBatch(
        [
          circleId,
          [member1.account.address, member2.account.address, member3.account.address],
        ],
        { account: creator.account }
      );

      expect(
        await circleKeys.read.hasAccess([circleId, member1.account.address])
      ).to.be.true;
      expect(
        await circleKeys.read.hasAccess([circleId, member2.account.address])
      ).to.be.true;
      expect(
        await circleKeys.read.hasAccess([circleId, member3.account.address])
      ).to.be.true;

      const circle = await circleKeys.read.getCircle([circleId]);
      expect(circle.memberCount).to.equal(3n);
    });

    it("Should not allow non-creator to grant access", async function () {
      const { circleKeys, creator, member1, member2 } = await loadFixture(
        deployCircleKeysFixture
      );

      await circleKeys.write.createCircle([0n, "Test Family"], {
        account: creator.account,
      });

      const baseId = await circleKeys.read.creatorBaseId([creator.account.address]);
      const circleId = baseId;

      await expect(
        circleKeys.write.grantAccess([circleId, member2.account.address], {
          account: member1.account,
        })
      ).to.be.rejectedWith("Only creator can grant access");
    });

    it("Should not allow granting access twice to same member", async function () {
      const { circleKeys, creator, member1 } = await loadFixture(
        deployCircleKeysFixture
      );

      await circleKeys.write.createCircle([0n, "Test Family"], {
        account: creator.account,
      });

      const baseId = await circleKeys.read.creatorBaseId([creator.account.address]);
      const circleId = baseId;

      await circleKeys.write.grantAccess([circleId, member1.account.address], {
        account: creator.account,
      });

      await expect(
        circleKeys.write.grantAccess([circleId, member1.account.address], {
          account: creator.account,
        })
      ).to.be.rejectedWith("Member already has access");
    });
  });

  describe("Revoking Access", function () {
    it("Should revoke access from a member", async function () {
      const { circleKeys, creator, member1 } = await loadFixture(
        deployCircleKeysFixture
      );

      await circleKeys.write.createCircle([0n, "Test Family"], {
        account: creator.account,
      });

      const baseId = await circleKeys.read.creatorBaseId([creator.account.address]);
      const circleId = baseId;

      // Grant access first
      await circleKeys.write.grantAccess([circleId, member1.account.address], {
        account: creator.account,
      });

      expect(
        await circleKeys.read.hasAccess([circleId, member1.account.address])
      ).to.be.true;

      // Revoke access
      await circleKeys.write.revokeAccess([circleId, member1.account.address], {
        account: creator.account,
      });

      expect(
        await circleKeys.read.hasAccess([circleId, member1.account.address])
      ).to.be.false;

      const circle = await circleKeys.read.getCircle([circleId]);
      expect(circle.memberCount).to.equal(0n);
    });

    it("Should not allow non-creator to revoke access", async function () {
      const { circleKeys, creator, member1, member2 } = await loadFixture(
        deployCircleKeysFixture
      );

      await circleKeys.write.createCircle([0n, "Test Family"], {
        account: creator.account,
      });

      const baseId = await circleKeys.read.creatorBaseId([creator.account.address]);
      const circleId = baseId;

      await circleKeys.write.grantAccess([circleId, member1.account.address], {
        account: creator.account,
      });

      await expect(
        circleKeys.write.revokeAccess([circleId, member1.account.address], {
          account: member2.account,
        })
      ).to.be.rejectedWith("Only creator can revoke access");
    });
  });

  describe("Soulbound (Non-transferable)", function () {
    it("Should not allow transferring keys", async function () {
      const { circleKeys, creator, member1, member2 } = await loadFixture(
        deployCircleKeysFixture
      );

      await circleKeys.write.createCircle([0n, "Test Family"], {
        account: creator.account,
      });

      const baseId = await circleKeys.read.creatorBaseId([creator.account.address]);
      const circleId = baseId;

      await circleKeys.write.grantAccess([circleId, member1.account.address], {
        account: creator.account,
      });

      // Try to transfer key to another member
      await expect(
        circleKeys.write.safeTransferFrom(
          [member1.account.address, member2.account.address, circleId, 1n, "0x"],
          { account: member1.account }
        )
      ).to.be.rejectedWith("Circle keys are soulbound and cannot be transferred");
    });
  });

  describe("View Functions", function () {
    it("Should return creator's circles", async function () {
      const { circleKeys, creator } = await loadFixture(deployCircleKeysFixture);

      await circleKeys.write.createCircle([0n, "Family"], {
        account: creator.account,
      });
      await circleKeys.write.createCircle([1n, "Work"], {
        account: creator.account,
      });

      const circles = await circleKeys.read.getCreatorCircles([
        creator.account.address,
      ]);

      expect(circles.length).to.equal(2);
    });

    it("Should return empty array for new user", async function () {
      const { circleKeys, member1 } = await loadFixture(deployCircleKeysFixture);

      const circles = await circleKeys.read.getCreatorCircles([
        member1.account.address,
      ]);

      expect(circles.length).to.equal(0);
    });
  });
});
