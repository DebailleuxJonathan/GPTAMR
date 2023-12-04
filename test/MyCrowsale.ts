import {ethers} from "hardhat";
import {expect} from "chai";


describe("MyCrowdsale", function () {
    let myCrowdsale, owner, addr1, token;

    beforeEach(async function () {
        // Setup accounts
        [owner, addr1] = await ethers.getSigners();

        // Deploy the token contract first
        const Token = await ethers.getContractFactory("MyToken");
        token = await Token.deploy();

        // Deploy MyCrowdsale contract
        const MyCrowdsale = await ethers.getContractFactory("MyCrowdsale");
        myCrowdsale = await MyCrowdsale.deploy(1, token.address, owner.address);
    });

    it("Should set the right owner", async function () {
        expect(await myCrowdsale.owner()).to.equal(owner.address);
    });

    it("Should fail if rate is 0", async function () {
        const MyCrowdsale = await ethers.getContractFactory("MyCrowdsale");
        await expect(MyCrowdsale.deploy(0, token.address, owner.address)).to.be.rejectedWith("Rate is 0");
    });

    // Add other constructor tests here
});
