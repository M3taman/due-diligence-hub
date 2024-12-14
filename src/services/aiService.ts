import { marked } from "marked";

const researchSources = [
  "SEC EDGAR Filings",
  "Bloomberg Financial Data",
  "Crunchbase Company Profiles",
  "Yahoo Finance",
  "Google News",
  "LinkedIn Company Insights",
  "Glassdoor Company Reviews",
  "Patent and Trademark Databases"
];

const systemPrompt = `You are Dudil, an advanced business intelligence analyst specializing in comprehensive due diligence. 
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
   - Ethical business practices

PRESENTATION GUIDELINES:
- Use markdown formatting
- Provide clear, actionable insights
- Balance technical depth with readability
- Highlight key findings with emphasis`;

export const generateAIResponse = async (messages: any[]) => {
  try {
    const response = await fetch("/api/ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
      }),
    });

    if (!response.ok) {
      throw new Error("AI response failed");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("AI Service Error:", error);
    throw error;
  }
};

export const renderMarkdown = (content: string) => {
  try {
    return marked.parse(content, { breaks: true, gfm: true });
  } catch (error) {
    console.error("Markdown rendering error:", error);
    return content;
  }
};