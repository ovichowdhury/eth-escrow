// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "./INaiveEscrow.sol";


contract NaiveEscrow is INaiveEscrow {
    string private _name;
    
    address private _owner;
    
    address private _arbitror;
    
    struct DepositInfo {
        address receipient;
        uint256 amount;
        uint256 createTime;
    }
    
    mapping(address => DepositInfo) private _deposits;
    
    constructor(string memory name_, address arbitror_) {
        _owner = msg.sender;
        _arbitror = arbitror_;
        _name = name_;
    }
    
    modifier onlyArbitror {
        require(msg.sender == _arbitror, "Unauthorized access denied");
        _;
    }
    
    modifier isEligible {
        uint256 deadline = _deposits[msg.sender].createTime + 24 hours;
        require(_deposits[msg.sender].createTime != 0, "No deposit found");
        require(block.timestamp > deadline, "Can be withdrawn after 24 hours of deposit");
        _;
    }
    
    function name() external view returns(string memory) {
        return _name;
    }
    
    function deposit(address receipient, uint256 amount) external payable override returns(bool) {
        require(receipient != address(0), "Not a valid receipient address");
        require(msg.value == amount, "Not enough ether provided");
        require(_deposits[msg.sender].createTime == 0, "Previous deposit not disbursed yet");
        
        _deposits[msg.sender] = DepositInfo(receipient, msg.value, block.timestamp);
        
        emit Deposit(msg.sender, receipient, msg.value);
        
        return true;
    }
    
    function withdraw() external isEligible override returns(bool) {
        address receipient = _deposits[msg.sender].receipient;
        uint256 amount = _deposits[msg.sender].amount;
        payable(msg.sender).transfer(_deposits[msg.sender].amount);
        _deposits[msg.sender] = DepositInfo(address(0), 0, 0);
        
        emit Withdraw(msg.sender, receipient, amount);
        return true;
    }
    
    function unlock(address depositor) external onlyArbitror override returns(bool) {
        require(depositor != address(0), "Not a valid depositor address");
        require(_deposits[depositor].createTime != 0, "No deposit found");
        
        address payable receipient = payable(_deposits[depositor].receipient);
        uint256 amount = _deposits[depositor].amount;
        receipient.transfer(amount);
        
        _deposits[depositor] = DepositInfo(address(0), 0, 0);
        
        emit Unlock(depositor, receipient, amount);
        return true;
    }
    
    // To view a depositor current deposit
    function depositorInfo(address depositor) external view returns(address receipient, uint256 amount, uint256 createTime) {
        require(depositor != address(0), "Not a valid depositor address");
        receipient = _deposits[depositor].receipient;
        amount = _deposits[depositor].amount;
        createTime = _deposits[depositor].createTime;
    }
    
    // to check the total balance of the contract
    function totalBalance() external view onlyArbitror returns(uint256) {
        return address(this).balance;
    }
    
}