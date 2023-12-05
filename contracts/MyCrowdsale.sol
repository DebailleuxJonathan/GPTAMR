// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyCrowdsale is Ownable {

    IERC20 public token;
    uint256 public rate;
    uint256 public endTimestamp;

    constructor(uint256 _rate, address tokenAddress, address initialOwner, uint256 _endTimestamp) Ownable(initialOwner) {
        require(_rate > 0, "Rate is 0");
        require(_endTimestamp > block.timestamp, "End timestamp must be in the future");
        rate = _rate;
        token = IERC20(tokenAddress);
        endTimestamp = _endTimestamp;
    }

    receive() external payable {}

    function buyTokens() public payable {
        uint256 tokenAmount = msg.value * rate;
        require(token.balanceOf(address(this)) >= tokenAmount, "Not enough tokens in the reserve");

        token.transfer(msg.sender, tokenAmount);
    }

    function withdrawTokens() public onlyOwner {
        require(block.timestamp > endTimestamp, "Crowdsale not yet ended");
        uint256 remainingTokens = token.balanceOf(address(this));
        require(remainingTokens > 0, "No tokens to withdraw");

        token.transfer(owner(), remainingTokens);
    }

    function withdrawEther() public onlyOwner {
        require(block.timestamp > endTimestamp, "Crowdsale not yet ended");
        uint256 balance = address(this).balance;
        require(balance > 0, "No Ether to withdraw");

        payable(owner()).transfer(balance);
    }
}
