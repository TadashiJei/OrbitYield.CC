const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Basic Emergency Features", function () {
  let YieldAggregator;
  let yieldAggregator;
  let owner;
  let emergencyAdmin;
  let user;

  before(async function () {
    // Get the signers
    [owner, emergencyAdmin, user] = await ethers.getSigners();
    
    console.log("Deploying YieldAggregator...");
    // Deploy YieldAggregator
    YieldAggregator = await ethers.getContractFactory("YieldAggregator");
    yieldAggregator = await YieldAggregator.deploy();
    
    console.log("Setting owner in constructor...");
    // The owner is set in the constructor
    console.log("Owner address:", owner.address);
  });

  it("Should set the deployer as the owner", async function () {
    const contractOwner = await yieldAggregator.owner();
    console.log("Contract owner:", contractOwner);
    expect(contractOwner).to.equal(owner.address);
  });

  it("Should allow setting the emergency admin", async function () {
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
