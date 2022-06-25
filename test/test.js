const { expect } = require("chai");
const { ethers } = require("hardhat");

async function address() {
    const signer = await ethers.getSigner();
    return await signer.getAddress();
}

async function deploy() {
    const Split3 = await ethers.getContractFactory("Split3");
    const split3 = await Split3.deploy();
    await split3.deployed();
    return split3;
}

describe("Split3", () => {
    it("Deposit & Withdraw", async () => {
        const split3 = await deploy();

        const value = ethers.utils.parseEther("1.0");
        const deposit = await split3.deposit({ value });
        await deposit.wait();

        expect(await split3.balances(await address())).to.equal(value);

        const tx = await split3.withdraw(value);
        await tx.wait();

        expect(await split3.balances(await address())).to.equal(ethers.utils.parseEther("0"));
    });
});
