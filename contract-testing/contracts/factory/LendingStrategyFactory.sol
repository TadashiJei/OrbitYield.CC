// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./BaseStrategyFactory.sol";
import "../strategies/LendingStrategy.sol";
import "../libraries/StrategyFactoryLib.sol";

/**
 * @title LendingStrategyFactory
 * @dev Factory contract for deploying LendingStrategy contracts
 */
contract LendingStrategyFactory is BaseStrategyFactory {
    // Deployed lending strategies
    mapping(address => bool) public deployedLendingStrategies;
    address[] public allLendingStrategies;
    
    // Events
    event LendingStrategyDeployed(address strategy, string name, string protocol, address asset);
    
    /**
     * @dev Constructor inherits from BaseStrategyFactory
     * @param _aggregator Address of the YieldAggregator contract
     * @param _multiSigWallet Address of the MultiSigWallet contract
     */
    constructor(address _aggregator, address _multiSigWallet) 
        BaseStrategyFactory(_aggregator, _multiSigWallet) {}
    
    /**
     * @dev Deploy a new LendingStrategy contract
     * @param _name Strategy name
     * @param _protocol Protocol name
     * @param _asset Asset address for the strategy
     * @return Address of the deployed strategy
     */
    function deployLendingStrategy(
        string memory _name,
        string memory _protocol,
        address _asset,
        address _lendingPool,
        uint256 _initialAPY
    ) external onlyAuthorized whenNotPaused nonReentrant returns (address) {
        // Validate inputs
        StrategyFactoryLib.validateInputs(_name, _protocol, _asset);
        require(_lendingPool != address(0), "LendingStrategyFactory: invalid lending pool address");
        
        // Deploy LendingStrategy
        LendingStrategy lendingStrategy = new LendingStrategy(aggregator);
        
        // Initialize strategy
        lendingStrategy.setName(_name);
        lendingStrategy.setProtocol(_protocol);
        lendingStrategy.addSupportedAsset(_asset, _lendingPool, _initialAPY);
        
        // Transfer ownership to the YieldAggregator
        lendingStrategy.transferOwnership(aggregator);
        
        // Register strategy
        deployedLendingStrategies[address(lendingStrategy)] = true;
        allLendingStrategies.push(address(lendingStrategy));
        
        emit LendingStrategyDeployed(address(lendingStrategy), _name, _protocol, _asset);
        
        return address(lendingStrategy);
    }
    
    /**
     * @dev Get all lending strategies
     * @return Array of lending strategy addresses
     */
    function getAllLendingStrategies() external view returns (address[] memory) {
        return allLendingStrategies;
    }
    
    /**
     * @dev Get the number of lending strategies
     * @return Number of lending strategies
     */
    function getLendingStrategyCount() external view returns (uint256) {
        return allLendingStrategies.length;
    }
}
