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
    complexity: string; // Changed from number to string to match the actual usage
  };
}