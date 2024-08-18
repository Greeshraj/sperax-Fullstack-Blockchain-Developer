import React from 'react';
import HistoricalData from '../HistoricalData/HistoricalData';
import './Popout.css'; 

const Popout = ({ tokenId, onClose }) => {
  return (
    <div className="popout-overlay">
      <div className="popout-content">
        <button className="popout-close" onClick={onClose}>X</button>
        <HistoricalData tokenId={tokenId} />
      </div>
    </div>
  );
};

export default Popout;
