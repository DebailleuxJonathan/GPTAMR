import { ethers } from "hardhat";
import { expect } from "chai";

describe("MyCrowdsale", function () {
    let myCrowdsale: any;
    let owner: any;
    let addr1: any;
    let addr2: any;
    let token: any;
    let endTimestamp: number;

    beforeEach(async function () {
        [owner, addr1, addr2] = await ethers.getSigners();

        const Token = await ethers.getContractFactory("MyToken");
        token = await Token.deploy();

        const MyCrowdsaleFactory = await ethers.getContractFactory("MyCrowdsale");
        const currentBlock = await ethers.provider.getBlock('latest');
        const currentTime = currentBlock.timestamp;

        endTimestamp = currentTime + 86400;

        console.log(endTimestamp)

        myCrowdsale = await MyCrowdsaleFactory.deploy(1, token.target, owner.address, endTimestamp);

        await token.transfer(await myCrowdsale.getAddress(), 100);
    });

    describe("Deployment", function () {
        it("Should set the correct owner", async function () {
            expect(await myCrowdsale.owner()).to.equal(owner.address);
        });

        it("Should set the correct rate", async function () {
            expect(await myCrowdsale.rate()).to.equal(1);
        });

        it("Should set the correct token address", async function () {
            expect(await myCrowdsale.token()).to.equal(token.target);
        });

        it("Should set the correct end timestamp", async function () {
            expect(await myCrowdsale.endTimestamp()).to.equal(endTimestamp);
        });
    });

    describe("buyTokens", function () {
        it("Should buy tokens and transfer to the buyer", async function () {
            const buyer = addr1;
            const value = 10; // Wei, assuming rate is 1

            await myCrowdsale.connect(buyer).buyTokens({ value });

            const buyerBalance = await token.balanceOf(buyer)

            expect(buyerBalance).to.equal(value);
        });

        it("Should fail if not enough tokens in the reserve", async function () {
            const value = 1000000; // Wei, assuming rate is 1

            await expect(myCrowdsale.connect(addr1).buyTokens({ value })).to.be.revertedWith("Not enough tokens in the reserve");
        });
    });

    describe("withdrawTokens", function () {
        it("Should withdraw remaining tokens to the owner", async function () {
            const initialBalance = await token.balanceOf(owner);
            await ethers.provider.send("evm_increaseTime", [86400 + 1]);
            await ethers.provider.send("evm_mine");

            expect(initialBalance).to.equal(900);

            await myCrowdsale.withdrawTokens();

            const finalBalance = await token.balanceOf(owner);

            const remainingTokens = await token.balanceOf(await myCrowdsale.getAddress());

            expect(finalBalance).to.equal(1000);
            expect(remainingTokens).to.equal(0);
        });

        it("Should fail to withdraw Tokens before endTimestamp", async function () {
            // Attempt to withdraw Ether before endTimestamp
            await expect(myCrowdsale.withdrawEther()).to.be.revertedWith("Crowdsale not yet ended");
        });

        it("Should fail if no tokens to withdraw", async function () {
            const value = 100;
            await ethers.provider.send("evm_increaseTime", [86400 + 1]);
            await ethers.provider.send("evm_mine");
            await myCrowdsale.connect(addr1).buyTokens({ value });
            await expect(myCrowdsale.withdrawTokens()).to.be.revertedWith("No tokens to withdraw");
        });
    });

    describe("withdrawEther", function () {
        it("Should withdraw remaining Ether to the owner", async function () {
            const initialBalance = await ethers.provider.getBalance(owner);
            await ethers.provider.send("evm_increaseTime", [86400 + 1]);
            await ethers.provider.send("evm_mine");

            console.log('initialBalance : ', initialBalance)
            const contractAddress = await myCrowdsale.getAddress()

            // Send some Ether to the contract
            await owner.sendTransaction({
                to: contractAddress,
                value: 10
            });

            console.log('sendTransaction')

            await myCrowdsale.withdrawEther();

            console.log('withdrawEther')

            const finalBalance = await ethers.provider.getBalance(owner);

            expect(finalBalance).to.be.closeTo(initialBalance, ethers.parseEther("0.01"));
        });

        it("Should fail to withdraw Ether before endTimestamp", async function () {
            // Attempt to withdraw Ether before endTimestamp
            await expect(myCrowdsale.withdrawEther()).to.be.revertedWith("Crowdsale not yet ended");
        });

        it("Should fail if no Ether to withdraw", async function () {
            await ethers.provider.send("evm_increaseTime", [86400 + 1]);
            await ethers.provider.send("evm_mine");
            await expect(myCrowdsale.withdrawEther()).to.be.revertedWith("No Ether to withdraw");
        });
    });
});