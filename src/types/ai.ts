export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
}

export interface ResearchEntry {
  id: string;
  user_id: string;
  query: string;
  response: string | any; // Support both string and JSON
  metadata: {
    tokens: number;
    complexity: number;
  };
  created_at: string;
  updated_at: string;
}