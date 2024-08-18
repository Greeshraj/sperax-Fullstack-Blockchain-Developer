import { useEffect, useState } from "react";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";

const ABI = [
  {
    constant: true,
    inputs: [],
    name: "name",
    outputs: [
      {
        name: "",
        type: "string",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [
      {
        name: "",
        type: "uint8",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "symbol",
    outputs: [
      {
        name: "",
        type: "string",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
];
// const address="0xb60e8dd61c5d32be8058bb8eb970870f07233155";
const TokenAdder = ({ address,onSuccess }) => {
  // const TokenAdder = () => {
console.log(address)
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);

  const getToken = async () => {
    try {

      const web3 = new Web3("https://eth-mainnet.public.blastapi.io");
       
      const contract = new web3.eth.Contract(ABI, address);
      const [name, symbol, decimals] = await Promise.all([
        contract.methods.name().call(),
        contract.methods.symbol().call(),
        contract.methods.decimals().call(),
      ]);
      // console.log("hello")
      // console.log(contract.methods());
      setToken({ name, symbol, decimals: Number(decimals) });
    } catch {
      setToken(false);
    }
   
  };

  const addToken = async () => {
    setLoading(true);
    try {
      const provider = await detectEthereumProvider();
      if (!provider) {
        alert("Please install MetaMask to proceed");
        setLoading(false);
        return;
      }
  
      console.log("Provider detected:", provider);
      
      await provider.request({
        method: "eth_requestAccounts",
      });
  
      console.log("Accounts requested");
      console.log(token.symbol,token.decimals);
      const result = await window.ethereum.request({
        "method": "wallet_watchAsset",
        "params": {
          "type": "ERC20",
          "options": {
            "address":address,
            "symbol": token.symbol,
            "decimals": token.decimals,
             
          }
        }
      });
      
      console.log("Token added successfully:", result);

      if (result) {
        let storedTokens = JSON.parse(localStorage.getItem('tokens')) || [];
        storedTokens.push(address); // Store the token address
        localStorage.setItem('tokens', JSON.stringify(storedTokens));
        alert(`Token ${token.name} added to wallet!`);
        onSuccess();

      } else {
        alert("Token addition was rejected by the user.");
      }
    } catch (error) {
      console.error("Error adding token:", error);
      alert("Unable to add the token. Please check the console for more details.");
    }
    setLoading(false);
  };
  

  useEffect(() => {
    getToken();
  }, []);

  return (
    <button onClick={addToken} disabled={loading || !Boolean(token)}>
      {(token && `Add ${token.name}`) || "Loading Button..."}
    </button>
  );
};

export default TokenAdder;