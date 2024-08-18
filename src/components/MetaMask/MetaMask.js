import React, { useState,useEffect } from 'react';
import { formatEther } from 'ethers/lib/utils';
import TokenAdder from '../Tokenadder/tokenAdder';
import WatchList from '../WatchList/WatchList';
export default function MetaMask({ addTokenToWatchList }) {
    const [defaultAccount, setDefaultAccount] = useState(null);
    const [errors, setErrors] = useState(null);
    const [userBalance, setUserBalance] = useState(null);
    const [recipient, setRecipient] = useState('');
    const [manualWallet, setManualWallet] = useState(false);
    const [manualAddress, setManualAddress] = useState('');
    const [tokenAddress, setTokenAddress] = useState(''); // New state for token address
    const [showTokenAdder, setShowTokenAdder] = useState(false); 
    const [watchList, setWatchList] = useState([]);
    const [totalTokens, setTotalTokens] = useState(0);
    const connectWallet = async () => {
        console.log('Requesting account...');
        if(manualWallet){
            setDefaultAccount(manualAddress);
            getUserBalance(manualAddress);
        }else{
            if (window.ethereum) {
                console.log('MetaMask detected');
    
                try {
                    const accounts = await window.ethereum.request({
                        method: "eth_requestAccounts",
                    });
                    setDefaultAccount(accounts[0]);
                    getUserBalance(accounts[0]);
                } catch (error) {
                    setErrors('Failed to connect to MetaMask');
                    console.log('Error connecting to MetaMask:', error);
                }
    
            } else {
                setErrors('MetaMask not installed');
                alert('MetaMask not detected');
            }
        }
    }
  
    const getUserBalance = (accountAddress) => {
        window.ethereum.request({
            method: 'eth_getBalance', 
            params: [accountAddress, "latest"]
        })
        .then(balance => {
            console.log('Raw balance:', balance);
            if (balance) {
                const formattedBalance = formatEther(balance);
                setUserBalance(formattedBalance);
            } else {
                setErrors('Failed to fetch balance');
            }
        })
        .catch(error => {
            setErrors('Failed to fetch balance');
            console.log('Error fetching balance:', error);
        });
    }

    const handleAddToken = () => {
        if (!tokenAddress) {
            setErrors('Please enter a token address');
            return;
        }
        console.log(tokenAddress);
        console.log("let we enter in to adder");
        setShowTokenAdder(true);
        // <TokenAdder address={tokenAddress}/>
        // // Add the token to the watch list
        // addTokenToWatchList(tokenAddress);
        // setTokenAddress(''); // Clear the input after adding
    };

    async function sendTransaction(event){
        event.preventDefault();

        if (!recipient) {
            setErrors('Please enter a recipient address');
            return;
        }
    
        let params = [{
            from: defaultAccount,
            to: recipient,
            gas: Number(21000).toString(16),
            gasprice: Number(2500000).toString(16),
            value: Number(1000000000000000).toString(16),
        }];
    
        try {
            let result = await window.ethereum.request({
                method: 'eth_sendTransaction',
                params: params,
            });
            console.log(result);
        } catch (err) {
            console.log(err);
            setErrors(err.message);
        }
    }
    const handleSuccess=()=>{
        console.log("You did it");
        addinWatchlist(tokenAddress);
    }
    const addinWatchlist = (token) => {
        const currentWatchList = JSON.parse(localStorage.getItem('watchList')) || [];

        // Add the new token to the watchlist
        const updatedWatchList = [...currentWatchList, token];

        // Update localStorage with the new watchlist
        localStorage.setItem('watchList', JSON.stringify(updatedWatchList));

        // Update state with the new watchlist
        setWatchList(updatedWatchList);
        setTotalTokens(updatedWatchList.length);
    };
    const fetchTotalTokens = () => {
        console.log("Fetching tokens from localStorage")
        const storedTokens = JSON.parse(localStorage.getItem('watchList')) || [];
        setWatchList(storedTokens);
        setTotalTokens(storedTokens.length);
      };
    
      useEffect(() => {
        fetchTotalTokens(); // Fetch the total tokens on component mount
      }, []);
    
    return (
        <div className="App">
            <header className="App-header">
                <div>
                    <label>
                        <input 
                            type="checkbox" 
                            checked={manualWallet} 
                            onChange={(e) => setManualWallet(e.target.checked)}
                        />
                        Use manual wallet address
                    </label>
                </div>

                {manualWallet && (
                    <input 
                        type="text" 
                        placeholder="Enter wallet address" 
                        value={manualAddress} 
                        onChange={(e) => setManualAddress(e.target.value)} 
                    />
                )}

                <button onClick={connectWallet}>
                    {manualWallet ? "Set Wallet" : "Connect MetaMask"}
                </button>

                <h3>Wallet Address: {defaultAccount}</h3>
                <h3>Balance: {userBalance} $</h3>

                <input 
                    type="text" 
                    placeholder="Enter recipient address" 
                    value={recipient} 
                    onChange={(e) => setRecipient(e.target.value)} 
                />

                <button onClick={sendTransaction}>
                    Send Transaction
                </button>

                <h4>Add Token to Watch List</h4>
                <input 
                    type="text" 
                    placeholder="Enter token address" 
                    value={tokenAddress} 
                    onChange={(e) => setTokenAddress(e.target.value)} 
                />
                <button onClick={handleAddToken}>
                    Add Token
                </button>

                {showTokenAdder && <TokenAdder address={tokenAddress} onSuccess={handleSuccess}/>}  

                {errors && <p style={{ color: 'red' }}>{errors}</p>}
            </header>
            <WatchList watchList={watchList} />
            <div>
            <h3>Total Tokens Added: {totalTokens}</h3>
            </div>
        </div>
    );
}


