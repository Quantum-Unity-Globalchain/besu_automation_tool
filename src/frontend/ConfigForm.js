import React, { useState } from 'react';
import axios from 'axios';

const ConfigForm = () => {
  const [networkName, setNetworkName] = useState('');
  const [consensusMechanism, setConsensusMechanism] = useState('IBFT');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/generateConfig', { networkName, consensusMechanism });
      console.log(response.data);
      alert('Configuration generated successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to generate configuration.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={networkName} onChange={(e) => setNetworkName(e.target.value)} placeholder="Network Name" />
      <select value={consensusMechanism} onChange={(e) => setConsensusMechanism(e.target.value)}>
        <option value="IBFT">IBFT</option>
        <option value="PoW">PoW</option>
        <option value="Clique">Clique</option>
      </select>
      <button type="submit">Generate Configuration</button>
    </form>
  );
};

export default ConfigForm;