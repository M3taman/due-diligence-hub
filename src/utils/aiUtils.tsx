import { marked } from 'marked'
import DOMPurify from 'dompurify'
import hljs from 'highlight.js'
import type { ProcessedContent } from '@/types/chat'

export const DATA_SOURCES = [
  "Bloomberg Terminal",
  "Refinitiv Eikon",
  "FactSet",
  "Morningstar Direct",
  "S&P Capital IQ",
  "SEC EDGAR Pro",
  "Thomson Reuters Datastream",
  "MSCI Analytics",
  "BlackRock Aladdin",
  "PortfolioAnalyst Pro"
] as const

interface ChartData {
  type: 'line' | 'area' | 'bar';
  data: any[];
  xKey: string;
  yKey: string;
  title?: string;
}

const validateChartData = (data: any): ChartData => {
  if (!data.type || !['line', 'area', 'bar'].includes(data.type)) {
    throw new Error('Invalid chart type');
  }
  if (!Array.isArray(data.data) || !data.xKey || !data.yKey) {
    throw new Error('Invalid chart data format');
  }
  return {
    type: data.type,
    data: data.data,
    xKey: data.xKey,
    yKey: data.yKey,
    title: data.title
  };
};

export const processChartData = (content: string): ChartData[] => {
  try {
    const chartRegex = /```chart\n([\s\S]*?)\n```/g;
    const charts: ChartData[] = [];
    let match;

    while ((match = chartRegex.exec(content)) !== null) {
      try {
        const chartData = JSON.parse(match[1]);
        charts.push(validateChartData(chartData));
      } catch (e) {
        console.error('Chart data processing failed:', e);
      }
    }

    return charts;
  } catch (error) {
    console.error('Chart extraction failed:', error);
    return [];
  }
};

export const renderMarkdown = (content: string): string => {
  try {
    marked.setOptions({
      breaks: true,
      gfm: true,
      highlight: (code, lang) => {
        if (lang && hljs.getLanguage(lang)) {
          return hljs.highlight(code, { language: lang }).value;
        }
        return code;
      }
    });
    
    const html = marked.parse(content);
    return DOMPurify.sanitize(html);
  } catch (error) {
    console.error('Markdown rendering failed:', error);
    return 'Error rendering content';
  }
};

// Add validation helper
export const validateAIResponse = (content: string) => {
  if (!content || typeof content !== 'string') {
    throw new Error('Invalid AI response format');
  }
  return content.trim();
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(value);
};

export const formatPercentage = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 2
  }).format(value / 100);
};

export const formatLargeNumber = (value: number): string => {
  if (value >= 1e9) {
    return `${(value / 1e9).toFixed(1)}B`;
  } else if (value >= 1e6) {
    return `${(value / 1e6).toFixed(1)}M`;
  } else if (value >= 1e3) {
    return `${(value / 1e3).toFixed(1)}K`;
  }
  return value.toString();
};
