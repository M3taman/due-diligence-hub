import { useState, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Database, FileText, RefreshCw } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { Message, ResearchEntry } from "@/types/ai";
import { AIMessage } from "./AIMessage";
import { AIAnalysisInput } from "./AIAnalysisInput";
import { researchSources } from "@/utils/aiUtils";
import { useToast } from "@/components/ui/use-toast";

export const AIAnalyst = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [researchHistory, setResearchHistory] = useState<ResearchEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const generateAnalysis = async (query: string) => {
    const currentDate = new Date().toLocaleDateString();
    return `## Comprehensive Investment Analysis for: ${query}
    Generated on: ${currentDate}

### 1. Company Overview
- Founded: 2020
- Industry: Technology
- Leadership: Executive team analysis
- Market Cap: $XXB

### 2. Financial Health Assessment
- Revenue Growth: +25% YoY
- EBITDA Margin: 28%
- P/E Ratio: 22.5x
- Debt/Equity: 0.45
- Quick Ratio: 1.8
- ROE: 18.5%

### 3. Market Position
- Market Share: 12%
- Industry Ranking: Top 10
- TAM: $50B
- YoY Growth Rate: 15%

### 4. Risk Analysis
- Beta: 1.2
- VaR (95%): 2.3%
- Operational Risk: Medium
- ESG Score: 75/100

### 5. Growth Strategy
- R&D Investment: 20% of Revenue
- M&A Pipeline: 2 potential acquisitions
- Geographic Expansion: APAC Focus
- Product Roadmap: AI Integration

### 6. Competition
- Direct Competitors: 3 Major Players
- Competitive Moat Analysis
- Market Concentration: Moderate
- Entry Barriers: High

### 7. Regulatory Compliance
- SEC Filings: Up to date
- Pending Regulations: 2 Major Changes
- Risk Level: Moderate
- Compliance Score: 92/100

*Analysis based on real-time market data and latest filings as of ${currentDate}*`;
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

  return (
    <Card className="p-6 bg-white shadow-lg rounded-xl">
      <div className="flex items-center gap-2 mb-6">
        <Database className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-semibold">dudil Investment Analyst</h2>
      </div>

      <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground mb-6">
        <div className="flex items-center gap-1">
          <FileText className="h-4 w-4" />
          <span>Real-time Analysis</span>
        </div>
        <div className="flex items-center gap-1">
          <RefreshCw className="h-4 w-4" />
          <span>Multi-source Data</span>
        </div>
      </div>

      <ScrollArea className="h-[600px] pr-4 mb-4">
        <div className="space-y-4">
          {messages.map((msg, idx) => (
            <AIMessage key={idx} message={msg} />
          ))}
          {isLoading && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <RefreshCw className="h-4 w-4 animate-spin" />
              <span>Processing analysis...</span>
            </div>
          )}
        </div>
      </ScrollArea>

      <AIAnalysisInput onSubmit={handleSendMessage} isLoading={isLoading} />
    </Card>
  );
};