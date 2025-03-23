# OrbitYield Portfolio System

## Overview

The OrbitYield Portfolio system provides users with comprehensive portfolio management capabilities for yield investments. This system allows users to:

1. View their active positions across different yield strategies
2. Monitor total portfolio value and estimated annual yield
3. Track transaction history of deposits, withdrawals, and reward claims
4. Interact directly with smart contracts to manage positions

## Features

### Portfolio Summary

The Portfolio Summary component displays:
- Total portfolio value across all strategies
- Estimated annual yield and APY performance
- Detailed breakdown of each active position including:
  - Asset type and amount
  - Current value
  - Time in the strategy
  - Estimated APY
  - Accrued rewards
- Interactive controls to withdraw funds or claim rewards

### Transaction History

The Transaction History component provides:
- Chronological list of all user interactions with yield strategies
- Filtering options by asset, protocol, or transaction type
- Direct links to blockchain explorers for transaction verification
- Visual indicators to differentiate between deposits, withdrawals, and reward claims

## Architecture

### Smart Contract Integration

- Uses the `useYieldContracts` custom hook to interact with deployed contracts
- Handles all blockchain interactions including:
  - Deposits into yield strategies
  - Withdrawals from active positions
  - Claiming of accrued rewards
  - Fetching real-time user position data

### API Endpoints

- `/api/transactions`: Retrieves user transaction history with filtering options
- MongoDB integration for persistent transaction storage
- Proper error handling and pagination support

## Testing

Comprehensive test suite includes:
- Unit tests for all React components
- API endpoint testing
- Mock implementations for blockchain interactions
- Test coverage for error handling and edge cases

## Getting Started

1. Navigate to the Portfolio page from the main navigation
2. Connect your wallet to view your active positions
3. Use the tabs to switch between "Positions" and "Transaction History" views
4. Interact with positions directly through the UI

## Development

To extend the portfolio functionality:
1. Add new transaction types in the Transaction model
2. Implement additional filters or sorting options in the API
3. Expand the UI to show more detailed analytics
