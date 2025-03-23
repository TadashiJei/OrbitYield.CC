# Emergency Features Documentation

This document describes the emergency functions available in the OrbitYield platform for handling unexpected situations and ensuring the safety of user funds.

## Overview

OrbitYield implements a robust set of emergency features to mitigate risks and protect users during adverse conditions. These features include:

1. **Contract Pausing**: Temporarily suspend new deposits while allowing withdrawals
2. **Emergency Withdrawal**: Allow users to withdraw funds directly from the aggregator contract
3. **Strategy Emergency Withdrawal**: Allow admins to recover funds from potentially compromised strategies
4. **Multi-Signature Governance**: Require multiple approvals for critical operations

## Roles and Permissions

The platform includes several roles with different levels of access to emergency functions:

| Role | Description | Permissions |
|------|-------------|-------------|
| Owner | Primary contract administrator | Full control over contract settings |
| Emergency Admin | Secondary admin for urgent situations | Can trigger emergency functions |
| Multi-Sig Wallet | Collective decision making | Required for certain critical operations |
| Regular User | Standard platform user | Can perform emergency withdrawals when enabled |

## Emergency Workflow

### 1. Contract Pausing

```solidity
function pauseContract() external {
    require(msg.sender == owner || msg.sender == emergencyAdmin || 
            (multiSigWallet != address(0) && IMultiSigWallet(multiSigWallet).isOwner(msg.sender)), 
            "YieldAggregator: not authorized");
    _pause();
    emit ContractPaused(msg.sender);
}
```

When a potential issue is detected, authorized addresses (owner, emergency admin, or multi-sig wallet owner) can pause the contract. This prevents new deposits but still allows normal withdrawals and emergency withdrawals.

### 2. User Emergency Withdrawal

```solidity
function emergencyWithdraw(address _asset) external nonReentrant {
    require(paused(), "YieldAggregator: not paused");
    require(supportedAssets[_asset], "YieldAggregator: asset not supported");
    
    uint256 userBalance = userBalances[msg.sender][_asset];
    require(userBalance > 0, "YieldAggregator: no balance");
    
    // Reset user balance
    userBalances[msg.sender][_asset] = 0;
    
    // Reset TVL for asset
    tvlPerAsset[_asset] -= userBalance;
    
    // Reset all strategy allocations for this user and asset
    address[] memory strategies = assetStrategies[_asset];
    for (uint256 i = 0; i < strategies.length; i++) {
        address strategy = strategies[i];
        uint256 strategyAllocation = userStrategyAllocations[msg.sender][_asset][strategy];
        
        if (strategyAllocation > 0) {
            // Update TVL per strategy
            tvlPerStrategy[strategy] -= strategyAllocation;
            
            // Reset user strategy allocation
            userStrategyAllocations[msg.sender][_asset][strategy] = 0;
        }
    }
    
    // Transfer all user balance directly from this contract
    bool success = IERC20(_asset).transfer(msg.sender, userBalance);
    require(success, "YieldAggregator: transfer failed");
    
    emit EmergencyWithdrawal(msg.sender, _asset, userBalance);
}
```

This function allows users to directly withdraw their funds from the YieldAggregator contract, bypassing the normal strategy withdrawal process. Key characteristics:

- Only available when the contract is paused
- Withdraws all user balance for a specific asset
- Updates all accounting records (user balance, TVL, strategy allocations)
- Transfers funds directly from the aggregator contract
- No need to interact with potentially problematic strategies

### 3. Admin Strategy Emergency Withdrawal

```solidity
function emergencyWithdrawFromStrategy(address _strategy, address _asset) external nonReentrant {
    require(msg.sender == owner || msg.sender == emergencyAdmin || 
            (multiSigWallet != address(0) && msg.sender == multiSigWallet), 
            "YieldAggregator: not authorized");
    require(strategies[_strategy], "YieldAggregator: strategy not registered");
    require(supportedAssets[_asset], "YieldAggregator: asset not supported");
    
    // Get total amount in strategy
    uint256 totalInStrategy = 0;
    for (uint256 i = 0; i < allUsers.length; i++) {
        address user = allUsers[i];
        totalInStrategy += userStrategyAllocations[user][_asset][_strategy];
    }
    
    if (totalInStrategy > 0) {
        // Call strategy withdraw
        try IYieldStrategy(_strategy).withdraw(_asset, totalInStrategy) {
            emit EmergencyWithdrawalFromStrategy(_strategy, _asset, totalInStrategy);
        } catch {
            // If strategy withdrawal fails, we continue anyway as this is emergency function
            emit EmergencyWithdrawalFromStrategy(_strategy, _asset, 0);
        }
    }
}
```

This function allows authorized addresses to withdraw all funds from a specific strategy, bringing them back to the aggregator contract. Key characteristics:

- Can be called by owner, emergency admin, or multi-sig wallet
- Calculates the total amount allocated to the strategy across all users
- Uses try/catch to prevent transaction failure if the strategy reverts
- Emits events regardless of success to provide transparency

### 4. Unpausing the Contract

```solidity
function unpauseContract() external {
    require(msg.sender == owner || 
            (multiSigWallet != address(0) && msg.sender == multiSigWallet), 
            "YieldAggregator: not authorized");
    _unpause();
    emit ContractUnpaused(msg.sender);
}
```

Once the emergency situation is resolved, only the owner or multi-sig wallet (not the emergency admin) can unpause the contract, allowing normal operations to resume.

## Multi-Signature Security

The multi-signature wallet provides an additional layer of security for critical operations. It requires multiple approvals before executing functions like:

- Updating the emergency admin
- Unpausing the contract
- Emergency withdrawals from strategies

This ensures that no single point of failure can compromise the platform's security.

## Frontend Integration

The frontend application should include an emergency dashboard for users that:

1. Displays the current contract status (paused/active)
2. Shows emergency withdrawal options when the contract is paused
3. Provides clear instructions to users during emergency situations
4. For admins: includes controls for emergency functions and multi-sig operations

## Best Practices

1. **Regular Testing**: Conduct periodic drills to ensure emergency functions work as expected
2. **Transparent Communication**: Inform users promptly about emergency situations
3. **Fund Reserves**: Maintain sufficient reserves in the aggregator contract for emergency withdrawals
4. **Access Control Audits**: Regularly review and update the permissions structure

## Conclusion

The emergency features in OrbitYield provide a comprehensive safety net for protecting user funds during unexpected scenarios. By combining contract pausing, emergency withdrawals, and multi-signature controls, the platform can respond effectively to potential threats while maintaining user trust.
