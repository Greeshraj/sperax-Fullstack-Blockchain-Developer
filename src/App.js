// import React, { useState } from 'react';
// import TokenOperationsPage from './components/Operation/TokenOperationsPage';
// import ApprovalPage from './components/ApproveAllowance/ApprovalPage';
// import AllowancePage  from './components/ApproveAllowance/AllowancePage';
// import MetaMask from './components/MetaMask/MetaMask';
// import WatchList from './components/WatchList/WatchList';
// import TokenAdder from './components/Tokenadder/tokenAdder';
// import HistoricalData from './components/HistoricalData/HistoricalData';
// export default function App() {
//   const [watchList, setWatchList] = useState([]);

//   const addTokenToWatchList = (token) => {
//     setWatchList([...watchList, token]);
//   };
//   const token="ethereum";
//   return (
//     <div>
//     {/* <TokenAdder address={"0xdac17f958d2ee523a2206206994597c13d831ec7"} /> */}
//       <MetaMask  />
//       {/* <ApprovalPage/> */}
//       {/* <AllowancePage/> */}
//       {/* <TokenOperationsPage/> */}
//       {/* <HistoricalData tokenId={token}/> */}
//     </div>
//   );
// }

// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Navbar from './Header/Navbar';
function App() {
  return (
    <Router>
    <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;


