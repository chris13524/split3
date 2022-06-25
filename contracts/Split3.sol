pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

contract Split3 {
    mapping(address => uint) public balances;

    function deposit() public payable {
        balances[msg.sender] += msg.value;
    }

    function withdraw(uint amount) public {
        require (balances[msg.sender] >= amount, "You do not have enough funds");
        balances[msg.sender] -= amount;
        (bool sent, ) = msg.sender.call{value: amount}("");
        require(sent, "Failed to send");
    }
}
