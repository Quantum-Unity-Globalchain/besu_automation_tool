const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

class KeyManager {
  constructor(keyDirectory) {
    this.keyDirectory = keyDirectory;
    this.ensureKeyDirectoryExists();
  }

  ensureKeyDirectoryExists() {
    if (!fs.existsSync(this.keyDirectory)) {
      fs.mkdirSync(this.keyDirectory, { recursive: true });
    }
  }

  generateKeyPair(nodeName) {
    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
      modulusLength: 2048,
    });

    const publicKeyPath = path.join(this.keyDirectory, `${nodeName}_public.pem`);
    const privateKeyPath = path.join(this.keyDirectory, `${nodeName}_private.pem`);

    fs.writeFileSync(publicKeyPath, publicKey.export({ type: 'pkcs1', format: 'pem' }));
    fs.writeFileSync(privateKeyPath, privateKey.export({ type: 'pkcs1', format: 'pem' }));

    console.log(`Keys generated for node: ${nodeName}`);
  }

  replaceKeyPair(nodeName) {
    console.log(`Replacing keys for node: ${nodeName}`);
    this.generateKeyPair(nodeName);
  }

  rotateKeys() {
    const nodes = fs.readdirSync(this.keyDirectory).filter(file => file.endsWith('_public.pem')).map(file => file.replace('_public.pem', ''));
    nodes.forEach(node => {
      console.log(`Rotating keys for node: ${node}`);
      this.replaceKeyPair(node);
    });
  }
}

// Example usage:
// const keyManager = new KeyManager('./keys');
// keyManager.generateKeyPair('node1');
// keyManager.rotateKeys();

module.exports = KeyManager;
