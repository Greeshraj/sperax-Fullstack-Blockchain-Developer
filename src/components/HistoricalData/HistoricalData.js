// import { useEffect, useState } from "react";
// import Web3 from "web3";
// import axios from 'axios';

// const ABI = [
//     {
//       constant: true,
//       inputs: [],
//       name: "name",
//       outputs: [
//         {
//           name: "",
//           type: "string",
//         },
//       ],
//       payable: false,
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       constant: true,
//       inputs: [],
//       name: "decimals",
//       outputs: [
//         {
//           name: "",
//           type: "uint8",
//         },
//       ],
//       payable: false,
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       constant: true,
//       inputs: [],
//       name: "symbol",
//       outputs: [
//         {
//           name: "",
//           type: "string",
//         },
//       ],
//       payable: false,
//       stateMutability: "view",
//       type: "function",
//     },
//   ];
// const HistoricalBalance = ({ tokenSymbol, currency, startDate, endDate }) => {
//   const [balanceData, setBalanceData] = useState([]);
//   const apiKey = '85751e4fc4ae990d93a322f919c034c336b5095727b066a5fa14eb575b5a2515';

//   const fetchHistoricalData = async () => {
//     try {
//       const response = await axios.get('https://min-api.cryptocompare.com/data/v2/histoday', {
//         params: {
//           fsym: tokenSymbol,
//           tsym: currency,
//           limit: 30, // Adjust as needed
//           toTs: Math.floor(new Date(endDate).getTime() / 1000), // Convert to Unix timestamp
//         },
//         headers: {
//           'Authorization': `Apikey ${apiKey}`,
//         },
//       });
//       setBalanceData(response.data.Data.Data);
//     } catch (error) {
//       console.error('Error fetching historical data:', error);
//     }
//   };

//   return (
//     <div>
//       <h3>Historical Balance for {tokenSymbol} in {currency}</h3>
//       <button onClick={fetchHistoricalData}>Fetch Data</button>
//       <ul>
//         {balanceData.map((data, index) => (
//           <li key={index}>
//             Date: {new Date(data.time * 1000).toLocaleDateString()}, Balance: {data.close}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// const HistoricalData = (tokenId) => {
//     console.log("in the history",tokenId)
// //   const [tokenSymbol, setTokenSymbol] = useState('BTC');
//   const [currency, setCurrency] = useState('USD');
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [showData, setShowData] = useState(false);
//   const [token, setToken] = useState(null);


//   const getToken = async () => {
//     try {
//       const web3 = new Web3("https://eth-mainnet.public.blastapi.io");
       
//       const contract = new web3.eth.Contract(ABI, tokenId);
//       const [name, symbol, decimals] = await Promise.all([
//         contract.methods.name().call(),
//         contract.methods.symbol().call(),
//         contract.methods.decimals().call(),
//       ]);
//       // console.log("hello")
//       // console.log(contract.methods());
//       setToken({ name, symbol, decimals: Number(decimals) });
//     } catch {
//       setToken(false);
//     }
   
//   };

//   const handleSubmit = () => {
//     setShowData(true);
    
//   };
//   useEffect(() => {
//     getToken();
    
//   }, []);

//   return (
//     <div>
//       <h1>Token Historical Balances</h1>
//       <label>
//         <input type="date" value={startDate} onChange={(event) => setStartDate(event.target.value)} />
//         Start Date
//       </label>
//       <label>
//         <input type="date" value={endDate} onChange={(event) => setEndDate(event.target.value)} />
//         End Date
//       </label>
//       <button onClick={handleSubmit}>Submit</button>

//       {showData && (
//         <HistoricalBalance
//           tokenSymbol={token.symbol}
//           currency={currency}
//           startDate={startDate}
//           endDate={endDate}
//         />
//       )}
//     </div>
//   );
// };

// export default HistoricalData;

import { useEffect, useState } from "react";
import Web3 from "web3";
import axios from 'axios';

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

const HistoricalBalance = ({ tokenSymbol, currency, startDate, endDate }) => {
  const [balanceData, setBalanceData] = useState([]);
  const apiKey = '85751e4fc4ae990d93a322f919c034c336b5095727b066a5fa14eb575b5a2515';

  const fetchHistoricalData = async () => {
    try {
      const response = await axios.get('https://min-api.cryptocompare.com/data/v2/histoday', {
        params: {
          fsym: tokenSymbol,
          tsym: currency,
          limit: 30, // Adjust as needed
          toTs: Math.floor(new Date(endDate).getTime() / 1000), // Convert to Unix timestamp
        },
        headers: {
          'Authorization': `Apikey ${apiKey}`,
        },
      });
      setBalanceData(response.data.Data.Data);
    } catch (error) {
      console.error('Error fetching historical data:', error);
    }
  };

  useEffect(() => {
    if (tokenSymbol) {
      fetchHistoricalData();
    }
  }, [tokenSymbol]);

  return (
    <div>
      <h3>Historical Balance for {tokenSymbol} in {currency}</h3>
      <ul>
        {balanceData.map((data, index) => (
          <li key={index}>
            Date: {new Date(data.time * 1000).toLocaleDateString()}, Balance: {data.close}
          </li>
        ))}
      </ul>
    </div>
  );
};

const HistoricalData = ({ tokenId }) => {
  const [currency, setCurrency] = useState('USD');
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showData, setShowData] = useState(false);
  const [token, setToken] = useState(null);

  const getToken = async () => {
    try {
      const web3 = new Web3("https://eth-mainnet.public.blastapi.io");
      const contract = new web3.eth.Contract(ABI, tokenId);
      const [name, symbol, decimals] = await Promise.all([
        contract.methods.name().call(),
        contract.methods.symbol().call(),
        contract.methods.decimals().call(),
      ]);
      setToken({ name, symbol, decimals: Number(decimals) });
    } catch (error) {
      console.error('Error fetching token details:', error);
      setToken(false);
    }
  };

  const handleSubmit = () => {
    setShowData(true);
  };

  useEffect(() => {
    getToken();
  }, []);

  return (
    <div>
      <h1>Token Historical Balances</h1>
      <label>
        Start Date:
        <input type="date" value={startDate} onChange={(event) => setStartDate(event.target.value)} />
      </label>
      <label>
        End Date:
        <input type="date" value={endDate} onChange={(event) => setEndDate(event.target.value)} />
      </label>
      <button onClick={handleSubmit} disabled={!token}>Submit</button>

      {showData && token && (
        <HistoricalBalance
          tokenSymbol={token.symbol}
          currency={currency}
          startDate={startDate}
          endDate={endDate}
        />
      )}
      {showData && token === false && <p>Error fetching token details.</p>}
    </div>
  );
};

export default HistoricalData;

