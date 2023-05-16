import React, { useState } from 'react';
import { ethers } from 'ethers';
import { JsonRpcProvider } from 'ethers/providers';
import './BlockExplorer.css';
import './tailwind.css';

function BlockExplorer() {
  const [blockNumber, setBlockNumber] = useState('');
  const [block, setBlock] = useState(null);
  const [transactions, setTransactions] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const provider = new ethers.providers.JsonRpcProvider('http://localhost:8545');
    try {
      const blockNumberInt = parseInt(blockNumber);
      const latestBlock = await provider.getBlockNumber();
      if (blockNumberInt > latestBlock) {
        setBlock(null);
        setTransactions([]);
        return alert(`Block ${blockNumberInt} does not exist. The latest block number is ${latestBlock}.`);
      }
      const block = await provider.getBlockWithTransactions(blockNumberInt);
      setBlock(block);
      setTransactions(block.transactions);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Ganache Block Explorer with Ethers</h1>
      <h2>Enter Block Number to See Transactions</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Enter block number"
          value={blockNumber}
          onChange={(event) => setBlockNumber(event.target.value)}
        />
        <button type="submit">Fetch Transactions</button>
      </form>
      {block && (
        <div>
          <h2>Block Details</h2>
          <div>
            <strong>Number:</strong> {block.number}
          </div>
          <div>
            <strong>Hash:</strong> {block.hash}
          </div>
          <div>
            <strong>Timestamp:</strong> {new Date(block.timestamp * 1000).toLocaleString()}
          </div>
          <div>
            <strong>Miner:</strong> {block.miner}
          </div>
        </div>
      )}
      {transactions.length > 0 ? (
        <div>
          <h2>Transaction Details</h2>
          <ul>
            {transactions.map((tx) => (
              <li key={tx.hash}>
                <div>
                  <strong>Transaction Hash:</strong> {tx.hash}
                </div>
                <div>
                  <strong>Block Hash:</strong> {tx.blockHash}
                </div>
                <div>
                  <strong>Block Number:</strong> {tx.blockNumber}
                </div>
                <div>
                  <strong>From:</strong> {tx.from}
                </div>
                <div>
                  <strong>To:</strong> {tx.to}
                </div>
                <div>
                  <strong>Value:</strong> {ethers.utils.formatEther(tx.value)} ETH
                </div>
                <div>
                  <strong>Gas Limit:</strong> {tx.gasLimit.toString()}
                </div>
                <div>
                  <strong>Gas Price:</strong> {ethers.utils.formatUnits(tx.gasPrice, 'gwei')} Gwei
                </div>
                <div>
                  <strong>Nonce:</strong> {tx.nonce}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        block && <div>No transactions found in this block.</div>
      )}
    </div>
  );
}
export default BlockExplorer;



