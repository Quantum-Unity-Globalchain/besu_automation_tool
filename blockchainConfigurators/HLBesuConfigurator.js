const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const armTemplatePath = path.join(__dirname, 'armTemplates', 'networkResources.json');
const nodeConfigTemplatePath = path.join(__dirname, 'templates', 'nodeConfigTemplate.json');

class NetworkConfigurator {
  constructor(azureCredentials, resourceGroupName) {
    this.azureCredentials = azureCredentials;
    this.resourceGroupName = resourceGroupName;
  }

  async deployNetworkResources(virtualNetworkName, addressPrefix, subnetName, subnetPrefix, networkSecurityGroupName, allowSSHRuleName, sshSourceAddressPrefix) {
    const armTemplate = JSON.parse(fs.readFileSync(armTemplatePath, 'utf8'));
    armTemplate.parameters.virtualNetworkName.value = virtualNetworkName;
    armTemplate.parameters.addressPrefix.value = addressPrefix;
    armTemplate.parameters.subnetName.value = subnetName;
    armTemplate.parameters.subnetPrefix.value = subnetPrefix;
    armTemplate.parameters.networkSecurityGroupName.value = networkSecurityGroupName;
    armTemplate.parameters.allowSSHRuleName.value = allowSSHRuleName;
    armTemplate.parameters.sshSourceAddressPrefix.value = sshSourceAddressPrefix;

    // Deploy ARM template using Azure CLI
    const deploymentCommand = `az deployment group create --resource-group ${this.resourceGroupName} --template-file ${armTemplatePath} --parameters @${armTemplatePath}`;
    exec(deploymentCommand, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error deploying network resources: ${error}`);
        return;
      }
      console.log(`Network resources deployed successfully: ${stdout}`);
    });
  }

  configureNode(nodeConfig) {
    const nodeConfigTemplate = JSON.parse(fs.readFileSync(nodeConfigTemplatePath, 'utf8'));
    nodeConfigTemplate.node.id = nodeConfig.id;
    nodeConfigTemplate.node.name = nodeConfig.name;
    nodeConfigTemplate.node.role = nodeConfig.role;
    nodeConfigTemplate.node.consensusMechanism = nodeConfig.consensusMechanism;
    nodeConfigTemplate.node.permissioned = nodeConfig.permissioned;
    nodeConfigTemplate.node.networking.ip = nodeConfig.ip;
    nodeConfigTemplate.node.networking.port = nodeConfig.port;
    nodeConfigTemplate.node.networking.enodeURL = nodeConfig.enodeURL;
    nodeConfigTemplate.node.key.publicKey = nodeConfig.publicKey;
    nodeConfigTemplate.node.key.privateKey = nodeConfig.privateKey;
    nodeConfigTemplate.node.genesis.path = nodeConfig.genesisPath;
    nodeConfigTemplate.node.config.dataPath = nodeConfig.dataPath;
    nodeConfigTemplate.node.config.loggingLevel = nodeConfig.loggingLevel;
    nodeConfigTemplate.node.config.extraData = nodeConfig.extraData;
    nodeConfigTemplate.node.config.gasLimit = nodeConfig.gasLimit;

    const nodeConfigPath = path.join(__dirname, 'nodeConfigs', `${nodeConfig.name}.json`);
    fs.writeFileSync(nodeConfigPath, JSON.stringify(nodeConfigTemplate, null, 2));
    console.log(`Node configuration for ${nodeConfig.name} generated successfully.`);
  }
}

module.exports = HLBesuConfigurator;
