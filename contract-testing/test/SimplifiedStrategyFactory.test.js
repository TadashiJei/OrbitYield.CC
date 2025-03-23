const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SimplifiedStrategyFactory", function () {
  let SimplifiedStrategyFactory;
  let YieldAggregator;
  let MultiSigWallet;
  let simplifiedFactory;
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
  
  it("Should deploy SimplifiedStrategyFactory", async function () {
    console.log("Deploying SimplifiedStrategyFactory...");
    SimplifiedStrategyFactory = await ethers.getContractFactory("SimplifiedStrategyFactory");
    simplifiedFactory = await SimplifiedStrategyFactory.deploy(yieldAggregator.address, multiSigWallet.address);
    await simplifiedFactory.deployed();
    console.log("SimplifiedStrategyFactory deployed at:", simplifiedFactory.address);
    
    // Basic checks
    expect(await simplifiedFactory.aggregator()).to.equal(yieldAggregator.address);
    expect(await simplifiedFactory.multiSigWallet()).to.equal(multiSigWallet.address);
    expect(await simplifiedFactory.owner()).to.equal(owner.address);
  });
  
  it("Should update aggregator address", async function () {
    const newAddress = addr1.address; // Just using a signer address for testing
    await simplifiedFactory.setAggregator(newAddress);
    expect(await simplifiedFactory.aggregator()).to.equal(newAddress);
  });
  
  it("Should update multiSigWallet address", async function () {
    const newAddress = addr1.address; // Just using a signer address for testing
    await simplifiedFactory.setMultiSigWallet(newAddress);
    expect(await simplifiedFactory.multiSigWallet()).to.equal(newAddress);
  });
});
