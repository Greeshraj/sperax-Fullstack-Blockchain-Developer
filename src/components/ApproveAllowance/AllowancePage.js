import React, { useState } from 'react';
import { ethers } from 'ethers';
import './AllowancePage.css'; // Import CSS file

const AllowancePage = () => {
  const [ownerAddress, setOwnerAddress] = useState('');
  const [spenderAddress, setSpenderAddress] = useState('');
  const [allowance, setAllowance] = useState(null);
  const [tokenAddress, setTokenAddress] = useState('0xdac17f958d2ee523a2206206994597c13d831ec7');

  const tokenAbi = [
    "function allowance(address owner, address spender) view returns (uint256)"
  ];

  const checkAllowance = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const tokenContract = new ethers.Contract(tokenAddress, tokenAbi, signer);
      const allowanceAmount = await tokenContract.allowance(ownerAddress, spenderAddress);

      setAllowance(ethers.utils.formatUnits(allowanceAmount, 18));
    } catch (error) {
      console.error("Error checking allowance:", error);
      setAllowance('Error');
    }
  };

  return (
    <div className="allowance-page">
      <h1>Token Allowance Checker</h1>

      <div className="form-group">
        <label className="form-label">
          Owner Address:
          <input
            type="text"
            value={ownerAddress}
            onChange={(e) => setOwnerAddress(e.target.value)}
            placeholder="Enter owner address"
            className="form-input"
          />
        </label>
      </div>

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

      <button onClick={checkAllowance} className="check-button">
        Check Allowance
      </button>

      {allowance !== null && (
        <div className="allowance-status">
          <strong>Allowance:</strong> {allowance} tokens
        </div>
      )}
    </div>
  );
};

export default AllowancePage;
