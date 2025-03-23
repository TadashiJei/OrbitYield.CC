const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("StrategyFactory Specific Tests", function () {
  let StrategyFactory;
  let YieldAggregator;
  let MultiSigWallet;
  let strategyFactory;
  let yieldAggregator;
  let multiSigWallet;
  let owner;
  let addr1;
  let addr2;

  // Enum values for strategy types
  const LENDING = 0;
  const FARMING = 1;
  const LIQUIDITY = 2;

  before(async function () {
    // Get the signers
    [owner, addr1, addr2] = await ethers.getSigners();
    
    console.log("Setting up contracts for testing...");
    console.log("Owner address:", owner.address);
    
    try {
      // Deploy YieldAggregator
      console.log("Deploying YieldAggregator...");
      YieldAggregator = await ethers.getContractFactory("YieldAggregator");
      yieldAggregator = await YieldAggregator.deploy();
      await yieldAggregator.deployed();
      console.log("YieldAggregator deployed at:", yieldAggregator.address);
      
      // Deploy MultiSigWallet
      console.log("Deploying MultiSigWallet...");
      MultiSigWallet = await ethers.getContractFactory("MultiSigWallet");
      const owners = [owner.address, addr1.address, addr2.address];
      const requiredConfirmations = 2;
      multiSigWallet = await MultiSigWallet.deploy(owners, requiredConfirmations, yieldAggregator.address);
      await multiSigWallet.deployed();
      console.log("MultiSigWallet deployed at:", multiSigWallet.address);
      
      // Deploy StrategyFactory - using owner account
      console.log("Deploying StrategyFactory...");
      StrategyFactory = await ethers.getContractFactory("StrategyFactory");
      strategyFactory = await StrategyFactory.deploy(yieldAggregator.address, multiSigWallet.address);
      await strategyFactory.deployed();
      console.log("StrategyFactory deployed at:", strategyFactory.address);
      console.log("StrategyFactory owner:", await strategyFactory.owner());
      
      // Set StrategyFactory in YieldAggregator
      console.log("Setting up YieldAggregator with StrategyFactory...");
      // This step might be needed depending on your contract logic
      
    } catch (error) {
      console.error("Setup error:", error);
      throw error;
    }
  });

  describe("Basic Functionality", function () {
    it("Should correctly set the aggregator address", async function () {
      expect(await strategyFactory.aggregator()).to.equal(yieldAggregator.address);
    });

    it("Should correctly set the multiSigWallet address", async function () {
      expect(await strategyFactory.multiSigWallet()).to.equal(multiSigWallet.address);
    });
  });

  describe("Strategy Deployment", function () {
    it("Should deploy a lending strategy", async function () {
      const strategyName = "Test Lending Strategy";
      const protocol = "Test Protocol";
      
      const tx = await strategyFactory.deployLendingStrategy(strategyName, protocol);
      const receipt = await tx.wait();
      
      // Find the StrategyDeployed event
      const event = receipt.events.find(e => e.event === 'StrategyDeployed');
      expect(event).to.not.be.undefined;
      
      const strategyAddress = event.args.strategy;
      expect(await strategyFactory.registeredStrategies(strategyAddress)).to.be.true;
      expect(await strategyFactory.strategyTypes(strategyAddress)).to.equal(LENDING);
      expect(await strategyFactory.strategyNames(strategyAddress)).to.equal(strategyName);
      
      // Get the list of deployed lending strategies
      const lendingStrategies = await strategyFactory.getStrategiesByType(LENDING);
      expect(lendingStrategies).to.include(strategyAddress);
      
      // Verify the strategy itself
      const LendingStrategy = await ethers.getContractFactory("LendingStrategy");
      const strategy = await LendingStrategy.attach(strategyAddress);
      expect(await strategy.getName()).to.equal(strategyName);
      expect(await strategy.getProtocol()).to.equal(protocol);
    });
    
    it("Should deploy a farming strategy", async function () {
      const strategyName = "Test Farming Strategy";
      const protocol = "Test Protocol";
      
      const tx = await strategyFactory.deployFarmingStrategy(strategyName, protocol);
      const receipt = await tx.wait();
      
      // Find the StrategyDeployed event
      const event = receipt.events.find(e => e.event === 'StrategyDeployed');
      expect(event).to.not.be.undefined;
      
      const strategyAddress = event.args.strategy;
      expect(await strategyFactory.registeredStrategies(strategyAddress)).to.be.true;
      expect(await strategyFactory.strategyTypes(strategyAddress)).to.equal(FARMING);
      expect(await strategyFactory.strategyNames(strategyAddress)).to.equal(strategyName);
      
      // Get the list of deployed farming strategies
      const farmingStrategies = await strategyFactory.getStrategiesByType(FARMING);
      expect(farmingStrategies).to.include(strategyAddress);
      
      // Verify the strategy itself
      const FarmingStrategy = await ethers.getContractFactory("FarmingStrategy");
      const strategy = await FarmingStrategy.attach(strategyAddress);
      expect(await strategy.getName()).to.equal(strategyName);
      expect(await strategy.getProtocol()).to.equal(protocol);
    });
    
    it("Should deploy a liquidity strategy", async function () {
      const strategyName = "Test Liquidity Strategy";
      const protocol = "Test Protocol";
      
      const tx = await strategyFactory.deployLiquidityStrategy(strategyName, protocol);
      const receipt = await tx.wait();
      
      // Find the StrategyDeployed event
      const event = receipt.events.find(e => e.event === 'StrategyDeployed');
      expect(event).to.not.be.undefined;
      
      const strategyAddress = event.args.strategy;
      expect(await strategyFactory.registeredStrategies(strategyAddress)).to.be.true;
      expect(await strategyFactory.strategyTypes(strategyAddress)).to.equal(LIQUIDITY);
      expect(await strategyFactory.strategyNames(strategyAddress)).to.equal(strategyName);
      
      // Get the list of deployed liquidity strategies
      const liquidityStrategies = await strategyFactory.getStrategiesByType(LIQUIDITY);
      expect(liquidityStrategies).to.include(strategyAddress);
      
      // Verify the strategy itself
      const LiquidityStrategy = await ethers.getContractFactory("LiquidityStrategy");
      const strategy = await LiquidityStrategy.attach(strategyAddress);
      expect(await strategy.getName()).to.equal(strategyName);
      expect(await strategy.getProtocol()).to.equal(protocol);
    });
  });

  describe("Batch Deployment", function () {
    it("Should deploy multiple strategies in a batch", async function () {
      const names = ["Batch Strategy 1", "Batch Strategy 2", "Batch Strategy 3"];
      const protocols = ["Batch Protocol 1", "Batch Protocol 2", "Batch Protocol 3"];
      const types = [LENDING, FARMING, LIQUIDITY];
      
      const tx = await strategyFactory.batchDeployStrategies(names, protocols, types);
      const receipt = await tx.wait();
      
      // Check events
      const deployEvents = receipt.events.filter(e => e.event === 'StrategyDeployed');
      expect(deployEvents.length).to.equal(3);
      
      // Check strategies were registered properly
      for (let i = 0; i < deployEvents.length; i++) {
        const strategyAddress = deployEvents[i].args.strategy;
        const strategyType = deployEvents[i].args.strategyType;
        const name = deployEvents[i].args.name;
        
        expect(await strategyFactory.registeredStrategies(strategyAddress)).to.be.true;
        expect(await strategyFactory.strategyTypes(strategyAddress)).to.equal(types[i]);
        expect(await strategyFactory.strategyNames(strategyAddress)).to.equal(names[i]);
        
        // Verify strategy was added to correct type list
        const strategies = await strategyFactory.getStrategiesByType(types[i]);
        expect(strategies).to.include(strategyAddress);
      }
    });
  });

  describe("Admin Functions", function () {
    it("Should update the aggregator address", async function () {
      const newAddress = addr1.address; // Just using a signer address for testing
      await strategyFactory.setAggregator(newAddress);
      expect(await strategyFactory.aggregator()).to.equal(newAddress);
      
      // Restore the original address for other tests
      await strategyFactory.setAggregator(yieldAggregator.address);
    });
    
    it("Should update the multisig wallet address", async function () {
      const newAddress = addr1.address; // Just using a signer address for testing
      await strategyFactory.setMultiSigWallet(newAddress);
      expect(await strategyFactory.multiSigWallet()).to.equal(newAddress);
      
      // Restore the original address for other tests
      await strategyFactory.setMultiSigWallet(multiSigWallet.address);
    });
    
    it("Should not allow non-owners to update addresses", async function () {
      await expect(
        strategyFactory.connect(addr1).setAggregator(addr2.address)
      ).to.be.revertedWith("Ownable: caller is not the owner");
      
      await expect(
        strategyFactory.connect(addr1).setMultiSigWallet(addr2.address)
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });
  });
});
