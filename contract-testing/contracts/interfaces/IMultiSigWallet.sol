// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

/**
 * @title IMultiSigWallet
 * @dev Interface for the MultiSigWallet contract
 */
interface IMultiSigWallet {
    /**
     * @dev Check if an address is an owner of the multi-sig wallet
     * @param _owner Address to check
     * @return True if the address is an owner
     */
    function isOwner(address _owner) external view returns (bool);
    
    /**
     * @dev Get the number of confirmations required for a transaction
     * @return Number of required confirmations
     */
    function required() external view returns (uint256);
    
    /**
     * @dev Get the number of owners
     * @return Number of owners
     */
    function getOwnerCount() external view returns (uint256);
}
