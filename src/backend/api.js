
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const configGenerator = require('./configGenerator');
const keyManager = require('./keyManager');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Endpoint to generate configuration files
app.post('/generateConfig', async (req, res) => {
  try {
    const config = await configGenerator.runGenerator(req.body);
    res.json({ success: true, config });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Endpoint to manage node keys
app.post('/manageKeys', async (req, res) => {
  try {
    const keys = await keyManager.generateKeyPair(req.body.nodeName);
    res.json({ success: true, keys });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));