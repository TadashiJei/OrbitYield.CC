const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Emergency Features", function () {
  let YieldAggregator;
  let yieldAggregator;
  let owner;
  let emergencyAdmin;
  let user;
  let MockERC20;
  let token;

  beforeEach(async function () {
    try {
      // Get the signers
      [owner, emergencyAdmin, user] = await ethers.getSigners();
      
      console.log("Deploying YieldAggregator...");
      // Deploy YieldAggregator
      YieldAggregator = await ethers.getContractFactory("YieldAggregator");
      yieldAggregator = await YieldAggregator.deploy();
      await yieldAggregator.deployed();
      console.log("YieldAggregator deployed to:", yieldAggregator.address);
      
      // Set emergency admin
      await yieldAggregator.setEmergencyAdmin(emergencyAdmin.address);
      
      // Deploy mock token for testing
      MockERC20 = await ethers.getContractFactory("MockERC20");
      token = await MockERC20.deploy("Test Token", "TEST", 18);
      await token.deployed();
      console.log("MockERC20 token deployed to:", token.address);
      
      // Add token as supported asset
      await yieldAggregator.addSupportedAsset(token.address);
      
      // Mint tokens to user
      await token.mint(user.address, ethers.utils.parseEther("1000"));
      
    } catch (error) {
      console.error("Deployment error:", error.message);
      if (error.data) {
        console.error("Error data:", error.data);
      }
      throw error;
    }
  });

  describe("Emergency Admin", function () {
    it("Should correctly set and get emergency admin", async function () {
      expect(await yieldAggregator.emergencyAdmin()).to.equal(emergencyAdmin.address);
    });
  });

  describe("Pausing", function () {
    it("Should allow emergency admin to pause the contract", async function () {
      await yieldAggregator.connect(emergencyAdmin).pause();
      expect(await yieldAggregator.paused()).to.equal(true);
    });

    it("Should allow emergency admin to unpause the contract", async function () {
      await yieldAggregator.connect(emergencyAdmin).pause();
      await yieldAggregator.connect(emergencyAdmin).unpause();
      expect(await yieldAggregator.paused()).to.equal(false);
    });

    it("Should not allow non-emergency admin to pause the contract", async function () {
      await expect(
        yieldAggregator.connect(user).pause()
      ).to.be.revertedWith("YieldAggregator: not emergency admin");
    });
  });

  describe("Emergency Withdrawal", function () {
    it("Should allow emergency admin to withdraw tokens", async function () {
      // First deposit some tokens
      await token.connect(user).approve(yieldAggregator.address, ethers.utils.parseEther("100"));
      await yieldAggregator.connect(user).deposit(token.address, ethers.utils.parseEther("100"));
      
      // Get balance before emergency withdrawal
      const adminBalanceBefore = await token.balanceOf(emergencyAdmin.address);
      
      // Emergency admin withdraws tokens
      await yieldAggregator.connect(emergencyAdmin).emergencyWithdraw(token.address);
      
      // Get balance after emergency withdrawal
      const adminBalanceAfter = await token.balanceOf(emergencyAdmin.address);
      
      // Admin should have received the tokens
      expect(adminBalanceAfter.sub(adminBalanceBefore)).to.equal(ethers.utils.parseEther("100"));
    });
  });
});
