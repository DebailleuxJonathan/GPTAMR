// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyCrowdsale is Ownable {

    IERC20 public token;
    uint256 public rate;

    constructor(uint256 _rate, address tokenAddress, address initialOwner) Ownable(initialOwner) {
        require(_rate > 0, "Rate is 0");
        rate = _rate;
        token = IERC20(tokenAddress);
    }

    function buyTokens() public payable {
        uint256 tokenAmount = msg.value * rate;
        require(token.balanceOf(address(this)) >= tokenAmount, "Not enough tokens in the reserve");

        token.transfer(msg.sender, tokenAmount);
    }

    function withdrawTokens() public onlyOwner {
        uint256 remainingTokens = token.balanceOf(address(this));
        require(remainingTokens > 0, "No tokens to withdraw");

        token.transfer(owner(), remainingTokens);
    }

    function withdrawEther() public onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No Ether to withdraw");

        payable(owner()).transfer(balance);
    }
}
