// src/HomePage.js
import React from 'react';
import './HomePage.css';
import ApprovalPage from '../components/ApproveAllowance/ApprovalPage';
import AllowancePage from '../components/ApproveAllowance/AllowancePage';
import TokenOperationsPage from '../components/Operation/TokenOperationsPage';
import MetaMask from '../components/MetaMask/MetaMask';
const HomePage = () => {
  return (
    <div className="home-container">
      <h1>Welcome to My Application</h1>
      <p>
        This is a simple React application demonstrating basic routing and styling. Feel free to explore and learn more about our features and services. Enjoy your visit!
      </p>
      <MetaMask/>
      <TokenOperationsPage/>
     <AllowancePage/>
      <ApprovalPage/>
    </div>
  );
};

export default HomePage;
