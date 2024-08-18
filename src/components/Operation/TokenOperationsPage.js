import React, { useState } from 'react';
import { ethers } from 'ethers';
import './TokenOperationPage.css'; // Import CSS file

const TokenOperationsPage = () => {
  const [recipientAddress, setRecipientAddress] = useState('');
  const [spenderAddress, setSpenderAddress] = useState('');
  const [tokenAddress, setTokenAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [operationStatus, setOperationStatus] = useState(null);

  const tokenAbi = [
    "function transfer(address to, uint256 amount) public returns (bool)",
    "function approve(address spender, uint256 amount) public returns (bool)"
  ];

  const transferTokens = async () => {
    try {
      if (!ethers.utils.isAddress(recipientAddress)) {
        setOperationStatus('Invalid recipient address.');
        return;
      }

      if (isNaN(amount) || parseFloat(amount) <= 0) {
        setOperationStatus('Invalid amount.');
        return;
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const tokenContract = new ethers.Contract(tokenAddress, tokenAbi, signer);
      const amountToSend = ethers.utils.parseUnits(amount, 18);

      const tx = await tokenContract.transfer(recipientAddress, amountToSend);
      await tx.wait();

      setOperationStatus('Transfer successful!');
    } catch (error) {
      console.error("Error transferring tokens:", error);
      setOperationStatus('Error');
    }
  };

  const approveTokens = async () => {
    try {
      if (!ethers.utils.isAddress(spenderAddress)) {
        setOperationStatus('Invalid spender address.');
        return;
      }

      if (isNaN(amount) || parseFloat(amount) <= 0) {
        setOperationStatus('Invalid amount.');
        return;
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const tokenContract = new ethers.Contract(tokenAddress, tokenAbi, signer);
      const amountToApprove = ethers.utils.parseUnits(amount, 18);

      const tx = await tokenContract.approve(spenderAddress, amountToApprove);
      await tx.wait();

      setOperationStatus('Approval successful!');
    } catch (error) {
      console.error("Error approving tokens:", error);
      setOperationStatus('Error');
    }
  };

  return (
    <div className="token-operations-page">
      <h1>Token Operations</h1>

      <div className="form-group">
        <label className="form-label">
          Token Contract Address:
          <input
            type="text"
            value={tokenAddress}
            onChange={(e) => setTokenAddress(e.target.value)}
            placeholder="Enter token contract address"
            className="form-input"
          />
        </label>
      </div>

      <div className="form-section">
        <h2>Transfer Tokens</h2>
        <label className="form-label">
          Recipient Address:
          <input
            type="text"
            value={recipientAddress}
            onChange={(e) => setRecipientAddress(e.target.value)}
            placeholder="Enter recipient address"
            className="form-input"
          />
        </label>
        <label className="form-label">
          Amount to Transfer:
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount to transfer"
            className="form-input"
          />
        </label>
        <button onClick={transferTokens} className="form-button">
          Transfer Tokens
        </button>
      </div>

      <div className="form-section">
        <h2>Approve Tokens</h2>
        <label className="form-label">
          Spender Address:
          <input
            type="text"
            value={spenderAddress}
            onChange={(e) => setSpenderAddress(e.target.value)}
            placeholder="Enter spender address"
            className="form-input"
          />
        </label>
        <label className="form-label">
          Amount to Approve:
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount to approve"
            className="form-input"
          />
        </label>
        <button onClick={approveTokens} className="form-button">
          Approve Tokens
        </button>
      </div>

      {operationStatus && (
        <div className="operation-status">
          <strong>{operationStatus}</strong>
        </div>
      )}
    </div>
  );
};

export default TokenOperationsPage;
