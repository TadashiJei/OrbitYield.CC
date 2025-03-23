// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

/**
 * @title IYieldStrategy
 * @dev Interface for all yield strategies
 */
interface IYieldStrategy {
    /**
     * @dev Deposit funds into the strategy
     * @param _asset Asset to deposit
     * @param _amount Amount to deposit
     * @return Amount of shares/tokens received
     */
    function deposit(address _asset, uint256 _amount) external returns (uint256);
    
    /**
     * @dev Withdraw funds from the strategy
     * @param _asset Asset to withdraw
     * @param _amount Amount to withdraw
     * @return Amount actually withdrawn
     */
    function withdraw(address _asset, uint256 _amount) external returns (uint256);
    
    /**
     * @dev Get current APY for a specific asset
     * @param _asset Asset address
     * @return Current APY in basis points (1% = 100)
     */
    function getAPY(address _asset) external view returns (uint256);
    
    /**
     * @dev Get total value locked in this strategy
     * @param _asset Asset address
     * @return Total value locked
     */
    function getTVL(address _asset) external view returns (uint256);
    
    /**
     * @dev Check if strategy supports a specific asset
     * @param _asset Asset address
     * @return True if supported
     */
    function supportsAsset(address _asset) external view returns (bool);
    
    /**
     * @dev Get strategy name
     * @return Strategy name
     */
    function getName() external view returns (string memory);
    
    /**
     * @dev Get protocol name (e.g., Aave, Compound)
     * @return Protocol name
     */
    function getProtocol() external view returns (string memory);
    
    /**
     * @dev Harvest yield from the strategy
     * @param _asset Asset to harvest yield for
     * @return Amount of yield harvested
     */
    function harvestYield(address _asset) external returns (uint256);
    
    /**
     * @dev Get pending yield for a specific asset
     * @param _asset Asset address
     * @return Pending yield amount
     */
    function getPendingYield(address _asset) external view returns (uint256);
}
