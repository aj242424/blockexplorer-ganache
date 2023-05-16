import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { JsonRpcProvider } from 'ethers/providers';

function LatestBlocks() {
  const [blocks, setBlocks] = useState([]);
  const [selectedBlock, setSelectedBlock] = useState(null);

  useEffect(() => {
    const provider = new ethers.providers.JsonRpcProvider('http://localhost:8545');
    const getBlocks = async () => {
      const latestBlock = await provider.getBlockNumber();
      const blockNumbers = Array.from({ length: 10 }, (_, i) => latestBlock - i);
      const blockPromises = blockNumbers.map((blockNumber) =>
        provider.getBlockWithTransactions(blockNumber)
      );
      const blocks = await Promise.all(blockPromises);
      setBlocks(blocks.reverse());
    };
    getBlocks();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center">Latest Blocks</h2>
      <ul className="list-group">
        {blocks.map((block) => (
          <li className="list-group-item" key={block.hash}>
            <button
              type="button"
              className="btn btn-link text-decoration-none"
              onClick={() => setSelectedBlock(block)}
            >
              Block {block.number}
            </button>
          </li>
        ))}
      </ul>
      {selectedBlock && (
        <div className="mt-4">
          <h2 className="text-center">Block {selectedBlock.number}</h2>
          <div>
            <strong>Hash:</strong> {selectedBlock.hash}
          </div>
          <div>
            <strong>Timestamp:</strong>{' '}
            {new Date(selectedBlock.timestamp * 1000).toLocaleString()}
          </div>
          <div>
            <strong>Miner:</strong> {selectedBlock.miner}
          </div>
          <h3>Transactions</h3>
          {selectedBlock.transactions.length > 0 ? (
            <ul className="list-group">
              {selectedBlock.transactions.map((tx) => (
                <li className="list-group-item" key={tx.hash}>
                  <div>
                    <strong>Transaction Hash:</strong> {tx.hash}
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
                </li>
              ))}
            </ul>
          ) : (
            <div>No transactions found in this block.</div>
          )}
        </div>
      )}
    </div>
  );
}

export default LatestBlocks;


