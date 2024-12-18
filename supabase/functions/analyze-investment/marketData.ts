export const fetchMarketData = async (symbol: string) => {
  // This would be replaced with actual market data API calls
  return {
    price: Math.random() * 1000 + 100,
    volume: Math.random() * 10000000,
    change: (Math.random() * 10) - 5,
    sharesOutstanding: Math.random() * 1000000000 + 100000000,
    eps: Math.random() * 10 + 1,
    ebitda: Math.random() * 10000000000,
    enterpriseValue: Math.random() * 100000000000,
    returnOnEquity: Math.random() * 0.3 + 0.05,
  };
};

export const generateCharts = (historicalData: any[]) => {
  return [
    {
      title: "Price Movement (Last 30 Days)",
      type: "line",
      data: historicalData.map((data, index) => ({
        name: `Day ${index + 1}`,
        value: data.price,
        volume: data.volume
      }))
    },
    {
      title: "Trading Volume Analysis",
      type: "bar",
      data: historicalData.map((data, index) => ({
        name: `Day ${index + 1}`,
        value: data.volume / 1000000
      }))
    },
    {
      title: "Market Value Trends",
      type: "area",
      data: historicalData.map((data, index) => ({
        name: `Day ${index + 1}`,
        value: data.price * data.sharesOutstanding / 1e9
      }))
    }
  ];
};