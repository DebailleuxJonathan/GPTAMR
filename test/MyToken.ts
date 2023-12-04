// import {ethers} from "hardhat";
// import {expect} from "chai";
// import {Contract} from "ethers";
//
// describe("MyToken", function () {
//     let MyToken: any;
//     let token;
//     let owner;
//
//     beforeEach(async function () {
//         MyToken = await ethers.getContractFactory("MyToken");
//         [owner] = await ethers.getSigners();
//         token = await MyToken.deploy();
//     });
//
//     describe("Déploiement", function () {
//         it("Doit assigner l'approvisionnement initial total au propriétaire", async function () {
//             const ownerBalance = await token.balanceOf(owner.address);
//             expect(await token.totalSupply()).to.equal(ownerBalance);
//         });
//
//         it("Doit avoir le bon nom et symbole", async function () {
//             expect(await token.name()).to.equal("MyToken");
//             expect(await token.symbol()).to.equal("MTK");
//         });
//     });
// });