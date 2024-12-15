export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
}

export interface ResearchEntry {
  id: string;
  query: string;
  response: string;
  timestamp: string;
  metadata: {
    tokens: number;
    complexity: number; // Changed from string to number to match actual usage
  };
}