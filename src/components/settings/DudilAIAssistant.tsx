import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, RefreshCw, Database } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { Message, ResearchEntry } from "@/types/ai";
import { DudilMessage } from "./DudilMessage";
import { researchSources } from "@/utils/aiUtils";
import { supabase } from "@/integrations/supabase/client";

const systemPrompt = `You are an advanced business intelligence analyst specializing in comprehensive due diligence. 
Your mission is to provide an extremely detailed, multi-dimensional analysis with rich insights.

RESEARCH METHODOLOGY:
- Utilize multiple authoritative sources: ${researchSources.join(", ")}
- Cross-reference and validate information from diverse platforms
- Provide real-time, up-to-date insights
- Maintain objectivity and depth in analysis

CRITICAL ANALYSIS FRAMEWORK:
1. Comprehensive Company Overview
   - Detailed corporate history
   - Organizational structure
   - Leadership team assessment

2. Detailed Financial Health Assessment
   - Revenue trends
   - Profitability metrics
   - Balance sheet analysis
   - Cash flow dynamics

3. Precise Market Positioning Analysis
   - Industry standing
   - Market share
   - Competitive differentiation

4. Thorough Risk Evaluation
   - Operational risks
   - Financial vulnerabilities
   - Regulatory compliance challenges
   - Geopolitical and economic factors

5. Strategic Growth Potential
   - Expansion strategies
   - Innovation pipeline
   - Investment attractiveness
   - Future market opportunities

6. Competitive Landscape Breakdown
   - Direct and indirect competitors
   - Comparative SWOT analysis
   - Technological and strategic positioning

7. Regulatory and Compliance Insights
   - Legal framework compliance
   - Potential regulatory challenges
   - Governance standards
   - Ethical business practices`;

export const DudilAIAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [researchHistory, setResearchHistory] = useState<ResearchEntry[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const calculateComplexity = (text: string) => {
    const technicalTerms = [
      'financial', 'strategic', 'compliance', 
      'risk', 'market', 'investment', 'analysis'
    ];
    return technicalTerms.reduce((score, term) => 
      text.toLowerCase().includes(term) ? score + 1 : score, 0);
  };

  const addToResearchHistory = useCallback(async (query: string, response: string) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user?.id) return;

    const researchEntry: Omit<ResearchEntry, 'id' | 'created_at' | 'updated_at'> = {
      user_id: session.user.id,
      query,
      response,
      metadata: {
        tokens: response.split(' ').length,
        complexity: calculateComplexity(response)
      }
    };

    const { data, error } = await supabase
      .from('research_history')
      .insert([researchEntry])
      .select()
      .single();

    if (error) {
      console.error('Error saving research:', error);
      return;
    }

    setResearchHistory(prev => [data as ResearchEntry, ...prev]);
  }, []);

  const generateAnalysis = async (query: string) => {
    // This is a mock response for development
    return `## Comprehensive Analysis for: ${query}

### 1. Company Overview
- Company Name: ${query}
- Industry: Technology
- Founded: 2020
- Leadership: Executive team analysis pending

### 2. Financial Health Assessment
- Revenue Growth: +25% YoY
- Profit Margins: 15%
- Cash Position: Strong
- Debt Ratio: Low

### 3. Market Position
- Market Share: 12%
- Industry Ranking: Top 10
- Key Markets: North America, Europe

### 4. Risk Analysis
- Operational: Medium
- Financial: Low
- Regulatory: Medium
- Market: High

### 5. Growth Strategy
- Expansion Plans: APAC Region
- R&D Investment: 20% of Revenue
- Market Opportunities: Emerging Markets

### 6. Competition
- Direct Competitors: 3 Major Players
- Market Leaders: Analysis Pending
- Competitive Advantage: Technology Stack

### 7. Regulatory Compliance
- Current Status: Compliant
- Pending Regulations: 2 Major Changes
- Risk Level: Moderate

*This analysis is based on available public data and should be verified with additional sources.*`;
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = {
      role: 'user' as const,
      content: input,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const analysis = await generateAnalysis(input);
      const aiResponse = {
        role: 'assistant' as const,
        content: analysis,
        timestamp: Date.now()
      };

      setMessages(prev => [...prev, aiResponse]);
      await addToResearchHistory(input, analysis);
    } catch (error) {
      console.error('Analysis error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <Database className="h-5 w-5" />
        <h2 className="text-xl font-semibold">Dudil AI Assistant</h2>
      </div>

      <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground mb-4">
        <div className="flex items-center gap-1">
          <FileText className="h-4 w-4" />
          <span>Real-time Analysis</span>
        </div>
        <div className="flex items-center gap-1">
          <RefreshCw className="h-4 w-4" />
          <span>Multi-source Data</span>
        </div>
      </div>

      <ScrollArea className="h-[600px] pr-4">
        <div className="space-y-4">
          {messages.map((msg, idx) => (
            <DudilMessage key={idx} message={msg} />
          ))}
          {isLoading && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <RefreshCw className="h-4 w-4 animate-spin" />
              <span>Analyzing data...</span>
            </div>
          )}
        </div>
      </ScrollArea>

      <form onSubmit={handleSendMessage} className="mt-4">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter company name or topic for analysis..."
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading}>
            Analyze
          </Button>
        </div>
      </form>
    </Card>
  );
};
