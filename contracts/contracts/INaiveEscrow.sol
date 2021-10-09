// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;


interface INaiveEscrow {
    event Deposit(address depositor, address receipient, uint256 amount);
    
    event Withdraw(address depositor, address receipient, uint256 amount);
    
    event Unlock(address depositor, address receipient, uint256 amount);
    
    // for taking deposit from depositor
    function deposit(address receipient, uint256 amount) external payable returns(bool);
    
    // for withdraw deposit after 24 hours of deposit
    function withdraw() external returns(bool);
    
    // for disbursement of ether after service by arbitror
    function unlock(address depositor) external returns(bool);
    
}