
import { useEffect, useState } from "react";
import Web3 from "web3";
import axios from 'axios';
import './HistoricalData.css'; // Import CSS file

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

const formatDate = (timestamp) => {
  const date = new Date(timestamp * 1000);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

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
    if (tokenSymbol && startDate && endDate) {
      fetchHistoricalData();
    }
  }, [tokenSymbol, startDate, endDate]);

  return (
    <div className="historical-balance">
      <h3>Historical Balance for {tokenSymbol} in {currency}</h3>
      <table className="historical-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Balance ({currency})</th>
          </tr>
        </thead>
        <tbody>
          {balanceData.map((data, index) => (
            <tr key={index}>
              <td>{formatDate(data.time)}</td>
              <td>{data.close.toFixed(5)}</td>
            </tr>
          ))}
        </tbody>
      </table>
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
  }, [tokenId]);

  return (
    <div className="historical-data">
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
