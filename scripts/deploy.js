const { ethers, network, run } = require("hardhat");

/**
 * Deploy script for OrbitYield contracts to Westend Asset Hub Parachain
 */
async function main() {
  console.log(`Deploying contracts to ${network.name}...`);

  // Get the signers
  const [deployer, signer1, signer2] = await ethers.getSigners();
  console.log(`Deploying with the account: ${deployer.address}`);
  
  // Display account balance
  const balance = await deployer.getBalance();
  console.log(`Account balance: ${ethers.utils.formatEther(balance)}`);
  
  // Owners for the MultiSigWallet
  let multisigOwners = [deployer.address];
  
  // If we're not in a test network, add additional signers
  if (network.name !== "hardhat" && network.name !== "localhost") {
    // In a real deployment, these would be the actual owners' addresses
    // For testing purposes, we're using additional signers from Hardhat
    if (signer1 && signer2) {
      multisigOwners.push(signer1.address, signer2.address);
    }
  } else {
    // For test networks, use the additional Hardhat signers
    multisigOwners.push(signer1.address, signer2.address);
  }

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
  
  // Deploy MultiSigWallet
  console.log("Deploying MultiSigWallet...");
  const MultiSigWallet = await ethers.getContractFactory("MultiSigWallet");
  // Required confirmations: 2 out of 3 owners (majority rule)
  const requiredConfirmations = Math.ceil(multisigOwners.length / 2);
  const multiSigWallet = await MultiSigWallet.deploy(
    multisigOwners,
    requiredConfirmations,
    yieldAggregator.address
  );
  await multiSigWallet.deployed();
  console.log(`MultiSigWallet deployed to: ${multiSigWallet.address}`);
  console.log(`MultiSigWallet owners: ${multisigOwners.join(", ")}`);
  console.log(`Required confirmations: ${requiredConfirmations}`);

  // Add strategy to aggregator
  console.log("Configuring YieldAggregator...");
  const addStrategyTx = await yieldAggregator.addStrategy(lendingStrategy.address, "lending");
  await addStrategyTx.wait();
  console.log(`Added LendingStrategy to YieldAggregator`);

  // Add LendingStrategy as an approved aggregator
  const approveAggregatorTx = await lendingStrategy.addApprovedAggregator(yieldAggregator.address);
  await approveAggregatorTx.wait();
  console.log(`Added YieldAggregator as approved for LendingStrategy`);
  
  // Set MultiSigWallet in YieldAggregator
  const setMultiSigTx = await yieldAggregator.setMultiSigWallet(multiSigWallet.address);
  await setMultiSigTx.wait();
  console.log(`Set MultiSigWallet in YieldAggregator`);

  // Set fee collector if not on a test network
  if (network.name !== "hardhat" && network.name !== "localhost") {
    const feeCollectorTx = await yieldAggregator.updateFeeCollector(deployer.address);
    await feeCollectorTx.wait();
    console.log(`Set fee collector to deployer address`);
    
    // Set emergency admin to a multi-sig owner
    if (multisigOwners.length > 1) {
      const emergencyAdminTx = await yieldAggregator.updateEmergencyAdmin(multisigOwners[1]);
      await emergencyAdminTx.wait();
      console.log(`Set emergency admin to: ${multisigOwners[1]}`);
    }
  }

  // Verify contracts on Westend Asset Hub Parachain if not on a local network
  if (network.name !== "hardhat" && network.name !== "localhost") {
    console.log("Verifying contracts on Westend Asset Hub...");
    
    try {
      // Verify YieldAggregator
      console.log("Verifying YieldAggregator...");
      await run("verify:verify", {
        address: yieldAggregator.address,
        constructorArguments: []
      });
      
      // Verify LendingStrategy
      console.log("Verifying LendingStrategy...");
      await run("verify:verify", {
        address: lendingStrategy.address,
        constructorArguments: [deployer.address]
      });
      
      // Verify MultiSigWallet
      console.log("Verifying MultiSigWallet...");
      await run("verify:verify", {
        address: multiSigWallet.address,
        constructorArguments: [
          multisigOwners,
          requiredConfirmations,
          yieldAggregator.address
        ]
      });
      
      console.log("Contract verification complete");
    } catch (error) {
      console.error("Error verifying contracts:", error.message);
    }
  }

  // Output deployment summary
  console.log("\nDeployment Summary:");
  console.log("====================");
  console.log(`Network: ${network.name}`);
  console.log(`YieldAggregator: ${yieldAggregator.address}`);
  console.log(`LendingStrategy: ${lendingStrategy.address}`);
  console.log(`MultiSigWallet: ${multiSigWallet.address}`);
  console.log(`Emergency Admin: ${await yieldAggregator.emergencyAdmin()}`);
  console.log("====================");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
