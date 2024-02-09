const vscode = require('vscode');
const { exec } = require('child_process');
const path = require('path');

function activate(context) {
    let disposable = vscode.commands.registerCommand('hyperledger-besu-automation.deployNetwork', function () {
        vscode.window.showInformationMessage('Deploying Hyperledger Besu Network...');

        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders) {
            vscode.window.showErrorMessage('Please open a workspace before deploying.');
            return;
        }

        const rootPath = workspaceFolders[0].uri.fsPath;
        const deploymentScriptPath = path.join(rootPath, 'deploymentScript.js');

        exec(`node "${deploymentScriptPath}"`, (error, stdout, stderr) => {
            if (error) {
                vscode.window.showErrorMessage(`Deployment failed: ${error.message}`);
                return;
            }
            if (stderr) {
                vscode.window.showErrorMessage(`Deployment errors: ${stderr}`);
                return;
            }
            vscode.window.showInformationMessage('Deployment successful!');
            console.log(`Deployment output: ${stdout}`);
        });
    });

    context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
}
