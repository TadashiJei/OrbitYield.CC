// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title SimplifiedStrategyFactory
 * @dev A stripped-down version of StrategyFactory to test deployment
 */
contract SimplifiedStrategyFactory is Ownable {
    // YieldAggregator address
    address public aggregator;
    
    // MultiSigWallet address
    address public multiSigWallet;
    
    // Events
    event AggregatorUpdated(address oldAggregator, address newAggregator);
    event MultiSigWalletUpdated(address oldWallet, address newWallet);
    
    /**
     * @dev Constructor sets the aggregator address
     * @param _aggregator Address of the YieldAggregator contract
     * @param _multiSigWallet Address of the MultiSigWallet contract
     */
    constructor(address _aggregator, address _multiSigWallet) {
        require(_aggregator != address(0), "SimplifiedStrategyFactory: invalid aggregator address");
        aggregator = _aggregator;
        
        if (_multiSigWallet != address(0)) {
            multiSigWallet = _multiSigWallet;
        }
    }
    
    /**
     * @dev Update the aggregator address
     * @param _newAggregator New aggregator address
     */
    function setAggregator(address _newAggregator) external onlyOwner {
        require(_newAggregator != address(0), "SimplifiedStrategyFactory: invalid address");
        
        emit AggregatorUpdated(aggregator, _newAggregator);
        aggregator = _newAggregator;
    }
    
    /**
     * @dev Update the multi-sig wallet address
     * @param _multiSigWallet Address of the multi-sig wallet contract
     */
    function setMultiSigWallet(address _multiSigWallet) external onlyOwner {
        require(_multiSigWallet != address(0), "SimplifiedStrategyFactory: invalid address");
        
        emit MultiSigWalletUpdated(multiSigWallet, _multiSigWallet);
        multiSigWallet = _multiSigWallet;
    }
}
