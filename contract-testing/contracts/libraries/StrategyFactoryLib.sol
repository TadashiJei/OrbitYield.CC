// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * @title StrategyFactoryLib
 * @dev Library with common functions for strategy factory contracts
 */
library StrategyFactoryLib {
    /**
     * @dev Validate inputs for strategy deployment
     * @param _name Strategy name
     * @param _protocol Protocol name
     * @param _asset Asset address
     */
    function validateInputs(
        string memory _name,
        string memory _protocol,
        address _asset
    ) internal pure {
        require(bytes(_name).length > 0, "StrategyFactoryLib: empty name");
        require(bytes(_protocol).length > 0, "StrategyFactoryLib: empty protocol");
        require(_asset != address(0), "StrategyFactoryLib: invalid asset address");
    }

    /**
     * @dev Convert uint256 to string
     * @param _value Value to convert
     * @return String representation of the value
     */
    function uint256ToString(uint256 _value) internal pure returns (string memory) {
        if (_value == 0) {
            return "0";
        }
        
        uint256 temp = _value;
        uint256 digits;
        
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        
        bytes memory buffer = new bytes(digits);
        while (_value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(_value % 10)));
            _value /= 10;
        }
        
        return string(buffer);
    }
}
