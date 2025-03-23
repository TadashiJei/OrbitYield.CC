// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "../interfaces/IMultiSigWallet.sol";

/**
 * @title MockMultiSigWallet
 * @dev Mock MultiSigWallet contract for testing
 */
contract MultiSigWallet is IMultiSigWallet {
    address[] public owners;
    uint256 public required;
    address public yieldAggregator;
    
    mapping(address => bool) public isOwnerMapping;
    
    /**
     * @dev Constructor to set up the initial owners and required confirmations
     * @param _owners List of initial owners
     * @param _required Number of required confirmations
     * @param _yieldAggregator Address of the yield aggregator
     */
    constructor(address[] memory _owners, uint256 _required, address _yieldAggregator) {
        require(_owners.length > 0, "MultiSigWallet: owners required");
        require(_required > 0 && _required <= _owners.length, "MultiSigWallet: invalid required number");
        require(_yieldAggregator != address(0), "MultiSigWallet: invalid yield aggregator");
        
        yieldAggregator = _yieldAggregator;
        
        for (uint256 i = 0; i < _owners.length; i++) {
            address owner = _owners[i];
            
            require(owner != address(0), "MultiSigWallet: null owner");
            require(!isOwnerMapping[owner], "MultiSigWallet: duplicate owner");
            
            isOwnerMapping[owner] = true;
            owners.push(owner);
        }
        
        required = _required;
    }
    
    /**
     * @dev Check if an address is an owner
     * @param _owner Address to check
     * @return True if the address is an owner
     */
    function isOwner(address _owner) external view override returns (bool) {
        return isOwnerMapping[_owner];
    }
    
    /**
     * @dev Get the number of owners
     * @return Number of owners
     */
    function getOwnerCount() external view override returns (uint256) {
        return owners.length;
    }
}
