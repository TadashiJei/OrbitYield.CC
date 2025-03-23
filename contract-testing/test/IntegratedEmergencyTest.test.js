const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Integrated Emergency Tests", function () {
  let YieldAggregator;
  let SimplifiedStrategyFactory;
  let MultiSigWallet;
  let LendingStrategy;
  
  let yieldAggregator;
  let simplifiedFactory;
  let multiSigWallet;
  let lendingStrategy;
  
  let owner;
  let emergencyAdmin;
  let user;
  let addr3;
  
  before(async function () {
    [owner, emergencyAdmin, user, addr3] = await ethers.getSigners();
    
    console.log("Setting up contracts for integrated testing...");
    console.log("Owner address:", owner.address);
    console.log("Emergency Admin address:", emergencyAdmin.address);
    
    // Deploy YieldAggregator
    console.log("Deploying YieldAggregator...");
    YieldAggregator = await ethers.getContractFactory("YieldAggregator");
    yieldAggregator = await YieldAggregator.deploy();
    await yieldAggregator.deployed();
    console.log("YieldAggregator deployed at:", yieldAggregator.address);
    
    // Deploy MultiSigWallet
    console.log("Deploying MultiSigWallet...");
    MultiSigWallet = await ethers.getContractFactory("MultiSigWallet");
    const owners = [owner.address, emergencyAdmin.address];
    const requiredConfirmations = 1;
    multiSigWallet = await MultiSigWallet.deploy(owners, requiredConfirmations, yieldAggregator.address);
    await multiSigWallet.deployed();
    console.log("MultiSigWallet deployed at:", multiSigWallet.address);
    
    // Deploy SimplifiedStrategyFactory
    console.log("Deploying SimplifiedStrategyFactory...");
    SimplifiedStrategyFactory = await ethers.getContractFactory("SimplifiedStrategyFactory");
    simplifiedFactory = await SimplifiedStrategyFactory.deploy(yieldAggregator.address, multiSigWallet.address);
    await simplifiedFactory.deployed();
    console.log("SimplifiedStrategyFactory deployed at:", simplifiedFactory.address);
    
    // Deploy a LendingStrategy directly for testing
    LendingStrategy = await ethers.getContractFactory("LendingStrategy");
    lendingStrategy = await LendingStrategy.deploy(yieldAggregator.address);
    await lendingStrategy.deployed();
    console.log("LendingStrategy deployed at:", lendingStrategy.address);
  });
  
  describe("YieldAggregator Emergency Functions", function () {
    it("Should update the emergency admin", async function () {
      // Since the deployer (owner) is the one running the test, we can call updateEmergencyAdmin directly
      await yieldAggregator.updateEmergencyAdmin(emergencyAdmin.address);
      expect(await yieldAggregator.emergencyAdmin()).to.equal(emergencyAdmin.address);
    });
    
    it("Should allow emergency admin to pause the contract", async function () {
      await yieldAggregator.connect(emergencyAdmin).pauseContract();
      expect(await yieldAggregator.paused()).to.equal(true);
    });
    
    it("Should allow emergency admin to unpause the contract", async function () {
      await yieldAggregator.connect(emergencyAdmin).unpauseContract();
      expect(await yieldAggregator.paused()).to.equal(false);
    });
    
    it("Should not allow non-emergency admin to pause the contract", async function () {
      await expect(
        yieldAggregator.connect(user).pauseContract()
      ).to.be.revertedWith("YieldAggregator: not authorized");
    });
  });
  
  describe("Emergency Scenario Testing", function () {
    it("Should handle emergency scenario - pause, update factory, unpause", async function () {
      // Step 1: Emergency admin pauses the contract
      await yieldAggregator.connect(emergencyAdmin).pauseContract();
      expect(await yieldAggregator.paused()).to.equal(true);
      console.log("Contract paused by emergency admin");
      
      // Step 2: Owner updates the factory aggregator address
      const newAddress = addr3.address; // Just a test address
      await simplifiedFactory.setAggregator(newAddress);
      expect(await simplifiedFactory.aggregator()).to.equal(newAddress);
      console.log("Factory aggregator address updated during emergency");
      
      // Step 3: Emergency admin unpauses the contract after fix
      await yieldAggregator.connect(emergencyAdmin).unpauseContract();
      expect(await yieldAggregator.paused()).to.equal(false);
      console.log("Contract unpaused by emergency admin after fixes");
      
      // Step 4: Reset factory for other tests
      await simplifiedFactory.setAggregator(yieldAggregator.address);
    });
  });
  
  describe("MultiSigWallet and Emergency Admin Interaction", function () {
    it("Should recognize both multisig and emergency admin authority", async function () {
      // Set up multisig in YieldAggregator
      await yieldAggregator.setMultiSigWallet(multiSigWallet.address);
      expect(await yieldAggregator.multiSigWallet()).to.equal(multiSigWallet.address);
      
      // Test that the emergency admin can still pause
      await yieldAggregator.connect(emergencyAdmin).pauseContract();
      expect(await yieldAggregator.paused()).to.equal(true);
      
      // Unpause using owner to test another authority
      await yieldAggregator.connect(owner).unpauseContract();
      expect(await yieldAggregator.paused()).to.equal(false);
    });
  });
});
