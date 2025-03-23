const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Only StrategyFactory Deployment", function () {
  let StrategyFactory;
  let YieldAggregator;
  let MultiSigWallet;
  let yieldAggregator;
  let multiSigWallet;
  let owner;
  let addr1;
  
  before(async function () {
    [owner, addr1] = await ethers.getSigners();
    console.log("Owner address:", owner.address);
    
    // Deploy YieldAggregator first
    console.log("Deploying YieldAggregator...");
    YieldAggregator = await ethers.getContractFactory("YieldAggregator");
    yieldAggregator = await YieldAggregator.deploy();
    await yieldAggregator.deployed();
    console.log("YieldAggregator deployed at:", yieldAggregator.address);
    
    // Deploy MultiSigWallet
    console.log("Deploying MultiSigWallet...");
    MultiSigWallet = await ethers.getContractFactory("MultiSigWallet");
    const owners = [owner.address, addr1.address];
    const requiredConfirmations = 1;
    multiSigWallet = await MultiSigWallet.deploy(owners, requiredConfirmations, yieldAggregator.address);
    await multiSigWallet.deployed();
    console.log("MultiSigWallet deployed at:", multiSigWallet.address);
  });
  
  it("Should deploy StrategyFactory with very detailed error logging", async function () {
    try {
      console.log("Getting StrategyFactory contract factory...");
      StrategyFactory = await ethers.getContractFactory("StrategyFactory");
      console.log("StrategyFactory factory created successfully.");
      
      console.log("Starting StrategyFactory deployment...");
      console.log("Aggregator address:", yieldAggregator.address);
      console.log("MultiSigWallet address:", multiSigWallet.address);
      
      const strategyFactory = await StrategyFactory.deploy(yieldAggregator.address, multiSigWallet.address);
      console.log("StrategyFactory deployment transaction submitted, waiting for confirmation...");
      
      await strategyFactory.deployed();
      console.log("StrategyFactory deployed at:", strategyFactory.address);
      
      // Basic checks
      expect(await strategyFactory.aggregator()).to.equal(yieldAggregator.address);
      expect(await strategyFactory.multiSigWallet()).to.equal(multiSigWallet.address);
      expect(await strategyFactory.owner()).to.equal(owner.address);
    } catch (error) {
      console.error("StrategyFactory deployment error:");
      if (error.message) console.error("Error message:", error.message);
      if (error.code) console.error("Error code:", error.code);
      if (error.data) console.error("Error data:", error.data);
      if (error.transaction) console.error("Transaction hash:", error.transaction.hash);
      if (error.receipt) console.error("Transaction receipt:", error.receipt);
      throw error;
    }
  });
});
