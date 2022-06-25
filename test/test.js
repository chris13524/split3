const { expect } = require("chai");
const { ethers } = require("hardhat");

const zero = ethers.utils.parseEther("0");
const one = ethers.utils.parseEther("1.0");
const negOne = ethers.utils.parseEther("-1.0");

async function deploy() {
    const Split3 = await ethers.getContractFactory("Split3");
    const split3 = await Split3.deploy();
    await split3.deployed();
    return split3;
}

async function getOther(contract, index) {
    const otherAddress = (await ethers.getSigners())[index];
    const otherContract = contract.connect(otherAddress);
    return [otherAddress.address, otherContract];
}

async function assertBalances(contract, accountCount) {
    let balance = await ethers.provider.getBalance(contract.address);
    // console.log(`contract balance: ${balance}`);
    for (let i = 1; i <= accountCount; i++) {
        const [addr] = await getOther(contract, i);
        // console.log(`${addr}: ${await contract.balances(addr)}`);
        balance -= await contract.balances(addr);
    }
    // console.log(`should be zero: ${balance}`);
    expect(balance).to.equal(0);
}

describe("Split3", () => {
    it("Split transaction & pay back", async () => {
        const contract = await deploy();
        const [aliceAddr, aliceContract] = await getOther(contract, 1);
        const [bobAddr, bobContract] = await getOther(contract, 2);

        await (await aliceContract.adjust(aliceAddr, bobAddr, one)).wait();
        await assertBalances(contract, 2);
        expect(await aliceContract.balances(aliceAddr)).to.equal(negOne);
        expect(await aliceContract.balances(bobAddr)).to.equal(one);
        expect(await ethers.provider.getBalance(contract.address)).to.equal(zero);

        await (await bobContract.adjust(bobAddr, aliceAddr, one)).wait();
        await assertBalances(contract, 2);
        expect(await bobContract.balances(aliceAddr)).to.equal(zero);
        expect(await bobContract.balances(bobAddr)).to.equal(zero);
        expect(await ethers.provider.getBalance(contract.address)).to.equal(zero);
    });

    it("Deposit & Withdraw", async () => {
        const contract = await deploy();
        const [aliceAddr, aliceContract] = await getOther(contract, 1);

        await (await aliceContract.deposit({ value: one })).wait();
        await assertBalances(contract, 1);
        expect(await aliceContract.balances(aliceAddr)).to.equal(one);
        expect(await ethers.provider.getBalance(contract.address)).to.equal(one);

        await (await aliceContract.withdraw(one)).wait();
        await assertBalances(contract, 1);

        expect(await aliceContract.balances(aliceAddr)).to.equal(zero);
        expect(await ethers.provider.getBalance(contract.address)).to.equal(zero);
    });

    it("Pay ahead", async () => {
        const contract = await deploy();
        const [aliceAddr, aliceContract] = await getOther(contract, 1);
        const [bobAddr, bobContract] = await getOther(contract, 2);

        await (await aliceContract.deposit({ value: one })).wait();
        await assertBalances(contract, 2);
        await (await aliceContract.adjust(aliceAddr, bobAddr, one)).wait();
        await assertBalances(contract, 2);
        expect(await contract.balances(aliceAddr)).to.equal(zero);
        expect(await contract.balances(bobAddr)).to.equal(one);
    });

    it("Split and withdraw", async () => {
        const contract = await deploy();
        const [aliceAddr, aliceContract] = await getOther(contract, 1);
        const [bobAddr, bobContract] = await getOther(contract, 2);

        await (await bobContract.deposit({ value: one })).wait();
        await assertBalances(contract, 2);
        expect(await contract.balances(bobAddr)).to.equal(one);
        expect(await ethers.provider.getBalance(contract.address)).to.equal(one);

        await (await aliceContract.adjust(aliceAddr, bobAddr, one)).wait();
        await assertBalances(contract, 2);
        await (await aliceContract.withdraw(one)).wait();
        await assertBalances(contract, 2);
        expect(await contract.balances(aliceAddr)).to.equal(negOne.mul(2));

        await (await aliceContract.deposit({ value: one.mul(3) })).wait();
        await assertBalances(contract, 2);
        expect(await contract.balances(aliceAddr)).to.equal(one);
        expect(await contract.balances(bobAddr)).to.equal(one.mul(2));
    });

    it("Settle debt", async () => {
        const contract = await deploy();
        const [aliceAddr, aliceContract] = await getOther(contract, 1);
        const [bobAddr, bobContract] = await getOther(contract, 2);

        await (await aliceContract.adjust(bobAddr, aliceAddr, one)).wait();
        await assertBalances(contract, 2);
        expect(await contract.balances(aliceAddr)).to.equal(one);
        expect(await contract.balances(bobAddr)).to.equal(negOne);

        await (await bobContract.settle(aliceAddr, { value: one })).wait();
        await assertBalances(contract, 2);
        expect(await contract.balances(aliceAddr)).to.equal(zero);
        expect(await contract.balances(bobAddr)).to.equal(zero);
        // expect(await ethers.provider.getBalance(aliceAddr)).to.equal(one.mul(10001)); // FIXME these assertions are flaky since gas prices affect the balance
        // expect(await ethers.provider.getBalance(bobAddr)).to.equal(one.mul(9999));
    });

    it("Simplified debt", async () => {
        const contract = await deploy();
        const [aliceAddr, aliceContract] = await getOther(contract, 1);
        const [bobAddr, bobContract] = await getOther(contract, 2);
        const [charlieAddr, charlieContract] = await getOther(contract, 2);

        await (await aliceContract.adjust(bobAddr, aliceAddr, one)).wait();
        await assertBalances(contract, 2);

        await (await bobContract.adjust(charlieAddr, bobAddr, one)).wait();
        await assertBalances(contract, 2);

        await (await charlieContract.settle(aliceAddr, { value: one })).wait();
        await assertBalances(contract, 2);
        expect(await contract.balances(aliceAddr)).to.equal(zero);
        expect(await contract.balances(bobAddr)).to.equal(zero);
        expect(await contract.balances(charlieAddr)).to.equal(zero);
    });
});
