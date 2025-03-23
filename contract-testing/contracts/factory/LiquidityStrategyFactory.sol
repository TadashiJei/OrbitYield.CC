// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./BaseStrategyFactory.sol";
import "../strategies/LiquidityStrategy.sol";
import "../libraries/StrategyFactoryLib.sol";

/**
 * @title LiquidityStrategyFactory
 * @dev Factory contract for deploying LiquidityStrategy contracts
 */
contract LiquidityStrategyFactory is BaseStrategyFactory {
    // Deployed liquidity strategies
    mapping(address => bool) public deployedLiquidityStrategies;
    address[] public allLiquidityStrategies;
    
    // Events
    event LiquidityStrategyDeployed(address strategy, string name, string protocol, address assetA, address assetB);
    
    /**
     * @dev Constructor inherits from BaseStrategyFactory
     * @param _aggregator Address of the YieldAggregator contract
     * @param _multiSigWallet Address of the MultiSigWallet contract
     */
    constructor(address _aggregator, address _multiSigWallet) 
        BaseStrategyFactory(_aggregator, _multiSigWallet) {}
    
    /**
     * @dev Deploy a new LiquidityStrategy contract
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
    ) external onlyAuthorized whenNotPaused nonReentrant returns (address) {
        // Validate inputs
        StrategyFactoryLib.validateInputs(_name, _protocol, _assetA);
        require(_assetB != address(0), "LiquidityStrategyFactory: invalid second asset");
        require(_lpToken != address(0), "LiquidityStrategyFactory: invalid LP token");
        
        // Deploy LiquidityStrategy
        LiquidityStrategy liquidityStrategy = new LiquidityStrategy(aggregator);
        
        // Initialize strategy
        liquidityStrategy.setName(_name);
        liquidityStrategy.setProtocol(_protocol);
        liquidityStrategy.addSupportedAsset(_assetA, _assetB, _lpToken, _initialAPY);
        
        // Transfer ownership to the YieldAggregator
        liquidityStrategy.transferOwnership(aggregator);
        
        // Register strategy
        deployedLiquidityStrategies[address(liquidityStrategy)] = true;
        allLiquidityStrategies.push(address(liquidityStrategy));
        
        emit LiquidityStrategyDeployed(address(liquidityStrategy), _name, _protocol, _assetA, _assetB);
        
        return address(liquidityStrategy);
    }
    
    /**
     * @dev Get all liquidity strategies
     * @return Array of liquidity strategy addresses
     */
    function getAllLiquidityStrategies() external view returns (address[] memory) {
        return allLiquidityStrategies;
    }
    
    /**
     * @dev Get the number of liquidity strategies
     * @return Number of liquidity strategies
     */
    function getLiquidityStrategyCount() external view returns (uint256) {
        return allLiquidityStrategies.length;
    }
}
