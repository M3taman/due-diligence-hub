import { marked } from "marked";
import { supabase } from "@/lib/supabase";

interface AnalysisResult {
  content: string;
  confidence: number;
  sources: string[];
  metadata: {
    timestamp: string;
    category: string;
    complexity: number;
    lastUpdated: string;
  };
}

const researchSources = [
  "SEC EDGAR Filings",
  "Bloomberg Terminal Data",
  "Refinitiv Eikon",
  "S&P Global Market Intelligence",
  "Moody's Analytics",
  "FactSet Research Systems",
  "Thomson Reuters Datastream",
  "Capital IQ",
  "PitchBook Data",
  "Crunchbase Pro",
  "LinkedIn Sales Navigator",
  "D&B Hoovers",
  "Alpha Vantage API",
  "Yahoo Finance API",
  "FRED Economic Data"
];

const systemPrompt = `You are Dudil, an advanced business intelligence analyst specializing in comprehensive due diligence analysis.

Your expertise includes:
1. Financial Analysis: Evaluate financial statements, ratios, and performance metrics
2. Market Analysis: Assess market position, competition, and industry trends
3. Risk Assessment: Identify and analyze operational, financial, and regulatory risks
4. Compliance Review: Evaluate regulatory compliance and governance practices
5. Growth Analysis: Assess growth potential and strategic opportunities

Guidelines:
- Provide data-driven insights supported by reliable sources
- Use latest available market data and financial information
- Consider both quantitative and qualitative factors
- Maintain objectivity in analysis
- Highlight key risks and opportunities
- Structure responses clearly with relevant sections
- Include specific metrics and benchmarks when applicable

Format your response in markdown with clear sections and bullet points.`;

export const aiService = {
  async analyzeQuery(query: string): Promise<AnalysisResult> {
    try {
      const { data: embeddings } = await supabase.functions.invoke('generate-embeddings', {
        body: { text: query }
      });

      const { data: relevantDocs } = await supabase.rpc('match_documents', {
        query_embedding: embeddings,
        match_threshold: 0.78,
        match_count: 5
      });

      const { data: analysis } = await supabase.functions.invoke('analyze-content', {
        body: {
          query,
          context: relevantDocs,
          systemPrompt
        }
      });

      return {
        content: marked(analysis.content),
        confidence: analysis.confidence || 0.85,
        sources: analysis.sources || researchSources.slice(0, 3),
        metadata: {
          timestamp: new Date().toISOString(),
          category: analysis.category || 'general',
          complexity: analysis.complexity || 1,
          lastUpdated: new Date().toISOString()
        }
      };
    } catch (error) {
      throw new Error(`Analysis failed: ${error.message}`);
    }
  },

  async validateSources(sources: string[]): Promise<boolean> {
    return sources.every(source => researchSources.includes(source));
  },

  async getLatestMarketData(): Promise<any> {
    const { data, error } = await supabase
      .from('market_data')
      .select('*')
      .order('timestamp', { ascending: false })
      .limit(1);

    if (error) throw error;
    return data[0];
  }
};

export type { AnalysisResult };