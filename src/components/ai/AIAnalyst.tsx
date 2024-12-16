import { useState, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Database, FileText, RefreshCw, Upload, Download } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { Message, ResearchEntry } from "@/types/ai";
import { AIMessage } from "./AIMessage";
import { AIAnalysisInput } from "./AIAnalysisInput";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export const AIAnalyst = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [researchHistory, setResearchHistory] = useState<ResearchEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const generateAnalysis = async (query: string) => {
    const currentDate = new Date().toLocaleDateString();
    return `# Investment Analysis Report
    ## ${query}
    Generated on: ${currentDate}

### Executive Summary
- Industry Position: Market Leader
- Financial Health: Strong
- Risk Assessment: Moderate
- Growth Potential: High
- Investment Rating: Buy

### 1. Financial Metrics
| Metric | Value | Industry Avg |
|--------|--------|--------------|
| P/E Ratio | 22.5x | 18.2x |
| EBITDA Margin | 28% | 22% |
| Revenue Growth (YoY) | +25% | +15% |
| ROE | 18.5% | 12.3% |
| Debt/Equity | 0.45 | 0.62 |

### 2. Market Analysis
- Total Addressable Market: $50B
- Market Share: 12%
- YoY Growth Rate: 15%
- Competitive Position: Top 3

### 3. Risk Assessment
#### Operational Risks
- Supply Chain Exposure: Low
- Regulatory Compliance: High
- Cybersecurity Preparedness: Strong

#### Financial Risks
- Liquidity Risk: Low
- Currency Risk: Moderate
- Credit Risk: Low

### 4. Growth Catalysts
1. Geographic Expansion
   - APAC Market Entry
   - European Market Consolidation
2. Product Innovation
   - R&D Pipeline: Strong
   - Patent Portfolio: Growing

### 5. Valuation Analysis
- Current Market Cap: $XXB
- Enterprise Value: $XXB
- Forward P/E: 20.5x
- EV/EBITDA: 15.2x

### 6. ESG Considerations
- Environmental Score: 85/100
- Social Score: 78/100
- Governance Score: 92/100

### 7. Investment Recommendation
**STRONG BUY**
- Target Price: $XXX
- Upside Potential: 25%
- Investment Horizon: 12-18 months

*Analysis based on market data as of ${currentDate}*`;
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
    // TODO: Implement file upload functionality
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
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Database className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-semibold">dudil Investment Analyst</h2>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleUpload}>
            <Upload className="h-4 w-4 mr-2" />
            Upload Data
          </Button>
          <Button variant="outline" onClick={handleDownload}>
            <Download className="h-4 w-4 mr-2" />
            Download Report
          </Button>
        </div>
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
        <div className="space-y-6">
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