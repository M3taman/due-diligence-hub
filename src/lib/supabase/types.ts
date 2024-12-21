export type Database = {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string
          email: string
          full_name?: string
          avatar_url?: string
          updated_at?: string
        }
      }
    }
  }
}

export type UserProfile = Database['public']['Tables']['user_profiles']['Row']

export interface SupabaseContextType {
  session: Session | null
  loading: boolean
}

export interface SupabaseProviderProps {
  children: React.ReactNode
}