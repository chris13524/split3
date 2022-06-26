pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

contract Split3 {
    mapping(address => int) public balances;
    address[] public members;

    function addMember(address member) public {
        members.push(member);
    }

    function getMembers() public view returns (address[] memory) {
        return members;
    }

    // Deposit into the contract to enable paying ahead on your debt. Also enables others to take loans
    function deposit() public payable {
        balances[msg.sender] += int(msg.value);
    }

    // Take loans, pay back with deposit()
    function withdraw(uint amount) public {
        require(amount <= address(this).balance, "Contract does not have enough funds to loan");
        balances[msg.sender] -= int(amount);
        (bool sent, ) = msg.sender.call{value: amount}("");
        require(sent, "Failed to send");
    }

    // Track debt transactions between two partites
    function adjust(address debtor, address payer, int amount) public {
        balances[debtor] -= amount;
        balances[payer] += amount;
    }

    // Settle debt
    function settle(address payable addr) public payable {
        deposit();
        balances[addr] -= int(msg.value);
        (bool sent, ) = addr.call{value: msg.value}("");
        require(sent, "Failed to send");
    }
}
