const { ethers } = require('ethers');
const fs = require('fs');

const config = require('../config/xdczero/endpointconfig.json');

async function deployContract() {
  const provider = new ethers.providers.JsonRpcProvider(config.rpcUrl);
  // Add your deployment logic here
  console.log('Deploying to', config.networkName);
}

deployContract().catch(console.error);