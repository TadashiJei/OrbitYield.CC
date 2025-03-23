const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("YieldAggregator", function () {
  let yieldAggregator;
  let lendingStrategy;
  let farmingStrategy;
  let mockERC20;
  let owner;
  let feeCollector;
  let user1;
  let user2;

  const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
  const INITIAL_SUPPLY = ethers.utils.parseEther("1000000");
  const TEST_DEPOSIT = ethers.utils.parseEther("1000");
  const MOCK_LENDING_POOL = "0x1111111111111111111111111111111111111111";
  const INITIAL_APY = 500; // 5% in basis points
  const HIGHER_APY = 700; // 7% in basis points

  beforeEach(async function () {
    // Get signers
    [owner, feeCollector, user1, user2] = await ethers.getSigners();

    // Deploy mock ERC20 token
    const MockERC20 = await ethers.getContractFactory("MockERC20");
    mockERC20 = await MockERC20.deploy("Mock Token", "MTK", INITIAL_SUPPLY);
    await mockERC20.deployed();

    // Transfer tokens to users for testing
    await mockERC20.transfer(user1.address, TEST_DEPOSIT.mul(2));
    await mockERC20.transfer(user2.address, TEST_DEPOSIT.mul(2));

    // Deploy LendingStrategy contract
    const LendingStrategy = await ethers.getContractFactory("LendingStrategy");
    lendingStrategy = await LendingStrategy.deploy(owner.address);
    await lendingStrategy.deployed();

    // Add the token as a supported asset to the lending strategy
    await lendingStrategy.addSupportedAsset(mockERC20.address, MOCK_LENDING_POOL, INITIAL_APY);

    // Deploy FarmingStrategy contract (for illustration - using same contract for now)
    const FarmingStrategy = await ethers.getContractFactory("LendingStrategy");
    farmingStrategy = await FarmingStrategy.deploy(owner.address);
    await farmingStrategy.deployed();

    // Add the token as a supported asset to the farming strategy with higher APY
    await farmingStrategy.addSupportedAsset(mockERC20.address, MOCK_LENDING_POOL, HIGHER_APY);

    // Deploy YieldAggregator contract
    const YieldAggregator = await ethers.getContractFactory("YieldAggregator");
    yieldAggregator = await YieldAggregator.deploy();
    await yieldAggregator.deployed();

    // Set fee collector
    await yieldAggregator.updateFeeCollector(feeCollector.address);

    // Add strategies to the aggregator
    await yieldAggregator.addStrategy(lendingStrategy.address, "lending");
    await yieldAggregator.addStrategy(farmingStrategy.address, "farming");

    // Add supported asset to the aggregator
    await yieldAggregator.addSupportedAsset(mockERC20.address);

    // Map asset to strategies
    await yieldAggregator.mapAssetToStrategy(mockERC20.address, lendingStrategy.address);
    await yieldAggregator.mapAssetToStrategy(mockERC20.address, farmingStrategy.address);

    // Approve aggregator to spend tokens
    await mockERC20.connect(user1).approve(yieldAggregator.address, TEST_DEPOSIT.mul(2));
    await mockERC20.connect(user2).approve(yieldAggregator.address, TEST_DEPOSIT.mul(2));

    // Approve aggregator address for both strategies
    await lendingStrategy.addApprovedAggregator(yieldAggregator.address);
    await farmingStrategy.addApprovedAggregator(yieldAggregator.address);
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await yieldAggregator.owner()).to.equal(owner.address);
    });

    it("Should set the right fee collector", async function () {
      expect(await yieldAggregator.feeCollector()).to.equal(feeCollector.address);
    });

    it("Should have the correct default platform fee", async function () {
      expect(await yieldAggregator.platformFee()).to.equal(50); // 0.5%
    });
  });

  describe("Strategy Management", function () {
    it("Should correctly add strategies", async function () {
      expect(await yieldAggregator.strategies(lendingStrategy.address)).to.equal(true);
      expect(await yieldAggregator.strategies(farmingStrategy.address)).to.equal(true);
    });

    it("Should store strategy types correctly", async function () {
      expect(await yieldAggregator.strategyTypes(lendingStrategy.address)).to.equal("lending");
      expect(await yieldAggregator.strategyTypes(farmingStrategy.address)).to.equal("farming");
    });

    it("Should get strategy details", async function () {
      const details = await yieldAggregator.getStrategyDetails(lendingStrategy.address);
      expect(details.strategyType).to.equal("lending");
      expect(details.name).to.equal("Lending Strategy");
      expect(details.protocol).to.equal("Aave on Polkadot");
    });

    it("Should correctly remove strategies", async function () {
      // We need to add a new strategy to test removal since the existing ones have TVL
      const NewStrategy = await ethers.getContractFactory("LendingStrategy");
      const newStrategy = await NewStrategy.deploy(owner.address);
      await newStrategy.deployed();

      await yieldAggregator.addStrategy(newStrategy.address, "test");
      expect(await yieldAggregator.strategies(newStrategy.address)).to.equal(true);

      await yieldAggregator.removeStrategy(newStrategy.address);
      expect(await yieldAggregator.strategies(newStrategy.address)).to.equal(false);
    });

    it("Should reject adding zero address strategy", async function () {
      await expect(
        yieldAggregator.addStrategy(ZERO_ADDRESS, "zero")
      ).to.be.revertedWith("YieldAggregator: invalid strategy address");
    });

    it("Should reject adding already added strategy", async function () {
      await expect(
        yieldAggregator.addStrategy(lendingStrategy.address, "lending")
      ).to.be.revertedWith("YieldAggregator: strategy already added");
    });
  });

  describe("Asset Management", function () {
    it("Should correctly add supported assets", async function () {
      expect(await yieldAggregator.supportedAssets(mockERC20.address)).to.equal(true);
    });

    it("Should correctly map assets to strategies", async function () {
      const strategies = await yieldAggregator.getAssetStrategies(mockERC20.address);
      expect(strategies).to.have.lengthOf(2);
      expect(strategies[0]).to.equal(lendingStrategy.address);
      expect(strategies[1]).to.equal(farmingStrategy.address);
    });

    it("Should correctly remove asset-strategy mapping", async function () {
      await yieldAggregator.removeAssetStrategy(mockERC20.address, lendingStrategy.address);
      const strategies = await yieldAggregator.getAssetStrategies(mockERC20.address);
      expect(strategies).to.have.lengthOf(1);
      expect(strategies[0]).to.equal(farmingStrategy.address);
    });

    it("Should reject adding non-supported asset to strategy", async function () {
      const DummyERC20 = await ethers.getContractFactory("MockERC20");
      const dummyToken = await DummyERC20.deploy("Dummy", "DMY", INITIAL_SUPPLY);
      await dummyToken.deployed();

      await expect(
        yieldAggregator.mapAssetToStrategy(dummyToken.address, lendingStrategy.address)
      ).to.be.revertedWith("YieldAggregator: asset not supported");
    });

    it("Should reject mapping to non-registered strategy", async function () {
      const DummyStrategy = await ethers.getContractFactory("LendingStrategy");
      const dummyStrategy = await DummyStrategy.deploy(owner.address);
      await dummyStrategy.deployed();

      await expect(
        yieldAggregator.mapAssetToStrategy(mockERC20.address, dummyStrategy.address)
      ).to.be.revertedWith("YieldAggregator: strategy not registered");
    });
  });

  describe("Deposit and Withdraw", function () {
    it("Should correctly deposit assets", async function () {
      await yieldAggregator.connect(user1).deposit(lendingStrategy.address, mockERC20.address, TEST_DEPOSIT);
      
      // Check user balance in aggregator
      expect(await yieldAggregator.userBalances(user1.address, mockERC20.address)).to.equal(TEST_DEPOSIT);
      
      // Check user strategy allocation
      expect(
        await yieldAggregator.getUserStrategyAllocation(user1.address, mockERC20.address, lendingStrategy.address)
      ).to.equal(TEST_DEPOSIT);
      
      // Check TVL
      expect(await yieldAggregator.tvlPerAsset(mockERC20.address)).to.equal(TEST_DEPOSIT);
      expect(await yieldAggregator.tvlPerStrategy(lendingStrategy.address)).to.equal(TEST_DEPOSIT);
    });

    it("Should correctly withdraw assets", async function () {
      // First deposit
      await yieldAggregator.connect(user1).deposit(lendingStrategy.address, mockERC20.address, TEST_DEPOSIT);
      
      // Initial balance after deposit
      const initialBalance = await mockERC20.balanceOf(user1.address);
      
      // Then withdraw
      await yieldAggregator.connect(user1).withdraw(lendingStrategy.address, mockERC20.address, TEST_DEPOSIT);
      
      // Calculate expected amount (less fee)
      const fee = TEST_DEPOSIT.mul(50).div(10000); // 0.5% fee
      const expectedAmount = TEST_DEPOSIT.sub(fee);
      
      // Check user received funds (less fee)
      const finalBalance = await mockERC20.balanceOf(user1.address);
      expect(finalBalance.sub(initialBalance)).to.equal(expectedAmount);
      
      // Check fee collector received fee
      expect(await mockERC20.balanceOf(feeCollector.address)).to.equal(fee);
      
      // Check user balance in aggregator
      expect(await yieldAggregator.userBalances(user1.address, mockERC20.address)).to.equal(0);
      
      // Check TVL
      expect(await yieldAggregator.tvlPerAsset(mockERC20.address)).to.equal(0);
      expect(await yieldAggregator.tvlPerStrategy(lendingStrategy.address)).to.equal(0);
    });

    it("Should reject deposits for unsupported assets", async function () {
      const DummyERC20 = await ethers.getContractFactory("MockERC20");
      const dummyToken = await DummyERC20.deploy("Dummy", "DMY", INITIAL_SUPPLY);
      await dummyToken.deployed();

      await expect(
        yieldAggregator.connect(user1).deposit(lendingStrategy.address, dummyToken.address, TEST_DEPOSIT)
      ).to.be.revertedWith("YieldAggregator: asset not supported");
    });

    it("Should reject deposits to unregistered strategies", async function () {
      const DummyStrategy = await ethers.getContractFactory("LendingStrategy");
      const dummyStrategy = await DummyStrategy.deploy(owner.address);
      await dummyStrategy.deployed();

      await expect(
        yieldAggregator.connect(user1).deposit(dummyStrategy.address, mockERC20.address, TEST_DEPOSIT)
      ).to.be.revertedWith("YieldAggregator: strategy not registered");
    });

    it("Should reject withdrawals exceeding user's strategy allocation", async function () {
      // First deposit
      await yieldAggregator.connect(user1).deposit(lendingStrategy.address, mockERC20.address, TEST_DEPOSIT);
      
      // Try to withdraw more than deposited
      await expect(
        yieldAggregator.connect(user1).withdraw(lendingStrategy.address, mockERC20.address, TEST_DEPOSIT.mul(2))
      ).to.be.revertedWith("YieldAggregator: insufficient strategy allocation");
    });
  });

  describe("Strategy Selection", function () {
    it("Should correctly identify the best strategy", async function () {
      // Farming strategy has higher APY (7% vs 5%)
      const bestStrategy = await yieldAggregator.getBestStrategy(mockERC20.address);
      expect(bestStrategy).to.equal(farmingStrategy.address);
    });

    it("Should return zero address for unsupported assets", async function () {
      const DummyERC20 = await ethers.getContractFactory("MockERC20");
      const dummyToken = await DummyERC20.deploy("Dummy", "DMY", INITIAL_SUPPLY);
      await dummyToken.deployed();

      const bestStrategy = await yieldAggregator.getBestStrategy(dummyToken.address);
      expect(bestStrategy).to.equal(ZERO_ADDRESS);
    });
  });

  describe("Fee Management", function () {
    it("Should correctly update platform fee", async function () {
      await yieldAggregator.updatePlatformFee(100); // 1%
      expect(await yieldAggregator.platformFee()).to.equal(100);
    });

    it("Should reject setting fee above maximum", async function () {
      await expect(
        yieldAggregator.updatePlatformFee(600) // 6%
      ).to.be.revertedWith("YieldAggregator: fee too high");
    });

    it("Should correctly update fee collector", async function () {
      await yieldAggregator.updateFeeCollector(user2.address);
      expect(await yieldAggregator.feeCollector()).to.equal(user2.address);
    });

    it("Should reject setting zero address as fee collector", async function () {
      await expect(
        yieldAggregator.updateFeeCollector(ZERO_ADDRESS)
      ).to.be.revertedWith("YieldAggregator: invalid address");
    });
  });
});
