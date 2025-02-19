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