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
      headerIds: true,
      langPrefix: 'language-',
    });
    
    const html = marked.parse(content);
    return (
      <div 
        className="prose prose-headings:font-semibold prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg 
                   prose-p:text-base prose-li:text-base prose-table:text-sm max-w-none
                   prose-table:border-collapse prose-td:border prose-td:p-2
                   prose-th:border prose-th:p-2 prose-th:bg-muted"
        dangerouslySetInnerHTML={{ __html: html }} 
      />
    );
  } catch (error) {
    console.error('Markdown rendering error:', error);
    return <div>{content}</div>;
  }
};