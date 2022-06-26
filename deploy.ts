import { ethers } from 'hardhat';

async function main() {
  const Split3 = await ethers.getContractFactory("Split3");
  const split3 = await Split3.deploy();

  await split3.deployed();

  console.log("Split3 deployed to:", split3.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
