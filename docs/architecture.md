# Hyperledger Besu Automation Tool Architecture

The Hyperledger Besu Automation Tool is designed to streamline the deployment and management of a Hyperledger Besu blockchain network. This document outlines the architecture of the tool, detailing the components and their interactions to facilitate a smooth setup and operation of the network.

## Overview

The tool is composed of several modular components, each responsible for a specific aspect of the network setup and management. These components include configuration file generation, node key management, integration with VS Code and Azure for deployment, virtual machine setup, networking configuration, deployment and monitoring, and a feedback loop for continuous improvement.

## Components

### Configuration File Generation

- **Module:** `configGenerator.js`
- **Description:** Generates genesis and node configuration files based on user input.
- **Templates:** Located in `templates/genesisTemplate.json` and `templates/nodeConfigTemplate.json`.
- **User Interface:** A user-friendly interface for specifying configuration options.

### Node Key Management

- **Module:** `keyManager.js`
- **Description:** Manages the generation, replacement, and rotation of node keys securely.

### VS Code and Azure Integration

- **Module:** `vscodeExtension/extension.js`
- **Description:** Facilitates deployment through VS Code using Azure extensions.
- **Deployment Pipeline:** Automates the creation of Azure Resource Manager (ARM) templates and implements a one-click deployment pipeline within VS Code.

### Virtual Machine Setup

- **ARM Templates:** Located in `armTemplates/vmSetup.json` and `armTemplates/networkResources.json`.
- **Description:** Templates for setting up VMs with necessary software and configurations based on network roles.

### Networking Configuration

- **Module:** `networkConfigurator.js`
- **Description:** Automates the setup of virtual networks, subnets, and network security groups in Azure.

### Deployment and Monitoring

- **Modules:** `deploymentScript.js` and `monitoringIntegration.js`
- **Description:** Handles the deployment, redeployment, scaling of the network, and integrates with Azure Monitor for network health monitoring.

### Testing and Validation

- **Modules:** `test/networkValidationTest.js` and `test/continuousTestingFramework.js`
- **Description:** Implements tests to validate network functionality and a framework for continuous testing.

### Documentation and User Guide

- **Files:** `README.md` and `USER_GUIDE.md`
- **Description:** Provides comprehensive documentation and step-by-step instructions for using the tool.

### Feedback Loop and Iteration

- **Module:** `feedbackMechanism.js`
- **Description:** Establishes a feedback mechanism for users and plans for regular tool updates based on feedback.

## Interaction Flow

1. **User Input:** The user specifies network configurations through the interface provided by `configGenerator.js`.
2. **Configuration Files Generation:** Based on the input, genesis and node configuration files are generated.
3. **Node Setup:** `keyManager.js` generates or rotates node keys as required.
4. **Deployment:** The user deploys the network using `vscodeExtension/extension.js`, which utilizes ARM templates for VM and network resource setup.
5. **Network Configuration:** `networkConfigurator.js` configures networking aspects.
6. **Monitoring:** `monitoringIntegration.js` integrates with Azure Monitor for real-time network monitoring.
7. **Testing:** `test/networkValidationTest.js` and `test/continuousTestingFramework.js` run tests to validate network functionality.
8. **Feedback and Iteration:** Users provide feedback through `feedbackMechanism.js`, which is used for continuous improvement.

This architecture ensures a modular, scalable, and user-friendly tool for deploying and managing Hyperledger Besu networks efficiently.

## Multi-Blockchain Support

The tool now supports configuration for multiple blockchain networks, including Hyperledger Besu and XDC Zero. This allows for seamless setup and management of various blockchain infrastructures.

### Supported Blockchains

- Hyperledger Besu
- XDC Zero
- More to come

For detailed instructions on configuring each supported blockchain, please refer to the respective sections in the [USER_GUIDE.md](docs/USER_GUIDE.md).

## Multi-Blockchain Configuration Guide

This guide provides instructions for configuring different blockchain networks using our tool.

### Hyperledger Besu Configuration

Follow the steps outlined in the Hyperledger Besu section to configure your Besu network.

### XDC Zero Configuration

Refer to the XDC Zero section for detailed steps on setting up and deploying contracts on the XDC Zero network.

### Adding New Blockchains

To add support for a new blockchain, create the necessary configuration and script files in the designated directories and update this guide accordingly.

## Multi-Blockchain Architecture

The tool's architecture is designed to support multiple blockchain configurations. Each blockchain has its own set of configuration files and scripts, allowing for independent setup and management.

### Directory Structure

- `config/`: Contains subdirectories for each supported blockchain with their respective configuration files.
- `scripts/`: Holds blockchain-specific deployment and management scripts.
- `blockchainConfigurators/`: Includes configurator classes for each blockchain.

### Extensibility

The architecture is modular, making it easy to add support for new blockchains by adding the necessary configurator class and associated files.
