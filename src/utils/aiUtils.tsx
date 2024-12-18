import React from 'react';
import { marked } from "marked";

export const researchSources = [
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
];

export const renderMarkdown = (content: string) => {
  try {
    marked.setOptions({
      breaks: true,
      gfm: true,
      headerPrefix: 'section-'
    });
    
    const html = marked.parse(content);
    return (
      <div 
        className="prose prose-slate max-w-none
          prose-headings:font-semibold 
          prose-h1:text-2xl prose-h1:mb-4
          prose-h2:text-xl prose-h2:mb-3
          prose-h3:text-lg prose-h3:mb-2
          prose-p:text-base prose-p:mb-4
          prose-li:text-base
          prose-table:text-sm prose-table:w-full
          prose-td:border prose-td:p-2
          prose-th:border prose-th:p-2 prose-th:bg-muted
          prose-strong:text-primary
          prose-blockquote:border-l-4 prose-blockquote:border-primary/50
          prose-blockquote:pl-4 prose-blockquote:italic"
        dangerouslySetInnerHTML={{ __html: html }} 
      />
    );
  } catch (error) {
    console.error('Markdown rendering error:', error);
    return <div>{content}</div>;
  }
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