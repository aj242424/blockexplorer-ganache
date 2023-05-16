import React, { useState } from 'react';
import { ethers } from 'ethers';
import { JsonRpcProvider } from 'ethers/providers';
import './BlockExplorer.css';
import './tailwind.css';

function BlockExplorer() {
  const [hash, setHash] = useState('');
  const [transaction, setTransaction] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const provider = new ethers.providers.JsonRpcProvider('http://localhost:8545');
    try {
      const tx = await provider.getTransaction(hash);
      setTransaction(tx);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Ganache Block Explorer with Ethers</h1>
      <h2>Enter Transaction Hash to See Details</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter transaction hash"
          value={hash}
          onChange={(event) => setHash(event.target.value)}
        />
        <button type="submit">Fetch Transaction Details</button>
      </form>
      {transaction && (
        <div>
          <h2>Transaction Details</h2>
          <div>
            <strong>Transaction Hash:</strong> {transaction.hash}
          </div>
          <div>
            <strong>Block Hash:</strong> {transaction.blockHash}
          </div>
          <div>
            <strong>Block Number:</strong> {transaction.blockNumber}
          </div>
          <div>
            <strong>From:</strong> {transaction.from}
          </div>
          <div>
            <strong>To:</strong> {transaction.to}
          </div>
          <div>
            <strong>Value:</strong> {ethers.utils.formatEther(transaction.value)} ETH
          </div>
          <div>
            <strong>Gas Limit:</strong> {transaction.gasLimit.toString()}
          </div>
          <div>
            <strong>Gas Price:</strong> {ethers.utils.formatUnits(transaction.gasPrice, 'gwei')} Gwei
          </div>
          <div>
            <strong>Nonce:</strong> {transaction.nonce}
          </div>
        </div>
      )}
    </div>
  );
}
export default BlockExplorer;

