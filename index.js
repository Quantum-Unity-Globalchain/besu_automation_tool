const inquirer = require('inquirer');
const { HLBesuConfigurator } = require('./blockchainConfigurators/HLBesuConfigurator');
const { XDCZeroConfigurator } = require('./blockchainConfigurators/XDCZeroConfigurator');

async function main() {
  const { blockchainChoice } = await inquirer.prompt([
    {
      type: 'list',
      name: 'blockchainChoice',
      message: 'Select the blockchain to configure:',
      choices: ['Hyperledger Besu', 'XDC Zero', 'Other'],
    },
  ]);

  switch (blockchainChoice) {
    case 'Hyperledger Besu':
      // Call Hyperledger Besu configuration function
      break;
    case 'XDC Zero':
      // Call XDC Zero configuration function
      break;
    case 'Other':
      // Placeholder for future blockchain configurations
      break;
    default:
      console.error('Invalid selection');
  }
}

main().catch((error) => console.error('An error occurred:', error));