const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Feedback file path
const feedbackFilePath = path.join(__dirname, 'feedback.txt');

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log("Welcome to the Hyperledger Besu Automation Tool Feedback Mechanism");

// Ask for feedback
rl.question('Please enter your feedback or feature request: ', (feedback) => {
  // Append feedback to the file
  fs.appendFile(feedbackFilePath, `${new Date().toISOString()}: ${feedback}\n`, (err) => {
    if (err) throw err;
    console.log('Thank you for your feedback!');

    // Close readline interface
    rl.close();
  });
});
