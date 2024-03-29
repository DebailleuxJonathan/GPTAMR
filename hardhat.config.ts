import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config"

const MUMBAI_URL = process.env.MUMBAI_URL || ""
const PRIVATE_KEY = process.env.PRIVATE_KEY || ""
const config: HardhatUserConfig = {
  solidity: "0.8.20",
  networks: {
    mumbai: {
      chainId: 80001,
      url: MUMBAI_URL,
      accounts: [PRIVATE_KEY],
    }
  },
  sourcify: {
    enabled: true,
  },
  etherscan: {
    apiKey: {
      polygonMumbai: 'U5D55X2HTPWS78KIWNTX8XK5J9AX4UVYU3'
    }
  }

};

export default config;
