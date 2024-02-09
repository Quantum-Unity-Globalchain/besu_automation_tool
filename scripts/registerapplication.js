const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  const appAddress = "0x..."; // Your application's contract address
  const ZeroEndpoint = await ethers.getContractAt("ZeroEndpoint", "YourZeroEndpointAddress");

  const tx = await ZeroEndpoint.connect(deployer).registerApplication(appAddress);
  await tx.wait();

  console.log(`Application registered: ${appAddress}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });