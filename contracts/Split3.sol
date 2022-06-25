pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

contract Split3 {
    mapping(address => int) public balances;

    // Deposit into the contract to enable paying ahead on your debt. Also enables others to take loans
    function deposit() public payable {
        balances[msg.sender] += int(msg.value);
    }

    // Take loans, pay back with deposit()
    function withdraw(uint amount) public {
        require (amount <= address(this).balance, "Contract does not have enough funds to loan");
        balances[msg.sender] -= int(amount);
        (bool sent, ) = msg.sender.call{value: amount}("");
        require(sent, "Failed to send");
    }

    // Track debt transactions
    function adjust(address addr, int amount) public {
        balances[addr] += amount;
    }
}
