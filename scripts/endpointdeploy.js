const { ethers } = require("hardhat");

async function main() {
  const Endpoint = await ethers.getContractFactory("ZeroEndpoint");
  const endpoint = await Endpoint.deploy();

  await endpoint.deployed();

  console.log(`ZeroEndpoint deployed to: ${endpoint.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });