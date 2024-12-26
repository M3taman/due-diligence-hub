export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface SupabaseContextType {

    session: Session | null;
  
    loading: boolean;
  
  }
  


export type Database = {
  public: {
    Tables: {
      newsletter_subscriptions: {
        Row: {
          email: string
          id: string
          status: string
          subscribed_at: string
          updated_at: string
        }
        Insert: {
          email: string
          id?: string
          status?: string
          subscribed_at?: string
          updated_at?: string
        }
        Update: {
          email?: string
          id?: string
          status?: string
          subscribed_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      payment_events: {
        Row: {
          created_at: string
          event_data: Json
          event_type: string
          id: string
          payment_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          event_data: Json
          event_type: string
          id?: string
          payment_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          event_data?: Json
          event_type?: string
          id?: string
          payment_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payment_events_payment_id_fkey"
            columns: ["payment_id"]
            isOneToOne: false
            referencedRelation: "payments"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          created_at: string
          currency: string
          id: string
          payment_method: string
          status: string
          transaction_id: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string
          currency?: string
          id?: string
          payment_method: string
          status: string
          transaction_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string
          id?: string
          payment_method?: string
          status?: string
          transaction_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          id: string
          role: string | null
          trial_expiry: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          id: string
          role?: string | null
          trial_expiry?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          role?: string | null
          trial_expiry?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      reports: {
        Row: {
          content: Json
          created_at: string
          id: string
          team_id: string | null
          title: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          content: Json
          created_at?: string
          id?: string
          team_id?: string | null
          title: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          content?: Json
          created_at?: string
          id?: string
          team_id?: string | null
          title?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reports_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      research_history: {
        Row: {
          created_at: string
          id: string
          metadata: Json | null
          query: string
          response: Json
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          metadata?: Json | null
          query: string
          response: Json
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          metadata?: Json | null
          query?: string
          response?: Json
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      teams: {
        Row: {
          created_at: string
          id: string
          max_members: number | null
          name: string
          subscription_status: string | null
          subscription_tier: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          max_members?: number | null
          name: string
          subscription_status?: string | null
          subscription_tier?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          max_members?: number | null
          name?: string
          subscription_status?: string | null
          subscription_tier?: string | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
