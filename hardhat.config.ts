import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  networks: {
    mumbai: {
      chainId: 80001,
      url: `https://polygon-testnet.public.blastapi.io/0xD1C1dC47F3973dC1924E91081509aa32F69c9CaE`,
      accounts: {
        mnemonic: "delay daring people engage goat ghost because elder worry cluster asset ball",
      }
    }
  }
};

export default config;
