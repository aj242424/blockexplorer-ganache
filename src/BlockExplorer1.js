import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { JsonRpcProvider } from 'ethers/providers';
import './BlockExplorer.css';
import './tailwind.css';

function BlockExplorer() {
  const [latestBlocks, setLatestBlocks] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const provider = new ethers.providers.JsonRpcProvider('http://localhost:8545');
      const latestBlockNumber = await provider.getBlockNumber();
      const blocks = [];
      for (let i = 0; i < 10; i++) {
        const blockNumber = latestBlockNumber - i;
        if (blockNumber < 1) {
          break;
        }
        const block = await provider.getBlockWithTransactions(blockNumber);
        blocks.push(block);
      }
      setLatestBlocks(blocks);
    }
    fetchData();
  }, []);

  return (
    <div>
      
      <h1>Ganache Block Explorer with Ethers</h1>
      <h2>Latest Blocks and Transactions</h2>
      {latestBlocks.map((block) => (
        <div key={block.hash}>
          <h3>Block Number: {block.number}</h3>
          <ul>
            {block.transactions.map((tx) => (
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
      ))}
    </div>
  );
}

export default BlockExplorer;



