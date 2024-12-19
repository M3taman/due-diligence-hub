export interface Message {
  role: 'user' | 'assistant';
  content: string;
  charts?: ChartData[];
}

export interface ChartData {
  type: 'line' | 'area' | 'bar';
  data: any[];
  xKey: string;
  yKey: string;
  title?: string;
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