export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      newsletter_subscriptions: {
        // ...existing code...
      }
      research_history: {
        // ...existing code...
      }
      user_profiles: {
        // ...existing code...
      }
      documents: {
        Row: {
          id: string
          title: string
          content: string
          embedding: string
          metadata: Json
          status: 'draft' | 'published' | 'archived'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          content: string
          embedding?: string
          metadata?: Json
          status?: 'draft' | 'published' | 'archived'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          content?: string
          embedding?: string
          metadata?: Json
          status?: 'draft' | 'published' | 'archived'
          created_at?: string
          updated_at?: string
        }
      }
      ai_analysis: {
        Row: {
          id: string
          query: string
          response: Json
          embedding: string
          confidence: number
          sources: string[]
          created_at: string
        }
        Insert: {
          id?: string
          query: string
          response: Json
          embedding?: string
          confidence?: number
          sources?: string[]
          created_at?: string
        }
        Update: {
          id?: string
          query?: string
          response?: Json
          embedding?: string
          confidence?: number
          sources?: string[]
          created_at?: string
        }
      }
    }
    Views: {
      recent_analysis: {
        Row: {
          id: string
          query: string
          response: Json
          created_at: string
        }
      }
    }
    Functions: {
      match_documents: {
        Args: { query_embedding: string; match_threshold: number; match_count: number }
        Returns: { id: string; content: string; similarity: number }[]
      }
      generate_embeddings: {
        Args: { text: string }
        Returns: string
      }
      analyze_document: {
        Args: { document_id: string }
        Returns: Json
      }
    }
    Enums: {
      subscription_status: 'pending' | 'active' | 'unsubscribed'
      user_role: 'user' | 'admin' | 'analyst'
      document_status: 'draft' | 'published' | 'archived'
      analysis_type: 'financial' | 'market' | 'regulatory' | 'general'
      content_type: 'text' | 'pdf' | 'json' | 'csv'
    }
  }
}