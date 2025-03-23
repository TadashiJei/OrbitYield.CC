// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "../interfaces/IYieldStrategy.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @title FarmingStrategy
 * @dev Strategy for liquidity mining and yield farming on DEXes
 */
contract FarmingStrategy is IYieldStrategy, Ownable, ReentrancyGuard {
    using SafeERC20 for IERC20;
    
    string public name = "Farming Strategy";
    string public protocol = "HydraDX on Polkadot";
    
    /**
     * @dev Set strategy name
     * @param _name New strategy name
     */
    function setName(string memory _name) external onlyOwner {
        name = _name;
    }
    
    /**
     * @dev Set protocol name
     * @param _protocol New protocol name
     */
    function setProtocol(string memory _protocol) external onlyOwner {
        protocol = _protocol;
    }
    
    address public aggregator;
    
    // Supported assets
    mapping(address => bool) public supportedAssets;
    
    // Current APY per asset
    mapping(address => uint256) public currentAPY;
    
    // Farm/Pool address per asset
    mapping(address => address) public farmPools;
    
    // Reward token per farm/asset
    mapping(address => address) public rewardTokens;
    
    // Total value locked per asset
    mapping(address => uint256) public tvlPerAsset;
    
    // User share balances: user => asset => shares
    mapping(address => mapping(address => uint256)) public userShares;
    
    // Total shares per asset
    mapping(address => uint256) public totalShares;
    
    // Last harvest timestamp per asset
    mapping(address => uint256) public lastHarvestTimestamp;
    
    // Events
    event AssetAdded(address asset, address farmPool, address rewardToken);
    event AssetRemoved(address asset);
    event Deposited(address user, address asset, uint256 amount, uint256 shares);
    event Withdrawn(address user, address asset, uint256 amount, uint256 shares);
    event YieldHarvested(address asset, uint256 amount, address rewardToken);
    
    /**
     * @dev Constructor sets the aggregator address
     * @param _aggregator Address of the YieldAggregator contract
     */
    constructor(address _aggregator) {
        require(_aggregator != address(0), "FarmingStrategy: invalid aggregator address");
        aggregator = _aggregator;
    }
    
    /**
     * @dev Modifier to restrict function to aggregator only
     */
    modifier onlyAggregator() {
        require(msg.sender == aggregator, "FarmingStrategy: caller is not the aggregator");
        _;
    }
    
    /**
     * @dev Add a supported asset with its farm pool and reward token
     * @param _asset Address of the asset (token) contract
     * @param _farmPool Address of the farm pool for this asset
     * @param _rewardToken Address of the reward token
     * @param _initialAPY Initial APY in basis points
     */
    function addSupportedAsset(
        address _asset, 
        address _farmPool, 
        address _rewardToken, 
        uint256 _initialAPY
    ) external onlyOwner {
        require(_asset != address(0), "FarmingStrategy: invalid asset address");
        require(_farmPool != address(0), "FarmingStrategy: invalid farm pool address");
        require(_rewardToken != address(0), "FarmingStrategy: invalid reward token address");
        
        supportedAssets[_asset] = true;
        farmPools[_asset] = _farmPool;
        rewardTokens[_asset] = _rewardToken;
        currentAPY[_asset] = _initialAPY;
        lastHarvestTimestamp[_asset] = block.timestamp;
        
        emit AssetAdded(_asset, _farmPool, _rewardToken);
    }
    
    /**
     * @dev Remove a supported asset
     * @param _asset Address of the asset (token) contract
     */
    function removeSupportedAsset(address _asset) external onlyOwner {
        require(supportedAssets[_asset], "FarmingStrategy: asset not supported");
        require(tvlPerAsset[_asset] == 0, "FarmingStrategy: asset has deposits");
        
        supportedAssets[_asset] = false;
        delete farmPools[_asset];
        delete rewardTokens[_asset];
        delete currentAPY[_asset];
        delete lastHarvestTimestamp[_asset];
        
        emit AssetRemoved(_asset);
    }
    
    /**
     * @dev Update APY for an asset (for mock purposes)
     * @param _asset Asset address
     * @param _newAPY New APY in basis points
     */
    function updateAPY(address _asset, uint256 _newAPY) external onlyOwner {
        require(supportedAssets[_asset], "FarmingStrategy: asset not supported");
        currentAPY[_asset] = _newAPY;
    }
    
    /**
     * @dev Calculate shares for a given amount
     * @param _asset Asset address
     * @param _amount Amount of tokens
     * @return Number of shares
     */
    function calculateShares(address _asset, uint256 _amount) public view returns (uint256) {
        if (totalShares[_asset] == 0 || tvlPerAsset[_asset] == 0) {
            return _amount;
        }
        return (_amount * totalShares[_asset]) / tvlPerAsset[_asset];
    }
    
    /**
     * @dev Calculate amount of tokens for given shares
     * @param _asset Asset address
     * @param _shares Number of shares
     * @return Amount of tokens
     */
    function calculateAmount(address _asset, uint256 _shares) public view returns (uint256) {
        if (totalShares[_asset] == 0) {
            return 0;
        }
        return (_shares * tvlPerAsset[_asset]) / totalShares[_asset];
    }
    
    /**
     * @dev Implementation of deposit function from IYieldStrategy
     */
    function deposit(address _asset, uint256 _amount) external override onlyAggregator nonReentrant returns (uint256) {
        require(supportedAssets[_asset], "FarmingStrategy: asset not supported");
        require(_amount > 0, "FarmingStrategy: zero amount");
        
        // Calculate shares
        uint256 shares = calculateShares(_asset, _amount);
        require(shares > 0, "FarmingStrategy: zero shares");
        
        // Update state
        userShares[msg.sender][_asset] += shares;
        totalShares[_asset] += shares;
        tvlPerAsset[_asset] += _amount;
        
        // In a real implementation, we would stake assets in the farm pool here
        // For now, we'll just mock the interaction
        
        emit Deposited(msg.sender, _asset, _amount, shares);
        return shares;
    }
    
    /**
     * @dev Implementation of withdraw function from IYieldStrategy
     */
    function withdraw(address _asset, uint256 _amount) external override onlyAggregator nonReentrant returns (uint256) {
        require(supportedAssets[_asset], "FarmingStrategy: asset not supported");
        require(_amount > 0, "FarmingStrategy: zero amount");
        
        // Calculate shares to burn
        uint256 sharesToBurn = calculateShares(_asset, _amount);
        require(sharesToBurn > 0, "FarmingStrategy: zero shares");
        require(userShares[msg.sender][_asset] >= sharesToBurn, "FarmingStrategy: insufficient shares");
        
        // Update state
        userShares[msg.sender][_asset] -= sharesToBurn;
        totalShares[_asset] -= sharesToBurn;
        tvlPerAsset[_asset] -= _amount;
        
        // In a real implementation, we would unstake assets from the farm pool here
        // For now, we'll just mock the interaction
        
        emit Withdrawn(msg.sender, _asset, _amount, sharesToBurn);
        return _amount;
    }
    
    /**
     * @dev Implementation of getAPY function from IYieldStrategy
     */
    function getAPY(address _asset) external view override returns (uint256) {
        require(supportedAssets[_asset], "FarmingStrategy: asset not supported");
        return currentAPY[_asset];
    }
    
    /**
     * @dev Implementation of getTVL function from IYieldStrategy
     */
    function getTVL(address _asset) external view override returns (uint256) {
        return tvlPerAsset[_asset];
    }
    
    /**
     * @dev Implementation of supportsAsset function from IYieldStrategy
     */
    function supportsAsset(address _asset) external view override returns (bool) {
        return supportedAssets[_asset];
    }
    
    /**
     * @dev Implementation of getName function from IYieldStrategy
     */
    function getName() external view override returns (string memory) {
        return name;
    }
    
    /**
     * @dev Implementation of getProtocol function from IYieldStrategy
     */
    function getProtocol() external view override returns (string memory) {
        return protocol;
    }
    
    /**
     * @dev Implementation of harvestYield function from IYieldStrategy
     */
    function harvestYield(address _asset) external override onlyAggregator returns (uint256) {
        require(supportedAssets[_asset], "FarmingStrategy: asset not supported");
        
        // Calculate time since last harvest
        uint256 timeElapsed = block.timestamp - lastHarvestTimestamp[_asset];
        
        // In a real implementation, this would claim farming rewards from the pool
        // For now, we'll mock the reward calculation
        uint256 rewardAmount = (tvlPerAsset[_asset] * currentAPY[_asset] * timeElapsed) / (10000 * 365 days);
        
        // Update the last harvest timestamp
        lastHarvestTimestamp[_asset] = block.timestamp;
        
        // In a real implementation, we would swap rewards to the original asset
        // and compound it into the strategy
        
        emit YieldHarvested(_asset, rewardAmount, rewardTokens[_asset]);
        return rewardAmount;
    }
    
    /**
     * @dev Implementation of getPendingYield function from IYieldStrategy
     */
    function getPendingYield(address _asset) external view override returns (uint256) {
        require(supportedAssets[_asset], "FarmingStrategy: asset not supported");
        
        // Calculate time since last harvest
        uint256 timeElapsed = block.timestamp - lastHarvestTimestamp[_asset];
        
        // Mock calculation of pending rewards
        return (tvlPerAsset[_asset] * currentAPY[_asset] * timeElapsed) / (10000 * 365 days);
    }
    
    /**
     * @dev Update the aggregator address
     * @param _newAggregator New aggregator address
     */
    function setAggregator(address _newAggregator) external onlyOwner {
        require(_newAggregator != address(0), "FarmingStrategy: invalid aggregator address");
        aggregator = _newAggregator;
    }
    
    /**
     * @dev Get reward token for a specific asset
     * @param _asset Asset address
     * @return Reward token address
     */
    function getRewardToken(address _asset) external view returns (address) {
        require(supportedAssets[_asset], "FarmingStrategy: asset not supported");
        return rewardTokens[_asset];
    }
}
