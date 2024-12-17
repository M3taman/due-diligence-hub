import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const rateLimit = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 60000;
const MAX_REQUESTS = 5;

function isRateLimited(userId: string): boolean {
  const now = Date.now();
  const userRequests = rateLimit.get(userId) || [];
  const recentRequests = userRequests.filter(timestamp => now - timestamp < RATE_LIMIT_WINDOW);
  
  if (recentRequests.length >= MAX_REQUESTS) {
    return true;
  }
  
  recentRequests.push(now);
  rateLimit.set(userId, recentRequests);
  return false;
}

const querySchema = z.object({
  query: z.string().min(2).max(200),
});

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser(
      req.headers.get('Authorization')?.split(' ')[1] ?? ''
    );

    if (authError || !user) {
      throw new Error('Unauthorized');
    }

    if (isRateLimited(user.id)) {
      return new Response(
        JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
        { 
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    const { query } = await req.json();
    
    try {
      querySchema.parse({ query });
    } catch (validationError) {
      return new Response(
        JSON.stringify({ error: 'Invalid query format' }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Mock analysis response with enhanced investment-focused content
    const analysis = `# Investment Analysis Report: ${query}
    
## Executive Summary
- Industry: Technology
- Market Cap: $50B
- Current Rating: Strong Buy
- Risk Level: Moderate
- 12M Target: $180.00

## Financial Performance Analysis

### Revenue & Profitability
- Revenue Growth (YoY): +25%
- EBITDA Margin: 35%
- Net Profit Margin: 22%
- Return on Equity: 18.5%

### Balance Sheet Strength
- Debt/Equity Ratio: 0.45
- Current Ratio: 2.1
- Quick Ratio: 1.8
- Working Capital: $2.5B

## Market Position & Competitive Analysis

### Industry Standing
- Market Share: 12%
- Industry Rank: #3
- Competitive Advantage: Strong technological moat
- Brand Value: Top 20 Global Tech Brands

### Growth Vectors
1. Product Innovation Pipeline
2. Geographic Expansion
3. M&A Opportunities
4. Market Share Gains

## Risk Assessment

### Key Risk Factors
1. Regulatory Environment
   - Current Exposure: Moderate
   - Mitigation Strategies in Place
   
2. Market Competition
   - Direct Competitors: 3 major players
   - Indirect Threats: Emerging technologies
   
3. Economic Sensitivity
   - Beta: 1.2
   - Correlation with S&P 500: 0.75

## Investment Thesis

### Strengths
- Strong market position
- Robust balance sheet
- High margins
- Effective management team

### Catalysts
1. New product launches in Q3
2. Geographic expansion into APAC
3. Strategic partnerships
4. Cost optimization initiatives

## Valuation Metrics

### Current Valuations
- P/E Ratio: 22.5x
- EV/EBITDA: 15.2x
- P/B Ratio: 3.8x
- FCF Yield: 4.2%

### Peer Comparison
| Metric | Company | Peer Avg | Industry |
|--------|---------|----------|-----------|
| P/E | 22.5x | 25.3x | 24.1x |
| EV/EBITDA | 15.2x | 16.8x | 16.1x |
| ROE | 18.5% | 15.2% | 16.8% |

## Technical Analysis
- 50-day MA: Bullish crossover
- RSI: 58 (Neutral)
- MACD: Positive momentum
- Support Levels: $142, $138
- Resistance Levels: $165, $172

## ESG Considerations
- Environmental Score: 82/100
- Social Score: 75/100
- Governance Score: 88/100
- Overall ESG Rating: AA

## Recommendation
**STRONG BUY**
- Target Price: $180.00
- Upside Potential: 22%
- Investment Horizon: 12-18 months
- Position Sizing: 3-5% of portfolio

## Risk Management
- Stop Loss: $135.00 (-8%)
- Take Profit 1: $165.00 (+12%)
- Take Profit 2: $180.00 (+22%)

*This analysis is based on current market conditions and available data. Regular monitoring and updates recommended.*`;

    // Mock chart data
    const charts = [
      {
        title: "Revenue Growth Trend",
        data: [
          { name: "Q1 2023", value: 100 },
          { name: "Q2 2023", value: 120 },
          { name: "Q3 2023", value: 135 },
          { name: "Q4 2023", value: 155 },
          { name: "Q1 2024", value: 180 },
        ]
      },
      {
        title: "Profit Margins",
        data: [
          { name: "Q1 2023", value: 22 },
          { name: "Q2 2023", value: 23.5 },
          { name: "Q3 2023", value: 24.2 },
          { name: "Q4 2023", value: 25.1 },
          { name: "Q1 2024", value: 25.8 },
        ]
      }
    ];

    return new Response(
      JSON.stringify({ analysis, charts }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});