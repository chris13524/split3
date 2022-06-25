const { expect } = require("chai");
const { ethers } = require("hardhat");

const zero = ethers.utils.parseEther("0");
const one = ethers.utils.parseEther("1.0");
const negOne = ethers.utils.parseEther("-1.0")

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
    it("Split transaction & pay back", async () => {
        const split3 = await deploy();

        await (await split3.adjust(await address(), one)).wait();

        expect(await split3.balances(await address())).to.equal(one);
        expect(await ethers.provider.getBalance(split3.address)).to.equal(zero);

        await (await split3.adjust(await address(), negOne)).wait();
        expect(await split3.balances(await address())).to.equal(zero);
        expect(await ethers.provider.getBalance(split3.address)).to.equal(zero);
    });

    it("Deposit & Withdraw", async () => {
        const split3 = await deploy();

        await (await split3.deposit({ value: one })).wait();

        expect(await split3.balances(await address())).to.equal(one);
        expect(await ethers.provider.getBalance(split3.address)).to.equal(one);

        await (await split3.withdraw(one)).wait();

        expect(await split3.balances(await address())).to.equal(zero);
        expect(await ethers.provider.getBalance(split3.address)).to.equal(zero);
    });
});
