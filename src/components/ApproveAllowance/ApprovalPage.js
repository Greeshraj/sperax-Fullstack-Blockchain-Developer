import React, { useState } from 'react';
import { ethers } from 'ethers';
import './ApprovalPage.css'; // Import CSS file

const ApprovalPage = () => {
  const [spenderAddress, setSpenderAddress] = useState('');
  const [tokenAddress, setTokenAddress] = useState('0xdac17f958d2ee523a2206206994597c13d831ec7');
  const [amount, setAmount] = useState('');
  const [approvalStatus, setApprovalStatus] = useState(null);

  const tokenAbi = [
    "function approve(address spender, uint256 amount) public returns (bool)"
  ];

  const approveSpender = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const tokenContract = new ethers.Contract(tokenAddress, tokenAbi, signer);
      const amountToApprove = ethers.utils.parseUnits(amount, 18);

      const tx = await tokenContract.approve(spenderAddress, amountToApprove);
      await tx.wait();

      setApprovalStatus('Approval successful!');
    } catch (error) {
      console.error("Error approving spender:", error);
      setApprovalStatus('Error');
    }
  };

  return (
    <div className="approval-page">
      <h1>Token Approval</h1>

      <div className="form-group">
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
      </div>

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

      <div className="form-group">
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
      </div>

      <button onClick={approveSpender} className="approve-button">
        Approve Spender
      </button>

      {approvalStatus && (
        <div className="approval-status">
          <strong>{approvalStatus}</strong>
        </div>
      )}
    </div>
  );
};

export default ApprovalPage;
