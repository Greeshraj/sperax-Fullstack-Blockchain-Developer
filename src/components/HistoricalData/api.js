import axios from 'axios';

export const fetchHistoricalData = async (tokenId, startDate, endDate) => {
    try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${tokenId}/market_chart/range`, {
            params: {
                vs_currency: 'usd',
                from: Math.floor(startDate.getTime() / 1000),  // Convert to UNIX timestamp in seconds
                to: Math.floor(endDate.getTime() / 1000)       // Convert to UNIX timestamp in seconds
            }
        });
        return response.data.prices;  // Ensure this is the correct field based on the API response
    } catch (error) {
        console.error("Error fetching historical data:", error);
        throw error;
    }
};
