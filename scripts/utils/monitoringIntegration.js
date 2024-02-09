const { exec } = require('child_process');

class MonitoringIntegration {
  constructor(resourceGroupName, azureCredentials) {
    this.resourceGroupName = resourceGroupName;
    this.azureCredentials = azureCredentials;
  }

  // Method to integrate Azure Monitor with the deployed VMs
  async integrateAzureMonitor(vmNames) {
    for (const vmName of vmNames) {
      const command = `az monitor diagnostics settings create --name ${vmName}Diagnostics ` +
                      `--resource ${vmName} --resource-group ${this.resourceGroupName} ` +
                      `--resource-type "Microsoft.Compute/virtualMachines" ` +
                      `--workspace ${this.azureCredentials.logAnalyticsWorkspaceId} ` +
                      `--logs '[{"category": "AllMetrics","enabled": true}]' ` +
                      `--metrics '[{"category": "AllMetrics","enabled": true}]'`;

      exec(command, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error integrating Azure Monitor for VM ${vmName}: ${error}`);
          return;
        }
        console.log(`Azure Monitor integrated successfully for VM ${vmName}.`);
      });
    }
  }

  // Method to setup alerts for the VMs
  async setupAlerts(vmNames) {
    vmNames.forEach(vmName => {
      const alertCommand = `az monitor metrics alert create --name "CpuUsageAlert-${vmName}" ` +
                           `--resource-group ${this.resourceGroupName} --scopes ${vmName} ` +
                           `--condition "avg percentage CPU > 80" --description "Alert when CPU usage is over 80%"`;

      exec(alertCommand, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error setting up alert for VM ${vmName}: ${error}`);
          return;
        }
        console.log(`Alert setup successfully for VM ${vmName}.`);
      });
    });
  }
}

module.exports = MonitoringIntegration;
