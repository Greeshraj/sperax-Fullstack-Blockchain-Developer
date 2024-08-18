import React, { useState } from 'react';
import MetaMask from './components/MetaMask/MetaMask';
import WatchList from './components/WatchList/WatchList';
import TokenAdder from './components/Tokenadder/tokenAdder';
import HistoricalData from './components/HistoricalData/HistoricalData';
export default function App() {
  const [watchList, setWatchList] = useState([]);

  const addTokenToWatchList = (token) => {
    setWatchList([...watchList, token]);
  };
  const token="ethereum";
  return (
    <div>
    {/* <TokenAdder address={"0xdac17f958d2ee523a2206206994597c13d831ec7"} /> */}
      <MetaMask  />
      {/* <HistoricalData tokenId={token}/> */}
    </div>
  );
}


// import React, { useState } from 'react';
// import { ethers } from 'ethers';

// const App = () => {
//   const [ownerAddress, setOwnerAddress] = useState('');
//   const [spenderAddress, setSpenderAddress] = useState('');
//   const [allowance, setAllowance] = useState(null);
//   const [tokenAddress, setTokenAddress] = useState('0xdac17f958d2ee523a2206206994597c13d831ec7');

//   // Define the ABI for the ERC-20 token contract
//   const tokenAbi = [
//     // Include only the `allowance` method from the ERC-20 ABI
//     "function allowance(address owner, address spender) view returns (uint256)"
//   ];

//   const checkAllowance = async () => {
//     try {
//       // Connect to the Ethereum network (assuming MetaMask is used)
//       const provider = new ethers.providers.Web3Provider(window.ethereum);
//       const signer = provider.getSigner();

//       // Create a contract instance
//       const tokenContract = new ethers.Contract(tokenAddress, tokenAbi, signer);

//       // Call the allowance method
//       const allowanceAmount = await tokenContract.allowance(ownerAddress, spenderAddress);

//       // Convert allowance from BigNumber to a string and set state
//       setAllowance(ethers.utils.formatUnits(allowanceAmount, 18));
//     } catch (error) {
//       console.error("Error checking allowance:", error);
//       setAllowance('Error');
//     }
//   };

//   return (
//     <div style={{ padding: '20px' }}>
//       <h1>Token Allowance Checker</h1>

//       <div style={{ marginBottom: '20px' }}>
//         <label>
//           Owner Address:
//           <input
//             type="text"
//             value={ownerAddress}
//             onChange={(e) => setOwnerAddress(e.target.value)}
//             placeholder="Enter owner address"
//             style={{ marginLeft: '10px', width: '300px' }}
//           />
//         </label>
//       </div>

//       <div style={{ marginBottom: '20px' }}>
//         <label>
//           Spender Address:
//           <input
//             type="text"
//             value={spenderAddress}
//             onChange={(e) => setSpenderAddress(e.target.value)}
//             placeholder="Enter spender address"
//             style={{ marginLeft: '10px', width: '300px' }}
//           />
//         </label>
//       </div>

//       <div style={{ marginBottom: '20px' }}>
//         <label>
//           Token Contract Address:
//           <input
//             type="text"
//             value={tokenAddress}
//             onChange={(e) => setTokenAddress(e.target.value)}
//             placeholder="Enter token contract address"
//             style={{ marginLeft: '10px', width: '300px' }}
//           />
//         </label>
//       </div>

//       <button onClick={checkAllowance} style={{ padding: '10px 20px', fontSize: '16px' }}>
//         Check Allowance
//       </button>

//       {allowance !== null && (
//         <div style={{ marginTop: '20px', fontSize: '18px' }}>
//           <strong>Allowance:</strong> {allowance} tokens
//         </div>
//       )}
//     </div>
//   );
// };

// export default App;

