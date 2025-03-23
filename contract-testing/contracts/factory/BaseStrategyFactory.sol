// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "../interfaces/IMultiSigWallet.sol";
import "../interfaces/IYieldStrategy.sol";

/**
 * @title BaseStrategyFactory
 * @dev Base contract for strategy factories with common functionality
 */
abstract contract BaseStrategyFactory is Ownable, ReentrancyGuard {
    // YieldAggregator address
    address public aggregator;
    
    // MultiSigWallet address
    address public multiSigWallet;
    
    // Whether the factory is paused
    bool public paused;
    
    // Events
    event AggregatorUpdated(address oldAggregator, address newAggregator);
    event MultiSigWalletUpdated(address oldWallet, address newWallet);
    event FactoryPaused(address admin);
    event FactoryUnpaused(address admin);
    
    /**
     * @dev Constructor sets the aggregator address
     * @param _aggregator Address of the YieldAggregator contract
     * @param _multiSigWallet Address of the MultiSigWallet contract
     */
    constructor(address _aggregator, address _multiSigWallet) {
        require(_aggregator != address(0), "BaseStrategyFactory: invalid aggregator address");
        aggregator = _aggregator;
        
        if (_multiSigWallet != address(0)) {
            multiSigWallet = _multiSigWallet;
        }
    }
    
    /**
     * @dev Modifier to restrict function to authorized users only
     */
    modifier onlyAuthorized() {
        bool isMultiSigOwner = multiSigWallet != address(0) && 
                              IMultiSigWallet(multiSigWallet).isOwner(msg.sender);
        
        require(owner() == msg.sender || isMultiSigOwner, "BaseStrategyFactory: not authorized");
        _;
    }
    
    /**
     * @dev Modifier to check if the factory is not paused
     */
    modifier whenNotPaused() {
        require(!paused, "BaseStrategyFactory: paused");
        _;
    }
    
    /**
     * @dev Update the aggregator address
     * @param _newAggregator New aggregator address
     */
    function setAggregator(address _newAggregator) external onlyOwner {
        require(_newAggregator != address(0), "BaseStrategyFactory: invalid address");
        
        emit AggregatorUpdated(aggregator, _newAggregator);
        aggregator = _newAggregator;
    }
    
    /**
     * @dev Update the multi-sig wallet address
     * @param _multiSigWallet Address of the multi-sig wallet contract
     */
    function setMultiSigWallet(address _multiSigWallet) external onlyOwner {
        require(_multiSigWallet != address(0), "BaseStrategyFactory: invalid address");
        
        emit MultiSigWalletUpdated(multiSigWallet, _multiSigWallet);
        multiSigWallet = _multiSigWallet;
    }
    
    /**
     * @dev Pause the factory
     */
    function pauseFactory() external onlyAuthorized {
        paused = true;
        emit FactoryPaused(msg.sender);
    }
    
    /**
     * @dev Unpause the factory
     */
    function unpauseFactory() external onlyAuthorized {
        paused = false;
        emit FactoryUnpaused(msg.sender);
    }
}
