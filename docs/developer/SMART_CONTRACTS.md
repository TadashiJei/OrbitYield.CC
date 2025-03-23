# Smart Contract Architecture

This document provides a detailed overview of the OrbitYield smart contract architecture, explaining the interactions between contracts and the modular design of the system.

## System Architecture

The OrbitYield protocol consists of several interconnected smart contracts that work together to provide secure and efficient yield optimization across multiple blockchains.

```
┌─────────────────────────┐      ┌─────────────────────────┐
│                         │      │                         │
│     YieldAggregator     │◄────►│    MasterStrategyFactory│
│                         │      │                         │
└─────────────┬───────────┘      └───────────┬─────────────┘
              │                              │
              │                              │
              ▼                              ▼
┌─────────────────────────┐      ┌─────────────────────────┐
│                         │      │                         │
│     MultiSigWallet      │      │   StrategyFactoryLib    │
│                         │      │                         │
└─────────────────────────┘      └─────────────────────────┘
              ▲                              ▲
              │                              │
              │                              │
┌─────────────┴───────────┐      ┌───────────┴─────────────┐
│   Specialized Strategy   │      │  Specialized Factories  │
│   ├─ LendingStrategy    │◄────►│  ├─ LendingFactory      │
│   ├─ FarmingStrategy    │      │  ├─ FarmingFactory      │
│   └─ LiquidityStrategy  │      │  └─ LiquidityFactory    │
└─────────────────────────┘      └─────────────────────────┘
```

## Core Contracts

### YieldAggregator

The YieldAggregator is the main entry point for users interacting with the OrbitYield protocol.

**Key Responsibilities:**
- User deposit and withdrawal management
- Asset validation and transfer
- Strategy registration and tracking
- Fee collection and distribution
- Emergency controls and pausing

**Key Functions:**
- `deposit(address _strategy, address _asset, uint256 _amount)`: Deposit assets into a strategy
- `withdraw(address _strategy, address _asset, uint256 _amount)`: Withdraw assets from a strategy
- `emergencyWithdraw(address _strategy, address _asset)`: Withdraw all user funds in case of emergency
- `addStrategy(address _strategy)`: Register a new strategy
- `removeStrategy(address _strategy)`: Remove a strategy from the system

### MasterStrategyFactory

The MasterStrategyFactory coordinates the deployment of various specialized yield strategies through its sub-factories.

**Key Responsibilities:**
- Managing specialized factory contracts
- Coordinating strategy deployment
- Strategy registration with YieldAggregator
- Access control for factory operations

**Key Functions:**
- `deployLendingStrategy(...)`: Deploy a new lending strategy
- `deployFarmingStrategy(...)`: Deploy a new farming strategy
- `deployLiquidityStrategy(...)`: Deploy a new liquidity strategy
- `registerStrategy(address _strategy)`: Register a deployed strategy with YieldAggregator
- `setFactoryAddress(uint8 _factoryType, address _factory)`: Update specialized factory addresses

### Specialized Factory Contracts

Each specialized factory is responsible for deploying a specific type of yield strategy.

#### BaseStrategyFactory

Abstract base contract with shared functionality for all specialized factories.

**Key Functions:**
- `validateDeploymentParameters(...)`: Common validation logic
- `_finalizeDeployment(...)`: Post-deployment setup

#### LendingStrategyFactory

Creates strategies that provide yield through lending protocols like Aave, Compound, etc.

**Key Functions:**
- `deployStrategy(...)`: Deploy a lending-specific strategy
- `getLendingParameters(...)`: Get protocol-specific parameters

#### FarmingStrategyFactory

Creates strategies that provide yield through staking and farming tokens.

**Key Functions:**
- `deployStrategy(...)`: Deploy a farming-specific strategy
- `getFarmingParameters(...)`: Get farm-specific configuration

#### LiquidityStrategyFactory

Creates strategies that provide yield through liquidity provision.

**Key Functions:**
- `deployStrategy(...)`: Deploy a liquidity-specific strategy
- `getLiquidityParameters(...)`: Get AMM-specific parameters

### StrategyFactoryLib

Library containing shared validation and utility functions used by all factory contracts.

