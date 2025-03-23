// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./LendingStrategyFactory.sol";
import "./FarmingStrategyFactory.sol";
import "./LiquidityStrategyFactory.sol";

/**
 * @title MasterStrategyFactory
 * @dev Coordinator contract for all strategy factories
 */
contract MasterStrategyFactory is Ownable, ReentrancyGuard {
    // Sub-factories
    LendingStrategyFactory public lendingFactory;
    FarmingStrategyFactory public farmingFactory;
    LiquidityStrategyFactory public liquidityFactory;
    
    // Aggregator address
    address public aggregator;
    
    // MultiSigWallet address
    address public multiSigWallet;
    
    // Events
    event FactoriesInitialized(address lendingFactory, address farmingFactory, address liquidityFactory);
    event FactoryUpdated(string factoryType, address oldFactory, address newFactory);
    
    /**
     * @dev Constructor sets up the master factory
     * @param _aggregator Address of the YieldAggregator contract
     * @param _multiSigWallet Address of the MultiSigWallet contract
     */
    constructor(address _aggregator, address _multiSigWallet) {
        require(_aggregator != address(0), "MasterStrategyFactory: invalid aggregator address");
        aggregator = _aggregator;
        
        if (_multiSigWallet != address(0)) {
            multiSigWallet = _multiSigWallet;
        }
        
        // Deploy sub-factories
        lendingFactory = new LendingStrategyFactory(_aggregator, _multiSigWallet);
        farmingFactory = new FarmingStrategyFactory(_aggregator, _multiSigWallet);
        liquidityFactory = new LiquidityStrategyFactory(_aggregator, _multiSigWallet);
        
        emit FactoriesInitialized(
            address(lendingFactory),
            address(farmingFactory),
            address(liquidityFactory)
        );
    }
    
    /**
     * @dev Deploy a lending strategy
     * @param _name Strategy name
     * @param _protocol Protocol name
     * @param _asset Asset address
     * @return Address of the deployed strategy
     */
    function deployLendingStrategy(
        string memory _name,
        string memory _protocol,
        address _asset,
        address _lendingPool,
        uint256 _initialAPY
    ) external onlyOwner nonReentrant returns (address) {
        return lendingFactory.deployLendingStrategy(_name, _protocol, _asset, _lendingPool, _initialAPY);
    }
    
    /**
     * @dev Deploy a farming strategy
     * @param _name Strategy name
     * @param _protocol Protocol name
     * @param _asset Asset address
     * @param _rewardToken Reward token address
     * @return Address of the deployed strategy
     */
    function deployFarmingStrategy(
        string memory _name,
        string memory _protocol,
        address _asset,
        address _farmPool,
        address _rewardToken,
        uint256 _initialAPY
    ) external onlyOwner nonReentrant returns (address) {
        return farmingFactory.deployFarmingStrategy(
            _name, 
            _protocol, 
            _asset, 
            _farmPool, 
            _rewardToken, 
            _initialAPY
        );
    }
    
    /**
     * @dev Deploy a liquidity strategy
     * @param _name Strategy name
     * @param _protocol Protocol name
     * @param _assetA First asset in the pair
     * @param _assetB Second asset in the pair
     * @return Address of the deployed strategy
     */
    function deployLiquidityStrategy(
        string memory _name,
        string memory _protocol,
        address _assetA,
        address _assetB,
        address _lpToken,
        uint256 _initialAPY
    ) external onlyOwner nonReentrant returns (address) {
        return liquidityFactory.deployLiquidityStrategy(_name, _protocol, _assetA, _assetB, _lpToken, _initialAPY);
    }
    
    /**
     * @dev Set a new lending factory
     * @param _newFactory Address of the new lending factory
     */
    function setLendingFactory(address _newFactory) external onlyOwner {
        require(_newFactory != address(0), "MasterStrategyFactory: invalid factory address");
        address oldFactory = address(lendingFactory);
        lendingFactory = LendingStrategyFactory(_newFactory);
        emit FactoryUpdated("lending", oldFactory, _newFactory);
    }
    
    /**
     * @dev Set a new farming factory
     * @param _newFactory Address of the new farming factory
     */
    function setFarmingFactory(address _newFactory) external onlyOwner {
        require(_newFactory != address(0), "MasterStrategyFactory: invalid factory address");
        address oldFactory = address(farmingFactory);
        farmingFactory = FarmingStrategyFactory(_newFactory);
        emit FactoryUpdated("farming", oldFactory, _newFactory);
    }
    
    /**
     * @dev Set a new liquidity factory
     * @param _newFactory Address of the new liquidity factory
     */
    function setLiquidityFactory(address _newFactory) external onlyOwner {
        require(_newFactory != address(0), "MasterStrategyFactory: invalid factory address");
        address oldFactory = address(liquidityFactory);
        liquidityFactory = LiquidityStrategyFactory(_newFactory);
        emit FactoryUpdated("liquidity", oldFactory, _newFactory);
    }
    
    /**
     * @dev Get all deployed strategies from all factories
     * @return lending Array of lending strategy addresses
     * @return farming Array of farming strategy addresses
     * @return liquidity Array of liquidity strategy addresses
     */
    function getAllStrategies() external view returns (
        address[] memory lending,
        address[] memory farming,
        address[] memory liquidity
    ) {
        lending = lendingFactory.getAllLendingStrategies();
        farming = farmingFactory.getAllFarmingStrategies();
        liquidity = liquidityFactory.getAllLiquidityStrategies();
        return (lending, farming, liquidity);
    }
    
    /**
     * @dev Get strategy counts from all factories
     * @return lendingCount Number of lending strategies
     * @return farmingCount Number of farming strategies
     * @return liquidityCount Number of liquidity strategies
     */
    function getStrategyCounts() external view returns (
        uint256 lendingCount,
        uint256 farmingCount,
        uint256 liquidityCount
    ) {
        lendingCount = lendingFactory.getLendingStrategyCount();
        farmingCount = farmingFactory.getFarmingStrategyCount();
        liquidityCount = liquidityFactory.getLiquidityStrategyCount();
        return (lendingCount, farmingCount, liquidityCount);
    }
    
    /**
     * @dev Pause all factory operations
     */
    function pauseAllFactories() external onlyOwner {
        lendingFactory.pauseFactory();
        farmingFactory.pauseFactory();
        liquidityFactory.pauseFactory();
    }
    
    /**
     * @dev Unpause all factory operations
     */
    function unpauseAllFactories() external onlyOwner {
        lendingFactory.unpauseFactory();
        farmingFactory.unpauseFactory();
        liquidityFactory.unpauseFactory();
    }
}
