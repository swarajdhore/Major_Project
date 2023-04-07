require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  // defaultNetwork: "myNetwork",
  networks: {
    hardhat: {
      // url: "http://192.168.29.215:8545",
      chainId: 1337, // We set 1337 to make interacting with MetaMask simpler
    },
    // myNetwork: {
    //   url: "http://192.168.29.215:8545",
    //   chainId: 1337,
    // },
  },
  paths: {
    artifacts: "./client/src/artifacts",
  },
};
