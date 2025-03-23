# OrbitYield Contract Interaction Guide

This guide provides detailed instructions for deploying OrbitYield contracts to the Westend Asset Hub Parachain and interacting with them from a frontend application.

## Table of Contents

1. [Contract Architecture](#contract-architecture)
2. [Deployment Instructions](#deployment-instructions)
3. [Contract Interactions](#contract-interactions)
4. [Frontend Integration](#frontend-integration)
5. [Testing](#testing)

## Contract Architecture

OrbitYield uses a modular architecture consisting of three main components:

- **YieldAggregator**: The main contract that manages user deposits, withdrawals, and directs assets to the appropriate yield strategies based on their APY.
- **YieldStrategies**: Various yield generation strategies (e.g., LendingStrategy) that implement the `IYieldStrategy` interface.
- **MultiSigWallet**: A multi-signature wallet for secure management of critical administrative functions.

### Key Features

- Multi-asset support
- Multiple yield strategies per asset
- Automatic selection of the highest APY strategy
- Fee management system
- Multi-signature governance for critical operations
- Emergency functions for handling unexpected situations
- Role-based access control with owner, emergency admin, and multi-sig wallet roles

## Deployment Instructions

### Prerequisites

1. Node.js (v16+) and npm installed
2. Hardhat development environment set up
3. A wallet with Westend tokens for gas fees

### Configuration

1. Configure Hardhat for Westend Asset Hub in `hardhat.config.js`:

```javascript
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();

module.exports = {
  solidity: "0.8.17",
  networks: {
    westend: {
      url: "https://westend-asset-hub-rpc.polkadot.io", // Replace with actual RPC URL
      accounts: [process.env.PRIVATE_KEY],
      chainId: 1001, // Replace with actual chain ID
    }
  },
  etherscan: {
    apiKey: {
      westend: process.env.ETHERSCAN_API_KEY // For contract verification
    },
    customChains: [
      {
        network: "westend",
        chainId: 1001, // Replace with actual chain ID
        urls: {
          apiURL: "https://westend-asset-hub-api.polkadot.io/api", // Replace with actual API URL
          browserURL: "https://westend-asset-hub.polkadot.io" // Replace with actual explorer URL
        }
      }
    ]
  }
};
```

2. Create a `.env` file with the following variables:

```
PRIVATE_KEY=your_private_key_here
ETHERSCAN_API_KEY=your_etherscan_api_key_here
```

### Deployment Steps

Run the deployment script:

```bash
npx hardhat run scripts/deploy.js --network westend
```

This script will:
1. Deploy the YieldAggregator contract
2. Deploy the LendingStrategy contract
3. Deploy the MultiSigWallet contract with multiple owners
4. Register the strategies with the aggregator
5. Configure the MultiSigWallet in the YieldAggregator
6. Set up the fee collector and emergency admin
7. Verify the contracts on the Westend explorer (if supported)

## Contract Interactions

### YieldAggregator Functions

#### Admin Functions

```solidity
// Adding a new strategy
function addStrategy(address _strategy, string memory _strategyType) external onlyOwner;

// Removing a strategy
function removeStrategy(address _strategy) external onlyOwner;

// Adding a supported asset
function addSupportedAsset(address _asset) external onlyOwner;

// Removing a supported asset
function removeSupportedAsset(address _asset) external onlyOwner;

// Mapping an asset to a strategy
function mapAssetToStrategy(address _asset, address _strategy) external onlyOwner;

// Removing asset-strategy mapping
function removeAssetStrategy(address _asset, address _strategy) external onlyOwner;

// Updating platform fee
function updatePlatformFee(uint256 _newFee) external onlyOwner;

// Updating fee collector
function updateFeeCollector(address _newCollector) external onlyOwner;

// Setting the multi-signature wallet
function setMultiSigWallet(address _multiSigWallet) external onlyOwner;

// Transferring ownership
function transferOwnership(address _newOwner) external onlyOwner;
```

### Emergency and Multi-Signature Functions

```solidity
// Update emergency admin address (owner or multi-sig wallet)
function updateEmergencyAdmin(address _newAdmin) external;

// Pause the contract (owner, emergency admin, or multi-sig owner)
function pauseContract() external;

// Unpause the contract (owner or multi-sig wallet)
function unpauseContract() external;

// Emergency withdrawal during paused state
function emergencyWithdraw(address _asset) external nonReentrant;

// Emergency withdraw from strategy (admin function)
function emergencyWithdrawFromStrategy(address _strategy, address _asset) external nonReentrant;
```

#### User Functions

```solidity
// Depositing assets
function deposit(address _strategy, address _asset, uint256 _amount) external nonReentrant;

// Withdrawing assets
function withdraw(address _strategy, address _asset, uint256 _amount) external nonReentrant;
```

#### View Functions

```solidity
// Getting the best strategy for an asset
function getBestStrategy(address _asset) external view returns (address);

// Getting strategy details
function getStrategyDetails(address _strategy) external view returns (
    string memory strategyType,
    string memory name,
    string memory protocol
);

// Getting user's total balance
function getUserTotalBalance(address _user) external view returns (uint256);

// Getting user's allocation in a specific strategy
function getUserStrategyAllocation(
    address _user,
    address _asset,
    address _strategy
) external view returns (uint256);

// Getting all strategies for an asset
function getAssetStrategies(address _asset) external view returns (address[] memory);

// Get all users who have deposited
function getAllUsers() public view returns (address[] memory);
```

## Frontend Integration

### Setting Up ethers.js

```typescript
import { ethers } from 'ethers';
import YieldAggregatorABI from './abis/YieldAggregator.json';
import LendingStrategyABI from './abis/LendingStrategy.json';
import MultiSigWalletABI from './abis/MultiSigWallet.json';

// Connect to MetaMask
async function connectToMetaMask() {
  if (window.ethereum) {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    return { provider, signer };
  }
  throw new Error('MetaMask not found');
}

// Contract instances
async function getContracts(signer) {
  const yieldAggregatorAddress = 'YOUR_DEPLOYED_YIELD_AGGREGATOR_ADDRESS';
  const lendingStrategyAddress = 'YOUR_DEPLOYED_LENDING_STRATEGY_ADDRESS';
  const multiSigWalletAddress = 'YOUR_DEPLOYED_MULTISIG_WALLET_ADDRESS';
  
  const yieldAggregator = new ethers.Contract(
    yieldAggregatorAddress,
    YieldAggregatorABI,
    signer
  );
  
  const lendingStrategy = new ethers.Contract(
    lendingStrategyAddress,
    LendingStrategyABI,
    signer
  );
  
  const multiSigWallet = new ethers.Contract(
    multiSigWalletAddress,
    MultiSigWalletABI,
    signer
  );
  
  return { yieldAggregator, lendingStrategy, multiSigWallet };
}
```

### Usage Examples

#### Checking Supported Assets and Strategies

```typescript
async function getSupportedAssets(yieldAggregator, assetAddress) {
  const isSupported = await yieldAggregator.supportedAssets(assetAddress);
  console.log(`Asset ${assetAddress} is ${isSupported ? 'supported' : 'not supported'}`);
  
  if (isSupported) {
    const strategies = await yieldAggregator.getAssetStrategies(assetAddress);
    console.log('Available strategies:', strategies);
    
    const bestStrategy = await yieldAggregator.getBestStrategy(assetAddress);
    console.log('Best strategy:', bestStrategy);
  }
}
```

#### Depositing Assets

```typescript
async function depositAsset(yieldAggregator, tokenContract, strategyAddress, assetAddress, amount) {
  try {
    // Convert amount to wei
    const amountWei = ethers.utils.parseUnits(amount.toString(), 18);
    
    // Approve the YieldAggregator to spend tokens
    const approveTx = await tokenContract.approve(yieldAggregator.address, amountWei);
    await approveTx.wait();
    console.log('Approval confirmed');
    
    // Deposit tokens
    const depositTx = await yieldAggregator.deposit(strategyAddress, assetAddress, amountWei);
    await depositTx.wait();
    console.log('Deposit confirmed');
    
    return true;
  } catch (error) {
    console.error('Error depositing asset:', error);
    return false;
  }
}
```

#### Withdrawing Assets

```typescript
async function withdrawAsset(yieldAggregator, strategyAddress, assetAddress, amount) {
  try {
    // Convert amount to wei
    const amountWei = ethers.utils.parseUnits(amount.toString(), 18);
    
    // Withdraw tokens
    const withdrawTx = await yieldAggregator.withdraw(strategyAddress, assetAddress, amountWei);
    await withdrawTx.wait();
    console.log('Withdrawal confirmed');
    
    return true;
  } catch (error) {
    console.error('Error withdrawing asset:', error);
    return false;
  }
}
```

#### Getting User Data

```typescript
async function getUserData(yieldAggregator, userAddress, assetAddress, strategyAddress) {
  // Get user's total balance across all assets
  const totalBalance = await yieldAggregator.getUserTotalBalance(userAddress);
  console.log('Total balance:', ethers.utils.formatEther(totalBalance));
  
  // Get user's balance for a specific asset
  const assetBalance = await yieldAggregator.userBalances(userAddress, assetAddress);
  console.log('Asset balance:', ethers.utils.formatEther(assetBalance));
  
  // Get user's allocation in a specific strategy
  const strategyAllocation = await yieldAggregator.getUserStrategyAllocation(
    userAddress,
    assetAddress,
    strategyAddress
  );
  console.log('Strategy allocation:', ethers.utils.formatEther(strategyAllocation));
}

// Checking if emergency functions are available
async function checkEmergencyStatus(yieldAggregator) {
  // Check if contract is paused
  const isPaused = await yieldAggregator.paused();
  console.log('Contract paused:', isPaused);
  
  // Get emergency admin
  const emergencyAdmin = await yieldAggregator.emergencyAdmin();
  console.log('Emergency admin:', emergencyAdmin);
  
  // Get multi-sig wallet address
  const multiSigWallet = await yieldAggregator.multiSigWallet();
  console.log('MultiSig wallet:', multiSigWallet);
}

// Emergency withdrawal during paused state
async function performEmergencyWithdrawal(yieldAggregator, assetAddress) {
  try {
    // Check if contract is paused
    const isPaused = await yieldAggregator.paused();
    if (!isPaused) {
      console.error('Contract is not paused, emergency withdrawal not available');
      return false;
    }
    
    // Perform emergency withdrawal
    const withdrawTx = await yieldAggregator.emergencyWithdraw(assetAddress);
    await withdrawTx.wait();
    console.log('Emergency withdrawal completed');
    
    return true;
  } catch (error) {
    console.error('Error in emergency withdrawal:', error);
    return false;
  }
}
```

#### Creating a Strategy Dashboard

```typescript
async function getStrategyDashboard(yieldAggregator, assetAddress) {
  // Get all strategies for the asset
  const strategies = await yieldAggregator.getAssetStrategies(assetAddress);
  
  // Get strategy details for each strategy
  const strategyDetails = await Promise.all(
    strategies.map(async (strategy) => {
      const details = await yieldAggregator.getStrategyDetails(strategy);
      return {
        address: strategy,
        type: details.strategyType,
        name: details.name,
        protocol: details.protocol,
      };
    })
  );
  
  // Get APY for each strategy
  const strategyAPYs = await Promise.all(
    strategies.map(async (strategy) => {
      // Create strategy contract instance
      const strategyContract = new ethers.Contract(
        strategy,
        ['function getAPY(address) view returns (uint256)'],
        yieldAggregator.provider
      );
      
      const apy = await strategyContract.getAPY(assetAddress);
      return {
        address: strategy,
        apy: apy.toNumber() / 100, // Convert basis points to percentage
      };
    })
  );
  
  // Combine the data
  return strategyDetails.map((details) => {
    const apyData = strategyAPYs.find((s) => s.address === details.address);
    return {
      ...details,
      apy: apyData ? apyData.apy : 0,
    };
  });
}

// Multi-Signature Wallet Interactions
async function multiSigOperations(multiSigWallet, yieldAggregator, signer) {
  // Get owners
  const owners = await multiSigWallet.getOwners();
  console.log('MultiSig Owners:', owners);
  
  // Check if the current user is an owner
  const currentAddress = await signer.getAddress();
  const isOwner = await multiSigWallet.isOwner(currentAddress);
  console.log('Current user is an owner:', isOwner);
  
  if (isOwner) {
    // Get transaction count
    const txCount = await multiSigWallet.getTransactionCount();
    console.log('Transaction count:', txCount.toString());
    
    // Example: Submit a transaction to pause the contract
    const pauseCalldata = yieldAggregator.interface.encodeFunctionData('pauseContract', []);
    const submitTx = await multiSigWallet.submitTransaction(
      yieldAggregator.address,
      0, // value in wei
      pauseCalldata
    );
    await submitTx.wait();
    console.log('Submitted transaction to pause contract');
    
    // Get the latest transaction
    const latestTxIndex = txCount;
    const latestTx = await multiSigWallet.getTransaction(latestTxIndex);
    console.log('Latest transaction:', {
      target: latestTx.target,
      executed: latestTx.executed,
      confirmations: latestTx.confirmations.toString(),
    });
    
    // Example: Confirm a transaction (already confirmed by submitter)
    // This would be used by other owners to confirm the transaction
    // If confirmation count reaches required confirmations, it will execute automatically
    /*
    const confirmTx = await multiSigWallet.confirmTransaction(latestTxIndex);
    await confirmTx.wait();
    console.log('Confirmed transaction');
    */
  }
}
```

## Testing

Use Hardhat's testing framework to test the contracts:

```bash
npx hardhat test
```

This will run all tests in the `test` directory, including:
- YieldAggregator.test.js
- LendingStrategy.test.js

For testing with a local network:

```bash
npx hardhat node
npx hardhat run scripts/deploy.js --network localhost
```