**Key Functions:**
- `validateAsset(address _asset)`: Verify asset compatibility
- `validateFeeParameters(uint256 _fee)`: Verify fee is within acceptable range
- `calculateExpectedReturn(...)`: Calculate expected APY

## Strategy Contracts

### BaseYieldStrategy

Abstract base contract with shared functionality for all yield strategies.

**Key Functions:**
- `deposit(address _asset, uint256 _amount)`: Core deposit logic
- `withdraw(address _asset, uint256 _amount)`: Core withdraw logic
- `getAPY()`: Return current APY

### LendingStrategy

Implements yield generation through lending protocols.

**Supported Platforms:**
- Aave
- Compound
- Euler
- Spark

**Key Functions:**
- `depositToLendingProtocol(...)`: Execute deposit in lending protocol
- `withdrawFromLendingProtocol(...)`: Execute withdrawal from lending protocol
- `harvestYield()`: Collect accrued interest

### FarmingStrategy

Implements yield generation through yield farming.

**Supported Platforms:**
- Curve
- Convex
- Yearn
- Balancer

**Key Functions:**
- `stakeInFarm(...)`: Stake tokens in farm
- `unstakeFromFarm(...)`: Unstake tokens from farm
- `claimRewards()`: Harvest farming rewards

### LiquidityStrategy

Implements yield generation through liquidity provision.

**Supported Platforms:**
- Uniswap
- SushiSwap
- Pancake Swap
- TraderJoe

**Key Functions:**
- `addLiquidity(...)`: Add liquidity to AMM
- `removeLiquidity(...)`: Remove liquidity from AMM
- `collectFees()`: Collect trading fees

## Security Mechanisms

### MultiSigWallet

Provides secure governance functions requiring multiple authorizations.

**Key Functions:**
- `submitTransaction(...)`: Submit a transaction for approval
- `confirmTransaction(uint256 _txIndex)`: Confirm a pending transaction
- `executeTransaction(uint256 _txIndex)`: Execute a transaction once threshold is reached
- `revokeConfirmation(uint256 _txIndex)`: Revoke previous confirmation

### Emergency Features

The protocol includes several emergency mechanisms:

1. **Contract Pausing**: Ability to pause operations in case of detected issues
2. **Emergency Withdrawals**: Allow users to withdraw funds even when paused
3. **Emergency Strategy Management**: Allow admins to remove compromised strategies
4. **Circuit Breakers**: Automatic pausing when suspicious activities are detected

## Contract Size Optimization

Due to Ethereum's contract size limitations (24KB), we've implemented various optimization techniques:

1. **Modular Architecture**: Split functionality across multiple contracts
2. **Library Usage**: Move common functions to libraries
3. **Inheritance Optimization**: Careful structuring of inheritance chain
4. **Solidity Optimizer**: Configured for size over gas efficiency when deploying
5. **Assembly Usage**: Selective use of Yul for critical functions

For more details on optimization, see [OPTIMIZATION_STRATEGY.md](../OPTIMIZATION_STRATEGY.md).

## Contract Interactions

For detailed information on how contracts interact with each other, see [CONTRACT_INTERACTIONS.md](../CONTRACT_INTERACTIONS.md).

## Contract Addresses

| Contract Name | Mainnet | Arbitrum | Optimism | Base |
|---------------|---------|----------|----------|------|
| YieldAggregator | 0x123... | 0x456... | 0x789... | 0xabc... |
| MasterStrategyFactory | 0x234... | 0x567... | 0x890... | 0xbcd... |
| LendingStrategyFactory | 0x345... | 0x678... | 0x901... | 0xcde... |
| FarmingStrategyFactory | 0x456... | 0x789... | 0xa12... | 0xdef... |
| LiquidityStrategyFactory | 0x567... | 0x890... | 0xb23... | 0xefg... |
| MultiSigWallet | 0x678... | 0x901... | 0xc34... | 0xfgh... |

## Development and Testing

For information on contract development, testing, and deployment, see:

- [Local Development Setup](./SETUP.md)
- [Testing Guide](./TESTING.md)
- [Contract Deployment Process](../deployment/CONTRACT_DEPLOYMENT.md)
