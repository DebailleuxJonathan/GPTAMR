import {ethers} from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  const MyToken = await ethers.getContractFactory("MyToken");
  const token  = await MyToken.deploy();

  const MyCrowdsale = await ethers.getContractFactory("MyCrowdsale");
  await MyCrowdsale.deploy(1, token.target, deployer.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});