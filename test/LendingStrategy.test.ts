import { ethers } from "hardhat";
import { expect } from "chai";
import { Contract } from "ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("LendingStrategy", function () {
  let lendingStrategy: Contract;
  let mockERC20: Contract;
  let owner: SignerWithAddress;
  let aggregator: SignerWithAddress;
  let user1: SignerWithAddress;
  let user2: SignerWithAddress;

  const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
  const INITIAL_SUPPLY = ethers.utils.parseEther("1000000");
  const TEST_DEPOSIT = ethers.utils.parseEther("1000");

  beforeEach(async function () {
    // Get signers
    [owner, aggregator, user1, user2] = await ethers.getSigners();

    // Deploy mock ERC20 token
    const MockERC20 = await ethers.getContractFactory("MockERC20");
    mockERC20 = await MockERC20.deploy("Mock Token", "MTK", INITIAL_SUPPLY);
    await mockERC20.deployed();

    // Transfer tokens to users for testing
    await mockERC20.transfer(user1.address, TEST_DEPOSIT);
    await mockERC20.transfer(user2.address, TEST_DEPOSIT);

    // Deploy LendingStrategy contract
    const LendingStrategy = await ethers.getContractFactory("LendingStrategy");
    lendingStrategy = await LendingStrategy.deploy(aggregator.address);
    await lendingStrategy.deployed();

    // Add the token as a supported asset
    await lendingStrategy.addAsset(mockERC20.address);
  });

  describe("Deployment", function () {
    it("Should set the right aggregator", async function () {
      expect(await lendingStrategy.aggregator()).to.equal(aggregator.address);
    });

    it("Should set the right owner", async function () {
      expect(await lendingStrategy.owner()).to.equal(owner.address);
    });

    it("Should have the correct name", async function () {
      expect(await lendingStrategy.name()).to.equal("Lending Strategy");
    });

    it("Should have the correct protocol", async function () {
      expect(await lendingStrategy.protocol()).to.equal("Aave on Polkadot");
    });
  });

  describe("Asset Management", function () {
    it("Should correctly add supported assets", async function () {
      expect(await lendingStrategy.supportsAsset(mockERC20.address)).to.equal(true);
    });

    it("Should correctly remove supported assets", async function () {
      await lendingStrategy.removeAsset(mockERC20.address);
      expect(await lendingStrategy.supportsAsset(mockERC20.address)).to.equal(false);
    });

    it("Should reject adding asset with zero address", async function () {
      await expect(lendingStrategy.addAsset(ZERO_ADDRESS))
        .to.be.revertedWith("LendingStrategy: invalid asset address");
    });

    it("Should reject when non-owner tries to add asset", async function () {
      await expect(lendingStrategy.connect(user1).addAsset(mockERC20.address))
        .to.be.revertedWith("Ownable: caller is not the owner");
    });
  });

  describe("Deposit and Withdraw", function () {
    beforeEach(async function () {
      // Approve tokens for spending by the strategy
      await mockERC20.connect(user1).approve(lendingStrategy.address, TEST_DEPOSIT);
      await mockERC20.connect(user2).approve(lendingStrategy.address, TEST_DEPOSIT);
    });

    it("Should correctly deposit assets", async function () {
      // Call deposit from the aggregator account since only aggregator can deposit
      await expect(
        lendingStrategy.connect(aggregator).deposit(mockERC20.address, TEST_DEPOSIT)
      ).to.emit(lendingStrategy, "Deposited");

      // Check TVL
      const tvl = await lendingStrategy.getTVL(mockERC20.address);
      expect(tvl).to.equal(TEST_DEPOSIT);
    });

    it("Should correctly withdraw assets", async function () {
      // First deposit
      await lendingStrategy.connect(aggregator).deposit(mockERC20.address, TEST_DEPOSIT);

      // Then withdraw
      await expect(
        lendingStrategy.connect(aggregator).withdraw(mockERC20.address, TEST_DEPOSIT)
      ).to.emit(lendingStrategy, "Withdrawn");

      // Check TVL after withdrawal
      const tvl = await lendingStrategy.getTVL(mockERC20.address);
      expect(tvl).to.equal(0);
    });

    it("Should reject deposits for unsupported assets", async function () {
      const DummyERC20 = await ethers.getContractFactory("MockERC20");
      const dummyToken = await DummyERC20.deploy("Dummy", "DMY", INITIAL_SUPPLY);
      await dummyToken.deployed();

      await expect(
        lendingStrategy.connect(aggregator).deposit(dummyToken.address, TEST_DEPOSIT)
      ).to.be.revertedWith("LendingStrategy: asset not supported");
    });

    it("Should reject deposits from non-aggregator accounts", async function () {
      await expect(
        lendingStrategy.connect(user1).deposit(mockERC20.address, TEST_DEPOSIT)
      ).to.be.revertedWith("LendingStrategy: caller is not the aggregator");
    });
  });

  describe("APY Management", function () {
    it("Should correctly update and report APY", async function () {
      const newAPY = 500; // 5% in basis points
      await lendingStrategy.updateAPY(mockERC20.address, newAPY);
      
      expect(await lendingStrategy.getAPY(mockERC20.address)).to.equal(newAPY);
    });

    it("Should reject APY updates for unsupported assets", async function () {
      await expect(
        lendingStrategy.updateAPY(ZERO_ADDRESS, 500)
      ).to.be.revertedWith("LendingStrategy: asset not supported");
    });

    it("Should reject APY updates from non-owner accounts", async function () {
      await expect(
        lendingStrategy.connect(user1).updateAPY(mockERC20.address, 500)
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });
  });
});
