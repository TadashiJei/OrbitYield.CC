const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Optimized Strategy Factory Tests", function () {
  let YieldAggregator;
  let MultiSigWallet;
  let MasterStrategyFactory;
  let mockERC20;
  
  let yieldAggregator;
  let multiSigWallet;
  let masterFactory;
  let mockToken;
  let mockRewardToken;
  let mockTokenB;
  
  let owner;
  let user1;
  let user2;
  
  before(async function () {
    [owner, user1, user2] = await ethers.getSigners();
    
    // Deploy mock ERC20 token for testing
    const MockERC20 = await ethers.getContractFactory("contracts/mocks/MockERC20.sol:MockERC20");
    mockToken = await MockERC20.deploy("Mock Token", "MOCK", 18);
    await mockToken.deployed();
    // Mint some tokens
    await mockToken.mint(owner.address, ethers.utils.parseEther("1000000"));
    
    mockRewardToken = await MockERC20.deploy("Mock Reward", "MRWD", 18);
    await mockRewardToken.deployed();
    await mockRewardToken.mint(owner.address, ethers.utils.parseEther("1000000"));
    
    mockTokenB = await MockERC20.deploy("Mock Token B", "MTKB", 18);
    await mockTokenB.deployed();
    await mockTokenB.mint(owner.address, ethers.utils.parseEther("1000000"));
    
    // Transfer some tokens to users for testing
    await mockToken.transfer(user1.address, ethers.utils.parseEther("10000"));
    await mockToken.transfer(user2.address, ethers.utils.parseEther("10000"));
    
    // Deploy YieldAggregator
    YieldAggregator = await ethers.getContractFactory("YieldAggregator");
    yieldAggregator = await YieldAggregator.deploy();
    await yieldAggregator.deployed();
    
    // Deploy MultiSigWallet
    MultiSigWallet = await ethers.getContractFactory("contracts/mocks/MockMultiSigWallet.sol:MultiSigWallet");
    multiSigWallet = await MultiSigWallet.deploy(
      [owner.address, user1.address], 
      1, 
      yieldAggregator.address
    );
    await multiSigWallet.deployed();
    
    // Set MultiSigWallet in YieldAggregator
    await yieldAggregator.setMultiSigWallet(multiSigWallet.address);
    
    // Add tokens as supported assets in YieldAggregator
    await yieldAggregator.addSupportedAsset(mockToken.address);
    await yieldAggregator.addSupportedAsset(mockRewardToken.address);
    await yieldAggregator.addSupportedAsset(mockTokenB.address);
  });
  
  describe("MasterStrategyFactory Deployment", function () {
    it("Should deploy MasterStrategyFactory successfully", async function () {
      MasterStrategyFactory = await ethers.getContractFactory("MasterStrategyFactory");
      masterFactory = await MasterStrategyFactory.deploy(
        yieldAggregator.address, 
        multiSigWallet.address
      );
      await masterFactory.deployed();
      
      expect(await masterFactory.aggregator()).to.equal(yieldAggregator.address);
      expect(await masterFactory.multiSigWallet()).to.equal(multiSigWallet.address);
      
      // Verify sub-factories are deployed
      const lendingFactoryAddress = await masterFactory.lendingFactory();
      const farmingFactoryAddress = await masterFactory.farmingFactory();
      const liquidityFactoryAddress = await masterFactory.liquidityFactory();
      
      expect(ethers.utils.isAddress(lendingFactoryAddress)).to.be.true;
      expect(ethers.utils.isAddress(farmingFactoryAddress)).to.be.true;
      expect(ethers.utils.isAddress(liquidityFactoryAddress)).to.be.true;
    });
  });
  
  describe("Strategy Deployment Through Factory", function () {
    let lendingStrategy;
    let farmingStrategy;
    let liquidityStrategy;
    
    it("Should deploy a lending strategy", async function () {
      const tx = await masterFactory.deployLendingStrategy(
        "Aave Lending",
        "Aave on Ethereum",
        mockToken.address,
        owner.address, // Mock lending pool address
        1000 // 10% initial APY (in basis points)
      );
      
      const receipt = await tx.wait();
      // Get the deployed strategy address from the transaction return value
      const lendingFactory = await ethers.getContractAt("LendingStrategyFactory", await masterFactory.lendingFactory());
      const strategyCount = await lendingFactory.getLendingStrategyCount();
      const strategies = await lendingFactory.getAllLendingStrategies();
      lendingStrategy = strategies[strategies.length - 1]; // Get the last deployed strategy
      
      expect(ethers.utils.isAddress(lendingStrategy)).to.be.true;
      
      // Verify the strategy is registered in the factory
      expect(strategies).to.include(lendingStrategy);
    });
    
    it("Should deploy a farming strategy", async function () {
      const tx = await masterFactory.deployFarmingStrategy(
        "Curve Farming",
        "Curve on Ethereum",
        mockToken.address,
        owner.address, // Mock farm pool address
        mockRewardToken.address,
        2000 // 20% initial APY (in basis points)
      );
      
      const receipt = await tx.wait();
      // Get the deployed strategy address from the transaction return value
      const farmingFactory = await ethers.getContractAt("FarmingStrategyFactory", await masterFactory.farmingFactory());
      const strategies = await farmingFactory.getAllFarmingStrategies();
      farmingStrategy = strategies[strategies.length - 1]; // Get the last deployed strategy
      
      expect(ethers.utils.isAddress(farmingStrategy)).to.be.true;
      
      // Verify the strategy is registered in the factory
      expect(strategies).to.include(farmingStrategy);
    });
    
    it("Should deploy a liquidity strategy", async function () {
      const tx = await masterFactory.deployLiquidityStrategy(
        "Uniswap LP",
        "Uniswap V3",
        mockToken.address,
        mockTokenB.address,
        owner.address, // Mock LP token address
        1500 // 15% initial APY (in basis points)
      );
      
      const receipt = await tx.wait();
      // Get the deployed strategy address from the transaction return value
      const liquidityFactory = await ethers.getContractAt("LiquidityStrategyFactory", await masterFactory.liquidityFactory());
      const strategies = await liquidityFactory.getAllLiquidityStrategies();
      liquidityStrategy = strategies[strategies.length - 1]; // Get the last deployed strategy
      
      expect(ethers.utils.isAddress(liquidityStrategy)).to.be.true;
      
      // Verify the strategy is registered in the factory
      expect(strategies).to.include(liquidityStrategy);
    });
    
    it("Should get all strategies", async function () {
      const [lending, farming, liquidity] = await masterFactory.getAllStrategies();
      
      expect(lending).to.include(lendingStrategy);
      expect(farming).to.include(farmingStrategy);
      expect(liquidity).to.include(liquidityStrategy);
    });
    
    it("Should get strategy counts", async function () {
      const [lendingCount, farmingCount, liquidityCount] = await masterFactory.getStrategyCounts();
      
      expect(lendingCount).to.be.at.least(1);
      expect(farmingCount).to.be.at.least(1);
      expect(liquidityCount).to.be.at.least(1);
    });
  });
  
  describe("Deposit and Withdrawal Flow", function () {
    let testLendingStrategy;
    
    before(async function () {
      // Deploy a new lending strategy for testing
      const tx = await masterFactory.deployLendingStrategy(
        "Test Lending",
        "Test Protocol",
        mockToken.address,
        owner.address, // Mock lending pool address
        1000 // 10% initial APY (in basis points)
      );
      
      const receipt = await tx.wait();
      // Get the deployed strategy address from the transaction return value
      const lendingFactory = await ethers.getContractAt("LendingStrategyFactory", await masterFactory.lendingFactory());
      const strategies = await lendingFactory.getAllLendingStrategies();
      testLendingStrategy = strategies[strategies.length - 1]; // Get the last deployed strategy
      
      // Register the strategy in YieldAggregator
      await yieldAggregator.addStrategy(testLendingStrategy, "lending");
      
      // Map the asset to the strategy
      await yieldAggregator.mapAssetToStrategy(mockToken.address, testLendingStrategy);
    });
    
    it("Should allow deposits into strategy", async function () {
      const depositAmount = ethers.utils.parseEther("100");
      
      // Approve tokens for YieldAggregator
      await mockToken.connect(user1).approve(yieldAggregator.address, depositAmount);
      
      // Deposit tokens
      await yieldAggregator.connect(user1).deposit(
        testLendingStrategy,
        mockToken.address,
        depositAmount
      );
      
      // Check user's deposited amount
      const userBalance = await yieldAggregator.userBalances(user1.address, mockToken.address);
      expect(userBalance).to.equal(depositAmount);
    });
    
    it("Should allow withdrawals from strategy", async function () {
      const withdrawAmount = ethers.utils.parseEther("50");
      
      // Get initial balance
      const initialBalance = await mockToken.balanceOf(user1.address);
      
      // Withdraw tokens
      await yieldAggregator.connect(user1).withdraw(
        testLendingStrategy,
        mockToken.address,
        withdrawAmount
      );
      
      // Calculate expected amount (minus fee)
      const platformFee = await yieldAggregator.platformFee();
      const expectedFee = withdrawAmount.mul(platformFee).div(10000);
      const expectedAmount = withdrawAmount.sub(expectedFee);
      
      // Check user's new balance
      const newBalance = await mockToken.balanceOf(user1.address);
      expect(newBalance.sub(initialBalance)).to.equal(expectedAmount);
      
      // Check user's remaining deposited amount
      const remainingDeposit = ethers.utils.parseEther("50");
      const userAssetBalance = await yieldAggregator.userBalances(user1.address, mockToken.address);
      expect(userAssetBalance).to.equal(remainingDeposit);
    });
  });
  
  describe("Fee Collection and Distribution", function () {
    let feeLendingStrategy;
    
    before(async function () {
      // Deploy a new lending strategy for testing fees
      const tx = await masterFactory.deployLendingStrategy(
        "Fee Test Lending",
        "Fee Test Protocol",
        mockToken.address,
        owner.address, // Mock lending pool address
        1000 // 10% initial APY (in basis points)
      );
      
      const receipt = await tx.wait();
      // Get the deployed strategy address
      const lendingFactory = await ethers.getContractAt("LendingStrategyFactory", await masterFactory.lendingFactory());
      const strategies = await lendingFactory.getAllLendingStrategies();
      feeLendingStrategy = strategies[strategies.length - 1];
      
      // Register the strategy in YieldAggregator
      await yieldAggregator.addStrategy(feeLendingStrategy, "lending");
      
      // Map the asset to the strategy
      await yieldAggregator.mapAssetToStrategy(mockToken.address, feeLendingStrategy);
      
      // Deposit some tokens for testing
      const depositAmount = ethers.utils.parseEther("100");
      await mockToken.connect(user2).approve(yieldAggregator.address, depositAmount);
      await yieldAggregator.connect(user2).deposit(
        feeLendingStrategy,
        mockToken.address,
        depositAmount
      );
    });
    
    it("Should collect fees on withdrawals", async function () {
      // Set platform fee to 1% (100 basis points)
      await yieldAggregator.updatePlatformFee(100);
      
      const withdrawAmount = ethers.utils.parseEther("50");
      const expectedFee = withdrawAmount.mul(100).div(10000); // 1% fee
      
      // Get initial fee collector balance
      const feeCollector = await yieldAggregator.feeCollector();
      const initialFeeBalance = await mockToken.balanceOf(feeCollector);
      
      // Withdraw tokens
      await yieldAggregator.connect(user2).withdraw(
        feeLendingStrategy,
        mockToken.address,
        withdrawAmount
      );
      
      // Check fee collector's new balance
      const newFeeBalance = await mockToken.balanceOf(feeCollector);
      expect(newFeeBalance.sub(initialFeeBalance)).to.equal(expectedFee);
    });
  });
  
  describe("Emergency Functions", function () {
    it("Should pause all factories", async function () {
      await masterFactory.pauseAllFactories();
      
      // Verify all factories are paused
      const lendingFactory = await ethers.getContractAt("LendingStrategyFactory", await masterFactory.lendingFactory());
      const farmingFactory = await ethers.getContractAt("FarmingStrategyFactory", await masterFactory.farmingFactory());
      const liquidityFactory = await ethers.getContractAt("LiquidityStrategyFactory", await masterFactory.liquidityFactory());
      
      expect(await lendingFactory.paused()).to.be.true;
      expect(await farmingFactory.paused()).to.be.true;
      expect(await liquidityFactory.paused()).to.be.true;
    });
    
    it("Should not allow strategy deployment when paused", async function () {
      await expect(
        masterFactory.deployLendingStrategy(
          "Paused Test",
          "Test Protocol",
          mockToken.address,
          owner.address, // Mock lending pool address
          1000 // 10% initial APY (in basis points)
        )
      ).to.be.revertedWith("BaseStrategyFactory: paused");
    });
    
    it("Should unpause all factories", async function () {
      await masterFactory.unpauseAllFactories();
      
      // Verify all factories are unpaused
      const lendingFactory = await ethers.getContractAt("LendingStrategyFactory", await masterFactory.lendingFactory());
      const farmingFactory = await ethers.getContractAt("FarmingStrategyFactory", await masterFactory.farmingFactory());
      const liquidityFactory = await ethers.getContractAt("LiquidityStrategyFactory", await masterFactory.liquidityFactory());
      
      expect(await lendingFactory.paused()).to.be.false;
      expect(await farmingFactory.paused()).to.be.false;
      expect(await liquidityFactory.paused()).to.be.false;
    });
  });
});
