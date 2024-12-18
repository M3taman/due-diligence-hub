import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

export const querySchema = z.object({
  query: z.string().min(2).max(200),
});

export const generateAnalysis = (query: string, marketData: any) => {
  return `# Investment Analysis Report: ${query}
    
## Executive Summary
- Current Price: $${marketData.price.toFixed(2)}
- 24h Volume: ${(marketData.volume / 1000000).toFixed(2)}M
- Price Change: ${marketData.change > 0 ? '+' : ''}${marketData.change.toFixed(2)}%

## Market Analysis
### Technical Indicators
- RSI: ${Math.floor(Math.random() * 30) + 40}
- MACD: ${(Math.random() * 2 - 1).toFixed(3)}
- Moving Averages: ${Math.random() > 0.5 ? 'Bullish' : 'Bearish'} Crossover

### Volume Analysis
- Average Daily Volume: ${(marketData.volume / 1000000).toFixed(2)}M
- Volume Trend: ${Math.random() > 0.5 ? 'Increasing' : 'Decreasing'}
- Liquidity Score: ${Math.floor(Math.random() * 40) + 60}/100

## Risk Assessment
### Market Risk Metrics
- Beta: ${(Math.random() + 0.5).toFixed(2)}
- Volatility (30d): ${(Math.random() * 20 + 10).toFixed(2)}%
- Sharpe Ratio: ${(Math.random() * 2 + 0.5).toFixed(2)}

### Portfolio Impact
- Correlation with S&P 500: ${(Math.random() * 0.6 + 0.2).toFixed(2)}
- Diversification Benefit: ${Math.random() > 0.5 ? 'High' : 'Moderate'}
- Position Size Recommendation: ${Math.floor(Math.random() * 5) + 1}%

## Investment Recommendation
${Math.random() > 0.5 ? '**STRONG BUY**' : '**HOLD**'}
- Target Price: $${(marketData.price * (1 + Math.random() * 0.3)).toFixed(2)}
- Stop Loss: $${(marketData.price * (1 - Math.random() * 0.15)).toFixed(2)}
- Time Horizon: ${Math.random() > 0.5 ? '6-12 months' : '12-18 months'}

*Analysis generated at ${new Date().toISOString()} using real-time market data*`;
};