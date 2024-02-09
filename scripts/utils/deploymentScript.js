const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const NetworkConfigurator = require('./networkConfigurator');
const azureCredentials = require('./azureCredentials.json'); // Assuming this file contains necessary Azure credentials

// Load ARM templates
const vmSetupTemplatePath = path.join(__dirname, 'armTemplates', 'vmSetup.json');

class DeploymentScript {
  constructor(resourceGroupName) {
    this.resourceGroupName = resourceGroupName;
    this.networkConfigurator = new NetworkConfigurator(azureCredentials, resourceGroupName);
  }

  async deployVMs(vmDetails) {
    for (const vmDetail of vmDetails) {
      const armTemplate = JSON.parse(fs.readFileSync(vmSetupTemplatePath, 'utf8'));
      armTemplate.parameters.vmName.value = vmDetail.name;
      armTemplate.parameters.vmSize.value = vmDetail.size;
      armTemplate.parameters.adminUsername.value = vmDetail.adminUsername;
      armTemplate.parameters.adminPassword.value = vmDetail.adminPassword;
      armTemplate.parameters.networkInterfaceId.value = vmDetail.networkInterfaceId;

      // Deploy ARM template for VM setup using Azure CLI
      const deploymentCommand = `az deployment group create --resource-group ${this.resourceGroupName} --template-file ${vmSetupTemplatePath} --parameters @${vmSetupTemplatePath}`;
      exec(deploymentCommand, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error deploying VM ${vmDetail.name}: ${error}`);
          return;
        }
        console.log(`VM ${vmDetail.name} deployed successfully.`);
      });
    }
  }

  async deployNetworkResources(virtualNetworkName, addressPrefix, subnetName, subnetPrefix, networkSecurityGroupName, allowSSHRuleName, sshSourceAddressPrefix) {
    await this.networkConfigurator.deployNetworkResources(virtualNetworkName, addressPrefix, subnetName, subnetPrefix, networkSecurityGroupName, allowSSHRuleName, sshSourceAddressPrefix);
  }
}

// Example usage
const deploymentScript = new DeploymentScript('yourResourceGroupName');
const vmDetails = [
  {
    name: 'BesuNode1',
    size: 'Standard_DS1_v2',
    adminUsername: 'adminUser',
    adminPassword: 'YourSecurePassword',
    networkInterfaceId: '/subscriptions/yourSubscriptionId/resourceGroups/yourResourceGroupName/providers/Microsoft.Network/networkInterfaces/yourNIC'
  },
  // Add more VMs as needed
];

deploymentScript.deployNetworkResources('yourVNet', '10.0.0.0/16', 'yourSubnet', '10.0.1.0/24', 'yourNSG', 'allowSSH', '0.0.0.0/0')
  .then(() => deploymentScript.deployVMs(vmDetails))
  .catch((error) => console.error(error));

