const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Emergency Features", function () {
  let YieldAggregator;
  let LendingStrategy;
  let ERC20Mock;
  let yieldAggregator;
  let lendingStrategy;
  let mockToken;
  let deployer;
  let emergencyAdmin;
  let user1;
  let user2;
  let multiSigWallet;
  
  const depositAmount = ethers.utils.parseEther("10");
  const smallerWithdrawAmount = ethers.utils.parseEther("5");

  beforeEach(async function () {
    // Get the signers
    [deployer, emergencyAdmin, user1, user2, ...addrs] = await ethers.getSigners();
    
    // Deploy YieldAggregator
    YieldAggregator = await ethers.getContractFactory("YieldAggregator");
    yieldAggregator = await YieldAggregator.deploy();
    await yieldAggregator.deployed();
    
    // Set emergency admin
    await yieldAggregator.setEmergencyAdmin(emergencyAdmin.address);
    
    // Deploy MultiSigWallet
    const MultiSigWallet = await ethers.getContractFactory("MultiSigWallet");
    multiSigWallet = await MultiSigWallet.deploy(
      [deployer.address, emergencyAdmin.address, user1.address],
      2, // 2 out of 3 confirmations required
      yieldAggregator.address
    );
    await multiSigWallet.deployed();
    
    // Set MultiSigWallet in YieldAggregator
    await yieldAggregator.setMultiSigWallet(multiSigWallet.address);
    
    // Deploy LendingStrategy
    LendingStrategy = await ethers.getContractFactory("LendingStrategy");
    lendingStrategy = await LendingStrategy.deploy(yieldAggregator.address);
    await lendingStrategy.deployed();
    
    // Add strategy to aggregator
    await yieldAggregator.addStrategy(lendingStrategy.address, "lending");
    
    // Deploy Mock Token
    ERC20Mock = await ethers.getContractFactory("ERC20Mock");
    mockToken = await ERC20Mock.deploy(
      "Mock Token", 
      "MTK", 
      deployer.address, 
      ethers.utils.parseEther("1000000")
    );
    await mockToken.deployed();
    
    // Add supported asset
    await yieldAggregator.addSupportedAsset(mockToken.address);
    
    // Map asset to strategy
    await yieldAggregator.mapAssetToStrategy(mockToken.address, lendingStrategy.address);
    
    // Transfer tokens to users for testing
    await mockToken.transfer(user1.address, depositAmount.mul(10));
    await mockToken.transfer(user2.address, depositAmount.mul(10));
    
    // Approve aggregator to spend tokens
    await mockToken.connect(user1).approve(yieldAggregator.address, depositAmount.mul(10));
    await mockToken.connect(user2).approve(yieldAggregator.address, depositAmount.mul(10));
    
    // Initial deposit to the protocol
    await yieldAggregator.connect(user1).deposit(mockToken.address, depositAmount);
    await yieldAggregator.connect(user2).deposit(mockToken.address, depositAmount);
  });

  describe("Contract Pausing", function () {
    it("Should allow owner to pause the contract", async function () {
      await yieldAggregator.pauseContract();
      expect(await yieldAggregator.paused()).to.be.true;
    });

    it("Should allow emergency admin to pause the contract", async function () {
      await yieldAggregator.connect(emergencyAdmin).pauseContract();
      expect(await yieldAggregator.paused()).to.be.true;
    });

    it("Should allow multisig owner to pause the contract", async function () {
      await yieldAggregator.connect(user1).pauseContract();
      expect(await yieldAggregator.paused()).to.be.true;
    });

    it("Should block deposits when paused", async function () {
      await yieldAggregator.pauseContract();
      
      await expect(
        yieldAggregator.connect(user1).deposit(mockToken.address, depositAmount)
      ).to.be.revertedWith("Pausable: paused");
    });

    it("Should block normal withdrawals when paused", async function () {
      await yieldAggregator.pauseContract();
      
      await expect(
        yieldAggregator.connect(user1).withdraw(mockToken.address, smallerWithdrawAmount)
      ).to.be.revertedWith("Pausable: paused");
    });
  });

  describe("Emergency Withdrawals", function () {
    it("Should allow user emergency withdrawals when paused", async function () {
      // Pause the contract
      await yieldAggregator.pauseContract();
      
      // Get initial balances
      const initialTokenBalance = await mockToken.balanceOf(user1.address);
      const initialUserAggregatorBalance = await yieldAggregator.userBalances(user1.address, mockToken.address);
      
      // Perform emergency withdrawal
      await yieldAggregator.connect(user1).emergencyWithdraw(mockToken.address);
      
      // Check balances after withdrawal
      const finalTokenBalance = await mockToken.balanceOf(user1.address);
      const finalUserAggregatorBalance = await yieldAggregator.userBalances(user1.address, mockToken.address);
      
      // Verify withdrawal was successful
      expect(finalTokenBalance).to.be.gt(initialTokenBalance);
      expect(finalUserAggregatorBalance).to.equal(0);
      expect(finalTokenBalance.sub(initialTokenBalance)).to.equal(initialUserAggregatorBalance);
    });

    it("Should not allow emergency withdrawals when not paused", async function () {
      await expect(
        yieldAggregator.connect(user1).emergencyWithdraw(mockToken.address)
      ).to.be.revertedWith("YieldAggregator: not paused");
    });
  });

  describe("Admin Emergency Strategy Withdrawal", function () {
    it("Should allow admin to withdraw from a strategy in emergency", async function () {
      // Get initial balances
      const initialAggregatorBalance = await mockToken.balanceOf(yieldAggregator.address);
      
      // Simulate strategy having funds (transfer to strategy first)
      await mockToken.transfer(lendingStrategy.address, depositAmount);
      
      // Admin emergency withdrawal from strategy
      await yieldAggregator.adminEmergencyWithdrawFromStrategy(
        lendingStrategy.address, 
        mockToken.address,
        depositAmount
      );
      
      // Check balance after withdrawal
      const finalAggregatorBalance = await mockToken.balanceOf(yieldAggregator.address);
      
      // Verify funds were withdrawn to the aggregator
      expect(finalAggregatorBalance).to.be.gt(initialAggregatorBalance);
      expect(finalAggregatorBalance.sub(initialAggregatorBalance)).to.equal(depositAmount);
    });

    it("Should only allow authorized users to perform admin emergency withdrawals", async function () {
      await expect(
        yieldAggregator.connect(user2).adminEmergencyWithdrawFromStrategy(
          lendingStrategy.address, 
          mockToken.address,
          depositAmount
        )
      ).to.be.revertedWith("YieldAggregator: not authorized");
    });
  });

  describe("MultiSig Integration", function () {
    it("Should require multisig consensus for critical operations", async function () {
      // Create a transaction to change fee
      const newFee = 500; // 5%
      const updateFeeTx = await multiSigWallet.connect(deployer).submitTransaction(
        yieldAggregator.address,
        0,
        yieldAggregator.interface.encodeFunctionData("setFee", [newFee])
      );
      
      const txReceipt = await updateFeeTx.wait();
      const txIndex = txReceipt.events.find(e => e.event === 'SubmitTransaction').args.txIndex;
      
      // Get fee before confirmation
      const feeBefore = await yieldAggregator.fee();
      
      // One confirmation is not enough
      await multiSigWallet.connect(deployer).confirmTransaction(txIndex);
      
      // Fee shouldn't change yet
      expect(await yieldAggregator.fee()).to.equal(feeBefore);
      
      // Second confirmation should execute the transaction
      await multiSigWallet.connect(emergencyAdmin).confirmTransaction(txIndex);
      
      // Fee should now be updated
      expect(await yieldAggregator.fee()).to.equal(newFee);
    });
  });
  
  describe("Unpausing", function () {
    it("Should allow unpausing the contract after emergency", async function () {
      // Pause the contract
      await yieldAggregator.pauseContract();
      expect(await yieldAggregator.paused()).to.be.true;
      
      // Unpause the contract
      await yieldAggregator.unpauseContract();
      expect(await yieldAggregator.paused()).to.be.false;
      
      // Verify normal operations resume
      await yieldAggregator.connect(user1).deposit(mockToken.address, depositAmount);
      
      // Check balances
      const userBalance = await yieldAggregator.userBalances(user1.address, mockToken.address);
      expect(userBalance).to.equal(depositAmount.mul(2)); // Initial deposit + new deposit
    });
  });
});
