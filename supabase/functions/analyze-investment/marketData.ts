export const fetchMarketData = async (symbol: string) => {
  // This would be replaced with actual market data API calls
  return {
    price: Math.random() * 1000,
    volume: Math.random() * 1000000,
    change: (Math.random() * 10) - 5,
  };
};

export const generateCharts = (historicalData: any[]) => {
  return [
    {
      title: "Price Movement (Last 30 Days)",
      data: historicalData.map((data, index) => ({
        name: `Day ${index + 1}`,
        value: data.price
      }))
    },
    {
      title: "Trading Volume",
      data: historicalData.map((data, index) => ({
        name: `Day ${index + 1}`,
        value: data.volume
      }))
    }
  ];
};