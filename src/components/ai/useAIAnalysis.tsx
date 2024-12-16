import { useState } from "react";
import { Message } from "@/types/ai";
import { useToast } from "@/components/ui/use-toast";
import { useResearchHistory } from "@/hooks/useResearchHistory";
import { supabase } from "@/integrations/supabase/client";

export const useAIAnalysis = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { addResearchEntry } = useResearchHistory();

  const generateAnalysis = async (query: string) => {
    const currentDate = new Date().toLocaleDateString();
    return `# Investment Analysis Report for ${query}
    Generated on: ${currentDate}

### Executive Summary
- Industry Position: Comprehensive Analysis
- Financial Health: Detailed Metrics
- Risk Assessment: Multi-factor Analysis
- Growth Potential: Market-based Evaluation
- Investment Rating: Data-driven Recommendation

### 1. Financial Performance
| Metric | Current | YoY Change | Industry Avg |
|--------|----------|------------|--------------|
| Revenue | $XXB | +XX% | $XXB |
| EBITDA Margin | XX% | +XX bps | XX% |
| FCF Yield | XX% | +XX bps | XX% |
| ROIC | XX% | +XX bps | XX% |
| Net Debt/EBITDA | X.Xx | -X.Xx | X.Xx |

### 2. Market Position Analysis
- Market Share: XX% (Trend: ↑)
- Competitive Position: Leader in XX segments
- Brand Value: $XXB (YoY: +XX%)
- Geographic Presence: XX countries

### 3. Growth Drivers
1. Organic Growth
   - Core Market Expansion: XX% CAGR
   - Product Innovation: XX new launches
   - Market Penetration: XX% increase
2. Inorganic Growth
   - M&A Pipeline: XX potential targets
   - Strategic Partnerships: XX new alliances

### 4. Risk Assessment
#### Strategic Risks
- Market Disruption: LOW
- Competitive Pressure: MODERATE
- Technology Obsolescence: LOW

#### Operational Risks
- Supply Chain: MODERATE
- Regulatory: LOW
- Cybersecurity: MANAGED

### 5. Valuation Metrics
| Multiple | Current | Forward | Sector Avg |
|----------|----------|----------|------------|
| P/E | XX.Xx | XX.Xx | XX.Xx |
| EV/EBITDA | XX.Xx | XX.Xx | XX.Xx |
| P/B | X.Xx | X.Xx | X.Xx |
| FCF Yield | XX% | XX% | XX% |

### 6. ESG Analysis
- Environmental Score: XX/100
- Social Score: XX/100
- Governance Score: XX/100
- ESG Ranking: Top XX% in sector

### 7. Investment Thesis
**Recommendation: [BUY/HOLD/SELL]**
- Target Price: $XXX
- Upside Potential: XX%
- Investment Horizon: XX months

### 8. Key Catalysts
1. Short-term (0-6 months):
   - Quarterly earnings
   - Product launches
   - Market expansion
2. Medium-term (6-18 months):
   - Strategic initiatives
   - Operational efficiency
   - Market share gains

*Analysis based on data as of ${currentDate}*`;
  };

  const calculateComplexity = (text: string): number => {
    const technicalTerms = [
      'EBITDA', 'P/E', 'ROE', 'Beta', 'VaR',
      'margin', 'ratio', 'regulatory', 'compliance',
      'acquisition', 'strategy', 'market'
    ];
    return technicalTerms.reduce((score, term) => 
      text.toLowerCase().includes(term.toLowerCase()) ? score + 1 : score, 0);
  };

  const handleSendMessage = async (query: string) => {
    if (isLoading) return;

    const userMessage = {
      role: 'user' as const,
      content: query,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const analysis = await generateAnalysis(query);
      const aiResponse = {
        role: 'assistant' as const,
        content: analysis,
        timestamp: Date.now()
      };

      setMessages(prev => [...prev, aiResponse]);

      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        await addResearchEntry.mutateAsync({
          query,
          response: analysis,
          user_id: session.user.id,
          metadata: {
            tokens: analysis.split(' ').length,
            complexity: calculateComplexity(analysis)
          }
        });
      }

      toast({
        title: "Analysis Complete",
        description: "Your investment analysis report has been generated.",
      });
    } catch (error) {
      console.error('Analysis error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate analysis. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    isLoading,
    handleSendMessage,
  };
};
