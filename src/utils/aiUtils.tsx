import React from 'react';
import { marked } from "marked";

export const researchSources = [
  "SEC EDGAR Filings",
  "Bloomberg Financial Data",
  "Crunchbase Company Profiles",
  "Yahoo Finance",
  "Google News",
  "LinkedIn Company Insights",
  "Glassdoor Company Reviews",
  "Patent and Trademark Databases"
];

export const renderMarkdown = (content: string) => {
  try {
    const html = marked.parse(content, { breaks: true, gfm: true });
    return <div className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: html }} />;
  } catch (error) {
    console.error('Markdown rendering error:', error);
    return <div>{content}</div>;
  }
};