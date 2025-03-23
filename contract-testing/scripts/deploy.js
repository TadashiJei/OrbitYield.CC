const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying contracts to local network...");

  // Get the signers
  const [deployer, signer1, signer2] = await ethers.getSigners();
  console.log(`Deploying with the account: ${deployer.address}`);
  
  // Display account balance
  const balance = await deployer.getBalance();
  console.log(`Account balance: ${ethers.utils.formatEther(balance)}`);
  
  // Owners for the MultiSigWallet
  const multisigOwners = [deployer.address, signer1.address, signer2.address];

  // Deploy YieldAggregator
  console.log("Deploying YieldAggregator...");
  const YieldAggregator = await ethers.getContractFactory("YieldAggregator");
  const yieldAggregator = await YieldAggregator.deploy();
  await yieldAggregator.deployed();
  console.log(`YieldAggregator deployed to: ${yieldAggregator.address}`);

  // Deploy LendingStrategy
  console.log("Deploying LendingStrategy...");
  const LendingStrategy = await ethers.getContractFactory("LendingStrategy");
  const lendingStrategy = await LendingStrategy.deploy(deployer.address);
  await lendingStrategy.deployed();
  console.log(`LendingStrategy deployed to: ${lendingStrategy.address}`);
  
  // Deploy FarmingStrategy (mock)
  console.log("Deploying FarmingStrategy...");
  const FarmingStrategy = await ethers.getContractFactory("FarmingStrategy");
  const farmingStrategy = await FarmingStrategy.deploy(deployer.address);
  await farmingStrategy.deployed();
  console.log(`FarmingStrategy deployed to: ${farmingStrategy.address}`);
  
  // Deploy MultiSigWallet
  console.log("Deploying MultiSigWallet...");
  const MultiSigWallet = await ethers.getContractFactory("MultiSigWallet");
  // Required confirmations: 2 out of 3 owners (majority rule)
  const requiredConfirmations = 2;
  const multiSigWallet = await MultiSigWallet.deploy(
    multisigOwners,
    requiredConfirmations,
    yieldAggregator.address
  );
  await multiSigWallet.deployed();
  console.log(`MultiSigWallet deployed to: ${multiSigWallet.address}`);
  console.log(`MultiSigWallet owners: ${multisigOwners.join(", ")}`);
  console.log(`Required confirmations: ${requiredConfirmations}`);
  
  // Deploy StrategyFactory
  console.log("Deploying StrategyFactory...");
  const StrategyFactory = await ethers.getContractFactory("StrategyFactory");
  const strategyFactory = await StrategyFactory.deploy(
    yieldAggregator.address,
    multiSigWallet.address
  );
  await strategyFactory.deployed();
  console.log(`StrategyFactory deployed to: ${strategyFactory.address}`);

  // Add strategy to aggregator
  console.log("Configuring YieldAggregator...");
  const addStrategyTx = await yieldAggregator.addStrategy(lendingStrategy.address, "lending");
  await addStrategyTx.wait();
  console.log(`Added LendingStrategy to YieldAggregator`);
  
  const addFarmingStrategyTx = await yieldAggregator.addStrategy(farmingStrategy.address, "farming");
  await addFarmingStrategyTx.wait();
  console.log(`Added FarmingStrategy to YieldAggregator`);

  // Add strategies as approved aggregators
  const approveAggregatorTx = await lendingStrategy.addApprovedAggregator(yieldAggregator.address);
  await approveAggregatorTx.wait();
  console.log(`Added YieldAggregator as approved for LendingStrategy`);
  
  const approveFarmingTx = await farmingStrategy.addApprovedAggregator(yieldAggregator.address);
  await approveFarmingTx.wait();
  console.log(`Added YieldAggregator as approved for FarmingStrategy`);
  
  // Set MultiSigWallet in YieldAggregator
  const setMultiSigTx = await yieldAggregator.setMultiSigWallet(multiSigWallet.address);
  await setMultiSigTx.wait();
  console.log(`Set MultiSigWallet in YieldAggregator`);

  // Set fee collector
  const feeCollectorTx = await yieldAggregator.updateFeeCollector(deployer.address);
  await feeCollectorTx.wait();
  console.log(`Set fee collector to deployer address`);
  
  // Add supported assets (using mock ERC20 tokens for testing)
  console.log("Deploying Mock Tokens...");
  const ERC20Mock = await ethers.getContractFactory("ERC20Mock");
  const mockToken = await ERC20Mock.deploy("Mock Token", "MTK", deployer.address, ethers.utils.parseEther("1000000"));
  await mockToken.deployed();
  console.log(`Mock Token deployed to: ${mockToken.address}`);
  
  // Add supported asset
  const addAssetTx = await yieldAggregator.addSupportedAsset(mockToken.address);
  await addAssetTx.wait();
  console.log(`Added Mock Token as supported asset`);
  
  // Map asset to strategies
  const mapAssetTx1 = await yieldAggregator.mapAssetToStrategy(mockToken.address, lendingStrategy.address);
  await mapAssetTx1.wait();
  console.log(`Mapped Mock Token to LendingStrategy`);
  
  const mapAssetTx2 = await yieldAggregator.mapAssetToStrategy(mockToken.address, farmingStrategy.address);
  await mapAssetTx2.wait();
  console.log(`Mapped Mock Token to FarmingStrategy`);

  console.log("===========================================");
  console.log(`YieldAggregator: ${yieldAggregator.address}`);
  console.log(`LendingStrategy: ${lendingStrategy.address}`);
  console.log(`FarmingStrategy: ${farmingStrategy.address}`);
  console.log(`MultiSigWallet: ${multiSigWallet.address}`);
  console.log(`StrategyFactory: ${strategyFactory.address}`);
  console.log(`Mock Token: ${mockToken.address}`);
  console.log(`Emergency Admin: ${await yieldAggregator.emergencyAdmin()}`);
  console.log("===========================================");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
