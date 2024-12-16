import { useState, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { v4 as uuidv4 } from "uuid";
import { Message, ResearchEntry } from "@/types/ai";
import { AIHeader } from "./AIHeader";
import { AIMessageList } from "./AIMessageList";
import { AIAnalysisInput } from "./AIAnalysisInput";
import { useToast } from "@/components/ui/use-toast";

export const AIAnalyst = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [researchHistory, setResearchHistory] = useState<ResearchEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

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
      
      const researchEntry: ResearchEntry = {
        id: uuidv4(),
        query,
        response: analysis,
        timestamp: new Date().toISOString(),
        metadata: {
          tokens: analysis.split(' ').length,
          complexity: calculateComplexity(analysis)
        }
      };
      
      setResearchHistory(prev => [researchEntry, ...prev]);
      
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

  const calculateComplexity = (text: string): number => {
    const technicalTerms = [
      'EBITDA', 'P/E', 'ROE', 'Beta', 'VaR',
      'margin', 'ratio', 'regulatory', 'compliance',
      'acquisition', 'strategy', 'market'
    ];
    return technicalTerms.reduce((score, term) => 
      text.toLowerCase().includes(term.toLowerCase()) ? score + 1 : score, 0);
  };

  const handleUpload = () => {
    toast({
      title: "Coming Soon",
      description: "File upload functionality will be available soon.",
    });
  };

  const handleDownload = () => {
    if (messages.length === 0) {
      toast({
        title: "No Analysis",
        description: "Generate an analysis first before downloading.",
      });
      return;
    }

    const lastAnalysis = messages[messages.length - 1].content;
    const blob = new Blob([lastAnalysis], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `investment-analysis-${new Date().toISOString()}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Download Started",
      description: "Your analysis report is being downloaded.",
    });
  };

  return (
    <Card className="p-6 bg-white shadow-lg rounded-xl">
      <AIHeader onUpload={handleUpload} onDownload={handleDownload} />
      <AIMessageList messages={messages} isLoading={isLoading} />
      <AIAnalysisInput onSubmit={handleSendMessage} isLoading={isLoading} />
    </Card>
  );
};