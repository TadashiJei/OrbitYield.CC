const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("StrategyFactory Minimal Test", function () {
  let StrategyFactory;
  let YieldAggregator;
  let MultiSigWallet;
  let strategyFactory;
  let yieldAggregator;
  let multiSigWallet;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    // Get the signers
    [owner, addr1, addr2] = await ethers.getSigners();
    
    console.log("Owner address:", owner.address);
    
    // Deploy YieldAggregator
    console.log("Deploying YieldAggregator...");
    YieldAggregator = await ethers.getContractFactory("YieldAggregator");
    yieldAggregator = await YieldAggregator.deploy();
    await yieldAggregator.deployed();
    console.log("YieldAggregator deployed at:", yieldAggregator.address);
    
    // Deploy MultiSigWallet with minimal setup
    console.log("Deploying MultiSigWallet...");
    MultiSigWallet = await ethers.getContractFactory("MultiSigWallet");
    multiSigWallet = await MultiSigWallet.deploy(
      [owner.address, addr1.address], // Just two owners
      1, // Single confirmation required (simplify testing)
      yieldAggregator.address
    );
    await multiSigWallet.deployed();
    console.log("MultiSigWallet deployed at:", multiSigWallet.address);
  });

  it("Should deploy StrategyFactory successfully", async function () {
    // Deploy StrategyFactory
    console.log("Deploying StrategyFactory...");
    StrategyFactory = await ethers.getContractFactory("StrategyFactory");
    strategyFactory = await StrategyFactory.deploy(yieldAggregator.address, multiSigWallet.address);
    await strategyFactory.deployed();
    console.log("StrategyFactory deployed at:", strategyFactory.address);
    
    // Verify basic properties
    expect(await strategyFactory.owner()).to.equal(owner.address);
    expect(await strategyFactory.aggregator()).to.equal(yieldAggregator.address);
    expect(await strategyFactory.multiSigWallet()).to.equal(multiSigWallet.address);
  });
});
