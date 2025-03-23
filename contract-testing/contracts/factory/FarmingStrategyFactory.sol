// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./BaseStrategyFactory.sol";
import "../strategies/FarmingStrategy.sol";
import "../libraries/StrategyFactoryLib.sol";

/**
 * @title FarmingStrategyFactory
 * @dev Factory contract for deploying FarmingStrategy contracts
 */
contract FarmingStrategyFactory is BaseStrategyFactory {
    // Deployed farming strategies
    mapping(address => bool) public deployedFarmingStrategies;
    address[] public allFarmingStrategies;
    
    // Events
    event FarmingStrategyDeployed(address strategy, string name, string protocol, address asset);
    
    /**
     * @dev Constructor inherits from BaseStrategyFactory
     * @param _aggregator Address of the YieldAggregator contract
     * @param _multiSigWallet Address of the MultiSigWallet contract
     */
    constructor(address _aggregator, address _multiSigWallet) 
        BaseStrategyFactory(_aggregator, _multiSigWallet) {}
    
    /**
     * @dev Deploy a new FarmingStrategy contract
     * @param _name Strategy name
     * @param _protocol Protocol name
     * @param _asset Asset address for the strategy
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
    ) external onlyAuthorized whenNotPaused nonReentrant returns (address) {
        // Validate inputs
        StrategyFactoryLib.validateInputs(_name, _protocol, _asset);
        require(_farmPool != address(0), "FarmingStrategyFactory: invalid farm pool address");
        require(_rewardToken != address(0), "FarmingStrategyFactory: invalid reward token");
        
        // Deploy FarmingStrategy
        FarmingStrategy farmingStrategy = new FarmingStrategy(aggregator);
        
        // Initialize strategy
        farmingStrategy.setName(_name);
        farmingStrategy.setProtocol(_protocol);
        farmingStrategy.addSupportedAsset(_asset, _farmPool, _rewardToken, _initialAPY);
        
        // Transfer ownership to the YieldAggregator
        farmingStrategy.transferOwnership(aggregator);
        
        // Register strategy
        deployedFarmingStrategies[address(farmingStrategy)] = true;
        allFarmingStrategies.push(address(farmingStrategy));
        
        emit FarmingStrategyDeployed(address(farmingStrategy), _name, _protocol, _asset);
        
        return address(farmingStrategy);
    }
    
    /**
     * @dev Get all farming strategies
     * @return Array of farming strategy addresses
     */
    function getAllFarmingStrategies() external view returns (address[] memory) {
        return allFarmingStrategies;
    }
    
    /**
     * @dev Get the number of farming strategies
     * @return Number of farming strategies
     */
    function getFarmingStrategyCount() external view returns (uint256) {
        return allFarmingStrategies.length;
    }
}
