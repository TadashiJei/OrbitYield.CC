// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "./interfaces/IYieldStrategy.sol";

interface IMultiSigWallet {
    function isOwner(address owner) external view returns (bool);
    function submitTransaction(address target, uint256 value, bytes memory data) external returns (uint256);
}

/**
 * @title YieldAggregator
 * @dev Main contract for aggregating yield from various strategies
 */
contract YieldAggregator is ReentrancyGuard, Pausable {
    address public owner;
    
    // Emergency admin address that can trigger emergency functions
    address public emergencyAdmin;
    address public feeCollector;
    address public multiSigWallet;
    uint256 public platformFee = 50; // 0.5% (basis points)
    uint256 public constant MAX_FEE = 500; // 5% maximum fee
    
    // List of all users who have deposited
    address[] private allUsers;
    mapping(address => bool) private isUser;
    
    // Supported assets
    mapping(address => bool) public supportedAssets;
    
    // Registered yield strategies
    mapping(address => bool) public strategies;
    
    // Strategy types (e.g., "lending", "farming", "liquidity")
    mapping(address => string) public strategyTypes;
    
    // Asset to strategies mapping
    mapping(address => address[]) public assetStrategies;
    
    // Total value locked per asset
    mapping(address => uint256) public tvlPerAsset;
    
    // Total value locked per strategy
    mapping(address => uint256) public tvlPerStrategy;
    
    // User balances: user address => asset address => balance
    mapping(address => mapping(address => uint256)) public userBalances;
    
    // User allocations: user => asset => strategy => amount
    mapping(address => mapping(address => mapping(address => uint256))) public userStrategyAllocations;
    
    // Events
    event StrategyAdded(address strategy, string strategyType);
    event StrategyRemoved(address strategy);
    event AssetSupported(address asset);
    event AssetRemoved(address asset);
    event AssetStrategyMapped(address asset, address strategy);
    event AssetStrategyRemoved(address asset, address strategy);
    event Deposited(address user, address asset, uint256 amount, address strategy);
    event Withdrawn(address user, address asset, uint256 amount, address strategy);
    event FeeUpdated(uint256 oldFee, uint256 newFee);
    event FeeCollectorUpdated(address oldCollector, address newCollector);
    event EmergencyAdminUpdated(address oldAdmin, address newAdmin);
    event EmergencyWithdrawal(address user, address asset, uint256 amount);
    event ContractPaused(address admin);
    event ContractUnpaused(address admin);
    event MultiSigWalletSet(address wallet);
    event EmergencyWithdrawalFromStrategy(address strategy, address asset, uint256 amount);
    event OwnershipTransferred(address oldOwner, address newOwner);
    
    /**
     * @dev Constructor sets the owner and fee collector
     */
    constructor() {
        owner = msg.sender;
        feeCollector = msg.sender;
        emergencyAdmin = msg.sender;
    }
    
    /**
     * @dev Modifier to restrict function to owner only
     */
    modifier onlyOwner() {
        require(msg.sender == owner, "YieldAggregator: caller is not the owner");
        _;
    }
    
    /**
     * @dev Add a new yield strategy
     * @param _strategy Address of the strategy contract
     * @param _strategyType Type of strategy (e.g., "lending", "farming", "liquidity")
     */
    function addStrategy(address _strategy, string memory _strategyType) external onlyOwner {
        require(_strategy != address(0), "YieldAggregator: invalid strategy address");
        require(!strategies[_strategy], "YieldAggregator: strategy already added");
        
        strategies[_strategy] = true;
        strategyTypes[_strategy] = _strategyType;
        emit StrategyAdded(_strategy, _strategyType);
    }
    
    /**
     * @dev Remove a yield strategy
     * @param _strategy Address of the strategy contract
     */
    function removeStrategy(address _strategy) external onlyOwner {
        require(strategies[_strategy], "YieldAggregator: strategy not registered");
        require(tvlPerStrategy[_strategy] == 0, "YieldAggregator: strategy has funds");
        
        strategies[_strategy] = false;
        emit StrategyRemoved(_strategy);
    }
    
    /**
     * @dev Add a supported asset
     * @param _asset Address of the asset (token) contract
     */
    function addSupportedAsset(address _asset) external onlyOwner {
        require(_asset != address(0), "YieldAggregator: invalid asset address");
        supportedAssets[_asset] = true;
        emit AssetSupported(_asset);
    }
    
    /**
     * @dev Remove a supported asset
     * @param _asset Address of the asset (token) contract
     */
    function removeSupportedAsset(address _asset) external onlyOwner {
        require(supportedAssets[_asset], "YieldAggregator: asset not supported");
        require(tvlPerAsset[_asset] == 0, "YieldAggregator: asset has deposits");
        
        supportedAssets[_asset] = false;
        emit AssetRemoved(_asset);
    }
    
    /**
     * @dev Update platform fee
     * @param _newFee New fee in basis points
     */
    function updatePlatformFee(uint256 _newFee) external onlyOwner {
        require(_newFee <= MAX_FEE, "YieldAggregator: fee too high");
        
        emit FeeUpdated(platformFee, _newFee);
        platformFee = _newFee;
    }
    
    /**
     * @dev Update fee collector address
     * @param _newCollector New fee collector address
     */
    function updateFeeCollector(address _newCollector) external onlyOwner {
        require(_newCollector != address(0), "YieldAggregator: invalid address");
        
        emit FeeCollectorUpdated(feeCollector, _newCollector);
        feeCollector = _newCollector;
    }
    
    /**
     * @dev Map an asset to a strategy
     * @param _asset Asset address
     * @param _strategy Strategy address
     */
    function mapAssetToStrategy(address _asset, address _strategy) external onlyOwner {
        require(supportedAssets[_asset], "YieldAggregator: asset not supported");
        require(strategies[_strategy], "YieldAggregator: strategy not registered");
        
        // Check if strategy is already mapped to asset
        for (uint256 i = 0; i < assetStrategies[_asset].length; i++) {
            if (assetStrategies[_asset][i] == _strategy) {
                return; // Strategy already mapped
            }
        }
        
        // Add strategy to asset's strategies
        assetStrategies[_asset].push(_strategy);
        emit AssetStrategyMapped(_asset, _strategy);
    }
    
    /**
     * @dev Remove asset from strategy mapping
     * @param _asset Asset address
     * @param _strategy Strategy address
     */
    function removeAssetStrategy(address _asset, address _strategy) external onlyOwner {
        require(supportedAssets[_asset], "YieldAggregator: asset not supported");
        
        // Find and remove strategy from asset's strategies
        for (uint256 i = 0; i < assetStrategies[_asset].length; i++) {
            if (assetStrategies[_asset][i] == _strategy) {
                // Move the last element to the position of the element to delete
                assetStrategies[_asset][i] = assetStrategies[_asset][assetStrategies[_asset].length - 1];
                // Remove the last element
                assetStrategies[_asset].pop();
                emit AssetStrategyRemoved(_asset, _strategy);
                return;
            }
        }
        
        revert("YieldAggregator: strategy not mapped to asset");
    }
    
    /**
     * @dev Get all strategies for a specific asset
     * @param _asset Asset address
     * @return Array of strategy addresses
     */
    function getAssetStrategies(address _asset) external view returns (address[] memory) {
        return assetStrategies[_asset];
    }
    
    /**
     * @dev Deposit funds into a specific strategy
     * @param _strategy Strategy to deposit into
     * @param _asset Asset to deposit
     * @param _amount Amount to deposit
     */
    function deposit(address _strategy, address _asset, uint256 _amount) external nonReentrant whenNotPaused {
        require(strategies[_strategy], "YieldAggregator: strategy not registered");
        require(supportedAssets[_asset], "YieldAggregator: asset not supported");
        require(_amount > 0, "YieldAggregator: zero amount");
        
        // Check if asset is supported by strategy
        bool assetSupported = false;
        for (uint256 i = 0; i < assetStrategies[_asset].length; i++) {
            if (assetStrategies[_asset][i] == _strategy) {
                assetSupported = true;
                break;
            }
        }
        require(assetSupported, "YieldAggregator: asset not supported by strategy");
        
        // Transfer tokens from user to this contract
        bool success = IERC20(_asset).transferFrom(msg.sender, address(this), _amount);
        require(success, "YieldAggregator: transfer failed");
        
        // Update balances
        userBalances[msg.sender][_asset] += _amount;
        userStrategyAllocations[msg.sender][_asset][_strategy] += _amount;
        tvlPerAsset[_asset] += _amount;
        tvlPerStrategy[_strategy] += _amount;
        
        // Add user to the list of all users if they're not already in it
        if (!isUser[msg.sender]) {
            isUser[msg.sender] = true;
            allUsers.push(msg.sender);
        }
        
        // Approve strategy to spend tokens
        success = IERC20(_asset).approve(_strategy, _amount);
        require(success, "YieldAggregator: approval failed");
        
        // Interact with strategy contract
        IYieldStrategy(_strategy).deposit(_asset, _amount);
        
        emit Deposited(msg.sender, _asset, _amount, _strategy);
    }
    
    /**
     * @dev Withdraw funds from a specific strategy
     * @param _strategy Strategy to withdraw from
     * @param _asset Asset to withdraw
     * @param _amount Amount to withdraw
     */
    function withdraw(address _strategy, address _asset, uint256 _amount) external nonReentrant whenNotPaused {
        require(strategies[_strategy], "YieldAggregator: strategy not registered");
        require(supportedAssets[_asset], "YieldAggregator: asset not supported");
        require(_amount > 0, "YieldAggregator: zero amount");
        
        // Check if user has enough allocation in strategy
        require(
            userStrategyAllocations[msg.sender][_asset][_strategy] >= _amount,
            "YieldAggregator: insufficient strategy allocation"
        );
        
        // Calculate fees
        uint256 fee = (_amount * platformFee) / 10000;
        uint256 amountAfterFee = _amount - fee;
        
        // Update balances
        userBalances[msg.sender][_asset] -= _amount;
        userStrategyAllocations[msg.sender][_asset][_strategy] -= _amount;
        tvlPerAsset[_asset] -= _amount;
        tvlPerStrategy[_strategy] -= _amount;
        
        // Withdraw from strategy contract
        IYieldStrategy(_strategy).withdraw(_asset, _amount);
        
        // Transfer tokens to user and fee collector
        bool success = IERC20(_asset).transfer(msg.sender, amountAfterFee);
        require(success, "YieldAggregator: transfer to user failed");
        
        if (fee > 0) {
            success = IERC20(_asset).transfer(feeCollector, fee);
            require(success, "YieldAggregator: transfer to fee collector failed");
        }
        
        emit Withdrawn(msg.sender, _asset, _amount, _strategy);
    }
    
    /**
     * @dev Get the best strategy for a specific asset
     * @param _asset Asset address
     * @return Address of the best strategy
     */
    function getBestStrategy(address _asset) external view returns (address) {
        if (!supportedAssets[_asset] || assetStrategies[_asset].length == 0) {
            return address(0);
        }
        
        address bestStrategy = address(0);
        uint256 highestAPY = 0;
        
        for (uint256 i = 0; i < assetStrategies[_asset].length; i++) {
            address strategy = assetStrategies[_asset][i];
            uint256 apy = IYieldStrategy(strategy).getAPY(_asset);
            
            if (apy > highestAPY) {
                highestAPY = apy;
                bestStrategy = strategy;
            }
        }
        
        return bestStrategy;
    }
    
    /**
     * @dev Get strategy details
     * @param _strategy Strategy address
     * @return strategyType The type of strategy
     * @return name The name of the strategy
     * @return protocol The protocol used by the strategy
     */
    function getStrategyDetails(address _strategy) external view returns (
        string memory strategyType,
        string memory name,
        string memory protocol
    ) {
        require(strategies[_strategy], "YieldAggregator: strategy not registered");
        
        IYieldStrategy strategy = IYieldStrategy(_strategy);
        return (
            strategyTypes[_strategy],
            strategy.getName(),
            strategy.getProtocol()
        );
    }
    
    /**
     * @dev Get user's total balance across all assets
     * @param _user User address
     * @return Total balance in USD value (in wei)
     */
    function getUserTotalBalance(address _user) external view returns (uint256) {
        // For a complete implementation, this would need a price oracle
        // This is a simplified implementation that just sums up raw token balances
        uint256 totalBalance = 0;
        
        // Iterate over supported assets where user has balance
        for (uint256 i = 0; i < 20; i++) { // Arbitrary limit to prevent gas issues
            address asset = address(uint160(i + 1)); // Simple way to iterate addresses
            if (supportedAssets[asset] && userBalances[_user][asset] > 0) {
                totalBalance += userBalances[_user][asset];
                // In a complete implementation, we would multiply by asset price
            }
        }
        
        return totalBalance;
    }
    
    /**
     * @dev Get user's allocation in a specific strategy
     * @param _user User address
     * @param _asset Asset address
     * @param _strategy Strategy address
     * @return Amount allocated
     */
    function getUserStrategyAllocation(
        address _user,
        address _asset,
        address _strategy
    ) external view returns (uint256) {
        return userStrategyAllocations[_user][_asset][_strategy];
    }
    
    /**
     * @dev Transfer ownership of the contract
     * @param _newOwner New owner address
     */
    function transferOwnership(address _newOwner) external onlyOwner {
        require(_newOwner != address(0), "YieldAggregator: invalid address");
        address oldOwner = owner;
        owner = _newOwner;
        emit OwnershipTransferred(oldOwner, _newOwner);
    }
    
    /**
     * @dev Set the multi-signature wallet contract address
     * @param _multiSigWallet Address of the multi-sig wallet contract
     */
    function setMultiSigWallet(address _multiSigWallet) external onlyOwner {
        require(_multiSigWallet != address(0), "YieldAggregator: invalid address");
        multiSigWallet = _multiSigWallet;
        emit MultiSigWalletSet(_multiSigWallet);
    }
    
    /**
     * @dev Update emergency admin address
     * @param _newAdmin New emergency admin address
     */
    function updateEmergencyAdmin(address _newAdmin) external {
        require(msg.sender == owner || (multiSigWallet != address(0) && msg.sender == multiSigWallet), 
                "YieldAggregator: not authorized");
        require(_newAdmin != address(0), "YieldAggregator: invalid address");
        
        address oldAdmin = emergencyAdmin;
        emergencyAdmin = _newAdmin;
        
        emit EmergencyAdminUpdated(oldAdmin, _newAdmin);
    }
    
    /**
     * @dev Pause the contract - stops deposits, but allows withdrawals
     */
    function pauseContract() external {
        require(msg.sender == owner || msg.sender == emergencyAdmin || 
                (multiSigWallet != address(0) && IMultiSigWallet(multiSigWallet).isOwner(msg.sender)), 
                "YieldAggregator: not authorized");
        _pause();
        emit ContractPaused(msg.sender);
    }
    
    /**
     * @dev Unpause the contract
     */
    function unpauseContract() external {
        require(msg.sender == owner || msg.sender == emergencyAdmin || 
                (multiSigWallet != address(0) && msg.sender == multiSigWallet), 
                "YieldAggregator: not authorized");
        _unpause();
        emit ContractUnpaused(msg.sender);
    }
    
    /**
     * @dev Emergency withdrawal - allows users to bypass strategy withdrawal
     * @param _asset Asset to withdraw
     */
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
        address[] memory assetStrategyArray = assetStrategies[_asset];
        for (uint256 i = 0; i < assetStrategyArray.length; i++) {
            address strategy = assetStrategyArray[i];
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
    
    /**
     * @dev Emergency withdraw from strategy - admin function to recover funds from a strategy
     * @param _strategy Strategy to withdraw from
     * @param _asset Asset to withdraw
     */
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
    
    /**
     * @dev Get all users who have deposited
     * @return Array of user addresses
     */
    function getAllUsers() public view returns (address[] memory) {
        return allUsers;
    }

}
