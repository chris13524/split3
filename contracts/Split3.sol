pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

contract Split3 {
    string private greeting = "Hello, world!";

    constructor() {
    }

    function greet() public view returns (string memory) {
        return greeting;
    }

    function setGreeting(string memory _greeting) public {
        greeting = _greeting;
    }
}
