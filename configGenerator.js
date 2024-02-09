const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');

// Load templates
const genesisTemplate = require('./templates/genesisTemplate.json');
const nodeConfigTemplate = require('./templates/nodeConfigTemplate.json');

// Questions for user input
const questions = [
  {
    type: 'input',
    name: 'networkName',
    message: 'Enter the name of your blockchain network:',
  },
  {
    type: 'list',
    name: 'consensusMechanism',
    message: 'Select the consensus mechanism:',
    choices: ['IBFT', 'PoW', 'Clique'],
  },
  {
    type: 'input',
    name: 'chainId',
    message: 'Enter a unique chain ID:',
  },
  {
    type: 'confirm',
    name: 'permissioned',
    message: 'Is this a permissioned network?',
    default: false,
  },
  {
    type: 'input',
    name: 'numberOfNodes',
    message: 'How many nodes will your network have?',
    validate: function(value) {
      var valid = !isNaN(parseFloat(value));
      return valid || 'Please enter a number';
    },
    filter: Number,
  }
];

// Function to generate configuration files
function generateConfigFiles(answers) {
  // Modify genesis template based on user input
  genesisTemplate.config.chainId = parseInt(answers.chainId, 10);
  genesisTemplate.config.consensus = answers.consensusMechanism;

  // Modify node configuration template based on user input
  nodeConfigTemplate.network.permissioned = answers.permissioned;

  // Save the modified templates
  const genesisPath = path.join(__dirname, 'output', `${answers.networkName}-genesis.json`);
  const nodeConfigPath = path.join(__dirname, 'output', `${answers.networkName}-nodeConfig.json`);

  fs.writeFileSync(genesisPath, JSON.stringify(genesisTemplate, null, 2));
  console.log(`Genesis file generated at: ${genesisPath}`);

  fs.writeFileSync(nodeConfigPath, JSON.stringify(nodeConfigTemplate, null, 2));
  console.log(`Node configuration file generated at: ${nodeConfigPath}`);
}

// Main function to run the generator
async function runGenerator() {
  console.log('Welcome to the Hyperledger Besu Network Configuration Generator');
  
  try {
    const answers = await inquirer.prompt(questions);
    generateConfigFiles(answers);
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

runGenerator();
