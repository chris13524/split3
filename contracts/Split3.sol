pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

contract Split3 {
    mapping(address => int) public balances;

    function deposit() public payable {
        balances[msg.sender] += int(msg.value);
    }

    function withdraw(uint amount) public {
        require (amount <= address(this).balance, "Contract does not have enough funds to loan");
        balances[msg.sender] -= int(amount);
        (bool sent, ) = msg.sender.call{value: amount}("");
        require(sent, "Failed to send");
    }
}
