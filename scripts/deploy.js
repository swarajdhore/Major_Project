const hre = require("hardhat");

async function main() {
  // const networkName = "myNetwork";
  // // await hre.run("etherscan-verify", { network: networkName });
  // const provider = new hre.ethers.providers.JsonRpcProvider(
  //   hre.network.config[networkName].url
  // );
  const VehicleManagement = await hre.ethers.getContractFactory(
    "VehicleManagement"
    // { provider: provider }
  );
  const vehiclemanagement = await VehicleManagement.deploy();
  await vehiclemanagement.deployed();
  console.log("Library deployed to : ", vehiclemanagement.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
