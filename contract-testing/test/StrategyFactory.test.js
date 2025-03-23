const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("StrategyFactory", function () {
  let StrategyFactory;
  let YieldAggregator;
  let MultiSigWallet;
  let strategyFactory;
  let yieldAggregator;
  let multiSigWallet;
  let deployer;
  let addr1;
  let addr2;
  let addr3;
  let addrs;

  beforeEach(async function () {
    try {
      // Get the signers
      [deployer, addr1, addr2, addr3, ...addrs] = await ethers.getSigners();
      
      console.log("Deploying YieldAggregator...");
      // Deploy YieldAggregator first
      YieldAggregator = await ethers.getContractFactory("YieldAggregator");
      yieldAggregator = await YieldAggregator.deploy();
      await yieldAggregator.deployed();
      console.log("YieldAggregator deployed to:", yieldAggregator.address);
      
      console.log("Deploying MultiSigWallet...");
      // Deploy MultiSigWallet
      MultiSigWallet = await ethers.getContractFactory("MultiSigWallet");
      multiSigWallet = await MultiSigWallet.deploy(
        [deployer.address, addr1.address, addr2.address],
        2, // 2 out of 3 confirmations required
        yieldAggregator.address
      );
      await multiSigWallet.deployed();
      console.log("MultiSigWallet deployed to:", multiSigWallet.address);
      
      console.log("Deploying StrategyFactory...");
      // Deploy StrategyFactory
      StrategyFactory = await ethers.getContractFactory("StrategyFactory");
      strategyFactory = await StrategyFactory.deploy(
        yieldAggregator.address,
        multiSigWallet.address
      );
      await strategyFactory.deployed();
      console.log("StrategyFactory deployed to:", strategyFactory.address);
    } catch (error) {
      console.error("Deployment error:", error.message);
      if (error.data) {
        console.error("Error data:", error.data);
      }
      throw error;
    }
  });

  describe("Deployment", function () {
    it("Should set the right aggregator", async function () {
      expect(await strategyFactory.aggregator()).to.equal(yieldAggregator.address);
    });

    it("Should set the right multisig wallet", async function () {
      expect(await strategyFactory.multiSigWallet()).to.equal(multiSigWallet.address);
    });

    it("Should set the right owner", async function () {
      expect(await strategyFactory.owner()).to.equal(deployer.address);
    });
  });

  describe("Strategy Deployment", function () {
    it("Should deploy a lending strategy correctly", async function () {
      const tx = await strategyFactory.deployLendingStrategy("Test Lending", "Test Protocol");
      const receipt = await tx.wait();
      
      // Find the StrategyDeployed event
      const event = receipt.events.find(e => e.event === 'StrategyDeployed');
      expect(event).to.not.be.undefined;
      
      const strategyAddress = event.args.strategy;
      expect(strategyAddress).to.not.equal(ethers.constants.AddressZero);
      
      // Check that strategy was added to the registry
      const strategies = await strategyFactory.getDeployedStrategies(0); // 0 = LENDING
      expect(strategies).to.include(strategyAddress);
    });

    it("Should deploy a farming strategy correctly", async function () {
      const tx = await strategyFactory.deployFarmingStrategy("Test Farming", "Test Protocol");
      const receipt = await tx.wait();
      
      const event = receipt.events.find(e => e.event === 'StrategyDeployed');
      const strategyAddress = event.args.strategy;
      
      const strategies = await strategyFactory.getDeployedStrategies(1); // 1 = FARMING
      expect(strategies).to.include(strategyAddress);
    });

    it("Should deploy a liquidity strategy correctly", async function () {
      const tx = await strategyFactory.deployLiquidityStrategy("Test Liquidity", "Test Protocol");
      const receipt = await tx.wait();
      
      const event = receipt.events.find(e => e.event === 'StrategyDeployed');
      const strategyAddress = event.args.strategy;
      
      const strategies = await strategyFactory.getDeployedStrategies(2); // 2 = LIQUIDITY
      expect(strategies).to.include(strategyAddress);
    });
  });

  describe("Batch Deployment", function () {
    it("Should batch deploy multiple strategies", async function () {
      const names = ["Strategy 1", "Strategy 2", "Strategy 3"];
      const protocols = ["Protocol 1", "Protocol 2", "Protocol 3"];
      
      // Deploy batch of lending strategies
      const tx = await strategyFactory.batchDeployStrategies(
        0, // LENDING type
        names,
        protocols
      );
      
      const receipt = await tx.wait();
      
      // Find all StrategyDeployed events
      const deployEvents = receipt.events.filter(e => e && e.event === 'StrategyDeployed');
      expect(deployEvents.length).to.equal(3);
      
      // Verify batch start and complete events
      const startEvent = receipt.events.find(e => e && e.event === 'BatchDeploymentStarted');
      const completeEvent = receipt.events.find(e => e && e.event === 'BatchDeploymentCompleted');
      
      expect(startEvent).to.not.be.undefined;
      expect(completeEvent).to.not.be.undefined;
      expect(startEvent.args.count).to.equal(3);
      expect(completeEvent.args.count).to.equal(3);
      
      // Check the strategies were added to the registry
      const strategies = await strategyFactory.getDeployedStrategies(0);
      expect(strategies.length).to.equal(3);
    });
  });

  describe("Strategy Registration", function () {
    it("Should register an external strategy", async function () {
      // Deploy a strategy manually first
      const LendingStrategy = await ethers.getContractFactory("LendingStrategy");
      const externalStrategy = await LendingStrategy.deploy(yieldAggregator.address);
      await externalStrategy.deployed();
      
      // Register the strategy
      const tx = await strategyFactory.registerStrategy(
        externalStrategy.address,
        0, // LENDING type
        "External Strategy"
      );
      
      const receipt = await tx.wait();
      
      // Check for the registration event
      const event = receipt.events.find(e => e.event === 'StrategyRegistered');
      expect(event).to.not.be.undefined;
      expect(event.args.strategy).to.equal(externalStrategy.address);
      
      // Check that it's in the registry
      expect(await strategyFactory.registeredStrategies(externalStrategy.address)).to.be.true;
      expect(await strategyFactory.strategyTypes(externalStrategy.address)).to.equal(0);
      expect(await strategyFactory.strategyNames(externalStrategy.address)).to.equal("External Strategy");
    });
  });

  describe("Access Control", function () {
    it("Should allow multisig owners to deploy strategies", async function () {
      // Deploy a strategy as addr1 (a multisig owner)
      const tx = await strategyFactory.connect(addr1).deployLendingStrategy("MultiSig Strategy", "Test Protocol");
      const receipt = await tx.wait();
      
      const event = receipt.events.find(e => e.event === 'StrategyDeployed');
      expect(event).to.not.be.undefined;
    });

    it("Should reject non-authorized users from deploying strategies", async function () {
      // addr3 is not an owner or multisig owner
      await expect(
        strategyFactory.connect(addr3).deployLendingStrategy("Unauthorized Strategy", "Test Protocol")
      ).to.be.revertedWith("StrategyFactory: not authorized");
    });
  });
  
  describe("Utility Functions", function () {
    it("Should return all strategies across types", async function () {
      // Deploy one of each type
      await strategyFactory.deployLendingStrategy("Lending", "Protocol 1");
      await strategyFactory.deployFarmingStrategy("Farming", "Protocol 2");
      await strategyFactory.deployLiquidityStrategy("Liquidity", "Protocol 3");
      
      const allStrategies = await strategyFactory.getAllStrategies();
      expect(allStrategies.length).to.equal(3);
      
      // Check individual type counts
      expect((await strategyFactory.getDeployedStrategies(0)).length).to.equal(1);
      expect((await strategyFactory.getDeployedStrategies(1)).length).to.equal(1);
      expect((await strategyFactory.getDeployedStrategies(2)).length).to.equal(1);
    });
  });
});
