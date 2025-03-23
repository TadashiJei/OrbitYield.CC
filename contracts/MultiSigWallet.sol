// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

/**
 * @title MultiSigWallet
 * @dev Contract for multi-signature functionality for YieldAggregator management
 */
contract MultiSigWallet {
    address public yieldAggregator;
    
    // Mapping of owners
    mapping(address => bool) public isOwner;
    
    // Required number of confirmations for a transaction
    uint256 public requiredConfirmations;
    
    // List of owners
    address[] public owners;
    
    // Transaction structure
    struct Transaction {
        address target;
        uint256 value;
        bytes data;
        bool executed;
        uint256 confirmations;
    }
    
    // Transactions storage
    Transaction[] public transactions;
    
    // Transaction confirmations: tx index => owner => confirmed
    mapping(uint256 => mapping(address => bool)) public isConfirmed;
    
    // Events
    event OwnerAdded(address owner);
    event OwnerRemoved(address owner);
    event RequiredConfirmationsChanged(uint256 required);
    event TransactionSubmitted(uint256 indexed txIndex, address indexed sender, address indexed target, uint256 value, bytes data);
    event TransactionConfirmed(uint256 indexed txIndex, address indexed owner);
    event TransactionExecuted(uint256 indexed txIndex, address indexed executor);
    event TransactionFailed(uint256 indexed txIndex, string reason);
    
    // Modifiers
    modifier onlyOwner() {
        require(isOwner[msg.sender], "MultiSig: not an owner");
        _;
    }
    
    modifier txExists(uint256 _txIndex) {
        require(_txIndex < transactions.length, "MultiSig: tx does not exist");
        _;
    }
    
    modifier notExecuted(uint256 _txIndex) {
        require(!transactions[_txIndex].executed, "MultiSig: tx already executed");
        _;
    }
    
    modifier notConfirmed(uint256 _txIndex) {
        require(!isConfirmed[_txIndex][msg.sender], "MultiSig: tx already confirmed");
        _;
    }
    
    /**
     * @dev Constructor
     * @param _owners Array of initial owners
     * @param _requiredConfirmations Number of required confirmations
     * @param _yieldAggregator YieldAggregator contract address
     */
    constructor(
        address[] memory _owners,
        uint256 _requiredConfirmations,
        address _yieldAggregator
    ) {
        require(_owners.length > 0, "MultiSig: no owners provided");
        require(
            _requiredConfirmations > 0 && _requiredConfirmations <= _owners.length,
            "MultiSig: invalid confirmations"
        );
        require(_yieldAggregator != address(0), "MultiSig: invalid aggregator address");
        
        yieldAggregator = _yieldAggregator;
        
        for (uint256 i = 0; i < _owners.length; i++) {
            address owner = _owners[i];
            
            require(owner != address(0), "MultiSig: invalid owner");
            require(!isOwner[owner], "MultiSig: duplicate owner");
            
            isOwner[owner] = true;
            owners.push(owner);
            
            emit OwnerAdded(owner);
        }
        
        requiredConfirmations = _requiredConfirmations;
    }
    
    /**
     * @dev Submit a transaction
     * @param _target Target contract address
     * @param _value Value in wei to send
     * @param _data Function call data
     * @return Transaction index
     */
    function submitTransaction(
        address _target,
        uint256 _value,
        bytes memory _data
    ) public onlyOwner returns (uint256) {
        uint256 txIndex = transactions.length;
        
        transactions.push(
            Transaction({
                target: _target,
                value: _value,
                data: _data,
                executed: false,
                confirmations: 0
            })
        );
        
        emit TransactionSubmitted(txIndex, msg.sender, _target, _value, _data);
        
        // Automatically confirm the transaction by the submitter
        confirmTransaction(txIndex);
        
        return txIndex;
    }
    
    /**
     * @dev Confirm a pending transaction
     * @param _txIndex Transaction index
     */
    function confirmTransaction(uint256 _txIndex)
        public
        onlyOwner
        txExists(_txIndex)
        notExecuted(_txIndex)
        notConfirmed(_txIndex)
    {
        Transaction storage transaction = transactions[_txIndex];
        transaction.confirmations += 1;
        isConfirmed[_txIndex][msg.sender] = true;
        
        emit TransactionConfirmed(_txIndex, msg.sender);
        
        // Execute if we've reached required confirmations
        if (transaction.confirmations >= requiredConfirmations) {
            executeTransaction(_txIndex);
        }
    }
    
    /**
     * @dev Execute a confirmed transaction
     * @param _txIndex Transaction index
     */
    function executeTransaction(uint256 _txIndex)
        public
        onlyOwner
        txExists(_txIndex)
        notExecuted(_txIndex)
    {
        Transaction storage transaction = transactions[_txIndex];
        
        require(
            transaction.confirmations >= requiredConfirmations,
            "MultiSig: not enough confirmations"
        );
        
        transaction.executed = true;
        
        (bool success, bytes memory returnData) = transaction.target.call{value: transaction.value}(
            transaction.data
        );
        
        if (success) {
            emit TransactionExecuted(_txIndex, msg.sender);
        } else {
            // Extract revert reason if available
            string memory revertReason = "";
            if (returnData.length > 0) {
                // Try to extract the revert string
                (bool extractSuccess, bytes memory extractedData) = address(this).call(
                    abi.encodeWithSignature("getRevertMsg(bytes)", returnData)
                );
                
                if (extractSuccess) {
                    revertReason = abi.decode(extractedData, (string));
                }
            }
            
            emit TransactionFailed(_txIndex, revertReason);
            transaction.executed = false; // Allow retrying the transaction
        }
    }
    
    /**
     * @dev Add a new owner
     * @param _owner New owner address
     */
    function addOwner(address _owner) external {
        // This function should be called via submitTransaction to enforce multi-sig
        require(msg.sender == address(this), "MultiSig: must be called through executeTransaction");
        require(_owner != address(0), "MultiSig: invalid owner");
        require(!isOwner[_owner], "MultiSig: already an owner");
        
        isOwner[_owner] = true;
        owners.push(_owner);
        
        emit OwnerAdded(_owner);
    }
    
    /**
     * @dev Remove an owner
     * @param _owner Owner to remove
     */
    function removeOwner(address _owner) external {
        // This function should be called via submitTransaction to enforce multi-sig
        require(msg.sender == address(this), "MultiSig: must be called through executeTransaction");
        require(isOwner[_owner], "MultiSig: not an owner");
        require(owners.length > requiredConfirmations, "MultiSig: too few owners");
        
        isOwner[_owner] = false;
        
        // Find and remove owner from array
        for (uint256 i = 0; i < owners.length; i++) {
            if (owners[i] == _owner) {
                owners[i] = owners[owners.length - 1];
                owners.pop();
                break;
            }
        }
        
        // Adjust required confirmations if necessary
        if (requiredConfirmations > owners.length) {
            requiredConfirmations = owners.length;
            emit RequiredConfirmationsChanged(requiredConfirmations);
        }
        
        emit OwnerRemoved(_owner);
    }
    
    /**
     * @dev Change the number of required confirmations
     * @param _required New required confirmations
     */
    function changeRequirement(uint256 _required) external {
        // This function should be called via submitTransaction to enforce multi-sig
        require(msg.sender == address(this), "MultiSig: must be called through executeTransaction");
        require(_required > 0, "MultiSig: invalid requirement");
        require(_required <= owners.length, "MultiSig: requirement exceeds owners");
        
        requiredConfirmations = _required;
        emit RequiredConfirmationsChanged(_required);
    }
    
    /**
     * @dev Get owner count
     * @return Number of owners
     */
    function getOwnerCount() external view returns (uint256) {
        return owners.length;
    }
    
    /**
     * @dev Get transaction count
     * @return Number of transactions
     */
    function getTransactionCount() external view returns (uint256) {
        return transactions.length;
    }
    
    /**
     * @dev Get all owners
     * @return Array of owner addresses
     */
    function getOwners() external view returns (address[] memory) {
        return owners;
    }
    
    /**
     * @dev Get transaction details
     * @param _txIndex Transaction index
     * @return target Transaction target
     * @return value Transaction value
     * @return data Transaction data
     * @return executed Transaction execution status
     * @return confirmations Number of confirmations
     */
    function getTransaction(uint256 _txIndex)
        external
        view
        txExists(_txIndex)
        returns (
            address target,
            uint256 value,
            bytes memory data,
            bool executed,
            uint256 confirmations
        )
    {
        Transaction storage transaction = transactions[_txIndex];
        
        return (
            transaction.target,
            transaction.value,
            transaction.data,
            transaction.executed,
            transaction.confirmations
        );
    }
    
    /**
     * @dev Extract revert reason from returnData
     * @param _returnData Return data from failed call
     * @return Revert reason string
     */
    function getRevertMsg(bytes memory _returnData) public pure returns (string memory) {
        // If the _res length is less than 68, then the transaction failed silently (without a revert message)
        if (_returnData.length < 68) return "Transaction reverted silently";
        
        // solhint-disable-next-line no-inline-assembly
        assembly {
            // Slice the sighash (4 bytes)
            _returnData := add(_returnData, 0x04)
        }
        
        return abi.decode(_returnData, (string));
    }
    
    /**
     * @dev Receive function to allow contract to receive ether
     */
    receive() external payable {}
}
