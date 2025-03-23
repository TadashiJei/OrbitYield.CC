// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./interfaces/IYieldStrategy.sol";
import "./strategies/LendingStrategy.sol";
import "./strategies/FarmingStrategy.sol";
import "./strategies/LiquidityStrategy.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

interface IMultiSigWallet {
    function isOwner(address owner) external view returns (bool);
}

/**
 * @title StrategyFactory
 * @dev Factory contract for deploying and managing yield strategies
 */
contract StrategyFactory is Ownable, ReentrancyGuard {
    // YieldAggregator address
    address public aggregator;
    
    // MultiSigWallet address
    address public multiSigWallet;
    
    // Strategy types
    enum StrategyType { LENDING, FARMING, LIQUIDITY }
    
    // Mapping of deployed strategies
    mapping(StrategyType => address[]) public deployedStrategies;
    
    // Strategy registry - maps strategy address to its type and metadata
    mapping(address => bool) public registeredStrategies;
    mapping(address => StrategyType) public strategyTypes;
    mapping(address => string) public strategyNames;
    
    // Events
    event StrategyDeployed(address strategy, StrategyType strategyType, string name);
    event AggregatorUpdated(address oldAggregator, address newAggregator);
    event MultiSigWalletUpdated(address oldWallet, address newWallet);
    event StrategyRegistered(address strategy, StrategyType strategyType);
    event BatchDeploymentStarted(uint256 count, StrategyType strategyType);
    event BatchDeploymentCompleted(uint256 count, StrategyType strategyType);
    
    /**
     * @dev Constructor sets the aggregator address
     * @param _aggregator Address of the YieldAggregator contract
     * @param _multiSigWallet Address of the MultiSigWallet contract
     */
    constructor(address _aggregator, address _multiSigWallet) {
        require(_aggregator != address(0), "StrategyFactory: invalid aggregator address");
        aggregator = _aggregator;
        
        if (_multiSigWallet != address(0)) {
            multiSigWallet = _multiSigWallet;
        }
    }
    
    /**
     * @dev Deploy a new lending strategy
     * @param _name Name of the strategy
     * @param _protocol Protocol name (e.g., "Aave on Polkadot")
     * @return Address of the deployed strategy
     */
    function deployLendingStrategy(string memory _name, string memory _protocol) external onlyAuthorized nonReentrant returns (address) {
        LendingStrategy strategy = new LendingStrategy(aggregator);
        
        // Set custom name and protocol
        strategy.setName(_name);
        strategy.setProtocol(_protocol);
        
        // Transfer ownership to the caller
        strategy.transferOwnership(owner());
        
        // Register the deployed strategy
        deployedStrategies[StrategyType.LENDING].push(address(strategy));
        
        emit StrategyDeployed(address(strategy), StrategyType.LENDING, _name);
        return address(strategy);
    }
    
    /**
     * @dev Deploy a new farming strategy
     * @param _name Name of the strategy
     * @param _protocol Protocol name (e.g., "HydraDX on Polkadot")
     * @return Address of the deployed strategy
     */
    function deployFarmingStrategy(string memory _name, string memory _protocol) external onlyAuthorized nonReentrant returns (address) {
        FarmingStrategy strategy = new FarmingStrategy(aggregator);
        
        // Set custom name and protocol
        strategy.setName(_name);
        strategy.setProtocol(_protocol);
        
        // Transfer ownership to the caller
        strategy.transferOwnership(owner());
        
        // Register the deployed strategy
        deployedStrategies[StrategyType.FARMING].push(address(strategy));
        
        emit StrategyDeployed(address(strategy), StrategyType.FARMING, _name);
        return address(strategy);
    }
    
    /**
     * @dev Deploy a new liquidity strategy
     * @param _name Name of the strategy
     * @param _protocol Protocol name (e.g., "Acala DEX on Polkadot")
     * @return Address of the deployed strategy
     */
    function deployLiquidityStrategy(string memory _name, string memory _protocol) external onlyAuthorized nonReentrant returns (address) {
        LiquidityStrategy strategy = new LiquidityStrategy(aggregator);
        
        // Set custom name and protocol
        strategy.setName(_name);
        strategy.setProtocol(_protocol);
        
        // Transfer ownership to the caller
        strategy.transferOwnership(owner());
        
        // Register the deployed strategy
        deployedStrategies[StrategyType.LIQUIDITY].push(address(strategy));
        
        emit StrategyDeployed(address(strategy), StrategyType.LIQUIDITY, _name);
        return address(strategy);
    }
    
    /**
     * @dev Update the aggregator address
     * @param _newAggregator New aggregator address
     */
    function updateAggregator(address _newAggregator) external onlyOwner {
        require(_newAggregator != address(0), "StrategyFactory: invalid aggregator address");
        
        emit AggregatorUpdated(aggregator, _newAggregator);
        aggregator = _newAggregator;
    }
    
    /**
     * @dev Set the multi-signature wallet address
     * @param _multiSigWallet Address of the multi-sig wallet contract
     */
    function setMultiSigWallet(address _multiSigWallet) external onlyOwner {
        require(_multiSigWallet != address(0), "StrategyFactory: invalid address");
        
        emit MultiSigWalletUpdated(multiSigWallet, _multiSigWallet);
        multiSigWallet = _multiSigWallet;
    }
    
    /**
     * @dev Batch deploy multiple strategies of the same type
     * @param _type Strategy type to deploy
     * @param _names Array of strategy names
     * @param _protocols Array of protocol names
     * @return Array of deployed strategy addresses
     */
    function batchDeployStrategies(
        StrategyType _type, 
        string[] memory _names, 
        string[] memory _protocols
    ) external onlyOwner nonReentrant returns (address[] memory) {
        require(_names.length == _protocols.length, "StrategyFactory: arrays length mismatch");
        require(_names.length > 0, "StrategyFactory: empty arrays");
        
        emit BatchDeploymentStarted(_names.length, _type);
        
        address[] memory deployedAddresses = new address[](_names.length);
        
        for (uint256 i = 0; i < _names.length; i++) {
            if (_type == StrategyType.LENDING) {
                deployedAddresses[i] = _deployLendingStrategy(_names[i], _protocols[i]);
            } else if (_type == StrategyType.FARMING) {
                deployedAddresses[i] = _deployFarmingStrategy(_names[i], _protocols[i]);
            } else if (_type == StrategyType.LIQUIDITY) {
                deployedAddresses[i] = _deployLiquidityStrategy(_names[i], _protocols[i]);
            }
        }
        
        emit BatchDeploymentCompleted(_names.length, _type);
        
        return deployedAddresses;
    }
    
    /**
     * @dev Register an existing strategy (useful for manually deployed strategies)
     * @param _strategy Address of the strategy to register
     * @param _type Strategy type
     * @param _name Strategy name
     */
    function registerStrategy(address _strategy, StrategyType _type, string memory _name) external onlyAuthorized {
        require(_strategy != address(0), "StrategyFactory: invalid strategy address");
        require(!registeredStrategies[_strategy], "StrategyFactory: already registered");
        
        registeredStrategies[_strategy] = true;
        strategyTypes[_strategy] = _type;
        strategyNames[_strategy] = _name;
        deployedStrategies[_type].push(_strategy);
        
        emit StrategyRegistered(_strategy, _type);
    }
    
    /**
     * @dev Get all deployed strategies of a specific type
     * @param _type Strategy type
     * @return Array of strategy addresses
     */
    function getDeployedStrategies(StrategyType _type) external view returns (address[] memory) {
        return deployedStrategies[_type];
    }
    
    /**
     * @dev Get count of deployed strategies of a specific type
     * @param _type Strategy type
     * @return Count of strategies
     */
    function getStrategyCount(StrategyType _type) external view returns (uint256) {
        return deployedStrategies[_type].length;
    }
    
    /**
     * @dev Get all deployed strategies across all types
     * @return All strategy addresses across all types
     */
    function getAllStrategies() external view returns (address[] memory) {
        uint256 lendingCount = deployedStrategies[StrategyType.LENDING].length;
        uint256 farmingCount = deployedStrategies[StrategyType.FARMING].length;
        uint256 liquidityCount = deployedStrategies[StrategyType.LIQUIDITY].length;
        uint256 totalCount = lendingCount + farmingCount + liquidityCount;
        
        address[] memory allStrategies = new address[](totalCount);
        uint256 index = 0;
        
        for (uint256 i = 0; i < lendingCount; i++) {
            allStrategies[index++] = deployedStrategies[StrategyType.LENDING][i];
        }
        
        for (uint256 i = 0; i < farmingCount; i++) {
            allStrategies[index++] = deployedStrategies[StrategyType.FARMING][i];
        }
        
        for (uint256 i = 0; i < liquidityCount; i++) {
            allStrategies[index++] = deployedStrategies[StrategyType.LIQUIDITY][i];
        }
        
        return allStrategies;
    }
    
    /**
     * @dev Check if caller is authorized (owner or multisig wallet)
     */
    modifier onlyAuthorized() {
        bool isMultiSigOwner = multiSigWallet != address(0) && 
                              IMultiSigWallet(multiSigWallet).isOwner(msg.sender);
        
        require(owner() == msg.sender || isMultiSigOwner, "StrategyFactory: not authorized");
        _;
    }
    
    /**
     * @dev Internal function to deploy a lending strategy
     */
    function _deployLendingStrategy(string memory _name, string memory _protocol) internal returns (address) {
        LendingStrategy strategy = new LendingStrategy(aggregator);
        
        // Set custom name and protocol
        strategy.setName(_name);
        strategy.setProtocol(_protocol);
        
        // Transfer ownership to the caller
        strategy.transferOwnership(owner());
        
        // Register the deployed strategy
        address strategyAddress = address(strategy);
        deployedStrategies[StrategyType.LENDING].push(strategyAddress);
        registeredStrategies[strategyAddress] = true;
        strategyTypes[strategyAddress] = StrategyType.LENDING;
        strategyNames[strategyAddress] = _name;
        
        emit StrategyDeployed(strategyAddress, StrategyType.LENDING, _name);
        return strategyAddress;
    }
    
    /**
     * @dev Internal function to deploy a farming strategy
     */
    function _deployFarmingStrategy(string memory _name, string memory _protocol) internal returns (address) {
        FarmingStrategy strategy = new FarmingStrategy(aggregator);
        
        // Set custom name and protocol
        strategy.setName(_name);
        strategy.setProtocol(_protocol);
        
        // Transfer ownership to the caller
        strategy.transferOwnership(owner());
        
        // Register the deployed strategy
        address strategyAddress = address(strategy);
        deployedStrategies[StrategyType.FARMING].push(strategyAddress);
        registeredStrategies[strategyAddress] = true;
        strategyTypes[strategyAddress] = StrategyType.FARMING;
        strategyNames[strategyAddress] = _name;
        
        emit StrategyDeployed(strategyAddress, StrategyType.FARMING, _name);
        return strategyAddress;
    }
    
    /**
     * @dev Internal function to deploy a liquidity strategy
     */
    function _deployLiquidityStrategy(string memory _name, string memory _protocol) internal returns (address) {
        LiquidityStrategy strategy = new LiquidityStrategy(aggregator);
        
        // Set custom name and protocol
        strategy.setName(_name);
        strategy.setProtocol(_protocol);
        
        // Transfer ownership to the caller
        strategy.transferOwnership(owner());
        
        // Register the deployed strategy
        address strategyAddress = address(strategy);
        deployedStrategies[StrategyType.LIQUIDITY].push(strategyAddress);
        registeredStrategies[strategyAddress] = true;
        strategyTypes[strategyAddress] = StrategyType.LIQUIDITY;
        strategyNames[strategyAddress] = _name;
        
        emit StrategyDeployed(strategyAddress, StrategyType.LIQUIDITY, _name);
        return strategyAddress;
    }
}
