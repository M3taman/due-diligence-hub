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

// If aiService is no longer used, consider removing this file.
// Otherwise, ensure that no components depend on its functionalities.

// Example: To remove the service, you can delete the file.

export type { AnalysisResult };