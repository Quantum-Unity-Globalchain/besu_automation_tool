const Mocha = require('mocha');
const fs = require('fs');
const path = require('path');

// Instantiate a Mocha instance.
const mocha = new Mocha({
  timeout: 10000, // Set a higher timeout for blockchain network operations
});

const testDir = __dirname;

// Add each .js file to the Mocha instance
fs.readdirSync(testDir).filter(function(file) {
  // Only include .js files (to exclude directories and other file types)
  return file.substr(-3) === '.js';
}).forEach(function(file) {
  mocha.addFile(
    path.join(testDir, file)
  );
});

// Run the tests.
mocha.run(function(failures) {
  process.exitCode = failures ? 1 : 0; // exit with non-zero status if there were failures
}).on('test', function(test) {
  console.log('Test started: ' + test.title);
}).on('test end', function(test) {
  console.log('Test done: ' + test.title);
}).on('pass', function(test) {
  console.log('Test passed');
}).on('fail', function(test, err) {
  console.log('Test fail');
  console.error(err);
}).on('end', function() {
  console.log('All tests finished');
});
