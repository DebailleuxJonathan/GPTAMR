import {ethers} from "hardhat";

async function main() {
  const MyToken = await ethers.getContractFactory("MyToken");
  await MyToken.deploy(10000000000000000000000); // 10,000 tokens, par exemple
  // console.log("Token deployed to:", myToken.address);
  //
  // const MyCrowdsale = await ethers.getContractFactory("MyCrowdsale");
  // const myCrowdsale = await MyCrowdsale.deploy(1, myToken.address); // Taux de 1 ETH = 1 Token
  //
  // await myCrowdsale.deployed();
  // console.log("Crowdsale deployed to:", myCrowdsale.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});