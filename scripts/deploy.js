const hre = require("hardhat");

async function main() {
  const VehicleManagement = await hre.ethers.getContractFactory(
    "VehicleManagement"
  );
  const vehiclemanagement = await VehicleManagement.deploy();
  await vehiclemanagement.deployed();
  console.log("Library deployed to : ", vehiclemanagement.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
