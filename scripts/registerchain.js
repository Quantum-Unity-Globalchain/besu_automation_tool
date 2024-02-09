const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  const chainId = 50; // Example Chain ID
  const cscAddress = "0x..."; // Checkpoint Smart Contract Address
  const ZeroEndpoint = await ethers.getContractAt("ZeroEndpoint", "YourZeroEndpointAddress");

  const tx = await ZeroEndpoint.connect(deployer).registerChain(chainId, cscAddress);
  await tx.wait();

  console.log(`Chain registered: ${chainId}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
  