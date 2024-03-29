# Hyperledger Besu Automation Tool

Welcome to the Hyperledger Besu Automation Tool, a comprehensive solution designed to streamline the deployment and management of a Hyperledger Besu blockchain network. This tool simplifies the complex steps involved in setting up a blockchain network by automating configuration file generation, node key management, deployment through VS Code with Azure extensions, virtual machine setup, networking, and ongoing redeployment and monitoring.

## Features

- **Configuration File Generation**: Automatically generates genesis and node configuration files based on user input.
- **Node Key Management**: Securely manages the generation, replacement, and rotation of node keys.
- **VS Code and Azure Integration**: Facilitates deployment through VS Code using Azure extensions, including the automation of Azure Resource Manager (ARM) templates.
- **Virtual Machine Setup**: Provides ARM templates for setting up VMs with the necessary software and configurations.
- **Networking Configuration**: Automates the setup of virtual networks, subnets, and network security groups in Azure.
- **Deployment and Monitoring**: Integrates with Azure Monitor and other tools for real-time monitoring of network health and performance.
- **Continuous Improvement**: Includes a feedback mechanism for users to report issues or request features.

## Multi-Blockchain Support

The tool now supports configuration for multiple blockchain networks, including Hyperledger Besu and XDC Zero. This allows for seamless setup and management of various blockchain infrastructures.

### Supported Blockchains

- Hyperledger Besu
- XDC Zero
- More to come

For detailed instructions on configuring each supported blockchain, please refer to the respective sections in the [USER_GUIDE.md](docs/USER_GUIDE.md).

## Getting Started

To get started with the Hyperledger Besu Automation Tool, follow these steps:

1. **Clone the repository**:

   ```Bash
   git clone <repository-url>
   ```

2. **Navigate to the project directory**:

   ```Bash
   cd hyperledger-besu-automation-tool
   ```

3. **Install dependencies**:

   ```Bash
   npm install
   ```

4. **Run the tool**:

   ```Bash
   node configGenerator.js
   ```

Follow the prompts to configure your Hyperledger Besu network. The tool will guide you through the process of generating configuration files, setting up virtual machines, and deploying the network.

## XDC Zero Integration

The tool now supports the configuration and deployment of contracts on the XDC Zero network. This feature allows users to deploy cross-chain contracts seamlessly. For detailed instructions on setting up and deploying with XDC Zero, refer to the `XDCZeroConfigurator.js` script and the configuration files under the `config` directory.

### Getting Started with XDC Zero

1. Ensure all dependencies are installed by running `yarn`.
2. Configure your network and contract details in `config/endpointconfig.json` and `config/network.config.json`.
3. Set up your environment variables in the `.env` file.
4. Run the `XDCZeroConfigurator.js` script to deploy your contracts to the XDC Zero network.

For more information on the commands and configurations, visit the [XDC Zero GitHub](https://github.com/XinFinOrg/XDC-Zero) repository.

## Documentation

For detailed information on how to use the Hyperledger Besu Automation Tool, please refer to the [USER_GUIDE.md](docs/USER_GUIDE.md) file. It contains step-by-step instructions for deploying and managing the Hyperledger Besu network using this tool.

## Contributing

We welcome contributions to the Hyperledger Besu Automation Tool. If you have suggestions for improvements or encounter any issues, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## GitHub Repository

- [Hyperledger Besu Automation Tool](https://github.com/Quantum-Unity-Globalchain/besu_automation_tool)

## besu_automation_tool
