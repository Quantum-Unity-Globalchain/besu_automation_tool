# User Guide for Hyperledger Besu Automation Tool

Welcome to the Hyperledger Besu Automation Tool User Guide. This guide will walk you through the steps to deploy and manage a Hyperledger Besu blockchain network using our tool. The tool simplifies the process by automating configuration file generation, node key management, deployment, and monitoring.

## Prerequisites for Hyperledger Besu

- Node.js installed on your machine.
- Visual Studio Code with Azure extensions installed.
- An Azure account for deploying virtual machines and other resources.

## Installation

1. Clone the repository to your local machine.
2. Navigate to the project directory and run `npm install` to install the required dependencies.

## Usage

### Configuration File Generation

1. Run `node configGenerator.js` from the project directory.
2. Answer the prompts to specify your blockchain network's configuration, such as the network name, consensus mechanism, and chain ID.
3. The tool will generate a genesis file and node configuration files based on your input and save them in the `templates` directory.

### Node Key Management

1. Run `node keyManager.js` to generate or manage node keys.
2. Follow the prompts to create new keys, replace existing ones, or rotate keys as needed.

### Deploying the Network

1. Open Visual Studio Code and navigate to the Azure extension.
2. Use the provided ARM templates located in `armTemplates` to set up virtual machines and network resources.
3. Run the `vscodeExtension/extension.js` script to deploy the network infrastructure through VS Code.

### Networking Configuration

1. The `networkConfigurator.js` script automates the setup of virtual networks, subnets, and network security groups in Azure.
2. Run this script to ensure secure communication between nodes.

### Deployment and Monitoring

1. The tool integrates with Azure Monitor for real-time monitoring of network health and performance.
2. Use the `monitoringIntegration.js` script to set up monitoring for your network.

### Testing and Validation

1. Run the tests located in the `test` directory to validate the functionality of your blockchain network.
2. The `networkValidationTest.js` and `continuousTestingFramework.js` scripts will help ensure your network operates as expected.

## Prerequisites for XDC Zero

- Node.js and yarn installed.

## Configuring and Deploying with XDC Zero

This section guides you through the process of configuring and deploying contracts on the XDC Zero network using our tool.

### Prerequisites

- An `.env` file configured with necessary environment variables.

### Steps

1. **Environment Setup**: Run `yarn` to install dependencies.
2. **Configuration**: Modify `config/endpointconfig.json` and `config/network.config.json` according to your network setup.
3. **Deployment**: Execute `node XDCZeroConfigurator.js` to start the deployment process.

Refer to the `README.md` for additional details on XDC Zero integration.

## Feedback and Support

- If you encounter any issues or have feature requests, please use the `feedbackMechanism.js` script to submit your feedback.
- For additional support, refer to the `README.md` file or contact our support team.

Thank you for using the Hyperledger Besu Automation Tool. We hope this guide helps you efficiently deploy and manage your blockchain network.
