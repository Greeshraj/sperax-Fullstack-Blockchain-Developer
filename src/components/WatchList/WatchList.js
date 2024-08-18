import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import Popout from './Popout';
import './WatchList.css'; // Import CSS file
import HistoricalData from '../HistoricalData/HistoricalData';
export default function WatchList({ watchList }) {
  const [balances, setBalances] = useState([]);
  const [selectedToken, setSelectedToken] = useState(null);
  const [showPopout, setShowPopout] = useState(false);

  
  useEffect(() => {
    const fetchBalances = async () => {
      const web3 = new Web3("https://eth-mainnet.public.blastapi.io");
      const newBalances = await Promise.all(
        watchList.map(async (tokenAddress) => {
          try {
            const balance = await web3.eth.getBalance(tokenAddress);
            return web3.utils.fromWei(balance, 'ether');
          } catch (error) {
            console.error(`Error fetching balance for ${tokenAddress}:`, error);
            return 'N/A';
          }
        })
      );
      setBalances(newBalances);
    };

    if (watchList.length > 0) {
      fetchBalances();
    }
  }, [watchList]);

  const handleShowPopout = (token) => {
    setSelectedToken(token);
    setShowPopout(true);
  };

  const handleClosePopout = () => {
    setShowPopout(false);
    setSelectedToken(null);
  };

  return (
    <div className="watchlist-container">
      <h2 className="watchlist-title">Token Watch List</h2>
      <table className="watchlist-table">
        <thead>
          <tr>
            <th>Address</th>
            <th>Balance (ETH)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {watchList.map((token, index) => (
            <tr key={index} className="watchlist-item">
              <td className="token-address">{token}</td>
              <td className="token-balance">{balances[index]}</td>
              <td>
                <button onClick={() => handleShowPopout(token)} className="data-selector-button">
                  View Historical Data
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showPopout && selectedToken && (
        <Popout tokenId={selectedToken} onClose={handleClosePopout} />
      )}
    </div>
  );
}
