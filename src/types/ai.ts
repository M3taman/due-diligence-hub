export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
  charts?: {
    title: string;
    data: Array<{
      name: string;
      value: number;
      [key: string]: any;
    }>;
  }[];
  metadata?: {
    complexity: number;
    confidence: number;
    sources: string[];
  };
}

export interface ResearchEntry {
  id: string;
  user_id: string | null;
  query: string;
  response: string | any;
  metadata: {
    tokens: number;
    complexity: number;
  } | null;
  created_at: string;
  updated_at: string;
}