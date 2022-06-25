const { expect } = require("chai");
const { ethers } = require("hardhat");

async function deploy() {
    const Split3 = await ethers.getContractFactory("Split3");
    const split3 = await Split3.deploy();
    await split3.deployed();
    return split3;
}

describe("Split3", function () {
    it("Should return the new greeting once it's changed", async function () {
        const split3 = await deploy();
        expect(await split3.greet()).to.equal("Hello, world!");

        const setGreetingTx = await split3.setGreeting("Hola, mundo!");

        await setGreetingTx.wait();

        expect(await split3.greet()).to.equal("Hola, mundo!");
    });
});
